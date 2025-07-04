
"use client";

import CustomerManagementClient from "./customer-management-client";

export default function CustomerManagementPage() {
  return (
    <div>
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Gestión de Clientes</h2>
            <p className="text-muted-foreground">Alta, análisis y gestión integral de la cartera de clientes.</p>
        </div>
      </div>
      <CustomerManagementClient />
    </div>
  );
}
