"use client";

import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

interface PbImageProps {
  src: string | null;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

export function PbImage({ src, alt, className, fill, width, height, priority, sizes }: PbImageProps) {
  // Si no hay src, mostrar placeholder
  if (!src) {
    return (
      <div className={`flex items-center justify-center bg-gray-800/50 ${className || ''}`} style={{ width, height }}>
        <ImageIcon className="w-12 h-12 text-gray-600" />
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes}
        unoptimized
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'bg-gray-800/50');
          const icon = document.createElement('div');
          icon.innerHTML = '<svg class="w-12 h-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>';
          target.parentElement?.appendChild(icon.firstElementChild as HTMLElement);
        }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      unoptimized
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        target.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'bg-gray-800/50', 'min-h-[200px]');
        const icon = document.createElement('div');
        icon.innerHTML = '<svg class="w-12 h-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>';
        target.parentElement?.appendChild(icon.firstElementChild as HTMLElement);
      }}
    />
  );
}
