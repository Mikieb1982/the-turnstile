import { configureGenkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { defineFlow, startFlowsServer, generate } from 'genkit';
import * as z from 'zod';

configureGenkit({
  plugins: [
    googleAI(),
  ],
  logSinks: [process.env.NODE_ENV === 'dev' ? 'long' : 'short'],
  enableTracingAndMetrics: true,
});

export const funFactFlow = defineFlow(
  {
    name: 'funFactFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (topic) => {
    const llmResponse = await generate({
      prompt: `Tell me a fun fact about ${topic} in rugby league.`,
      model: 'gemini-1.5-flash',
      config: {
        temperature: 0.7,
      },
    });

    return llmResponse.text();
  }
);

startFlowsServer();