'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Download, ImageIcon, Loader2, LogIn } from 'lucide-react';
import pb from '@/lib/pocketbase';
import { authPaths } from '@/lib/auth-config';
import { StarRating } from '@/components/star-rating';

// Imágenes de respaldo por nombre de app. Se usan si el registro no tiene
// campo `image` o si la imagen de la base de datos falla al cargar.
const FALLBACK_IMAGES: Record<string, string> = {
  'Zeus IA':
    'https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/1p6lph331840dca/pesta_a_ide_comparador_de_codigo_t551p7m1iq.jpg',
  'Zeus IA Extensión Visual Studio':
    'https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/fn4yw97p4rw378z/zeus_extencion_vc_48ooilvkxa.jpg',
  'NasServer Zeus':
    'https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/3p74z32vzwmxb4y/chat_expandido_6tnlwpmx07.jpg',
  'Gestor de Contraseñas Zeus':
    'https://pocketbase-zeus.fly.dev/api/files/pbc_1998862360/h1f3n5l9rc8jhcm/generador_contrase_as_lf5u0su1re.png',
};

// Imagen de una tarjeta: prefiere la imagen de la base de datos (campo image)
// y, si falla, cae a la imagen de respaldo por nombre de app.
function AppImage({
  dbSrc,
  appName,
}: {
  dbSrc: string | null;
  appName: string;
}) {
  const fallback = FALLBACK_IMAGES[appName];
  const initial = dbSrc ?? fallback ?? null;
  const [src, setSrc] = useState<string | null>(initial);

  useEffect(() => {
    setSrc(dbSrc ?? fallback ?? null);
  }, [dbSrc, fallback]);

  if (!src) {
    return (
      <div className="w-full h-full rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
        <ImageIcon className="h-10 w-10" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={appName}
      className="w-full h-full object-cover rounded-lg"
      onError={() => {
        // Si la imagen de BD falla y hay fallback, usarlo; si no, placeholder.
        setSrc((cur) => (cur && cur !== fallback ? fallback : null));
      }}
    />
  );
}

// --- Tipos de registros de PocketBase ---------------------------------------
interface DescargaRecord {
  id: string;
  app: string; // título
  descripcion?: string; // Text
  url_descarga?: string; // URL / Text
  descargas: number;
  image?: string[]; // file (maxSelect 1 -> array)
  user_descarga?: string[]; // relación a _pb_users_auth_
  created: string;
  updated: string;
}

// Usuario expandido desde la relación user_id de app_votes.
interface UserRecord {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  avatar?: string;
  collectionId?: string;
  collectionName?: string;
}

interface VoteRecord {
  id: string;
  app_id: string[]; // relación a app_descargas
  rating: number;
  user_id?: string[]; // relación a _pb_users_auth_
  valoracion?: string;
  created: string;
  updated: string;
  expand?: {
    user_id?: UserRecord | UserRecord[];
  };
}

// --- Helpers ----------------------------------------------------------------
function getCurrentUserId(): string | null {
  try {
    if (pb.authStore.isValid && pb.authStore.model) {
      return (pb.authStore.model as { id?: string }).id ?? null;
    }
  } catch {
    // ignore
  }
  return null;
}

function recordImage(record: DescargaRecord): string | null {
  if (!record.image || record.image.length === 0) return null;
  try {
    return pb.files.getUrl(record, record.image[0]) as unknown as string;
  } catch {
    return `${pb.baseUrl}/api/files/app_descargas/${record.id}/${record.image[0]}`;
  }
}

// Usuario que escribió la reseña (de la relación expandida user_id).
function voteUser(vote: VoteRecord): UserRecord | null {
  const u = vote.expand?.user_id;
  if (!u) return null;
  return Array.isArray(u) ? u[0] ?? null : u;
}

function userAvatarUrl(user: UserRecord): string | null {
  if (!user.avatar) return null;
  try {
    return pb.files.getUrl(user, user.avatar) as unknown as string;
  } catch {
    if (user.collectionId) {
      return `${pb.baseUrl}/api/files/${user.collectionId}/${user.id}/${user.avatar}`;
    }
    return null;
  }
}

function userDisplayName(user: UserRecord): string {
  return user.name || user.username || user.email || 'Usuario';
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// --- Componente principal ---------------------------------------------------
export default function DescargasPage() {
  const router = useRouter();
  const [apps, setApps] = useState<DescargaRecord[]>([]);
  const [votesByRecord, setVotesByRecord] = useState<Record<string, VoteRecord[]>>({});
  const [loading, setLoading] = useState(true);
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  const [ratingInput, setRatingInput] = useState<Record<string, number>>({});
  const [reviewInput, setReviewInput] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [submitMsg, setSubmitMsg] = useState<
    Record<string, { ok: boolean; text: string } | undefined>
  >({});
  const [userId, setUserId] = useState<string | null>(null);

  const refreshUserId = useCallback(() => setUserId(getCurrentUserId()), []);

  useEffect(() => {
    try {
      pb.authStore.loadFromCookie(document.cookie);
    } catch {
      // ignore
    }
    refreshUserId();
    const unsubscribe = pb.authStore.onChange(() => refreshUserId());

    const load = async () => {
      try {
        const records = (await pb.collection('app_descargas').getFullList({
          sort: 'created',
        })) as unknown as DescargaRecord[];
        setApps(records);

        const votes = (await pb.collection('app_votes').getFullList({
          sort: '-created',
          expand: 'user_id',
        })) as unknown as VoteRecord[];

        const grouped: Record<string, VoteRecord[]> = {};
        for (const v of votes) {
          const appId = Array.isArray(v.app_id) ? v.app_id[0] : (v.app_id as unknown as string);
          if (!appId) continue;
          (grouped[appId] ??= []).push(v);
        }
        setVotesByRecord(grouped);
      } catch (err) {
        console.error('Error cargando descargas/votos:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
    return () => {
      unsubscribe?.();
    };
  }, [refreshUserId]);

  // Descargar: requiere login. Incrementa descargas + añade usuario.
  const handleDownload = useCallback(
    async (record: DescargaRecord) => {
      const uid = getCurrentUserId();
      if (!uid) {
        router.push(authPaths.login);
        return;
      }

      if (!record.url_descarga) {
        setSubmitMsg((p) => ({
          ...p,
          [record.id]: { ok: false, text: 'Esta app no tiene enlace de descarga.' },
        }));
        return;
      }

      if (typeof window !== 'undefined') {
        window.open(record.url_descarga, '_blank', 'noopener,noreferrer');
      }

      const newCount = (record.descargas ?? 0) + 1;
      const prevUsers = Array.isArray(record.user_descarga) ? record.user_descarga : [];
      const nextUsers = prevUsers.includes(uid) ? prevUsers : [...prevUsers, uid];

      setApps((prev) =>
        prev.map((a) =>
          a.id === record.id ? { ...a, descargas: newCount, user_descarga: nextUsers } : a,
        ),
      );

      try {
        const updated = (await pb.collection('app_descargas').update(record.id, {
          descargas: newCount,
          user_descarga: nextUsers,
        })) as unknown as DescargaRecord;
        setApps((prev) => prev.map((a) => (a.id === record.id ? updated : a)));
      } catch (err) {
        console.error('Error actualizando descargas:', err);
        setApps((prev) => prev.map((a) => (a.id === record.id ? record : a)));
        setSubmitMsg((p) => ({
          ...p,
          [record.id]: { ok: false, text: 'No se pudo registrar la descarga. ¿Has iniciado sesión?' },
        }));
      }
    },
    [router],
  );

  // Voto previo del usuario para una app.
  const findUserVote = useCallback(
    (recordId: string, uid: string): VoteRecord | undefined =>
      (votesByRecord[recordId] ?? []).find((v) => {
        const u = Array.isArray(v.user_id) ? v.user_id[0] : (v.user_id as unknown as string);
        return u === uid;
      }),
    [votesByRecord],
  );

  // Enviar valoración: requiere login. Un voto por usuario (actualiza si existe).
  const handleSubmitReview = useCallback(
    async (record: DescargaRecord) => {
      const uid = getCurrentUserId();
      if (!uid) {
        router.push(authPaths.login);
        return;
      }

      const rating = ratingInput[record.id] ?? 0;
      const valoracion = (reviewInput[record.id] ?? '').trim();
      if (rating < 1) {
        setSubmitMsg((p) => ({
          ...p,
          [record.id]: { ok: false, text: 'Selecciona al menos 1 estrella.' },
        }));
        return;
      }

      setSubmitting(record.id);
      setSubmitMsg((p) => ({ ...p, [record.id]: undefined }));

      const payload: Record<string, unknown> = {
        app_id: [record.id],
        rating,
        valoracion,
        user_id: [uid],
      };

      try {
        const existing = findUserVote(record.id, uid);
        let saved: VoteRecord;
        if (existing) {
          saved = (await pb.collection('app_votes').update(existing.id, payload, {
            expand: 'user_id',
          })) as unknown as VoteRecord;
        } else {
          saved = (await pb.collection('app_votes').create(payload, {
            expand: 'user_id',
          })) as unknown as VoteRecord;
        }

        setVotesByRecord((prev) => {
          const list = (prev[record.id] ?? []).filter((v) => v.id !== saved.id);
          return { ...prev, [record.id]: [saved, ...list] };
        });
        setRatingInput((p) => ({ ...p, [record.id]: 0 }));
        setReviewInput((p) => ({ ...p, [record.id]: '' }));
        setSubmitMsg((p) => ({
          ...p,
          [record.id]: {
            ok: true,
            text: existing ? 'Valoración actualizada. ¡Gracias!' : '¡Gracias por tu valoración!',
          },
        }));
      } catch (err) {
        console.error('Error guardando valoración:', err);
        setSubmitMsg((p) => ({
          ...p,
          [record.id]: { ok: false, text: 'No se pudo guardar la valoración. Inténtalo de nuevo.' },
        }));
      } finally {
        setSubmitting(null);
      }
    },
    [ratingInput, reviewInput, findUserVote, router],
  );

  // Media y conteo por app.
  const stats = useMemo(() => {
    const out: Record<string, { avg: number; count: number }> = {};
    for (const a of apps) {
      const votes = votesByRecord[a.id] ?? [];
      const sum = votes.reduce((acc, v) => acc + (v.rating ?? 0), 0);
      out[a.id] = { avg: votes.length ? sum / votes.length : 0, count: votes.length };
    }
    return out;
  }, [apps, votesByRecord]);

  const userExistingRating = useCallback(
    (recordId: string): number => (userId ? findUserVote(recordId, userId)?.rating ?? 0 : 0),
    [userId, findUserVote],
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Descargas
        </h1>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">Cargando datos…</p>
        ) : apps.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            Todavía no hay aplicaciones publicadas.
          </p>
        ) : (
          <div className="space-y-8">
            {apps.map((record) => {
              const stat = stats[record.id] ?? { avg: 0, count: 0 };
              const descargas = record.descargas ?? 0;
              const isOpen = expandedApp === record.id;
              const imgSrc = recordImage(record);
              const msg = submitMsg[record.id];
              const currentRating = ratingInput[record.id] ?? userExistingRating(record.id);
              const loggedIn = !!userId;
              const appVotes = votesByRecord[record.id] ?? [];
              // imgSrc sólo se usa para pasarlo a AppImage; no se renderiza directo.

              return (
                <div
                  key={record.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
                    <div className="w-full md:w-96 h-56 flex-shrink-0">
                      <AppImage dbSrc={imgSrc} appName={record.app} />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {record.app}
                      </h2>
                      {record.descripcion && (
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{record.descripcion}</p>
                      )}

                      {/* Valoración + descargas */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                        <StarRating value={stat.avg} readOnly showValue count={stat.count} />
                        <span className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                          <Download className="h-4 w-4" />
                          {descargas.toLocaleString()}{' '}
                          {descargas === 1 ? 'descarga' : 'descargas'}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        {loggedIn ? (
                          <button
                            type="button"
                            onClick={() => handleDownload(record)}
                            disabled={!record.url_descarga}
                            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors inline-flex items-center gap-2"
                          >
                            <Download className="h-5 w-5" />
                            Descargar
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => router.push(authPaths.login)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-flex items-center gap-2"
                          >
                            <LogIn className="h-5 w-5" />
                            Inicia sesión para descargar
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setExpandedApp(isOpen ? null : record.id)}
                          aria-expanded={isOpen}
                          aria-controls={`panel-${record.id}`}
                          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:opacity-80 transition-opacity"
                        >
                          Valorar
                          <ChevronDown
                            className={
                              'h-4 w-4 transition-transform ' + (isOpen ? 'rotate-180' : '')
                            }
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Panel desplegable de valoración */}
                  {isOpen && (
                    <div
                      id={`panel-${record.id}`}
                      className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-6"
                    >
                      {loggedIn ? (
                        <div className="max-w-xl">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                            Tu valoración
                            {userExistingRating(record.id) > 0 && (
                              <span className="text-gray-400 dark:text-gray-500 font-normal">
                                {' '}
                                · ya valoraste esta app (puedes cambiarla)
                              </span>
                            )}
                          </p>
                          <StarRating
                            value={currentRating}
                            size={28}
                            onChange={(v) => setRatingInput((p) => ({ ...p, [record.id]: v }))}
                          />

                          <label
                            htmlFor={`review-${record.id}`}
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mt-4 mb-2"
                          >
                            Tu reseña escrita (opcional)
                          </label>
                          <textarea
                            id={`review-${record.id}`}
                            value={reviewInput[record.id] ?? ''}
                            onChange={(e) =>
                              setReviewInput((p) => ({ ...p, [record.id]: e.target.value }))
                            }
                            rows={3}
                            placeholder="Cuenta tu experiencia con esta aplicación…"
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />

                          <div className="flex items-center gap-3 mt-4">
                            <button
                              type="button"
                              disabled={submitting === record.id}
                              onClick={() => handleSubmitReview(record)}
                              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                              {submitting === record.id && (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              )}
                              Enviar valoración
                            </button>
                            {msg && (
                              <span
                                className={
                                  'text-sm ' +
                                  (msg.ok
                                    ? 'text-green-600 dark:text-green-400'
                                    : 'text-red-600 dark:text-red-400')
                                }
                              >
                                {msg.text}
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <LogIn className="h-4 w-4 mt-0.5 shrink-0" />
                          <button
                            type="button"
                            onClick={() => router.push(authPaths.login)}
                            className="underline text-blue-600 dark:text-blue-400"
                          >
                            Inicia sesión
                          </button>{' '}
                          para dejar tu valoración.
                        </div>
                      )}

                      {/* Reseñas existentes */}
                      {appVotes.length > 0 && (
                        <div className="mt-6 space-y-3">
                          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                            Reseñas
                          </p>
                          {appVotes.map((v) => {
                            const user = voteUser(v);
                            const name = user ? userDisplayName(user) : 'Usuario';
                            const avatar = user ? userAvatarUrl(user) : null;
                            return (
                              <div
                                key={v.id}
                                className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  {avatar ? (
                                    <img
                                      src={avatar}
                                      alt={name}
                                      className="h-7 w-7 rounded-full object-cover"
                                    />
                                  ) : (
                                    <div className="h-7 w-7 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300 flex items-center justify-center text-xs font-semibold">
                                      {getInitials(name)}
                                    </div>
                                  )}
                                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                    {name}
                                  </span>
                                  <span className="ml-3">
                                    <StarRating value={v.rating ?? 0} readOnly size={14} />
                                  </span>
                                </div>
                                {v.valoracion && (
                                  <p className="text-sm text-gray-700 dark:text-gray-200 mt-2 whitespace-pre-wrap">
                                    {v.valoracion}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}