import FactOfTheDay from '@/components/dashboard/FactOfTheDay';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your progress at a glance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
        
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-headline">
              Fact of the Day
            </CardTitle>
            <Lightbulb className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <FactOfTheDay />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
