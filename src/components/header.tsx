
"use client";

import Link from "next/link";
import { ThemeToggle } from './theme-toggle';
import { Button } from "./ui/button";
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations('Header');
  return (
    <header className="px-4 lg:px-6 h-20 flex items-center bg-transparent sticky top-0 z-30 border-b border-white/10">
      <div className="lg:hidden">
        <SidebarTrigger />
      </div>
      <div className="w-full flex justify-end items-center gap-4">
        <Button asChild variant="ghost">
          <Link href="/demo">{t('demo')}</Link>
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
