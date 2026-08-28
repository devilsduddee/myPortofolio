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
        action={<Link href="/admin/experience/create" className="bg-slate-900 text-white px-4 py-2 rounded-lg">Add New</Link>}
      />
      {items.length === 0 ? (
        <EmptyState title="No experiences found" description="Get started by creating a new experience." />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Position</th>
                <th className="px-6 py-4 font-medium">Duration</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {items.map((item: any) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.company_name}</td>
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