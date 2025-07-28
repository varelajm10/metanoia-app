
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, LabelList } from 'recharts';
import { Lightbulb } from "lucide-react";
import { useTranslations } from "next-intl";

const monthlyData = [
    { name: 'Ene', Cobrado: 85000 },
    { name: 'Feb', Cobrado: 95000 },
    { name: 'Mar', Cobrado: 110000 },
    { name: 'Abr', Cobrado: 105000 },
];

const RISK_COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--destructive))'];

export function DashboardCharts() {
    const t = useTranslations('Dashboard');

    const creditAnalysisData = [
        { name: t('lowRisk'), value: 75, fill: RISK_COLORS[0] },
        { name: t('mediumRisk'), value: 20, fill: RISK_COLORS[1] },
        { name: t('highRisk'), value: 5, fill: RISK_COLORS[2] },
    ];

    return (
        <div className="grid gap-6 lg:grid-cols-5">
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">{t('monthlyCollectionPerformance')}</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] w-full">
                    <ResponsiveContainer>
                        <BarChart data={monthlyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                            <Tooltip cursor={{ fill: 'hsl(var(--primary) / 0.1)' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                            <ReferenceLine y={120000} label={{ value: "Meta", position: "insideTopRight", fill: "hsl(var(--muted-foreground))", fontSize: 12 }} stroke="hsl(var(--accent))" strokeDasharray="3 3" />
                            <Bar dataKey="Cobrado" name={t('collected')} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm text-muted-foreground border-t pt-4">
                    <div className="flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-accent" />
                        <span className="font-semibold text-foreground">{t('aiInsight')}</span>
                    </div>
                    <p>El pico de cobranza en Marzo se correlaciona con el cierre exitoso de 2 proyectos clave del sector tecnológico.</p>
                </CardFooter>
            </Card>
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">{t('portfolioRiskAnalysis')}</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] w-full pl-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={creditAnalysisData} layout="vertical" margin={{ top: 5, right: 40, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border) / 0.5)" />
                            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} hide />
                            <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={80} />
                            <Tooltip cursor={{ fill: 'hsl(var(--primary) / 0.1)' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                            <Bar dataKey="value" name="Porcentaje" radius={[0, 4, 4, 0]}>
                                {creditAnalysisData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                                <LabelList dataKey="value" position="right" offset={10} className="fill-foreground font-medium" formatter={(value: number) => `${value}%`} />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm text-muted-foreground border-t pt-4">
                    <div className="flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-accent" />
                        <span className="font-semibold text-foreground">{t('aiInsight')}</span>
                    </div>
                    <p>El 75% de la cartera es de bajo riesgo, pero el 5% de alto riesgo requiere acción inmediata.</p>
                </CardFooter>
            </Card>
        </div>
    )
}
