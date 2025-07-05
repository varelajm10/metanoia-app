
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Bot, Workflow, ArrowUpCircle, AlertTriangle } from "lucide-react";
import { AIChatBox } from "@/components/ai-chat-box";
import { useTranslations } from "next-intl";

const recentExecutions = [
    { id: 'EXEC-987', workflow: 'Onboarding de Cliente', status: 'Completed', start: '2024-07-04 10:05', duration: '3m 15s' },
    { id: 'EXEC-986', workflow: 'Reporte Financiero Mensual', status: 'Completed', start: '2024-07-04 09:00', duration: '12m 45s' },
    { id: 'EXEC-985', workflow: 'Conciliación Bancaria', status: 'Failed', start: '2024-07-03 18:30', duration: '1m 22s' },
    { id: 'EXEC-984', workflow: 'Onboarding de Cliente', status: 'Completed', start: '2024-07-03 15:20', duration: '3m 28s' },
];

const efficiencyData = [
    { name: 'Manual', time: 120 },
    { name: 'Automated', time: 15 },
];

export default function ProcessAutomationDashboardClient() {
  const t = useTranslations("ProcessAutomation");

  const statusVariant = {
      'Completed': 'default',
      'In Progress': 'secondary',
      'Failed': 'destructive',
  } as const;
  
  const getStatusTranslation = (status: 'Completed' | 'Failed') => t(`status${status}`);
  const getEfficiencyTranslation = (name: 'Manual' | 'Automated') => t(name.toLowerCase() as 'manual' | 'automated');
  const localizedEfficiencyData = efficiencyData.map(d => ({...d, name: getEfficiencyTranslation(d.name as 'Manual' | 'Automated')}));

  return (
    <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('activeWorkflows')}</CardTitle>
                    <Workflow className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">27</div>
                    <p className="text-xs text-muted-foreground">+2 {t('newThisMonth')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('automatedTasks24h')}</CardTitle>
                    <Bot className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,482</div>
                    <p className="text-xs text-muted-foreground">99.8% {t('successRate')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('hoursSavedMonth')}</CardTitle>
                    <ArrowUpCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">215</div>
                    <p className="text-xs text-muted-foreground">{t('estimatedAutomationROI')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('failedExecutions24h')}</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-destructive">3</div>
                    <p className="text-xs text-muted-foreground">{t('requireReview')}</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>{t('executionHistory')}</CardTitle>
                    <CardDescription>{t('executionHistorySubtitle')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('tableId')}</TableHead>
                                <TableHead>{t('tableWorkflow')}</TableHead>
                                <TableHead>{t('tableStatus')}</TableHead>
                                <TableHead>{t('tableStart')}</TableHead>
                                <TableHead>{t('tableDuration')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentExecutions.map(exec => (
                                <TableRow key={exec.id}>
                                    <TableCell className="font-mono text-xs">{exec.id}</TableCell>
                                    <TableCell className="font-medium">{exec.workflow}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariant[exec.status as keyof typeof statusVariant] || 'default'}>
                                            {getStatusTranslation(exec.status as keyof typeof statusVariant)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{exec.start}</TableCell>
                                    <TableCell>{exec.duration}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>{t('processEfficiencyExample')}</CardTitle>
                    <CardDescription>{t('processEfficiencySubtitle')}</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={localizedEfficiencyData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} label={{ value: t('minutes'), angle: -90, position: 'insideLeft' }} />
                            <Tooltip cursor={{ fill: 'hsl(var(--primary) / 0.1)' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}/>
                            <Bar dataKey="time" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
        <AIChatBox />
    </div>
  );
}
