"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"

interface CodeExample {
  language: string
  code: string
}

interface IdeTabContentProps {
  title: string
  description: string
  keyPoints: string[]
  codeExamples: CodeExample[]
  imagePath: string
  imageAlt: string
}

export function IdeTabContent({
  title,
  description,
  keyPoints,
  codeExamples,
  imagePath,
  imageAlt,
}: IdeTabContentProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [contextLoaded, setContextLoaded] = useState(false)

  useEffect(() => {
    // Simular carga asíncrona del contexto
    const timer = setTimeout(() => {
      setContextLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6 p-4">
      {/* Título y Descripción */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* Imagen */}
      <Card className="overflow-hidden">
        <CardContent className="p-0 relative aspect-video">
          {!imageLoaded && !imageError && (
            <Skeleton className="w-full h-full absolute inset-0" />
          )}
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <p className="text-muted-foreground text-sm">
                No se pudo cargar la imagen
              </p>
            </div>
          ) : (
            <Image
              src={imagePath}
              alt={imageAlt}
              fill
              className="object-cover"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          )}
        </CardContent>
      </Card>

      {/* Puntos Clave */}
      {keyPoints.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Puntos Clave</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {keyPoints.map((point, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {point}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Ejemplos de Código */}
      {codeExamples.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ejemplos de Código</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {codeExamples.map((example, index) => (
              <div key={index}>
                <h4 className="text-sm font-semibold mb-2">
                  {example.language}
                </h4>
                <ScrollArea className="h-[200px] w-full rounded-md border">
                  <pre className="p-4 text-sm">
                    <code>{example.code}</code>
                  </pre>
                </ScrollArea>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Indicador de carga de contexto */}
      {!contextLoaded && (
        <div className="space-y-3">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
      )}
    </div>
  )
}

export default IdeTabContent