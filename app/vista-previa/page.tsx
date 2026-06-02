'use client';

import Link from 'next/link';
import Footer from '@/components/layout/footer';
import { PbImage } from '@/components/pb-image';
import { IMAGES } from '@/lib/constants';



export default function VistaPreviaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-gray-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">Z</div>
              <span className="text-xl font-bold text-green-400">Zeus IA</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/explorador" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Explorador</Link>
              <Link href="/ide" className="text-gray-300 hover:text-green-400 transition-colors text-sm">IDE</Link>
              <Link href="/probador-de-apis" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Probador APIs</Link>
              <Link href="/generador-de-app" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Generador App</Link>
              <Link href="/creador-de-estructuras" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Estructuras</Link>
              <Link href="/plan-de-estructura" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Plan</Link>
              <Link href="/generador-de-api" className="text-gray-300 hover:text-green-400 transition-colors text-sm">API</Link>
              <Link href="/vista-previa" className="text-green-400 font-semibold text-sm">Vista Previa</Link>
              <Link href="/componentes" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Componentes</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/auth/login" className="text-gray-300 hover:text-green-400 transition-colors text-sm">Iniciar Sesión</Link>
              <Link href="/auth/register" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">Registrarse</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-green-400">Zeus IA</span>
            <br />
            <span className="text-gray-100">Vista Previa Completa</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            IDE multiplataforma con asistencia de IA. Explora todas las herramientas y funcionalidades en una vista previa interactiva.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auth/register" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">Comenzar Gratis</Link>
            <Link href="#features" className="border border-gray-600 hover:border-green-400 text-gray-300 hover:text-green-400 px-8 py-3 rounded-lg font-medium transition-colors">Ver Características</Link>
          </div>
        </div>
      </section>

      {/* Vista Previa Principal */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-green-500/10">
            <PbImage
              src={IMAGES.pestanaVistaPrevia}
              alt="Vista previa de Zeus IA"
              width={1200}
              height={675}
              className="w-full h-auto"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-green-400 mb-2">Panel de Control</h3>
              <p className="text-gray-300">Accede a todas las herramientas desde un solo lugar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Características */}
      <section id="features" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-green-400">Herramientas</span> Principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-green-400 mb-2">Chat Inteligente</h3>
              <p className="text-gray-400">Asistente de IA contextual para desarrollo, debugging y generación de código.</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">IDE Completo</h3>
              <p className="text-gray-400">Editor de código, comparador, generador de componentes y más herramientas de desarrollo.</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-purple-400 mb-2">Generador de Apps</h3>
              <p className="text-gray-400">Crea aplicaciones completas con configuración personalizada y estructura optimizada.</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">Probador de APIs</h3>
              <p className="text-gray-400">Prueba y depura tus endpoints REST con interfaz intuitiva y resultados en tiempo real.</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all">
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-amber-400 mb-2">Creador de Estructuras</h3>
              <p className="text-gray-400">Diseña y visualiza la arquitectura de tus proyectos con planificación inteligente.</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all">
              <div className="w-12 h-12 bg-rose-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-rose-400 mb-2">Explorador Visual</h3>
              <p className="text-gray-400">Navega y gestiona tus proyectos con una interfaz visual intuitiva y potente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de Imágenes */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-green-400">Capturas</span> de Pantalla
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.chatExpandido} alt="Chat expandido de Zeus IA" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">Chat Inteligente</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.modalConfiguracion} alt="Configuración de API" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">Configuración API</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.pestanaComponentes} alt="Pestaña de componentes" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">Componentes</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.pestanaCreadorEstructuras} alt="Creador de estructuras" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">Creador de Estructuras</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.pestanaExplorador} alt="Explorador de proyectos" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">Explorador</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.pestanaGeneradorAppAplicacion} alt="App generada" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">App Generada</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.pestanaGeneradorAppConfig} alt="Configuración de app" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">Configuración App</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.pestanaGeneradorAppEstructura} alt="Estructura de app" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">Estructura App</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.pestanaGeneradorAppGenerando} alt="Generando contenido" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">Generando Contenido</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.pestanaGeneradorApiInicio} alt="Generador de API inicio" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">Generador API</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.pestanaGeneradorApiProyecto} alt="Proyecto API" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">Proyecto API</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.pestanaIDEComparadorCarpetas} alt="Comparador de carpetas" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">Comparador Carpetas</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.pestanaIDEComparadorCodigo} alt="Comparador de código" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">Comparador Código</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.pestanaIDECorregirCodigo} alt="Corregir código" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">Corregir Código</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.pestanaIDECorregirDependencias} alt="Corregir dependencias" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">Corregir Dependencias</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.pestanaIDECorregirImportaciones} alt="Corregir importaciones" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">Corregir Importaciones</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.pestanaIDEEsquemaCarpetas} alt="Esquema de carpetas" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">Esquema Carpetas</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.pestanaIDEGeneradorComponentes} alt="Generador de componentes" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">Generador Componentes</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.pestanaIDEGenerarIcono} alt="Generar icono" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">Generar Icono</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.pestanaIDE} alt="IDE principal" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">IDE Principal</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.pestanaIDEFormateador} alt="Formateador de código" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">Formateador Código</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.pestanaPanelControl} alt="Panel de control" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">Panel de Control</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.pestanaPlanEstructuras} alt="Plan de estructuras" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">Plan de Estructuras</span>
              </div>
            </div>
            <div className="relative group rounded-xl overflow-hidden border border-gray-800">
              <PbImage src={IMAGES.pestanaProbadorApis} alt="Probador de APIs" width={400} height={250} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-sm text-green-400 font-medium">Probador APIs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Lo que dicen los <span className="text-green-400">desarrolladores</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">JD</div>
                <div>
                  <h4 className="font-semibold text-green-400">Juan Díaz</h4>
                  <p className="text-sm text-gray-500">Desarrollador Full Stack</p>
                </div>
              </div>
              <p className="text-gray-400">&ldquo;Zeus IA transformó mi flujo de trabajo. El generador de apps y el chat inteligente me ahorran horas cada día.&rdquo;</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">MG</div>
                <div>
                  <h4 className="font-semibold text-green-400">María García</h4>
                  <p className="text-sm text-gray-500">Ingeniera de Software</p>
                </div>
              </div>
              <p className="text-gray-400">&ldquo;La vista previa me permitió explorar todas las herramientas antes de decidirme. Ahora no puedo trabajar sin Zeus IA.&rdquo;</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">CL</div>
                <div>
                  <h4 className="font-semibold text-green-400">Carlos López</h4>
                  <p className="text-sm text-gray-500">CTO en TechStart</p>
                </div>
              </div>
              <p className="text-gray-400">&ldquo;Implementamos Zeus IA en todo nuestro equipo. La productividad aumentó un 40% en el primer mes.&rdquo;</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-gray-900 to-blue-950 border border-gray-800 rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para <span className="text-green-400">transformar</span> tu desarrollo?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Únete a miles de desarrolladores que ya usan Zeus IA para crear aplicaciones más rápido.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auth/register" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg">Comenzar Gratis</Link>
            <Link href="/explorador" className="border border-gray-600 hover:border-green-400 text-gray-300 hover:text-green-400 px-8 py-3 rounded-lg font-medium transition-colors text-lg">Explorar Más</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}