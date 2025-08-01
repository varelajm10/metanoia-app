
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogIn, UserPlus } from "lucide-react";
import { Logo } from "@/components/logo";

const formSchema = z.object({
  email: z.string().email({ message: "Por favor ingrese un email válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionType, setActionType] = useState<'signIn' | 'signUp'>('signIn');


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "varelajm84@gmail.com",
      password: "Tool2225",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    // La funcionalidad de login ha sido desactivada temporalmente.
    console.log("Login/SignUp intentado con:", data);
    setTimeout(() => {
        toast({
            title: "Funcionalidad Desactivada",
            description: "El inicio de sesión ha sido desactivado temporalmente.",
            variant: "destructive"
        });
        setIsSubmitting(false);
    }, 1000);
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
                <Button type="submit" className="w-full" disabled={isSubmitting} onClick={() => setActionType('signIn')}>
                   {isSubmitting && actionType === 'signIn' ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                   ) : (
                      <LogIn className="mr-2 h-4 w-4" />
                   )}
                  Ingresar
                </Button>
                <Button type="submit" variant="secondary" className="w-full" disabled={isSubmitting} onClick={() => setActionType('signUp')}>
                   {isSubmitting && actionType === 'signUp' ? (
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
