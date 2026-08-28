import { ReactNode } from 'react';

export function CTAButton({ children, href, variant = 'primary', className = '' }: { children: ReactNode, href: string, variant?: 'primary' | 'secondary', className?: string }) {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ease-out hover:-translate-y-1";
  const primaryStyle = "bg-blue-600 text-white hover:bg-blue-700 shadow-[0_8px_30px_rgba(37,99,235,0.2)]";
  const secondaryStyle = "bg-white/80 backdrop-blur-md text-slate-700 border border-slate-200/50 hover:bg-white hover:border-slate-300 shadow-sm";
  
  return (
    <a href={href} className={`${baseStyle} ${variant === 'primary' ? primaryStyle : secondaryStyle} ${className}`}>
      {children}
    </a>
  );
}
