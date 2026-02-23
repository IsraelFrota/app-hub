'use client';

import {
  useState,
  useEffect,
} from 'react';

import {
  ThumbsUp,
  MessageSquare,
} from 'lucide-react';

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableCaption,
} from '@/components/ui/table';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from '@/components/ui/card';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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

export function SuggestionClient({
  initialSuggestions,
}: SuggestionClientProps) {

  const [suggestions, setSuggestions] =
    useState<SuggestionData[]>(initialSuggestions);

  const [selectedSuggestion, setSelectedSuggestion] =
    useState<SuggestionData | null>(null);

  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');

  const [votedSuggestions, setVotedSuggestions] =
    useState<string[]>([]);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const voted = JSON.parse(
      localStorage.getItem('votedSuggestions') || '[]'
    );

    setVotedSuggestions(voted);
    setHydrated(true);
  }, []);

  function hasVoted(id: string) {
    return votedSuggestions.includes(id);
  }

  function markAsVoted(id: string) {
    setVotedSuggestions(prev => {
      const updated = [...prev, id];

      localStorage.setItem(
        'votedSuggestions',
        JSON.stringify(updated)
      );

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

      setSuggestions(prev =>
        prev.map(item =>
          item._id === id
            ? { ...item, vote: item.vote + 1 }
            : item
        )
      );

      markAsVoted(id);

      toast.success('Voto computado com sucesso!');
    } catch {
      toast.error('Erro ao registrar voto');
    }
  }

  async function addComment(id: string) {
    if (!newComment.trim()) return;

    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          suggestionId: id,
          text: newComment,
          author,
        }),
      });

      if (!response.ok) {
        toast.error('Erro ao adicionar comentário');
        return;
      }

      const { comment } = await response.json();

      setSuggestions(prev =>
        prev.map(item =>
          item._id === id
            ? {
                ...item,
                comments: [...item.comments, comment],
              }
            : item
        )
      );

      setSelectedSuggestion(prev =>
        prev
          ? {
              ...prev,
              comments: [...prev.comments, comment],
            }
          : prev
      );

      setNewComment('');

      toast.success('Comentário adicionado!');
    } catch {
      toast.error('Erro ao adicionar comentário');
    }
  }

  return (
    <main className='min-h-screen flex justify-center items-start bg-muted/40 py-10 px-4'>
      <Card className='w-full max-w-5xl shadow-lg'>
        <CardHeader>
          <CardTitle>
            Feedbacks e Sugestões
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableCaption>
              Lista de feedbacks e sugestões enviados pelos colaboradores
            </TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead className='w-[120px]'>Data</TableHead>
                <TableHead className='w-[180px]'>Nome</TableHead>
                <TableHead>Conteúdo</TableHead>
                <TableHead className='w-[120px] text-center'>Tipo</TableHead>
                <TableHead className='w-[160px] text-center'>
                  Votação / Comentários
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {suggestions.map(suggestion => (
                <TableRow 
                  key={suggestion._id}
                  className='hover:bg-muted/50 transition-colors'
                >
                  <TableCell
                    className='align-middle text-sm text-muted-foreground'
                  >
                    {new Date(
                      suggestion.date
                    ).toLocaleDateString('pt-BR')}
                  </TableCell>

                  <TableCell>
                    {suggestion.name || (
                      <span className='italic text-muted-foreground'>
                        Anônimo
                      </span>
                    )}
                  </TableCell>

                  <TableCell 
                    className='break-words whitespace-normal align-middle'
                  >
                    {suggestion.text}
                  </TableCell>

                  <TableCell className='text-center'>
                    <Badge
                      variant={
                        suggestion.type === 'suggestion'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {suggestion.type === 'suggestion'
                        ? 'Sugestão'
                        : 'Feedback'}
                    </Badge>
                  </TableCell>

                  <TableCell
                    className='text-right align-middle'
                  >
                    <div className='flex items-center justify-end gap-2'>
                      <Button
                        size='sm'
                        disabled={
                          !hydrated ||
                          hasVoted(suggestion._id)
                        }
                        onClick={() =>
                          vote(suggestion._id)
                        }
                        className='flex items-center gap-1'
                      >
                        <ThumbsUp size={16} />
                        {suggestion.vote}
                      </Button>

                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() =>
                          setSelectedSuggestion(
                            suggestion
                          )
                        }
                        className='flex items-center gap-1'
                      >
                        <MessageSquare size={16} />
                        {suggestion.comments.length}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedSuggestion}
        onOpenChange={() => {
          setAuthor('');
          setSelectedSuggestion(null);
        }}
      >
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>
              Comentários da sugestão
            </DialogTitle>
          </DialogHeader>

          {selectedSuggestion && (
            <div className='space-y-4'>
              <div className='p-3 bg-muted rounded-md text-sm'>
                {selectedSuggestion.text}
              </div>

              {selectedSuggestion.comments.map(comment => (
                <div
                  key={comment._id}
                  className='border p-3 rounded-md text-sm'
                >
                  <div className='flex justify-between text-xs text-muted-foreground'>
                    <span>
                      {comment.author || 'Anônimo'}
                    </span>
                    <span>
                      {new Date(comment.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  <p className='mt-1'>{comment.text}</p>
                </div>
              ))}

              <div className='flex flex-col gap-2 pt-2 border-t'>
                <div className='flex flex-col gap-2'>
                  <input
                    value={author}
                    onChange={e =>
                      setAuthor(e.target.value)
                    }
                    placeholder='Seu nome (opcional)'
                    className='flex-1 border rounded-md px-2 py-1 placeholder:text-sm'
                  />

                  <input
                    value={newComment}
                    onChange={e =>
                      setNewComment(e.target.value)
                    }
                    placeholder='Comentário...'
                    className='flex-1 border rounded-md px-2 py-1 placeholder:text-sm'
                  />
                </div>
              </div>

              <Button
                size='sm'
                onClick={() => addComment(selectedSuggestion._id)}
              >
                Comentar
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}