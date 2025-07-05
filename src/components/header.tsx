
"use client";

import { ThemeToggle } from './theme-toggle';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-20 flex items-center bg-transparent sticky top-0 z-30 border-b border-white/10">
      <div className="lg:hidden">
        <SidebarTrigger />
      </div>
      <div className="w-full flex justify-end">
        <ThemeToggle />
      </div>
    </header>
  );
}
