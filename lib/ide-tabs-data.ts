export interface IdeTabData {
  key: string;
  title: string;
  description: string;
  icon?: string;
  category?: string;
}

export const ideTabsData: IdeTabData[] = [
  {
    key: 'chat',
    title: 'Chat',
    description: 'Conversa con la IA para resolver dudas y obtener ayuda.',
    icon: 'message-square',
    category: 'comunicacion',
  },
  {
    key: 'code',
    title: 'Editor de Código',
    description: 'Escribe y edita código con asistencia de IA.',
    icon: 'code',
    category: 'desarrollo',
  },
  {
    key: 'terminal',
    title: 'Terminal',
    description: 'Ejecuta comandos y scripts en un entorno seguro.',
    icon: 'terminal',
    category: 'herramientas',
  },
  {
    key: 'files',
    title: 'Explorador de Archivos',
    description: 'Navega y gestiona los archivos del proyecto.',
    icon: 'folder',
    category: 'navegacion',
  },
  {
    key: 'settings',
    title: 'Configuración',
    description: 'Ajusta las preferencias de la aplicación.',
    icon: 'settings',
    category: 'configuracion',
  },
];
