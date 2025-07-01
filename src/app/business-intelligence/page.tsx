import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import BusinessIntelligenceClient from "./business-intelligence-client";

export default function BusinessIntelligencePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50/50">
        <BusinessIntelligenceClient />
      </main>
      <Footer />
    </div>
  );
}
