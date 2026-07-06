import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SSE_HEADERS = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache, no-transform',
  Connection: 'keep-alive',
};

const ZEUS_CHAT_SYSTEM_PROMPT = `Eres Zeus IA, el asistente oficial de la aplicación Zeus IA (un IDE / studio de desarrollo multiplataforma con asistencia de IA, construido con Next.js 16, React 19, TypeScript, Tailwind CSS, Electron, PocketBase y un backend Express local).

Tu único propósito es responder preguntas sobre Zeus IA: sus pestañas (Explorador, IDE, Generador de APIs, Generador de Apps, Creador de Estructuras, Probador de APIs, Componentes UI, Vista Previa), su instalación, configuración, modelos soportados (OpenAI, Deepseek, Ollama, Ollama Cloud, LM Studio), el pipeline RAG y el uso general de la app.

Reglas:
- Responde en español, de forma clara y concisa. Solo responde a lo que se te pregunte.
- Basa tus respuestas en el contexto recuperado que te proporciona el pipeline. Si no hay contexto relevante, indícalo y responde con conocimiento general sobre Zeus IA.
- Si en el contexto hay un vídeo relacionado con la pregunta, escribe el marcador [VIDEO:<docId>] en el punto exacto donde debe aparecer el reproductor del vídeo, y añade una frase breve del tipo "Aquí tienes un vídeo sobre esto:".
- No inventes docIds de vídeos; usa solo los que aparezcan en el contexto.
- No pidas permiso ni confirmaciones; responde directamente.`;

export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'JSON inválido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const message = typeof body?.message === 'string' ? body.message.trim() : '';
  const history = Array.isArray(body?.history) ? body.history : [];

  if (!message) {
    return new Response(JSON.stringify({ error: 'message es requerido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const pipelineUrl = process.env.ZEUS_PIPELINE_URL;
  const modelUrl = process.env.ZEUS_PIPELINE_MODEL_URL;
  const modelName = process.env.ZEUS_PIPELINE_MODEL_NAME;
  const modelKey = process.env.ZEUS_PIPELINE_MODEL_KEY;

  if (!pipelineUrl) {
    return new Response(
      JSON.stringify({ error: 'ZEUS_PIPELINE_URL no configurado en el servidor.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const raeEndpoint = `${pipelineUrl.replace(/\/$/, '')}/api/v1/chat/pipeline`;

  // Solo pisamos el modelo del pipeline si la URL del modelo está realmente
  // configurada (y apunta a un sitio alcanzable desde el NAS, p.ej. la IP LAN
  // de LM Studio/Ollama). Si no, NO mandamos modelConfig y dejamos que el RAE
  // use su pipeline_configs (generationModelId + proveedor de PocketBase),
  // que es la configuración que ya funciona. Mandar un modelConfig con una
  // URL vacía o que no resuelve hace que el stream se quede colgado sin
  // devolver nada.
  const hasModelOverride = !!(modelUrl && modelName);
  const raeBody: Record<string, unknown> = {
    message,
    history,
    stream: true,
    systemContext: ZEUS_CHAT_SYSTEM_PROMPT,
    features: { videoCitations: true },
  };
  if (hasModelOverride) {
    raeBody.modelConfig = {
      provider: 'OpenAI',
      apiUrl: modelUrl,
      apiKey: modelKey || '',
      model: modelName,
      temperature: 0.4,
      maxTokens: 1024,
    };
  }

  let raeRes: Response;
  try {
    raeRes = await fetch(raeEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(raeBody),
      signal: AbortSignal.timeout(300000),
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: `No se pudo conectar al pipeline: ${err?.message || err}` }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!raeRes.ok || !raeRes.body) {
    const errText = await raeRes.text().catch(() => '');
    return new Response(
      JSON.stringify({ error: `Pipeline respondió ${raeRes.status}: ${errText.slice(0, 300)}` }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Proxy SSE directo: reenvolvemos el stream tal cual (los eventos {content}, {videos}, [DONE]).
  return new Response(raeRes.body, { headers: SSE_HEADERS });
}