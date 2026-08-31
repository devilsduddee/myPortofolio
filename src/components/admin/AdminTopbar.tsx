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
    <header className="h-16 sticky top-0 z-30 bg-neo-surface border-b-4 border-neo-border flex items-center justify-between px-4 lg:px-8 shrink-0">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden text-neo-text hover:text-neo-blue transition-colors w-10 h-10 flex items-center justify-center -ml-2 rounded-lg border-2 border-transparent hover:border-neo-border hover:shadow-[2px_2px_0px_#000000] hover:bg-neo-yellow">
          <Menu className="w-6 h-6 stroke-[3]" />
        </button>
        <h1 className="text-xl md:text-2xl font-black text-neo-text hidden sm:block uppercase tracking-tight">{formatTitle(pathname)}</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-bold text-neo-text">Ahmad Ridho</p>
          <p className="text-xs font-bold text-neo-muted">Administrator</p>
        </div>
        <div className="w-10 h-10 bg-neo-yellow rounded-full flex items-center justify-center border-2 border-neo-border text-neo-text shadow-[2px_2px_0px_#000000]">
          <UserCircle className="w-6 h-6 stroke-[2.5]" />
        </div>
      </div>
    </header>
  );
}
