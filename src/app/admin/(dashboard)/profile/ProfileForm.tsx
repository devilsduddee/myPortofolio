'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileSchema, ProfileFormValues } from '@/types/schema';
import { saveProfileAction } from '@/features/profile/actions';
import { useState } from 'react';
import { ImageUploader } from '@/components/shared/ImageUploader';

export function ProfileForm({ initialData }: { initialData: any }) {
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
  
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: initialData?.full_name || '',
      title: initialData?.title || '',
      tagline: initialData?.tagline || '',
      aboutMe: initialData?.about_me || '',
      avatarUrl: initialData?.profile_photo || '',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setStatus(null);
    const result = await saveProfileAction(data);
    
    if (result.error) {
      setStatus({ type: 'error', msg: result.error });
    } else {
      setStatus({ type: 'success', msg: 'Profile saved successfully!' });
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
        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
        <input {...register('name')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Professional Title</label>
        <input {...register('title')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Tagline</label>
        <input {...register('tagline')} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        {errors.tagline && <p className="text-red-500 text-sm mt-1">{errors.tagline.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">About Me</label>
        <textarea {...register('aboutMe')} rows={5} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        {errors.aboutMe && <p className="text-red-500 text-sm mt-1">{errors.aboutMe.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Profile Photo (Optional)</label>
        <Controller
          name="avatarUrl"
          control={control}
          render={({ field }) => (
            <ImageUploader
              value={field.value || ''}
              onChange={field.onChange}
              bucket="portofolio"
              pathPrefix="profiles"
            />
          )}
        />
        {errors.avatarUrl && <p className="text-red-500 text-sm mt-1">{errors.avatarUrl.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  );
}
