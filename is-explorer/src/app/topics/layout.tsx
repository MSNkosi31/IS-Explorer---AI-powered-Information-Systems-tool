import TopicSidebar from '@/components/layout/TopicSidebar';

export default function TopicsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row gap-8 py-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <TopicSidebar />
        </aside>
        <main className="w-full md:w-3/4 lg:w-4/5">
          {children}
        </main>
      </div>
    </div>
  )
}
