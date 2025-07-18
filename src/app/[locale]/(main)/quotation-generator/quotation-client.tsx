
"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateQuotation } from "@/ai/flows/quotation-generator";
import { GenerateQuotationOutput, GenerateQuotationInputSchema } from "@/ai/schemas/quotation-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, PlusCircle, Trash2, Wand2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import * as z from "zod";

const ClientSideQuotationSchema = GenerateQuotationInputSchema.extend({
  items: z.array(z.object({
    name: z.string().min(1, "La descripción es requerida."),
    quantity: z.coerce.number().min(1, "La cantidad debe ser al menos 1."),
    unitPrice: z.coerce.number().positive("El precio debe ser un número positivo."),
  })).min(1, "Debe haber al menos un ítem en la cotización."),
  conditions: z.object({
    paymentTerms: z.string().min(1, "El plazo de pago es requerido."),
    deliveryTime: z.string().min(1, "El plazo de entrega es requerido."),
    validityDays: z.coerce.number().int().positive("La validez debe ser un número positivo."),
  }),
});

type QuotationFormValues = z.infer<typeof ClientSideQuotationSchema>;

export function QuotationClient() {
  const t = useTranslations("QuotationGenerator");
  const [result, setResult] = useState<GenerateQuotationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<QuotationFormValues>({
    resolver: zodResolver(ClientSideQuotationSchema),
    defaultValues: {
      clientName: "",
      clientCompany: "",
      items: [{ name: "", quantity: 1, unitPrice: 0 }],
      conditions: {
        paymentTerms: "15 días",
        deliveryTime: "Inmediata",
        validityDays: 7,
      },
      currency: "USD",
      notes: ""
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = async (data: QuotationFormValues) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const output = await generateQuotation(data);
      setResult(output);
    } catch (err) {
      setError(t('error'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const total = form.watch('items').reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
  const currency = form.watch('currency');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle>{t('formTitle')}</CardTitle>
          <CardDescription>{t('formSubtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Client Info */}
              <FormField control={form.control} name="clientName" render={({ field }) => (
                <FormItem><FormLabel>{t('clientName')}</FormLabel><FormControl><Input placeholder={t('clientNamePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
              <FormField control={form.control} name="clientCompany" render={({ field }) => (
                <FormItem><FormLabel>{t('clientCompany')}</FormLabel><FormControl><Input placeholder={t('clientCompanyPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
              )}/>

              <Separator/>

              {/* Items */}
              <div className="space-y-4">
                <FormLabel>{t('items')}</FormLabel>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-start p-2 border rounded-md">
                     <div className="flex-1 space-y-2">
                        <FormField control={form.control} name={`items.${index}.name`} render={({ field }) => (
                            <FormItem><FormControl><Input placeholder={t('itemNamePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <div className="flex gap-2">
                            <FormField control={form.control} name={`items.${index}.quantity`} render={({ field }) => (
                                <FormItem className="flex-1"><FormControl><Input type="number" placeholder={t('quantity')} {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name={`items.${index}.unitPrice`} render={({ field }) => (
                                <FormItem className="flex-1"><FormControl><Input type="number" placeholder={t('unitPrice')} {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </div>
                     </div>
                     <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} disabled={fields.length <= 1}>
                        <Trash2 className="h-4 w-4 text-destructive"/>
                     </Button>
                  </div>
                ))}
                 <Button type="button" size="sm" variant="outline" onClick={() => append({ name: "", quantity: 1, unitPrice: 0 })}>
                    <PlusCircle className="mr-2 h-4 w-4"/> {t('addItem')}
                </Button>
              </div>

               <Separator/>

               {/* Conditions */}
                <div className="space-y-2">
                    <FormLabel>{t('conditions')}</FormLabel>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="conditions.paymentTerms" render={({ field }) => (
                            <FormItem><FormLabel>{t('paymentTerms')}</FormLabel><FormControl><Input placeholder="Ej: 15 días" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                         <FormField control={form.control} name="conditions.deliveryTime" render={({ field }) => (
                            <FormItem><FormLabel>{t('deliveryTime')}</FormLabel><FormControl><Input placeholder="Ej: Inmediata" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                         <FormField control={form.control} name="conditions.validityDays" render={({ field }) => (
                            <FormItem><FormLabel>{t('validity')}</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                         <FormField control={form.control} name="currency" render={({ field }) => (
                            <FormItem><FormLabel>{t('currency')}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                                <SelectContent><SelectItem value="USD">USD</SelectItem><SelectItem value="ARS">ARS</SelectItem></SelectContent>
                            </Select>
                            <FormMessage /></FormItem>
                        )}/>
                    </div>
                </div>

                {/* Notes */}
                <FormField control={form.control} name="notes" render={({ field }) => (
                    <FormItem><FormLabel>{t('notes')}</FormLabel><FormControl><Textarea placeholder={t('notesPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                )}/>

                <div className="flex justify-between items-center bg-muted p-3 rounded-md">
                    <span className="font-semibold">{t('total')}:</span>
                    <span className="font-bold text-lg">{new Intl.NumberFormat('es-AR', { style: 'currency', currency: currency }).format(total)}</span>
                </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                {isLoading ? t('generating') : t('generate')}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('previewTitle')}</CardTitle>
          <CardDescription>{t('previewSubtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm prose-invert max-w-none min-h-[400px] bg-muted rounded-md p-4">
            {isLoading && <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary"/></div>}
            {error && <p className="text-destructive">{error}</p>}
            {result ? (
                <pre className="whitespace-pre-wrap font-sans text-sm">{result.quotationText}</pre>
            ) : (
                !isLoading && <p className="text-muted-foreground">{t('noPreview')}</p>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
