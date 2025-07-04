
"use client";

import CustomerServiceDashboardClient from "./dashboard-client";

export default function CustomerServicePage() {
  return (
    <div>
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Atención al Cliente</h2>
            <p className="text-muted-foreground">Gestión omnicanal de tickets, análisis de sentimiento y métricas de resolución.</p>
        </div>
      </div>
      <CustomerServiceDashboardClient />
    </div>
  );
}
