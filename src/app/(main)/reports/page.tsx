
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <div>
       <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Reporting</h2>
            <p className="text-muted-foreground">Genera y exporta dashboards ejecutivos y métricas de performance.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Centro de Reportes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Este módulo permitirá la creación de reportes personalizados, la programación de envíos automáticos y la exportación de datos en múltiples formatos (PDF, Excel, CSV).</p>
        </CardContent>
      </Card>
    </div>
  );
}
