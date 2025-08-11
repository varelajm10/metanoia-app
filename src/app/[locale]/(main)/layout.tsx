
"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarProps } from "@/components/ui/sidebar";
import { InterfaceBehaviorContext } from "@/hooks/use-interface-behavior";
import { ProtectedRoute } from "@/components/protected-route";
import { AuthProvider } from "@/hooks/use-auth";

function MainLayoutContent({ children }: { children: React.ReactNode }) {
  const [sidebarVariant, setSidebarVariant] = useState<SidebarProps['variant']>('sidebar');
  const [sidebarCollapsible, setSidebarCollapsible] = useState<SidebarProps['collapsible']>('icon');

  const contextValue = {
    sidebarVariant,
    setSidebarVariant,
    sidebarCollapsible,
    setSidebarCollapsible
  };

  return (
    <InterfaceBehaviorContext.Provider value={contextValue}>
      <SidebarProvider>
        <div className="flex min-h-screen bg-background bg-page-gradient">
          <AppSidebar variant={sidebarVariant} collapsible={sidebarCollapsible} />
          <div className="flex flex-1 flex-col">
            <Header />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </SidebarProvider>
    </InterfaceBehaviorContext.Provider>
  );
}

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
        <ProtectedRoute>
            <MainLayoutContent>{children}</MainLayoutContent>
        </ProtectedRoute>
    </AuthProvider>
  );
}
