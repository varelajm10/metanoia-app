
"use client";

import { Module, ModuleCard } from "@/components/module-card";
import {
    LayoutDashboard,
    Users,
    CreditCard,
    Headset,
    DollarSign,
    Workflow,
    FileText,
    Settings,
    Warehouse,
    FolderKanban,
} from 'lucide-react';

const modules: Module[] = [
    {
        title: 'Gestión de Clientes',
        description: 'Alta, análisis y gestión integral de la cartera de clientes.',
        href: '/customer-management',
        icon: <Users size={24} />,
        status: 'Disponible',
        glowColor: 'hsl(260, 100%, 75%)',
    },
    {
        title: 'Gestión de Créditos',
        description: 'Automatización del ciclo de cobranzas, análisis de riesgo y pipeline de pagos.',
        href: '/credit-management',
        icon: <CreditCard size={24} />,
        status: 'Disponible',
        glowColor: 'hsl(145, 63%, 49%)',
    },
    {
        title: 'Atención al Cliente',
        description: 'Gestión omnicanal de tickets, análisis de sentimiento y métricas de resolución.',
        href: '/customer-service',
        icon: <Headset size={24} />,
        status: 'Disponible',
        glowColor: 'hsl(320, 100%, 75%)',
    },
    {
        title: 'Business Intelligence',
        description: 'Centro de análisis y reportes ejecutivos para una toma de decisiones informada.',
        href: '/business-intelligence',
        icon: <LayoutDashboard size={24} />,
        status: 'Disponible',
        glowColor: 'hsl(210, 100%, 75%)',
    },
    {
        title: 'Análisis Financiero',
        description: 'Gestión financiera integral, proyecciones y análisis de rentabilidad.',
        href: '/financial-analysis',
        icon: <DollarSign size={24} />,
        status: 'Disponible',
        glowColor: 'hsl(50, 100%, 65%)',
    },
    {
        title: 'Automatización de Procesos',
        description: 'Orquestación de workflows, métricas de eficiencia y análisis de ROI.',
        href: '/process-automation',
        icon: <Workflow size={24} />,
        status: 'Disponible',
        glowColor: 'hsl(25, 84%, 60%)',
    },
    {
        title: 'Recursos Humanos',
        description: 'Gestión integral del talento, análisis de performance y predicción de rotación.',
        href: '/hr',
        icon: <Users size={24} />,
        status: 'Disponible',
        glowColor: 'hsl(180, 100%, 45%)',
    },
    {
        title: 'Inventario Inteligente',
        description: 'Optimización de stock, predicción de demanda y gestión automatizada de inventario.',
        href: '/intelligent-inventory',
        icon: <Warehouse size={24} />,
        status: 'Disponible',
        glowColor: 'hsl(200, 100%, 60%)',
    },
    {
        title: 'Gestión Documental',
        description: 'Repositorio centralizado, versionado y flujos de aprobación para todos sus documentos.',
        href: '/document-management',
        icon: <FolderKanban size={24} />,
        status: 'Disponible',
        glowColor: 'hsl(35, 100%, 65%)',
    },
    {
        title: 'Reporting',
        description: 'Genera y exporta dashboards ejecutivos y métricas de performance.',
        href: '/reports',
        icon: <FileText size={24} />,
        status: 'Disponible',
        glowColor: 'hsl(0, 100%, 70%)',
    },
    {
        title: 'Configuración',
        description: 'Gestiona los parámetros del sistema y las preferencias de tu cuenta.',
        href: '/settings',
        icon: <Settings size={24} />,
        status: 'Disponible',
        glowColor: 'hsl(280, 100%, 75%)',
    },
];

export default function MainDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module) => (
                <ModuleCard key={module.title} {...module} />
            ))}
        </div>
    );
}
