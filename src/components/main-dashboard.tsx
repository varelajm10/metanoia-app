
"use client";
import * as React from "react";
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, LabelList } from 'recharts';
import { DollarSign, Users, TrendingUp, Target, Briefcase, Handshake, Bot, ShieldCheck, Banknote, TrendingDown, Lightbulb } from "lucide-react";
import { useTranslations } from "next-intl";

const monthlyData = [
  { name: 'Ene', Cobrado: 85000 },
  { name: 'Feb', Cobrado: 95000 },
  { name: 'Mar', Cobrado: 110000 },
  { name: 'Abr', Cobrado: 105000 },
];

const RISK_COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--destructive))'];

export default function MainDashboard() {
  const t = useTranslations('Dashboard');
  const creditAnalysisData = [
      { name: t('lowRisk'), value: 75, fill: RISK_COLORS[0] },
      { name: t('mediumRisk'), value: 20, fill: RISK_COLORS[1] },
      { name: t('highRisk'), value: 5, fill: RISK_COLORS[2] },
  ];
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-normal text-muted-foreground">{t('collections')}</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$110,000</div>
            <p className="text-xs text-green-500 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1"/> +5.2% {t('vsLastMonth')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-normal text-muted-foreground">{t('monthlyGoalProgress')}</CardTitle>
            <Target className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">91.7%</div>
            <p className="text-xs text-muted-foreground">$110k {t('from')} $120k</p>
          </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-normal text-muted-foreground">{t('totalEmployees')}</CardTitle>
                <Briefcase className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">152</div>
                <p className="text-xs text-green-500 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1"/>+2 {t('newHires')}
                </p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-normal text-muted-foreground">{t('customersAtRisk')}</CardTitle>
                <ShieldCheck className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-destructive">15</div>
                <p className="text-xs text-green-500 flex items-center">
                    <TrendingDown className="h-4 w-4 mr-1"/>-3 {t('vsLastMonth')}
                </p>
            </CardContent>
        </Card>
      </div>

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
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${Number(value)/1000}k`} />
                <Tooltip cursor={{ fill: 'hsl(var(--primary) / 0.1)' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}/>
                <ReferenceLine y={120000} label={{ value: "Meta", position: "insideTopRight", fill: "hsl(var(--muted-foreground))", fontSize: 12 }} stroke="hsl(var(--accent))" strokeDasharray="3 3" />
                <Bar dataKey="Cobrado" name={t('collected')} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm text-muted-foreground border-t pt-4">
              <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-accent"/>
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
                    <Tooltip cursor={{ fill: 'hsl(var(--primary) / 0.1)' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}/>
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
                  <Lightbulb className="h-4 w-4 text-accent"/>
                  <span className="font-semibold text-foreground">{t('aiInsight')}</span>
              </div>
              <p>El 75% de la cartera es de bajo riesgo, pero el 5% de alto riesgo requiere acción inmediata.</p>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{t('quickAccess')}</CardTitle>
          <CardDescription>{t('quickAccessSubtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <Link href="/credit-management" passHref>
              <Button variant="outline" className="w-full h-28 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-all hover:bg-muted/50 hover:border-primary/50">
                <DollarSign className="h-8 w-8 text-primary"/>
                <span>{t('credits')}</span>
              </Button>
            </Link>
             <Link href="/customer-management" passHref>
              <Button variant="outline" className="w-full h-28 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-all hover:bg-muted/50 hover:border-primary/50">
                <Handshake className="h-8 w-8 text-primary"/>
                <span>{t('clients')}</span>
              </Button>
            </Link>
             <Link href="/hr" passHref>
              <Button variant="outline" className="w-full h-28 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-all hover:bg-muted/50 hover:border-primary/50">
                <Users className="h-8 w-8 text-primary"/>
                <span>{t('hr')}</span>
              </Button>
            </Link>
            <Link href="/business-intelligence" passHref>
              <Button variant="outline" className="w-full h-28 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-all hover:bg-muted/50 hover:border-primary/50">
                <TrendingUp className="h-8 w-8 text-primary"/>
                <span>{t('bi')}</span>
              </Button>
            </Link>
            <Link href="/process-automation" passHref>
              <Button variant="outline" className="w-full h-28 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-all hover:bg-muted/50 hover:border-primary/50">
                <Bot className="h-8 w-8 text-primary"/>
                <span>{t('automation')}</span>
              </Button>
            </Link>
             <Link href="/financial-analysis" passHref>
              <Button variant="outline" className="w-full h-28 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-all hover:bg-muted/50 hover:border-primary/50">
                <Banknote className="h-8 w-8 text-primary"/>
                <span>{t('finance')}</span>
              </Button>
            </Link>
        </CardContent>
      </Card>
    </div>
  );
}
