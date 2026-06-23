'use client';

import Link from 'next/link';
import Footer from '@/components/layout/footer';
import { PbImage } from '@/components/pb-image';
import { IMAGES } from '@/lib/constants';
import { useImageExpansion, ImageExpansionModal } from '@/components/image-expansion-modal';
import {
  BeakerIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ServerStackIcon,
  PlayIcon,
  TrashIcon,
  PlusIcon,
  ClipboardDocumentIcon,
  ArrowDownTrayIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';



const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'] as const;

const recentRequests = [
  { method: 'GET' as const, url: 'https://api.zeus-ia.com/v1/users', status: 200, time: '2.3s' },
  { method: 'POST' as const, url: 'https://api.zeus-ia.com/v1/auth/login', status: 201, time: '1.1s' },
  { method: 'DELETE' as const, url: 'https://api.zeus-ia.com/v1/users/123', status: 204, time: '0.8s' },
  { method: 'GET' as const, url: 'https://api.zeus-ia.com/v1/projects', status: 200, time: '3.5s' },
];

const savedCollections = [
  { name: 'Autenticación', count: 5, color: 'bg-emerald-500' },
  { name: 'Usuarios CRUD', count: 8, color: 'bg-blue-500' },
  { name: 'Proyectos', count: 12, color: 'bg-purple-500' },
  { name: 'Webhooks', count: 3, color: 'bg-amber-500' },
];

export default function ProbadorDeAPIsPage() {
  const { expandedImage, expandImage, closeImage } = useImageExpansion();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-emerald-400 flex items-center gap-3">
              <BeakerIcon className="w-8 h-8" />
              Probador de APIs
            </h1>
            <p className="mt-2 text-gray-400 max-w-2xl">
              Prueba, depura y documenta tus APIs REST con el cliente HTTP integrado de Zeus IA. 
              Soporta múltiples métodos, autenticación y exportación de colecciones.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Link
              href="/generador-de-api"
              className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors text-sm"
            >
              <CodeBracketIcon className="w-4 h-4 mr-2" />
              Generar API
            </Link>
            <button className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors text-sm">
              <PlusIcon className="w-4 h-4 mr-2" />
              Nueva Solicitud
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Request Builder */}
          <div className="lg:col-span-2 space-y-6">
            {/* Request Builder Card */}
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                <PlayIcon className="w-5 h-5 text-emerald-400" />
                Constructor de Solicitudes
              </h2>
              
              {/* Method & URL */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <select className="bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  {httpMethods.map((method) => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="https://api.ejemplo.com/v1/endpoint"
                  className="flex-1 bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder-gray-500"
                />
                <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2">
                  <ArrowPathIcon className="w-4 h-4" />
                  Enviar
                </button>
              </div>

              {/* Tabs: Headers, Body, Auth */}
              <div className="border-b border-gray-800 mb-4">
                <nav className="flex gap-6 -mb-px">
                  {['Headers', 'Body', 'Auth', 'Params'].map((tab) => (
                    <button
                      key={tab}
                      className="text-sm text-gray-400 hover:text-emerald-400 border-b-2 border-transparent hover:border-emerald-400 pb-3 transition-colors"
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Headers Example */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-emerald-400">Content-Type:</span>
                  <span className="text-gray-300">application/json</span>
                  <button className="ml-auto text-gray-500 hover:text-red-400">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-emerald-400">Authorization:</span>
                  <span className="text-gray-300">Bearer ••••••••••••</span>
                  <button className="ml-auto text-gray-500 hover:text-red-400">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
                <button className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 mt-2">
                  <PlusIcon className="w-4 h-4" />
                  Agregar Header
                </button>
              </div>
            </div>

            {/* Response Card */}
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                  Respuesta
                </h2>
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircleIcon className="w-4 h-4" />
                    Status: 200 OK
                  </span>
                  <span className="flex items-center gap-1 text-gray-400">
                    <ClockIcon className="w-4 h-4" />
                    2.3s
                  </span>
                </div>
              </div>

              <div className="bg-gray-950 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300 font-mono">
{`{
  "users": [
    {
      "id": "usr_123456",
      "name": "Juan Pérez",
      "email": "juan@ejemplo.com",
      "role": "admin",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 42,
  "page": 1,
  "limit": 10
}`}
                </pre>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                  <ClipboardDocumentIcon className="w-4 h-4" />
                  Copiar
                </button>
                <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  Exportar
                </button>
              </div>
            </div>

            {/* Tutorial de Vídeo */}
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-200 mb-4">Tutorial de Vídeo</h2>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black border border-gray-700">
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
          </div>

          {/* Right Column - History & Collections */}
          <div className="space-y-6">
            {/* Recent Requests */}
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-emerald-400" />
                Solicitudes Recientes
              </h2>
              <div className="space-y-3">
                {recentRequests.map((req, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      req.method === 'GET' ? 'bg-emerald-900/50 text-emerald-400' :
                      req.method === 'POST' ? 'bg-blue-900/50 text-blue-400' :
                      req.method === 'DELETE' ? 'bg-red-900/50 text-red-400' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {req.method}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-300 truncate">{req.url}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-xs ${
                          req.status < 300 ? 'text-emerald-400' :
                          req.status < 400 ? 'text-amber-400' :
                          'text-red-400'
                        }`}>
                          {req.status}
                        </span>
                        <span className="text-xs text-gray-500">{req.time}</span>
                      </div>
                    </div>
                    <button className="text-gray-500 hover:text-emerald-400">
                      <ArrowPathIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Collections */}
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                <ServerStackIcon className="w-5 h-5 text-emerald-400" />
                Colecciones Guardadas
              </h2>
              <div className="space-y-3">
                {savedCollections.map((collection, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                    <div className={`w-2 h-2 rounded-full ${collection.color}`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-300">{collection.name}</p>
                      <p className="text-xs text-gray-500">{collection.count} solicitudes</p>
                    </div>
                    <button className="text-gray-500 hover:text-emerald-400">
                      <Cog6ToothIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors text-sm">
                <PlusIcon className="w-4 h-4" />
                Nueva Colección
              </button>
            </div>

            {/* Quick Tips */}
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                <ExclamationTriangleIcon className="w-5 h-5 text-amber-400" />
                Tips Rápidos
              </h2>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  Usa variables de entorno para URLs y tokens sensibles
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  Las colecciones se pueden exportar como OpenAPI 3.0
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  Activa el modo oscuro automático en configuraciones
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  Usa snippets predefinidos para autenticación común
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Pages Navigation */}
        <div className="mt-8 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-200 mb-4">Herramientas Relacionadas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { name: 'Explorador', href: '/explorador', icon: CodeBracketIcon },
              { name: 'IDE', href: '/ide', icon: DocumentTextIcon },
              { name: 'Generador de App', href: '/generador-de-app', icon: BeakerIcon },
              { name: 'Creador de Estructuras', href: '/creador-de-estructuras', icon: ServerStackIcon },
              { name: 'Plan de Estructura', href: '/plan-de-estructura', icon: DocumentTextIcon },
              { name: 'Generador de API', href: '/generador-de-api', icon: CodeBracketIcon },
              { name: 'Vista Previa', href: '/vista-previa', icon: PlayIcon },
              { name: 'Componentes', href: '/componentes', icon: Cog6ToothIcon },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors text-sm text-gray-300 hover:text-emerald-400"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <ImageExpansionModal 
        expandedImage={expandedImage} 
        onClose={closeImage} 
      />

      <Footer />
    </div>
  );
}