import { AnimatedBackground } from '@/components/shared/AnimatedBackground';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-neo-yellow selection:text-neo-text">
      <AnimatedBackground />
      <div className="relative z-10 w-full flex flex-col pt-[80px]">
        {children}
      </div>
    </div>
  );
}


