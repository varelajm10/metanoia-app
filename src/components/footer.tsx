"use client";

import Link from 'next/link';
import { Logo } from '@/components/logo';

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Metanoia.Click. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" prefetch={false}>
              Términos
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" prefetch={false}>
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
