'use client';

import { useState } from 'react';
import { User, Calendar, Send, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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

type CommentDialogProps = {
  suggestion: SuggestionData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddComment: (id: string, text: string, author: string) => Promise<void>;
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

export function CommentDialog({
  suggestion,
  open,
  onOpenChange,
  onAddComment,
}: CommentDialogProps) {
  const [author, setAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (!commentText.trim() || !suggestion) return;

    setIsSubmitting(true);
    try {
      await onAddComment(suggestion._id, commentText, author);
      setCommentText('');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    setAuthor('');
    setCommentText('');
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Comentários
          </DialogTitle>
        </DialogHeader>

        {suggestion && (
          <div className="flex flex-col flex-1 min-h-0 gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant={suggestion.type === 'suggestion' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {suggestion.type === 'suggestion' ? 'Sugestão' : 'Feedback'}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {suggestion.name || 'Anônimo'}
                </span>
              </div>
              <p className="text-sm text-foreground/90 whitespace-pre-wrap">
                {suggestion.text}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 space-y-2">
              {suggestion.comments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <MessageSquare className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-sm">Nenhum comentário ainda</p>
                  <p className="text-xs">Seja o primeiro a comentar!</p>
                </div>
              ) : (
                <AnimatePresence>
                  {suggestion.comments.map((comment, index) => (
                    <motion.div
                      key={comment._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border border-border rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs font-medium">
                            {comment.author || 'Anônimo'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{getRelativeTime(comment.date)}</span>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/90">{comment.text}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t">
              <Input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Seu nome (opcional)"
                className="h-8 text-sm"
              />
              <div className="flex gap-2">
                <Textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Escreva seu comentário..."
                  className="min-h-[60px] resize-none text-sm flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      handleSubmit();
                    }
                  }}
                />
                <Button
                  size="icon"
                  onClick={handleSubmit}
                  disabled={!commentText.trim() || isSubmitting}
                  className="h-[60px] w-10 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground">
                Ctrl + Enter para enviar
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
