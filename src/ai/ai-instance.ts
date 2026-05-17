
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Ensure GOOGLE_GENAI_API_KEY is set in your environment
if (!process.env.GOOGLE_GENAI_API_KEY) {
  console.warn(
    'GOOGLE_GENAI_API_KEY is not set. Genkit AI features may not work.'
  );
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
      // You can specify API version, etc. here if needed
    }),
  ],
  // Removed promptDir as prompts are defined directly in flows
  // model: 'googleai/gemini-1.5-flash-latest', // Explicitly set a default model if desired, or rely on per-prompt model
  // Default log level is 'info', can be 'debug' for more verbosity
  // logLevel: 'info', 
});
