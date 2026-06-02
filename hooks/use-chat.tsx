'use client';

import { createContext, useContext, useCallback, useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { apiClient } from '@/lib/api-client';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    type?: 'code' | 'text' | 'error' | 'suggestion';
    language?: string;
    filePath?: string;
    action?: string;
  };
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  context?: {
    projectId?: string;
    filePath?: string;
    language?: string;
  };
}

interface ChatContextType {
  isChatOpen: boolean;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  messages: ChatMessage[];
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  isLoading: boolean;
  isStreaming: boolean;
  sendMessage: (content: string, context?: ChatSession['context']) => Promise<void>;
  clearMessages: () => void;
  createNewSession: () => void;
  switchSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
  renameSession: (sessionId: string, title: string) => void;
  regenerateResponse: () => Promise<void>;
  stopStreaming: () => void;
  error: string | null;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const STORAGE_KEY = 'zeus-chat-sessions';
const MAX_SESSIONS = 50;
const MAX_MESSAGE_LENGTH = 4000;

function generateId(): string {
  return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function createNewSessionObject(): ChatSession {
  return {
    id: generateId(),
    title: 'Nueva conversación',
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

function loadSessions(): ChatSession[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((session: any) => ({
        ...session,
        createdAt: new Date(session.createdAt),
        updatedAt: new Date(session.updatedAt),
        messages: session.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      }));
    }
  } catch (error) {
    console.error('Error loading chat sessions:', error);
  }
  return [];
}

function saveSessions(sessions: ChatSession[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.error('Error saving chat sessions:', error);
  }
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const sessionsRef = useRef<ChatSession[]>([]);

  // Load sessions on mount
  useEffect(() => {
    const loadedSessions = loadSessions();
    setSessions(loadedSessions);
    sessionsRef.current = loadedSessions;
    
    if (loadedSessions.length > 0) {
      setCurrentSessionId(loadedSessions[0].id);
    } else {
      const newSession = createNewSessionObject();
      setSessions([newSession]);
      sessionsRef.current = [newSession];
      setCurrentSessionId(newSession.id);
    }
  }, []);

  // Save sessions on change, but not on initial load
  useEffect(() => {
    if (sessions.length > 0 && sessions !== sessionsRef.current) {
      saveSessions(sessions);
    }
  }, [sessions]);

  const currentSession = sessions.find(s => s.id === currentSessionId) || null;
  const messages = currentSession?.messages || [];

  const updateSession = useCallback((sessionId: string, updates: Partial<ChatSession>) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, ...updates, updatedAt: new Date() }
        : session
    ));
  }, []);

  const toggleChat = useCallback(() => {
    setIsChatOpen(prev => !prev);
  }, []);

  const openChat = useCallback(() => {
    setIsChatOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  const sendMessage = useCallback(async (content: string, context?: ChatSession['context']) => {
    if (!content.trim() || !currentSessionId) return;
    
    if (content.length > MAX_MESSAGE_LENGTH) {
      // Reemplazar toast con console.error o manejo de errores simple
      console.error(`Mensaje demasiado largo: máximo ${MAX_MESSAGE_LENGTH} caracteres.`);
      return;
    }

    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
      metadata: {
        type: 'text',
      },
    };

    // Auto-generate title from first message
    if (currentSession?.messages.length === 0) {
      const title = content.length > 50 
        ? content.substring(0, 50) + '...' 
        : content;
      updateSession(currentSessionId, { title });
    }

    setIsLoading(true);
    setError(null);
    setIsStreaming(true);

    try {
      abortControllerRef.current = new AbortController();
      
      const response = await apiClient.post('/api/chat/message', {
        message: content,
        sessionId: currentSessionId,
        context: context || currentSession?.context,
      }, {
        signal: abortControllerRef.current.signal,
      });

      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: response.data.content,
        timestamp: new Date(),
        metadata: {
          type: response.data.type || 'text',
          language: response.data.language,
          action: response.data.action,
        },
      };

      // Agregar ambos mensajes juntos para evitar duplicados
      updateSession(currentSessionId, {
        messages: [...(currentSession?.messages || []), userMessage, assistantMessage],
        context: context || currentSession?.context,
      });

      console.log('Respuesta generada');
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        setIsStreaming(false);
        return;
      }

      const errorMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: 'Lo siento, ocurrió un error al procesar tu mensaje. Por favor, intenta de nuevo.',
        timestamp: new Date(),
        metadata: {
          type: 'error',
        },
      };

      // Solo agregar el mensaje de error, no duplicar el del usuario
      updateSession(currentSessionId, {
        messages: [...(currentSession?.messages || []), userMessage, errorMessage],
      });

      const errorMsg = error instanceof Error ? error.message : 'Error al enviar mensaje';
      setError(errorMsg);
      console.error('Error al enviar mensaje:', errorMsg);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  }, [currentSessionId, currentSession, updateSession]);

  const clearMessages = useCallback(() => {
    if (!currentSessionId) return;
    updateSession(currentSessionId, { messages: [] });
    console.log('Chat limpiado');
  }, [currentSessionId, updateSession]);

  const createNewSession = useCallback(() => {
    if (sessions.length >= MAX_SESSIONS) {
      console.error(`Límite alcanzado: máximo ${MAX_SESSIONS} conversaciones.`);
      return;
    }

    const newSession = createNewSessionObject();
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setError(null);
    openChat();
  }, [sessions.length, openChat]);

  const switchSession = useCallback((sessionId: string) => {
    setCurrentSessionId(sessionId);
    setError(null);
  }, []);

  const deleteSession = useCallback((sessionId: string) => {
    setSessions(prev => {
      const filtered = prev.filter(s => s.id !== sessionId);
      if (filtered.length === 0) {
        const newSession = createNewSessionObject();
        setCurrentSessionId(newSession.id);
        return [newSession];
      }
      if (currentSessionId === sessionId) {
        setCurrentSessionId(filtered[0].id);
      }
      return filtered;
    });

    console.log('Conversación eliminada');
  }, [currentSessionId]);

  const renameSession = useCallback((sessionId: string, title: string) => {
    if (!title.trim()) return;
    updateSession(sessionId, { title: title.trim() });
    console.log(`Conversación renombrada: ${title.trim()}`);
  }, [updateSession]);

  const regenerateResponse = useCallback(async () => {
    if (!currentSession || currentSession.messages.length < 2) return;
    
    // Asegurarse de que el último mensaje sea del asistente
    const lastMessage = currentSession.messages[currentSession.messages.length - 1];
    if (lastMessage.role !== 'assistant') return;

    const lastUserMessage = [...currentSession.messages]
      .reverse()
      .find(m => m.role === 'user');
    
    if (lastUserMessage) {
      // Remove last assistant message
      const messagesWithoutLast = currentSession.messages.slice(0, -1);
      updateSession(currentSessionId!, { messages: messagesWithoutLast });
      
      // Resend the message
      await sendMessage(lastUserMessage.content, currentSession.context);
    }
  }, [currentSession, currentSessionId, updateSession, sendMessage]);

  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsStreaming(false);
      setIsLoading(false);
    }
  }, []);

  const value: ChatContextType = {
    isChatOpen,
    toggleChat,
    openChat,
    closeChat,
    messages,
    sessions,
    currentSession,
    isLoading,
    isStreaming,
    sendMessage,
    clearMessages,
    createNewSession,
    switchSession,
    deleteSession,
    renameSession,
    regenerateResponse,
    stopStreaming,
    error,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat(): ChatContextType {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
