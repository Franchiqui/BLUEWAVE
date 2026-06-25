'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Code2, FileJson, FolderTree, Globe, ChevronRight, Sparkles, Package, BookOpen, Terminal, Database, Shield, Zap, Layers, Braces, GitBranch, Workflow, Cpu, Monitor, Smartphone, Cloud, Lock, Settings, Users, Star, ArrowRight, CheckCircle, Clock, MessageSquare, Bot, Brain, Network, Server, Container, Key, Puzzle, Rocket, Palette, PenTool, Sliders, Eye, Play, Download, Upload, RefreshCw, Plus, Minus, X, Menu, ChevronDown, ChevronUp, ChevronLeft, ChevronRight as ChevronRightIcon, Home, Info, Mail, Phone, MapPin, ExternalLink, Github, Twitter, Linkedin, Youtube, Figma, Globe as GlobeIcon, Bookmark, Heart, Share2, Copy, Check, AlertCircle, Loader2, Trash2, Edit3, MoreHorizontal, FileText, Image as ImageIcon, Video, Music, Archive, File, Folder, FolderOpen, FileCode, FileJson as FileJsonIcon, FileType, FileSpreadsheet, FileImage, FileVideo, FileAudio, FileArchive, FileText as FileTextIcon, FileCode as FileCodeIcon, FileJson as FileJsonIcon2, FileType as FileTypeIcon, FileSpreadsheet as FileSpreadsheetIcon, FileImage as FileImageIcon, FileVideo as FileVideoIcon, FileAudio as FileAudioIcon, FileArchive as FileArchiveIcon } from 'lucide-react';
import { IMAGES } from '@/lib/constants';
import { PbImage } from '@/components/pb-image';
import Footer from '@/components/layout/footer';
import { useImageExpansion, ImageExpansionModal } from '@/components/image-expansion-modal';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import IdeTabContent from '@/components/ide/ide-tab-content';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import { tabImages } from '@/lib/constants';

const features = [
  {
    title: 'Explorador de Archivos',
    description: 'Navega y gestiona tu proyecto con un explorador de archivos integrado. Visualiza la estructura completa de tu aplicación.',
    icon: FolderTree,
    image: IMAGES.pestanaExplorador,
    link: '/explorador',
  },
  {
    title: 'IDE Completo',
    description: 'Editor de código con múltiples herramientas: comparador de carpetas, comparador de código, corrector de código, generador de componentes y más.',
    icon: Code2,
    image: IMAGES.pestanaIDE,
    link: '/ide',
  },
  {
    title: 'Probador de APIs',
    description: 'Prueba y depura tus endpoints REST con una interfaz intuitiva. Soporta múltiples métodos HTTP y autenticación.',
    icon: Globe,
    image: IMAGES.pestanaProbadorApis,
    link: '/probador-de-apis',
  },
  {
    title: 'Generador de Apps',
    description: 'Crea aplicaciones completas desde cero con configuración personalizada, estructura de proyecto y generación de contenido.',
    icon: Sparkles,
    image: IMAGES.pestanaGeneradorAppConfig,
    link: '/generador-de-app',
  },
  {
    title: 'Creador de Estructuras',
    description: 'Diseña y visualiza la arquitectura de tu proyecto con un creador de estructuras interactivo.',
    icon: Layers,
    image: IMAGES.pestanaCreadorEstructuras,
    link: '/creador-de-estructuras',
  },
  {
    title: 'Plan de Estructuras',
    description: 'Planifica la organización de tu proyecto con herramientas de planificación de estructuras.',
    icon: Workflow,
    image: IMAGES.pestanaPlanEstructuras,
    link: '/plan-de-estructura',
  },
  {
    title: 'Generador de APIs',
    description: 'Genera APIs REST completas con endpoints, modelos y documentación automática.',
    icon: Braces,
    image: IMAGES.pestanaGeneradorApiInicio,
    link: '/generador-de-api',
  },
  {
    title: 'Vista Previa',
    description: 'Visualiza tus aplicaciones en tiempo real con el panel de vista previa integrado.',
    icon: Eye,
    image: IMAGES.pestanaVistaPrevia,
    link: '/vista-previa',
  },
  {
    title: 'Componentes',
    description: 'Biblioteca de componentes reutilizables con diseño moderno y personalizable.',
    icon: Puzzle,
    image: IMAGES.pestanaComponentes,
    link: '/componentes',
  },
];

