'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const authPaths = {
  login: '/auth/login',
  register: '/auth/register',
  home: '/',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  verifyEmail: '/auth/verify-email',
} as const;

export const publicPaths = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verify-email',
  '/pricing',
  '/about',
  '/contact',
  '/blog',
  '/docs',
] as const;

export const authRoutes = {
  login: '/auth/login',
  register: '/auth/register',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  verifyEmail: '/auth/verify-email',
} as const;

export const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/settings',
  '/admin',
  '/chat',
  '/calendar',
  '/tasks',
  '/notifications',
  '/media',
  '/analytics',
  '/e-commerce',
  '/forms',
  '/maps',
  '/search',
  '/blog/create',
  '/blog/edit',
] as const;

export const rolePermissions = {
  admin: ['*'],
  moderator: ['/dashboard', '/profile', '/settings', '/chat', '/calendar', '/tasks', '/notifications', '/media', '/forms', '/maps', '/search'],
  user: ['/dashboard', '/profile', '/settings', '/chat', '/calendar', '/tasks', '/notifications'],
  guest: ['/'],
} as const;

export type UserRole = keyof typeof rolePermissions;

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  name: string;
  avatar: string;
  role: UserRole;
  verified: boolean;
  created: string;
  updated: string;
}

export interface AuthSession {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const defaultAuthSession: AuthSession = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

export function isPublicPath(path: string): boolean {
  return publicPaths.some((publicPath) => path.startsWith(publicPath));
}

export function isProtectedPath(path: string): boolean {
  return protectedRoutes.some((protectedPath) => path.startsWith(protectedPath));
}

export function hasPermission(role: UserRole, path: string): boolean {
  const permissions = rolePermissions[role];
  if (!permissions) return false;
  if (permissions.includes('*')) return true;
  return permissions.some((permission) => path.startsWith(permission));
}

export function getRedirectPath(role: UserRole): string {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'moderator':
      return '/dashboard';
    case 'user':
      return '/dashboard';
    default:
      return '/auth/login';
  }
}

export function useAuthRedirect() {
  const router = useRouter();

  const redirectToLogin = useCallback(() => {
    router.push(authPaths.login);
  }, [router]);

  const redirectToHome = useCallback(() => {
    router.push(authPaths.home);
  }, [router]);

  const redirectToDashboard = useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  return {
    redirectToLogin,
    redirectToHome,
    redirectToDashboard,
  };
}

export function getAuthCookieName(): string {
  return 'pb_auth';
}

export function getAuthTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split(';');
  const authCookie = cookies.find((cookie) => cookie.trim().startsWith(`${getAuthCookieName()}=`));
  if (!authCookie) return null;
  const value = authCookie.split('=')[1];
  return value || null;
}

export function clearAuthCookie(): void {
  document.cookie = `${getAuthCookieName()}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export function setAuthCookie(token: string): void {
  document.cookie = `${getAuthCookieName()}=${token}; path=/; max-age=86400; sameSite=Lax`;
}
