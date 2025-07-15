'use server';

/**
 * @fileOverview AI agent for predicting employee retention risk.
 * 
 * - predictRetention: Analyzes employee data to predict retention risk.
 * - RetentionPredictionInput: The input type for the predictRetention function.
 * - RetentionPredictionOutput: The return type for the predictRetention function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RetentionPredictionInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    position: z.string().describe("The employee's current job title."),
    department: z.string().describe("The department the employee works in."),
    hireDate: z.string().describe("The date the employee was hired (ISO format)."),
    salary: z.number().describe("The employee's current annual salary in USD."),
    performance: z.number().describe("The employee's latest performance score, on a scale of 1 to 5."),
});
export type RetentionPredictionInput = z.infer<typeof RetentionPredictionInputSchema>;

const RetentionPredictionOutputSchema = z.object({
    riskLevel: z.enum(["Bajo", "Medio", "Alto"]).describe("The predicted retention risk level for the employee."),
    keyFactors: z.string().describe("A brief summary of the key factors influencing the risk assessment."),
    recommendations: z.string().describe("Specific, actionable recommendations for the HR manager to improve retention for this employee."),
});
export type RetentionPredictionOutput = z.infer<typeof RetentionPredictionOutputSchema>;

export async function predictRetention(input: RetentionPredictionInput): Promise<RetentionPredictionOutput> {
    return retentionPredictionFlow(input);
}

const prompt = ai.definePrompt({
    name: 'retentionPredictionPrompt',
    input: { schema: RetentionPredictionInputSchema },
    output: { schema: RetentionPredictionOutputSchema },
    prompt: `You are an expert HR analyst specializing in talent retention and predictive analytics.
Analyze the following employee data to assess their retention risk.

- Position: {{{position}}}
- Department: {{{department}}}
- Hire Date: {{{hireDate}}}
- Salary (USD): {{{salary}}}
- Performance Score (1-5): {{{performance}}}

Based on this data, determine a risk level (Bajo, Medio, Alto).
Identify the key factors contributing to this risk (e.g., "High performer with stagnant salary", "Relatively new hire in a high-turnover department").
Provide concrete, actionable recommendations for the HR Manager to proactively address the situation (e.g., "Consider a salary review and market comparison", "Schedule a career development conversation", "Assign a challenging new project to increase engagement").
`,
});


const retentionPredictionFlow = ai.defineFlow(
    {
        name: 'retentionPredictionFlow',
        inputSchema: RetentionPredictionInputSchema,
        outputSchema: RetentionPredictionOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
