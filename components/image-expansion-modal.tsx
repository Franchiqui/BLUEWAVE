'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { PbImage } from './pb-image';

export function useImageExpansion() {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const expandImage = (imageUrl: string) => {
    setExpandedImage(imageUrl);
  };

  const closeImage = () => {
    setExpandedImage(null);
  };

  return { expandedImage, expandImage, closeImage };
}

export function ImageExpansionModal({ 
  expandedImage, 
  onClose 
}: { 
  expandedImage: string | null; 
  onClose: () => void;
}) {
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (expandedImage) {
      const img = new Image();
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
      };
      img.src = expandedImage;
    }
  }, [expandedImage]);

  if (!expandedImage) return null;

  const aspectRatio = imageDimensions ? imageDimensions.width / imageDimensions.height : 16 / 9;
  const maxHeight = window.innerHeight * 0.8;
  const calculatedWidth = Math.min(maxHeight * aspectRatio, window.innerWidth * 0.9);
  const calculatedHeight = calculatedWidth / aspectRatio;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative" style={{ width: calculatedWidth, height: calculatedHeight }}>
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute -top-12 right-0 p-2 text-white hover:text-emerald-400 transition-colors z-10"
        >
          <X className="w-8 h-8" />
        </button>
        <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 w-full h-full">
          <PbImage
            src={expandedImage}
            alt="Imagen expandida"
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}
