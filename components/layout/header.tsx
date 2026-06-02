'use client';

'use client';

import React, { memo, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  Settings,
  User,
  MessageSquare,
  Zap,
  Code2,
  Layout,
  FolderTree,
  FileCode,
  Beaker,
  AppWindow,
  Eye,
  Puzzle,
  Building2,
  PanelRightOpen,
  PanelRightClose,
  Search,
  Bell,
  Sun,
  Moon,
  Laptop,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAuth } from '@/hooks/use-auth';
import { useChat } from '@/hooks/use-chat';
import { useSidebar } from '@/hooks/use-sidebar';

interface HeaderProps {
  className?: string;
}

const navigation = [
  { name: 'Explorador', href: '/explorador', icon: FolderTree },
  { name: 'IDE', href: '/ide', icon: Code2 },
  { name: 'Probador de APIs', href: '/probador-de-apis', icon: Beaker },
  { name: 'Generador de App', href: '/generador-de-app', icon: AppWindow },
  { name: 'Creador de Estructuras', href: '/creador-de-estructuras', icon: Building2 },
  { name: 'Plan de Estructura', href: '/plan-de-estructura', icon: Layout },
  { name: 'Generador de API', href: '/generador-de-api', icon: Zap },
  { name: 'Vista Previa', href: '/vista-previa', icon: Eye },
  { name: 'Componentes', href: '/componentes', icon: Puzzle },
];

const userNavigation = [
  { name: 'Mi Perfil', href: '/perfil', icon: User },
  { name: 'Configuración', href: '/configuracion', icon: Settings },
];

function HeaderComponent({ className }: HeaderProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user, logout, isLoading } = useAuth();
  const { isChatOpen, toggleChat } = useChat();
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isActive = useCallback(
    (href: string) => {
      if (href === '/') return pathname === '/';
      return pathname.startsWith(href);
    },
    [pathname]
  );

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  const handleThemeChange = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl',
        className
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex items-center justify-center rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            aria-label={isSidebarOpen ? 'Cerrar sidebar' : 'Abrir sidebar'}
          >
            {isSidebarOpen ? (
              <PanelRightClose className="h-5 w-5" />
            ) : (
              <PanelRightOpen className="h-5 w-5" />
            )}
          </button>

          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500">
              <Image
                src="/uploads/Chat Expandido.jpg"
                alt="Zeus IA Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="hidden text-lg font-bold text-white sm:block">
              Zeus <span className="text-emerald-400">IA</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                  isActive(item.href)
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-4/5 -translate-x-1/2 rounded-full bg-emerald-500" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="hidden sm:flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-400 hover:border-gray-700 hover:text-white transition-colors"
            aria-label="Buscar"
          >
            <Search className="h-4 w-4" />
            <span className="hidden md:block">Buscar...</span>
            <kbd className="hidden rounded bg-gray-800 px-1.5 py-0.5 text-xs text-gray-500 lg:inline-block">
              ⌘K
            </kbd>
          </button>

          {/* Theme toggle */}
          <button
            onClick={handleThemeChange}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            aria-label="Cambiar tema"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Notifications */}
          <button
            className="relative rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            aria-label="Notificaciones"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500" />
          </button>

          {/* Chat toggle */}
          <button
            onClick={toggleChat}
            className={cn(
              'relative rounded-lg p-2 transition-colors',
              isChatOpen
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            )}
            aria-label={isChatOpen ? 'Cerrar chat' : 'Abrir chat'}
          >
            <MessageSquare className="h-5 w-5" />
            {isChatOpen && (
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500" />
            )}
          </button>

          {/* User menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 rounded-lg p-1 hover:bg-gray-800"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.avatar || '/uploads/Chat Expandido.jpg'}
                      alt={user.name || 'Usuario'}
                    />
                    <AvatarFallback className="bg-emerald-500/20 text-emerald-400">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden text-left lg:block">
                    <p className="text-sm font-medium text-white">
                      {user.name || 'Usuario'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {user.email || 'usuario@zeus-ia.com'}
                    </p>
                  </div>
                  <ChevronDown className="hidden h-4 w-4 text-gray-400 lg:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 border-gray-800 bg-gray-950 text-white"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name || 'Usuario'}
                    </p>
                    <p className="text-xs leading-none text-gray-400">
                      {user.email || 'usuario@zeus-ia.com'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-800" />
                {userNavigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link
                        href={item.href}
                        className="flex cursor-pointer items-center gap-2 text-gray-400 hover:text-white"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center gap-2 text-red-400 hover:text-red-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
                asChild
              >
                <Link href="/login">Iniciar sesión</Link>
              </Button>
              <Button
                className="bg-emerald-500 text-white hover:bg-emerald-600"
                asChild
              >
                <Link href="/registro">Registrarse</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white lg:hidden"
            aria-label="Menú móvil"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-800 bg-gray-950 lg:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive(item.href)
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                  {isActive(item.href) && (
                    <Badge
                      variant="secondary"
                      className="ml-auto bg-emerald-500/20 text-emerald-400"
                    >
                      Activo
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Search overlay */}
      {searchOpen && (
        <div className="absolute inset-x-0 top-16 border-b border-gray-800 bg-gray-950 p-4 shadow-xl">
          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar en Zeus IA..."
                className="w-full rounded-lg border border-gray-800 bg-gray-900 py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setSearchOpen(false);
                }}
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-gray-500">
                ESC
              </kbd>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Resultados rápidos
              </p>
              {navigation.slice(0, 5).map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export const Header = memo(HeaderComponent);