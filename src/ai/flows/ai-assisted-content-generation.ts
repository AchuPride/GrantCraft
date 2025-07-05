'use server';
/**
 * @fileOverview This file defines a Genkit flow for AI-assisted content generation to help grant writers.
 *
 * - aiAssistedContentGeneration - A function that leverages generative AI to draft proposal sections.
 * - AiAssistedContentGenerationInput - The input type for the aiAssistedContentGeneration function.
 * - AiAssistedContentGenerationOutput - The return type for the aiAssistedContentGeneration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiAssistedContentGenerationInputSchema = z.object({
  sectionType: z.enum([
    'problemStatement',
    'objectives',
    'budgetJustification',
    'executiveSummary',
    'abstract',
    'methodology'
  ]).describe('The type of proposal section to generate.'),
  keywords: z.string().describe('Keywords related to the proposal.'),
  projectSummary: z.string().describe('A summary of the project.'),
});
export type AiAssistedContentGenerationInput = z.infer<typeof AiAssistedContentGenerationInputSchema>;

const AiAssistedContentGenerationOutputSchema = z.object({
  generatedContent: z.string().describe('The AI-generated content for the specified proposal section.'),
});
export type AiAssistedContentGenerationOutput = z.infer<typeof AiAssistedContentGenerationOutputSchema>;

export async function aiAssistedContentGeneration(input: AiAssistedContentGenerationInput): Promise<AiAssistedContentGenerationOutput> {
  return aiAssistedContentGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiAssistedContentGenerationPrompt',
  input: {schema: AiAssistedContentGenerationInputSchema},
  output: {schema: AiAssistedContentGenerationOutputSchema},
  prompt: `You are an AI assistant helping grant writers draft compelling proposal sections.

  Based on the provided keywords and project summary, generate content for the specified section type.

  Section Type: {{{sectionType}}}
  Keywords: {{{keywords}}}
  Project Summary: {{{projectSummary}}}

  Your generated content should be persuasive, well-structured, and tailored to the section type.`,
});

const aiAssistedContentGenerationFlow = ai.defineFlow(
  {
    name: 'aiAssistedContentGenerationFlow',
    inputSchema: AiAssistedContentGenerationInputSchema,
    outputSchema: AiAssistedContentGenerationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
