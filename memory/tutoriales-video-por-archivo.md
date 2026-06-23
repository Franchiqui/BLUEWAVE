---
name: tutoriales-video-por-archivo
description: Los tutoriales de vídeo viven en cada page.tsx (no en un archivo compartido) por preferencia del usuario
metadata:
  type: feedback
---

Los tutoriales de vídeo de cada pestaña están definidos inline en su propio `app/<pestaña>/page.tsx` (URL en el atributo `src` del `<video>`), no centralizados en `lib/constants.ts` como sí lo están las imágenes (`IMAGES`). La excepción es el IDE, que usa `DEFAULT_TUTORIAL_VIDEO_URL` + un campo `videoUrl` por herramienta.

**Why:** El usuario prefiere controlar cada tutorial de uno en uno y saber en qué pestaña está al editar, en lugar de tenerlos todos en un solo archivo.

**How to apply:** No proponer mover los tutoriales a una constante compartida. Al añadir una nueva pestaña con tutorial, pon el `src` del `<video>` directamente en su `page.tsx`.