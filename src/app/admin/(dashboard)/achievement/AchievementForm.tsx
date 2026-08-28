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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      
      {status && (
        <div className={`p-4 rounded-lg text-sm ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
          {status.msg}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
        <input {...register('title')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
        <input type="date" {...register('date')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Certificate Image/Document</label>
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
        {errors.certificateUrl && <p className="text-red-500 text-sm mt-1">{errors.certificateUrl.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <textarea {...register('description')} rows={5} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Save Achievement'}
      </button>
    </form>
  );
}
