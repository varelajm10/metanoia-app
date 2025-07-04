
import MainDashboard from "@/components/main-dashboard";

export default function DashboardPage() {
  return (
    <div>
        <div className="flex items-center justify-between space-y-2 mb-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard General</h2>
                <p className="text-muted-foreground">Vista consolidada de las métricas clave de tu negocio.</p>
            </div>
          </div>
        <MainDashboard />
    </div>
  );
}
