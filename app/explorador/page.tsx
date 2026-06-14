'use client';

import Link from 'next/link';
import Footer from '@/components/layout/footer';
import { PbImage } from '@/components/pb-image';
import { IMAGES } from '@/lib/constants';
import { useImageExpansion, ImageExpansionModal } from '@/components/image-expansion-modal';

export default function HomePage() {
  const { expandedImage, expandImage, closeImage } = useImageExpansion();
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Pestaña <span className="text-emerald-400">Explorador</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                El panel principal de navegación y gestión de archivos dentro del entorno de desarrollo de Zeus. Su función es similar a la de un explorador de archivos de cualquier sistema operativo o IDE, pero está optimizado para trabajar con los proyectos que creas y modificas a través de la API.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/ide"
                  className="inline-flex items-center px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Ir al IDE
                </Link>
              </div>
            </div>
            <div className="relative cursor-pointer" onClick={() => expandImage(IMAGES.pestanaExplorador)}>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-2xl blur-3xl" />
              <PbImage
                src={IMAGES.pestanaExplorador}
                alt="Pestaña Explorador"
                width={800}
                height={600}
                className="relative rounded-2xl shadow-2xl border border-gray-700"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-16">
          {/* Introduction */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 lg:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              ¿Qué es el Explorador?
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              El Explorador es tu <span className="text-emerald-400 font-semibold">mesa de trabajo visual</span>. Te permite ver, organizar y seleccionar los archivos de tu proyecto, mientras que la IA es la "mano de obra" que los crea, modifica y elimina según tus instrucciones.
            </p>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
              Funcionalidades <span className="text-emerald-400">Principales</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl p-8 hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Visualización del Árbol de Directorios</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Muestra de forma jerárquica todas las carpetas y archivos de tu proyecto actual. Puedes expandir y colapsar las carpetas para navegar por la estructura del proyecto.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl p-8 hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Gestión de Archivos y Carpetas</h3>
                    <ul className="text-gray-400 space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        <strong>Crear:</strong> Nuevos archivos y carpetas directamente desde la interfaz
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        <strong>Renombrar:</strong> Cambiar el nombre de cualquier archivo o carpeta
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        <strong>Eliminar:</strong> Borrar archivos o carpetas completas
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        <strong>Mover/Copiar:</strong> Reorganizar la estructura del proyecto
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl p-8 hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Apertura de Archivos en el Editor</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Al hacer clic en un archivo (`.tsx`, `.js`, `.json`, `.css`, etc.), este se abre en el editor de código central de Zeus, permitiéndote ver y modificar su contenido.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl p-8 hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Contexto para la IA</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Es la herramienta que utilizas para indicarle a la IA <strong>qué</strong> archivos debe leer o modificar. Cuando seleccionas un archivo en el explorador, le estás dando contexto a la IA para que pueda trabajar sobre él.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How it relates to AI */}
          <div className="bg-gradient-to-r from-emerald-900/30 to-blue-900/30 border border-emerald-700/50 rounded-2xl p-8 lg:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              ¿Cómo se relaciona con la IA?
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Cuando tú me pides, por ejemplo, <span className="text-emerald-400 font-semibold">"crea una carpeta `components` dentro de `app`"</span>, o <span className="text-emerald-400 font-semibold">"abre el archivo `page.tsx`"</span>, estás interactuando con la lógica que subyace a esta pestaña.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Yo, como IA, ejecuto las acciones a través de la API que manipula exactamente esta estructura de archivos que ves en el Explorador.
            </p>
          </div>

          {/* Summary */}
          <div className="text-center py-12">
            <div className="inline-block bg-gray-900/50 border border-gray-800 rounded-2xl p-8 lg:p-12 max-w-3xl">
              <p className="text-xl text-gray-300 leading-relaxed">
                <span className="text-emerald-400 font-bold">En resumen:</span> El Explorador es tu "mesa de trabajo visual". Te permite ver, organizar y seleccionar los archivos de tu proyecto, mientras que la IA es la "mano de obra" que los crea, modifica y elimina según tus instrucciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ImageExpansionModal 
        expandedImage={expandedImage} 
        onClose={closeImage} 
      />

      <Footer />
    </div>
  );
}