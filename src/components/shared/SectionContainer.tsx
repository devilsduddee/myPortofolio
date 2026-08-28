import { ReactNode } from 'react';

export function SectionContainer({ children, id, className = '' }: { children: ReactNode, id: string, className?: string }) {
  return (
    <section id={id} className={`py-20 md:py-24 ${className}`}>
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {children}
      </div>
    </section>
  );
}