// URL por defecto del tutorial de vídeo. Cambia el campo `videoUrl` de cada
// herramienta para asignar un tutorial distinto a cada pestaña.
const DEFAULT_TUTORIAL_VIDEO_URL = 'https://pocketbase-zeus.fly.dev/api/files/pbc_3427925064/25h0p4965zbs411/hmi2nbpg3pm3d8w_o_ret_kz_ona_l_8p3qugtvyh.mp4';

const tools = [
  {
    id: 'folder-comparer',
    title: 'Comparador de Carpetas',
    description: 'Compara estructuras de carpetas y archivos entre diferentes versiones de tu proyecto.',
    details: 'Escaneo recursivo de dos carpetas con comparación lado a lado. Detecta archivos nuevos, modificados o eliminados entre versiones de tu proyecto. Ideal para sincronizar cambios o revisar migraciones de estructura. Accede desde app/compara-carpetas/ con escaneo recursivo y comparación en tiempo real.',
    icon: GitBranch,
    image: '/uploads/Pestaña IDE- Comparador de Carpetas.jpg',
    link: '/ide',
    keyPoints: ['Escaneo recursivo de dos carpetas', 'Comparación lado a lado', 'Detecta archivos nuevos, modificados o eliminados'],
    videoUrl: 'https://pocketbase-zeus.fly.dev/api/files/pbc_3427925064/2aijo178j5a7dj3/comparador_de_carpetas_3zb20m4vo7.mp4',
  },
  {
    id: 'code-comparer',
    title: 'Comparador de Código',
    description: 'Compara archivos de código lado a lado con resaltado de diferencias.',
    details: 'Comparación de bloques de código (diff) con resaltado de diferencias. Soporta múltiples lenguajes y resalta cambios línea por línea para facilitar revisiones de código y merges manuales. Disponible en app/compara-code/ con visualización lado a lado.',
    icon: FileCode,
    image: '/uploads/Pestaña IDE- Comparador de Codigo.jpg',
    link: '/ide',
    keyPoints: ['Comparación de bloques de código (diff)', 'Resaltado de diferencias', 'Soporta múltiples lenguajes'],
    videoUrl: 'https://pocketbase-zeus.fly.dev/api/files/pbc_3427925064/cc4e175c904249j/comparador_de_c_digo_ihz5cl86fs.mp4',
  },
  {
    id: 'code-corrector',
    title: 'Corrector de Código',
    description: 'Analiza y corrige errores de sintaxis y lógica en tu código automáticamente.',
    details: 'Analiza errores de sintaxis y lógica vía IA. Utiliza los endpoints POST /api/correct-file-code para archivos individuales y POST /api/correct-code para múltiples archivos. Aplica parches automáticos con respaldo .zeus-backup antes de cualquier modificación. Integrado con el IDE de Zeus IA.',
    icon: CheckCircle,
    image: '/uploads/Pestaña IDE- Corregir Codigo.jpg',
    link: '/ide',
    keyPoints: ['Análisis de errores de sintaxis y lógica', 'Corrección vía IA', 'Aplica parches automáticos con respaldo'],
    videoUrl: DEFAULT_TUTORIAL_VIDEO_URL,
  },
  {
    id: 'dependency-corrector',
    title: 'Corrector de Dependencias',
    description: 'Verifica y corrige dependencias faltantes o desactualizadas en tu proyecto.',
    details: 'Verifica dependencias faltantes o desactualizadas en package.json. Ejecuta reinstalación y limpieza automática vía POST /api/fix-dependencies. Compatible con npm, yarn y pnpm. Detecta versiones incompatibles y sugiere actualizaciones seguras basadas en el ecosistema de tu plantilla.',
    icon: Package,
    image: '/uploads/Pestaña IDE- Corregir Dependencias.jpg',
    link: '/ide',
    keyPoints: ['Verifica dependencias en package.json', 'Reinstalación y limpieza automática', 'Compatible con npm, yarn y pnpm'],
    videoUrl: DEFAULT_TUTORIAL_VIDEO_URL,
  },
  {
    id: 'import-corrector',
    title: 'Corrector de Importaciones',
    description: 'Detecta y corrige importaciones faltantes o incorrectas automáticamente.',
    details: 'Detecta imports faltantes o incorrectas automáticamente. Usa POST /api/fix-missing-imports para escanear el proyecto y corregir rutas de importación en archivos TypeScript/JavaScript. Reconoce alias de path (@/*) y módulos relativos, ajustando automáticamente las rutas según la estructura real del proyecto.',
    icon: FileJson,
    image: '/uploads/Pestaña IDE- Corregir Importaciones Faltantes.jpg',
    link: '/ide',
    keyPoints: ['Detecta imports faltantes o incorrectas', 'Reconoce alias de path (@/*)', 'Ajusta rutas según la estructura real'],
    videoUrl: DEFAULT_TUTORIAL_VIDEO_URL,
  },
  {
    id: 'folder-schema',
    title: 'Esquema de Carpetas',
    description: 'Visualiza la estructura completa de tu proyecto en un esquema jerárquico.',
    details: 'Visualización jerárquica completa del proyecto. Obtén el esquema simplificado vía GET /api/schema/simple o el esquema completo recursivo con GET /api/schema. Ignora node_modules, .next y archivos de build automáticamente. Perfecto para documentar la arquitectura o compartir la estructura con el equipo.',
    icon: FolderTree,
    image: '/uploads/Pestaña IDE- Esquema de Carpetas.jpg',
    link: '/ide',
    keyPoints: ['Visualización jerárquica completa', 'Esquema simplificado o completo recursivo', 'Ignora node_modules y build files'],
    videoUrl: DEFAULT_TUTORIAL_VIDEO_URL,
  },
  {
    id: 'component-generator',
    title: 'Generador de Componentes',
    description: 'Genera componentes React con TypeScript, estilos y pruebas automáticamente.',
    details: 'Genera componentes React con TypeScript, estilos Tailwind CSS y pruebas automáticamente. Integrado con el flujo de generación de apps (TwoStepAppGenerator). Crea archivos .tsx, .test.tsx y stories en segundos. Soporta componentes funcionales con hooks, server components y client components según el contexto.',
    icon: Code2,
    image: '/uploads/Pestaña IDE- Generador de Componentes.jpg',
    link: '/ide',
    keyPoints: ['Componentes React con TypeScript', 'Estilos Tailwind CSS', 'Genera .tsx, .test.tsx y stories'],
    videoUrl: DEFAULT_TUTORIAL_VIDEO_URL,
  },
  {
    id: 'icon-generator',
    title: 'Generador de Iconos',
    description: 'Crea iconos personalizados para tu aplicación con diferentes formatos y tamaños.',
    details: 'Crea iconos .ico personalizados en tamaños 16, 24, 32, 48, 128 y 256 píxeles. Soporta tres modos: generación con DALL-E 3, descarga desde URL o subida de PNG/base64. Actualiza automáticamente el favicon y los metadatos de package.json. Persiste el asset en PocketBase si se proporciona projectId.',
    icon: ImageIcon,
    image: '/uploads/Pestaña IDE- Generar Icono.jpg',
    link: '/ide',
    keyPoints: ['Iconos .ico en múltiples tamaños', 'Generación con DALL-E 3', 'Descarga desde URL o subida de PNG'],
    videoUrl: DEFAULT_TUTORIAL_VIDEO_URL,
  },
  {
    id: 'code-formatter',
    title: 'Formateador de Código',
    description: 'Formatea tu código automáticamente siguiendo las mejores prácticas y estándares.',
    details: 'Formatea automáticamente siguiendo las mejores prácticas y estándares del proyecto. Integrado en el IDE para formatear archivos individuales o carpetas completas con atajos de teclado. Respeta la configuración de Prettier y ESLint del proyecto, manteniendo la consistencia de estilo en todo el codebase.',
    icon: PenTool,
    image: '/uploads/Pestaña IDE-Formateador de Codigo.jpg',
    link: '/ide',
    keyPoints: ['Sigue mejores prácticas y estándares', 'Respeta configuración de Prettier y ESLint', 'Mantiene consistencia de estilo'],
    videoUrl: DEFAULT_TUTORIAL_VIDEO_URL,
  },
  {
    id: 'github-integration',
    title: 'Integración GitHub',
    description: 'Panel Git local y modal GitHub para gestión completa de repositorios y sincronización con GitHub.',
    details: 'Panel Git local que detecta repositorios .git automáticamente, mostrando branch activa, upstream, ahead/behind, staged/unstaged, diff inline, historial de commits y lista de ramas. Operaciones: init, add, restore --staged, commit, push, pull, checkout, branch, config. Modal GitHub con auth via PAT, lista de repos del usuario, detección automática de proyectos Next.js, creación de nuevos repos y subida de cambios vía API REST directa sin depender del CLI de git.',
    icon: Github,
    image: '/uploads/Pestaña IDE- Comparador de Carpetas.jpg',
    link: '/ide',
    keyPoints: ['Panel Git local con detección automática', 'Operaciones completas: init, add, commit, push, pull', 'Modal GitHub con auth y gestión de repos'],
    videoUrl: DEFAULT_TUTORIAL_VIDEO_URL,
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
  const { expandedImage, expandImage, closeImage } = useImageExpansion();
  const [activeTab, setActiveTab] = useState('features');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<typeof tools[0] | null>(null);
  const [activeTool, setActiveTool] = useState(tools[0].id);

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

      {/* Interactive Tools Section - Full Width replacing Search and Tabs */}
      <section className="py-8">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 px-4"
          >
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Herramientas del IDE
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explora todas las herramientas disponibles en el IDE de Zeus IA.
            </p>
          </motion.div>

          <div className="flex min-h-[600px] border border-gray-700 rounded-xl overflow-hidden mx-4">
            {/* Vertical Tab Navigation */}
            <nav className="w-64 border-r bg-gray-800/50">
              <div className="flex flex-col w-full h-full items-start bg-transparent p-0">
                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTool(tool.id)}
                    className={`w-full justify-start px-4 py-3 flex items-center transition-colors ${
                      activeTool === tool.id ? 'bg-muted text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    {tabImages[tool.id] && (
                      <Image
                        src={tabImages[tool.id]}
                        alt={tool.title}
                        width={16}
                        height={16}
                        className="h-4 w-4 mr-2"
                      />
                    )}
                    <span className="text-sm">{tool.title}</span>
                  </button>
                ))}
              </div>
            </nav>
            {/* Tab Content */}
            <div className="flex-1 bg-gray-900/50 p-6">
              {tools.map((tool) => (
                activeTool === tool.id && (
                  <div key={tool.id} className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{tool.title}</h3>
                      <p className="text-gray-400">{tool.description}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-white mb-3">Puntos Clave</h4>
                        <ul className="space-y-2">
                          {tool.keyPoints.map((point, index) => (
                            <li key={index} className="text-sm text-gray-400 flex items-start">
                              <span className="text-emerald-400 mr-2">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm text-gray-400 leading-relaxed mt-4 pt-4 border-t border-gray-700 whitespace-pre-line">{tool.details}</p>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-white mb-3">Tutorial de Vídeo</h4>
                        {tool.videoUrl && (
                          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
                            <video
                              src={tool.videoUrl}
                              controls
                              playsInline
                              preload="metadata"
                              className="w-full h-full object-contain"
                            >
                              Tu navegador no soporta la reproducción de vídeo.
                            </video>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
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
              { src: IMAGES.chatExpandido, alt: 'Chat Expandido', title: 'Chat Inteligente' },
              { src: IMAGES.modalConfiguracion, alt: 'Configuración API', title: 'Configuración de API' },
              { src: IMAGES.pestanaComponentes, alt: 'Componentes', title: 'Biblioteca de Componentes' },
              { src: IMAGES.pestanaCreadorEstructuras, alt: 'Creador de Estructuras', title: 'Creador de Estructuras' },
              { src: IMAGES.pestanaExplorador, alt: 'Explorador', title: 'Explorador de Archivos' },
              { src: IMAGES.pestanaGeneradorAppAplicacion, alt: 'App Generada', title: 'Aplicación Generada' },
              { src: IMAGES.pestanaGeneradorAppConfig, alt: 'Configuración App', title: 'Configuración de App' },
              { src: IMAGES.pestanaGeneradorAppEstructura, alt: 'Estructura App', title: 'Estructura de App' },
              { src: IMAGES.pestanaGeneradorAppGenerando, alt: 'Generando Contenido', title: 'Generación de Contenido' },
              { src: IMAGES.pestanaGeneradorApiInicio, alt: 'Generador API Inicio', title: 'Generador de API' },
              { src: IMAGES.pestanaGeneradorApiProyecto, alt: 'Generador API Proyecto', title: 'Proyecto API' },
              { src: IMAGES.pestanaIDEComparadorCarpetas, alt: 'Comparador Carpetas', title: 'Comparador de Carpetas' },
              { src: IMAGES.pestanaIDEComparadorCodigo, alt: 'Comparador Código', title: 'Comparador de Código' },
              { src: IMAGES.pestanaIDECorregirCodigo, alt: 'Corregir Código', title: 'Corrector de Código' },
              { src: IMAGES.pestanaIDECorregirDependencias, alt: 'Corregir Dependencias', title: 'Corrector de Dependencias' },
              { src: IMAGES.pestanaIDECorregirImportaciones, alt: 'Corregir Importaciones', title: 'Corrector de Importaciones' },
              { src: IMAGES.pestanaIDEEsquemaCarpetas, alt: 'Esquema Carpetas', title: 'Esquema de Carpetas' },
              { src: IMAGES.pestanaIDEGeneradorComponentes, alt: 'Generador Componentes', title: 'Generador de Componentes' },
              { src: IMAGES.pestanaIDEGenerarIcono, alt: 'Generar Icono', title: 'Generador de Iconos' },
              { src: IMAGES.pestanaIDE, alt: 'IDE', title: 'IDE Completo' },
              { src: IMAGES.pestanaIDEFormateador, alt: 'Formateador', title: 'Formateador de Código' },
              { src: IMAGES.pestanaPanelControl, alt: 'Panel Control', title: 'Panel de Control' },
              { src: IMAGES.pestanaPlanEstructuras, alt: 'Plan Estructuras', title: 'Plan de Estructuras' },
              { src: IMAGES.pestanaProbadorApis, alt: 'Probador APIs', title: 'Probador de APIs' },
              { src: IMAGES.pestanaVistaPrevia, alt: 'Vista Previa', title: 'Vista Previa' },
            ].map((image, index) => (
              <motion.div
                key={image.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative bg-gray-800/30 border border-gray-700/50 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 cursor-pointer"
                onClick={() => expandImage(image.src)}
              >
                <div className="relative h-48 overflow-hidden">
                  <PbImage
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
                    <PbImage
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
            <div className="relative h-64 md:h-80 cursor-pointer" onClick={() => expandImage(selectedTool.image)}>
              <PbImage
                src={selectedTool.image}
                alt={selectedTool.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedTool(null); }}
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

      <ImageExpansionModal 
        expandedImage={expandedImage} 
        onClose={closeImage} 
      />

      <Footer />
    </div>
  );
}



