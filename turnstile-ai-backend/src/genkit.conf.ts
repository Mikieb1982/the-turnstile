import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

const plugins = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  ? [
      googleAI({
        apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? ''
      })
    ]
  : [];

export const ai = genkit({
  plugins
});
