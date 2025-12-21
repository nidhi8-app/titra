import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import * as dotenv from 'dotenv';

dotenv.config();

const plugins = [];

if (process.env.GEMINI_API_KEY) {
  plugins.push(googleAI());
} else {
  console.warn(
    'GEMINI_API_KEY is not set. AI-powered features will be disabled. Please set it in your .env file.'
  );
}

export const ai = genkit({
  plugins: plugins,
  model: 'googleai/gemini-2.5-flash',
});
