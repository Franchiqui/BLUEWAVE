'use client';

import { useState, useEffect } from 'react';
import { ideTabsData } from '@/lib/ide-tabs-data';
import { IMAGES } from '@/lib/constants';

const ToolPage = ({ tool }: { tool: string }) => {
  const tabData = ideTabsData.find(t => t.key === tool);
  if (!tabData) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Herramienta no encontrada</h1>
        <p className="text-red-500">La herramienta '{tool}' no existe en la configuración.</p>
      </div>
    );
  }

  const [context, setContext] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContext = async () => {
      try {
        const res = await fetch(`/uploads/ZEUS_IA_CONTEXT.md`);
        if (!res.ok) {
          throw new Error(`Error al cargar el contexto: ${res.status}`);
        }
        const text = await res.text();
        setContext(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    fetchContext();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{tabData.title}</h1>
      <p className="text-gray-600 mb-6">{tabData.description}</p>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Contexto de IA</h2>
        <textarea
          className="w-full h-64 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={context || ''}
          readOnly
        />
      </div>
    </div>
  );
};

export default ToolPage;