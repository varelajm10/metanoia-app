
"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppSidebar } from "@/components/app-sidebar";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background bg-page-gradient">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
