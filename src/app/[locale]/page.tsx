
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <section className="flex-1 flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-6 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-glow">
            La Solución de IA para el Problema que No Sabías que Tenías
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
            Hemos identificado el dolor más grande de tu operación. Nuestra IA está lista para resolverlo. ¿Estás listo para ver cómo?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105">
              <Link href="/demo">
                Solicitar una Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
              <Button asChild size="lg" variant="outline">
              <Link href="/dashboard">
                Ir al Dashboard
              </Link>
            </Button>
          </div>
      </div>
    </section>
  );
}
