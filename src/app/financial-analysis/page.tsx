"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import DashboardLayout from "../dashboard/dashboard-layout";
import FinancialAnalysisClient from "./financial-analysis-client";

export default function FinancialAnalysisPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background bg-page-gradient">
      <Header />
       <DashboardLayout 
        title="Análisis Financiero"
        description="Gestión financiera integral, proyecciones y análisis de rentabilidad."
      >
        <FinancialAnalysisClient />
      </DashboardLayout>
      <Footer />
    </div>
  );
}
