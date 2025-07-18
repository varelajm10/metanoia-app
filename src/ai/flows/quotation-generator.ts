
'use server';

/**
 * @fileOverview B2B sales quotation generation AI agent.
 *
 * - generateQuotation - A function that generates a formal B2B sales quotation.
 */

import { ai } from '@/ai/genkit';
import { GenerateQuotationInput, GenerateQuotationInputSchema, GenerateQuotationOutput, GenerateQuotationOutputSchema } from '@/ai/schemas/quotation-schema';


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
