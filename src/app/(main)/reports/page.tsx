"use client";

import ReportsClient from "./reports-client";

export default function ReportsPage() {
  return (
    <div>
       <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Reporting</h2>
            <p className="text-muted-foreground">Genera, programa y analiza reportes personalizados y métricas de performance.</p>
        </div>
      </div>
      <ReportsClient />
    </div>
  );
}
