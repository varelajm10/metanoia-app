
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { addCustomer } from "../actions";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, UploadCloud, X, File as FileIcon } from "lucide-react";

const countries = ["Argentina", "Chile", "Uruguay", "Bolivia", "Peru", "Colombia", "Ecuador", "Costa Rica", "República Dominicana", "México", "Estados Unidos"];

const FormSchema = z.object({
  accountExecutive: z.string().min(1),
  legalName: z.string().min(2),
  clientType: z.string().min(1),
  legalAddress: z.object({
    street: z.string().min(1),
    locality: z.string().min(1),
    postalCode: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
  }),
  phone: z.string().min(1),
  website: z.string().url().optional().or(z.literal('')),
  useLegalAsShipping: z.boolean().default(false).optional(),
  shippingAddress: z.object({
    street: z.string(),
    locality: z.string(),
    postalCode: z.string(),
    city: z.string(),
    country: z.string(),
  }).optional(),
  taxInfo: z.object({
    vatType: z.string().min(1),
    taxId: z.string().min(1),
  }),
  brandsToPurchase: z.string().optional(),
  purchasingContact: z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    email: z.string().email(),
  }),
  paymentContact: z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    email: z.string().email(),
  }),
  eInvoiceEmail: z.string().email(),
  purchasingEmail: z.string().email(),
  autoQuotesEmail: z.string().email(),
}).refine(data => {
    if (!data.useLegalAsShipping) {
      return (
        data.shippingAddress?.street &&
        data.shippingAddress.locality &&
        data.shippingAddress.postalCode &&
        data.shippingAddress.city &&
        data.shippingAddress.country
      );
    }
    return true;
  }, {
    message: "La dirección de envío es obligatoria si no es la misma que la legal.",
    path: ["shippingAddress"],
  });

type FormValues = z.infer<typeof FormSchema>;

