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

export const MainAssistantInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  query: z.string().describe('The latest user query.'),
});
export type MainAssistantInput = z.infer<typeof MainAssistantInputSchema>;

export const MainAssistantOutputSchema = z.object({
  response: z.string().describe('The AI assistant\'s response.'),
});
export type MainAssistantOutput = z.infer<typeof MainAssistantOutputSchema>;

export async function mainAssistant(input: MainAssistantInput): Promise<MainAssistantOutput> {
  return mainAssistantFlow(input);
}

const mainAssistantFlow = ai.defineFlow(
  {
    name: 'mainAssistantFlow',
    inputSchema: MainAssistantInputSchema,
    outputSchema: MainAssistantOutputSchema,
  },
  async ({ history, query }) => {
    const messages: any[] = [
      {
        role: 'user', content: [{ text: "SYSTEM INSTRUCTION: You are Metanoia.Click's AI Assistant, an expert in business data analysis. You are helpful, friendly, and concise. Your goal is to answer user questions about their business data. If you don't have enough context from the conversation, ask clarifying questions. The user is currently viewing a dashboard in the Metanoia.click platform." }]
      },
      {
        role: 'model', content: [{ text: "Understood. I am ready to assist." }]
      },
      ...history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        content: [{ text: msg.content }],
      })),
      {
        role: 'user', content: [{ text: query }]
      }
    ];

    const llmResponse = await ai.generate({
      prompt: messages,
    });

    return { response: llmResponse.text };
  }
);
