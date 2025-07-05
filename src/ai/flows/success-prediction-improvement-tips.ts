'use server';
/**
 * @fileOverview An AI agent that analyzes a drafted proposal and provides a 'success likelihood' score with actionable feedback.
 *
 * - analyzeProposal - A function that handles the proposal analysis process.
 * - AnalyzeProposalInput - The input type for the analyzeProposal function.
 * - AnalyzeProposalOutput - The return type for the analyzeProposal function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeProposalInputSchema = z.object({
  proposalText: z
    .string()
    .describe('The text of the drafted proposal to be analyzed.'),
  funderPriorities: z
    .string()
    .describe(
      'A description of the funder priorities to be used for alignment analysis.'
    ),
  pastSuccessfulProposals: z
    .string()
    .describe(
      'A collection of past successful proposals that the AI can use for comparison and advice.'
    ),
});
export type AnalyzeProposalInput = z.infer<typeof AnalyzeProposalInputSchema>;

const AnalyzeProposalOutputSchema = z.object({
  successLikelihood: z
    .number()
    .describe(
      'A score between 0 and 1 indicating the likelihood of the proposal success.'
    ),
  feedback: z
    .string()
    .describe(
      'Actionable feedback on the proposal based on clarity, coherence, alignment with funder priorities, and completeness.'
    ),
});
export type AnalyzeProposalOutput = z.infer<typeof AnalyzeProposalOutputSchema>;

export async function analyzeProposal(
  input: AnalyzeProposalInput
): Promise<AnalyzeProposalOutput> {
  return analyzeProposalFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeProposalPrompt',
  input: {schema: AnalyzeProposalInputSchema},
  output: {schema: AnalyzeProposalOutputSchema},
  prompt: `You are an AI grant proposal analyst. You will analyze the provided proposal text and provide a success likelihood score between 0 and 1, and feedback to the user.

Consider the clarity, coherence, alignment with funder priorities, and completeness when generating the feedback. Give specific, actionable advice to improve the proposal.

Proposal Text: {{{proposalText}}}

Funder Priorities: {{{funderPriorities}}}

Past Successful Proposals: {{{pastSuccessfulProposals}}}`,
});

const analyzeProposalFlow = ai.defineFlow(
  {
    name: 'analyzeProposalFlow',
    inputSchema: AnalyzeProposalInputSchema,
    outputSchema: AnalyzeProposalOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
