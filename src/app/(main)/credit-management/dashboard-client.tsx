"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreditManagementDashboardClient() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard de Gestión de Créditos</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Aquí se mostrarán los indicadores clave sobre la gestión de créditos, como el estado de las solicitudes, riesgo crediticio de la cartera y pipeline de pagos.
        </p>
      </CardContent>
    </Card>
  );
}
