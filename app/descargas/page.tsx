'use client';

import React from 'react';

export default function DescargasPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Descargas
        </h1>

        <div className="space-y-8">
          {/* Tarjeta 1: Zeus IA */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-full md:w-96 h-56 flex-shrink-0">
              <img
                src="https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/3p74z32vzwmxb4y/chat_expandido_6tnlwpmx07.jpg"
                alt="Zeus IA"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Zeus IA
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                La plataforma completa de Zeus IA para desarrollo de aplicaciones inteligentes. 
                Incluye todas las herramientas necesarias para crear, probar y desplegar tus proyectos 
                con la potencia de la inteligencia artificial.
              </p>
              <a
                href="https://descargas.zeus-ia.com/download/Zeus_IA_Setup_1.0.0.exe"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Descargar
              </a>
            </div>
          </div>

          {/* Tarjeta 2: Zeus IA Extensión Visual Studio */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-full md:w-96 h-56 flex-shrink-0">
              <img
                src="https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/3p74z32vzwmxb4y/chat_expandido_6tnlwpmx07.jpg"
                alt="Zeus IA Extensión Visual Studio"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Zeus IA Extensión Visual Studio
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Extensión para Visual Studio Code que integra Zeus IA directamente en tu editor. 
                Obtén sugerencias de código, autocompletado inteligente y asistencia en tiempo real 
                mientras programas.
              </p>
              <a
                href="https://descargas.zeus-ia.com/download/Zeus_IA_Setup_1.0.0.exe"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Descargar
              </a>
            </div>
          </div>

          {/* Tarjeta 3: NasServer Zeus */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-full md:w-96 h-56 flex-shrink-0">
              <img
                src="https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/3p74z32vzwmxb4y/chat_expandido_6tnlwpmx07.jpg"
                alt="NasServer Zeus"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                NasServer Zeus
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Servidor NAS optimizado para Zeus IA con almacenamiento en la nube y capacidades 
                de procesamiento distribuido. Ideal para proyectos empresariales que requieren 
                escalabilidad y alta disponibilidad.
              </p>
              <a
                href="https://descargas.zeus-ia.com/download/Zeus_IA_Setup_1.0.0.exe"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Descargar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
