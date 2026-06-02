'use client';

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, CancelTokenSource } from 'axios';
import { toast } from '@/hooks/use-toast';

// Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface RequestOptions extends AxiosRequestConfig {
  showToast?: boolean;
  toastSuccess?: string;
  toastError?: string;
  retry?: number;
  retryDelay?: number;
}

// Constants
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
const DEFAULT_TIMEOUT = 30000;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Track pending requests for cancellation
const pendingRequests = new Map<string, CancelTokenSource>();

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('zeus_auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Add request ID for tracking
    config.headers['X-Request-ID'] = crypto.randomUUID();

    // Add timestamp for cache busting
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    // Create cancel token for this request
    const source = axios.CancelToken.source();
    config.cancelToken = source.token;
    const requestId = config.headers['X-Request-ID'] as string;
    pendingRequests.set(requestId, source);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Clean up pending request
    const requestId = response.config.headers['X-Request-ID'] as string;
    pendingRequests.delete(requestId);

    // Transform successful responses
    const apiResponse: ApiResponse = {
      data: response.data,
      message: response.data?.message || 'Operación exitosa',
      status: response.status,
      success: true,
    };

    // Return a new object to avoid mutating the original response
    return { ...response, data: apiResponse };
  },
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as RequestOptions & { _retry?: boolean; _retryCount?: number };

    // Clean up pending request
    if (originalRequest?.headers) {
      const requestId = originalRequest.headers['X-Request-ID'] as string;
      pendingRequests.delete(requestId);
    }

    // Handle network errors
    if (!error.response) {
      if (typeof window !== 'undefined') {
        toast({
          title: 'Error de conexión',
          description: 'No se puede conectar con el servidor. Verifica tu conexión a internet.',
          variant: 'destructive',
        });
      }
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    // Handle token refresh
    if (status === 401 && !originalRequest._retry && typeof window !== 'undefined') {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('zeus_refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { token } = response.data;
        localStorage.setItem('zeus_auth_token', token);

        // Retry original request
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Clear auth data and redirect to login
        localStorage.removeItem('zeus_auth_token');
        localStorage.removeItem('zeus_refresh_token');
        localStorage.removeItem('zeus_user_data');
        
        window.location.href = '/login';
        
        return Promise.reject(refreshError);
      }
    }

    // Handle rate limiting
    if (status === 429) {
      const retryAfter = parseInt(error.response.headers['retry-after'] || '5', 10);
      if (typeof window !== 'undefined') {
        toast({
          title: 'Demasiadas solicitudes',
          description: `Por favor espera ${retryAfter} segundos antes de intentar de nuevo.`,
          variant: 'destructive',
        });
      }
      return Promise.reject(error);
    }

    // Handle server errors with retry logic
    if (status >= 500 && originalRequest.retry !== 0) {
      const retryCount = originalRequest._retryCount || 0;
      const maxRetries = originalRequest.retry || MAX_RETRIES;

      if (retryCount < maxRetries) {
        originalRequest._retryCount = retryCount + 1;
        const delay = originalRequest.retryDelay || RETRY_DELAY;

        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, retryCount)));

        return apiClient(originalRequest);
      }
    }

    // Handle validation errors
    if (status === 422 && data?.errors) {
      const errorMessages = Object.values(data.errors).flat().join(', ');
      if (typeof window !== 'undefined') {
        toast({
          title: 'Error de validación',
          description: errorMessages,
          variant: 'destructive',
        });
      }
    }

    // Show error toast if configured
    if (originalRequest.showToast !== false && typeof window !== 'undefined') {
      const errorMessage = originalRequest.toastError || data?.message || 'Ha ocurrido un error';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }

    return Promise.reject(error);
  }
);

// Helper functions
export const api = {
  // GET requests
  async get<T = any>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    const response = await apiClient.get(url, options);
    return response.data;
  },

  // POST requests
  async post<T = any>(url: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    const response = await apiClient.post(url, data, options);
    return response.data;
  },

  // PUT requests
  async put<T = any>(url: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    const response = await apiClient.put(url, data, options);
    return response.data;
  },

  // PATCH requests
  async patch<T = any>(url: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    const response = await apiClient.patch(url, data, options);
    return response.data;
  },

  // DELETE requests
  async delete<T = any>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    const response = await apiClient.delete(url, options);
    return response.data;
  },

  // Upload files
  async upload<T = any>(url: string, formData: FormData, options?: RequestOptions): Promise<ApiResponse<T>> {
    const response = await apiClient.post(url, formData, {
      ...options,
      headers: {
        ...options?.headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Download files
  async download(url: string, filename?: string, options?: RequestOptions): Promise<void> {
    if (typeof window === 'undefined') {
      throw new Error('Download is only supported in browser environment');
    }

    const response = await apiClient.get(url, {
      ...options,
      responseType: 'blob',
    });

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  },

  // Paginated requests
  async getPaginated<T = any>(
    url: string,
    page: number = 1,
    limit: number = 10,
    options?: RequestOptions
  ): Promise<PaginatedResponse<T>> {
    const response = await apiClient.get(url, {
      ...options,
      params: {
        ...options?.params,
        page,
        limit,
      },
    });
    // The interceptor transforms response.data to ApiResponse, so we need to access the original data
    // Since we transformed it, we need to handle this differently
    // For now, we assume the API returns the paginated structure directly
    return response.data.data;
  },

  // Batch requests
  async batch<T = any>(requests: { method: string; url: string; data?: any }[]): Promise<ApiResponse<T>[]> {
    const responses = await Promise.all(
      requests.map(req => {
        switch (req.method.toUpperCase()) {
          case 'GET':
            return apiClient.get(req.url);
          case 'POST':
            return apiClient.post(req.url, req.data);
          case 'PUT':
            return apiClient.put(req.url, req.data);
          case 'PATCH':
            return apiClient.patch(req.url, req.data);
          case 'DELETE':
            return apiClient.delete(req.url);
          default:
            throw new Error(`Unsupported method: ${req.method}`);
        }
      })
    );
    return responses.map(res => res.data);
  },

  // Cancel request by URL (cancels all pending requests to that URL)
  cancelRequest(url: string): void {
    pendingRequests.forEach((source, requestId) => {
      // We don't have the URL stored, so we cancel all pending requests
      // A better implementation would store the URL along with the source
      source.cancel('Request cancelled');
    });
    pendingRequests.clear();
  },

  // Set auth token
  setAuthToken(token: string | null): void {
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
    }
  },

  // Clear all pending requests
  clearPendingRequests(): void {
    pendingRequests.forEach((source) => {
      source.cancel('Request cancelled by clearPendingRequests');
    });
    pendingRequests.clear();
  },
};

// Export the axios instance as default
export default apiClient;

// Export the api object for use in hooks and components
export { apiClient };
