'use client'

import Link from 'next/link';
import { TOPICS } from '@/lib/data';
import useLocalStorage from '@/hooks/use-local-storage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface QuizScores {
  [key: string]: number;
}
interface QuizLengths {
  [key: string]: number;
}

export default function QuizzesPage() {
  const [scores] = useLocalStorage<QuizScores>('quiz-scores', {});
  const [quizLengths] = useLocalStorage<QuizLengths>('quiz-lengths', {});

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-bold text-foreground">Quizzes</h1>
        <p className="text-muted-foreground">Test your knowledge on key ethical topics.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TOPICS.map((topic) => {
          const score = scores[topic.id];
          const isCompleted = score !== undefined;
          const totalQuestions = quizLengths[topic.id] || 3;
          const percentage = isCompleted ? (score / totalQuestions) * 100 : 0;

          return (
            <Card key={topic.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline">{topic.name} Quiz</CardTitle>
                <CardDescription>{topic.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-end">
                {isCompleted ? (
                  <div className="space-y-4">
                     <div className="flex items-center text-sm font-semibold text-green-600">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Completed
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">Your Score</p>
                      <p className="text-4xl font-bold text-primary">{percentage.toFixed(0)}<span className="text-xl">%</span></p>
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/quizzes/${topic.id}`}>
                        Retake Quiz <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 text-center">
                    <div className="text-muted-foreground">
                      <p>{totalQuestions > 1 ? `${totalQuestions} questions` : 'Generating quiz...'}</p>
                    </div>
                    <Button asChild className="w-full">
                      <Link href={`/quizzes/${topic.id}`}>
                        Start Quiz <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
