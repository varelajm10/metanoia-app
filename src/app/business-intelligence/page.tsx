import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import BusinessIntelligenceClient from "./business-intelligence-client";

export default function BusinessIntelligencePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background bg-page-gradient">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <BusinessIntelligenceClient />
      </main>
      <Footer />
    </div>
  );
}
