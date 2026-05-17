
'use server';
/**
 * @fileOverview An AI-powered project idea generator.
 *
 * - generateProjectIdea - A function that handles project idea generation.
 * - ProjectIdeaInput - The input type for the generateProjectIdea function.
 * - ProjectIdeaOutput - The return type for the generateProjectIdea function.
 */

import {ai} from '@/ai/ai-instance'; // Use ai-instance
import {z} from 'genkit';
import {gemini15Flash} from '@genkit-ai/googleai';

const ProjectIdeaInputSchema = z.object({
  keywords: z.string().min(3, { message: "Please enter at least 3 characters for keywords."}).describe('Keywords or topics provided by the user to inspire a project idea.'),
});
export type ProjectIdeaInput = z.infer<typeof ProjectIdeaInputSchema>;

const ProjectIdeaOutputSchema = z.object({
  idea: z.string().describe('A concise and creative project idea (around 2-3 sentences) based on the keywords.'),
  technologies: z.array(z.string()).length(3).describe('A list of exactly 3 suggested technologies or tools relevant to the idea and the user\'s focus (AI/ML, Full-Stack).'),
  title: z.string().describe('A catchy title for the project idea.'),
});
export type ProjectIdeaOutput = z.infer<typeof ProjectIdeaOutputSchema>;

export async function generateProjectIdea(input: ProjectIdeaInput): Promise<ProjectIdeaOutput> {
  // Input validation is handled by Zod in the component calling this.
  // If this function were called directly from an untrusted source,
  // you might add schema.parse(input) here.
  return projectIdeaFlow(input);
}

const projectIdeaPrompt = ai.definePrompt({
  name: 'projectIdeaPrompt',
  input: {schema: ProjectIdeaInputSchema},
  output: {schema: ProjectIdeaOutputSchema},
  model: gemini15Flash,
  prompt: `You are an expert AI assistant helping a Computer Science student brainstorm project ideas.
The student is Shreyan, who is passionate about AI/ML, Full-Stack Development, and Open Source.
Given the keywords: {{{keywords}}}, generate:
1. A catchy title for the project idea.
2. A concise and creative project idea (around 2-3 sentences).
3. Suggest exactly 3 relevant technologies or tools to build it, keeping Shreyan's interests in mind.

Focus on ideas that are innovative and achievable for a student project.
Output should be in the specified JSON format.
Keywords: {{{keywords}}}`,
  config: {
    temperature: 0.8, // Add some creativity
  }
});

const projectIdeaFlow = ai.defineFlow(
  {
    name: 'projectIdeaFlow',
    inputSchema: ProjectIdeaInputSchema,
    outputSchema: ProjectIdeaOutputSchema,
  },
  async (input) => {
    const {output} = await projectIdeaPrompt(input);
    if (!output) {
        throw new Error('Failed to generate project idea. The AI model did not return an output.');
    }
    return output;
  }
);
