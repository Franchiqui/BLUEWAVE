'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

interface SidebarContextType {
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapsed: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  activeSection: string | null;
  setActiveSection: (section: string | null) => void;
  sidebarWidth: number;
  collapsedWidth: number;
  expandedWidth: number;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
  children: ReactNode;
  defaultOpen?: boolean;
  defaultCollapsed?: boolean;
  expandedWidth?: number;
  collapsedWidth?: number;
}

export function SidebarProvider({
  children,
  defaultOpen = true,
  defaultCollapsed = false,
  expandedWidth = 280,
  collapsedWidth = 72,
}: SidebarProviderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(defaultOpen);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(defaultCollapsed);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Cargar estado inicial desde localStorage de forma segura
  useEffect(() => {
    try {
      const storedOpen = localStorage.getItem('sidebar-open');
      const storedCollapsed = localStorage.getItem('sidebar-collapsed');

      if (storedOpen !== null) {
        setIsSidebarOpen(storedOpen === 'true');
      }
      if (storedCollapsed !== null) {
        setIsSidebarCollapsed(storedCollapsed === 'true');
      }
    } catch (error) {
      console.warn('Error accessing localStorage:', error);
    }
  }, []);

  // Guardar cambios en localStorage de forma segura
  useEffect(() => {
    try {
      localStorage.setItem('sidebar-open', String(isSidebarOpen));
    } catch (error) {
      console.warn('Error saving to localStorage:', error);
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    try {
      localStorage.setItem('sidebar-collapsed', String(isSidebarCollapsed));
    } catch (error) {
      console.warn('Error saving to localStorage:', error);
    }
  }, [isSidebarCollapsed]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const setSidebarOpen = useCallback((open: boolean) => {
    setIsSidebarOpen(open);
  }, []);

  const toggleSidebarCollapsed = useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev);
  }, []);

  const setSidebarCollapsed = useCallback((collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  }, []);

  const sidebarWidth = isSidebarOpen
    ? isSidebarCollapsed
      ? collapsedWidth
      : expandedWidth
    : 0;

  const value: SidebarContextType = {
    isSidebarOpen,
    isSidebarCollapsed,
    toggleSidebar,
    setSidebarOpen,
    toggleSidebarCollapsed,
    setSidebarCollapsed,
    activeSection,
    setActiveSection,
    sidebarWidth,
    collapsedWidth,
    expandedWidth,
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar(): SidebarContextType {
  const context = useContext(SidebarContext);

  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }

  return context;
}
