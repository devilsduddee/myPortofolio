import { FolderSearch } from 'lucide-react';

export function EmptyState({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-white/10 bg-white/5 rounded-xl">
      <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-slate-400 mb-4">
        <FolderSearch className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-400 max-w-sm">{description}</p>
    </div>
  );
}
