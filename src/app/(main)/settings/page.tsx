
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div>
       <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Configuración</h2>
            <p className="text-muted-foreground">Gestiona los parámetros del sistema y las preferencias de tu cuenta.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Configuración del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Aquí se implementará la gestión de usuarios, roles, parámetros de seguridad y otras configuraciones de la plataforma.</p>
        </CardContent>
      </Card>
    </div>
  );
}
