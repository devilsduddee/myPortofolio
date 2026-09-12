'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExperienceSchema, ExperienceFormValues } from '@/types/schema';
import { createExperienceAction, updateExperienceAction } from '@/features/experience/actions/actions';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { toast } from 'sonner';

export function ExperienceForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ExperienceFormValues>({
    resolver: zodResolver(ExperienceSchema),
    defaultValues: {
      companyName: initialData?.company_name || '',
      position: initialData?.position || '',
      startDate: initialData?.start_date ? format(new Date(initialData.start_date), 'yyyy-MM-dd') : '',
      endDate: initialData?.end_date ? format(new Date(initialData.end_date), 'yyyy-MM-dd') : '',
      description: initialData?.description || '',
    },
  });

  const onSubmit = async (data: ExperienceFormValues) => {
    try {
      const result = initialData 
        ? await updateExperienceAction(initialData.id, data)
        : await createExperienceAction(data);
      
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(initialData ? 'Experience updated successfully!' : 'Experience created successfully!');
        router.push('/admin/experience');
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to save experience');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-neo-surface border-4 border-neo-border rounded-[20px] shadow-brutal p-6 sm:p-8">

      <div className="space-y-2">
        <label htmlFor="companyName" className="block text-xs font-black uppercase text-neo-text tracking-wider">Company Name</label>
        <input 
          id="companyName"
          {...register('companyName')} 
          placeholder="e.g. GoTo, Tokopedia, Google"
          className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
        />
        {errors.companyName && <p className="text-neo-pink text-xs font-black mt-1">{errors.companyName.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="position" className="block text-xs font-black uppercase text-neo-text tracking-wider">Position Title</label>
        <input 
          id="position"
          {...register('position')} 
          placeholder="e.g. Senior Data Analyst / Product Manager"
          className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
        />
        {errors.position && <p className="text-neo-pink text-xs font-black mt-1">{errors.position.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="startDate" className="block text-xs font-black uppercase text-neo-text tracking-wider">Start Date</label>
          <input 
            id="startDate"
            type="date" 
            {...register('startDate')} 
            className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
          />
          {errors.startDate && <p className="text-neo-pink text-xs font-black mt-1">{errors.startDate.message}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="endDate" className="block text-xs font-black uppercase text-neo-text tracking-wider">End Date (Leave empty if current role)</label>
          <input 
            id="endDate"
            type="date" 
            {...register('endDate')} 
            className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
          />
          {errors.endDate && <p className="text-neo-pink text-xs font-black mt-1">{errors.endDate.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-xs font-black uppercase text-neo-text tracking-wider">Description & Key Contributions</label>
        <textarea 
          id="description"
          {...register('description')} 
          rows={5} 
          placeholder="Detail your responsibilities, impacts, and achievements in this role..."
          className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
        />
        {errors.description && <p className="text-neo-pink text-xs font-black mt-1">{errors.description.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-3.5 bg-neo-blue text-white font-extrabold text-sm uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal active:translate-y-0.5 transition-all text-center disabled:opacity-50"
      >
        {isSubmitting ? 'Saving Experience...' : 'Save Experience Record'}
      </button>
    </form>
  );
}

