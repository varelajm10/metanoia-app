import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ModuleCard, type Module } from '@/components/module-card';
import { TrendingUp, CreditCard, Users, PackageSearch, Bot, LayoutDashboard, FileText, Zap, ArrowRight } from 'lucide-react';

const modules: Module[] = [
  {
    icon: <LayoutDashboard className="h-8 w-8" />,
    title: 'Business Intelligence',
    description: 'Dashboards y análisis de datos para decisiones informadas.',
    status: 'Disponible',
    href: '/business-intelligence',
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: 'Análisis Financiero',
    description: 'Automatización de balances y reportes financieros.',
    status: 'Disponible',
    href: '/financial-analysis',
  },
  {
    icon: <CreditCard className="h-8 w-8" />,
    title: 'Gestión de Créditos',
    description: 'Evaluación automática y seguimiento de clientes.',
    status: 'En Desarrollo',
    href: '/demo',
  },
  {
    icon: <Bot className="h-8 w-8" />,
    title: 'Atención al Cliente',
    description: 'Chatbots y automatización de consultas frecuentes.',
    status: 'En Desarrollo',
    href: '/demo',
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: 'Automatización de Procesos',
    description: 'Diseño e implementación de workflows personalizados.',
    status: 'En Desarrollo',
    href: '/demo',
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Recursos Humanos',
    description: 'Gestión de empleados, nóminas y ciclo de vida laboral.',
    status: 'Próximamente',
    href: '/demo',
  },
  {
    icon: <PackageSearch className="h-8 w-8" />,
    title: 'Inventario Inteligente',
    description: 'Control de stock automatizado y predicción de demanda.',
    status: 'Próximamente',
    href: '/demo',
  },
  {
    icon: <FileText className="h-8 w-8" />,
    title: 'Gestión Documental',
    description: 'Automatización de la creación y gestión de documentos.',
    status: 'Próximamente',
    href: '/demo',
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 bg-gray-50 dark:bg-gray-900/10">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary font-headline">
                Automatización Inteligente para tu Negocio
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                En Metanoia.Click, transformamos tu empresa con módulos de automatización empresarial impulsados por Inteligencia Artificial. Optimiza procesos, reduce costos y toma decisiones más inteligentes.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/demo">
                    Solicitar Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="modules" className="w-full py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary font-headline">Nuestros Módulos de Automatización</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Explora nuestras soluciones diseñadas para potenciar cada área de tu empresa.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {modules.map((module) => (
                <ModuleCard key={module.title} {...module} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
