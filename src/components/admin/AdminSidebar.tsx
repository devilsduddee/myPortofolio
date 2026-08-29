'use client';
import { Home, User, Briefcase, FolderGit2, Trophy, Mail, FileText, LogOut, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export function AdminSidebar({ isOpen, setIsOpen }: { isOpen?: boolean, setIsOpen?: (v: boolean) => void }) {
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

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-white/5 shrink-0">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center text-sm">AR</div>
          Portfolio CMS
        </h2>
        {/* Close Button on Mobile */}
        <button 
          className="md:hidden text-slate-400 hover:text-white p-2"
          onClick={() => setIsOpen && setIsOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={() => setIsOpen && setIsOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors min-h-[44px] ${isActive ? 'bg-white/10 text-white font-medium border border-white/10 shadow-sm' : 'hover:bg-white/10 hover:text-white border border-transparent'}`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 shrink-0">
        <form action="/api/auth/logout" method="POST">
          <button className="flex w-full items-center gap-3 px-3 py-2.5 text-slate-400 rounded-lg hover:bg-white/10 hover:text-white border border-transparent transition-colors min-h-[44px]">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white/5 backdrop-blur-xl text-slate-300 flex-shrink-0 flex-col min-h-screen hidden md:flex border-r border-white/10 relative z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen && setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-72 bg-slate-900/95 backdrop-blur-2xl text-slate-300 flex flex-col z-50 md:hidden border-r border-white/10 shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
