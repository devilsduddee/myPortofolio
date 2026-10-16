/**
 * File        : src/components/admin/AdminBottomNav.tsx
 * Deskripsi   : Komponen navigasi bawah (Bottom Navigation Bar) untuk tampilan mobile admin dashboard.
 *               Didesain pas 100% tanpa terpotong (fit screen), membagi rata 7 menu dengan ikon proporsional
 *               dan label mikro yang tajam bergaya Neo-Brutalism.
 */

'use client';

import { Home, User, Briefcase, FolderGit2, Trophy, Mail, FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Komponen Navigasi Bawah Khusus Mobile Admin.
 *
 * Kegunaan : Menampilkan dock bar navigasi melayang yang pas dengan lebar layar HP tanpa terpotong.
 * Input    : Tanpa props luar.
 * Hasil    : Elemen navigasi fixed bottom dengan 7 ikon menu terbagi proporsional.
 */
export function AdminBottomNav() {
  const pathname = usePathname();

  // 7 Menu Admin dengan label mikro agar muat sempurna di layar 320px - 430px
  const navItems = [
    { name: 'Home', href: '/admin/dashboard', icon: Home, activeColor: 'bg-neo-blue text-white' },
    { name: 'Profile', href: '/admin/profile', icon: User, activeColor: 'bg-neo-yellow text-neo-text' },
    { name: 'Exp', href: '/admin/experience', icon: Briefcase, activeColor: 'bg-neo-pink text-white' },
    { name: 'Project', href: '/admin/project', icon: FolderGit2, activeColor: 'bg-neo-blue text-white' },
    { name: 'Awards', href: '/admin/achievement', icon: Trophy, activeColor: 'bg-neo-yellow text-neo-text' },
    { name: 'Contact', href: '/admin/contact', icon: Mail, activeColor: 'bg-neo-pink text-white' },
    { name: 'CV', href: '/admin/cv', icon: FileText, activeColor: 'bg-neo-surface text-neo-text' },
  ];

  return (
    <div className="md:hidden fixed bottom-1.5 inset-x-0 z-50 px-2 sm:px-4 pointer-events-none pb-[env(safe-area-inset-bottom,0px)]">
      <nav 
        aria-label="Admin Mobile Navigation"
        className="pointer-events-auto w-full max-w-lg mx-auto bg-neo-surface border-3 border-neo-border rounded-[20px] shadow-[3px_3px_0px_#000000] p-1 flex items-center justify-between backdrop-blur-md"
      >
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const IconComponent = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 px-0.5 rounded-[14px] transition-all duration-150 min-h-[46px] active:scale-95 group select-none touch-manipulation ${
                isActive
                  ? `${item.activeColor} font-black border-2 border-neo-border shadow-[1.5px_1.5px_0px_#000000] -translate-y-0.5`
                  : 'text-neo-muted hover:text-neo-text hover:bg-neo-yellow/20 font-bold border-2 border-transparent'
              }`}
            >
              {/* Ikon Menu */}
              <IconComponent 
                className={`w-4 h-4 transition-transform duration-150 shrink-0 ${
                  isActive ? 'stroke-[3] scale-105' : 'stroke-[2.2]'
                }`} 
              />

              {/* Label Mikro */}
              <span className={`text-[8.5px] uppercase tracking-tight mt-0.5 leading-none text-center truncate max-w-full ${isActive ? 'font-black' : 'font-bold'}`}>
                {item.name}
              </span>

              {/* Dot Penanda Aktif */}
              {isActive && (
                <span className="absolute -top-0.5 right-1 w-1.5 h-1.5 rounded-full bg-neo-yellow border border-neo-border" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
