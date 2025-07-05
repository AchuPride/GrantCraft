'use server';
/**
 * @fileOverview An AI agent that matches grant proposals to funding opportunities.
 *
 * - matchGrants - A function that takes a proposal abstract and finds relevant grants.
 * - GrantMatcherInput - The input type for the matchGrants function.
 * - GrantMatcherOutput - The return type for the matchGrants function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Grant, mockGrants } from '@/lib/grants-data';

const GrantSchema = z.object({
  id: z.string(),
  title: z.string(),
  funder: z.string(),
  description: z.string(),
  amount: z.number(),
  deadline: z.string(),
  categories: z.array(z.string()),
});

const GrantMatcherInputSchema = z.object({
  proposalAbstract: z.string().describe('The abstract of the grant proposal.'),
  availableGrants: z.array(GrantSchema).describe('A list of available grants to match against.'),
});
export type GrantMatcherInput = z.infer<typeof GrantMatcherInputSchema>;

const MatchedGrantSchema = GrantSchema.extend({
    matchScore: z.number().min(0).max(1).describe('A score from 0 to 1 indicating the relevance of the grant.'),
    justification: z.string().describe('A brief explanation of why this grant is a good match.'),
});
export type MatchedGrant = z.infer<typeof MatchedGrantSchema>;

const GrantMatcherOutputSchema = z.object({
  matchedGrants: z.array(MatchedGrantSchema).describe('A list of grants that are a good match for the proposal.'),
});
export type GrantMatcherOutput = z.infer<typeof GrantMatcherOutputSchema>;


export async function matchGrants(input: { proposalAbstract: string }): Promise<GrantMatcherOutput> {
  // In a real app, grants would be fetched from a DB. Here we use mock data.
  return grantMatcherFlow({
    proposalAbstract: input.proposalAbstract,
    availableGrants: mockGrants,
  });
}

const prompt = ai.definePrompt({
  name: 'grantMatcherPrompt',
  input: { schema: GrantMatcherInputSchema },
  output: { schema: GrantMatcherOutputSchema },
  prompt: `You are an expert grant matching AI. Your task is to analyze a grant proposal abstract and a list of available grants, then identify the most relevant funding opportunities.

  Proposal Abstract:
  {{{proposalAbstract}}}

  Available Grants:
  {{#each availableGrants}}
  - ID: {{id}}, Title: {{title}}, Funder: {{funder}}, Description: {{description}}, Categories: {{#each categories}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  {{/each}}

  Analyze the proposal abstract and compare it against each grant's description, funder, and categories.
  
  For each grant you identify as a strong match, provide:
  1. All original grant data.
  2. A 'matchScore' from 0 (not a match) to 1 (perfect match), reflecting how well the grant aligns with the proposal.
  3. A concise 'justification' (1-2 sentences) explaining the reasoning for the match.

  Return a list of the top 3-5 most relevant grants, sorted by matchScore in descending order. If no grants are a good match, return an empty list.
  `,
});

const grantMatcherFlow = ai.defineFlow(
  {
    name: 'grantMatcherFlow',
    inputSchema: GrantMatcherInputSchema,
    outputSchema: GrantMatcherOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
