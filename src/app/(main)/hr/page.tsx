"use client";

import HRDashboardClient from "./dashboard-client";

export default function HRPage() {
  return (
    <div>
       <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Recursos Humanos</h2>
            <p className="text-muted-foreground">Gestión integral del talento, análisis de performance y predicción de rotación.</p>
        </div>
      </div>
      <HRDashboardClient />
    </div>
  );
}
