'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Code2, FileJson, FolderTree, Globe, ChevronRight, Sparkles, Package, BookOpen, Terminal, Database, Shield, Zap, Layers, Braces, GitBranch, Workflow, Cpu, Monitor, Smartphone, Cloud, Lock, Settings, Users, Star, ArrowRight, CheckCircle, Clock, MessageSquare, Bot, Brain, Network, Server, Container, Key, Puzzle, Rocket, Palette, PenTool, Sliders, Eye, Play, Download, Upload, RefreshCw, Plus, Minus, X, Menu, ChevronDown, ChevronUp, ChevronLeft, ChevronRight as ChevronRightIcon, Home, Info, Mail, Phone, MapPin, ExternalLink, Github, Twitter, Linkedin, Youtube, Figma, Globe as GlobeIcon, Bookmark, Heart, Share2, Copy, Check, AlertCircle, Loader2, Trash2, Edit3, MoreHorizontal, FileText, Image as ImageIcon, Video, Music, Archive, File, Folder, FolderOpen, FileCode, FileJson as FileJsonIcon, FileType, FileSpreadsheet, FileImage, FileVideo, FileAudio, FileArchive, FileText as FileTextIcon, FileCode as FileCodeIcon, FileJson as FileJsonIcon2, FileType as FileTypeIcon, FileSpreadsheet as FileSpreadsheetIcon, FileImage as FileImageIcon, FileVideo as FileVideoIcon, FileAudio as FileAudioIcon, FileArchive as FileArchiveIcon } from 'lucide-react';
import Footer from '@/components/layout/footer';

const features = [
  {
    title: 'Explorador de Archivos',
    description: 'Navega y gestiona tu proyecto con un explorador de archivos integrado. Visualiza la estructura completa de tu aplicación.',
    icon: FolderTree,
    image: '/uploads/Pestaña Explorador.jpg',
    link: '/explorador',
  },
  {
    title: 'IDE Completo',
    description: 'Editor de código con múltiples herramientas: comparador de carpetas, comparador de código, corrector de código, generador de componentes y más.',
    icon: Code2,
    image: '/uploads/Pestaña IDE.jpg',
    link: '/ide',
  },
  {
    title: 'Probador de APIs',
    description: 'Prueba y depura tus endpoints REST con una interfaz intuitiva. Soporta múltiples métodos HTTP y autenticación.',
    icon: Globe,
    image: '/uploads/Pestaña Probador de Apis.jpg',
    link: '/probador-de-apis',
  },
  {
    title: 'Generador de Apps',
    description: 'Crea aplicaciones completas desde cero con configuración personalizada, estructura de proyecto y generación de contenido.',
    icon: Sparkles,
    image: '/uploads/Pestaña Generador APP-Configuracion.jpg',
    link: '/generador-de-app',
  },
  {
    title: 'Creador de Estructuras',
    description: 'Diseña y visualiza la arquitectura de tu proyecto con un creador de estructuras interactivo.',
    icon: Layers,
    image: '/uploads/Pestaña Creador de Estructuras.jpg',
    link: '/creador-de-estructuras',
  },
  {
    title: 'Plan de Estructuras',
    description: 'Planifica la organización de tu proyecto con herramientas de planificación de estructuras.',
    icon: Workflow,
    image: '/uploads/Pestaña Plan de Estructuras.jpg',
    link: '/plan-de-estructura',
  },
  {
    title: 'Generador de APIs',
    description: 'Genera APIs REST completas con endpoints, modelos y documentación automática.',
    icon: Braces,
    image: '/uploads/Pestaña Generador de Api- Inicio.jpg',
    link: '/generador-de-api',
  },
  {
    title: 'Vista Previa',
    description: 'Visualiza tus aplicaciones en tiempo real con el panel de vista previa integrado.',
    icon: Eye,
    image: '/uploads/Pestaña Vista Previa.jpg',
    link: '/vista-previa',
  },
  {
    title: 'Componentes',
    description: 'Biblioteca de componentes reutilizables con diseño moderno y personalizable.',
    icon: Puzzle,
    image: '/uploads/Pestaña Componentes.jpg',
    link: '/componentes',
  },
];