export function NewCustomerForm() {
  const t = useTranslations("NewCustomerForm");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taxIdLabel, setTaxIdLabel] = useState(t('taxIdNumber'));
  const [supportingDocs, setSupportingDocs] = useState<File[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      accountExecutive: "",
      legalName: "",
      clientType: "",
      legalAddress: { street: "", locality: "", postalCode: "", city: "", country: "" },
      phone: "",
      website: "",
      useLegalAsShipping: false,
      shippingAddress: { street: "", locality: "", postalCode: "", city: "", country: "" },
      taxInfo: { vatType: "", taxId: "" },
      brandsToPurchase: "",
      purchasingContact: { name: "", phone: "", email: "" },
      paymentContact: { name: "", phone: "", email: "" },
      eInvoiceEmail: "",
      purchasingEmail: "",
      autoQuotesEmail: "",
    },
  });

  const useLegalAsShipping = form.watch("useLegalAsShipping");
  const legalAddressCountry = form.watch("legalAddress.country");

  useEffect(() => {
    switch (legalAddressCountry) {
      case 'Argentina':
        setTaxIdLabel(t('cuitLabel'));
        break;
      case 'Colombia':
        setTaxIdLabel(t('rutLabel'));
        break;
      case 'Peru':
        setTaxIdLabel(t('rucLabel'));
        break;
      default:
        setTaxIdLabel(t('taxIdNumber'));
        break;
    }
  }, [legalAddressCountry, t]);

  const fileToDataUri = (file: File): Promise<{name: string, dataUri: string}> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        if(event.target?.result) {
            resolve({ name: file.name, dataUri: event.target.result as string });
        } else {
            reject(new Error("Failed to read file."));
        }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    const documentPromises = supportingDocs.map(fileToDataUri);
    const documents = await Promise.all(documentPromises);

    const result = await addCustomer(data, documents);
    setIsSubmitting(false);

    if (result.success) {
      toast({ title: t('clientSuccessToastTitle'), description: t('clientSuccessToastDescription') });
      form.reset();
      setSupportingDocs([]);
    } else {
      toast({ title: t('clientErrorToastTitle'), description: t('clientErrorToastDescription'), variant: "destructive" });
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSupportingDocs(prev => [...prev, ...newFiles.filter(f => f.type === 'application/pdf')]);
    }
  };

  const removeFile = (index: number) => {
    setSupportingDocs(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Accordion type="multiple" defaultValue={['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6']} className="w-full">

          {/* Legal Info */}
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold">{t('legalAddress')}</AccordionTrigger>
            <AccordionContent>
              <Card className="border-none shadow-none">
                <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="accountExecutive" render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>{t('accountExecutive')}</FormLabel>
                      <FormControl><Input placeholder={t('accountExecutivePlaceholder')} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="legalName" render={({ field }) => (
                    <FormItem><FormLabel>{t('legalName')}</FormLabel><FormControl><Input placeholder={t('legalNamePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <FormField control={form.control} name="clientType" render={({ field }) => (
                    <FormItem><FormLabel>{t('clientType')}</FormLabel><FormControl><Input placeholder={t('clientTypePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <FormField control={form.control} name="legalAddress.street" render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel>{t('legalAddress')}</FormLabel><FormControl><Input placeholder={t('addressPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <FormField control={form.control} name="legalAddress.locality" render={({ field }) => (
                    <FormItem><FormLabel>{t('locality')}</FormLabel><FormControl><Input placeholder={t('localityPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <FormField control={form.control} name="legalAddress.postalCode" render={({ field }) => (
                    <FormItem><FormLabel>{t('postalCode')}</FormLabel><FormControl><Input placeholder={t('postalCodePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <FormField control={form.control} name="legalAddress.city" render={({ field }) => (
                    <FormItem><FormLabel>{t('city')}</FormLabel><FormControl><Input placeholder={t('cityPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <FormField control={form.control} name="legalAddress.country" render={({ field }) => (
                    <FormItem><FormLabel>{t('country')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder={t('selectCountry')} /></SelectTrigger></FormControl>
                        <SelectContent>{countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                      </Select><FormMessage /></FormItem>
                  )}/>
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>{t('phone')}</FormLabel><FormControl><Input placeholder={t('phonePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <FormField control={form.control} name="website" render={({ field }) => (
                    <FormItem><FormLabel>{t('website')}</FormLabel><FormControl><Input placeholder={t('websitePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
          
          {/* Shipping Info */}
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold">{t('shippingAddress')}</AccordionTrigger>
            <AccordionContent>
              <Card className="border-none shadow-none">
                <CardContent className="pt-6 space-y-6">
                  <FormField control={form.control} name="useLegalAsShipping" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <div className="space-y-1 leading-none"><FormLabel>{t('sameAsLegal')}</FormLabel></div>
                    </FormItem>
                  )}/>
                  {!useLegalAsShipping && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="shippingAddress.street" render={({ field }) => (
                        <FormItem className="md:col-span-2"><FormLabel>{t('shippingAddress')}</FormLabel><FormControl><Input placeholder={t('addressPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                      )}/>
                      <FormField control={form.control} name="shippingAddress.locality" render={({ field }) => (
                        <FormItem><FormLabel>{t('locality')}</FormLabel><FormControl><Input placeholder={t('localityPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                      )}/>
                       <FormField control={form.control} name="shippingAddress.postalCode" render={({ field }) => (
                        <FormItem><FormLabel>{t('postalCode')}</FormLabel><FormControl><Input placeholder={t('postalCodePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                      )}/>
                      <FormField control={form.control} name="shippingAddress.city" render={({ field }) => (
                        <FormItem><FormLabel>{t('city')}</FormLabel><FormControl><Input placeholder={t('cityPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                      )}/>
                      <FormField control={form.control} name="shippingAddress.country" render={({ field }) => (
                        <FormItem><FormLabel>{t('country')}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder={t('selectCountry')} /></SelectTrigger></FormControl>
                            <SelectContent>{countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                          </Select><FormMessage /></FormItem>
                      )}/>
                    </div>
                  )}
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* Tax Info */}
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-semibold">{t('taxInfo')}</AccordionTrigger>
             <AccordionContent>
              <Card className="border-none shadow-none">
                <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="taxInfo.vatType" render={({ field }) => (
                    <FormItem><FormLabel>{t('vatType')}</FormLabel><FormControl><Input placeholder={t('vatTypePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                   <FormField control={form.control} name="taxInfo.taxId" render={({ field }) => (
                    <FormItem><FormLabel>{taxIdLabel}</FormLabel><FormControl><Input placeholder={t('taxIdPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                   <FormField control={form.control} name="brandsToPurchase" render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel>{t('brandsToPurchase')}</FormLabel><FormControl><Input placeholder={t('brandsToPurchasePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

           {/* Contact Info */}
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-semibold">{t('contactInfo')}</AccordionTrigger>
             <AccordionContent>
                <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader><CardTitle>{t('purchasingContact')}</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <FormField control={form.control} name="purchasingContact.name" render={({ field }) => (
                                <FormItem><FormLabel>{t('contactName')}</FormLabel><FormControl><Input placeholder={t('contactNamePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name="purchasingContact.phone" render={({ field }) => (
                                <FormItem><FormLabel>{t('contactPhone')}</FormLabel><FormControl><Input placeholder={t('phonePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name="purchasingContact.email" render={({ field }) => (
                                <FormItem><FormLabel>{t('contactEmail')}</FormLabel><FormControl><Input type="email" placeholder={t('contactEmailPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>{t('paymentContact')}</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                             <FormField control={form.control} name="paymentContact.name" render={({ field }) => (
                                <FormItem><FormLabel>{t('contactName')}</FormLabel><FormControl><Input placeholder={t('contactNamePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name="paymentContact.phone" render={({ field }) => (
                                <FormItem><FormLabel>{t('contactPhone')}</FormLabel><FormControl><Input placeholder={t('phonePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name="paymentContact.email" render={({ field }) => (
                                <FormItem><FormLabel>{t('contactEmail')}</FormLabel><FormControl><Input type="email" placeholder={t('contactEmailPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </CardContent>
                    </Card>
                </div>
            </AccordionContent>
          </AccordionItem>
          
           {/* Reference Mails */}
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-semibold">{t('referenceEmails')}</AccordionTrigger>
            <AccordionContent>
              <Card className="border-none shadow-none">
                <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField control={form.control} name="eInvoiceEmail" render={({ field }) => (
                    <FormItem><FormLabel>{t('eInvoiceEmail')}</FormLabel><FormControl><Input type="email" placeholder={t('contactEmailPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <FormField control={form.control} name="purchasingEmail" render={({ field }) => (
                    <FormItem><FormLabel>{t('purchasingEmail')}</FormLabel><FormControl><Input type="email" placeholder={t('contactEmailPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <FormField control={form.control} name="autoQuotesEmail" render={({ field }) => (
                    <FormItem><FormLabel>{t('autoQuotesEmail')}</FormLabel><FormControl><Input type="email" placeholder={t('contactEmailPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

           {/* File Upload */}
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-lg font-semibold">{t('supportingDocs')}</AccordionTrigger>
            <AccordionContent>
              <Card className="border-none shadow-none">
                <CardHeader><CardDescription>{t('supportingDocsSubtitle')}</CardDescription></CardHeader>
                <CardContent className="pt-2">
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">{t('dropzoneLabel')}</span></p>
                                <p className="text-xs text-muted-foreground">{t('dropzoneHint')}</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" multiple accept="application/pdf" onChange={handleFileChange} />
                        </label>
                    </div> 
                    {supportingDocs.length > 0 && (
                        <div className="mt-4">
                            <h4 className="font-medium">{t('selectedFiles')}</h4>
                            <ul className="mt-2 space-y-2">
                                {supportingDocs.map((file, index) => (
                                    <li key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                                        <div className="flex items-center gap-2">
                                            <FileIcon className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">{file.name}</span>
                                        </div>
                                        <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(index)}>
                                            <X className="h-4 w-4" />
                                            <span className="sr-only">{t('removeFile')}</span>
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

        </Accordion>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {isSubmitting ? t('saving') : t('saveClient')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
