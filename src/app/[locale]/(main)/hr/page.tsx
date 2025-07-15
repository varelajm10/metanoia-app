
"use client";

import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HRDashboardClient from "./dashboard-client";
import { EmployeeManagement } from "./employee-management";
import { LayoutDashboard, Users } from "lucide-react";

export default function HRPage() {
  const t = useTranslations("HR");
  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between space-y-2">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">{t('title')}</h2>
            <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard"><LayoutDashboard className="mr-2 h-4 w-4"/> {t('dashboardTab')}</TabsTrigger>
          <TabsTrigger value="management"><Users className="mr-2 h-4 w-4"/>{t('managementTab')}</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="mt-6">
          <HRDashboardClient />
        </TabsContent>
        <TabsContent value="management" className="mt-6">
          <EmployeeManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
