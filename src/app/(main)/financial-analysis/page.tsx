
"use client";

import FinancialAnalysisClient from "./financial-analysis-client";

export default function FinancialAnalysisPage() {
  return (
    <div>
       <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Análisis Financiero</h2>
            <p className="text-muted-foreground">Gestión financiera integral, proyecciones y análisis de rentabilidad.</p>
        </div>
      </div>
      <FinancialAnalysisClient />
    </div>
  );
}
