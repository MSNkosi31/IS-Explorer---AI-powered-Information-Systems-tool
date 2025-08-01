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
import * as fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';

const SummarizeIsTopicInputSchema = z.object({
  topic: z.string().describe('The Information Systems topic to summarize.'),
  fileName: z.string().describe('The corresponding file name for the topic.')
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
    context: z.string(),
  })},
  output: {schema: SummarizeIsTopicOutputSchema},
  prompt: `You are an expert in Information Systems. Your job is to provide a comprehensive and extended summary of the key concepts, theories, and practical applications of the following topic, based on the provided context. Make sure to cover the topic in detail.

Topic: {{{topic}}}

Context:
{{{context}}}

Please only include facts from the provided context and do not include any external knowledge.

Summary:`, 
  
});

const summarizeIsTopicFlow = ai.defineFlow(
  {
    name: 'summarizeIsTopicFlow',
    inputSchema: SummarizeIsTopicInputSchema,
    outputSchema: SummarizeIsTopicOutputSchema,
  },
  async (input) => {
    const filePath = path.join(process.cwd(), 'public', 'base_data', input.fileName);
    let content = '';

    try {
      if (fs.existsSync(filePath)) {
        const result = await mammoth.extractRawText({ path: filePath });
        content = result.value;
      } else {
        console.error('File not found:', filePath);
        return { summary: 'Topic content could not be loaded.' };
      }
    } catch (error) {
      console.error('Error reading docx file:', error);
      return { summary: 'Error processing topic content.' };
    }
    
    const {output} = await prompt({ topic: input.topic, context: content });
    return output!;
  }
);
