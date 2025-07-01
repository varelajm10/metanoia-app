import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ModuleCard } from '@/components/module-card';
import { TrendingUp, CreditCard, Users, PackageSearch, Bot, LayoutDashboard, FileText, Zap, ArrowRight, ShieldCheck, BarChart, Settings2 } from 'lucide-react';
import { motion } from 'framer-motion';

const modules = [
  {
    icon: <LayoutDashboard />,
    title: 'Business Intelligence',
    description: 'Dashboards y análisis de datos para decisiones informadas.',
    status: 'Disponible',
    href: '/business-intelligence',
    className: "md:col-span-2",
    glowColor: 'hsl(var(--primary))',
  },
  {
    icon: <TrendingUp />,
    title: 'Análisis Financiero',
    description: 'Automatización de balances y reportes financieros.',
    status: 'Disponible',
    href: '/financial-analysis',
    className: "md:col-span-1",
    glowColor: 'hsl(var(--accent))',
  },
  {
    icon: <CreditCard />,
    title: 'Gestión de Créditos',
    description: 'Evaluación automática y seguimiento de clientes.',
    status: 'En Desarrollo',
    href: '/demo?module=Gestión de Créditos',
    className: "md:col-span-1",
    glowColor: 'hsl(var(--secondary))',
  },
  {
    icon: <Bot />,
    title: 'Atención al Cliente',
    description: 'Chatbots y automatización de consultas frecuentes.',
    status: 'En Desarrollo',
    href: '/demo?module=Atención al Cliente',
    className: "md:col-span-2",
    glowColor: 'hsl(var(--primary))',
  },
  {
    icon: <Users />,
    title: 'Recursos Humanos',
    description: 'Gestión de empleados, nóminas y ciclo de vida laboral.',
    status: 'Próximamente',
    href: '/demo?module=Recursos Humanos',
    className: "md:col-span-1",
    glowColor: 'hsl(var(--accent))',
  },
  {
    icon: <Zap />,
    title: 'Automatización de Procesos',
    description: 'Diseño e implementación de workflows personalizados.',
    status: 'En Desarrollo',
    href: '/demo?module=Automatización de Procesos',
    className: "md:col-span-2",
    glowColor: 'hsl(var(--secondary))',
  },
];


export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background bg-page-gradient">
      <Header />
      <main className="flex-1">
        <section className="relative w-full py-28 md:py-40 lg:py-56 overflow-hidden">
          <div className="absolute inset-0 bg-hero-gradient z-0"></div>
          <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 !leading-tight text-glow">
                  El Futuro de tu Negocio, Automatizado.
                </h1>
              </motion.div>
              <motion.p 
                className="mt-6 max-w-2xl text-lg text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                Transforma tu empresa con módulos de automatización impulsados por IA. Optimiza procesos, reduce costos y toma decisiones más inteligentes con Metanoia.Click.
              </motion.p>
              <motion.div 
                className="mt-8 flex justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              >
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105">
                  <Link href="/demo">
                    Solicitar Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="text-base font-semibold transition-all duration-300 hover:scale-105 hover:bg-transparent">
                  <Link href="#modules">
                    Explorar Módulos
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="modules" className="w-full py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-glow">Nuestros Módulos de Automatización</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg">
                Soluciones de IA diseñadas para potenciar cada área de tu empresa.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
