"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send } from "lucide-react";

export function AIChatBox() {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-lg mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <span>Asistente de IA</span>
        </CardTitle>
        <CardDescription>
          Haz una pregunta en lenguaje natural sobre los datos de este dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Textarea
            placeholder="Ej: ¿Cuál fue el principal motivo de consulta de clientes el último mes?"
            className="bg-black/20 border-white/10 focus:ring-primary flex-1"
            rows={1}
          />
          <Button className="bg-primary hover:bg-primary/90">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