const tools = [
  {
    title: 'Comparador de Carpetas',
    description: 'Compara estructuras de carpetas y archivos entre diferentes versiones de tu proyecto.',
    details: 'Escaneo recursivo de dos carpetas con comparación lado a lado. Detecta archivos nuevos, modificados o eliminados entre versiones de tu proyecto. Ideal para sincronizar cambios o revisar migraciones de estructura. Accede desde app/compara-carpetas/ con escaneo recursivo y comparación en tiempo real.',
    icon: GitBranch,
    image: '/uploads/Pestaña IDE- Comparador de Carpetas.jpg',
    link: '/ide',
  },
  {
    title: 'Comparador de Código',
    description: 'Compara archivos de código lado a lado con resaltado de diferencias.',
    details: 'Comparación de bloques de código (diff) con resaltado de diferencias. Soporta múltiples lenguajes y resalta cambios línea por línea para facilitar revisiones de código y merges manuales. Disponible en app/compara-code/ con visualización lado a lado.',
    icon: FileCode,
    image: '/uploads/Pestaña IDE- Comparador de Codigo.jpg',
    link: '/ide',
  },
  {
    title: 'Corrector de Código',
    description: 'Analiza y corrige errores de sintaxis y lógica en tu código automáticamente.',
    details: 'Analiza errores de sintaxis y lógica vía IA. Utiliza los endpoints POST /api/correct-file-code para archivos individuales y POST /api/correct-code para múltiples archivos. Aplica parches automáticos con respaldo .zeus-backup antes de cualquier modificación. Integrado con el IDE de Zeus IA.',
    icon: CheckCircle,
    image: '/uploads/Pestaña IDE- Corregir Codigo.jpg',
    link: '/ide',
  },
  {
    title: 'Corrector de Dependencias',
    description: 'Verifica y corrige dependencias faltantes o desactualizadas en tu proyecto.',
    details: 'Verifica dependencias faltantes o desactualizadas en package.json. Ejecuta reinstalación y limpieza automática vía POST /api/fix-dependencies. Compatible con npm, yarn y pnpm. Detecta versiones incompatibles y sugiere actualizaciones seguras basadas en el ecosistema de tu plantilla.',
    icon: Package,
    image: '/uploads/Pestaña IDE- Corregir Dependencias.jpg',
    link: '/ide',
  },
  {
    title: 'Corrector de Importaciones',
    description: 'Detecta y corrige importaciones faltantes o incorrectas automáticamente.',
    details: 'Detecta imports faltantes o incorrectas automáticamente. Usa POST /api/fix-missing-imports para escanear el proyecto y corregir rutas de importación en archivos TypeScript/JavaScript. Reconoce alias de path (@/*) y módulos relativos, ajustando automáticamente las rutas según la estructura real del proyecto.',
    icon: FileJson,
    image: '/uploads/Pestaña IDE- Corregir Importaciones Faltantes.jpg',
    link: '/ide',
  },
  {
    title: 'Esquema de Carpetas',
    description: 'Visualiza la estructura completa de tu proyecto en un esquema jerárquico.',
    details: 'Visualización jerárquica completa del proyecto. Obtén el esquema simplificado vía GET /api/schema/simple o el esquema completo recursivo con GET /api/schema. Ignora node_modules, .next y archivos de build automáticamente. Perfecto para documentar la arquitectura o compartir la estructura con el equipo.',
    icon: FolderTree,
    image: '/uploads/Pestaña IDE- Esquema de Carpetas.jpg',
    link: '/ide',
  },
  {
    title: 'Generador de Componentes',
    description: 'Genera componentes React con TypeScript, estilos y pruebas automáticamente.',
    details: 'Genera componentes React con TypeScript, estilos Tailwind CSS y pruebas automáticamente. Integrado con el flujo de generación de apps (TwoStepAppGenerator). Crea archivos .tsx, .test.tsx y stories en segundos. Soporta componentes funcionales con hooks, server components y client components según el contexto.',
    icon: Code2,
    image: '/uploads/Pestaña IDE- Generador de Componentes.jpg',
    link: '/ide',
  },
  {
    title: 'Generador de Iconos',
    description: 'Crea iconos personalizados para tu aplicación con diferentes formatos y tamaños.',
    details: 'Crea iconos .ico personalizados en tamaños 16, 24, 32, 48, 128 y 256 píxeles. Soporta tres modos: generación con DALL-E 3, descarga desde URL o subida de PNG/base64. Actualiza automáticamente el favicon y los metadatos de package.json. Persiste el asset en PocketBase si se proporciona projectId.',
    icon: ImageIcon,
    image: '/uploads/Pestaña IDE- Generar Icono.jpg',
    link: '/ide',
  },
  {
    title: 'Formateador de Código',
    description: 'Formatea tu código automáticamente siguiendo las mejores prácticas y estándares.',
    details: 'Formatea automáticamente siguiendo las mejores prácticas y estándares del proyecto. Integrado en el IDE para formatear archivos individuales o carpetas completas con atajos de teclado. Respeta la configuración de Prettier y ESLint del proyecto, manteniendo la consistencia de estilo en todo el codebase.',
    icon: PenTool,
    image: '/uploads/Pestaña IDE-Formateador de Codigo.jpg',
    link: '/ide',
  },
];

