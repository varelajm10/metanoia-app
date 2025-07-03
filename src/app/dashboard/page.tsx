"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import DashboardLayout from "./dashboard-layout";
import GeneralDashboardClient from "./general-dashboard-client";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background bg-page-gradient">
      <Header />
      <DashboardLayout 
        title="Dashboard General"
        description="Una vista general de todas las métricas de su empresa."
      >
        <GeneralDashboardClient />
      </DashboardLayout>
      <Footer />
    </div>
  );
}
