'use client';
import { Menu, UserCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function AdminTopbar() {
  const pathname = usePathname();
  const formatTitle = (path: string) => {
    const parts = path.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1];
    if (!lastPart) return 'Dashboard';
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shrink-0">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-slate-500 hover:text-slate-900">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-slate-900">{formatTitle(pathname)}</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-slate-900">Ahmad Ridho</p>
          <p className="text-xs text-slate-500">Administrator</p>
        </div>
        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 text-slate-400">
          <UserCircle className="w-6 h-6" />
        </div>
      </div>
    </header>
  );
}
