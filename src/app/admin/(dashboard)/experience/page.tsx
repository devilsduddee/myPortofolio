import { ExperienceService } from '@/features/experience/services/ExperienceService';
import { PageHeader } from '@/components/admin/PageHeader';
import { EmptyState } from '@/components/admin/EmptyState';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { deleteExperienceAction } from '@/features/experience/actions/actions';
import Link from 'next/link';

export default async function ExperiencePage() {
  const items = await ExperienceService.getAll();
  return (
    <div>
      <PageHeader 
        title="Manage Experiences" 
        description="View and manage your experiences."
        action={<Link href="/admin/experience/create" className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-white hover:bg-white/20 hover:scale-[1.02] transition-all font-semibold">Add New</Link>}
      />
      {items.length === 0 ? (
        <EmptyState title="No experiences found" description="Get started by creating a new experience." />
      ) : (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl shadow-black/20 overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm text-slate-600">
            <thead className="bg-white/5 border-b border-white/10 text-slate-300">
              <tr>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Position</th>
                <th className="px-6 py-4 font-medium">Duration</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {items.map((item: any) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{item.company_name}</td>
                  <td className="px-6 py-4">{item.position}</td>
                  <td className="px-6 py-4">
                    {new Date(item.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} 
                    {' - '} 
                    {item.end_date ? new Date(item.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link href={`/admin/experience/${item.id}/edit`} className="text-blue-600 hover:text-blue-800 font-medium">Edit</Link>
                    <DeleteButton id={item.id} action={deleteExperienceAction} />
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