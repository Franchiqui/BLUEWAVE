'use client';

import { Maximize2 } from 'lucide-react';

export function ZeusVideoCard({
  title,
  url,
  onExpand,
}: {
  title: string;
  url: string;
  onExpand: (video: { url: string; title: string }) => void;
}) {
  return (
    <div className="my-3 w-full max-w-[280px] rounded-xl border border-gray-700/50 overflow-hidden bg-gray-900/60">
      <div className="relative">
        <video
          controls
          preload="metadata"
          className="block w-full max-h-[200px] object-contain bg-black"
          src={url}
        >
          <source src={url} />
        </video>
        <button
          type="button"
          onClick={() => onExpand({ url, title })}
          className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 hover:bg-black/80 text-white text-xs font-medium transition-colors backdrop-blur-sm"
          aria-label="Ampliar vídeo a pantalla completa"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          Ampliar
        </button>
      </div>
      {title ? (
        <div className="px-3 py-2 text-sm text-gray-300">{title}</div>
      ) : null}
    </div>
  );
}