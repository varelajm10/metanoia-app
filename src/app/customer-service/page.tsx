"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import DashboardLayout from "../dashboard/dashboard-layout";
import CustomerServiceDashboardClient from "./dashboard-client";

export default function CustomerServicePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background bg-page-gradient">
      <Header />
      <DashboardLayout 
        title="Atención al Cliente"
        description="Gestión omnicanal de tickets, análisis de sentimiento y métricas de resolución."
      >
        <CustomerServiceDashboardClient />
      </DashboardLayout>
      <Footer />
    </div>
  );
}
