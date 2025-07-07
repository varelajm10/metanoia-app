
"use client";

import { NewCustomerForm } from "./new-customer-form";
import { useTranslations } from "next-intl";

export default function NewCustomerPage() {
  const t = useTranslations("NewCustomerForm");
  return (
    <div>
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">{t('title')}</h2>
            <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>
      </div>
      <NewCustomerForm />
    </div>
  );
}
