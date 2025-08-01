"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Ticket, Clock, Smile, Phone, Mail, MessageSquare } from "lucide-react";
import { AIChatBox } from "@/components/ai-chat-box";
import { useTranslations } from "next-intl";

const recentTickets = [
  { id: 'TKT-7892', subject: 'Problema con la facturación', client: 'Innovate LLC', priority: 'Alta', status: 'Abierto' },
  { id: 'TKT-7891', subject: 'Consulta sobre API', client: 'Tech Solutions Inc.', priority: 'Media', status: 'En Progreso' },
  { id: 'TKT-7890', subject: 'No puedo acceder a mi cuenta', client: 'Global Exports', priority: 'Alta', status: 'Abierto' },
  { id: 'TKT-7889', subject: 'Reporte de bug en dashboard', client: 'Quantum Dynamics', priority: 'Baja', status: 'Resuelto' },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--secondary))'];

export default function CustomerServiceDashboardClient() {
  const t = useTranslations("CustomerService");

  const channelData = [
      { name: t('channelEmail'), value: 450, icon: Mail },
      { name: t('channelPhone'), value: 200, icon: Phone },
      { name: t('channelChat'), value: 350, icon: MessageSquare },
  ];

  const priorityVariant = {
      'Alta': 'destructive',
      'Media': 'secondary',
      'Baja': 'outline',
  } as const;

  const getPriorityTranslation = (priority: string) => {
    const keyMap: { [key: string]: 'priorityHigh' | 'priorityMedium' | 'priorityLow' } = {
        'Alta': 'priorityHigh',
        'Media': 'priorityMedium',
        'Baja': 'priorityLow',
    };
    return t(keyMap[priority]);
  }
  
  const getStatusTranslation = (status: string) => {
    const keyMap: { [key: string]: 'statusOpen' | 'statusInProgress' | 'statusResolved' } = {
        'Abierto': 'statusOpen',
        'En Progreso': 'statusInProgress',
        'Resuelto': 'statusResolved',
    };
    return t(keyMap[status]);
  }

  return (
    <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('openTickets')}</CardTitle>
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">125</div>
                    <p className="text-xs text-muted-foreground">+12 {t('last24h')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('avgResponseTime')}</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1h 32m</div>
                    <p className="text-xs text-muted-foreground">{t('withinSLA')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('satisfactionCSAT')}</CardTitle>
                    <Smile className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">92%</div>
                    <p className="text-xs text-muted-foreground">+1.2% {t('vsLastWeek')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('resolutionRate')}</CardTitle>
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">85%</div>
                    <p className="text-xs text-muted-foreground">{t('firstContactResolution')}</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>{t('recentTickets')}</CardTitle>
                    <CardDescription>{t('recentTicketsSubtitle')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('tableId')}</TableHead>
                                <TableHead>{t('tableSubject')}</TableHead>
                                <TableHead>{t('tableClient')}</TableHead>
                                <TableHead>{t('tablePriority')}</TableHead>
                                <TableHead>{t('tableStatus')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {recentTickets.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">No hay tickets recientes.</TableCell>
                                </TableRow>
                            ) : (
                                recentTickets.map(ticket => (
                                    <TableRow key={ticket.id} className="hover:bg-muted">
                                        <TableCell className="font-mono text-xs">{ticket.id}</TableCell>
                                        <TableCell className="font-medium">{ticket.subject}</TableCell>
                                        <TableCell>{ticket.client}</TableCell>
                                        <TableCell>
                                            <Badge variant={priorityVariant[ticket.priority as keyof typeof priorityVariant] || 'default'}>
                                                {getPriorityTranslation(ticket.priority)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{getStatusTranslation(ticket.status)}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>{t('channelDistribution')}</CardTitle>
                    <CardDescription>{t('channelDistributionSubtitle')}</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px] w-full flex flex-col items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={channelData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="hsl(var(--primary))" dataKey="value" stroke="hsl(var(--card))" strokeWidth={2}>
                                {channelData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}/>
                            <Legend iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
        <AIChatBox dashboardContext={t('title')} />
    </div>
  );
}
