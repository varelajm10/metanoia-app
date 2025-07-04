
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingDown, Target, ShieldCheck } from "lucide-react";
import { AIChatBox } from "@/components/ai-chat-box";

const recentRequests = [
    { id: 'SOL-001', client: 'Tech Solutions Inc.', amount: '$15,000', status: 'Aprobado', date: '2024-07-03' },
    { id: 'SOL-002', client: 'Innovate Corp.', amount: '$25,000', status: 'En Revisión', date: '2024-07-02' },
    { id: 'SOL-003', client: 'Global Enterprises', amount: '$5,000', status: 'Rechazado', date: '2024-07-01' },
    { id: 'SOL-004', client: 'Future Systems Ltd.', amount: '$50,000', status: 'Aprobado', date: '2024-06-30' },
];

const paymentPipeline = [
    { name: 'Próximos 7 días', amount: 45000 },
    { name: '8-15 días', amount: 78000 },
    { name: '16-30 días', amount: 120000 },
    { name: '30+ días', amount: 55000 },
];

const statusVariant = {
    'Aprobado': 'default',
    'En Revisión': 'secondary',
    'Rechazado': 'destructive',
} as const;


export default function CreditManagementDashboardClient() {
  return (
    <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Cartera Activa</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$1.2M</div>
                    <p className="text-xs text-muted-foreground">+5% vs. el mes pasado</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Índice de Mora</CardTitle>
                    <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">3.4%</div>
                    <p className="text-xs text-muted-foreground">-0.2% vs. el mes pasado</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Recupero del Mes</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$115,000</div>
                    <p className="text-xs text-muted-foreground">95.8% de la meta</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Alertas de Riesgo</CardTitle>
                    <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-destructive">8</div>
                    <p className="text-xs text-muted-foreground">Carteras con alta probabilidad de default</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Solicitudes de Crédito Recientes</CardTitle>
                    <CardDescription>Últimas solicitudes procesadas por el sistema.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Monto</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Fecha</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentRequests.map(req => (
                                <TableRow key={req.id}>
                                    <TableCell className="font-mono text-xs">{req.id}</TableCell>
                                    <TableCell className="font-medium">{req.client}</TableCell>
                                    <TableCell>{req.amount}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariant[req.status as keyof typeof statusVariant] || 'default'}>
                                            {req.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{req.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Pipeline de Pagos</CardTitle>
                    <CardDescription>Cobranza esperada en los próximos períodos.</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={paymentPipeline} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
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
        <AIChatBox />
    </div>
  );
}
