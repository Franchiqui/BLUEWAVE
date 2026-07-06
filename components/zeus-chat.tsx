'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Square, Sparkles, Bot, Volume2 } from 'lucide-react';
import { ZeusVideoCard } from './zeus-video-card';
import { ZeusVideoModal } from './zeus-video-modal';

type VideoInfo = { title: string; url: string };
type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  videos?: Record<string, VideoInfo>;
};

const MARKER_PREFIX = '[VIDEO:';

// Oculta el tail incompleto de un marcador [VIDEO:docId] durante el streaming.
function stripIncompleteMarker(text: string): string {
  const idx = text.lastIndexOf(MARKER_PREFIX);
  if (idx !== -1) {
    const after = text.slice(idx);
    if (!after.includes(']')) return text.slice(0, idx);
    return text;
  }
  for (let n = Math.min(text.length, MARKER_PREFIX.length); n >= 1; n--) {
    if (text.endsWith(MARKER_PREFIX.slice(0, n))) return text.slice(0, text.length - n);
  }
  return text;
}

type RenderSegment =
  | { kind: 'text'; text: string }
  | { kind: 'video'; docId: string };

function parseMarkers(text: string): RenderSegment[] {
  const segments: RenderSegment[] = [];
  const regex = /\[VIDEO:([^\]]+)\]/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) segments.push({ kind: 'text', text: text.slice(last, match.index) });
    segments.push({ kind: 'video', docId: match[1].trim() });
    last = match.index + match[0].length;
  }
  if (last < text.length) segments.push({ kind: 'text', text: text.slice(last) });
  return segments;
}

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    '¡Hola! Soy Zeus IA, el asistente de la aplicación. Pregúntame sobre cualquier pestaña, función, instalación o uso de Zeus IA. Si tu pregunta tiene un vídeo tutorial, te lo mostraré aquí.',
};

