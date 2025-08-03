import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export default function TopicsPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-muted rounded-full p-4 w-fit mb-4">
            <BookOpen className="h-12 w-12 text-muted-foreground" />
          </div>
          <CardTitle className="font-headline text-3xl">Select a Topic</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Please choose a topic from the sidebar to view its content.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
