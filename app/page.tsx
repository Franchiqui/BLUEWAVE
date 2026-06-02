'use client';

import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/layout/footer';
import { 
  MessageSquare, 
  Code2, 
  Box, 
  Layout, 
  GitBranch, 
  Shield, 
  Zap, 
  Database,
  ChevronRight,
  Star,
  Users,
  Sparkles
} from 'lucide-react';


const features = [
  {
    title: 'Chat Inteligente',
    description: 'Asistente de IA contextual que entiende tu código y proyecto',
    image: '/uploads/Chat Expandido.jpg',
    href: '/explorador',
    icon: MessageSquare,
  },
  {
    title: 'IDE Completo',
    description: 'Editor con comparador de código, formateador, generador de componentes y más',
    image: '/uploads/Pestaña IDE.jpg',
    href: '/ide',
    icon: Code2,
  },
  {
    title: 'Generador de APIs',
    description: 'Crea APIs REST completas con configuración automatizada',
    image: '/uploads/Pestaña Generador de Api- Inicio.jpg',
    href: '/generador-de-api',
    icon: Database,
  },
  {
    title: 'Generador de Apps',
    description: 'Genera aplicaciones completas con estructura y configuración',
    image: '/uploads/Pestaña Generador APP-Aplicacion Generada.jpg',
    href: '/generador-de-app',
    icon: Layout,
  },
  {
    title: 'Creador de Estructuras',
    description: 'Diseña y planifica la arquitectura de tus proyectos',
    image: '/uploads/Pestaña Creador de Estructuras.jpg',
    href: '/creador-de-estructuras',
    icon: GitBranch,
  },
  {
    title: 'Probador de APIs',
    description: 'Prueba y depura tus endpoints REST directamente',
    image: '/uploads/Pestaña Probador de Apis.jpg',
    href: '/probador-de-apis',
    icon: Shield,
  },
  {
    title: 'Componentes UI',
    description: 'Biblioteca de componentes reutilizables con vista previa',
    image: '/uploads/Pestaña Componentes.jpg',
    href: '/componentes',
    icon: Box,
  },
  {
    title: 'Vista Previa',
    description: 'Previsualiza tus aplicaciones en tiempo real',
    image: '/uploads/Pestaña Vista Previa.jpg',
    href: '/vista-previa',
    icon: Zap,
  },
];

const testimonials = [
  {
    name: 'Carlos Mendoza',
    role: 'Desarrollador Full Stack',
    content: 'Zeus IA ha transformado mi flujo de trabajo. La asistencia de IA es increíblemente precisa y el generador de APIs me ahorra horas de trabajo.',
    avatar: '/uploads/Chat Expandido.jpg',
  },
  {
    name: 'Ana García',
    role: 'CTO en TechStart',
    content: 'La capacidad de generar estructuras completas de proyectos y la integración con el IDE es simplemente revolucionaria.',
    avatar: '/uploads/Pestaña IDE.jpg',
  },
  {
    name: 'Miguel Torres',
    role: 'Desarrollador Independiente',
    content: 'El mejor asistente de IA para desarrollo que he usado. La precisión en la generación de código es asombrosa.',
    avatar: '/uploads/Pestaña Generador de Api- Inicio.jpg',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-emerald-400" />
              <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">Zeus IA v2.0</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Tu <span className="text-emerald-400">IDE Inteligente</span> con
              <br />
              Asistencia de IA
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              Studio de desarrollo multiplataforma con asistencia de IA. 
              Next.js 16, React 19, TypeScript, Tailwind CSS y más tecnologías modernas integradas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/explorador"
                className="inline-flex items-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/40"
              >
                Comenzar Gratis
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/ide"
                className="inline-flex items-center px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl border border-gray-700 transition-all duration-200"
              >
                Ver Demo
                <Code2 className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Usuarios Activos', value: '10K+', icon: Users },
            { label: 'Proyectos Generados', value: '50K+', icon: Code2 },
            { label: 'APIs Creadas', value: '25K+', icon: Database },
            { label: 'Valoración', value: '4.9/5', icon: Star },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 text-center">
              <stat.icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Todo lo que necesitas en un solo lugar
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Desde chat inteligente hasta generación completa de aplicaciones, Zeus IA cubre todo tu flujo de desarrollo.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <feature.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Architecture Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-8 sm:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Arquitectura Moderna y Escalable
              </h2>
              <div className="space-y-4">
                {[
                  { title: 'Frontend', desc: 'Next.js 16 + React 19 + TypeScript + Tailwind CSS' },
                  { title: 'Backend Local', desc: 'Express.js en puerto 8742 para servicios locales' },
                  { title: 'Base de Datos', desc: 'PocketBase local/remoto + Prisma + SQLite' },
                  { title: 'Escritorio', desc: 'Electron 41 con proceso principal integrado' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-emerald-400 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
              <Image
                src="/uploads/Pestaña IDE- Esquema de Carpetas.jpg"
                alt="Arquitectura Zeus IA"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-gray-400 text-lg">Más de 10,000 desarrolladores confían en Zeus IA</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300">{testimonial.content}</p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent rounded-3xl border border-emerald-500/20 p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            ¿Listo para transformar tu desarrollo?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Únete a miles de desarrolladores que ya están usando Zeus IA para crear aplicaciones increíbles.
          </p>
          <Link
            href="/explorador"
            className="inline-flex items-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/40"
          >
            Comenzar Ahora
            <Sparkles className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
