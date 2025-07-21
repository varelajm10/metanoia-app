
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { useToast } from "@/hooks/use-toast"
import { addCollectionEntry } from "./actions"
import { Loader2, Save } from "lucide-react"

const countries = ["Argentina", "Brasil", "Chile", "Colombia", "México", "Perú", "Estados Unidos"];

const formSchema = z.object({
  country: z.string({ required_error: "Debe seleccionar un país." }),
  amount: z.coerce.number().positive({ message: "El importe debe ser un número positivo." }),
  date: z.date({ required_error: "Debe seleccionar una fecha." }),
});

export function CollectionsForm() {
  const t = useTranslations("FinancialAnalysis");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: undefined,
      amount: "" as any,
      date: undefined,
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const result = await addCollectionEntry({
      ...values,
      date: values.date.toISOString(),
    });
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: t('collectionSuccessToastTitle'),
        description: t('collectionSuccessToastDescription'),
      });
      form.reset();
    } else {
      toast({
        title: t('collectionErrorToastTitle'),
        description: t('collectionErrorToastDescription'),
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
      <CardHeader>
        <CardTitle>{t('collectionsFormTitle')}</CardTitle>
        <CardDescription>{t('collectionsFormSubtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('country')}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectCountry')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('amountUSD')}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={t('amountPlaceholder')} {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t('collectionDate')}</FormLabel>
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
              {isSubmitting ? t('saving') : t('saveCollection')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
