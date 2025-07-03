"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import MainDashboard from "@/components/main-dashboard";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <MainDashboard />
      </main>
      <Footer />
    </div>
  );
}
