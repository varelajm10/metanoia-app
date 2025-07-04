"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-20 flex items-center bg-transparent sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-end">
        <div className="flex items-center gap-2">
          <ThemeToggle />
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
