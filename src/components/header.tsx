
"use client";

import Link from "next/link";
import { ThemeToggle } from './theme-toggle';
import { Button } from "./ui/button";
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";

export function Header() {
  const t = useTranslations('Header');
  const { user, signOut } = useAuth();

  return (
    <header className="px-4 lg:px-6 h-20 flex items-center bg-transparent sticky top-0 z-30 border-b border-white/10">
      <div className="lg:hidden">
        <SidebarTrigger />
      </div>
      <div className="w-full flex justify-end items-center gap-4">
        {!user ? (
            <Button asChild variant="ghost">
              <Link href="/demo">{t('demo')}</Link>
            </Button>
        ) : (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10">
                             <AvatarImage data-ai-hint="person" src={user.photoURL ?? `https://placehold.co/40x40.png`} />
                             <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.displayName ?? 'Usuario'}</p>
                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Cerrar Sesión</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
