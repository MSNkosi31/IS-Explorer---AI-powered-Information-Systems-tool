'use client';

import { useState, useTransition, useEffect } from 'react';
import { summarizeIsTopic } from '@/ai/flows/summarize-is-topic';
import { answerIsQuestion } from '@/ai/flows/answer-is-question';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bot, Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import useLocalStorage from '@/hooks/use-local-storage';
import { Skeleton } from '@/components/ui/skeleton';

type Topic = {
  id: string;
  name: string;
  description: string;
  fileName: string;
};

type TopicClientProps = {
  topic: Topic;
};

export default function TopicClient({ topic }: TopicClientProps) {
  const [summary, setSummary] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isSummaryLoading, startSummaryTransition] = useTransition();
  const [isAnswerLoading, startAnswerTransition] = useTransition();
  const { toast } = useToast();

  const [viewedTopics, setViewedTopics] = useLocalStorage<string[]>('viewed-topics', []);

  useEffect(() => {
    if (!viewedTopics.includes(topic.id)) {
      setViewedTopics([...viewedTopics, topic.id]);
    }
    
    startSummaryTransition(async () => {
      setSummary(''); // Clear previous summary
      const result = await summarizeIsTopic({ topic: topic.name });
      if (result.summary) {
        setSummary(result.summary);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error Generating Summary',
          description: 'Could not generate a summary for this topic. Please try again.',
        });
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic.id, topic.name]);


  const handleAskQuestion = () => {
    if (!question.trim()) return;
    startAnswerTransition(async () => {
      setAnswer('');
      const result = await answerIsQuestion({ question, context: summary });
      if (result.answer) {
        setAnswer(result.answer);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error Getting Answer',
          description: 'Could not get an answer for this question. Please try again.',
        });
      }
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-4xl">{topic.name}</CardTitle>
          <CardDescription>{topic.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {isSummaryLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ) : (
            <div 
              className="prose prose-stone dark:prose-invert max-w-none text-foreground whitespace-pre-wrap font-body"
              dangerouslySetInnerHTML={{ __html: summary }}
            />
          )}
        </CardContent>
      </Card>

      {summary && !isSummaryLoading && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Ask a Question</CardTitle>
            <CardDescription>
              Have a question about {topic.name}? Ask our AI assistant.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder={`e.g., What is the role of a systems analyst?`}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="bg-background"
              />
            </div>
            <Button onClick={handleAskQuestion} disabled={isAnswerLoading}>
              {isAnswerLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Ask AI
            </Button>

            {isAnswerLoading && (
              <div className="flex items-center space-x-2 text-muted-foreground pt-4">
                <Bot className="h-5 w-5 animate-pulse" />
                <p>AI is thinking...</p>
              </div>
            )}

            {answer && !isAnswerLoading && (
               <Alert className="bg-primary/5 border-primary/20">
                  <Bot className="h-4 w-4 !text-primary" />
                  <AlertTitle className="font-headline">AI Response</AlertTitle>
                  <AlertDescription className="prose prose-stone dark:prose-invert max-w-none text-foreground whitespace-pre-wrap font-body">
                    {answer}
                  </AlertDescription>
                </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
