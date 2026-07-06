'use client';

import { X } from 'lucide-react';

export function ZeusVideoModal({
  video,
  onClose,
}: {
  video: { url: string; title: string } | null;
  onClose: () => void;
}) {
  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[90vw] max-h-[85vh] aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute -top-12 right-0 p-2 text-white hover:text-emerald-400 transition-colors z-10"
          aria-label="Cerrar vídeo"
        >
          <X className="w-8 h-8" />
        </button>
        <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 w-full h-full">
          <video
            autoPlay
            controls
            className="w-full h-full object-contain"
            src={video.url}
          >
            <source src={video.url} />
          </video>
        </div>
        {video.title ? (
          <p className="absolute -bottom-9 left-0 right-0 text-center text-sm text-gray-300">
            {video.title}
          </p>
        ) : null}
      </div>
    </div>
  );
}