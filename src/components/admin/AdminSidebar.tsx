'use client';
import { Home, User, Briefcase, FolderGit2, Trophy, Mail, FileText, LogOut, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { logoutAction } from '@/features/auth/actions';

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
      <div className="h-16 flex items-center justify-between px-6 border-b-4 border-neo-border bg-neo-yellow shrink-0">
        <h2 className="text-xl font-black text-neo-text flex items-center gap-2">
          <div className="w-8 h-8 bg-neo-surface border-2 border-neo-border rounded-lg flex items-center justify-center text-sm shadow-[2px_2px_0px_#000000]">AR</div>
          Portfolio CMS
        </h2>
        {/* Close Button on Mobile */}
        <button 
          className="md:hidden text-neo-text hover:text-neo-pink p-2"
          onClick={() => setIsOpen && setIsOpen(false)}
        >
          <X className="w-6 h-6 stroke-[3]" />
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 bg-neo-surface">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={() => setIsOpen && setIsOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 min-h-[44px] ${isActive ? 'bg-neo-blue text-white font-bold border-2 border-neo-border shadow-brutal-sm' : 'hover:bg-neo-yellow hover:text-neo-text text-neo-muted font-bold border-2 border-transparent hover:border-neo-border hover:shadow-[2px_2px_0px_#000000]'}`}
            >
              <item.icon className={`w-5 h-5 stroke-[3] ${isActive ? 'text-white' : ''}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t-4 border-neo-border bg-neo-surface shrink-0">
        <form action={logoutAction}>
          <button type="submit" className="flex w-full items-center gap-3 px-3 py-2.5 text-neo-muted font-bold rounded-xl hover:bg-neo-pink hover:text-white border-2 border-transparent hover:border-neo-border hover:shadow-brutal-sm transition-all min-h-[44px]">
            <LogOut className="w-5 h-5 stroke-[3]" />
            Logout
          </button>
        </form>
      </div>
    </>
  );


  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-neo-surface text-neo-text flex-shrink-0 flex-col min-h-screen hidden md:flex border-r-4 border-neo-border relative z-20">
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
              className="fixed inset-0 bg-neo-bg/80 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-72 bg-neo-surface text-neo-text flex flex-col z-50 md:hidden border-r-4 border-neo-border shadow-brutal-lg"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
