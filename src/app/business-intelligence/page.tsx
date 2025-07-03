"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import DashboardLayout from "../dashboard/dashboard-client";

export default function BusinessIntelligencePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background bg-page-gradient">
      <Header />
      <DashboardLayout 
        title="Business Intelligence"
        description="Centro de análisis y reportes ejecutivos para una toma de decisiones informada."
      />
      <Footer />
    </div>
  );
}
