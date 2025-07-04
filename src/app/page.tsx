
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login } from "./login/actions";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Ingresando..." : "Ingresar"}
    </Button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState(login, null);
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
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                 <Logo />
            </div>
          <CardTitle className="text-2xl">Bienvenido a Metanoia</CardTitle>
          <CardDescription>Ingresa tus credenciales para acceder a la plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Metanoia.click"
                required
                className="bg-black/20 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Metanoia1234"
                required
                 className="bg-black/20 border-white/10"
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
