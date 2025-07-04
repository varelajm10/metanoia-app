
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { Users, RefreshCw, UserPlus, Cake } from "lucide-react";
import { AIChatBox } from "@/components/ai-chat-box";

const newHires = [
    { name: 'Laura García', position: 'AI Engineer', department: 'Tecnología', date: '2024-07-01' },
    { name: 'Marcos Rodriguez', position: 'Sales Executive', department: 'Ventas', date: '2024-07-01' },
    { name: 'Sofía Martinez', position: 'UX/UI Designer', department: 'Producto', date: '2024-06-25' },
];

const departmentData = [
    { name: 'Tecnología', count: 45 },
    { name: 'Ventas', count: 32 },
    { name: 'Producto', count: 28 },
    { name: 'Marketing', count: 22 },
    { name: 'Operaciones', count: 18 },
    { name: 'RRHH', count: 7 },
];

export default function HRDashboardClient() {
  return (
    <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Headcount Total</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">152</div>
                    <p className="text-xs text-muted-foreground">+2 vs. mes anterior</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tasa de Rotación (YTD)</CardTitle>
                    <RefreshCw className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">5.8%</div>
                    <p className="text-xs text-muted-foreground">Objetivo anual: &lt;10%</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Contrataciones (Mes)</CardTitle>
                    <UserPlus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+3</div>
                    <p className="text-xs text-muted-foreground">2 en Tecnología, 1 en Ventas</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Próximos Aniversarios</CardTitle>
                    <Cake className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">Esta semana</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Nuevos Ingresos</CardTitle>
                    <CardDescription>¡Demos la bienvenida a los nuevos miembros del equipo!</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Cargo</TableHead>
                                <TableHead>Departamento</TableHead>
                                <TableHead>Fecha de Ingreso</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {newHires.map(hire => (
                                <TableRow key={hire.name}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage data-ai-hint="person" src={`https://placehold.co/40x40.png`} />
                                            <AvatarFallback>{hire.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        {hire.name}
                                    </TableCell>
                                    <TableCell>{hire.position}</TableCell>
                                    <TableCell>{hire.department}</TableCell>
                                    <TableCell>{hire.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Distribución por Departamento</CardTitle>
                    <CardDescription>Headcount por área funcional.</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={departmentData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} angle={-45} textAnchor="end" height={50} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{ fill: 'hsl(var(--primary) / 0.1)' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}/>
                            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
        <AIChatBox />
    </div>
  );
}
