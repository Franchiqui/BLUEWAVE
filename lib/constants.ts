export const APP_NAME = "Zeus IA";
export const APP_DESCRIPTION = "IDE / Studio de desarrollo con asistencia de IA";

export const APP_VERSION = "1.0.0";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8742";
export const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || "https://pocketbase-zeus.fly.dev";

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
  { label: "Biblioteca", href: "/biblioteca" },
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
  { label: "Integracion GitHub", href: "/ide?tab=integracion-github" },
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

// Helper para URL completa directa
const pbImageUrl = (url: string) => url;

export const IMAGES = {
  // Imágenes subidas a PocketBase (colección 'imagenes')
  chatExpandido: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/3p74z32vzwmxb4y/chat_expandido_6tnlwpmx07.jpg'),
  modalConfiguracion: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/0512023r4670wd9/modal_configuracion_generar_api_rav0rob95c.jpg'),
  pestanaComponentes: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/7wip0313k11wp24/pesta_a_componentes_op1v8mjd68.jpg'),
  pestanaCreadorEstructuras: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/ph987oh3g7u5mzq/pesta_a_creador_de_estructuras_elvzmcu9z3.jpg'),
  pestanaExplorador: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/o8gs8t20b116zi1/pesta_a_explorador_vqsnlzkai4.jpg'),
  pestanaGeneradorAppAplicacion: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/c0010chn4du3502/pesta_a_generador_app_aplicacion_generada_9mpy1t9qg2.jpg'),
  pestanaGeneradorAppConfig: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/b8v58di996w82hr/pesta_a_generador_app_configuracion_q2783ju3av.jpg'),
  pestanaGeneradorAppEstructura: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/je98fx2v3bze3x4/pesta_a_generador_app_estructura_yoa899uyss.jpg'),
  pestanaGeneradorAppGenerando: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/uiz885mqtu8s1ea/pesta_a_generador_app_generando_contenido_06oljx2ige.jpg'),
  pestanaGeneradorApiInicio: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/4u9xda3u889l9qn/pesta_a_generador_de_api_inicio_lt33o4lus0.jpg'),
  pestanaGeneradorApiProyecto: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/7yxgmvae9u829bj/pesta_a_generador_de_api_proyecto_u73eyjaorc.jpg'),
  pestanaIDEComparadorCarpetas: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/cj826o4k55uqv1d/pesta_a_ide_comparador_de_carpetas_yv6h90cgc3.jpg'),
  pestanaIDEComparadorCodigo: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/1p6lph331840dca/pesta_a_ide_comparador_de_codigo_t551p7m1iq.jpg'),
  pestanaIDECorregirCodigo: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/jxodiy2ox997018/pesta_a_ide_corregir_codigo_af7oza4tu3.jpg'),
  pestanaIDECorregirDependencias: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/0y26c864ef2v67v/pesta_a_ide_corregir_dependencias_a6jgwgyasz.jpg'),
  pestanaIDECorregirImportaciones: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/r09f1374498t0p8/pesta_a_ide_corregir_importaciones_faltantes_8cfatzkbs2.jpg'),
  pestanaIDEEsquemaCarpetas: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/124ongvp0b0l3x4/pesta_a_ide_esquema_de_carpetas_hpvzcuydz4.jpg'),
  pestanaIDEGeneradorComponentes: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/643b371j025nx4e/pesta_a_ide_generador_de_componentes_pfuxe2pjjz.jpg'),
  pestanaIDEGenerarIcono: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/we6jj86wn61714x/pesta_a_ide_generar_icono_8bmsjgpwu7.jpg'),
  pestanaIDE: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/o3v23amaf40fw1h/pesta_a_ide_9j9cav5vqb.jpg'),
  pestanaIDEFormateador: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/6rrb08dn6q9p57c/pesta_a_ide_formateador_de_codigo_69ofzxtfaz.jpg'),
  pestanaPanelControl: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/v03063hk306ire4/pesta_a_panel_de_control_vista_previa_1ova53tqrc.jpg'),
  pestanaPlanEstructuras: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/i7nj3e3589tg2ie/pesta_a_plan_de_estructuras_mbg32ir8kc.jpg'),
  pestanaProbadorApis: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/0t9dpmkud87fh4f/pesta_a_probador_de_apis_uhu4f4rwh8.jpg'),
  pestanaVistaPrevia: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/a4sxc055ceu161y/pesta_a_vista_previa_dp64v9p0nt.jpg'),
  pestanaIDEModalIntegracionGitHubTOKEN: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/5egf568l8oas322/modal_integracion_con_git_hub_token_2_s4jbz8478e.jpg'),
  pestanaIDEModalIntegracionGitHubNuevoRepo: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/2p88k09352c8xqv/modal_integracion_con_git_hub_nuevo_repo_2_ggtrccv006.jpg'),
  pestanaIDEModalIntegracionGitHubMisRepos: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/900b0tr72n80o9q/modal_integracion_con_git_hub_mis_repos_2_ej0lp6yt0n.jpg'),
  pestanaIDEModalIntegracionGitHubClonarRepos: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/j3k0usd6zrf87p9/modal_integracion_con_git_hub_clonar_repo_2_jrnol81060.jpg'),
  pestanaIDEModalIntegracionGitHubActualizarRepos: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/m5emj55w69176ru/modal_integracion_con_git_hub_actualizar_repo_okcdr00e2d.jpg'),
  pestanaBiblioteca: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/3xn82315abefg11/pesta_a_biblioteca_jnq4bnieux.jpg'),
  temaMorado: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/47n87u42irh6kvv/tema_morado_zhabf5fxwn.jpg'),
  temaOceano: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/122c4h3dqtsgkd5/tema_oceano_ro0mpmaviv.jpg'),
  temaSafari: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/tl4nt4us52ac4s4/tema_safari_ipqsrfxqur.jpg'),
  temaSelva: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/rj876a4sw66ch6t/tema_selva_vzgo9t1uat.jpg'),
  ModalEditorTemasIU: pbImageUrl('https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/74m3qvl6l7338zp/modal_editor_temas_iu_ifkhozxbpt.jpg'),
};

