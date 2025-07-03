"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import DashboardLayout from "../dashboard/dashboard-client";

export default function CreditManagementPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background bg-page-gradient">
      <Header />
      <DashboardLayout 
        title="Gestión de Créditos"
        description="Automatización del ciclo de cobranzas, análisis de riesgo y pipeline de pagos."
      />
      <Footer />
    </div>
  );
}
