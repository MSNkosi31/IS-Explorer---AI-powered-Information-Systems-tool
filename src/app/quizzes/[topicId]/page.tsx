import { QUIZZES, TOPICS } from '@/lib/data';
import QuizClient from '@/components/quizzes/QuizClient';
import { notFound } from 'next/navigation';

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

export default function QuizPage({ params }: QuizPageProps) {
  const { topicId } = params;
  const quiz = QUIZZES[topicId];
  const topic = TOPICS.find(t => t.id === topicId);

  if (!quiz || !topic) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-2xl p-4 md:p-8">
      <QuizClient topicId={topicId} quiz={quiz} />
    </div>
  );
}
