"use client";

import { useEffect, useState } from 'react';
import { POCKETBASE_URL, IMAGES } from '@/lib/constants';

export default function TestImagenesPage() {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, string>>({});

  useEffect(() => {
    console.log('[TestImagenes] POCKETBASE_URL:', POCKETBASE_URL);
    console.log('[TestImagenes] IMAGES:', IMAGES);
  }, []);

  const handleImageLoad = (key: string) => {
    setLoadedImages(prev => ({ ...prev, [key]: true }));
  };

  const handleImageError = (key: string, src: string) => {
    setFailedImages(prev => ({ ...prev, [key]: src }));
    console.error(`[TestImagenes] Error cargando imagen ${key}:`, src);
  };

  const testDirectUrl = async () => {
    const testId = '3p74z32vzwmxb4y';
    const collectionId = 'pbc_1998862360';
    const url = `${POCKETBASE_URL}/api/files/${collectionId}/${testId}/field`;

    console.log('[TestImagenes] Probando URL directa:', url);

    try {
      const response = await fetch(url, { method: 'HEAD' });
      console.log('[TestImagenes] Response status:', response.status);
      console.log('[TestImagenes] Response headers:', Object.fromEntries(response.headers.entries()));
    } catch (error) {
      console.error('[TestImagenes] Error en fetch:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Test de Imágenes PocketBase</h1>

      <button
        onClick={testDirectUrl}
        className="mb-8 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        Probar URL Directa
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(IMAGES).map(([key, src]) => (
          <div key={key} className="border border-gray-700 rounded-lg p-4 bg-gray-800">
            <h2 className="text-lg font-semibold mb-2 truncate">{key}</h2>
            <p className="text-sm text-gray-400 mb-4 truncate">{src || 'null'}</p>

            {src ? (
              <div className="relative h-40 bg-gray-700 rounded">
                <img
                  src={src}
                  alt={key}
                  className="w-full h-full object-contain"
                  onLoad={() => handleImageLoad(key)}
                  onError={() => handleImageError(key, src)}
                />
                {loadedImages[key] && (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-green-600 rounded text-xs">
                    Cargada
                  </span>
                )}
              </div>
            ) : (
              <div className="h-40 bg-gray-700 rounded flex items-center justify-center">
                <span className="text-gray-500">Sin imagen</span>
              </div>
            )}

            {failedImages[key] && (
              <p className="text-red-400 text-xs mt-2 break-all">
                Error: {failedImages[key]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
