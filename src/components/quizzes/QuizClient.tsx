'use client';

import { useState, useEffect, useTransition } from 'react';
import useLocalStorage from '@/hooks/use-local-storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, XCircle, ArrowRight, RotateCw, Award, Loader2, ServerCrash } from 'lucide-react';
import type { Quiz } from '@/ai/types/quiz';
import type { Topic } from '@/lib/types';
import { createQuiz } from '@/ai/flows/create-quiz';
import { summarizeIsTopic } from '@/ai/flows/summarize-is-topic';
import { Skeleton } from '../ui/skeleton';
import { LeaveIcon } from '../ui/icons';

interface QuizClientProps {
  topic: Topic;
  onQuit: () => void;
}

type QuizScores = { [key: string]: number };
type QuizLengths = { [key: string]: number };

export default function QuizClient({ topic, onQuit }: QuizClientProps) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isQuizLoading, startQuizTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  
  const [scores, setScores] = useLocalStorage<QuizScores>('quiz-scores', {});
  const [quizLengths, setQuizLengths] = useLocalStorage<QuizLengths>('quiz-lengths', {});

  const fetchQuiz = () => {
    setError(null);
    setQuiz(null);
    startQuizTransition(async () => {
      try {
        const summaryResult = await summarizeIsTopic({ topic: topic.name });
        if (summaryResult.summary) {
          const generatedQuiz = await createQuiz({ topic: topic.name, context: summaryResult.summary });
          setQuiz(generatedQuiz);
        } else {
          throw new Error('Could not generate summary for quiz.');
        }
      } catch (e: any) {
        console.error(e);
        setError('Failed to generate the quiz. Please try again.');
      }
    });
  }

  useEffect(() => {
    fetchQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic.id]);

  useEffect(() => {
    if (quiz && (!quizLengths[topic.id] || quizLengths[topic.id] !== quiz.questions.length)) {
      setQuizLengths({...quizLengths, [topic.id]: quiz.questions.length});
    }
  }, [topic.id, quiz, quizLengths, setQuizLengths]);

  useEffect(() => {
    if(isFinished) {
        const newScores = {...scores, [topic.id]: score};
        setScores(newScores);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  const handleNext = () => {
    setFeedback(null);
    setSelectedAnswer(null);

    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleSubmit = () => {
    if (!selectedAnswer || !quiz) return;
    const currentQuestion = quiz.questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.answer) {
      setScore(score + 1);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsFinished(false);
    setFeedback(null);
    fetchQuiz();
  };

  if (isQuizLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
        <CardFooter>
          <Button disabled className="w-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Quiz...
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (error) {
     return (
      <Card className="text-center">
        <CardHeader>
            <div className="mx-auto bg-destructive/20 text-destructive rounded-full p-4 w-fit mb-4">
                <ServerCrash className="h-12 w-12" />
            </div>
          <CardTitle className="font-headline text-3xl">Error</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardFooter className="flex-col gap-4 sm:flex-row justify-center">
          <Button onClick={handleRestart} variant="outline">
            <RotateCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button onClick={onQuit}>
            <LeaveIcon className="mr-2 h-4 w-4" />
            Quit
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  if (!quiz) return null;

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / quiz.questions.length) * 100;
  
  if (isFinished) {
    const percentage = (score / quiz.questions.length) * 100;
    return (
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto bg-accent/20 text-accent rounded-full p-4 w-fit mb-4">
            <Award className="h-12 w-12" />
          </div>
          <CardTitle className="font-headline text-3xl">Quiz Complete!</CardTitle>
          <CardDescription>You've completed the {quiz.title}.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Your Score:</p>
          <p className="text-6xl font-bold text-primary">{percentage.toFixed(0)}<span className="text-2xl">%</span></p>
          <p className="text-muted-foreground mt-2">You answered {score} out of {quiz.questions.length} questions correctly.</p>
        </CardContent>
        <CardFooter className="flex-col gap-4 sm:flex-row justify-center">
          <Button onClick={handleRestart}>
            <RotateCw className="mr-2 h-4 w-4" />
            Take Again
          </Button>
          <Button asChild variant="outline" onClick={onQuit}>
             <button>
                <LeaveIcon className="mr-2 h-4 w-4" />
                Back to Quizzes
            </button>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
            <Progress value={progress} className="h-2 w-full" />
            <Button onClick={onQuit} variant="ghost" size="sm" className="ml-4 shrink-0">
                <LeaveIcon className="mr-2 h-4 w-4" /> Quit
            </Button>
        </div>
        <CardTitle className="font-headline text-2xl">{quiz.title}</CardTitle>
        <CardDescription>
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg font-semibold text-foreground">{currentQuestion.question}</p>
        <RadioGroup
          value={selectedAnswer ?? ''}
          onValueChange={setSelectedAnswer}
          disabled={!!feedback}
        >
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center space-x-3 p-4 rounded-md border transition-all",
                feedback && option === currentQuestion.answer && "border-green-500 bg-green-500/10",
                feedback === 'incorrect' && option === selectedAnswer && "border-red-500 bg-red-500/10"
              )}
            >
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="text-base font-normal flex-1 cursor-pointer">{option}</Label>
            </div>
          ))}
        </RadioGroup>
        
        {feedback && (
          <Alert variant={feedback === 'correct' ? 'default' : 'destructive'} className={cn(feedback === 'correct' && "border-green-500 text-green-700")}>
            {feedback === 'correct' ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            <AlertTitle>{feedback === 'correct' ? 'Correct!' : 'Incorrect'}</AlertTitle>
            <AlertDescription>
                {feedback === 'incorrect' && `The correct answer is: ${currentQuestion.answer}`}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        {feedback ? (
          <Button onClick={handleNext} className="w-full">
            {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={!selectedAnswer} className="w-full">
            Submit Answer
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
