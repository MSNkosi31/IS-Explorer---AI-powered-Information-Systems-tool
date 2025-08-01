import { TOPICS } from '@/lib/data';
import TopicClient from '@/components/topics/TopicClient';
import { notFound } from 'next/navigation';

type TopicPageProps = {
  params: {
    topicId: string;
  };
};

export function generateStaticParams() {
  return TOPICS.map((topic) => ({
    topicId: topic.id,
  }));
}

export default function TopicPage({ params }: TopicPageProps) {
  const { topicId } = params;
  const topic = TOPICS.find((t) => t.id === topicId);

  if (!topic) {
    notFound();
  }

  return <TopicClient topic={topic} />;
}
