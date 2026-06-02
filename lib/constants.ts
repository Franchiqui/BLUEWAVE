export const APP_NAME = "Zeus IA";
export const APP_DESCRIPTION = "IDE / Studio de desarrollo con asistencia de IA";

export const APP_VERSION = "1.0.0";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8742";
export const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || "https://pocketbase-render-7yol.onrender.com";

export const NAV_LINKS = [
  { label: "Explorador", href: "/explorador" },
  { label: "IDE", href: "/ide" },
  { label: "Probador de APIs", href: "/probador-de-apis" },
  { label: "Generador de App", href: "/generador-de-app" },
  { label: "Creador de Estructuras", href: "/creador-de-estructuras" },
  { label: "Plan de Estructura", href: "/plan-de-estructura" },
  { label: "Generador de API", href: "/generador-de-api" },
  { label: "Vista Previa", href: "/vista-previa" },
  { label: "Componentes", href: "/componentes" },
];

export const IDE_TABS = [
  { label: "Comparador de Carpetas", href: "/ide?tab=comparador-carpetas" },
  { label: "Comparador de Código", href: "/ide?tab=comparador-codigo" },
  { label: "Corregir Código", href: "/ide?tab=corregir-codigo" },
  { label: "Corregir Dependencias", href: "/ide?tab=corregir-dependencias" },
  { label: "Corregir Importaciones", href: "/ide?tab=corregir-importaciones" },
  { label: "Esquema de Carpetas", href: "/ide?tab=esquema-carpetas" },
  { label: "Generador de Componentes", href: "/ide?tab=generador-componentes" },
  { label: "Generar Icono", href: "/ide?tab=generar-icono" },
  { label: "Formateador de Código", href: "/ide?tab=formateador-codigo" },
];

export const THEME = {
  colors: {
    background: "#0f172a",
    surface: "#1e293b",
    surfaceLight: "#334155",
    primary: "#3b82f6",
    primaryDark: "#2563eb",
    accent: "#22c55e",
    accentDark: "#16a34a",
    text: "#f8fafc",
    textMuted: "#94a3b8",
    border: "#475569",
    error: "#ef4444",
    warning: "#f59e0b",
    success: "#22c55e",
  },
};

// IDs de las colecciones en PocketBase
const IMAGENES_COLLECTION_ID = 'pbc_1998862360';

// Helper para construir URL de imagen desde PocketBase
// Usa los IDs de registro que debes obtener después de subir las imágenes
const pbImage = (recordId: string, fieldName: string = 'field') => {
  return `${POCKETBASE_URL}/api/files/${IMAGENES_COLLECTION_ID}/${recordId}/${fieldName}`;
};

