"use client";
import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingDown, Target, ShieldCheck } from "lucide-react";
import { AIChatBox } from "@/components/ai-chat-box";
import { useTranslations } from "next-intl";

const recentRequests: any[] = [];
const paymentPipeline: any[] = [];

export default function CreditManagementDashboardClient() {
  const t = useTranslations("CreditManagement");
  const tCommon = useTranslations("Common");

  const statusVariant = {
      'Aprobado': 'default',
      'En Revisión': 'secondary',
      'Rechazado': 'destructive',
  } as const;

  const getStatusTranslation = (status: string) => {
    let key: 'statusApproved' | 'statusInReview' | 'statusRejected';
    switch (status) {
        case 'Aprobado':
            key = 'statusApproved';
            break;
        case 'En Revisión':
        case 'En Revision': // Handle variations
            key = 'statusInReview';
            break;
        case 'Rechazado':
            key = 'statusRejected';
            break;
        default:
            key = 'statusInReview'; 
    }
    return t(key);
  }

  const getPipelineTranslation = React.useCallback((name: string) => {
    const keyMap: { [key: string]: 'next7days' | 'days8_15' | 'days16_30' | 'days30plus' } = {
      'Próximos 7 días': 'next7days',
      '8-15 días': 'days8_15',
      '16-30 días': 'days16_30',
      '30+ días': 'days30plus',
    };
    return t(keyMap[name]);
  }, [t]);

  const localizedPaymentPipeline = React.useMemo(() => paymentPipeline.map(p => ({
    ...p,
    name: getPipelineTranslation(p.name),
  })), [getPipelineTranslation]);

  return (
    <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('activePortfolio')}</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$0</div>
                    <p className="text-xs text-muted-foreground">+0% {t('vsLastMonth')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('delinquencyRate')}</CardTitle>
                    <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">0%</div>
                    <p className="text-xs text-muted-foreground">-0% {t('vsLastMonth')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('monthlyRecovery')}</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$0</div>
                    <p className="text-xs text-muted-foreground">0% {t('ofGoal')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('riskAlerts')}</CardTitle>
                    <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-destructive">0</div>
                    <p className="text-xs text-muted-foreground">{t('highDefaultProbability')}</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>{t('recentCreditRequests')}</CardTitle>
                    <CardDescription>{t('recentCreditRequestsSubtitle')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('tableId')}</TableHead>
                                <TableHead>{t('tableClient')}</TableHead>
                                <TableHead>{t('tableAmount')}</TableHead>
                                <TableHead>{t('tableStatus')}</TableHead>
                                <TableHead>{t('tableDate')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentRequests.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">No hay solicitudes recientes.</TableCell>
                                </TableRow>
                            ) : (
                                recentRequests.map(req => (
                                <TableRow key={req.id} className="hover:bg-muted">
                                    <TableCell className="font-mono text-xs">{req.id}</TableCell>
                                    <TableCell className="font-medium">{req.client}</TableCell>
                                    <TableCell>{req.amount}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariant[req.status as keyof typeof statusVariant] || 'default'}>
                                            {getStatusTranslation(req.status)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{req.date}</TableCell>
                                </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>{t('paymentPipeline')}</CardTitle>
                    <CardDescription>{t('paymentPipelineSubtitle')}</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={localizedPaymentPipeline} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border) / 0.5)" />
                            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${Number(value)/1000}k`} />
                            <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={80} />
                            <Tooltip cursor={{ fill: 'hsl(var(--primary) / 0.1)' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}/>
                            <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
        <AIChatBox dashboardContext={t('title')} />
    </div>
  );
}
