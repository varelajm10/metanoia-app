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
  locale: z.string().optional().describe('The language for the response (e.g., "en", "es").')
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
  async ({ history, query, locale }) => {
    const lang = locale === 'en' ? 'English' : 'Spanish';
    const languageInstruction = `You must respond in ${lang}.`;

    const systemInstruction = `You are Metanoia.Click's AI Assistant, an expert in business data analysis. You are helpful, friendly, and concise. Your goal is to answer user questions about their business data. If you don't have enough context from the conversation, ask clarifying questions. The user is currently viewing a dashboard in the Metanoia.click platform. ${languageInstruction}`;
    
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
