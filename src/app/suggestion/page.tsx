import { Suspense } from 'react';
import { SuggestionClient } from './SuggestionClient';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';
import { getSuggestionsService } from '@/services/suggestion.service';

function SuggestionsSkeleton() {
  return (
    <main className="min-h-screen flex justify-center items-start bg-muted/40 py-6 sm:py-10 px-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <div className="h-6 w-48 bg-muted animate-pulse rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-5 w-20 bg-muted animate-pulse rounded" />
              <div className="h-5 w-20 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-10 w-full bg-muted animate-pulse rounded" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 w-full bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

async function SuggestionData() {
  const data = await getSuggestionsService();
  const suggestions = JSON.parse(JSON.stringify(data));
  return <SuggestionClient initialSuggestions={suggestions} />;
}

export default async function SuggestionPage() {
  return (
    <Suspense fallback={<SuggestionsSkeleton />}>
      <SuggestionData />
    </Suspense>
  );
}
