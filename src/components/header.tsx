
"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/use-auth";
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
        {user ? (
          <Button onClick={signOut} variant="ghost">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        ) : (
          <Button asChild variant="ghost">
            <Link href="/demo">{t('demo')}</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
