'use client';

import Link from 'next/link';
import Footer from '@/components/layout/footer';
import { PbImage } from '@/components/pb-image';
import { IMAGES } from '@/lib/constants';
import { useImageExpansion, ImageExpansionModal } from '@/components/image-expansion-modal';



export default function PlanDeEstructuraPage() {
  const { expandedImage, expandImage, closeImage } = useImageExpansion();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-gray-100">
      

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-emerald-400">Plan de Estructura</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Visualiza y planifica la arquitectura completa de tu proyecto con la asistencia inteligente de Zeus IA.
          </p>
          <div className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-700 cursor-pointer" onClick={() => expandImage(IMAGES.pestanaPlanEstructuras)}>
            <PbImage
              src={IMAGES.pestanaPlanEstructuras}
              alt="Plan de Estructura Zeus IA"
              width={1920}
              height={1080}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-emerald-400">Herramientas de Planificación</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-emerald-500/50 transition">
              <h3 className="text-xl font-semibold text-emerald-400 mb-3">Diagrama de Arquitectura</h3>
              <p className="text-gray-400">Genera diagramas de arquitectura automáticamente desde tu código o descripción.</p>
            </div>
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-emerald-500/50 transition">
              <h3 className="text-xl font-semibold text-emerald-400 mb-3">Análisis de Dependencias</h3>
              <p className="text-gray-400">Identifica y visualiza todas las dependencias entre módulos y componentes.</p>
            </div>
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-emerald-500/50 transition">
              <h3 className="text-xl font-semibold text-emerald-400 mb-3">Plan de Migración</h3>
              <p className="text-gray-400">Crea planes detallados para migrar o refactorizar tu arquitectura actual.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial de Vídeo */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-emerald-400">Tutorial de Vídeo</h2>
          <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden bg-black border border-gray-800">
            <video
              src="https://pocketbase-zeus.fly.dev/api/files/pbc_3427925064/25h0p4965zbs411/hmi2nbpg3pm3d8w_o_ret_kz_ona_l_8p3qugtvyh.mp4"
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-contain"
            >
              Tu navegador no soporta la reproducción de vídeo.
            </video>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gray-900/60 backdrop-blur-sm rounded-2xl p-12 border border-gray-800">
          <h2 className="text-3xl font-bold text-emerald-400 mb-6">Comienza a Planificar tu Estructura</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Con Zeus IA, transforma tu visión en una arquitectura sólida y escalable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/creador-de-estructuras"
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition shadow-lg shadow-emerald-600/30"
            >
              Ir a Creador de Estructuras
            </Link>
            <Link
              href="/generador-de-app"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition shadow-lg shadow-blue-600/30"
            >
              Generar App
            </Link>
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