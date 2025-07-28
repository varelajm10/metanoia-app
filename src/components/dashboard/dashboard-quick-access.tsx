
"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Handshake, Bot, TrendingUp, Users, Banknote } from "lucide-react";
import { useTranslations } from "next-intl";

export function DashboardQuickAccess() {
    const t = useTranslations('Dashboard');
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold">{t('quickAccess')}</CardTitle>
                <CardDescription>{t('quickAccessSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                <Link href="/credit-management" passHref>
                    <Button variant="outline" className="w-full h-28 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-all hover:bg-muted/50 hover:border-primary/50">
                        <DollarSign className="h-8 w-8 text-primary" />
                        <span>{t('credits')}</span>
                    </Button>
                </Link>
                <Link href="/customer-management" passHref>
                    <Button variant="outline" className="w-full h-28 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-all hover:bg-muted/50 hover:border-primary/50">
                        <Handshake className="h-8 w-8 text-primary" />
                        <span>{t('clients')}</span>
                    </Button>
                </Link>
                <Link href="/hr" passHref>
                    <Button variant="outline" className="w-full h-28 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-all hover:bg-muted/50 hover:border-primary/50">
                        <Users className="h-8 w-8 text-primary" />
                        <span>{t('hr')}</span>
                    </Button>
                </Link>
                <Link href="/business-intelligence" passHref>
                    <Button variant="outline" className="w-full h-28 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-all hover:bg-muted/50 hover:border-primary/50">
                        <TrendingUp className="h-8 w-8 text-primary" />
                        <span>{t('bi')}</span>
                    </Button>
                </Link>
                <Link href="/process-automation" passHref>
                    <Button variant="outline" className="w-full h-28 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-all hover:bg-muted/50 hover:border-primary/50">
                        <Bot className="h-8 w-8 text-primary" />
                        <span>{t('automation')}</span>
                    </Button>
                </Link>
                <Link href="/financial-analysis" passHref>
                    <Button variant="outline" className="w-full h-28 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-all hover:bg-muted/50 hover:border-primary/50">
                        <Banknote className="h-8 w-8 text-primary" />
                        <span>{t('finance')}</span>
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}
