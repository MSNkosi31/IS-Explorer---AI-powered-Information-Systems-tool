import { TOPICS } from '@/lib/data';
import QuizClient from '@/components/quizzes/QuizClient';
import { notFound } from 'next/navigation';
import { summarizeEthicalTopic } from '@/ai/flows/summarize-ethical-topic';
import { createQuiz, Quiz } from '@/ai/flows/create-quiz';


type QuizPageProps = {
  params: {
    topicId: string;
  };
};

export function generateStaticParams() {
  return TOPICS.map((topic) => ({
    topicId: topic.id,
  }));
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { topicId } = params;
  const topic = TOPICS.find(t => t.id === topicId);

  if (!topic) {
    notFound();
  }

  const summaryResult = await summarizeEthicalTopic({ topic: topic.name });
  let quiz: Quiz;
  if (summaryResult.summary) {
    quiz = await createQuiz({ topic: topic.name, context: summaryResult.summary });
  } else {
    // Fallback or error handling
    return <div>Could not generate a quiz for this topic. Please try again later.</div>
  }
  
  if (!quiz) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-2xl p-4 md:p-8">
      <QuizClient topicId={topicId} quiz={quiz} />
    </div>
  );
}
