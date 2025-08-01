
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
import { Users, ShieldCheck, Settings, KeyRound, PlusCircle, FileDown, Palette, Languages } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "next-themes";


// Mock Data
const users: any[] = [];
const roles: any[] = [];

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
  const { theme, setTheme } = useTheme();


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
                {users.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="h-24 text-center">No hay usuarios.</TableCell></TableRow>
                ) : (
                  users.map((user) => (
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
                  ))
                )}
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
                {roles.length === 0 ? (
                   <TableRow><TableCell colSpan={4} className="h-24 text-center">No hay roles creados.</TableCell></TableRow>
                ) : (
                  roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell><Badge variant="outline">{role.permissions}</Badge></TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">{t('actionEdit')}</Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
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
            <div className="flex items-center space-x-2 pt-2">
              <Switch id="maintenance-mode" />
              <Label htmlFor="maintenance-mode" className="text-sm font-normal">{t('maintenanceMode')}</Label>
            </div>
            <div className="pt-4">
                <Button>{t('saveChanges')}</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Languages/>{t('language')}</CardTitle>
                <CardDescription>{t('languageSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
                 <Select defaultValue={locale} onValueChange={onSelectChange} disabled={isPending}>
                    <SelectTrigger className="w-full md:w-1/2">
                    <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Palette />Tema</CardTitle>
                <CardDescription>Selecciona la apariencia visual de la plataforma.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="w-full md:w-1/2">
                    <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Oscuro</SelectItem>
                        <SelectItem value="theme-oasis">Oasis</SelectItem>
                        <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                </Select>
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
