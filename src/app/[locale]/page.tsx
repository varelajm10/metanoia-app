"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const router = useRouter();
  const t = useTranslations("Common");

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <p>{t('loading')}...</p>
      </div>
    </div>
  );
}
