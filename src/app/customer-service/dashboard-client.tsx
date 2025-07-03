"use client"
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket, Clock, Smile, AlertCircle } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"

const sentimentData = [
  { name: 'Lunes', positive: 40, negative: 10 },
  { name: 'Martes', positive: 30, negative: 5 },
  { name: 'Miércoles', positive: 50, negative: 15 },
  { name: 'Jueves', positive: 45, negative: 8 },
  { name: 'Viernes', positive: 60, negative: 12 },
];

export default function CustomerServiceDashboardClient() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tickets Abiertos</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
            <p className="text-xs text-muted-foreground">+12 hoy</p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo de Respuesta</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1h 15m</div>
            <p className="text-xs text-muted-foreground text-green-400">-10m vs ayer</p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfacción (CSAT)</CardTitle>
            <Smile className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">+1.2% esta semana</p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tickets sin SLA</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">5</div>
            <p className="text-xs text-muted-foreground">Atención requerida</p>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
        <CardHeader>
          <CardTitle>Análisis de Sentimiento (Últimos 5 días)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sentimentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', color: '#fff' }}/>
              <Legend />
              <Line type="monotone" dataKey="positive" stroke="#22c55e" strokeWidth={2} name="Positivo" />
              <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} name="Negativo" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
