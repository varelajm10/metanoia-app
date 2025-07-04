"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HRDashboardClient() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard de Recursos Humanos</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Visualización de métricas de RR.HH. como headcount, rotación de personal, resultados de encuestas de clima laboral y estado de procesos de selección.
        </p>
      </CardContent>
    </Card>
  );
}
