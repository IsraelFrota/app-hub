'use client';

import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { MessageCircle, Inbox } from 'lucide-react';

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { SuggestionCard } from '@/app/_components/suggestion/SuggestionCard';
import {
  SuggestionFilters,
  FilterType,
  SortType,
} from '@/app/_components/suggestion/SuggestionFilters';
import { CommentDialog } from '@/app/_components/suggestion/CommentDialog';

type Comment = {
  _id: string;
  author: string;
  text: string;
  date: string;
};

type SuggestionData = {
  _id: string;
  date: string;
  name: string;
  text: string;
  type: 'suggestion' | 'feedback';
  vote: number;
  comments: Comment[];
};

type SuggestionClientProps = {
  initialSuggestions: SuggestionData[];
};

export function SuggestionClient({ initialSuggestions }: SuggestionClientProps) {
  const [suggestions, setSuggestions] = useState<SuggestionData[]>(initialSuggestions);
  const [selectedSuggestion, setSelectedSuggestion] = useState<SuggestionData | null>(null);
  const [votedSuggestions, setVotedSuggestions] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [sortType, setSortType] = useState<SortType>('recent');

  useEffect(() => {
    const voted = JSON.parse(localStorage.getItem('votedSuggestions') || '[]');
    setVotedSuggestions(voted);
    setHydrated(true);
  }, []);

  function hasVoted(id: string) {
    return votedSuggestions.includes(id);
  }

  function markAsVoted(id: string) {
    setVotedSuggestions((prev) => {
      const updated = [...prev, id];
      localStorage.setItem('votedSuggestions', JSON.stringify(updated));
      return updated;
    });
  }

  async function vote(id: string) {
    if (hasVoted(id)) return;

    try {
      const response = await fetch('/api/suggestion', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        toast.error('Erro ao registrar voto');
        return;
      }

      setSuggestions((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, vote: item.vote + 1 } : item
        )
      );

      setSelectedSuggestion((prev) =>
        prev && prev._id === id ? { ...prev, vote: prev.vote + 1 } : prev
      );

      markAsVoted(id);
      toast.success('Voto computado com sucesso!');
    } catch {
      toast.error('Erro ao registrar voto');
    }
  }

  async function addComment(id: string, text: string, author: string) {
    if (!text.trim()) return;

    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ suggestionId: id, text, author }),
      });

      if (!response.ok) {
        toast.error('Erro ao adicionar comentário');
        return;
      }

      const { comment } = await response.json();

      setSuggestions((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, comments: [...item.comments, comment] }
            : item
        )
      );

      setSelectedSuggestion((prev) =>
        prev && prev._id === id
          ? { ...prev, comments: [...prev.comments, comment] }
          : prev
      );

      toast.success('Comentário adicionado!');
    } catch {
      toast.error('Erro ao adicionar comentário');
    }
  }

  const filteredAndSorted = useMemo(() => {
    let result = [...suggestions];

    if (filterType !== 'all') {
      result = result.filter((s) => s.type === filterType);
    }

    if (search.trim()) {
      const normalizedSearch = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.text.toLowerCase().includes(normalizedSearch) ||
          (s.name && s.name.toLowerCase().includes(normalizedSearch))
      );
    }

    switch (sortType) {
      case 'votes':
        result.sort((a, b) => b.vote - a.vote);
        break;
      case 'comments':
        result.sort((a, b) => b.comments.length - a.comments.length);
        break;
      case 'recent':
      default:
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return result;
  }, [suggestions, filterType, search, sortType]);

  const stats = useMemo(() => ({
    total: suggestions.length,
    suggestions: suggestions.filter((s) => s.type === 'suggestion').length,
    feedbacks: suggestions.filter((s) => s.type === 'feedback').length,
  }), [suggestions]);

  return (
    <main className="min-h-screen flex justify-center items-start bg-muted/40 py-6 sm:py-10 px-4">
      <Card className="w-full max-w-7xl shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Feedbacks e Sugestões
            </CardTitle>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {stats.suggestions} sugestões
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {stats.feedbacks} feedbacks
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <SuggestionFilters
            search={search}
            onSearchChange={setSearch}
            filterType={filterType}
            onFilterTypeChange={setFilterType}
            sortType={sortType}
            onSortTypeChange={setSortType}
            totalCount={stats.total}
            filteredCount={filteredAndSorted.length}
          />

          {filteredAndSorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Inbox className="w-12 h-12 mb-3 opacity-50" />
              <p className="text-sm font-medium">Nenhuma sugestão encontrada</p>
              <p className="text-xs">
                {search || filterType !== 'all'
                  ? 'Tente ajustar os filtros de busca'
                  : 'Seja o primeiro a enviar uma sugestão!'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAndSorted.map((suggestion) => (
                <SuggestionCard
                  key={suggestion._id}
                  suggestion={suggestion}
                  hasVoted={hydrated && hasVoted(suggestion._id)}
                  onVote={vote}
                  onOpenComments={setSelectedSuggestion}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <CommentDialog
        suggestion={selectedSuggestion}
        open={!!selectedSuggestion}
        onOpenChange={(open) => {
          if (!open) setSelectedSuggestion(null);
        }}
        onAddComment={addComment}
      />
    </main>
  );
}
