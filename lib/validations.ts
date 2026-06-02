import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email requerido'),
  password: z.string().min(6, 'Mínimo 6 caracteres').max(100),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Nombre muy corto').max(50),
  email: z.string().email('Email inválido').min(1, 'Email requerido'),
  password: z.string().min(6, 'Mínimo 6 caracteres').max(100),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Contraseñas no coinciden',
  path: ['confirmPassword'],
});

export const chatMessageSchema = z.object({
  content: z.string().min(1, 'Mensaje requerido').max(5000),
  role: z.enum(['user', 'assistant', 'system']),
  timestamp: z.date().optional(),
});

export const apiKeySchema = z.object({
  name: z.string().min(1, 'Nombre requerido').max(100),
  key: z.string().min(1, 'API Key requerida').max(500),
  provider: z.enum(['openai', 'anthropic', 'google', 'custom']),
});

export const projectSchema = z.object({
  name: z.string().min(1, 'Nombre requerido').max(100),
  description: z.string().max(500).optional(),
  framework: z.enum(['next-js', 'react', 'vue', 'angular', 'express']),
  language: z.enum(['typescript', 'javascript', 'python']),
});

export const componentSchema = z.object({
  name: z.string().min(1, 'Nombre requerido').max(50),
  type: z.enum(['ui', 'layout', 'page', 'feature']),
  props: z.record(z.unknown()).optional(),
  children: z.boolean().default(false),
});

export const structureSchema = z.object({
  name: z.string().min(1, 'Nombre requerido').max(100),
  type: z.enum(['folder', 'file', 'component', 'page']),
  path: z.string().min(1, 'Ruta requerida'),
  content: z.string().optional(),
});

export const apiEndpointSchema = z.object({
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
  path: z.string().min(1, 'Path requerido').startsWith('/'),
  description: z.string().max(200).optional(),
  parameters: z.array(z.object({
    name: z.string(),
    type: z.string(),
    required: z.boolean().default(false),
  })).optional(),
});

export const codeReviewSchema = z.object({
  code: z.string().min(1, 'Código requerido').max(10000),
  language: z.enum(['typescript', 'javascript', 'python', 'html', 'css']),
  reviewType: z.enum(['security', 'performance', 'style', 'bugs', 'all']),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
export type ApiKeyInput = z.infer<typeof apiKeySchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type ComponentInput = z.infer<typeof componentSchema>;
export type StructureInput = z.infer<typeof structureSchema>;
export type ApiEndpointInput = z.infer<typeof apiEndpointSchema>;
export type CodeReviewInput = z.infer<typeof codeReviewSchema>;