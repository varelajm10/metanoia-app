
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
import { getCustomerDataTool } from '../tools/customer-data-tool';

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
1.  **NEVER ask clarifying questions.** If a user's query is ambiguous (e.g., "how are sales?"), you MUST take the initiative. Provide a default, multi-faceted analysis. For example, instead of asking "by region or product?", you must RESPOND with "Here is the sales breakdown by region and top 5 products for the last quarter...".
2.  **GROUND YOUR ANSWERS IN REAL DATA:** If the user asks about metrics (like customer counts, sales, retention), you MUST use the provided tools (e.g., getCustomerData) to fetch REAL data from the database. Do not invent numbers. Base your analysis and recommendations solely on the data returned by the tool. If the tool returns empty or zero values, report that and recommend actions to start gathering that data.
3.  **Analyze, Don't Just Answer:** Provide deep analysis, identify trends, and uncover anomalies. Connect data points to generate insights.
4.  **Actionable Recommendations:** Pair every significant insight with a concrete, actionable recommendation.
5.  **Initial Interaction:** If the user just says "hi" or "hello", your response must be very short and get straight to the point. Example: "Hola. ¿En qué métrica de este dashboard nos enfocamos? Dime qué datos quieres analizar." Do NOT introduce yourself or list what you can do.
6.  **Structure:** Use Markdown (lists, bolding) for clarity when responses are complex.

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
      tools: [getCustomerDataTool]
    });

    return { response: llmResponse.text };
  }
);
