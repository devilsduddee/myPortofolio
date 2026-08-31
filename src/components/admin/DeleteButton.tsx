'use client';

import { useTransition } from 'react';

interface DeleteButtonProps {
  id: string;
  action: (id: string) => Promise<any>;
}

export function DeleteButton({ id, action }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      startTransition(async () => {
        await action(id);
      });
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={isPending}
      className="px-3 py-1.5 bg-neo-pink text-white font-extrabold text-xs uppercase tracking-wider rounded-xl border-2 border-neo-border shadow-[2px_2px_0px_#000000] hover:bg-red-600 hover:-translate-y-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}

