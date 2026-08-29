import { ReactNode } from 'react';

export function CTAButton({ children, href, className = '' }: { children: ReactNode, href: string, variant?: 'primary' | 'secondary', className?: string }) {
  // We unify both variants into the requested glass button style
  const glassStyle = "inline-flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white font-medium hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg shadow-black/20";
  
  return (
    <a href={href} className={`${glassStyle} ${className}`}>
      {children}
    </a>
  );
}
