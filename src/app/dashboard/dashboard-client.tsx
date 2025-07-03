"use client"

import * as React from "react"
import { Activity, ArrowUpRight, CreditCard, DollarSign, Users } from "lucide-react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function DashboardClient() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [chartData, setChartData] = React.useState<any[]>([]);

    React.useEffect(() => {
        const data = [
          { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
          { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
          { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
          { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
          { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
          { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
          { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
          { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
          { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
          { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
          { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
          { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 },
        ];
        setChartData(data);
    }, []);

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Ingresos Totales
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% del último mes
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Suscripciones
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% del último mes
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ventas</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% del último mes
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Activos Ahora</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 desde la última hora
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2 bg-white/5 border-white/10 backdrop-blur-lg">
              <CardHeader>
                <CardTitle>Resumen de Ingresos</CardTitle>
                <CardDescription>
                    Enero - Diciembre 2024
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={chartData}>
                        <XAxis
                        dataKey="name"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        />
                        <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                        />
                        <Bar
                        dataKey="total"
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <div className="grid gap-4">
                <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
                    <CardHeader>
                        <CardTitle>Progreso Trimestral</CardTitle>
                        <CardDescription>
                            Has alcanzado el 75% de tu meta.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Progress value={75} aria-label="75% de la meta" />
                    </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Calendario</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex justify-center">
                         <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md"
                            classNames={{
                                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                                day_today: "bg-accent text-accent-foreground",
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
          </div>
           <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Transacciones Recientes</CardTitle>
                  <CardDescription>
                    Últimas transacciones de tu tienda.
                  </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  <a href="#">
                    Ver Todo
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead className="hidden xl:table-column">
                        Tipo
                      </TableHead>
                      <TableHead className="hidden xl:table-column">
                        Estado
                      </TableHead>
                      <TableHead className="hidden xl:table-column">
                        Fecha
                      </TableHead>
                      <TableHead className="text-right">Monto</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Liam Johnson</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          liam@example.com
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        Venta
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        <Badge className="text-xs" variant="outline">
                          Aprobado
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                        2024-06-23
                      </TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Olivia Smith</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          olivia@example.com
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        Reembolso
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        <Badge className="text-xs" variant="outline">
                          Declinado
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                        2024-06-24
                      </TableCell>
                      <TableCell className="text-right">$150.00</TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell>
                        <div className="font-medium">Noah Williams</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          noah@example.com
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        Suscripción
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        <Badge className="text-xs" variant="outline">
                          Aprobado
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                        2024-06-25
                      </TableCell>
                      <TableCell className="text-right">$59.00</TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell>
                        <div className="font-medium">Emma Brown</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          emma@example.com
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        Venta
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        <Badge className="text-xs" variant="outline">
                          Aprobado
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                        2024-06-26
                      </TableCell>
                      <TableCell className="text-right">$450.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
        </main>
    )
}
