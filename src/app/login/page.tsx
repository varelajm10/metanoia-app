
"use client";

import { useFormStatus } from "react-dom";
import { login } from "./actions";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Fingerprint, Loader2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-primary/90 hover:bg-primary text-primary-foreground text-lg font-semibold py-6 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          <span>Verificando...</span>
        </>
      ) : (
        <>
          <Fingerprint className="mr-2 h-6 w-6" />
          <span>Ingreso Seguro</span>
        </>
      )}
    </Button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(login, null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.success === false) {
      toast({
        variant: "destructive",
        title: "Error de Autenticación",
        description: state.message,
      });
    }
  }, [state, toast]);


  return (
     <div className="flex min-h-screen items-center justify-center bg-background bg-page-gradient p-4">
        <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Card className="w-full max-w-md bg-card/50 backdrop-blur-xl border-white/10 shadow-2xl shadow-primary/10">
            <CardHeader className="text-center space-y-4 pt-8">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
                    className="flex justify-center mb-2"
                >
                     <Logo />
                </motion.div>
              <CardTitle className="text-3xl font-bold text-glow">Bienvenido a la Excelencia</CardTitle>
              <CardDescription className="text-muted-foreground text-base">Autenticación de grado empresarial para la plataforma de IA líder.</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Usuario Corporativo</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Metanoia.click"
                    required
                    className="bg-black/20 border-white/10 h-12 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña Segura</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••••••"
                    required
                     className="bg-black/20 border-white/10 h-12 text-base"
                  />
                </div>
                <SubmitButton />
              </form>
            </CardContent>
          </Card>
        </motion.div>
    </div>
  );
}
