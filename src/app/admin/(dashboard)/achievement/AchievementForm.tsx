'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AchievementSchema, AchievementFormValues } from '@/features/achievement/validation/schema';
import { createAchievementAction, updateAchievementAction } from '@/features/achievement/actions/actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageUploader } from '@/components/shared/ImageUploader';
import { format } from 'date-fns';

export function AchievementForm({ initialData }: { initialData?: any }) {
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
  const router = useRouter();
  
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<AchievementFormValues>({
    resolver: zodResolver(AchievementSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      date: initialData?.achievement_date ? format(new Date(initialData.achievement_date), 'yyyy-MM-dd') : '',
      certificateUrl: initialData?.certificate_url || '',
    },
  });

  const onSubmit = async (data: AchievementFormValues) => {
    setStatus(null);
    
    const result = initialData 
      ? await updateAchievementAction(initialData.id, data)
      : await createAchievementAction(data);
    
    if (result.error) {
      setStatus({ type: 'error', msg: result.error });
    } else {
      setStatus({ type: 'success', msg: 'Achievement saved successfully!' });
      router.push('/admin/achievement');
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
        <label className="block text-xs font-black uppercase text-neo-text tracking-wider">Achievement Title</label>
        <input 
          {...register('title')} 
          placeholder="e.g. AWS Certified Cloud Practitioner / Hackathon 1st Place"
          className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
          required 
        />
        {errors.title && <p className="text-neo-pink text-xs font-black mt-1">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-black uppercase text-neo-text tracking-wider">Date Issued</label>
        <input 
          type="date" 
          {...register('date')} 
          className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
          required 
        />
        {errors.date && <p className="text-neo-pink text-xs font-black mt-1">{errors.date.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-black uppercase text-neo-text tracking-wider">Certificate Image or PDF Document</label>
        <Controller
          name="certificateUrl"
          control={control}
          render={({ field }) => (
            <ImageUploader
              value={field.value || ''}
              onChange={field.onChange}
              bucket="portofolio"
              pathPrefix="achievements"
              accept="image/*,application/pdf"
            />
          )}
        />
        {errors.certificateUrl && <p className="text-neo-pink text-xs font-black mt-1">{errors.certificateUrl.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-black uppercase text-neo-text tracking-wider">Description</label>
        <textarea 
          {...register('description')} 
          rows={5} 
          placeholder="Describe the recognition, issuing organization, criteria, or context..."
          className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
          required 
        />
        {errors.description && <p className="text-neo-pink text-xs font-black mt-1">{errors.description.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-3.5 bg-neo-blue text-white font-extrabold text-sm uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal active:translate-y-0.5 transition-all text-center disabled:opacity-50"
      >
        {isSubmitting ? 'Saving Achievement...' : 'Save Achievement Entry'}
      </button>
    </form>
  );
}

