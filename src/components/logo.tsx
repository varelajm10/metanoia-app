"use client";

import { BrainCircuit } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="p-2 bg-gradient-to-br from-primary to-secondary text-primary-foreground rounded-full">
        <BrainCircuit className="h-6 w-6" />
      </div>
      <span className="font-bold text-xl text-foreground font-headline">Metanoia.Click</span>
    </div>
  );
}
