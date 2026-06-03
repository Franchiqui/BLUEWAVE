'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { LucideIcon } from 'lucide-react';

interface Tab {
  key: string;
  label: string;
  icon?: LucideIcon;
  badge?: string | number;
  disabled?: boolean;
}

interface VerticalTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  className?: string;
  orientation?: 'left' | 'right';
  variant?: 'default' | 'compact';
}

export function VerticalTabs({
  tabs,
  activeTab,
  onTabChange,
  className,
  orientation = 'left',
  variant = 'default',
}: VerticalTabsProps) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div
      className={cn(
        'flex flex-col border-r border-border bg-muted/50',
        orientation === 'right' && 'border-r-0 border-l',
        variant === 'compact' ? 'w-14' : 'w-48',
        className
      )}
    >
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-1 p-2">
          <TooltipProvider delayDuration={300}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.key === activeTab;
              const isHovered = tab.key === hoveredTab;

              return (
                <Tooltip key={tab.key}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => !tab.disabled && onTabChange(tab.key)}
                      onMouseEnter={() => setHoveredTab(tab.key)}
                      onMouseLeave={() => setHoveredTab(null)}
                      disabled={tab.disabled}
                      className={cn(
                        'relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                        'disabled:pointer-events-none disabled:opacity-50',
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                        isHovered && !isActive && 'bg-accent/50',
                        variant === 'compact' && 'justify-center px-2'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {Icon && (
                        <Icon
                          className={cn(
                            'h-5 w-5 shrink-0',
                            variant === 'compact' && 'h-5 w-5'
                          )}
                        />
                      )}
                      {variant !== 'compact' && (
                        <span className="truncate">{tab.label}</span>
                      )}
                      {tab.badge !== undefined && (
                        <Badge
                          variant={isActive ? 'secondary' : 'outline'}
                          className={cn(
                            'ml-auto',
                            variant === 'compact' && 'absolute -top-1 -right-1 h-4 w-4 p-0 text-[10px]'
                          )}
                        >
                          {tab.badge}
                        </Badge>
                      )}
                    </button>
                  </TooltipTrigger>
                  {variant === 'compact' && (
                    <TooltipContent side="right" className="text-xs">
                      {tab.label}
                      {tab.badge !== undefined && (
                        <span className="ml-2 text-muted-foreground">({tab.badge})</span>
                      )}
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </nav>
      </ScrollArea>
    </div>
  );
}
