import { AdminLayoutWrapper } from '@/components/admin/AdminLayoutWrapper';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden flex text-neo-text bg-neo-bg relative z-0 selection:bg-neo-blue selection:text-white">
      <AdminLayoutWrapper>
        {children}
      </AdminLayoutWrapper>
    </div>
  );
}
