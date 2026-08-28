import { ProjectService } from '@/features/project/services/ProjectService';
import { PageHeader } from '@/components/admin/PageHeader';
import { EmptyState } from '@/components/admin/EmptyState';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { deleteProjectAction } from '@/features/project/actions/actions';
import Link from 'next/link';

export default async function ProjectPage() {
  const items = await ProjectService.getAll();
  return (
    <div>
      <PageHeader 
        title="Manage Projects" 
        description="View and manage your projects."
        action={<Link href="/admin/project/create" className="bg-slate-900 text-white px-4 py-2 rounded-lg">Add New</Link>}
      />
      {items.length === 0 ? (
        <EmptyState title="No projects found" description="Get started by creating a new project." />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Project Name</th>
                <th className="px-6 py-4 font-medium">Tech Stack</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {items.map((item: any) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.project_name}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {item.tech_stack?.split(',').map((tech: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-slate-100 rounded text-xs">{tech.trim()}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link href={`/admin/project/${item.id}/edit`} className="text-blue-600 hover:text-blue-800 font-medium">Edit</Link>
                    <DeleteButton id={item.id} action={deleteProjectAction} />
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