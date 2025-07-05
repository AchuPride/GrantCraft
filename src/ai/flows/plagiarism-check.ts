'use server';
/**
 * @fileOverview An AI agent that checks a given text for potential plagiarism.
 *
 * - plagiarismCheck - A function that analyzes text for similarities to public sources.
 * - PlagiarismCheckInput - The input type for the plagiarismCheck function.
 * - PlagiarismCheckOutput - The return type for the plagiarismCheck function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PlagiarismCheckInputSchema = z.object({
  text: z.string().describe('The text to be checked for plagiarism.'),
});
export type PlagiarismCheckInput = z.infer<typeof PlagiarismCheckInputSchema>;

const PlagiarismSourceSchema = z.object({
  url: z.string().describe('The URL of the potential source.'),
  snippet: z.string().describe('The matching text snippet from the source.'),
  similarity: z.number().min(0).max(1).describe('The similarity score between the input text and the source snippet.')
});

const PlagiarismCheckOutputSchema = z.object({
  overallScore: z.number().min(0).max(1).describe('An overall plagiarism score from 0 (original) to 1 (fully plagiarized).'),
  sources: z.array(PlagiarismSourceSchema).describe('A list of potential sources if plagiarism is detected.'),
});
export type PlagiarismCheckOutput = z.infer<typeof PlagiarismCheckOutputSchema>;

export async function plagiarismCheck(input: PlagiarismCheckInput): Promise<PlagiarismCheckOutput> {
  return plagiarismCheckFlow(input);
}

const prompt = ai.definePrompt({
  name: 'plagiarismCheckPrompt',
  input: {schema: PlagiarismCheckInputSchema},
  output: {schema: PlagiarismCheckOutputSchema},
  prompt: `You are a sophisticated plagiarism detection tool. Analyze the following text for any content that appears to be copied from public web sources.

  Text to analyze:
  {{{text}}}

  Your task is to:
  1.  Provide an 'overallScore' from 0 to 1, where 0 indicates completely original content and 1 indicates a direct copy from a source. A higher score means more of the text is likely plagiarized.
  2.  If potential plagiarism is found, identify the sources. For each source, provide the URL, the matching text 'snippet', and a 'similarity' score for that specific snippet.
  3.  If no plagiarism is detected, return an 'overallScore' of 0 and an empty 'sources' array.
  
  Be thorough in your analysis.`,
});

const plagiarismCheckFlow = ai.defineFlow(
  {
    name: 'plagiarismCheckFlow',
    inputSchema: PlagiarismCheckInputSchema,
    outputSchema: PlagiarismCheckOutputSchema,
  },
  async input => {
    if (!input.text.trim()) {
        return { overallScore: 0, sources: [] };
    }
    const {output} = await prompt(input);
    return output!;
  }
);
