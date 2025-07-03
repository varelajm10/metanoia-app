"use client"

import * as React from "react"
import { Activity, ArrowUpRight, CreditCard, DollarSign, Users } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function GeneralDashboardClient() {
    const [chartData, setChartData] = React.useState<any[]>([]);

    React.useEffect(() => {
        const data = [
          { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
          { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
          { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
          { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
          { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
          { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
        ];
        setChartData(data);
    }, []);

    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% del último mes</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Suscripciones</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">+180.1% del último mes</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ventas</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">+19% del último mes</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Activos Ahora</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">+201 desde la última hora</p>
              </CardContent>
            </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2 bg-white/5 border-white/10 backdrop-blur-lg">
              <CardHeader>
                <CardTitle>Resumen de Ingresos</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
              <CardHeader>
                <CardTitle>Transacciones Recientes</CardTitle>
                <CardDescription>Últimas 5 transacciones de tu tienda.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead className="text-right">Monto</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell><div className="font-medium">Liam Johnson</div></TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><div className="font-medium">Olivia Smith</div></TableCell>
                      <TableCell className="text-right">$150.00</TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell><div className="font-medium">Noah Williams</div></TableCell>
                      <TableCell className="text-right">$59.00</TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell><div className="font-medium">Emma Brown</div></TableCell>
                      <TableCell className="text-right">$450.00</TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell><div className="font-medium">James White</div></TableCell>
                      <TableCell className="text-right">$300.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
        </div>
      </div>
    )
}
