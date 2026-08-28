'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectSchema, ProjectFormValues } from '@/types/schema';
import { createProjectAction, updateProjectAction } from '@/features/project/actions/actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageUploader } from '@/components/shared/ImageUploader';

export function ProjectForm({ initialData }: { initialData?: any }) {
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
  const router = useRouter();
  
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      projectName: initialData?.project_name || '',
      description: initialData?.description || '',
      techStack: initialData?.tech_stack || '',
      imageUrl: initialData?.image_url || '',
      demoUrl: initialData?.demo_url || '',
      repositoryUrl: initialData?.repository_url || '',
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    setStatus(null);
    
    const result = initialData 
      ? await updateProjectAction(initialData.id, data)
      : await createProjectAction(data);
    
    if (result.error) {
      setStatus({ type: 'error', msg: result.error });
    } else {
      setStatus({ type: 'success', msg: 'Project saved successfully!' });
      router.push('/admin/project');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      
      {status && (
        <div className={`p-4 rounded-lg text-sm ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
          {status.msg}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
        <input {...register('projectName')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        {errors.projectName && <p className="text-red-500 text-sm mt-1">{errors.projectName.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Tech Stack (comma separated)</label>
        <input {...register('techStack')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Next.js, TailwindCSS, Prisma" />
        {errors.techStack && <p className="text-red-500 text-sm mt-1">{errors.techStack.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Project Image</label>
        <Controller
          name="imageUrl"
          control={control}
          render={({ field }) => (
            <ImageUploader
              value={field.value || ''}
              onChange={field.onChange}
              bucket="portofolio"
              pathPrefix="projects"
            />
          )}
        />
        {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Demo URL</label>
          <input {...register('demoUrl')} type="url" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          {errors.demoUrl && <p className="text-red-500 text-sm mt-1">{errors.demoUrl.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Repository URL</label>
          <input {...register('repositoryUrl')} type="url" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          {errors.repositoryUrl && <p className="text-red-500 text-sm mt-1">{errors.repositoryUrl.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <textarea {...register('description')} rows={5} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Save Project'}
      </button>
    </form>
  );
}
