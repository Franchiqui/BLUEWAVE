'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles } from 'lucide-react';

export default function GeneradorDeAppPage() {
  const [appName, setAppName] = useState('');
  const [framework, setFramework] = useState('nextjs');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulación de generación
    setTimeout(() => {
      setGeneratedCode(`// Código generado para ${appName}\nconst App = () => {\n  return <div>${appName}</div>;\n};`);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Generador de Aplicaciones</h1>
        <p className="text-muted-foreground">
          Describe tu aplicación y la generaremos automáticamente
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Configuración</CardTitle>
            <CardDescription>
              Define los parámetros de tu aplicación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="appName">Nombre de la App</Label>
              <Input
                id="appName"
                placeholder="MiApp"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="framework">Framework</Label>
              <Select value={framework} onValueChange={setFramework}>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Selecciona un framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nextjs">Next.js</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Describe qué hace tu aplicación..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!appName || isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generar App
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vista Previa</CardTitle>
            <CardDescription>
              Código generado para tu aplicación
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedCode ? (
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{generatedCode}</code>
              </pre>
            ) : (
              <div className="flex items-center justify-center h-40 text-muted-foreground">
                Completa el formulario y presiona Generar
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
