import { AchievementService } from '@/features/achievement/services/AchievementService';
import { PageHeader } from '@/components/admin/PageHeader';
import { EmptyState } from '@/components/admin/EmptyState';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { deleteAchievementAction } from '@/features/achievement/actions/actions';
import Link from 'next/link';

export default async function AchievementPage() {
  const items = await AchievementService.getAll();
  return (
    <div>
      <PageHeader 
        title="Manage Achievements" 
        description="View and manage your achievements."
        action={<Link href="/admin/achievement/create" className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-white hover:bg-white/20 hover:scale-[1.02] transition-all font-semibold">Add New</Link>}
      />
      {items.length === 0 ? (
        <EmptyState title="No achievements found" description="Get started by creating a new achievement." />
      ) : (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl shadow-black/20 overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm text-slate-600">
            <thead className="bg-white/5 border-b border-white/10 text-slate-300">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {items.map((item: any) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{item.title}</td>
                  <td className="px-6 py-4">
                    {new Date(item.achievement_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link href={`/admin/achievement/${item.id}/edit`} className="text-blue-600 hover:text-blue-800 font-medium">Edit</Link>
                    <DeleteButton id={item.id} action={deleteAchievementAction} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}