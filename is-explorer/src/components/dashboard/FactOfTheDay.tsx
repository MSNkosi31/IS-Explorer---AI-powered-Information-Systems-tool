'use client';

import { useEffect, useState } from 'react';
import { DAILY_FACTS } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

export default function FactOfTheDay() {
  const [fact, setFact] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This logic runs only on the client
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const factIndex = dayOfYear % DAILY_FACTS.length;
    setFact(DAILY_FACTS[factIndex]);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  return (
    <div className="text-lg font-medium text-primary">
      <p className="font-body italic">"{fact}"</p>
    </div>
  );
}
