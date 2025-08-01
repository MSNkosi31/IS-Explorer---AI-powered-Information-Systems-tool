'use server';
/**
 * @fileOverview A flow for creating a quiz on an ethical topic.
 *
 * - createQuiz - A function that creates a quiz based on provided context.
 * - CreateQuizInput - The input type for the createQuiz function.
 * - Quiz - The return type for the createQuiz function, representing a quiz.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const CreateQuizInputSchema = z.object({
  topic: z.string().describe('The topic of the quiz.'),
  context: z.string().describe('The context to use for creating the quiz.'),
});
export type CreateQuizInput = z.infer<typeof CreateQuizInputSchema>;

export const QuizSchema = z.object({
  title: z.string().describe('The title of the quiz.'),
  questions: z.array(
    z.object({
      question: z.string().describe('The text of the question.'),
      options: z.array(z.string()).describe('A list of possible answers.'),
      answer: z.string().describe('The correct answer.'),
    })
  ),
});
export type Quiz = z.infer<typeof QuizSchema>;

export async function createQuiz(input: CreateQuizInput): Promise<Quiz> {
  return createQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createQuizPrompt',
  input: {schema: CreateQuizInputSchema},
  output: {schema: QuizSchema},
  prompt: `You are an expert in creating educational quizzes about ethical topics in technology. 
  
Your task is to create a multiple-choice quiz with 3 questions based on the provided topic and context. Each question should have 4 options.

Topic: {{{topic}}}

Context:
{{{context}}}

Generate the quiz now.`,
});

const createQuizFlow = ai.defineFlow(
  {
    name: 'createQuizFlow',
    inputSchema: CreateQuizInputSchema,
    outputSchema: QuizSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
