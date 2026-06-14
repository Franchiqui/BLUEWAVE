'use client';

import React, { memo, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Menu, X, Zap, MessageSquare, Code, Shield,
  ChevronRight, Star, CheckCircle, ArrowRight,
  Github, Twitter, Linkedin, Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PbImage } from '@/components/pb-image';
import { IMAGES } from '@/lib/constants';
import { useImageExpansion, ImageExpansionModal } from '@/components/image-expansion-modal';

// Types
interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface FeatureCard {
  title: string;
  description: string;
  image: string | null;
  href: string;
  tags: string[];
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string | null;
}

// Constants
const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Explorador', href: '/explorador' },
  { label: 'IDE', href: '/ide' },
  { label: 'Probador de APIs', href: '/probador-de-apis' },
  { label: 'Generador de App', href: '/generador-de-app' },
  { label: 'Creador de Estructuras', href: '/creador-de-estructuras' },
  { label: 'Plan de Estructura', href: '/plan-de-estructura' },
  { label: 'Generador de API', href: '/generador-de-api' },
  { label: 'Vista Previa', href: '/vista-previa' },
  { label: 'Componentes', href: '/componentes' },
];

const FEATURES: FeatureCard[] = [
  {
    title: 'Chat Inteligente',
    description: 'Asistente IA contextual con memoria de proyecto y generación de código en tiempo real.',
    image: IMAGES.chatExpandido,
    href: '/explorador',
    tags: ['IA', 'Chat', 'Contexto'],
  },
  {
    title: 'IDE Completo',
    description: 'Editor de código con comparador, corrector, generador de componentes y más.',
    image: IMAGES.pestanaIDE,
    href: '/ide',
    tags: ['IDE', 'Editor', 'Herramientas'],
  },
  {
    title: 'Generador de APIs',
    description: 'Crea APIs REST completas con autenticación, documentación y pruebas integradas.',
    image: IMAGES.pestanaGeneradorApiInicio,
    href: '/generador-de-api',
    tags: ['API', 'REST', 'Backend'],
  },
  {
    title: 'Generador de Apps',
    description: 'Genera aplicaciones completas con estructura, configuración y contenido automático.',
    image: IMAGES.pestanaGeneradorAppConfig,
    href: '/generador-de-app',
    tags: ['App', 'Generación', 'Full-stack'],
  },
  {
    title: 'Creador de Estructuras',
    description: 'Diseña y visualiza arquitecturas de proyectos con planos interactivos.',
    image: IMAGES.pestanaCreadorEstructuras,
    href: '/creador-de-estructuras',
    tags: ['Estructura', 'Arquitectura', 'Planos'],
  },
  {
    title: 'Probador de APIs',
    description: 'Prueba endpoints, visualiza respuestas y genera documentación automática.',
    image: IMAGES.pestanaProbadorApis,
    href: '/probador-de-apis',
    tags: ['Testing', 'API', 'Documentación'],
  },
  {
    title: 'Panel de Control',
    description: 'Vista previa en tiempo real de componentes y aplicaciones en desarrollo.',
    image: IMAGES.pestanaPanelControl,
    href: '/vista-previa',
    tags: ['Preview', 'Live', 'Debug'],
  },
  {
    title: 'Explorador de Archivos',
    description: 'Navegación visual de proyectos con esquemas de carpetas y comparadores.',
    image: IMAGES.pestanaExplorador,
    href: '/explorador',
    tags: ['Explorador', 'Archivos', 'Navegación'],
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Zeus IA transformó mi flujo de trabajo. La generación de código con IA es increíblemente precisa.',
    author: 'Ana García',
    role: 'Desarrolladora Full Stack',
    avatar: 'https://i.pravatar.cc/150?u=ana',
  },
  {
    quote: 'El mejor IDE con IA que he usado. La integración de herramientas es perfecta.',
    author: 'Carlos López',
    role: 'CTO en TechStart',
    avatar: 'https://i.pravatar.cc/150?u=carlos',
  },
  {
    quote: 'La capacidad de generar APIs completas en minutos es revolucionaria.',
    author: 'María Rodríguez',
    role: 'Ingeniera de Software',
    avatar: 'https://i.pravatar.cc/150?u=maria',
  },
];

// Components
const Navbar = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Zap className="w-8 h-8 text-green-400" />
            <span className="text-xl font-bold text-white">Zeus IA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {NAV_ITEMS.slice(0, 6).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-gray-300 hover:text-green-400 hover:bg-gray-800 rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="relative group">
              <button className="px-3 py-2 text-sm text-gray-300 hover:text-green-400 hover:bg-gray-800 rounded-md transition-colors">
                Más ▾
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {NAV_ITEMS.slice(6).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-green-400 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-gray-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-gray-900 border-b border-gray-800"
        >
          <div className="px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-sm text-gray-300 hover:text-green-400 hover:bg-gray-800 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
});

