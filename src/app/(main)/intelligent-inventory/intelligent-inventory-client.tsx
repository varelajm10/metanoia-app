
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Warehouse, PackageSearch, Clock, AlertTriangle } from "lucide-react";
import { AIChatBox } from "@/components/ai-chat-box";

const lowStockItems = [
    { id: 'PROD-012', name: 'Componente A-X1', category: 'Electrónica', stock: 15, reorderPoint: 20 },
    { id: 'PROD-088', name: 'Materia Prima B-Y2', category: 'Materias Primas', stock: 50, reorderPoint: 75 },
    { id: 'PROD-105', name: 'Producto Terminado C-Z3', category: 'Venta Directa', stock: 5, reorderPoint: 10 },
    { id: 'PROD-045', name: 'Insumo D-W4', category: 'Consumibles', stock: 120, reorderPoint: 150 },
];

const inventoryByCategory = [
    { name: 'Electrónica', value: 250000 },
    { name: 'Materias Primas', value: 450000 },
    { name: 'Venta Directa', value: 150000 },
    { name: 'Consumibles', value: 50000 },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--secondary))', 'hsl(220, 13%, 63%)'];

export default function IntelligentInventoryClient() {
  return (
    <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Valor del Inventario</CardTitle>
                    <Warehouse className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$900,000</div>
                    <p className="text-xs text-muted-foreground">+2.1% vs. el mes pasado</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tasa de Rotación</CardTitle>
                    <PackageSearch className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">6.2</div>
                    <p className="text-xs text-muted-foreground">Ratio anual</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Días de Inventario</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">58</div>
                    <p className="text-xs text-muted-foreground">Promedio para agotar stock</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Alertas de Stock Bajo</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-destructive">4</div>
                    <p className="text-xs text-muted-foreground">Productos bajo punto de reorden</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Productos con Stock Bajo</CardTitle>
                    <CardDescription>Estos productos necesitan atención para evitar quiebres de stock.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID Producto</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Categoría</TableHead>
                                <TableHead>Stock Actual</TableHead>
                                <TableHead>Punto de Reorden</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {lowStockItems.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-mono text-xs">{item.id}</TableCell>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
                                    <TableCell className="font-bold text-destructive">{item.stock}</TableCell>
                                    <TableCell>{item.reorderPoint}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Valor por Categoría</CardTitle>
                    <CardDescription>Distribución del valor del inventario.</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px] w-full flex flex-col items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={inventoryByCategory} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="hsl(var(--primary))" dataKey="value" stroke="hsl(var(--card))" strokeWidth={2}>
                                {inventoryByCategory.map((entry, index) => (
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
