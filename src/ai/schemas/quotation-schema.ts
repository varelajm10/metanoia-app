/**
 * @fileOverview Schemas for the quotation generator.
 */
import { z } from 'zod';

export const GenerateQuotationInputSchema = z.object({
  clientName: z.string().describe("Nombre del contacto principal en la empresa cliente."),
  clientCompany: z.string().describe("Nombre de la empresa cliente."),
  items: z.array(z.object({
    name: z.string().describe("Nombre del producto o servicio."),
    quantity: z.number().describe("Cantidad de unidades."),
    unitPrice: z.number().describe("Precio por unidad."),
  })).min(1, "Debe haber al menos un ítem en la cotización."),
  conditions: z.object({
    paymentTerms: z.string().describe("Ej: Contado, 15 días, etc."),
    deliveryTime: z.string().describe("Ej: Inmediata, 30 días, etc."),
    validityDays: z.number().describe("Número de días que la cotización es válida."),
  }),
  notes: z.string().optional().describe("Notas adicionales o aclaraciones para el cliente."),
  currency: z.enum(['ARS', 'USD']).default('USD'),
});
export type GenerateQuotationInput = z.infer<typeof GenerateQuotationInputSchema>;

export const GenerateQuotationOutputSchema = z.object({
  quotationText: z.string().describe("La cotización completa generada en formato Markdown, lista para ser renderizada o enviada."),
  totalAmount: z.number().describe("El monto total de la cotización."),
  currency: z.string().describe("La moneda de la cotización (ARS o USD)."),
});
export type GenerateQuotationOutput = z.infer<typeof GenerateQuotationOutputSchema>;
