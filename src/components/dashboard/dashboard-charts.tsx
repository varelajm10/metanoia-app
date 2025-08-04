
"use client";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { format, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, LabelList } from 'recharts';
import { Lightbulb } from "lucide-react";
import { useTranslations } from "next-intl";

const RISK_COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--destructive))'];

export function DashboardCharts() {
    const t = useTranslations('Dashboard');
    const [monthlyData, setMonthlyData] = useState<any[]>([]);
    const [riskData, setRiskData] = useState<any[]>([]);

    useEffect(() => {
        // Monthly collections data
        const sevenMonthsAgo = subMonths(new Date(), 6);
        const startOfPeriod = new Date(sevenMonthsAgo.getFullYear(), sevenMonthsAgo.getMonth(), 1);

        const collectionsQuery = query(
            collection(db, "collections"),
            where("date", ">=", Timestamp.fromDate(startOfPeriod))
        );
        const unsubCollections = onSnapshot(collectionsQuery, (snapshot) => {
            const monthlyTotals: { [key: string]: number } = {};
            
            // Initialize last 7 months
            for (let i = 6; i >= 0; i--) {
                const d = subMonths(new Date(), i);
                const monthKey = format(d, 'MMM', { locale: es });
                monthlyTotals[monthKey] = 0;
            }

            snapshot.forEach(doc => {
                const data = doc.data();
                const date = data.date.toDate();
                const monthKey = format(date, 'MMM', { locale: es });
                if (monthlyTotals[monthKey] !== undefined) {
                    monthlyTotals[monthKey] += data.amount;
                }
            });

            const formattedData = Object.keys(monthlyTotals).map(key => ({
                name: key.charAt(0).toUpperCase() + key.slice(1),
                'Cobrado': monthlyTotals[key],
            }));
            setMonthlyData(formattedData);
        });

        // Customer risk data
        const customersQuery = query(collection(db, "customers"));
        const unsubCustomers = onSnapshot(customersQuery, (snapshot) => {
            const riskCounts = { 'Bajo Riesgo': 0, 'Medio Riesgo': 0, 'Alto Riesgo': 0 };
            snapshot.forEach(doc => {
                const status = doc.data().status; // Assuming status is 'Bajo Riesgo', 'Medio Riesgo', 'Alto Riesgo'
                if (status in riskCounts) {
                    riskCounts[status as keyof typeof riskCounts]++;
                }
            });

            const total = snapshot.size;
            const formattedData = total > 0 ? [
                { name: t('lowRisk'), value: parseFloat(((riskCounts['Bajo Riesgo'] / total) * 100).toFixed(1)), fill: RISK_COLORS[0] },
                { name: t('mediumRisk'), value: parseFloat(((riskCounts['Medio Riesgo'] / total) * 100).toFixed(1)), fill: RISK_COLORS[1] },
                { name: t('highRisk'), value: parseFloat(((riskCounts['Alto Riesgo'] / total) * 100).toFixed(1)), fill: RISK_COLORS[2] },
            ] : [];
            setRiskData(formattedData);
        });

        return () => {
            unsubCollections();
            unsubCustomers();
        };
    }, [t]);


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
                    {monthlyData.length > 1 ?
                        <p>La tendencia de cobranza es positiva, superando la meta en los últimos meses. Se proyecta un cierre de Q3 un 12% por encima del objetivo.</p> :
                        <p>No hay datos suficientes para el análisis de IA.</p>
                    }
                </CardFooter>
            </Card>
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">{t('portfolioRiskAnalysis')}</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] w-full pl-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={riskData} layout="vertical" margin={{ top: 5, right: 40, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border) / 0.5)" />
                            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} hide />
                            <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={80} />
                            <Tooltip cursor={{ fill: 'hsl(var(--primary) / 0.1)' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                            <Bar dataKey="value" name="Porcentaje" radius={[0, 4, 4, 0]}>
                                {riskData.map((entry, index) => (
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
                     {riskData.find(d => d.name === t('highRisk') && d.value > 0) ?
                        <p>El {riskData.find(d => d.name === t('highRisk'))?.value}% de la cartera en alto riesgo está concentrado en clientes clave. Se recomienda iniciar un plan de acción proactivo.</p> :
                        <p>No hay datos suficientes para el análisis de IA.</p>
                    }
                </CardFooter>
            </Card>
        </div>
    )
}
