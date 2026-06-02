"use client";

import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';

const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://pocketbase-render-7yol.onrender.com';

export interface PocketBaseImage {
  id: string;
  categoria?: string;
  field?: string;
  field2?: string;
  field3?: string;
  created: string;
  updated: string;
}

export function usePocketBaseImages(categoria?: string) {
  const [images, setImages] = useState<PocketBaseImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const pb = new PocketBase(POCKETBASE_URL);

    const fetchImages = async () => {
      try {
        let filter = '';
        if (categoria) {
          filter = `categoria = "${categoria}"`;
        }

        const records = await pb.collection('imagenes').getFullList({
          filter,
          sort: '-created',
        });

        setImages(records);
        setIsLoading(false);
      } catch (err: any) {
        console.error('Error fetching images:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [categoria]);

  return { images, isLoading, error };
}

// Helper para obtener URL de imagen desde PocketBase
export function getPocketBaseImageUrl(collectionId: string, recordId: string, filename: string): string {
  return `${POCKETBASE_URL}/api/files/${collectionId}/${recordId}/${filename}`;
}

// Hook para obtener una imagen específica
export function usePocketBaseImage(collectionId: string, recordId: string, filename: string) {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const url = getPocketBaseImageUrl(collectionId, recordId, filename);
    setImageUrl(url);
  }, [collectionId, recordId, filename]);

  return imageUrl;
}
