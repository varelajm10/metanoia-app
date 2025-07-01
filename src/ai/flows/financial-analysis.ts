'use server';

/**
 * @fileOverview Financial analysis AI agent.
 *
 * - financialAnalysis - A function that handles the financial analysis process.
 * - FinancialAnalysisInput - The input type for the financialAnalysis function.
 * - FinancialAnalysisOutput - The return type for the financialAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialAnalysisInputSchema = z.object({
  financialData: z
    .string()
    .describe('The current financial data to be analyzed.'),
});
export type FinancialAnalysisInput = z.infer<typeof FinancialAnalysisInputSchema>;

const FinancialAnalysisOutputSchema = z.object({
  balances: z.string().describe('The generated balances.'),
  reports: z.string().describe('The generated reports.'),
});
export type FinancialAnalysisOutput = z.infer<typeof FinancialAnalysisOutputSchema>;

export async function financialAnalysis(input: FinancialAnalysisInput): Promise<FinancialAnalysisOutput> {
  return financialAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialAnalysisPrompt',
  input: {schema: FinancialAnalysisInputSchema},
  output: {schema: FinancialAnalysisOutputSchema},
  prompt: `You are an expert financial analyst. Examine the current financial data and automatically generate balances and reports. 

Financial Data: {{{financialData}}}`,
});

const financialAnalysisFlow = ai.defineFlow(
  {
    name: 'financialAnalysisFlow',
    inputSchema: FinancialAnalysisInputSchema,
    outputSchema: FinancialAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
