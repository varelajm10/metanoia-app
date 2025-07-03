"use client"
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserX, BarChart, PieChart as PieChartIcon, Briefcase } from "lucide-react"
import { Bar, BarChart as RechartsBarChart, Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Cell } from "recharts"

const performanceData = [
    { name: 'Bajo', value: 12, fill: '#ef4444' },
    { name: 'Esperado', value: 65, fill: '#3b82f6' },
    { name: 'Sobresaliente', value: 23, fill: '#22c55e' },
];

const departmentData = [
  { name: 'Ventas', total: 40 },
  { name: 'Marketing', total: 25 },
  { name: 'Ingeniería', total: 50 },
  { name: 'Soporte', total: 30 },
  { name: 'RRHH', total: 10 },
];

export default function HRDashboardClient() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Empleados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">+5 este mes</p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Rotación (Anual)</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.2%</div>
            <p className="text-xs text-muted-foreground text-green-400">-1.5% vs año anterior</p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posiciones Abiertas</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 nuevas esta semana</p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfacción (eNPS)</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+45</div>
            <p className="text-xs text-muted-foreground">+3 puntos vs Q2</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Empleados por Departamento</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={departmentData}>
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.1)' }} contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', color: '#fff' }}/>
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Distribución de Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={performanceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {performanceData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', color: '#fff' }}/>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
