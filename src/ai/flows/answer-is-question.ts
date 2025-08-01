'use server';

/**
 * @fileOverview A flow for answering questions about information systems content.
 *
 * - answerIsQuestion - A function that answers information systems questions based on provided context.
 * - AnswerIsQuestionInput - The input type for the answerIsQuestion function.
 * - AnswerIsQuestionOutput - The return type for the answerIsQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerIsQuestionInputSchema = z.object({
  question: z.string().describe('The question to answer.'),
  context: z.string().describe('The context to use when answering the question.'),
});
export type AnswerIsQuestionInput = z.infer<typeof AnswerIsQuestionInputSchema>;

const AnswerIsQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
  sources: z.array(z.string()).describe('The sources used to answer the question.'),
});
export type AnswerIsQuestionOutput = z.infer<typeof AnswerIsQuestionOutputSchema>;

export async function answerIsQuestion(input: AnswerIsQuestionInput): Promise<AnswerIsQuestionOutput> {
  return answerIsQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerIsQuestionPrompt',
  input: {schema: AnswerIsQuestionInputSchema},
  output: {schema: AnswerIsQuestionOutputSchema},
  prompt: `You are an AI assistant that answers questions about Information Systems topics. You will use the provided context to answer the question. If the context does not contain the answer, you can use your own knowledge, but you should clearly state that you are using external knowledge and cite your sources. All responses must be in English.

Context: {{{context}}}

Question: {{{question}}}

Answer: `,
});

const answerIsQuestionFlow = ai.defineFlow(
  {
    name: 'answerIsQuestionFlow',
    inputSchema: AnswerIsQuestionInputSchema,
    outputSchema: AnswerIsQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
