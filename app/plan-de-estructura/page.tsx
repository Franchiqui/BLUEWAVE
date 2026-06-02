'use client';

import Link from 'next/link';
import Footer from '@/components/layout/footer';
import { PbImage } from '@/components/pb-image';
import { IMAGES } from '@/lib/constants';



export default function PlanDeEstructuraPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-gray-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-emerald-400">Zeus IA</span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/explorador" className="text-gray-300 hover:text-emerald-400 transition">Explorador</Link>
              <Link href="/ide" className="text-gray-300 hover:text-emerald-400 transition">IDE</Link>
              <Link href="/probador-de-apis" className="text-gray-300 hover:text-emerald-400 transition">Probador de APIs</Link>
              <Link href="/generador-de-app" className="text-gray-300 hover:text-emerald-400 transition">Generador App</Link>
              <Link href="/creador-de-estructuras" className="text-gray-300 hover:text-emerald-400 transition">Creador Estructuras</Link>
              <Link href="/plan-de-estructura" className="text-emerald-400 font-semibold border-b-2 border-emerald-400">Plan Estructura</Link>
              <Link href="/generador-de-api" className="text-gray-300 hover:text-emerald-400 transition">Generador API</Link>
              <Link href="/vista-previa" className="text-gray-300 hover:text-emerald-400 transition">Vista Previa</Link>
              <Link href="/componentes" className="text-gray-300 hover:text-emerald-400 transition">Componentes</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-emerald-400">Plan de Estructura</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Visualiza y planifica la arquitectura completa de tu proyecto con la asistencia inteligente de Zeus IA.
          </p>
          <div className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-700">
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

      {/* Gallery Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-emerald-400">Vistas del Plan de Estructura</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative rounded-xl overflow-hidden border border-gray-800 group">
              <PbImage
                src={IMAGES.pestanaIDEEsquemaCarpetas}
                alt="Esquema de Carpetas"
                width={800}
                height={600}
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent flex items-end p-4">
                <span className="text-emerald-400 font-semibold">Esquema de Carpetas</span>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-gray-800 group">
              <PbImage
                src={IMAGES.pestanaIDEComparadorCarpetas}
                alt="Comparador de Carpetas"
                width={800}
                height={600}
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent flex items-end p-4">
                <span className="text-emerald-400 font-semibold">Comparador de Carpetas</span>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-gray-800 group">
              <PbImage
                src={IMAGES.pestanaIDEComparadorCodigo}
                alt="Comparador de Código"
                width={800}
                height={600}
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent flex items-end p-4">
                <span className="text-emerald-400 font-semibold">Comparador de Código</span>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-gray-800 group">
              <PbImage
                src={IMAGES.pestanaIDECorregirCodigo}
                alt="Corregir Código"
                width={800}
                height={600}
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent flex items-end p-4">
                <span className="text-emerald-400 font-semibold">Corregir Código</span>
              </div>
            </div>
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

      <Footer />
    </div>
  );
}