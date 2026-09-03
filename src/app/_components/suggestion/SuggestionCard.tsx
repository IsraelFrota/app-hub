'use client';

import { MessageSquare, Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { VoteButton } from './VoteButton';

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

type SuggestionCardProps = {
  suggestion: SuggestionData;
  hasVoted: boolean;
  onVote: (id: string) => void;
  onOpenComments: (suggestion: SuggestionData) => void;
};

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'agora';
  if (diffMins < 60) return `há ${diffMins}min`;
  if (diffHours < 24) return `há ${diffHours}h`;
  if (diffDays < 7) return `há ${diffDays}d`;
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

export function SuggestionCard({
  suggestion,
  hasVoted,
  onVote,
  onOpenComments,
}: SuggestionCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge
              variant={suggestion.type === 'suggestion' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {suggestion.type === 'suggestion' ? 'Sugestão' : 'Feedback'}
            </Badge>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{getRelativeTime(suggestion.date)}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mb-2">
            <User className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-sm font-medium">
              {suggestion.name || (
                <span className="italic text-muted-foreground">Anônimo</span>
              )}
            </span>
          </div>

          <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap break-words">
            {suggestion.text}
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 shrink-0">
          <VoteButton
            voteCount={suggestion.vote}
            hasVoted={hasVoted}
            onVote={() => onVote(suggestion._id)}
          />

          <button
            onClick={() => onOpenComments(suggestion)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{suggestion.comments.length}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