Navbar.displayName = 'Navbar';

const HeroSection = memo(({ expandImage }: { expandImage: (imageUrl: string) => void }) => (
  <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
    
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
        <div className="lg:w-1/2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Tu <span className="text-green-400">Asistente IA</span> para
              Desarrollo Full-Stack
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl">
              IDE inteligente con capacidades de IA para generar código, APIs, 
              estructuras y aplicaciones completas. Todo en un solo lugar.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link
              href="/ide"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-600 text-gray-900 font-semibold rounded-lg transition-colors"
            >
              Comenzar Gratis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/explorador"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg border border-gray-700 transition-colors"
            >
              Ver Demo
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>

          <div className="flex items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Sin registro</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Multiplataforma</span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden lg:block lg:w-1/2 mt-8 lg:mt-0"
        >
          <div className="relative cursor-pointer" onClick={() => expandImage(IMAGES.chatExpandido)}>
            <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur-2xl" />
            <PbImage
              src={IMAGES.chatExpandido}
              alt="Zeus IA Chat Interface"
              width={600}
              height={400}
              className="relative rounded-xl shadow-2xl border border-gray-700"
              priority
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
));

HeroSection.displayName = 'HeroSection';

const FeaturesSection = memo(({ expandImage }: { expandImage: (imageUrl: string) => void }) => (
  <section className="py-16 lg:py-24 bg-gray-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Todo lo que necesitas en{' '}
          <span className="text-green-400">un solo lugar</span>
        </h2>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          Desde generación de código hasta pruebas de APIs, Zeus IA cubre 
          todo el ciclo de desarrollo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div
              className="group block bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-300 cursor-pointer"
              onClick={() => feature.image && expandImage(feature.image)}
            >
              <div className="relative h-48 overflow-hidden">
                <PbImage
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                  {feature.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

FeaturesSection.displayName = 'FeaturesSection';

const TestimonialsSection = memo(({ expandImage }: { expandImage: (imageUrl: string) => void }) => (
  <section className="py-16 lg:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Lo que dicen nuestros{' '}
          <span className="text-green-400">usuarios</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((testimonial, index) => (
          <motion.div
            key={testimonial.author}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-900 rounded-xl p-6 border border-gray-800"
          >
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-300 mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
            <div className="flex items-center gap-3">
              <div className="cursor-pointer" onClick={() => testimonial.avatar && expandImage(testimonial.avatar)}>
                <PbImage
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{testimonial.author}</p>
                <p className="text-xs text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

TestimonialsSection.displayName = 'TestimonialsSection';

const CTASection = memo(() => (
  <section className="py-16 lg:py-24 bg-gradient-to-r from-green-500/10 to-blue-500/10">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
        ¿Listo para transformar tu desarrollo?
      </h2>
      <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
        Únete a miles de desarrolladores que ya usan Zeus IA para 
        acelerar su productividad.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/ide"
          className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-600 text-gray-900 font-semibold rounded-lg transition-colors"
        >
          Comenzar Ahora
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
        <Link
          href="/componentes"
          className="inline-flex items-center justify-center px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg border border-gray-700 transition-colors"
        >
          Ver Componentes
        </Link>
      </div>
    </div>
  </section>
));

CTASection.displayName = 'CTASection';

const Footer = memo(() => (
  <footer className="bg-gray-900 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="w-6 h-6 text-green-400" />
            <span className="text-lg font-bold text-white">Zeus IA</span>
          </div>
          <p className="text-gray-400 text-sm max-w-md">
            IDE inteligente con asistencia de IA para desarrollo full-stack. 
            Genera código, APIs, estructuras y aplicaciones completas.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            Producto
          </h3>
          <ul className="space-y-2">
            {NAV_ITEMS.slice(0, 5).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            Herramientas
          </h3>
          <ul className="space-y-2">
            {NAV_ITEMS.slice(5).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-800">
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Zeus IA. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
));

Footer.displayName = 'Footer';

// Main Page Component
const ComponentesPage = memo(() => {
  const { expandedImage, expandImage, closeImage } = useImageExpansion();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main>
        <HeroSection expandImage={expandImage} />
        <FeaturesSection expandImage={expandImage} />
        <TestimonialsSection expandImage={expandImage} />
        <CTASection />
      </main>
      <ImageExpansionModal expandedImage={expandedImage} onClose={closeImage} />
      <Footer />
    </div>
  );
});

ComponentesPage.displayName = 'ComponentesPage';

export default ComponentesPage;