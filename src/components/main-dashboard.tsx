
"use client";
import * as React from "react";
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Users, TrendingUp, Target, Briefcase, Handshake, Bot, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

const monthlyData = [
  { name: 'Ene', Cobrado: 85000 },
  { name: 'Feb', Cobrado: 95000 },
  { name: 'Mar', Cobrado: 110000 },
  { name: 'Abr', Cobrado: 105000 },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--destructive))'];

export default function MainDashboard() {
  const t = useTranslations('Dashboard');
  const creditAnalysisData = [
      { name: t('lowRisk'), value: 75 },
      { name: t('mediumRisk'), value: 20 },
      { name: t('highRisk'), value: 5 },
  ];
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('collections')}</CardTitle>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('monthlyGoalProgress')}</CardTitle>
            <Target className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">91.7%</div>
            <p className="text-xs text-muted-foreground">$110k {t('from')} $120k</p>
          </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{t('totalEmployees')}</CardTitle>
                <Users className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">152</div>
                <p className="text-xs text-green-500">+2 {t('newHires')}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{t('customersAtRisk')}</CardTitle>
                <ShieldCheck className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-destructive">15</div>
                <p className="text-xs text-muted-foreground">{t('requireAttention')}</p>
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
              <BarChart data={monthlyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${Number(value)/1000}k`} />
                <Tooltip cursor={{ fill: 'hsl(var(--primary) / 0.1)' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}/>
                <Bar dataKey="Cobrado" name={t('collected')} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
           <CardHeader>
            <CardTitle className="text-lg font-semibold">{t('portfolioRiskAnalysis')}</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] w-full flex flex-col items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={creditAnalysisData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="hsl(var(--primary))" dataKey="value" stroke="hsl(var(--card))" strokeWidth={2}>
                        {creditAnalysisData.map((entry, index) => (
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
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{t('quickAccess')}</CardTitle>
          <CardDescription>{t('quickAccessSubtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Link href="/credit-management" passHref>
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-all hover:bg-muted/50 hover:border-primary/50">
                <DollarSign className="h-6 w-6 text-primary"/>
                <span>{t('credits')}</span>
              </Button>
            </Link>
             <Link href="/customer-management" passHref>
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-all hover:bg-muted/50 hover:border-primary/50">
                <Handshake className="h-6 w-6 text-primary"/>
                <span>{t('clients')}</span>
              </Button>
            </Link>
             <Link href="/hr" passHref>
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-all hover:bg-muted/50 hover:border-primary/50">
                <Users className="h-6 w-6 text-primary"/>
                <span>{t('hr')}</span>
              </Button>
            </Link>
            <Link href="/business-intelligence" passHref>
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-all hover:bg-muted/50 hover:border-primary/50">
                <TrendingUp className="h-6 w-6 text-primary"/>
                <span>{t('bi')}</span>
              </Button>
            </Link>
            <Link href="/process-automation" passHref>
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-all hover:bg-muted/50 hover:border-primary/50">
                <Bot className="h-6 w-6 text-primary"/>
                <span>{t('automation')}</span>
              </Button>
            </Link>
             <Link href="/financial-analysis" passHref>
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-all hover:bg-muted/50 hover:border-primary/50">
                <Briefcase className="h-6 w-6 text-primary"/>
                <span>{t('finance')}</span>
              </Button>
            </Link>
        </CardContent>
      </Card>
    </div>
  );
}
