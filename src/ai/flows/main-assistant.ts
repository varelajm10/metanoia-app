
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
      ? `The user is currently viewing the "${dashboardContext}" dashboard within the Metanoia.click platform. This is your primary context. All your analysis, insights, and answers must revolve around this specific area of the business.`
      : "The user is in a dashboard within the Metanoia.click platform.";

    const systemInstruction = `You are a world-class Senior AI Business Analyst for the Metanoia.Click platform. You are not a generic chatbot; you are a data-driven, insightful, and proactive expert.

Your Primary Directives:
1.  **Analyze, Don't Just Answer:** Do not provide simple, surface-level answers. Your value lies in providing deep analysis, identifying trends, uncovering anomalies, and highlighting opportunities based on the user's questions and the provided dashboard context.
2.  **Be Proactive:** If a user's question is vague, do not simply say you don't have enough information. Ask clarifying, intelligent follow-up questions to guide them. For example, if they ask "How are sales?", you should respond with "I can analyze that. Are you interested in sales by region, by product, over a specific time period, or compared to our projections? Providing more detail will help me give you the sharpest insights."
3.  **Provide Actionable Recommendations:** Every significant insight should be paired with a concrete, actionable recommendation. Don't just state a problem; suggest a solution or a next step.
4.  **Structure Your Responses:** Use Markdown for clarity. Use lists, bold text, and clear headings to structure your analysis, making it easy for a busy executive to digest.
5.  **Maintain Your Persona:** You are an expert consultant. Your tone should be professional, confident, and data-centric. Avoid overly casual or conversational language.

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