export function ZeusChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedVideo, setExpandedVideo] = useState<VideoInfo | null>(null);

  // Lectura por voz (TTS) con la Web Speech API del navegador.
  const [ttsOn, setTtsOn] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState<string>('');
  // El soporte de TTS solo se evalúa en el cliente. Para evitar un
  // hydration mismatch (el servidor no pinta los controles de voz y el
  // cliente sí), no renderizamos nada dependiente de `window` hasta que el
  // componente esté montado.
  const [mounted, setMounted] = useState(false);
  const ttsSupported = mounted && 'speechSynthesis' in window;

  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Marca el componente como montado (cliente) para poder renderizar de
  // forma segura los controles que dependen de window/speechSynthesis sin
  // provocar un hydration mismatch.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Carga las voces disponibles (llegan de forma asíncrona en algunos
  // navegadores vía el evento 'voiceschanged').
  useEffect(() => {
    if (!ttsSupported) return;
    const load = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length === 0) return;
      setVoices(v);
      setVoiceURI((prev) => {
        if (prev && v.some((x) => x.voiceURI === prev)) return prev;
        // Por defecto, la primera voz en español; si no, la primera disponible.
        const es = v.find((x) => x.lang.toLowerCase().startsWith('es'));
        return (es || v[0]).voiceURI;
      });
    };
    load();
    window.speechSynthesis.addEventListener('voiceschanged', load);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', load);
  }, [ttsSupported]);

  // Limpia el texto de markdown/símbolos para que la lectura por voz suene
  // natural: quita *, |, #, `, _, >, ~, cabeceras, separadores de tabla,
  // enlaces (deja solo el texto), imágenes, bloques de código y marcadores
  // de vídeo. Así no "lee" asteriscos ni barras ni sintaxis, solo la frase.
  const cleanForSpeech = (text: string) => {
    let t = text;
    // Bloques de código ```...``` y código inline `...` → fuera.
    t = t.replace(/```[\s\S]*?```/g, ' ');
    t = t.replace(/`[^`]*`/g, ' ');
    // Imágenes ![alt](url) → fuera; enlaces [texto](url) → solo "texto".
    t = t.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ');
    t = t.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
    // Cabeceras "# ", "## "… y reglas horizontales "---"/"***".
    t = t.replace(/^\s{0,3}#{1,6}\s+/gm, ' ');
    t = t.replace(/^\s{0,3}([-*_])\1{2,}\s*$/gm, ' ');
    // Filas separadoras de tabla (|---|---|) y pipes sueltos.
    t = t.replace(/^\s*\|?[\s:|-]+\|?\s*$/gm, ' ');
    t = t.replace(/\|/g, ' ');
    // Marcadores de vídeo del chat.
    t = t.replace(/\[VIDEO:[^\]]+\]/g, ' ');
    // Énfasis: **bold**, *italic*, __bold__, _italic_ → texto plano.
    t = t.replace(/\*\*([^*]+)\*\*/g, '$1');
    t = t.replace(/__([^_]+)__/g, '$1');
    t = t.replace(/(?<!\w)\*([^*]+)\*(?!\w)/g, '$1');
    t = t.replace(/(?<!\w)_([^_]+)_(?!\w)/g, '$1');
    // Blockquotes ">" y marcadores de lista "- ", "* ", "+ ", "1. ".
    t = t.replace(/^\s*>\s?/gm, ' ');
    t = t.replace(/^\s*[-*+]\s+/gm, ' ');
    t = t.replace(/^\s*\d+\.\s+/gm, ' ');
    // Símbolos sueltos que no deben leerse: *, #, `, ~, >, _.
    t = t.replace(/[*#`~>_]/g, ' ');
    // Colapsar espacios en blanco.
    t = t.replace(/\s+/g, ' ').trim();
    return t;
  };

  const speak = useCallback((text: string) => {
    if (!ttsSupported || !text) return;
    // Encola sin cancelar: así las frases se reproducen en orden y de forma
    // continua mientras llega el stream. El cancel lo gestionan el toggle
    // off, el botón ■ y el inicio de un mensaje nuevo.
    const u = new SpeechSynthesisUtterance(text);
    const v = voices.find((x) => x.voiceURI === voiceURI);
    if (v) u.voice = v;
    u.lang = v?.lang || 'es-ES';
    u.rate = 1;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
  }, [ttsSupported, voices, voiceURI]);

  // Ref para leer ttsOn desde dentro del bucle de stream sin stale closure
  // (que el toggle on/off a mitad de respuesta se respete al instante).
  const ttsOnRef = useRef(ttsOn);
  useEffect(() => {
    ttsOnRef.current = ttsOn;
  }, [ttsOn]);

  // Al apagar el TTS o desmontar, cortamos cualquier locución en curso.
  useEffect(() => {
    if (!ttsSupported) return;
    if (!ttsOn) window.speechSynthesis.cancel();
  }, [ttsOn, ttsSupported]);
  useEffect(() => {
    if (!ttsSupported) return;
    return () => window.speechSynthesis.cancel();
  }, [ttsSupported]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
  }, []);

  const send = async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    setError(null);
    // Al empezar un mensaje nuevo, cortamos cualquier locución previa para
    // que no se solape con la nueva respuesta.
    if (ttsSupported) window.speechSynthesis.cancel();
    setInput('');

    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: text };
    const assistantId = crypto.randomUUID();
    const assistantMsg: ChatMessage = { id: assistantId, role: 'assistant', content: '', videos: {} };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);

    setIsStreaming(true);
    const controller = new AbortController();
    abortRef.current = controller;

    // Historial para el backend: mensajes previos (sin el de bienvenida).
    const history = messages
      .filter((m) => m.id !== 'welcome')
      .map((m) => ({ role: m.role, content: m.content.replace(/\[VIDEO:[^\]]+\]/g, '').trim() }));

    try {
      const res = await fetch('/api/zeus-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Error ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let acc = '';
      // Caracteres del texto limpiado que ya se han enviado al TTS.
      let spokenTextLen = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data: ')) continue;
          const payload = trimmed.slice(6);
          if (payload === '[DONE]') continue;
          // Parseamos fuera del manejo de eventos: si JSON.parse falla
          // (evento parcial/no-JSON) lo ignoramos, pero un evt.error válido
          // debe propagarse al catch externo para mostrarlo, no tragárselo.
          let evt: any;
          try {
            evt = JSON.parse(payload);
          } catch {
            continue; // evento no-JSON o parcial: ignorar
          }
          if (typeof evt.content === 'string') {
            acc += evt.content;
            setMessages((prev) =>
              prev.map((m) => (m.id === assistantId ? { ...m, content: acc } : m))
            );
            // Lectura incremental por frases: en cuanto hay una frase
            // completa (terminada en . ! ? … o salto de línea) se encola
            // para hablar. Así empieza nada más comenzar el stream y va
            // parejo, sin esperar al final.
            if (ttsOnRef.current) {
              const cleaned = cleanForSpeech(acc);
              const pending = cleaned.slice(spokenTextLen);
              if (pending) {
                const m = pending.match(/[\s\S]*[.!?…\n]/);
                if (m) {
                  const toSpeak = m[0];
                  speak(toSpeak);
                  spokenTextLen += toSpeak.length;
                }
              }
            }
          }
          if (Array.isArray(evt.videos)) {
            setMessages((prev) =>
              prev.map((m) => {
                if (m.id !== assistantId) return m;
                const map: Record<string, VideoInfo> = { ...(m.videos || {}) };
                for (const v of evt.videos) {
                  if (v && v.docId && v.url) map[v.docId] = { title: v.title || 'Vídeo', url: v.url };
                }
                return { ...m, videos: map };
              })
            );
          }
          if (typeof evt.error === 'string') {
            throw new Error(evt.error);
          }
        }
      }
      // Al terminar el stream, hablamos la cola final (la frase que no llegó
      // a cerrar con un punto) para no dejar texto sin leer.
      if (ttsOnRef.current) {
        const tail = cleanForSpeech(acc).slice(spokenTextLen);
        if (tail) speak(tail);
      }
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        // cancelado por el usuario: dejamos lo acumulado
      } else {
        setError(err?.message || 'Error al comunicarse con el asistente.');
      }
    } finally {
      abortRef.current = null;
      setIsStreaming(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-700/50">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-emerald-500/10 rounded-lg">
          <Sparkles className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-white">Asistente Zeus IA</h2>
          <p className="text-xs text-gray-400">Pregúntame sobre la aplicación. Si hay un tutorial, te lo muestro aquí.</p>
        </div>
        {ttsSupported ? (
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setTtsOn((v) => !v)}
              title={ttsOn ? 'Desactivar lectura por voz' : 'Activar lectura por voz'}
              className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-xl text-xs font-medium transition-colors ${
                ttsOn
                  ? 'bg-emerald-500 text-gray-950 hover:bg-emerald-400'
                  : 'bg-gray-700/70 text-gray-200 hover:bg-gray-600/70'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              {ttsOn ? 'Voz ON' : 'Voz'}
            </button>
            <select
              value={voiceURI}
              onChange={(e) => setVoiceURI(e.target.value)}
              title="Voz para la lectura"
              className="h-9 max-w-[160px] truncate rounded-xl bg-gray-900/60 border border-gray-700/50 px-2 text-xs text-white focus:outline-none focus:border-emerald-500/60"
            >
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
            {ttsOn ? (
              <button
                type="button"
                onClick={() => window.speechSynthesis.cancel()}
                title="Detener la locución actual"
                className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-gray-700/70 text-gray-200 hover:bg-gray-600/70"
              >
                <Square className="w-4 h-4" />
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      <div
        ref={scrollRef}
        className="zeus-chat-scroll h-[420px] overflow-y-auto pr-1 space-y-4 mb-4"
      >
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} onExpand={setExpandedVideo} />
        ))}
        {error ? (
          <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            {error}
          </div>
        ) : null}
      </div>

      <div className="flex items-end gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Escribe tu pregunta sobre Zeus IA…"
          rows={1}
          className="flex-1 resize-none bg-gray-900/60 border border-gray-700/50 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/60 max-h-32"
        />
        {isStreaming ? (
          <button
            onClick={stop}
            className="inline-flex items-center justify-center h-11 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors"
            aria-label="Detener"
          >
            <Square className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={send}
            disabled={!input.trim()}
            className="inline-flex items-center justify-center h-11 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 text-gray-950 font-semibold rounded-xl transition-colors shadow-lg shadow-emerald-500/25"
            aria-label="Enviar"
          >
            <Send className="w-4 h-4" />
          </button>
        )}
      </div>

      <ZeusVideoModal video={expandedVideo} onClose={() => setExpandedVideo(null)} />
    </div>
  );
}

