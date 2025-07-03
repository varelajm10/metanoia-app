"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import FinancialAnalysisClient from "./financial-analysis-client";

export default function FinancialAnalysisPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background bg-page-gradient">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <FinancialAnalysisClient />
      </main>
      <Footer />
    </div>
  );
}
