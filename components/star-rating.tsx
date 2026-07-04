'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  /** Valor actual (0-5). En modo lectura puede ser fraccionario para mostrar la media. */
  value: number;
  /** Callback al seleccionar una estrella (solo modo edición). */
  onChange?: (value: number) => void;
  /** Si true, solo muestra el valor (no permite editar). */
  readOnly?: boolean;
  /** Tamaño del icono en px. */
  size?: number;
  /** Mostrar el valor numérico al lado. */
  showValue?: boolean;
  /** Número de votos (se muestra junto al valor si showValue). */
  count?: number;
  className?: string;
}

/**
 * Valoración de 5 estrellas.
 * - Modo lectura: muestra la media con relleno parcial (soporta fracciones).
 * - Modo edición: clickable, admite hover para previsualizar.
 */
export function StarRating({
  value,
  onChange,
  readOnly = false,
  size = 18,
  showValue = false,
  count,
  className = '',
}: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const filled = display >= i;
    const partial = !filled && display > i - 1;
    stars.push(
      <Star
        key={i}
        width={size}
        height={size}
        className={
          'shrink-0 ' +
          (filled
            ? 'fill-yellow-400 text-yellow-400'
            : partial
              ? 'fill-yellow-400/50 text-yellow-400'
              : 'fill-transparent text-gray-300 dark:text-gray-600')
        }
      />
    );
  }

  const interactive = !readOnly && !!onChange;

  return (
    <div className={'flex items-center gap-1 ' + className}>
      <div
        className="flex items-center gap-0.5"
        onMouseLeave={() => interactive && setHover(null)}
        role={readOnly ? 'img' : 'slider'}
        aria-label={readOnly ? `Valoración ${value.toFixed(1)} de 5` : 'Tu valoración'}
        aria-valuenow={Math.round(value)}
        aria-valuemin={1}
        aria-valuemax={5}
      >
        {stars.map((star, i) => (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onMouseEnter={() => interactive && setHover(i + 1)}
            onClick={() => interactive && onChange?.(i + 1)}
            className={
              interactive
                ? 'p-0.5 cursor-pointer bg-transparent border-0 disabled:cursor-default focus:outline-none'
                : 'p-0.5 cursor-default bg-transparent border-0 focus:outline-none'
            }
            aria-hidden={!interactive}
            tabIndex={interactive ? 0 : -1}
          >
            {star}
          </button>
        ))}
      </div>
      {showValue && (
        <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
          {value.toFixed(1)}
          {typeof count === 'number' && (
            <span className="text-gray-400 dark:text-gray-500">
              {' '}
              ({count} {count === 1 ? 'voto' : 'votos'})
            </span>
          )}
        </span>
      )}
    </div>
  );
}