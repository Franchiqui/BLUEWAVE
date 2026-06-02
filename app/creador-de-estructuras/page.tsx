'use client';

import Link from 'next/link';
import Footer from '@/components/layout/footer';
import { PbImage } from '@/components/pb-image';
import { IMAGES } from '@/lib/constants';
import {
  Code2,
  Layers,
  Database,
  Box,
  GitBranch,
  FileCode,
  Settings,
  Eye,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  CheckCircle2
} from 'lucide-react';


const features = [
  {
    icon: Layers,
    title: 'Estructuras Predefinidas',
    description: 'Plantillas optimizadas para Next.js, React, Node.js y más frameworks modernos.',
    image: IMAGES.pestanaCreadorEstructuras,
  },
  {
    icon: Database,
    title: 'Modelos de Datos',
    description: 'Define esquemas de base de datos y relaciones de forma visual e inteligente.',
    image: IMAGES.pestanaPlanEstructuras,
  },
  {
    icon: GitBranch,
    title: 'Arquitectura Modular',
    description: 'Genera estructuras modulares y escalables siguiendo las mejores prácticas.',
    image: IMAGES.pestanaIDEEsquemaCarpetas,
  },
  {
    icon: FileCode,
    title: 'Componentes Reutilizables',
    description: 'Crea componentes con estructura optimizada y código limpio y mantenible.',
    image: IMAGES.pestanaComponentes,
  },
  {
    icon: Box,
    title: 'Generación Automática',
    description: 'IA genera automáticamente la estructura completa de tu proyecto.',
    image: IMAGES.pestanaGeneradorAppEstructura,
  },
  {
    icon: Settings,
    title: 'Configuración Flexible',
    description: 'Personaliza cada aspecto de la estructura según tus necesidades específicas.',
    image: IMAGES.pestanaGeneradorAppConfig,
  },
];

const structureTypes = [
  {
    title: 'Frontend Moderno',
    description: 'Next.js, React, Vue, Angular con estructura optimizada',
    icon: Code2,
    image: IMAGES.pestanaIDE,
  },
  {
    title: 'Backend Escalable',
    description: 'Node.js, Express, NestJS con arquitectura limpia',
    icon: Database,
    image: IMAGES.pestanaGeneradorApiProyecto,
  },
  {
    title: 'Full Stack Completo',
    description: 'Aplicaciones completas con frontend y backend integrados',
    icon: Layers,
    image: IMAGES.pestanaGeneradorAppAplicacion,
  },
];

const steps = [
  {
    number: '01',
    title: 'Selecciona el Tipo',
    description: 'Elige entre las plantillas disponibles o crea una personalizada.',
    image: IMAGES.pestanaCreadorEstructuras,
  },
  {
    number: '02',
    title: 'Configura Opciones',
    description: 'Personaliza rutas, componentes, estilos y dependencias.',
    image: IMAGES.modalConfiguracion,
  },
  {
    number: '03',
    title: 'Genera Estructura',
    description: 'La IA genera automáticamente toda la estructura del proyecto.',
    image: IMAGES.pestanaGeneradorAppGenerando,
  },
  {
    number: '04',
    title: 'Visualiza y Edita',
    description: 'Explora la estructura generada y realiza ajustes si es necesario.',
    image: IMAGES.pestanaExplorador,
  },
];

export default function CreadorDeEstructurasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">Creador Inteligente de Estructuras</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Diseña Estructuras con{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">
                  Inteligencia Artificial
                </span>
              </h1>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Genera automáticamente la estructura perfecta para tus proyectos. 
                Desde aplicaciones web simples hasta sistemas empresariales complejos, 
                Zeus IA crea la arquitectura ideal optimizada para escalabilidad y mantenibilidad.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#generar"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-all duration-200 shadow-lg shadow-emerald-500/25"
                >
                  <Zap className="w-5 h-5" />
                  Crear Estructura
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/explorador"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium border border-gray-700 transition-all duration-200"
                >
                  <Eye className="w-5 h-5" />
                  Explorar Ejemplos
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8 pt-8 border-t border-gray-800">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-gray-400">Código Seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-gray-400">Best Practices</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-gray-400">Optimizado</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur-3xl" />
              <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
                <PbImage
                  src={IMAGES.pestanaCreadorEstructuras}
                  alt="Creador de Estructuras Zeus IA"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Estructuras */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Tipos de <span className="text-emerald-400">Estructuras</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Selecciona entre diferentes tipos de estructuras optimizadas para cada necesidad
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {structureTypes.map((type) => (
            <Link
              key={type.title}
              href="/generador-de-app"
              className="group relative bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 hover:border-emerald-500/50 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <PbImage
                  src={type.image}
                  alt={type.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <type.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{type.title}</h3>
                </div>
                <p className="text-gray-400 text-sm">{type.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Características */}
      <section className="bg-gray-900/50 border-y border-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Características <span className="text-emerald-400">Principales</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Todo lo que necesitas para crear estructuras profesionales
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <PbImage
                    src={feature.image}
                    alt={feature.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                      <feature.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo Funciona */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            ¿Cómo <span className="text-emerald-400">Funciona</span>?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Crea estructuras profesionales en 4 simples pasos
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="text-6xl font-bold text-emerald-500/20 mb-4">{step.number}</div>
              <div className="relative rounded-xl overflow-hidden mb-4 border border-gray-800">
                <PbImage
                  src={step.image}
                  alt={step.title}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-500/10 via-gray-900 to-blue-500/10 border border-gray-800 p-12 text-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="relative">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Comienza a Crear Estructuras Ahora
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Únete a miles de desarrolladores que ya utilizan Zeus IA para optimizar 
              sus proyectos con estructuras inteligentes y profesionales.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/generador-de-app"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-all duration-200 shadow-lg shadow-emerald-500/25"
              >
                <Zap className="w-5 h-5" />
                Generar Estructura
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/componentes"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium border border-gray-700 transition-all duration-200"
              >
                <Box className="w-5 h-5" />
                Ver Componentes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}