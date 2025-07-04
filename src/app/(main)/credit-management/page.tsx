
"use client";

import CreditManagementDashboardClient from "./dashboard-client";

export default function CreditManagementPage() {
  return (
    <div>
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Gestión de Créditos</h2>
            <p className="text-muted-foreground">Automatización del ciclo de cobranzas, análisis de riesgo y pipeline de pagos.</p>
        </div>
      </div>
      <CreditManagementDashboardClient />
    </div>
  );
}
