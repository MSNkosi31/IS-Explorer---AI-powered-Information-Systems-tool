'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TOPICS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function TopicSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 sticky top-24">
      <h2 className="px-4 py-2 text-lg font-headline font-semibold">Topics</h2>
      {TOPICS.map((topic) => {
        const isActive = pathname === `/topics/${topic.id}`;
        return (
          <Button
            key={topic.id}
            asChild
            variant={isActive ? 'secondary' : 'ghost'}
            className={cn(
              "justify-start",
              isActive && "font-bold text-primary"
            )}
          >
            <Link href={`/topics/${topic.id}`}>
              {topic.name}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
