'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthStatus, { type AuthStatusPaths } from '@/components/auth/auth-status';
import { authPaths } from '@/lib/auth-config';

export interface NavbarProps {
  appName?: string;
  homePath?: string;
  paths?: AuthStatusPaths;
  className?: string;
}

export default function Navbar({
  appName = 'Zeus IA',
  homePath = authPaths.home,
  paths,
  className = '',
}: NavbarProps) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith('/auth');
  const bgClass = isAuthRoute
    ? 'bg-gray-900 border-gray-800 text-white'
    : 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100';

  return (
    <nav
      className={
        'flex items-center justify-between px-4 py-3 border-b ' + bgClass + ' ' + className
      }
      role="navigation"
    >
      <div className="flex items-center gap-6">
        <Link
          href={homePath}
          className="flex items-center gap-3 hover:opacity-90 transition-opacity"
        >
          <img
            src="/LOGO_ZEUS.png"
            alt="Zeus IA Logo"
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold">{appName}</span>
        </Link>
        <div className="hidden md:flex items-center gap-4 ml-4">
        <Link href="/explorador" className="text-sm font-medium hover:opacity-80 transition-opacity">Explorador</Link>
        <Link href="/ide" className="text-sm font-medium hover:opacity-80 transition-opacity">IDE</Link>
        <Link href="/probador-de-apis" className="text-sm font-medium hover:opacity-80 transition-opacity">Probador APIs</Link>
        <Link href="/generador-de-app" className="text-sm font-medium hover:opacity-80 transition-opacity">Generador App</Link>
        <Link href="/creador-de-estructuras" className="text-sm font-medium hover:opacity-80 transition-opacity">Creador Estructuras</Link>
        <Link href="/plan-de-estructura" className="text-sm font-medium hover:opacity-80 transition-opacity">Plan Estructura</Link>
        <Link href="/generador-de-api" className="text-sm font-medium hover:opacity-80 transition-opacity">Generador API</Link>
        <Link href="/vista-previa" className="text-sm font-medium hover:opacity-80 transition-opacity">Vista Previa</Link>
        <Link href="/componentes" className="text-sm font-medium hover:opacity-80 transition-opacity">Componentes</Link>
        <Link href="/biblioteca" className="text-sm font-medium hover:opacity-80 transition-opacity">Biblioteca</Link>
        </div>
        <div className="hidden md:flex items-center ml-8 pl-8 border-l border-gray-300 dark:border-gray-700">
        <Link href="/descargas" className="text-sm font-medium hover:opacity-80 transition-opacity">Descargas</Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <AuthStatus paths={paths} />
      </div>
    </nav>
  );
}
