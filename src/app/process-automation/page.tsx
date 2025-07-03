"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import DashboardLayout from "../dashboard/dashboard-layout";
import ProcessAutomationDashboardClient from "./dashboard-client";

export default function ProcessAutomationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background bg-page-gradient">
      <Header />
      <DashboardLayout 
        title="Automatización de Procesos"
        description="Orquestación de workflows, métricas de eficiencia y análisis de ROI."
      >
        <ProcessAutomationDashboardClient />
      </DashboardLayout>
      <Footer />
    </div>
  );
}
