'use client';

'use client';

import React, { memo, useCallback, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  MessageSquare,
  Code2,
  Beaker,
  LayoutDashboard,
  FolderTree,
  FileJson,
  Eye,
  Puzzle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Settings,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout?: () => void;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  description?: string;
}

const mainNavItems: NavItem[] = [
  {
    title: 'Inicio',
    href: '/',
    icon: Home,
    description: 'Panel principal',
  },
  {
    title: 'Chat',
    href: '/chat',
    icon: MessageSquare,
    description: 'Asistente IA',
  },
  {
    title: 'Explorador',
    href: '/explorador',
    icon: FolderTree,
    description: 'Explorar archivos',
  },
  {
    title: 'IDE',
    href: '/ide',
    icon: Code2,
    description: 'Entorno de desarrollo',
  },
  {
    title: 'Probador de APIs',
    href: '/probador-de-apis',
    icon: Beaker,
    description: 'Probar endpoints',
  },
  {
    title: 'Generador de App',
    href: '/generador-de-app',
    icon: LayoutDashboard,
    description: 'Crear aplicaciones',
  },
  {
    title: 'Creador de Estructuras',
    href: '/creador-de-estructuras',
    icon: FolderTree,
    description: 'Diseñar estructuras',
  },
  {
    title: 'Plan de Estructura',
    href: '/plan-de-estructura',
    icon: FileJson,
    description: 'Planificar proyectos',
  },
  {
    title: 'Generador de API',
    href: '/generador-de-api',
    icon: Zap,
    description: 'Generar APIs',
  },
  {
    title: 'Vista Previa',
    href: '/vista-previa',
    icon: Eye,
    description: 'Previsualizar',
  },
  {
    title: 'Componentes',
    href: '/componentes',
    icon: Puzzle,
    description: 'Biblioteca de componentes',
  },
];

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed = false,
  onToggle,
  user,
  onLogout,
}) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const isActive = useCallback(
    (href: string) => {
      if (href === '/') return pathname === '/';
      return pathname.startsWith(href);
    },
    [pathname]
  );

  const handleLogout = useCallback(() => {
    onLogout?.();
  }, [onLogout]);

  return (
    <aside
      className={cn(
        'relative flex flex-col h-screen bg-gray-950 border-r border-gray-800 transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-16' : 'w-64'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="navigation"
      aria-label="Sidebar principal"
    >
      {/* Logo y título */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image
              src="/uploads/Chat Expandido.jpg"
              alt="Zeus IA Logo"
              width={32}
              height={32}
              className="rounded-lg"
              priority
            />
          </div>
          {!isCollapsed && (
            <span className="text-lg font-bold text-green-400 truncate">
              Zeus IA
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(
            'text-gray-400 hover:text-white hover:bg-gray-800',
            isCollapsed && 'hidden'
          )}
          aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navegación principal */}
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <TooltipProvider key={item.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                      isActive(item.href)
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50',
                      isCollapsed && 'justify-center px-2'
                    )}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="truncate">{item.title}</span>
                    )}
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" className="bg-gray-900 border border-gray-700">
                    <p className="text-sm font-medium">{item.title}</p>
                    {item.description && (
                      <p className="text-xs text-gray-400">{item.description}</p>
                    )}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>

        <Separator className="my-4 bg-gray-800" />

        {/* Imágenes de referencia */}
        {!isCollapsed && (
          <div className="space-y-2 px-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Referencias
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-800">
                <Image
                  src="/uploads/Pestaña IDE.jpg"
                  alt="IDE"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-800">
                <Image
                  src="/uploads/Pestaña Componentes.jpg"
                  alt="Componentes"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-800">
                <Image
                  src="/uploads/Pestaña Explorador.jpg"
                  alt="Explorador"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-800">
                <Image
                  src="/uploads/Pestaña Vista Previa.jpg"
                  alt="Vista Previa"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        )}
      </ScrollArea>

      {/* Perfil de usuario */}
      <div className="border-t border-gray-800 p-4">
        {user ? (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border border-gray-700">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-blue-600 text-white text-xs">
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-red-400 hover:bg-red-400/10"
                    aria-label="Cerrar sesión"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-gray-900 border border-gray-700">
                  <p className="text-sm">Cerrar sesión</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            {!isCollapsed && (
              <div className="flex-1">
                <p className="text-sm text-gray-400">Inicia sesión</p>
              </div>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                    aria-label="Configuración"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-gray-900 border border-gray-700">
                  <p className="text-sm">Configuración</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>

      {/* Botón de colapso flotante */}
      {isCollapsed && isHovered && (
        <Button
          variant="secondary"
          size="icon"
          onClick={onToggle}
          className="absolute -right-3 top-20 h-6 w-6 rounded-full bg-gray-800 border border-gray-700 shadow-lg hover:bg-gray-700"
          aria-label="Expandir sidebar"
        >
          <ChevronRight className="h-3 w-3 text-white" />
        </Button>
      )}
    </aside>
  );
};

export default memo(Sidebar);