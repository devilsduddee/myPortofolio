'use client';

import { useTransition, useState } from 'react';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog';

interface DeleteButtonProps {
  id: string;
  action: (id: string) => Promise<any>;
  title?: string;
  description?: string;
}

export function DeleteButton({ 
  id, 
  action, 
  title = 'Delete Record',
  description = 'Are you sure you want to permanently delete this item? This action cannot be undone.' 
}: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const result = await action(id);
        if (result?.error) {
          toast.error(result.error);
        } else {
          toast.success('Record deleted successfully');
          setOpen(false);
        }
      } catch (err: any) {
        toast.error(err.message || 'Failed to delete record');
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button 
          disabled={isPending}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neo-pink text-white font-extrabold text-xs uppercase tracking-wider rounded-xl border-2 border-neo-border shadow-[2px_2px_0px_#000000] hover:bg-red-600 hover:-translate-y-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
        >
          <Trash2 className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{isPending ? 'Deleting...' : 'Delete'}</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Yes, Delete Item'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

