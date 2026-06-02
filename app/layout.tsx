'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';

import { Providers } from '@/components/Providers';
import { FloatingChatButton } from '@/src/components/ui/floating-chat-button';
import { FloatingChat } from '@/FloatingChat/Chat/index';
import { DraggableFloatingChat } from '@/FloatingChat/Chat/DraggableFloatingChat';
import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import '../zeus-icons.js';
import '../zeus-styles.css';
import { ComponentSelectorHelper } from '@/components/component-selector-helper';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleToggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  // Check if we're in the main application context and prevent rendering
  // if we're not supposed to show the floating chat
  const isMainApp = typeof window !== 'undefined' && (
    new URLSearchParams(window.location.search).get('mainApp') === 'true' ||
    window.location.pathname === '/editor'
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />

          <ComponentSelectorHelper />
          {children}

          {!isMainApp && (
            <>
              <FloatingChatButton onClick={handleToggleChat}>
                <MessageSquare className="w-6 h-6" />
              </FloatingChatButton>

              {isChatOpen && (
                <DraggableFloatingChat
                  isOpen={isChatOpen}
                  onClose={handleCloseChat}
                >
                  <FloatingChat
                    config={{ pocketbaseUrl: process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8164' }}
                    isOpen={true}
                    onClose={handleCloseChat}
                  />
                </DraggableFloatingChat>
              )}
            </>
          )}
        </Providers>
      </body>
    </html>
  );
}