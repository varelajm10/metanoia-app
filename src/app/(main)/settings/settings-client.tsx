
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, ShieldCheck, Settings, KeyRound, PlusCircle, FileDown } from "lucide-react";

// Mock Data
const users = [
  { id: 'usr_001', name: 'Super Usuario', email: 'admin@metanoia.click', role: 'SUPER_ADMIN', status: 'active' },
  { id: 'usr_002', name: 'Analista Financiero', email: 'finance@metanoia.click', role: 'Financial Analyst', status: 'active' },
  { id: 'usr_003', name: 'Agente de Soporte', email: 'support@metanoia.click', role: 'Support Agent', status: 'inactive' },
];

const roles = [
  { id: 'role_01', name: 'SUPER_ADMIN', description: 'Acceso total al sistema.', permissions: 'ALL' },
  { id: 'role_02', name: 'Financial Analyst', description: 'Acceso a módulos financieros y de BI.', permissions: 'financial-analysis, business-intelligence' },
  { id: 'role_03', name: 'Support Agent', description: 'Acceso a módulos de atención al cliente.', permissions: 'customer-service' },
];

const statusVariant = {
  active: 'default',
  inactive: 'destructive',
  pending: 'secondary',
} as const;

export default function SettingsClient() {
  return (
    <Tabs defaultValue="users" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="users">
          <Users className="mr-2 h-4 w-4" />
          Gestión de Usuarios
        </TabsTrigger>
        <TabsTrigger value="roles">
          <KeyRound className="mr-2 h-4 w-4" />
          Gestión de Roles
        </TabsTrigger>
        <TabsTrigger value="system">
          <Settings className="mr-2 h-4 w-4" />
          Configuración del Sistema
        </TabsTrigger>
        <TabsTrigger value="security">
          <ShieldCheck className="mr-2 h-4 w-4" />
          Seguridad
        </TabsTrigger>
      </TabsList>

      {/* User Management Tab */}
      <TabsContent value="users" className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Usuarios</CardTitle>
              <CardDescription>Gestiona los usuarios de la plataforma, sus roles y estados.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline"><FileDown className="mr-2 h-4 w-4"/> Exportar</Button>
              <Button><PlusCircle className="mr-2 h-4 w-4"/> Añadir Usuario</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[user.status as keyof typeof statusVariant]}>{user.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Gestionar</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Role Management Tab */}
      <TabsContent value="roles" className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
             <div>
              <CardTitle>Roles y Permisos</CardTitle>
              <CardDescription>Crea y gestiona roles para controlar el acceso a los módulos.</CardDescription>
            </div>
            <Button><PlusCircle className="mr-2 h-4 w-4"/> Crear Rol</Button>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre del Rol</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Permisos</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell><Badge variant="outline">{role.permissions}</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Editar</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* System Config Tab */}
      <TabsContent value="system" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Configuración General</CardTitle>
            <CardDescription>Ajusta los parámetros globales de la plataforma.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="appName">Nombre de la Aplicación</Label>
              <Input id="appName" defaultValue="Metanoia.Click Platform" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="supportEmail">Email de Soporte</Label>
              <Input id="supportEmail" type="email" defaultValue="soporte@metanoia.click" />
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Switch id="maintenance-mode" />
              <Label htmlFor="maintenance-mode" className="text-sm font-normal">Activar Modo Mantenimiento</Label>
            </div>
            <div className="pt-4">
                <Button>Guardar Cambios</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Security Tab */}
      <TabsContent value="security" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Políticas de Contraseñas</CardTitle>
            <CardDescription>Define los requisitos de seguridad para las contraseñas de los usuarios.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-w-md">
            <div className="flex items-center justify-between">
                <Label htmlFor="minLength">Mínima Longitud</Label>
                <Input id="minLength" type="number" defaultValue={12} className="w-24" />
            </div>
             <div className="flex items-center justify-between">
                <Label htmlFor="requireUppercase">Requerir Mayúsculas (A-Z)</Label>
                <Switch id="requireUppercase" defaultChecked />
            </div>
             <div className="flex items-center justify-between">
                <Label htmlFor="requireNumbers">Requerir Números (0-9)</Label>
                <Switch id="requireNumbers" defaultChecked />
            </div>
             <div className="flex items-center justify-between">
                <Label htmlFor="requireSpecialChars">Requerir Caracteres Especiales (!@#$...)</Label>
                <Switch id="requireSpecialChars" defaultChecked/>
            </div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Autenticación de Dos Factores (2FA)</CardTitle>
            <CardDescription>Habilita una capa extra de seguridad para el inicio de sesión.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
             <div className="flex items-center justify-between">
                <Label htmlFor="enable2fa" className="font-medium">Habilitar 2FA para todos los usuarios</Label>
                <Switch id="enable2fa" />
            </div>
             <p className="text-sm text-muted-foreground pt-2">Métodos permitidos: Email, SMS, App de Autenticación.</p>
             <div className="pt-4">
                <Button>Guardar Configuración de Seguridad</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
