"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import DashboardLayout from "../dashboard/dashboard-layout";
import CustomerManagementClient from "./customer-management-client";

export default function CustomerManagementPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background bg-page-gradient">
      <Header />
      <DashboardLayout 
        title="Gestión de Clientes"
        description="Alta, análisis y gestión integral de la cartera de clientes."
      >
        <CustomerManagementClient />
      </DashboardLayout>
      <Footer />
    </div>
  );
}
