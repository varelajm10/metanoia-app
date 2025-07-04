
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Ticket, Clock, Smile, Phone, Mail, MessageSquare } from "lucide-react";
import { AIChatBox } from "@/components/ai-chat-box";

const recentTickets = [
    { id: 'TKT-721', subject: 'Problema de facturación', client: 'Tech Solutions Inc.', priority: 'Alta', status: 'Abierto' },
    { id: 'TKT-720', subject: 'Consulta sobre producto X', client: 'Innovate Corp.', priority: 'Media', status: 'En Progreso' },
    { id: 'TKT-719', subject: 'No puedo acceder a mi cuenta', client: 'Global Enterprises', priority: 'Alta', status: 'Abierto' },
    { id: 'TKT-718', subject: 'Feedback sobre nueva feature', client: 'Future Systems Ltd.', priority: 'Baja', status: 'Resuelto' },
];

const channelData = [
    { name: 'Email', value: 45, icon: Mail },
    { name: 'Teléfono', value: 25, icon: Phone },
    { name: 'Chat', value: 30, icon: MessageSquare },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--secondary))'];

const priorityVariant = {
    'Alta': 'destructive',
    'Media': 'secondary',
    'Baja': 'outline',
} as const;

export default function CustomerServiceDashboardClient() {
  return (
    <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tickets Abiertos</CardTitle>
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">128</div>
                    <p className="text-xs text-muted-foreground">+10 en las últimas 24h</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">T. de Respuesta Promedio</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1h 15m</div>
                    <p className="text-xs text-muted-foreground">Dentro del SLA de 2h</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Satisfacción (CSAT)</CardTitle>
                    <Smile className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">92%</div>
                    <p className="text-xs text-muted-foreground">+1.2% vs. la semana pasada</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tasa de Resolución</CardTitle>
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">85%</div>
                    <p className="text-xs text-muted-foreground">Resolución en primer contacto</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Tickets Recientes</CardTitle>
                    <CardDescription>Vista de la actividad del centro de ayuda.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Asunto</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Prioridad</TableHead>
                                <TableHead>Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentTickets.map(ticket => (
                                <TableRow key={ticket.id}>
                                    <TableCell className="font-mono text-xs">{ticket.id}</TableCell>
                                    <TableCell className="font-medium">{ticket.subject}</TableCell>
                                    <TableCell>{ticket.client}</TableCell>
                                    <TableCell>
                                        <Badge variant={priorityVariant[ticket.priority as keyof typeof priorityVariant] || 'default'}>
                                            {ticket.priority}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{ticket.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Distribución por Canal</CardTitle>
                    <CardDescription>Origen de los tickets de soporte.</CardDescription>
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
        <AIChatBox />
    </div>
  );
}
