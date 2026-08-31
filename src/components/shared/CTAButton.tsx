'use client';
import { ReactNode } from 'react';

export function CTAButton({ 
  children, 
  href, 
  className = '', 
  variant = 'primary',
  target,
  rel
}: { 
  children: ReactNode, 
  href: string, 
  variant?: 'primary' | 'secondary' | 'accent' | 'outline', 
  className?: string,
  target?: string,
  rel?: string
}) {
  const variantStyles = {
    primary: "bg-neo-blue text-white hover:bg-blue-700",
    secondary: "bg-neo-yellow text-neo-text hover:bg-yellow-400",
    accent: "bg-neo-pink text-white hover:bg-pink-600",
    outline: "bg-neo-surface text-neo-text hover:bg-slate-100"
  };
  
  const brutalStyle = `inline-flex items-center justify-center font-extrabold text-base tracking-wide border-3 md:border-4 border-neo-border shadow-brutal-sm rounded-2xl px-6 py-3.5 brutal-btn-hover transition-all cursor-pointer ${variantStyles[variant]} ${className}`;
  
  return (
    <a 
      href={href} 
      className={brutalStyle}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}

