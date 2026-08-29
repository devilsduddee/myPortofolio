import { AnimatedBackground } from '@/components/shared/AnimatedBackground';
import { AdminLayoutWrapper } from '@/components/admin/AdminLayoutWrapper';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden flex text-slate-200 bg-slate-950 relative z-0">
      <AnimatedBackground />
      <AdminLayoutWrapper>
        {children}
      </AdminLayoutWrapper>
    </div>
  );
}
