
"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from 'next-intl';

const MainDashboard = dynamic(() => import('@/components/main-dashboard'), { 
    ssr: false,
    loading: () => <DashboardSkeleton /> 
});

const DashboardSkeleton = () => (
    <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-[116px] rounded-xl" />
            <Skeleton className="h-[116px] rounded-xl" />
            <Skeleton className="h-[116px] rounded-xl" />
            <Skeleton className="h-[116px] rounded-xl" />
        </div>
        <div className="grid gap-6 lg:grid-cols-5">
            <Skeleton className="lg:col-span-3 h-[350px] rounded-xl" />
            <Skeleton className="lg:col-span-2 h-[350px] rounded-xl" />
        </div>
        <Skeleton className="h-[230px] rounded-xl" />
    </div>
);


export default function DashboardPage() {
  const t = useTranslations('Dashboard');
  return (
    <div>
        <div className="flex items-center justify-between space-y-2 mb-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">{t('title')}</h2>
                <p className="text-muted-foreground">{t('subtitle')}</p>
            </div>
          </div>
        <MainDashboard />
    </div>
  );
}
