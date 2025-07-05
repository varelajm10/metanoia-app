
"use client";

import IntelligentInventoryClient from "./intelligent-inventory-client";
import { useTranslations } from "next-intl";

export default function IntelligentInventoryPage() {
  const t = useTranslations("IntelligentInventory");
  return (
    <div>
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">{t('title')}</h2>
            <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>
      </div>
      <IntelligentInventoryClient />
    </div>
  );
}
