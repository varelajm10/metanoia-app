
import SettingsClient from "./settings-client";

export default function SettingsPage() {
  return (
    <div>
       <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Mission Control</h2>
            <p className="text-muted-foreground">Gestiona los parámetros del sistema, usuarios, roles y seguridad de la plataforma.</p>
        </div>
      </div>
      <SettingsClient />
    </div>
  );
}
