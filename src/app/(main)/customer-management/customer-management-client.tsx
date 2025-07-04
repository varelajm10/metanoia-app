
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Heart } from 'lucide-react';

const recentCustomers = [
    { name: 'Tech Solutions Inc.', status: 'Activo', lastContact: '2024-05-20', value: '$50,000' },
    { name: 'Innovate Corp.', status: 'Nuevo', lastContact: '2024-05-22', value: '$75,000' },
    { name: 'Global Enterprises', status: 'En Riesgo', lastContact: '2024-04-15', value: '$120,000' },
    { name: 'Future Systems Ltd.', status: 'Activo', lastContact: '2024-05-18', value: '$30,000' },
];

const statusVariant = {
    'Activo': 'default',
    'Nuevo': 'secondary',
    'En Riesgo': 'destructive',
} as const;

export default function CustomerManagementClient() {
  return (
    <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Clientes Totales</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,254</div>
                    <p className="text-xs text-muted-foreground">+20 desde el mes pasado</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tasa de Retención</CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">95.2%</div>
                    <p className="text-xs text-muted-foreground">Objetivo: 95%</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Valor de Vida (LTV)</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$8,430</div>
                    <p className="text-xs text-muted-foreground">Promedio por cliente</p>
                </CardContent>
            </Card>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Clientes Recientes</CardTitle>
                <CardDescription>Vista rápida de la actividad reciente de clientes.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre del Cliente</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Último Contacto</TableHead>
                            <TableHead>Valor</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentCustomers.map(customer => (
                             <TableRow key={customer.name}>
                                <TableCell className="font-medium">{customer.name}</TableCell>
                                <TableCell>
                                    <Badge variant={statusVariant[customer.status as keyof typeof statusVariant] || 'default'}>
                                        {customer.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{customer.lastContact}</TableCell>
                                <TableCell>{customer.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
