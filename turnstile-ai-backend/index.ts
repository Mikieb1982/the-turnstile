import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { defineFlow, startFlowsServer } from '@genkit-ai/flow';
import { generate } from '@genkit-ai/ai';
import * as z from 'zod';

const ai = genkit({
  plugins: [
    googleAI(),
  ],
  logSinks: [process.env.NODE_ENV === 'dev' ? 'long' : 'short'],
  enableTracingAndMetrics: true,
      "@genkit-ai/ai": "^1.21.0",
    "@genkit-ai/flow": "^1.21.0",
});

export const funFactFlow = defineFlow(
  ai.registry,
  {
    name: 'funFactFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (topic) => {
    const llmResponse = await generate(ai.registry, {
      prompt: `Tell me a fun fact about ${topic} in rugby league.`,
      model: 'gemini-1.5-flash',
      config: {
        temperature: 0.7,
      },
    });

    return llmResponse.text();
  }
);

startFlowsServer(ai);
