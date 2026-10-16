import { AchievementService } from '@/features/achievement/AchievementService';
import { PageHeader } from '@/components/admin/PageHeader';
import { EmptyState } from '@/components/admin/EmptyState';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { deleteAchievementAction } from '@/features/achievement/actions';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AchievementPage() {

  const items = await AchievementService.getAll();
  
  return (
    <div>
      <PageHeader 
        title="Manage Achievements" 
        description="View, edit, and manage your certificates and awards."
        action={
          <Link 
            href="/admin/achievement/create" 
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-neo-blue text-white font-extrabold text-xs uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Achievement</span>
          </Link>
        }
      />

      {items.length === 0 ? (
        <EmptyState title="No achievements found" description="Get started by creating a new award or certification record." />
      ) : (
        <>
          {/* Tampilan Kartu Khusus Mobile (< md) */}
          <div className="md:hidden space-y-3">
            {items.map((item: any) => (
              <div 
                key={item.id} 
                className="bg-neo-surface border-3 border-neo-border rounded-[18px] p-4 shadow-brutal flex flex-col gap-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-black text-neo-text leading-snug">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Link 
                      href={`/admin/achievement/${item.id}/edit`} 
                      className="px-2.5 py-1 bg-neo-yellow text-neo-text font-black text-[11px] uppercase tracking-wider rounded-lg border-2 border-neo-border shadow-[1.5px_1.5px_0px_#000000] active:scale-95 transition-all inline-block"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={item.id} action={deleteAchievementAction} />
                  </div>
                </div>

                <div className="text-[11px] font-black uppercase text-neo-muted bg-neo-bg border-1.5 border-neo-border px-2.5 py-1 rounded-md inline-block w-fit">
                  {new Date(item.achievement_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
              </div>
            ))}
          </div>

          {/* Tampilan Tabel untuk Tablet & Desktop (>= md) */}
          <div className="hidden md:block bg-neo-surface border-4 border-neo-border rounded-[20px] shadow-brutal overflow-x-auto">
            <table className="w-full text-left text-sm text-neo-text">
              <thead className="bg-neo-yellow border-b-4 border-neo-border text-neo-text font-black uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4">Achievement Title</th>
                  <th className="px-6 py-4">Date Issued</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-neo-border font-bold">
                {items.map((item: any) => (
                  <tr key={item.id} className="hover:bg-neo-yellow/10 transition-colors">
                    <td className="px-6 py-4 text-base font-black text-neo-text">{item.title}</td>
                    <td className="px-6 py-4 text-xs font-black uppercase text-neo-muted">
                      {new Date(item.achievement_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link 
                        href={`/admin/achievement/${item.id}/edit`} 
                        className="px-3 py-1.5 bg-neo-yellow text-neo-text font-black text-xs uppercase tracking-wider rounded-xl border-2 border-neo-border shadow-[2px_2px_0px_#000000] hover:-translate-y-0.5 transition-all inline-block"
                      >
                        Edit
                      </Link>
                      <DeleteButton id={item.id} action={deleteAchievementAction} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
