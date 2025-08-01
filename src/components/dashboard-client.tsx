
"use client";

import { useTranslations } from "next-intl";
import { AIChatBox } from "@/components/ai-chat-box";
import { DashboardKpiCards } from "./dashboard/dashboard-kpi-cards";
import { DashboardCharts } from "./dashboard/dashboard-charts";
import { DashboardQuickAccess } from "./dashboard/dashboard-quick-access";
import { DashboardModuleGrid } from "./dashboard/dashboard-module-grid";

export default function DashboardClient() {
  const t = useTranslations('Dashboard');

  return (
    <div className="space-y-8">
      <DashboardKpiCards />
      <DashboardCharts />
      <DashboardQuickAccess />
      <DashboardModuleGrid />
      <AIChatBox dashboardContext={t('title')} />
    </div>
  );
}
