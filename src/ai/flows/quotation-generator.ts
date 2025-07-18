'use server';

/**
 * @fileOverview B2B sales quotation generation AI agent.
 *
 * - generateQuotation - A function that generates a formal B2B sales quotation.
 * - GenerateQuotationInput - The input type for the generateQuotation function.
 * - GenerateQuotationOutput - The return type for the generateQuotation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

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


export async function generateQuotation(input: GenerateQuotationInput): Promise<GenerateQuotationOutput> {
  return quotationGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'quotationGeneratorPrompt',
  input: { schema: GenerateQuotationInputSchema },
  output: { schema: GenerateQuotationOutputSchema },
  prompt: `Eres un asistente de ventas experto en la creación de cotizaciones B2B para Metanoia.click, una empresa de software de IA con sede en Argentina.
Tu tarea es generar una cotización formal, clara y completa en formato Markdown a partir de los datos estructurados proporcionados.

**Instrucciones Clave:**
1.  **Encabezado:** Incluye un título claro, número de cotización (generado aleatoriamente como 'COT-XXXX'), fecha actual, y los datos del cliente.
2.  **Tabla de Ítems:** Crea una tabla en Markdown con las columnas: 'Descripción', 'Cantidad', 'Precio Unitario', 'Subtotal'.
3.  **Cálculos:** Calcula el subtotal por cada ítem (Cantidad * Precio Unitario). Calcula el Total final.
4.  **Formato de Moneda:** Formatea todos los montos con el símbolo de la moneda (USD o ARS) y separadores de miles.
5.  **Condiciones Comerciales:** Presenta las condiciones de forma clara y ordenada.
6.  **Tono:** El tono debe ser profesional, formal y cortés, adaptado a un cliente PyME en Argentina.
7.  **Notas:** Si se proporcionan notas, inclúyelas al final.
8.  **Output:** Genera únicamente el texto de la cotización en Markdown en el campo 'quotationText'. Calcula el 'totalAmount' numérico y devuelve la 'currency'.

**Datos de la Cotización:**
- **Cliente:** {{{clientName}}}, {{{clientCompany}}}
- **Moneda:** {{{currency}}}
- **Ítems:**
{{#each items}}
  - {{name}}: Cantidad {{quantity}}, Precio Unitario {{unitPrice}}
{{/each}}
- **Condiciones:**
  - Plazo de Pago: {{{conditions.paymentTerms}}}
  - Plazo de Entrega: {{{conditions.deliveryTime}}}
  - Validez de la oferta: {{{conditions.validityDays}}} días
- **Notas Adicionales:** {{{notes}}}

Genera la cotización ahora.
`,
});

const quotationGeneratorFlow = ai.defineFlow(
  {
    name: 'quotationGeneratorFlow',
    inputSchema: GenerateQuotationInputSchema,
    outputSchema: GenerateQuotationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
