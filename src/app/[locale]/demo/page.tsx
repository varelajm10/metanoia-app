
"use client";

import DemoForm from "./demo-form";
import { Suspense } from "react";
import { useTranslations } from "next-intl";

export default function DemoPage() {
  const t = useTranslations('Common');
  return (
    <div className="flex-1 flex items-center justify-center py-20 px-4">
      <Suspense fallback={<div className="text-white">{t('loading')}</div>}>
        <DemoForm />
      </Suspense>
    </div>
  );
}
