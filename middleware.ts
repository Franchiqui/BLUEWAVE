import { NextRequest, NextResponse } from 'next/server';

// Autenticación desactivada - todas las rutas son públicas
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [], // No proteger ninguna ruta
};
