'use client';
import { Menu, UserCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function AdminTopbar({ toggleSidebar }: { toggleSidebar?: () => void }) {
  const pathname = usePathname();
  const formatTitle = (path: string) => {
    const parts = path.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1];
    if (!lastPart) return 'Dashboard';
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
  };

  return (
    <header className="h-16 sticky top-0 z-30 bg-white/5 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 lg:px-8 shrink-0">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden text-slate-400 hover:text-white transition-colors w-10 h-10 flex items-center justify-center -ml-2 rounded-lg hover:bg-white/10">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-white hidden sm:block">{formatTitle(pathname)}</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-slate-200">Ahmad Ridho</p>
          <p className="text-xs text-slate-400">Administrator</p>
        </div>
        <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 text-slate-300 shadow-sm">
          <UserCircle className="w-6 h-6" />
        </div>
      </div>
    </header>
  );
}
