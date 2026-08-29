import { AnimatedBackground } from '@/components/shared/AnimatedBackground';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative overflow-hidden selection:bg-purple-500/30 selection:text-white">
      <AnimatedBackground />
      <main className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 relative z-10 w-full flex flex-col">
        {children}
      </main>
    </div>
  );
}
