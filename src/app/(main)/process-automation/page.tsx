
"use client";

import ProcessAutomationDashboardClient from "./dashboard-client";

export default function ProcessAutomationPage() {
  return (
    <div>
       <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Automatización de Procesos</h2>
            <p className="text-muted-foreground">Orquestación de workflows, métricas de eficiencia y análisis de ROI.</p>
        </div>
      </div>
      <ProcessAutomationDashboardClient />
    </div>
  );
}
