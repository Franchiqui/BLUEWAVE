'use client';

import { useState, useEffect, useCallback } from 'react';

interface IdeContext {
  comparadorCodigo: string;
  corregirCodigo: string;
  corregirDependencias: string;
  corregirImportacionesFaltantes: string;
  esquemaCarpetas: string;
  generadorComponentes: string;
  generarIcono: string;
  formateadorCodigo: string;
  IntegracionGitHub: string;
}

interface UseIdeContextReturn {
  context: IdeContext | null;
  loading: boolean;
  error: string | null;
  getSectionContext: (section: keyof IdeContext) => string;
}

const defaultContext: IdeContext = {
  comparadorCodigo: 'Compara dos fragmentos de código para identificar diferencias y similitudes.',
  corregirCodigo: 'Corrige errores de sintaxis, lógica y estilo en tu código automáticamente.',
  corregirDependencias: 'Analiza y corrige problemas con las dependencias de tu proyecto.',
  corregirImportacionesFaltantes: 'Detecta y añade automáticamente las importaciones faltantes en tu código.',
  esquemaCarpetas: 'Visualiza y gestiona la estructura de carpetas de tu proyecto.',
  generadorComponentes: 'Genera componentes reutilizables con las mejores prácticas.',
  generarIcono: 'Crea iconos personalizados para tu aplicación.',
  formateadorCodigo: 'Formatea tu código siguiendo las convenciones de estilo establecidas.',
  IntegracionGitHub: 'Integra tu proyecto con GitHub para gestión de versiones y colaboración.',
};

// Mapeo de nombres de sección a claves del contexto
const sectionKeys: Record<string, keyof IdeContext> = {
  'Comparador de Codigo': 'comparadorCodigo',
  'Corregir Codigo': 'corregirCodigo',
  'Corregir Dependencias': 'corregirDependencias',
  'Corregir Importaciones Faltantes': 'corregirImportacionesFaltantes',
  'Esquema de Carpetas': 'esquemaCarpetas',
  'Generador de Componentes': 'generadorComponentes',
  'Generar Icono': 'generarIcono',
  'Formateador de Codigo': 'formateadorCodigo',
  'Integracion GitHub': 'IntegracionGitHub',
};

// Expresiones regulares para parsear el markdown
const sectionRegex = /##\s+(.+?)\n([\s\S]*?)(?=\n##\s|\n$|$)/g;
const descriptionRegex = /(?:Descripción|Description):\s*(.*?)(?:\n|$)/i;

function parseMarkdownContext(markdown: string): IdeContext {
  const context: IdeContext = { ...defaultContext };
  const sections: Record<string, string> = {};

  let match;
  while ((match = sectionRegex.exec(markdown)) !== null) {
    const [, title, content] = match;
    const trimmedTitle = title.trim().toLowerCase();
    const trimmedContent = content.trim();

    // Extraer descripción si existe
    const descMatch = trimmedContent.match(descriptionRegex);
    const description = descMatch ? descMatch[1].trim() : trimmedContent;

    // Mapear títulos del markdown a nuestras claves
    if (trimmedTitle.includes('comparador') || trimmedTitle.includes('código')) {
      sections['comparadorCodigo'] = description;
    } else if (trimmedTitle.includes('corregir') && trimmedTitle.includes('código')) {
      sections['corregirCodigo'] = description;
    } else if (trimmedTitle.includes('dependencia')) {
      sections['corregirDependencias'] = description;
    } else if (trimmedTitle.includes('importacion') || trimmedTitle.includes('importación')) {
      sections['corregirImportacionesFaltantes'] = description;
    } else if (trimmedTitle.includes('carpeta') || trimmedTitle.includes('estructura')) {
      sections['esquemaCarpetas'] = description;
    } else if (trimmedTitle.includes('componente')) {
      sections['generadorComponentes'] = description;
    } else if (trimmedTitle.includes('icono')) {
      sections['generarIcono'] = description;
    } else if (trimmedTitle.includes('formateador') || trimmedTitle.includes('formato')) {
      sections['formateadorCodigo'] = description;
    } else if (trimmedTitle.includes('formateador') || trimmedTitle.includes('formato')) {
      sections['formateadorCodigo'] = description;
    } else if (trimmedTitle.includes('integracion') || trimmedTitle.includes('github')) {
      sections['integracionGitHub'] = description;
    }
  }

  // Actualizar solo las secciones que se encontraron
  return { ...context, ...sections };
}

export function useIdeContext(): UseIdeContextReturn {
  const [context, setContext] = useState<IdeContext | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchContext = async () => {
      try {
        setLoading(true);
        setError(null);

        // Intentar cargar el contexto desde el archivo markdown
        const response = await fetch('/docs/ZEUS_IA_CONTEXT.md');
        
        if (!response.ok) {
          throw new Error(`Error al cargar el contexto: ${response.statusText}`);
        }

        const markdown = await response.text();
        const parsedContext = parseMarkdownContext(markdown);

        if (mounted) {
          setContext(parsedContext);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          console.warn('Error cargando contexto desde markdown, usando valores por defecto:', err);
          setContext(defaultContext);
          setError(err instanceof Error ? err.message : 'Error desconocido al cargar el contexto');
          setLoading(false);
        }
      }
    };

    fetchContext();

    return () => {
      mounted = false;
    };
  }, []);

  const getSectionContext = useCallback(
    (section: keyof IdeContext): string => {
      if (!context) return defaultContext[section] || '';
      return context[section] || defaultContext[section] || '';
    },
    [context]
  );

  return {
    context,
    loading,
    error,
    getSectionContext,
  };
}

// Exportar utilidades para usar en otros componentes
export { sectionKeys, defaultContext };