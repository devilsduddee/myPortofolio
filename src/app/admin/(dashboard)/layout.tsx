import { AdminLayoutWrapper } from '@/components/admin/AdminLayoutWrapper';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className="h-screen overflow-hidden flex text-neo-text bg-neo-bg relative z-0 selection:bg-neo-blue selection:text-white">
      <AdminLayoutWrapper>
        {children}
      </AdminLayoutWrapper>
    </div>
  );
}

