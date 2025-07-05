
"use client";

import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const demoFormSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
  company: z.string().min(2, 'El nombre de la empresa debe tener al menos 2 caracteres.'),
  email: z.string().email('Por favor, introduce un email válido.'),
  module: z.string({ required_error: 'Por favor, selecciona un módulo.' }),
  message: z.string().optional(),
});

type DemoFormValues = z.infer<typeof demoFormSchema>;

const modules = [
    'Business Intelligence',
    'Análisis Financiero',
    'Gestión de Créditos',
    'Atención al Cliente',
    'Automatización de Procesos',
    'Recursos Humanos',
    'Inventario Inteligente',
    'Gestión Documental',
];

export default function DemoForm() {
  const t = useTranslations('Demo');
  const searchParams = useSearchParams();
  const moduleParam = searchParams.get('module');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<DemoFormValues>({
    resolver: zodResolver(demoFormSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      module: moduleParam || '',
      message: '',
    },
  });

  function onSubmit(data: DemoFormValues) {
    console.log(data);
    toast({
      title: t('toastTitle'),
      description: t('toastDescription'),
    });
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-lg text-center bg-white/5 border-white/10 backdrop-blur-lg p-6">
            <CardHeader className="p-0">
                <div className="mx-auto bg-green-500/10 rounded-full p-3 w-fit border border-green-500/20">
                    <CheckCircle className="h-10 w-10 text-green-400" />
                </div>
                <CardTitle className="text-2xl mt-4">{t('submittedTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-4">
                <p className="text-muted-foreground">{t('submittedMessage')}</p>
                 <Button asChild size="lg" className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105">
                  <Link href="/">
                    {t('backToHome')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
            </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
      <Card className="w-full max-w-lg bg-white/5 border-white/10 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-glow">{t('title')}</CardTitle>
          <CardDescription>{t('subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('fullName')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('fullNamePlaceholder')} {...field} className="bg-black/20 border-white/10 focus:ring-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('company')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('companyPlaceholder')} {...field} className="bg-black/20 border-white/10 focus:ring-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('workEmail')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('workEmailPlaceholder')} {...field} className="bg-black/20 border-white/10 focus:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="module"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('moduleOfInterest')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-black/20 border-white/10 focus:ring-primary">
                          <SelectValue placeholder={t('selectModule')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-900 border-white/10">
                        {modules.map(mod => (
                          <SelectItem key={mod} value={mod}>{mod}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('messageOptional')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('messagePlaceholder')}
                        className="resize-none bg-black/20 border-white/10 focus:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105" size="lg">
                {t('submitRequest')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
