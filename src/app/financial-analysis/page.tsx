import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import FinancialAnalysisClient from "./financial-analysis-client";

export default function FinancialAnalysisPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <FinancialAnalysisClient />
      </main>
      <Footer />
    </div>
  );
}
