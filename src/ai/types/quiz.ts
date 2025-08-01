/**
 * @fileOverview Defines the types and schemas for creating quizzes.
 *
 * - CreateQuizInput - The input type for the createQuiz function.
 * - Quiz - The return type for the createQuiz function, representing a quiz.
 */
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
