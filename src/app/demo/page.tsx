import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import DemoForm from "./demo-form";
import { Suspense } from "react";

export default function DemoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Suspense fallback={<div>Loading...</div>}>
          <DemoForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
