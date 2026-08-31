import { FolderSearch } from 'lucide-react';

export function EmptyState({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-4 border-dashed border-neo-border bg-neo-surface rounded-[20px] shadow-brutal-sm">
      <div className="w-14 h-14 rounded-2xl bg-neo-yellow border-3 border-neo-border flex items-center justify-center text-neo-text mb-4 shadow-brutal-sm">
        <FolderSearch className="w-7 h-7 stroke-[2.5]" />
      </div>
      <h3 className="text-xl font-black text-neo-text uppercase tracking-tight mb-1">{title}</h3>
      <p className="text-sm font-medium text-neo-muted max-w-sm">{description}</p>
    </div>
  );
}

