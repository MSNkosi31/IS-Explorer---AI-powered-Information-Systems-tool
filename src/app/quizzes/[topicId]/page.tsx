// This file is no longer used, but is kept for reference.
// The QuizClient component now fetches the quiz directly.
// We will redirect to the quizzes page from here to avoid confusion.
import { redirect } from 'next/navigation';

export default function QuizPage() {
  redirect('/quizzes');
}
