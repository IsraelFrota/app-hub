'use client';

import { ThumbsUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type VoteButtonProps = {
  voteCount: number;
  hasVoted: boolean;
  onVote: () => void;
};

export function VoteButton({ voteCount, hasVoted, onVote }: VoteButtonProps) {
  return (
    <motion.button
      onClick={onVote}
      disabled={hasVoted}
      whileTap={!hasVoted ? { scale: 0.9 } : {}}
      className={cn(
        'flex flex-col items-center gap-0.5 px-2.5 py-2 rounded-md transition-all duration-200',
        hasVoted
          ? 'bg-primary text-primary-foreground cursor-default'
          : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground cursor-pointer'
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={hasVoted ? 'voted' : 'not-voted'}
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 5, opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <ThumbsUp className={cn('w-4 h-4', hasVoted && 'fill-current')} />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.span
          key={voteCount}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          className="text-xs font-semibold"
        >
          {voteCount}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
