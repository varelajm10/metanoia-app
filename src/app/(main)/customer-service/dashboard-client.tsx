"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomerServiceDashboardClient() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard de Atención al Cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Este dashboard presentará métricas sobre el servicio al cliente, incluyendo volumen de tickets, tiempos de respuesta, satisfacción del cliente (CSAT) y análisis de sentimiento.
        </p>
      </CardContent>
    </Card>
  );
}
