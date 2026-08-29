import { ReactNode } from 'react';

export function Card({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/20 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 ${className}`}>
      {children}
    </div>
  );
}
