
"use client";

import CreditManagementDashboardClient from "./dashboard-client";
import { useTranslations } from "next-intl";

export default function CreditManagementPage() {
  const t = useTranslations("CreditManagement");

  return (
    <div>
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">{t('title')}</h2>
            <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>
      </div>
      <CreditManagementDashboardClient />
    </div>
  );
}
