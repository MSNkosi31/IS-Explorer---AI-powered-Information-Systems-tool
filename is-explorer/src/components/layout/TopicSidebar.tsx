'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TOPICS } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function TopicSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 sticky top-24">
      <h2 className="px-4 py-2 text-lg font-headline font-semibold">Topics</h2>
      {TOPICS.map((topic) => {
        const isActive = pathname === `/topics/${topic.id}`;
        return (
            <Link 
                key={topic.id}
                href={`/topics/${topic.id}`}
                className={cn(
                    "justify-start px-4 py-2 rounded-md transition-all",
                    "hover:text-primary hover:scale-105 hover:translate-x-2",
                    "text-muted-foreground",
                    isActive ? "font-bold text-primary bg-secondary" : ""
                )}
            >
              {topic.name}
            </Link>
        );
      })}
    </nav>
  );
}
