'use server';
/**
 * @fileOverview Provides AI-driven business intelligence through dashboards and data analysis.
 *
 * - generateBusinessIntelligence - A function that generates insightful business intelligence reports and dashboards.
 * - BusinessIntelligenceInput - The input type for the generateBusinessIntelligence function.
 * - BusinessIntelligenceOutput - The return type for the generateBusinessIntelligence function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BusinessIntelligenceInputSchema = z.object({
  financialData: z.string().describe('The financial data for analysis.'),
  marketTrends: z.string().describe('The current market trends data.'),
  customerData: z.string().describe('The customer data for analysis.'),
});
export type BusinessIntelligenceInput = z.infer<typeof BusinessIntelligenceInputSchema>;

const BusinessIntelligenceOutputSchema = z.object({
  dashboardSummary: z.string().describe('A summary of the key insights from the dashboard.'),
  recommendations: z.string().describe('Actionable recommendations based on the analysis.'),
});
export type BusinessIntelligenceOutput = z.infer<typeof BusinessIntelligenceOutputSchema>;

export async function generateBusinessIntelligence(input: BusinessIntelligenceInput): Promise<BusinessIntelligenceOutput> {
  return businessIntelligenceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'businessIntelligencePrompt',
  input: {schema: BusinessIntelligenceInputSchema},
  output: {schema: BusinessIntelligenceOutputSchema},
  prompt: `You are an AI assistant specializing in business intelligence. Analyze the provided data and generate a dashboard summary and actionable recommendations.

Financial Data: {{{financialData}}}
Market Trends: {{{marketTrends}}}
Customer Data: {{{customerData}}}

Based on this data, provide a dashboard summary highlighting key insights and offer actionable recommendations to improve business performance.`,
});

const businessIntelligenceFlow = ai.defineFlow(
  {
    name: 'businessIntelligenceFlow',
    inputSchema: BusinessIntelligenceInputSchema,
    outputSchema: BusinessIntelligenceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
