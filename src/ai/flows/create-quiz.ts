'use server';
/**
 * @fileOverview A flow for creating a quiz on an Information Systems topic.
 *
 * - createQuiz - A function that creates a quiz based on provided context.
 */

import {ai} from '@/ai/genkit';
import { CreateQuizInput, CreateQuizInputSchema, Quiz, QuizSchema } from '@/ai/types/quiz';

export async function createQuiz(input: CreateQuizInput): Promise<Quiz> {
  return createQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createQuizPrompt',
  input: {schema: CreateQuizInputSchema},
  output: {schema: QuizSchema},
  prompt: `You are an expert in creating educational quizzes about Information Systems topics. 
  
Your task is to create a multiple-choice quiz with 10 questions based on the provided topic and context. Each question should have 4 options.

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
