"use client";

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <p className="text-sm text-muted-foreground">
            {t('copyright', { year })}
          </p>
          <div className="flex items-center gap-6">
            {/* Links removed as per user request */}
          </div>
        </div>
      </div>
    </footer>
  );
}
