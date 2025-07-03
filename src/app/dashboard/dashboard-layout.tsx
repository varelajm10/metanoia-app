"use client"

import * as React from "react"
import { AIChatBox } from "@/components/ai-chat-box";

interface DashboardLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export default function DashboardLayout({ title, description, children }: DashboardLayoutProps) {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between space-y-2">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                <p className="text-muted-foreground">{description}</p>
            </div>
          </div>
          {children}
          <AIChatBox />
        </main>
    )
}
