"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, TrendingUp, Target, Briefcase, ShieldCheck, TrendingDown } from "lucide-react";
import { useTranslations } from "next-intl";

export function DashboardKpiCards() {
    const t = useTranslations('Dashboard');
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-normal text-muted-foreground">{t('collections')}</CardTitle>
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">$0</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" /> +0% {t('vsLastMonth')}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-normal text-muted-foreground">{t('monthlyGoalProgress')}</CardTitle>
                    <Target className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">0%</div>
                    <p className="text-xs text-muted-foreground">$0 {t('from')} $0</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-normal text-muted-foreground">{t('totalEmployees')}</CardTitle>
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />+0 {t('newHires')}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-normal text-muted-foreground">{t('customersAtRisk')}</CardTitle>
                    <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-destructive">0</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                        <TrendingDown className="h-4 w-4 mr-1" />-0 {t('vsLastMonth')}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
