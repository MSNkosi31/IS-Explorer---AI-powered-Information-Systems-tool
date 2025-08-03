'use server';

/**
 * @fileOverview Summarizes an Information Systems topic using AI.
 *
 * - summarizeIsTopic - A function that summarizes the IS topic.
 * - SummarizeIsTopicInput - The input type for the summarizeIsTopic function.
 * - SummarizeIsTopicOutput - The return type for the summarizeIsTopic function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeIsTopicInputSchema = z.object({
  topic: z.string().describe('The Information Systems topic to summarize.'),
});
export type SummarizeIsTopicInput = z.infer<
  typeof SummarizeIsTopicInputSchema
>;

const SummarizeIsTopicOutputSchema = z.object({
  summary: z.string().describe('The summary of the Information Systems topic.'),
});
export type SummarizeIsTopicOutput = z.infer<
  typeof SummarizeIsTopicOutputSchema
>;

export async function summarizeIsTopic(
  input: SummarizeIsTopicInput
): Promise<SummarizeIsTopicOutput> {
  return summarizeIsTopicFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeIsTopicPrompt',
  input: {schema: z.object({
    topic: z.string(),
  })},
  output: {schema: SummarizeIsTopicOutputSchema},
  prompt: `You are an expert in Information Systems. Your job is to provide a comprehensive and extended summary of the key concepts, theories, and practical applications of the following topic. All content must be in English.

Format your response using HTML. Use <h3> tags for headings. Do not use asterisks for emphasis or lists.

Topic: {{{topic}}}

Summary:`, 
  
});

const summarizeIsTopicFlow = ai.defineFlow(
  {
    name: 'summarizeIsTopicFlow',
    inputSchema: SummarizeIsTopicInputSchema,
    outputSchema: SummarizeIsTopicOutputSchema,
  },
  async (input) => {
    const {output} = await prompt({ topic: input.topic });
    return output!;
  }
);
