import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Logo />
          <span className="sr-only">Metanoia.Click</span>
        </Link>
        <nav className="hidden lg:flex gap-4 sm:gap-6 items-center">
          <Link
            href="/#modules"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Módulos
          </Link>
          <Link
            href="/financial-analysis"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Herramientas IA
          </Link>
          <Button asChild>
            <Link href="/demo">Solicitar Demo</Link>
          </Button>
        </nav>
        <div className="lg:hidden">
            <Button asChild>
                <Link href="/demo">Demo</Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
