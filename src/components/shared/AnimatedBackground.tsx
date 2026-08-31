'use client';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-neo-bg">
      {/* Neo Brutalist Dot Grid Overlay */}
      <div className="absolute inset-0 bg-dot-grid" />
      
      {/* Decorative Geometric Elements (Safely positioned below the 80px header) */}
      <div className="absolute top-28 left-8 w-16 h-16 border-4 border-neo-border bg-neo-yellow rounded-2xl rotate-12 shadow-brutal-sm hidden lg:block opacity-40" />
      <div className="absolute top-1/3 right-12 w-20 h-20 border-4 border-neo-border bg-neo-pink rounded-full -rotate-6 shadow-brutal-sm hidden lg:block opacity-40" />
      <div className="absolute bottom-24 left-16 w-24 h-12 border-4 border-neo-border bg-neo-blue rounded-xl rotate-4 shadow-brutal-sm hidden lg:block opacity-40" />
      <div className="absolute top-2/3 right-20 w-14 h-14 border-4 border-neo-border bg-neo-green rounded-lg rotate-45 shadow-brutal-sm hidden lg:block opacity-40" />
    </div>
  );
}


