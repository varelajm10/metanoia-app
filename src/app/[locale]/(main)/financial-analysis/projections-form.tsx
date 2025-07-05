"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useTranslations } from "next-intl"
import { useState } from "react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { useToast } from "@/hooks/use-toast"
import { addProjectionEntry } from "./actions"
import { Loader2, Save } from "lucide-react"

const formSchema = z.object({
  analystName: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  projectedAmount: z.coerce.number().positive({ message: "El importe debe ser un número positivo." }),
  weekOf: z.date({ required_error: "Debe seleccionar una fecha." }),
});

export function ProjectionsForm() {
  const t = useTranslations("FinancialAnalysis");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      analystName: "",
      projectedAmount: '' as any,
      weekOf: undefined,
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const result = await addProjectionEntry(values);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: t('projectionSuccessToastTitle'),
        description: t('projectionSuccessToastDescription'),
      });
      form.reset();
    } else {
      toast({
        title: t('projectionErrorToastTitle'),
        description: t('projectionErrorToastDescription'),
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
      <CardHeader>
        <CardTitle>{t('projectionsFormTitle')}</CardTitle>
        <CardDescription>{t('projectionsFormSubtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="analystName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('analystName')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('analystNamePlaceholder')} {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectedAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('projectedAmount')}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={t('amountPlaceholder')} {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weekOf"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t('weekOf')}</FormLabel>
                  <DatePicker date={field.value} setDate={field.onChange} disabled={isSubmitting} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {isSubmitting ? t('saving') : t('saveProjection')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
