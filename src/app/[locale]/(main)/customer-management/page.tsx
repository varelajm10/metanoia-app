
"use client";

import CustomerManagementClient from "./customer-management-client";
import { useTranslations } from "next-intl";

export default function CustomerManagementPage() {
  const t = useTranslations("CustomerManagement");
  return (
    <div>
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">{t('title')}</h2>
            <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>
      </div>
      <CustomerManagementClient />
    </div>
  );
}
