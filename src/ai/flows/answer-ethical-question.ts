'use server';

/**
 * @fileOverview A flow for answering questions about ethical content.
 *
 * - answerEthicalQuestion - A function that answers ethical questions based on provided context.
 * - AnswerEthicalQuestionInput - The input type for the answerEthicalQuestion function.
 * - AnswerEthicalQuestionOutput - The return type for the answerEthicalQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerEthicalQuestionInputSchema = z.object({
  question: z.string().describe('The question to answer.'),
  context: z.string().describe('The context to use when answering the question.'),
});
export type AnswerEthicalQuestionInput = z.infer<typeof AnswerEthicalQuestionInputSchema>;

const AnswerEthicalQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
  sources: z.array(z.string()).describe('The sources used to answer the question.'),
});
export type AnswerEthicalQuestionOutput = z.infer<typeof AnswerEthicalQuestionOutputSchema>;

export async function answerEthicalQuestion(input: AnswerEthicalQuestionInput): Promise<AnswerEthicalQuestionOutput> {
  return answerEthicalQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerEthicalQuestionPrompt',
  input: {schema: AnswerEthicalQuestionInputSchema},
  output: {schema: AnswerEthicalQuestionOutputSchema},
  prompt: `You are an AI assistant that answers questions about ethical topics in technology. You will use the provided context to answer the question. If the context does not contain the answer, you can use your own knowledge, but you should clearly state that you are using external knowledge and cite your sources.

Context: {{{context}}}

Question: {{{question}}}

Answer: `,
});

const answerEthicalQuestionFlow = ai.defineFlow(
  {
    name: 'answerEthicalQuestionFlow',
    inputSchema: AnswerEthicalQuestionInputSchema,
    outputSchema: AnswerEthicalQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
