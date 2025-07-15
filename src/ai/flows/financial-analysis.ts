'use server';

/**
 * @fileOverview Financial analysis AI agent for CFO-level insights.
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
    .describe('The current financial data to be analyzed, like P&L, cash flow, balance sheets.'),
});
export type FinancialAnalysisInput = z.infer<typeof FinancialAnalysisInputSchema>;

const FinancialAnalysisOutputSchema = z.object({
  balances: z.string().describe('The generated balance sheets and key financial statements.'),
  reports: z.string().describe('Generated reports, including variance analysis and key performance indicators (KPIs).'),
  executiveSummary: z.string().describe("An executive summary highlighting trends, anomalies, and strategic recommendations."),
});
export type FinancialAnalysisOutput = z.infer<typeof FinancialAnalysisOutputSchema>;

export async function financialAnalysis(input: FinancialAnalysisInput): Promise<FinancialAnalysisOutput> {
  return financialAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialAnalysisPrompt',
  input: {schema: FinancialAnalysisInputSchema},
  output: {schema: FinancialAnalysisOutputSchema},
  prompt: `You are a world-class CFO AI assistant. Your user is a demanding, high-level executive who needs clear, concise, and actionable financial intelligence.
Analyze the provided financial data. Generate standard financial statements (balances, P&L). Then, create insightful reports identifying key trends, budget variances, and performance anomalies.
Most importantly, produce a sharp, direct Executive Summary. This summary must highlight critical insights and provide concrete, strategic recommendations. Do not use fluff or vague language. Focus on what matters for profitability, cash flow, and risk management.

Financial Data:
{{{financialData}}}
`,
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
