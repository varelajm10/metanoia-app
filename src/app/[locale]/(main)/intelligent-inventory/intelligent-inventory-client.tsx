"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Warehouse, PackageSearch, Clock, AlertTriangle } from "lucide-react";
import { AIChatBox } from "@/components/ai-chat-box";
import { useTranslations } from "next-intl";

const lowStockItems: any[] = [];
const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--secondary))', 'hsl(220, 13%, 63%)'];

export default function IntelligentInventoryClient() {
  const t = useTranslations("IntelligentInventory");
  
  const inventoryByCategory: any[] = [];

  return (
    <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('inventoryValue')}</CardTitle>
                    <Warehouse className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$0</div>
                    <p className="text-xs text-muted-foreground">+0% {t('vsLastMonth')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('turnoverRate')}</CardTitle>
                    <PackageSearch className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground">{t('annualRatio')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('daysOfInventory')}</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground">{t('avgToDeplete')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('lowStockAlerts')}</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-destructive">0</div>
                    <p className="text-xs text-muted-foreground">{t('belowReorderPoint')}</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>{t('lowStockProducts')}</CardTitle>
                    <CardDescription>{t('lowStockProductsSubtitle')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('tableProductId')}</TableHead>
                                <TableHead>{t('tableName')}</TableHead>
                                <TableHead>{t('tableCategory')}</TableHead>
                                <TableHead>{t('tableCurrentStock')}</TableHead>
                                <TableHead>{t('tableReorderPoint')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {lowStockItems.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">No hay productos con stock bajo.</TableCell>
                                </TableRow>
                            ) : (
                                lowStockItems.map(item => (
                                    <TableRow key={item.id} className="hover:bg-muted">
                                        <TableCell className="font-mono text-xs">{item.id}</TableCell>
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
                                        <TableCell className="font-bold text-destructive">{item.stock}</TableCell>
                                        <TableCell>{item.reorderPoint}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>{t('valueByCategory')}</CardTitle>
                    <CardDescription>{t('valueByCategorySubtitle')}</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px] w-full flex flex-col items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={inventoryByCategory} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="hsl(var(--primary))" dataKey="value" stroke="hsl(var(--card))" strokeWidth={2}>
                                {inventoryByCategory.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} formatter={(value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)} />
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
