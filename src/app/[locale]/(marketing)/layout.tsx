
"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <SidebarProvider>
        <div className="flex min-h-screen flex-col bg-background bg-page-gradient">
          <Header />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </div>
      </SidebarProvider>
  );
}
