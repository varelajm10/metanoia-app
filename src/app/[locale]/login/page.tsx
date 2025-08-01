
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogIn, UserPlus } from "lucide-react";
import { Logo } from "@/components/logo";
import { signInUser, signUpUser } from "./actions";
import { useAuth } from "@/hooks/use-auth";

const formSchema = z.object({
  email: z.string().email({ message: "Por favor ingrese un email válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [actionType, setActionType] = useState<'signIn' | 'signUp'>('signIn');

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "varelajm84@gmail.com",
      password: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    
    const result = actionType === 'signIn' 
      ? await signInUser(data) 
      : await signUpUser(data);

    setIsLoading(false);

    if (result.success) {
      const title = actionType === 'signIn' ? "Inicio de Sesión Exitoso" : "Cuenta Creada Exitosamente";
      toast({ title: title, description: "Bienvenido a Metanoia.Click. Redirigiendo..." });
      // La redirección ahora se maneja en el useEffect
    } else {
      const title = actionType === 'signIn' ? "Error en Inicio de Sesión" : "Error al Crear Cuenta";
      toast({
        title: title,
        description: result.error,
        variant: "destructive",
      });
    }
  }
  
  if (loading || user) {
     return (
      <div className="flex h-screen items-center justify-center bg-background bg-page-gradient">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-card/80 backdrop-blur-lg">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <CardTitle className="text-2xl">Bienvenido de Vuelta</CardTitle>
            <CardDescription>Inicia sesión o crea una cuenta para acceder a tu Command Center</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="superusuario@metanoia.click" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col sm:flex-row gap-2">
                <Button type="submit" className="w-full" disabled={isLoading} onClick={() => setActionType('signIn')}>
                   {isLoading && actionType === 'signIn' ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                   ) : (
                      <LogIn className="mr-2 h-4 w-4" />
                   )}
                  Ingresar
                </Button>
                <Button type="submit" variant="secondary" className="w-full" disabled={isLoading} onClick={() => setActionType('signUp')}>
                   {isLoading && actionType === 'signUp' ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                   ) : (
                      <UserPlus className="mr-2 h-4 w-4" />
                   )}
                  Crear Cuenta
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
