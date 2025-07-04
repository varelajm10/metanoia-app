
import DashboardClient from "@/components/dashboard-client";

export default function DashboardPage() {
  return (
    <div>
        <div className="flex items-center justify-between space-y-2 mb-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Módulos del Sistema</h2>
                <p className="text-muted-foreground">Bienvenido, Super Usuario. Accede a todas las funcionalidades de la plataforma.</p>
            </div>
          </div>
        <DashboardClient />
    </div>
  );
}
