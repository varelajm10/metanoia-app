"use client";

import HRDashboardClient from "./dashboard-client";
import { useTranslations } from "next-intl";

export default function HRPage() {
  const t = useTranslations("HR");
  return (
    <div>
       <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">{t('title')}</h2>
            <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>
      </div>
      <HRDashboardClient />
    </div>
  );
}