function MessageBubble({
  message,
  onExpand,
}: {
  message: ChatMessage;
  onExpand: (video: VideoInfo) => void;
}) {
  const isUser = message.role === 'user';
  const text = isUser ? message.content : stripIncompleteMarker(message.content);
  const segments = isUser ? [{ kind: 'text' as const, text }] : parseMarkers(text);
  const videos = message.videos || {};

  return (
    <div className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser ? (
        <div className="flex-shrink-0 mt-1 p-1.5 bg-emerald-500/10 rounded-lg">
          <Bot className="w-4 h-4 text-emerald-400" />
        </div>
      ) : null}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words ${
          isUser
            ? 'bg-emerald-500/10 border border-emerald-500/20 text-gray-100'
            : 'bg-gray-900/50 border border-gray-700/50 text-gray-200'
        }`}
      >
        {segments.map((seg, i) =>
          seg.kind === 'text' ? (
            <span key={i}>{seg.text}</span>
          ) : videos[seg.docId] ? (
            <ZeusVideoCard
              key={i}
              title={videos[seg.docId].title}
              url={videos[seg.docId].url}
              onExpand={onExpand}
            />
          ) : (
            // Marcador sin vídeo asociado (p.ej. alucinación): no renderizar nada.
            null
          )
        )}
        {!isUser && message.content === '' ? (
          <span className="text-gray-500 italic">Escribiendo…</span>
        ) : null}
      </div>
    </div>
  );
}