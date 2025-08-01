
'use server';
/**
 * @fileOverview A general-purpose AI assistant for the dashboards.
 *
 * - mainAssistant - A function that handles chat conversations.
 * - MainAssistantInput - The input type for the mainAssistant function.
 * - MainAssistantOutput - The return type for the mainAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const MainAssistantInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  query: z.string().describe('The latest user query.'),
  locale: z.string().optional().describe('The language for the response (e.g., "en", "es").'),
  dashboardContext: z.string().optional().describe('The context of the dashboard the user is currently viewing.'),
});
export type MainAssistantInput = z.infer<typeof MainAssistantInputSchema>;


type MainAssistantOutput = z.infer<typeof MainAssistantOutputSchema>;
const MainAssistantOutputSchema = z.object({
  response: z.string().describe("The AI assistant's response."),
});

export async function mainAssistant(input: MainAssistantInput): Promise<MainAssistantOutput> {
  return mainAssistantFlow(input);
}

const mainAssistantFlow = ai.defineFlow(
  {
    name: 'mainAssistantFlow',
    inputSchema: MainAssistantInputSchema,
    outputSchema: MainAssistantOutputSchema,
  },
  async ({ history, query, locale, dashboardContext }) => {
    const lang = locale === 'en' ? 'English' : 'Spanish';
    const languageInstruction = `Your entire response must be in ${lang}.`;
    
    const contextInstruction = dashboardContext 
      ? `The user is currently on the "${dashboardContext}" dashboard. Frame your analysis within this context.`
      : "The user is on a dashboard within the Metanoia.click platform.";

    const systemInstruction = `You are a world-class Senior AI Business Analyst for Metanoia.Click. Your persona is data-driven, insightful, and direct. You are a colleague, not a chatbot.

Your Primary Directives:
1.  **Analyze, Don't Just Answer:** Provide deep analysis, identify trends, and uncover anomalies.
2.  **Be Proactive & Concise:** If a user's question is vague (e.g., "how are sales?"), ask clarifying questions to guide them (e.g., "I can analyze that. By region, product, or compared to projections?").
3.  **Actionable Recommendations:** Pair every significant insight with a concrete, actionable recommendation.
4.  **Initial Interaction:** If the user just says "hi" or "hello", your response must be very short and get straight to the point. Example: "Hola. ¿En qué métrica de este dashboard nos enfocamos? Dime qué datos quieres analizar." Do NOT introduce yourself or list what you can do.
5.  **Structure:** Use Markdown (lists, bolding) for clarity when responses are complex.

${contextInstruction}
${languageInstruction}
`;
    
    const messages = [
      ...history.map(msg => ({
        role: msg.role === 'user' ? 'user' : ('model' as const),
        content: [{ text: msg.content }],
      })),
      {
        role: 'user' as const,
        content: [{ text: query }],
      },
    ];

    const llmResponse = await ai.generate({
      system: systemInstruction,
      messages: messages,
    });

    return { response: llmResponse.text };
  }
);