export const IMAGES = {
  // Sube cada imagen a PocketBase (colección 'imagenes') y usa el recordId retornado
  // Ejemplo: sube "Chat Expandido.jpg" al campo 'field' y usa el ID del registro
  chatExpandido: pbImage('RECORD_ID_CHAT_EXPANDIDO', 'field'),
  modalConfiguracion: pbImage('RECORD_ID_MODAL_CONFIG', 'field'),
  pestanaComponentes: pbImage('RECORD_ID_COMPONENTES', 'field'),
  pestanaCreadorEstructuras: pbImage('RECORD_ID_CREADOR', 'field'),
  pestanaExplorador: pbImage('RECORD_ID_EXPLORADOR', 'field'),
  pestanaGeneradorAppAplicacion: pbImage('RECORD_ID_GEN_APP', 'field'),
  pestanaGeneradorAppConfig: pbImage('RECORD_ID_GEN_APP_CONFIG', 'field'),
  pestanaGeneradorAppEstructura: pbImage('RECORD_ID_GEN_APP_ESTRUCTURA', 'field'),
  pestanaGeneradorAppGenerando: pbImage('RECORD_ID_GEN_APP_GENERANDO', 'field'),
  pestanaGeneradorApiInicio: pbImage('RECORD_ID_GEN_API_INICIO', 'field'),
  pestanaGeneradorApiProyecto: pbImage('RECORD_ID_GEN_API_PROYECTO', 'field'),
  pestanaIDEComparadorCarpetas: pbImage('RECORD_ID_IDE_COMPARADOR_CARPETAS', 'field'),
  pestanaIDEComparadorCodigo: pbImage('RECORD_ID_IDE_COMPARADOR_CODIGO', 'field'),
  pestanaIDECorregirCodigo: pbImage('RECORD_ID_IDE_CORREGIR_CODIGO', 'field'),
  pestanaIDECorregirDependencias: pbImage('RECORD_ID_IDE_CORREGIR_DEPENDENCIAS', 'field'),
  pestanaIDECorregirImportaciones: pbImage('RECORD_ID_IDE_CORREGIR_IMPORTACIONES', 'field'),
  pestanaIDEEsquemaCarpetas: pbImage('RECORD_ID_IDE_ESQUEMA', 'field'),
  pestanaIDEGeneradorComponentes: pbImage('RECORD_ID_IDE_GENERADOR_COMPONENTES', 'field'),
  pestanaIDEGenerarIcono: pbImage('RECORD_ID_IDE_GENERAR_ICONO', 'field'),
  pestanaIDE: pbImage('RECORD_ID_IDE', 'field'),
  pestanaIDEFormateador: pbImage('RECORD_ID_IDE_FORMATEADOR', 'field'),
  pestanaPanelControl: pbImage('RECORD_ID_PANEL_CONTROL', 'field'),
  pestanaPlanEstructuras: pbImage('RECORD_ID_PLAN_ESTRUCTURAS', 'field'),
  pestanaProbadorApis: pbImage('RECORD_ID_PROBADOR_APIS', 'field'),
  pestanaVistaPrevia: pbImage('RECORD_ID_VISTA_PREVIA', 'field'),
};

export const FEATURES = [
  {
    title: "Chat Inteligente",
    description: "Asistente de IA contextual para desarrollo",
    image: IMAGES.chatExpandido,
    href: "/chat",
  },
  {
    title: "IDE Completo",
    description: "Editor de código con múltiples herramientas",
    image: IMAGES.pestanaIDE,
    href: "/ide",
  },
  {
    title: "Generador de Apps",
    description: "Crea aplicaciones completas con IA",
    image: IMAGES.pestanaGeneradorAppAplicacion,
    href: "/generador-de-app",
  },
  {
    title: "Generador de APIs",
    description: "Diseña y genera APIs RESTful",
    image: IMAGES.pestanaGeneradorApiInicio,
    href: "/generador-de-api",
  },
  {
    title: "Probador de APIs",
    description: "Prueba y depura tus endpoints",
    image: IMAGES.pestanaProbadorApis,
    href: "/probador-de-apis",
  },
  {
    title: "Explorador",
    description: "Navega y gestiona tu proyecto",
    image: IMAGES.pestanaExplorador,
    href: "/explorador",
  },
  {
    title: "Creador de Estructuras",
    description: "Diseña arquitecturas de proyecto",
    image: IMAGES.pestanaCreadorEstructuras,
    href: "/creador-de-estructuras",
  },
  {
    title: "Plan de Estructura",
    description: "Planifica la estructura de tu app",
    image: IMAGES.pestanaPlanEstructuras,
    href: "/plan-de-estructura",
  },
  {
    title: "Vista Previa",
    description: "Previsualiza tu aplicación en tiempo real",
    image: IMAGES.pestanaVistaPrevia,
    href: "/vista-previa",
  },
  {
    title: "Componentes",
    description: "Biblioteca de componentes reutilizables",
    image: IMAGES.pestanaComponentes,
    href: "/componentes",
  },
];

export const AUTH_CONFIG = {
  sessionMaxAge: 60 * 60 * 24 * 7, // 7 days
  tokenKey: "zeus_ia_token",
  userKey: "zeus_ia_user",
};

export const CHAT_CONFIG = {
  maxMessages: 100,
  maxMessageLength: 4000,
  typingIndicator: true,
  streamingEnabled: true,
};

export const ERROR_MESSAGES = {
  network: "Error de conexión. Verifica tu internet.",
  auth: "Sesión expirada. Inicia sesión nuevamente.",
  generic: "Ocurrió un error. Intenta de nuevo.",
  validation: "Datos inválidos. Revisa los campos.",
};