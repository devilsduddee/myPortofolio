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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-neo-surface border-4 border-neo-border rounded-[20px] shadow-brutal p-6 sm:p-8">
      
      {status && (
        <div className={`p-4 rounded-xl border-3 border-neo-border font-extrabold text-sm shadow-brutal-sm ${
          status.type === 'success' ? 'bg-emerald-100 text-emerald-950' : 'bg-neo-pink/20 text-neo-pink'
        }`}>
          {status.msg}
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-xs font-black uppercase text-neo-text tracking-wider">Project Name</label>
        <input 
          {...register('projectName')} 
          placeholder="e.g. Questify — AI EdTech Web Platform"
          className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
        />
        {errors.projectName && <p className="text-neo-pink text-xs font-black mt-1">{errors.projectName.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-black uppercase text-neo-text tracking-wider">Tech Stack (comma separated)</label>
        <input 
          {...register('techStack')} 
          placeholder="React, TypeScript, Vite, Tailwind CSS, Supabase" 
          className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
        />
        {errors.techStack && <p className="text-neo-pink text-xs font-black mt-1">{errors.techStack.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-black uppercase text-neo-text tracking-wider">Project Cover Image</label>
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
        {errors.imageUrl && <p className="text-neo-pink text-xs font-black mt-1">{errors.imageUrl.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-xs font-black uppercase text-neo-text tracking-wider">Live Demo URL</label>
          <input 
            {...register('demoUrl')} 
            type="url" 
            placeholder="https://..."
            className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
          />
          {errors.demoUrl && <p className="text-neo-pink text-xs font-black mt-1">{errors.demoUrl.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-black uppercase text-neo-text tracking-wider">Repository URL</label>
          <input 
            {...register('repositoryUrl')} 
            type="url" 
            placeholder="https://github.com/..."
            className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
          />
          {errors.repositoryUrl && <p className="text-neo-pink text-xs font-black mt-1">{errors.repositoryUrl.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-black uppercase text-neo-text tracking-wider">Project Description</label>
        <textarea 
          {...register('description')} 
          rows={5} 
          placeholder="Describe your project, key problems solved, architecture, and features..."
          className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
        />
        {errors.description && <p className="text-neo-pink text-xs font-black mt-1">{errors.description.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-3.5 bg-neo-blue text-white font-extrabold text-sm uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal active:translate-y-0.5 transition-all text-center disabled:opacity-50"
      >
        {isSubmitting ? 'Saving Project...' : 'Save Project Entry'}
      </button>
    </form>
  );
}

