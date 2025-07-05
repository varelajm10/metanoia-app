
"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import DemoForm from "./demo-form";
import { Suspense } from "react";
import { useTranslations } from "next-intl";

export default function DemoPage() {
  const t = useTranslations('Common');
  return (
    <div className="flex min-h-screen flex-col bg-background bg-page-gradient">
      <Header />
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <Suspense fallback={<div className="text-white">{t('loading')}</div>}>
          <DemoForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
