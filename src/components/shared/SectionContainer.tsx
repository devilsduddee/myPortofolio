import { ReactNode } from 'react';

export function SectionContainer({ children, id, className = '' }: { children: ReactNode, id: string, className?: string }) {
  return (
    <section id={id} className={`py-12 md:py-16 lg:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {children}
      </div>
    </section>
  );
}

