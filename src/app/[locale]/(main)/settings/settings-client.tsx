
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, ShieldCheck, Settings, KeyRound, PlusCircle, FileDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


// Mock Data
const users = [
  { id: 'usr_001', name: 'Super Usuario', email: 'admin@metanoia.click', role: 'SUPER_ADMIN', status: 'activo' },
  { id: 'usr_002', name: 'Analista Financiero', email: 'finance@metanoia.click', role: 'Analista Financiero', status: 'activo' },
  { id: 'usr_003', name: 'Agente de Soporte', email: 'support@metanoia.click', role: 'Agente de Soporte', status: 'inactivo' },
];

const roles = [
  { id: 'role_01', name: 'SUPER_ADMIN', description: 'Acceso total al sistema.', permissions: 'TODOS' },
  { id: 'role_02', name: 'Analista Financiero', description: 'Acceso a módulos financieros y de BI.', permissions: 'analisis-financiero, business-intelligence' },
  { id: 'role_03', name: 'Agente de Soporte', description: 'Acceso a módulos de atención al cliente.', permissions: 'atencion-al-cliente' },
];

const statusVariant = {
  activo: 'default',
  inactivo: 'destructive',
  pending: 'secondary',
} as const;

export default function SettingsClient() {
  const t = useTranslations('Settings');
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  }

  return (
    <Tabs defaultValue="users" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="users">
          <Users className="mr-2 h-4 w-4" />
          {t('userManagement')}
        </TabsTrigger>
        <TabsTrigger value="roles">
          <KeyRound className="mr-2 h-4 w-4" />
          {t('roleManagement')}
        </TabsTrigger>
        <TabsTrigger value="system">
          <Settings className="mr-2 h-4 w-4" />
          {t('systemConfiguration')}
        </TabsTrigger>
        <TabsTrigger value="security">
          <ShieldCheck className="mr-2 h-4 w-4" />
          {t('security')}
        </TabsTrigger>
      </TabsList>

      {/* User Management Tab */}
      <TabsContent value="users" className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{t('usersTitle')}</CardTitle>
              <CardDescription>{t('usersSubtitle')}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline"><FileDown className="mr-2 h-4 w-4"/> {t('export')}</Button>
              <Button><PlusCircle className="mr-2 h-4 w-4"/> {t('addUser')}</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('tableName')}</TableHead>
                  <TableHead>{t('tableEmail')}</TableHead>
                  <TableHead>{t('tableRole')}</TableHead>
                  <TableHead>{t('tableStatus')}</TableHead>
                  <TableHead><span className="sr-only">{t('actionManage')}</span></TableHead>
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
                      <Button variant="ghost" size="sm">{t('actionManage')}</Button>
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
              <CardTitle>{t('rolesTitle')}</CardTitle>
              <CardDescription>{t('rolesSubtitle')}</CardDescription>
            </div>
            <Button><PlusCircle className="mr-2 h-4 w-4"/> {t('createRole')}</Button>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('tableRoleName')}</TableHead>
                  <TableHead>{t('tableDescription')}</TableHead>
                  <TableHead>{t('tablePermissions')}</TableHead>
                  <TableHead><span className="sr-only">{t('actionEdit')}</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell><Badge variant="outline">{role.permissions}</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">{t('actionEdit')}</Button>
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
            <CardTitle>{t('generalConfigTitle')}</CardTitle>
            <CardDescription>{t('generalConfigSubtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="appName">{t('appName')}</Label>
              <Input id="appName" defaultValue="Metanoia.Click Platform" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="supportEmail">{t('supportEmail')}</Label>
              <Input id="supportEmail" type="email" defaultValue="soporte@metanoia.click" />
            </div>
            <div className="space-y-2">
              <Label>{t('language')}</Label>
              <Select defaultValue={locale} onValueChange={onSelectChange} disabled={isPending}>
                <SelectTrigger className="w-full md:w-1/2">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">{t('languageSubtitle')}</p>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Switch id="maintenance-mode" />
              <Label htmlFor="maintenance-mode" className="text-sm font-normal">{t('maintenanceMode')}</Label>
            </div>
            <div className="pt-4">
                <Button>{t('saveChanges')}</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Security Tab */}
      <TabsContent value="security" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{t('passwordPoliciesTitle')}</CardTitle>
            <CardDescription>{t('passwordPoliciesSubtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-w-md">
            <div className="flex items-center justify-between">
                <Label htmlFor="minLength">{t('minLength')}</Label>
                <Input id="minLength" type="number" defaultValue={12} className="w-24" />
            </div>
             <div className="flex items-center justify-between">
                <Label htmlFor="requireUppercase">{t('requireUppercase')}</Label>
                <Switch id="requireUppercase" defaultChecked />
            </div>
             <div className="flex items-center justify-between">
                <Label htmlFor="requireNumbers">{t('requireNumbers')}</Label>
                <Switch id="requireNumbers" defaultChecked />
            </div>
             <div className="flex items-center justify-between">
                <Label htmlFor="requireSpecialChars">{t('requireSpecialChars')}</Label>
                <Switch id="requireSpecialChars" defaultChecked/>
            </div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>{t('twoFactorAuthTitle')}</CardTitle>
            <CardDescription>{t('twoFactorAuthSubtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
             <div className="flex items-center justify-between">
                <Label htmlFor="enable2fa" className="font-medium">{t('enable2FA')}</Label>
                <Switch id="enable2fa" />
            </div>
             <p className="text-sm text-muted-foreground pt-2">{t('allowedMethods')}</p>
             <div className="pt-4">
                <Button>{t('saveSecurityConfig')}</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
