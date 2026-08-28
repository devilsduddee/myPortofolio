import { FolderSearch } from 'lucide-react';

export function EmptyState({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
      <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 mb-4">
        <FolderSearch className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-medium text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm">{description}</p>
    </div>
  );
}
