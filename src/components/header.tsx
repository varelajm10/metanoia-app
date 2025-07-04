"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { User, LogOut } from 'lucide-react';
import { logout } from '@/app/login/actions';

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-20 flex items-center bg-transparent sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-end">
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-zinc-900 border-white/10">
              <DropdownMenuItem>Mi Perfil</DropdownMenuItem>
              <DropdownMenuItem>Facturación</DropdownMenuItem>
              <DropdownMenuSeparator />
               <DropdownMenuItem asChild>
                <form action={logout} className="w-full">
                    <button type="submit" className="w-full text-left flex items-center">
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar Sesión
                    </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
