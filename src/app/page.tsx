"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import DashboardLayout from "./dashboard/dashboard-layout";
import GeneralDashboardClient from "./dashboard/general-dashboard-client";

export default function Home() {
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
