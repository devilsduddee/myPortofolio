// In Next.js App Router, middleware is enough to secure routes before they even render.
// This is a layout-level wrapper that ensures the session exists, just as an extra check.
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  return <>{children}</>;
}
