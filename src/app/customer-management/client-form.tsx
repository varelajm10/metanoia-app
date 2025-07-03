"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, ArrowLeft, Building, Phone, Globe, MapPin, Briefcase, FileText, CheckCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ClientFormProps {
  mode: 'create' | 'edit';
  client?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const steps = [
  { id: 1, title: 'Información Básica', icon: Building },
  { id: 2, title: 'Contacto y Comunicación', icon: Phone },
  { id: 3, title: 'Direcciones', icon: MapPin },
  { id: 4, title: 'Configuración Comercial', icon: Briefcase },
  { id: 5, title: 'Facturación Electrónica', icon: FileText },
  { id: 6, title: 'Análisis Crediticio', icon: CheckCircle },
];

const initialFormData = {
  companyInfo: { businessName: '', tradeName: '', country: '', taxId: '', industry: '' },
  contact: { primaryEmail: '', phone: '', website: '' },
  addresses: { fiscal: { street: '', city: '', postalCode: '', country: '' } },
  commercial: { paymentMethod: '', creditDays: 0, creditLimit: 0, currency: 'USD' },
  electronicInvoicing: { enabled: false },
  creditAnalysis: { required: false },
};

export default function ClientForm({ mode, client, onSave, onCancel }: ClientFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (mode === 'edit' && client) {
      // A deep merge would be better, but for this implementation this is fine
      const mergedData = {
        ...initialFormData,
        ...client,
        companyInfo: { ...initialFormData.companyInfo, ...client.companyInfo },
        contact: { ...initialFormData.contact, ...client.contact },
        addresses: { ...initialFormData.addresses, ...client.addresses },
        commercial: { ...initialFormData.commercial, ...client.commercial },
        electronicInvoicing: { ...initialFormData.electronicInvoicing, ...client.electronicInvoicing },
        creditAnalysis: { ...initialFormData.creditAnalysis, ...client.creditAnalysis },
      };
      setFormData(mergedData);
    } else {
      setFormData(initialFormData);
    }
  }, [client, mode]);

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const [section, field] = name.split('.');
    
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: type === 'checkbox' ? checked : value,
      },
    }));
  };

  const handleSelectChange = (name: string, value: string | boolean) => {
    const [section, field] = name.split('.');
     setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  }

  const StepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyInfo.businessName">Razón Social</Label>
                <Input id="companyInfo.businessName" name="companyInfo.businessName" value={formData.companyInfo.businessName} onChange={handleChange} placeholder="Tu Empresa S.A." className="bg-black/20 border-white/10" />
              </div>
               <div>
                <Label htmlFor="companyInfo.tradeName">Nombre Comercial</Label>
                <Input id="companyInfo.tradeName" name="companyInfo.tradeName" value={formData.companyInfo.tradeName} onChange={handleChange} placeholder="Tu Marca" className="bg-black/20 border-white/10"/>
              </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyInfo.country">País</Label>
                  <Select name="companyInfo.country" onValueChange={(value) => handleSelectChange('companyInfo.country', value)} value={formData.companyInfo.country}>
                    <SelectTrigger className="bg-black/20 border-white/10"><SelectValue placeholder="Selecciona un país" /></SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-white/10">
                      <SelectItem value="AR">Argentina</SelectItem>
                      <SelectItem value="CL">Chile</SelectItem>
                      <SelectItem value="PE">Perú</SelectItem>
                      <SelectItem value="UY">Uruguay</SelectItem>
                      <SelectItem value="US">Estados Unidos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div>
                  <Label htmlFor="companyInfo.taxId">ID Fiscal (CUIT/RUT/EIN)</Label>
                  <Input id="companyInfo.taxId" name="companyInfo.taxId" value={formData.companyInfo.taxId} onChange={handleChange} className="bg-black/20 border-white/10"/>
                </div>
            </div>
            <div>
              <Label htmlFor="companyInfo.industry">Industria</Label>
              <Input id="companyInfo.industry" name="companyInfo.industry" value={formData.companyInfo.industry} onChange={handleChange} placeholder="Ej: Tecnología, Retail, etc." className="bg-black/20 border-white/10"/>
            </div>
          </div>
        );
      case 2:
        return (
           <div className="space-y-4">
            <div>
              <Label htmlFor="contact.primaryEmail">Email Principal</Label>
              <Input id="contact.primaryEmail" name="contact.primaryEmail" type="email" value={formData.contact.primaryEmail} onChange={handleChange} placeholder="contacto@tuempresa.com" className="bg-black/20 border-white/10"/>
            </div>
             <div>
              <Label htmlFor="contact.phone">Teléfono</Label>
              <Input id="contact.phone" name="contact.phone" value={formData.contact.phone} onChange={handleChange} placeholder="+54 9 11 1234-5678" className="bg-black/20 border-white/10"/>
            </div>
             <div>
              <Label htmlFor="contact.website">Sitio Web</Label>
              <Input id="contact.website" name="contact.website" value={formData.contact.website} onChange={handleChange} placeholder="https://tuempresa.com" className="bg-black/20 border-white/10"/>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
             <h4 className="font-semibold text-lg">Dirección Fiscal</h4>
            <div>
              <Label htmlFor="addresses.fiscal.street">Calle y Número</Label>
              <Input id="addresses.fiscal.street" name="addresses.fiscal.street" value={formData.addresses.fiscal.street} onChange={handleChange} placeholder="Av. Corrientes 1234" className="bg-black/20 border-white/10"/>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                <Label htmlFor="addresses.fiscal.city">Ciudad</Label>
                <Input id="addresses.fiscal.city" name="addresses.fiscal.city" value={formData.addresses.fiscal.city} onChange={handleChange} className="bg-black/20 border-white/10"/>
              </div>
              <div>
                <Label htmlFor="addresses.fiscal.postalCode">Código Postal</Label>
                <Input id="addresses.fiscal.postalCode" name="addresses.fiscal.postalCode" value={formData.addresses.fiscal.postalCode} onChange={handleChange} className="bg-black/20 border-white/10"/>
              </div>
            </div>
          </div>
        );
      case 4:
         return (
           <div className="space-y-4">
            <div>
              <Label htmlFor="commercial.paymentMethod">Método de Pago</Label>
              <Select name="commercial.paymentMethod" onValueChange={(value) => handleSelectChange('commercial.paymentMethod', value)} value={formData.commercial.paymentMethod}>
                <SelectTrigger className="bg-black/20 border-white/10"><SelectValue placeholder="Selecciona un método" /></SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10">
                  <SelectItem value="prepaid">Adelantado</SelectItem>
                  <SelectItem value="credit_account">Cuenta Corriente</SelectItem>
                  <SelectItem value="check_on_delivery">Cheque contra entrega</SelectItem>
                  <SelectItem value="transfer">Transferencia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.commercial.paymentMethod === 'credit_account' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div>
                  <Label htmlFor="commercial.creditDays">Días de Crédito</Label>
                  <Input id="commercial.creditDays" name="commercial.creditDays" type="number" value={formData.commercial.creditDays} onChange={handleChange} className="bg-black/20 border-white/10"/>
                </div>
                 <div>
                  <Label htmlFor="commercial.creditLimit">Límite de Crédito</Label>
                  <Input id="commercial.creditLimit" name="commercial.creditLimit" type="number" value={formData.commercial.creditLimit} onChange={handleChange} className="bg-black/20 border-white/10"/>
                </div>
              </motion.div>
            )}
           </div>
         );
      case 5:
        return (
          <div className="flex items-center space-x-2 pt-4">
            <Switch id="electronicInvoicing.enabled" name="electronicInvoicing.enabled" checked={formData.electronicInvoicing.enabled} onCheckedChange={(checked) => handleSelectChange('electronicInvoicing.enabled', checked)} />
            <Label htmlFor="electronicInvoicing.enabled">Facturación Electrónica Habilitada</Label>
          </div>
        );
      case 6:
        return (
          <div className="text-center text-muted-foreground py-10">
            <p>Aquí se implementará la carga de documentos para el análisis crediticio.</p>
            <p className="text-sm">(Ej: Balances, referencias bancarias, etc.)</p>
          </div>
        );
      default:
        return null;
    }
  };

  const CurrentIcon = steps[currentStep - 1].icon;

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-lg w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                  <CurrentIcon className="h-6 w-6 text-primary" />
                  <span>{steps[currentStep - 1].title}</span>
              </CardTitle>
              <CardDescription>
                Paso {currentStep} de {steps.length} - {mode === 'create' ? 'Creando nuevo cliente' : `Editando ${client?.companyInfo?.businessName || 'cliente'}`}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 pt-1">
              {steps.map((step) => (
                <div key={step.id} className={`h-2 rounded-full transition-all duration-300 ${currentStep >= step.id ? 'bg-primary' : 'bg-muted/30'} ${currentStep === step.id ? 'w-8' : 'w-4'}`} />
              ))}
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="min-h-[250px] py-4">
              <StepContent />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center mt-6 border-t border-white/10 pt-4">
          <Button variant="outline" onClick={onCancel}>Cancelar</Button>
          <div className="flex gap-2">
            {currentStep > 1 && (
              <Button variant="ghost" onClick={handlePrev}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
            )}
            {currentStep < steps.length ? (
              <Button onClick={handleNext}>
                Siguiente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={() => onSave(formData)}>
                {mode === 'create' ? 'Guardar Cliente' : 'Guardar Cambios'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
