"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ClientFormProps {
  mode: 'create' | 'edit';
  client?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export default function ClientForm({ mode, client, onSave, onCancel }: ClientFormProps) {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
      <CardHeader>
        <CardTitle>{mode === 'create' ? 'Crear Nuevo Cliente' : 'Editar Cliente'}</CardTitle>
        <CardDescription>
          Formulario multi-paso para la gestión de clientes (En construcción).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground py-10">
          <p>El formulario de alta y edición de clientes se implementará aquí.</p>
          <p>Incluirá los {6} pasos definidos en la arquitectura.</p>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onCancel}>Cancelar</Button>
          <Button onClick={() => onSave({})}>{mode === 'create' ? 'Guardar Cliente' : 'Guardar Cambios'}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
