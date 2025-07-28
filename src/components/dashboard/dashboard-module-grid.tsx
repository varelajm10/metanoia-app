
"use client";

import { useTranslations } from "next-intl";
import { getModules } from "@/lib/modules";
import { ModuleCard } from "@/components/module-card";

export function DashboardModuleGrid() {
    const t_sidebar = useTranslations('Sidebar');
    const modules = getModules(t_sidebar);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module) => (
                <ModuleCard key={module.title} {...module} />
            ))}
        </div>
    )
}
