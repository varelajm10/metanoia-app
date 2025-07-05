
"use client";

import ProcessAutomationDashboardClient from "./dashboard-client";
import { useTranslations } from "next-intl";

export default function ProcessAutomationPage() {
  const t = useTranslations("ProcessAutomation");
  return (
    <div>
       <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">{t('title')}</h2>
            <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>
      </div>
      <ProcessAutomationDashboardClient />
    </div>
  );
}
