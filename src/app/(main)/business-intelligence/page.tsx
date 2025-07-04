
"use client";

import BusinessIntelligenceClient from "./business-intelligence-client";

export default function BusinessIntelligencePage() {
  return (
    <div>
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Business Intelligence</h2>
            <p className="text-muted-foreground">Centro de análisis y reportes ejecutivos para una toma de decisiones informada.</p>
        </div>
      </div>
      <BusinessIntelligenceClient />
    </div>
  );
}
