import { ProjectService } from '@/features/project/services/ProjectService';
import { PageHeader } from '@/components/admin/PageHeader';
import { EmptyState } from '@/components/admin/EmptyState';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { deleteProjectAction } from '@/features/project/actions/actions';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ProjectPage() {

  const items = await ProjectService.getAll();
  
  return (
    <div>
      <PageHeader 
        title="Manage Projects" 
        description="View, edit, and manage your showcase project portfolio."
        action={
          <Link 
            href="/admin/project/create" 
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-neo-blue text-white font-extrabold text-xs uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Project</span>
          </Link>
        }
      />

      {items.length === 0 ? (
        <EmptyState title="No projects found" description="Get started by creating your first showcase project." />
      ) : (
        <div className="bg-neo-surface border-4 border-neo-border rounded-[20px] shadow-brutal overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm text-neo-text">
            <thead className="bg-neo-yellow border-b-4 border-neo-border text-neo-text font-black uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Project Name</th>
                <th className="px-6 py-4">Tech Stack</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-neo-border font-bold">
              {items.map((item: any) => (
                <tr key={item.id} className="hover:bg-neo-yellow/10 transition-colors">
                  <td className="px-6 py-4 text-base font-black text-neo-text">{item.project_name}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5 flex-wrap">
                      {item.tech_stack?.split(',').map((tech: string, i: number) => (
                        <span 
                          key={i} 
                          className="px-2.5 py-1 bg-neo-surface border-2 border-neo-border rounded-lg text-xs font-extrabold text-neo-text shadow-[2px_2px_0px_#000000]"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link 
                      href={`/admin/project/${item.id}/edit`} 
                      className="px-3 py-1.5 bg-neo-yellow text-neo-text font-black text-xs uppercase tracking-wider rounded-xl border-2 border-neo-border shadow-[2px_2px_0px_#000000] hover:-translate-y-0.5 transition-all inline-block"
                    >
                      Edit
                    </Link>
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