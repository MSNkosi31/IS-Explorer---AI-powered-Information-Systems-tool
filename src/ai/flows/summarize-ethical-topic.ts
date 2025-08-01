'use server';

/**
 * @fileOverview Summarizes an ethical topic using AI.
 *
 * - summarizeEthicalTopic - A function that summarizes the ethical topic.
 * - SummarizeEthicalTopicInput - The input type for the summarizeEthicalTopic function.
 * - SummarizeEthicalTopicOutput - The return type for the summarizeEthicalTopic function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import * as fs from 'fs';
import path from 'path';

const SummarizeEthicalTopicInputSchema = z.object({
  topic: z.string().describe('The ethical topic to summarize.'),
});
export type SummarizeEthicalTopicInput = z.infer<
  typeof SummarizeEthicalTopicInputSchema
>;

const SummarizeEthicalTopicOutputSchema = z.object({
  summary: z.string().describe('The summary of the ethical topic.'),
});
export type SummarizeEthicalTopicOutput = z.infer<
  typeof SummarizeEthicalTopicOutputSchema
>;

export async function summarizeEthicalTopic(
  input: SummarizeEthicalTopicInput
): Promise<SummarizeEthicalTopicOutput> {
  return summarizeEthicalTopicFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeEthicalTopicPrompt',
  input: {schema: SummarizeEthicalTopicInputSchema},
  output: {schema: SummarizeEthicalTopicOutputSchema},
  prompt: `You are an expert in ethical issues in technology. Your job is to summarize the key concepts and issues of the following topic.

Topic: {{{topic}}}

First, read the contents of these PDFs to learn more about the topic. They are located in the base_data folder.
{{#each pdfFileNames}}
  {{this}}
{{/each}}

Then, summarize the topic using that information. Please only include facts from the PDF and do not include any external knowledge.

Summary:`, 
  
});

const summarizeEthicalTopicFlow = ai.defineFlow(
  {
    name: 'summarizeEthicalTopicFlow',
    inputSchema: SummarizeEthicalTopicInputSchema,
    outputSchema: SummarizeEthicalTopicOutputSchema,
  },
  async input => {
    // read file names in base_data folder
    const directoryPath = path.join(process.cwd(), 'base_data');

    const pdfFileNames = fs.readdirSync(directoryPath).map(fileName => 'base_data/' + fileName);
    
    const {output} = await prompt({...input, pdfFileNames});
    return output!;
  }
);
