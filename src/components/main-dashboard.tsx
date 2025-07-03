"use client";
import * as React from "react";
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Users, TrendingUp, Target, Briefcase, Handshake, Bot, ShieldCheck } from "lucide-react";

const weeklyData = [
  { name: 'Lun', Cobrado: 4000, Meta: 5000 },
  { name: 'Mar', Cobrado: 3000, Meta: 5000 },
  { name: 'Mié', Cobrado: 5000, Meta: 5000 },
  { name: 'Jue', Cobrado: 4500, Meta: 5000 },
  { name: 'Vie', Cobrado: 6000, Meta: 5000 },
];

const monthlyData = [
  { name: 'Ene', Cobrado: 85000 },
  { name: 'Feb', Cobrado: 95000 },
  { name: 'Mar', Cobrado: 110000 },
  { name: 'Abr', Cobrado: 105000 },
];

const creditAnalysisData = [
    { name: 'Bajo Riesgo', value: 75 },
    { name: 'Medio Riesgo', value: 20 },
    { name: 'Alto Riesgo', value: 5 },
];
const COLORS = ['#28C76F', '#FFBB28', '#FF8042'];

export default function MainDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-text-primary">Dashboard General</h2>
          <p className="text-text-secondary">Una vista consolidada de las métricas clave de tu negocio.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-subtle">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">Cobranza del Mes</CardTitle>
            <DollarSign className="h-5 w-5 text-text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-text-primary">$110,000</div>
            <p className="text-xs text-green-500 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1"/> +5.2% vs mes anterior
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-subtle">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">Progreso Meta Mensual</CardTitle>
            <Target className="h-5 w-5 text-text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-text-primary">91.7%</div>
            <p className="text-xs text-text-secondary">$110k de $120k</p>
          </CardContent>
        </Card>
        <Card className="shadow-subtle">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-text-secondary">Total Empleados</CardTitle>
                <Users className="h-5 w-5 text-text-secondary" />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-text-primary">152</div>
                <p className="text-xs text-green-500">+2 nuevas contrataciones</p>
            </CardContent>
        </Card>
        <Card className="shadow-subtle">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-text-secondary">Clientes en Riesgo</CardTitle>
                <ShieldCheck className="h-5 w-5 text-text-secondary" />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-text-primary">15</div>
                <p className="text-xs text-text-secondary">Requieren atención</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-subtle">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-text-primary">Rendimiento Mensual de Cobranzas</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" stroke="#8A92A6" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#8A92A6" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip cursor={{ fill: 'rgba(74, 74, 255, 0.05)' }} contentStyle={{ backgroundColor: '#fff', border: '1px solid #EAECEF', borderRadius: '12px' }}/>
                <Bar dataKey="Cobrado" fill="#4A4AFF" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="shadow-subtle">
           <CardHeader>
            <CardTitle className="text-lg font-semibold text-text-primary">Análisis de Crédito</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] w-full flex flex-col items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={creditAnalysisData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                        {creditAnalysisData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #EAECEF', borderRadius: '12px' }}/>
                    <Legend iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-subtle">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-text-primary">Accesos Rápidos</CardTitle>
          <CardDescription className="text-text-secondary">Navega a los módulos principales de tu operación.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Link href="/credit-management" passHref>
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-shadow">
                <DollarSign className="h-6 w-6 text-primary"/>
                <span className="text-text-primary">Créditos</span>
              </Button>
            </Link>
             <Link href="/customer-service" passHref>
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-shadow">
                <Handshake className="h-6 w-6 text-primary"/>
                <span className="text-text-primary">Clientes</span>
              </Button>
            </Link>
             <Link href="/hr" passHref>
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-shadow">
                <Users className="h-6 w-6 text-primary"/>
                <span className="text-text-primary">RRHH</span>
              </Button>
            </Link>
            <Link href="/business-intelligence" passHref>
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-shadow">
                <TrendingUp className="h-6 w-6 text-primary"/>
                <span className="text-text-primary">BI</span>
              </Button>
            </Link>
            <Link href="/process-automation" passHref>
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-shadow">
                <Bot className="h-6 w-6 text-primary"/>
                <span className="text-text-primary">Automatización</span>
              </Button>
            </Link>
             <Link href="/financial-analysis" passHref>
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2 shadow-sm hover:shadow-medium transition-shadow">
                <Briefcase className="h-6 w-6 text-primary"/>
                <span className="text-text-primary">Finanzas</span>
              </Button>
            </Link>
        </CardContent>
      </Card>
    </div>
  );
}
