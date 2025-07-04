"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProcessAutomationDashboardClient() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard de Automatización de Procesos</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Métricas sobre la eficiencia de los procesos automatizados (RPA/BPM), incluyendo ROI de automatización, workflows completados y cuellos de botella identificados.
        </p>
      </CardContent>
    </Card>
  );
}
