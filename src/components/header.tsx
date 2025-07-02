"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-20 flex items-center bg-background/60 backdrop-blur-xl sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Logo />
          <span className="sr-only">Metanoia.Click</span>
        </Link>
        <nav className="hidden lg:flex gap-6 items-center">
          <Link
            href="/#modules"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            prefetch={false}
          >
            Módulos
          </Link>
          <Link
            href="/financial-analysis"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            prefetch={false}
          >
            Herramientas IA
          </Link>
           <Link
            href="/business-intelligence"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            prefetch={false}
          >
            Business Intelligence
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden lg:flex bg-white/5 hover:bg-white/10 border border-white/10 text-foreground">
            <Link href="/demo">Solicitar Demo</Link>
          </Button>
          <div className="lg:hidden">
              <Button asChild size="sm">
                  <Link href="/demo">Demo</Link>
              </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
