import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog';

import { Separator } from '@/components/ui/separator';

type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

type AppDialogProps = {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  footer?: ReactNode;
  size?: DialogSize;
  contentClassName?: string;
};

const sizeMap: Record<DialogSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

export function AppDialog({
  title,
  children,
  open,
  onOpenChange,
  footer,
  size = 'md',
  contentClassName,
}: AppDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(sizeMap[size], contentClassName)}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Separator />

        <div className='py-2'>
          {children}
        </div>

        {footer && (
          <>
            <Separator />
            <DialogFooter className='pt-3'>
              {footer}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
