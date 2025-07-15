
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/use-toast";
import { addEmployee } from "./actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Loader2, Save, UserPlus, UploadCloud, File as FileIcon, X } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, "El nombre es requerido."),
  position: z.string().min(2, "El cargo es requerido."),
  department: z.string().min(1, "El departamento es requerido."),
  hireDate: z.date({ required_error: "La fecha es requerida." }),
  salary: z.coerce.number().positive("El salario debe ser un número positivo."),
});

type FormValues = z.infer<typeof formSchema>;

const departments = ["Tecnología", "Ventas", "Marketing", "Operaciones", "Finanzas", "RRHH", "Producto"];

export function NewEmployeeForm() {
    const t = useTranslations("HR");
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [documents, setDocuments] = useState<File[]>([]);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            position: "",
            department: undefined,
            hireDate: undefined,
            salary: "" as any,
        }
    });

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
        const docPromises = documents.map(fileToDataUri);
        const uploadedDocs = await Promise.all(docPromises);
        
        const result = await addEmployee({
            ...data,
            hireDate: data.hireDate.toISOString(),
        }, uploadedDocs);

        setIsSubmitting(false);

        if (result.success) {
            toast({ title: t('employeeSavedToastTitle'), description: t('employeeSavedToastDescription') });
            form.reset();
            setDocuments([]);
        } else {
            toast({ title: t('errorSavingToastTitle'), description: t('errorSavingToastDescription'), variant: "destructive" });
        }
    }
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          const newFiles = Array.from(e.target.files);
          setDocuments(prev => [...prev, ...newFiles.filter(f => f.type === 'application/pdf')]);
        }
    };
    
    const removeFile = (index: number) => {
        setDocuments(prev => prev.filter((_, i) => i !== index));
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <UserPlus />
                    {t('newEmployeeFormTitle')}
                </CardTitle>
                <CardDescription>{t('newEmployeeFormSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="fullName" render={({ field }) => (
                                <FormItem><FormLabel>{t('fullName')}</FormLabel><FormControl><Input placeholder={t('fullNamePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name="position" render={({ field }) => (
                                <FormItem><FormLabel>{t('position')}</FormLabel><FormControl><Input placeholder={t('positionPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                             <FormField control={form.control} name="department" render={({ field }) => (
                                <FormItem><FormLabel>{t('department')}</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder={t('selectDepartment')} /></SelectTrigger></FormControl>
                                    <SelectContent>{departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                                </Select><FormMessage /></FormItem>
                            )}/>
                             <FormField control={form.control} name="hireDate" render={({ field }) => (
                                <FormItem className="flex flex-col"><FormLabel>{t('hireDate')}</FormLabel>
                                <DatePicker date={field.value} setDate={field.onChange} />
                                <FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name="salary" render={({ field }) => (
                                <FormItem><FormLabel>{t('salaryUSD')}</FormLabel><FormControl><Input type="number" placeholder="50000" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </div>
                        <div>
                            <FormLabel>{t('documentation')}</FormLabel>
                            <div className="flex items-center justify-center w-full mt-2">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">{t('dropzoneLabel')}</span></p>
                                        <p className="text-xs text-muted-foreground">{t('dropzoneHintPDF')}</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" multiple accept="application/pdf" onChange={handleFileChange} />
                                </label>
                            </div> 
                            {documents.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="font-medium text-sm">{t('selectedFiles')}:</h4>
                                    <ul className="mt-2 space-y-2">
                                        {documents.map((file, index) => (
                                            <li key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50 text-sm">
                                                <div className="flex items-center gap-2"><FileIcon className="h-4 w-4" /><span>{file.name}</span></div>
                                                <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(index)}>
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                {isSubmitting ? t('saving') : t('saveEmployee')}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
