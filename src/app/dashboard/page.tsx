"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import DashboardClient from "./dashboard-client";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background bg-page-gradient">
      <Header />
      <DashboardClient />
      <Footer />
    </div>
  );
}
