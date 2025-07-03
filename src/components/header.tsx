"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { ThemeToggle } from './theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react';

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-20 flex items-center bg-background/60 backdrop-blur-xl sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Logo />
          <span className="sr-only">Metanoia.Click</span>
        </Link>
        <nav className="hidden lg:flex gap-6 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
                Dashboards
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-zinc-900 border-white/10">
              <DropdownMenuItem asChild><Link href="/">Dashboard General</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/business-intelligence">Business Intelligence</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/financial-analysis">Análisis Financiero</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/credit-management">Gestión de Créditos</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/customer-service">Atención al Cliente</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/hr">Recursos Humanos</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/process-automation">Automatización</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
