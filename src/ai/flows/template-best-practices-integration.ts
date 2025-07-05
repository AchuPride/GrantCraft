// src/ai/flows/template-best-practices-integration.ts
'use server';

/**
 * @fileOverview Implements AI-driven suggestions for phrasing and structure based on successful past proposals.
 *
 * - suggestImprovements - Provides suggestions for proposal improvement.
 * - SuggestImprovementsInput - Input type for the suggestImprovements function.
 * - SuggestImprovementsOutput - Output type for the suggestImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestImprovementsInputSchema = z.object({
  proposalSection: z
    .string()
    .describe('The specific section of the proposal to be improved.'),
  pastSuccessfulProposals: z
    .string()
    .describe('A database of past successful proposals.'),
});
export type SuggestImprovementsInput = z.infer<typeof SuggestImprovementsInputSchema>;

const SuggestImprovementsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'AI-generated suggestions for improving the phrasing and structure of the proposal section, based on analysis of successful past proposals.'
    ),
});
export type SuggestImprovementsOutput = z.infer<typeof SuggestImprovementsOutputSchema>;

export async function suggestImprovements(input: SuggestImprovementsInput): Promise<SuggestImprovementsOutput> {
  return suggestImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestImprovementsPrompt',
  input: {schema: SuggestImprovementsInputSchema},
  output: {schema: SuggestImprovementsOutputSchema},
  prompt: `You are an AI assistant that provides suggestions for improving proposal sections based on successful past proposals.

  Analyze the following proposal section:
  {{proposalSection}}

  Using insights from this database of past successful proposals:
  {{pastSuccessfulProposals}}

  Provide specific and actionable suggestions for improving the phrasing, structure, and overall quality of the proposal section to increase its chances of success.
  Give detailed improvement suggestions to the user.
  `, 
});

const suggestImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestImprovementsFlow',
    inputSchema: SuggestImprovementsInputSchema,
    outputSchema: SuggestImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
