"use client"
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Zap, Clock, Save, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function ProcessAutomationDashboardClient() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workflows Activos</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">Ejecutándose ahora</p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Ahorradas (Mes)</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124 hs</div>
            <p className="text-xs text-muted-foreground">+15% vs mes anterior</p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI de Automatización</CardTitle>
            <Save className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">210%</div>
            <p className="text-xs text-muted-foreground">Estimación anual</p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workflows con Errores</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">2</div>
            <p className="text-xs text-muted-foreground">Últimas 24hs</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
        <CardHeader>
          <CardTitle>Estado de Workflows Críticos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between mb-1">
              <CardDescription>Facturación y Cobranzas</CardDescription>
              <CardDescription>99.8% OK</CardDescription>
            </div>
            <Progress value={99.8} className="h-2 [&>div]:bg-green-500" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <CardDescription>Onboarding de Clientes</CardDescription>
              <CardDescription>100% OK</CardDescription>
            </div>
            <Progress value={100} className="h-2 [&>div]:bg-green-500" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <CardDescription>Generación de Reportes</CardDescription>
              <CardDescription>92.1% OK</CardDescription>
            </div>
            <Progress value={92.1} className="h-2 [&>div]:bg-yellow-400" />
          </div>
           <div>
            <div className="flex justify-between mb-1">
              <CardDescription>Sincronización con CRM</CardDescription>
              <CardDescription>85.5% OK</CardDescription>
            </div>
            <Progress value={85.5} className="h-2 [&>div]:bg-red-500" />
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
