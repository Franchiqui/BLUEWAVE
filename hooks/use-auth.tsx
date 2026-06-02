'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { toast } from '@/hooks/use-toast';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
  sidebarCollapsed: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  acceptTerms: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: string;
}

export interface AuthError {
  message: string;
  code?: string;
  field?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: AuthError | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
  refreshSession: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  confirmResetPassword: (token: string, password: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  clearError: () => void;
}

// Constants
const TOKEN_KEY = 'zeus_auth_token';
const REFRESH_TOKEN_KEY = 'zeus_refresh_token';
const USER_KEY = 'zeus_user_data';

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  // Clear all auth data
  const clearAuthData = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    delete apiClient.defaults.headers.common['Authorization'];
    setUser(null);
  }, []);

  // Validate token with server
  const validateToken = useCallback(async (token: string): Promise<boolean> => {
    try {
      const response = await apiClient.get('/auth/validate', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.valid;
    } catch {
      return false;
    }
  }, []);

  // Attempt to refresh the token
  const attemptTokenRefresh = useCallback(async (): Promise<boolean> => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!refreshToken) return false;

      const response = await apiClient.post('/auth/refresh', {
        refreshToken,
      });

      const { token, user: refreshedUser } = response.data;
      
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(refreshedUser));
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(refreshedUser);
      return true;
    } catch {
      return false;
    }
  }, []);

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_KEY);

        if (token && storedUser) {
          const parsedUser = JSON.parse(storedUser) as User;
          
          // Verify token is still valid
          const isValid = await validateToken(token);
          
          if (isValid) {
            setUser(parsedUser);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          } else {
            // Try to refresh token
            const refreshed = await attemptTokenRefresh();
            if (!refreshed) {
              clearAuthData();
            }
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [validateToken, attemptTokenRefresh, clearAuthData]);

  // Login
  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      const { user: loggedUser, token, refreshToken, expiresAt } = response.data;

      // Store auth data
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      localStorage.setItem(USER_KEY, JSON.stringify(loggedUser));
      
      // Set default auth header
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(loggedUser);
      
      toast({
        title: 'Inicio de sesión exitoso',
        description: `Bienvenido de nuevo, ${loggedUser.name}`,
      });

      router.push('/dashboard');
    } catch (err: any) {
      const authError: AuthError = {
        message: err.response?.data?.message || 'Error al iniciar sesión',
        code: err.response?.data?.code,
        field: err.response?.data?.field,
      };
      setError(authError);
      
      toast({
        title: 'Error de inicio de sesión',
        description: authError.message,
        variant: 'destructive',
      });
      
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Register
  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', data);
      const { user: newUser, token, refreshToken } = response.data;

      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
      
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(newUser);
      
      toast({
        title: 'Registro exitoso',
        description: 'Tu cuenta ha sido creada correctamente. Verifica tu email para activarla.',
      });

      router.push('/dashboard');
    } catch (err: any) {
      const authError: AuthError = {
        message: err.response?.data?.message || 'Error al registrarse',
        code: err.response?.data?.code,
        field: err.response?.data?.field,
      };
      setError(authError);
      
      toast({
        title: 'Error de registro',
        description: authError.message,
        variant: 'destructive',
      });
      
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Logout
  const logout = useCallback(async () => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        await apiClient.post('/auth/logout', {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      clearAuthData();
      setIsLoading(false);
      router.push('/login');
      
      toast({
        title: 'Sesión cerrada',
        description: 'Has cerrado sesión correctamente.',
      });
    }
  }, [clearAuthData, router]);

  // Update profile
  const updateProfile = useCallback(async (data: Partial<User>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.put<User>('/auth/profile', data);
      const updatedUser = response.data;
      
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast({
        title: 'Perfil actualizado',
        description: 'Tu perfil ha sido actualizado correctamente.',
      });
    } catch (err: any) {
      const authError: AuthError = {
        message: err.response?.data?.message || 'Error al actualizar perfil',
      };
      setError(authError);
      
      toast({
        title: 'Error',
        description: authError.message,
        variant: 'destructive',
      });
      
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update preferences
  const updatePreferences = useCallback(async (preferences: Partial<UserPreferences>) => {
    try {
      const response = await apiClient.put<User>('/auth/preferences', preferences);
      const updatedUser = response.data;
      
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast({
        title: 'Preferencias actualizadas',
        description: 'Tus preferencias han sido guardadas.',
      });
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Error al actualizar preferencias',
        variant: 'destructive',
      });
    }
  }, []);

  // Refresh session
  const refreshSession = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!refreshToken) throw new Error('No refresh token available');

      const response = await apiClient.post('/auth/refresh', {
        refreshToken,
      });

      const { token, user: refreshedUser } = response.data;
      
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(refreshedUser));
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(refreshedUser);
    } catch (err) {
      clearAuthData();
      router.push('/login');
    }
  }, [clearAuthData, router]);

  // Reset password
  const resetPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await apiClient.post('/auth/reset-password', { email });
      
      toast({
        title: 'Email enviado',
        description: 'Si el email existe, recibirás instrucciones para restablecer tu contraseña.',
      });
    } catch (err: any) {
      const authError: AuthError = {
        message: err.response?.data?.message || 'Error al solicitar restablecimiento',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Confirm reset password
  const confirmResetPassword = useCallback(async (token: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await apiClient.post('/auth/confirm-reset-password', {
        token,
        password,
      });
      
      toast({
        title: 'Contraseña restablecida',
        description: 'Tu contraseña ha sido actualizada correctamente.',
      });
      
      router.push('/login');
    } catch (err: any) {
      const authError: AuthError = {
        message: err.response?.data?.message || 'Error al restablecer contraseña',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Verify email
  const verifyEmail = useCallback(async (token: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<User>('/auth/verify-email', { token });
      const verifiedUser = response.data;
      
      localStorage.setItem(USER_KEY, JSON.stringify(verifiedUser));
      setUser(verifiedUser);
      
      toast({
        title: 'Email verificado',
        description: 'Tu email ha sido verificado correctamente.',
      });
    } catch (err: any) {
      const authError: AuthError = {
        message: err.response?.data?.message || 'Error al verificar email',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Resend verification email
  const resendVerificationEmail = useCallback(async () => {
    setIsLoading(true);

    try {
      await apiClient.post('/auth/resend-verification');
      
      toast({
        title: 'Email reenviado',
        description: 'Se ha enviado un nuevo email de verificación.',
      });
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Error al reenviar email',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete account
  const deleteAccount = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await apiClient.delete('/auth/account');
      
      clearAuthData();
      router.push('/login');
      
      toast({
        title: 'Cuenta eliminada',
        description: 'Tu cuenta ha sido eliminada correctamente.',
      });
    } catch (err: any) {
      const authError: AuthError = {
        message: err.response?.data?.message || 'Error al eliminar cuenta',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, [clearAuthData, router]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Memoized context value
  const contextValue = useMemo<AuthContextType>(() => ({
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    updatePreferences,
    refreshSession,
    resetPassword,
    confirmResetPassword,
    verifyEmail,
    resendVerificationEmail,
    deleteAccount,
    isLoading,
    error,
    clearError,
  }), [
    user,
    login,
    register,
    logout,
    updateProfile,
    updatePreferences,
    refreshSession,
    resetPassword,
    confirmResetPassword,
    verifyEmail,
    resendVerificationEmail,
    deleteAccount,
    isLoading,
    error,
    clearError,
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
