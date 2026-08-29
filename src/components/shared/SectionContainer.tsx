import { ReactNode } from 'react';

export function SectionContainer({ children, id, className = '' }: { children: ReactNode, id: string, className?: string }) {
  return (
    <section id={id} className={`py-16 md:py-20 lg:py-24 ${className}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        {children}
      </div>
    </section>
  );
}
