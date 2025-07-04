
"use client";

import IntelligentInventoryClient from "./intelligent-inventory-client";

export default function IntelligentInventoryPage() {
  return (
    <div>
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Inventario Inteligente</h2>
            <p className="text-muted-foreground">Optimización de stock, predicción de demanda y gestión automatizada.</p>
        </div>
      </div>
      <IntelligentInventoryClient />
    </div>
  );
}
