"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import DashboardLayout from "../dashboard/dashboard-client";

export default function HRPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background bg-page-gradient">
      <Header />
      <DashboardLayout 
        title="Recursos Humanos"
        description="Gestión integral del talento, análisis de performance y predicción de rotación."
      />
      <Footer />
    </div>
  );
}
