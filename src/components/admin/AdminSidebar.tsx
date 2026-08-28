'use client';
import { Home, User, Briefcase, FolderGit2, Trophy, Mail, FileText, LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AdminSidebar() {
  const pathname = usePathname();
  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
    { name: 'Profile', href: '/admin/profile', icon: User },
    { name: 'Experience', href: '/admin/experience', icon: Briefcase },
    { name: 'Projects', href: '/admin/project', icon: FolderGit2 },
    { name: 'Achievements', href: '/admin/achievement', icon: Trophy },
    { name: 'Contact', href: '/admin/contact', icon: Mail },
    { name: 'CV', href: '/admin/cv', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col min-h-screen hidden md:flex border-r border-slate-800">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-900">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">AR</div>
          Portfolio CMS
        </h2>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-slate-800 text-white font-medium' : 'hover:bg-slate-800 hover:text-white'}`}>
              <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-500' : 'text-slate-400'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <form action="/api/auth/logout" method="POST">
          <button className="flex w-full items-center gap-3 px-3 py-2.5 text-slate-400 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
