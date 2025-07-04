
"use client";

import DocumentManagementClient from "./document-management-client";

export default function DocumentManagementPage() {
  return (
    <div>
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Gestión Documental</h2>
            <p className="text-muted-foreground">Repositorio centralizado, versionado y flujos de aprobación.</p>
        </div>
      </div>
      <DocumentManagementClient />
    </div>
  );
}