const stats = [
  { label: 'Usuarios Activos', value: '10,000+' },
  { label: 'Proyectos Creados', value: '50,000+' },
  { label: 'Componentes', value: '500+' },
  { label: 'APIs Generadas', value: '25,000+' },
];

const testimonials = [
  {
    name: 'Carlos Mendoza',
    role: 'Desarrollador Full Stack',
    content: 'Zeus IA ha transformado mi flujo de trabajo. La capacidad de generar aplicaciones completas con IA es increíble.',
    avatar: '/uploads/Chat Expandido.jpg',
  },
  {
    name: 'Ana García',
    role: 'CTO en TechStart',
    content: 'La integración de todas las herramientas en una sola plataforma nos ha ahorrado horas de desarrollo.',
    avatar: '/uploads/Modal Configuracion Generar API.jpg',
  },
  {
    name: 'Luis Torres',
    role: 'Desarrollador Independiente',
    content: 'El generador de APIs y el probador integrado son herramientas que todo desarrollador debería tener.',
    avatar: '/uploads/Pestaña Generador APP-Aplicacion Generada.jpg',
  },
];

export default function ExploradorPage() {
  const [activeTab, setActiveTab] = useState('features');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<typeof tools[0] | null>(null);

  const filteredFeatures = features.filter(f =>
    f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTools = tools.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-cyan-600/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Zeus IA / IDE
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              IDE / Studio de desarrollo con asistencia de IA. Empaquetado como aplicación de escritorio multiplataforma para Windows, macOS y Linux.
            </p>
            <div className="flex flex-wrap justify-center gap-4">

              <Link
                href="/generador-de-app"
                className="inline-flex items-center px-6 py-3 bg-gray-800/50 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-200"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generar App
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Tabs */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('features')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === 'features'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                    : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-800'
                }`}
              >
                Características
              </button>
              <button
                onClick={() => setActiveTab('tools')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === 'tools'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                    : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-800'
                }`}
              >
                Herramientas
              </button>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
              />
            </div>
          </div>

          {/* Features Grid */}
          {activeTab === 'features' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-gray-800/30 border border-gray-700/50 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <feature.icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
                    <Link
                      href={feature.link}
                      className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors duration-200 text-sm"
                    >
                      Explorar
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Tools Grid */}
          {activeTab === 'tools' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool, index) => (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-gray-800/30 border border-gray-700/50 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={tool.image}
                      alt={tool.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-cyan-500/10 rounded-lg">
                        <tool.icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{tool.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{tool.description}</p>
                    <Link
                      href={tool.link}
                      className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200 text-sm"
                    >
                      Ver más
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Galería de Funcionalidades
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explora todas las capacidades de Zeus IA a través de nuestras capturas de pantalla.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: '/uploads/Chat Expandido.jpg', alt: 'Chat Expandido', title: 'Chat Inteligente' },
              { src: '/uploads/Modal Configuracion Generar API.jpg', alt: 'Configuración API', title: 'Configuración de API' },
              { src: '/uploads/Pestaña Componentes.jpg', alt: 'Componentes', title: 'Biblioteca de Componentes' },
              { src: '/uploads/Pestaña Creador de Estructuras.jpg', alt: 'Creador de Estructuras', title: 'Creador de Estructuras' },
              { src: '/uploads/Pestaña Explorador.jpg', alt: 'Explorador', title: 'Explorador de Archivos' },
              { src: '/uploads/Pestaña Generador APP-Aplicacion Generada.jpg', alt: 'App Generada', title: 'Aplicación Generada' },
              { src: '/uploads/Pestaña Generador APP-Configuracion.jpg', alt: 'Configuración App', title: 'Configuración de App' },
              { src: '/uploads/Pestaña Generador APP-Estructura.jpg', alt: 'Estructura App', title: 'Estructura de App' },
              { src: '/uploads/Pestaña Generador APP-Generando Contenido.jpg', alt: 'Generando Contenido', title: 'Generación de Contenido' },
              { src: '/uploads/Pestaña Generador de Api- Inicio.jpg', alt: 'Generador API Inicio', title: 'Generador de API' },
              { src: '/uploads/Pestaña Generador de Api- Proyecto.jpg', alt: 'Generador API Proyecto', title: 'Proyecto API' },
              { src: '/uploads/Pestaña IDE- Comparador de Carpetas.jpg', alt: 'Comparador Carpetas', title: 'Comparador de Carpetas' },
              { src: '/uploads/Pestaña IDE- Comparador de Codigo.jpg', alt: 'Comparador Código', title: 'Comparador de Código' },
              { src: '/uploads/Pestaña IDE- Corregir Codigo.jpg', alt: 'Corregir Código', title: 'Corrector de Código' },
              { src: '/uploads/Pestaña IDE- Corregir Dependencias.jpg', alt: 'Corregir Dependencias', title: 'Corrector de Dependencias' },
              { src: '/uploads/Pestaña IDE- Corregir Importaciones Faltantes.jpg', alt: 'Corregir Importaciones', title: 'Corrector de Importaciones' },
              { src: '/uploads/Pestaña IDE- Esquema de Carpetas.jpg', alt: 'Esquema Carpetas', title: 'Esquema de Carpetas' },
              { src: '/uploads/Pestaña IDE- Generador de Componentes.jpg', alt: 'Generador Componentes', title: 'Generador de Componentes' },
              { src: '/uploads/Pestaña IDE- Generar Icono.jpg', alt: 'Generar Icono', title: 'Generador de Iconos' },
              { src: '/uploads/Pestaña IDE.jpg', alt: 'IDE', title: 'IDE Completo' },
              { src: '/uploads/Pestaña IDE-Formateador de Codigo.jpg', alt: 'Formateador', title: 'Formateador de Código' },
              { src: '/uploads/Pestaña Panel de Control Vista Previa.jpg', alt: 'Panel Control', title: 'Panel de Control' },
              { src: '/uploads/Pestaña Plan de Estructuras.jpg', alt: 'Plan Estructuras', title: 'Plan de Estructuras' },
              { src: '/uploads/Pestaña Probador de Apis.jpg', alt: 'Probador APIs', title: 'Probador de APIs' },
              { src: '/uploads/Pestaña Vista Previa.jpg', alt: 'Vista Previa', title: 'Vista Previa' },
            ].map((image, index) => (
              <motion.div
                key={image.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative bg-gray-800/30 border border-gray-700/50 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-300 group-hover:text-emerald-400 transition-colors duration-200">
                    {image.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Lo que dicen nuestros usuarios
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Descubre cómo Zeus IA está transformando la forma en que los desarrolladores trabajan.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{testimonial.content}</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-900/20 to-cyan-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                ¿Listo para potenciar tu desarrollo?
              </span>
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Únete a miles de desarrolladores que ya están usando Zeus IA para crear aplicaciones increíbles.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/ide"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200 shadow-lg shadow-emerald-500/25"
              >
                <Code2 className="w-5 h-5 mr-2" />
                Comenzar ahora
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/componentes"
                className="inline-flex items-center px-8 py-3 bg-gray-800/50 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-200"
              >
                <Puzzle className="w-5 h-5 mr-2" />
                Explorar componentes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tool Detail Modal */}
      {selectedTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedTool(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-3xl w-full bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-64 md:h-80">
              <Image
                src={selectedTool.image}
                alt={selectedTool.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
              <button
                onClick={() => setSelectedTool(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <selectedTool.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{selectedTool.title}</h2>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-300 leading-relaxed mb-6 whitespace-pre-line">{selectedTool.details}</p>
              <Link
                href={selectedTool.link}
                className="inline-flex items-center px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
              >
                Usar herramienta
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
      <Footer />
    </div>
  );
}