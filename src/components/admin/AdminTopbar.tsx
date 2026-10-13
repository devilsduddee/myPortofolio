'use client';
import { UserCircle, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/features/auth/actions';

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
      <div className="flex items-center gap-3">
        {/* Brand Badge AR di Mobile */}
        <div className="md:hidden w-8 h-8 bg-neo-yellow border-2 border-neo-border rounded-lg flex items-center justify-center text-xs font-black shadow-[2px_2px_0px_#000000]">
          AR
        </div>
        <h1 className="text-lg md:text-2xl font-black text-neo-text uppercase tracking-tight">
          {formatTitle(pathname)}
        </h1>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-bold text-neo-text">Ahmad Ridho</p>
          <p className="text-xs font-bold text-neo-muted">Administrator</p>
        </div>
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-neo-yellow rounded-full flex items-center justify-center border-2 border-neo-border text-neo-text shadow-[2px_2px_0px_#000000]">
          <UserCircle className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </div>
        {/* Tombol Logout Mobile */}
        <form action={logoutAction} className="sm:hidden">
          <button 
            type="submit" 
            title="Logout" 
            aria-label="Logout"
            className="w-9 h-9 bg-neo-pink text-white rounded-xl flex items-center justify-center border-2 border-neo-border shadow-[2px_2px_0px_#000000] active:scale-95"
          >
            <LogOut className="w-4 h-4 stroke-[3]" />
          </button>
        </form>
      </div>
    </header>
  );
}
