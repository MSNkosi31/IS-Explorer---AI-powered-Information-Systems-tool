'use client';

import Link from 'next/link';
import { BookOpen, CheckCircle, TrendingUp } from 'lucide-react';
import { TOPICS } from '@/lib/data';
import useLocalStorage from '@/hooks/use-local-storage';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface QuizScores {
  [key: string]: number;
}

type Topic = {
  id: string;
  name: string;
  description: string;
  fileName: string;
};

export default function RecentActivity() {
  const [scores] = useLocalStorage<QuizScores>('quiz-scores', {});
  const [viewedTopics] = useLocalStorage<string[]>('viewed-topics', []);
  const [lastViewedTopic, setLastViewedTopic] = useState<Topic | null | undefined>(undefined);

  const totalQuizzes = TOPICS.length;
  const completedQuizzes = Object.keys(scores).length;
  const progressPercentage = totalQuizzes > 0 ? (completedQuizzes / totalQuizzes) * 100 : 0;
  
  useEffect(() => {
    if (viewedTopics.length > 0) {
      const topic = TOPICS.find(t => t.id === viewedTopics[viewedTopics.length - 1]);
      setLastViewedTopic(topic || null);
    } else {
      setLastViewedTopic(null);
    }
  }, [viewedTopics]);

  const renderLastViewed = () => {
    if (lastViewedTopic === undefined) {
      return (
        <div className="flex items-center p-3 -m-3">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="ml-4 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-40" />
          </div>
        </div>
      );
    }
    
    if (lastViewedTopic) {
      return (
        <Link href={`/topics/${lastViewedTopic.id}`} className="flex items-center p-3 -m-3 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <BookOpen className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-muted-foreground">Continue reading</p>
            <p className="text-lg font-semibold">{lastViewedTopic.name}</p>
          </div>
        </Link>
      );
    }

    return (
       <Link href={`/topics/${TOPICS[0].id}`} className="flex items-center p-3 -m-3 rounded-lg hover:bg-muted/50 transition-colors">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <BookOpen className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-muted-foreground">Get started</p>
          <p className="text-lg font-semibold">Explore your first topic</p>
        </div>
      </Link>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-muted-foreground">Quiz Progress</h3>
          <span className="text-sm font-bold text-primary">{completedQuizzes} / {totalQuizzes}</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      <div className="space-y-4">
        {renderLastViewed()}

        {Object.keys(scores).length > 0 ? (
          <Link href="/quizzes" className="flex items-center p-3 -m-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Latest Score</p>
              <p className="text-lg font-semibold">View your quiz results</p>
            </div>
          </Link>
        ) : (
          <Link href="/quizzes" className="flex items-center p-3 -m-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Test your knowledge</p>
              <p className="text-lg font-semibold">Take your first quiz</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