// Helper para verificar si una imagen está disponible
export function hasImage(imagePath: string | null): boolean {
  return imagePath !== null && imagePath !== undefined;
}

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
  {
    title: "Biblioteca",
    description: "Biblioteca de código y aplicaciones generadas con Zeus IA",
    image: IMAGES.pestanaBiblioteca,
    href: "/biblioteca",
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

// lib/constants.ts
// Existing constants (preserve as-is)

export const SITE_DESCRIPTION =
  "Plataforma integral de desarrollo asistido por IA";
export const DEFAULT_THEME = "system";
// ... any other existing constants would remain here

/**
 * Mapping of IDE tool names to their corresponding image paths.
 * Images should be placed in the `public` folder (e.g., /images/tools/...).
 */
export const IDE_TOOL_IMAGES = {
  "Comparador de Carpetas": "/images/tools/folder-comparator.png",
  "Comparador de Código": "/images/tools/code-comparator.png",
  "Corrector de Código": "/images/tools/code-corrector.png",
  "Corrector de Dependencias": "/images/tools/dependency-corrector.png",
  "Corrector de Importaciones": "/images/tools/import-corrector.png",
  "Esquema de Carpetas": "/images/tools/folder-schema.png",
  "Generador de Componentes": "/images/tools/component-generator.png",
  "Generador de Iconos": "/images/tools/icon-generator.png",
  "Formateador de Código": "/images/tools/code-formatter.png",
  "Integracion GitHub": "/images/tools/integration-github.png",
};

/**
 * Mapping of IDE tool IDs to their corresponding image paths.
 * Used in the IDE page to display icons for each tool.
 */
export const tabImages: Record<string, string> = {
  'folder-comparer': IMAGES.pestanaIDEComparadorCarpetas,
  'code-comparer': IMAGES.pestanaIDEComparadorCodigo,
  'code-corrector': IMAGES.pestanaIDECorregirCodigo,
  'dependency-corrector': IMAGES.pestanaIDECorregirDependencias,
  'import-corrector': IMAGES.pestanaIDECorregirImportaciones,
  'folder-schema': IMAGES.pestanaIDEEsquemaCarpetas,
  'component-generator': IMAGES.pestanaIDEGeneradorComponentes,
  'icon-generator': IMAGES.pestanaIDEGenerarIcono,
  'code-formatter': IMAGES.pestanaIDEFormateador,
  'github-integration': IMAGES.pestanaIDEModalIntegracionGitHubMisRepos,
};