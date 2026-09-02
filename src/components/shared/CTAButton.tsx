'use client';

import { ReactNode, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    if (!wrapperRef.current || !buttonRef.current) return;

    const wrapper = wrapperRef.current;
    const btn = buttonRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.55;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.55;

      gsap.to(btn, {
        x,
        y,
        rotate: x * 0.12,
        duration: 0.25,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        rotate: 0,
        duration: 0.75,
        ease: 'elastic.out(1.1, 0.35)',
      });
    };

    wrapper.addEventListener('mousemove', handleMouseMove);
    wrapper.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      wrapper.removeEventListener('mousemove', handleMouseMove);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: wrapperRef });

  const variantStyles = {
    primary: "bg-neo-blue text-white hover:bg-blue-700",
    secondary: "bg-neo-yellow text-neo-text hover:bg-yellow-400",
    accent: "bg-neo-pink text-white hover:bg-pink-600",
    outline: "bg-neo-surface text-neo-text hover:bg-slate-100"
  };
  
  const brutalStyle = `inline-flex items-center justify-center font-extrabold text-base tracking-wide border-3 md:border-4 border-neo-border shadow-brutal-sm rounded-2xl px-6 py-3.5 brutal-btn-hover transition-transform cursor-pointer ${variantStyles[variant]} ${className}`;
  
  return (
    <div ref={wrapperRef} className="relative inline-block p-6 sm:p-8 -m-6 sm:-m-8 pointer-events-auto">
      <a 
        ref={buttonRef}
        href={href} 
        className={brutalStyle}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    </div>
  );
}



