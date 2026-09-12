'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileSchema, ProfileFormValues } from '@/types/schema';
import { saveProfileAction } from '@/features/profile/actions';
import { ImageUploader } from '@/components/shared/ImageUploader';
import { toast } from 'sonner';

export function ProfileForm({ initialData }: { initialData: any }) {
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
    try {
      const result = await saveProfileAction(data);
      
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success('Profile saved successfully!');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to save profile');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-neo-surface border-4 border-neo-border rounded-[20px] shadow-brutal p-6 sm:p-8">

      <div className="space-y-2">
        <label htmlFor="name" className="block text-xs font-black uppercase text-neo-text tracking-wider">Full Name</label>
        <input 
          id="name"
          {...register('name')} 
          className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
        />
        {errors.name && <p className="text-neo-pink text-xs font-black mt-1">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="title" className="block text-xs font-black uppercase text-neo-text tracking-wider">Professional Title (Comma separated for badges)</label>
        <input 
          id="title"
          {...register('title')} 
          placeholder="e.g. Data Analyst, Product Manager"
          className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
        />
        {errors.title && <p className="text-neo-pink text-xs font-black mt-1">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="tagline" className="block text-xs font-black uppercase text-neo-text tracking-wider">Tagline</label>
        <input 
          id="tagline"
          {...register('tagline')} 
          className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
        />
        {errors.tagline && <p className="text-neo-pink text-xs font-black mt-1">{errors.tagline.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="aboutMe" className="block text-xs font-black uppercase text-neo-text tracking-wider">About Me Summary</label>
        <textarea 
          id="aboutMe"
          {...register('aboutMe')} 
          rows={5} 
          className="w-full px-4 py-3 bg-neo-surface border-3 border-neo-border rounded-xl font-bold text-neo-text placeholder:text-neo-muted/60 focus:bg-neo-yellow/10 focus:shadow-brutal-sm outline-none transition-all" 
        />
        {errors.aboutMe && <p className="text-neo-pink text-xs font-black mt-1">{errors.aboutMe.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="avatarUrl" className="block text-xs font-black uppercase text-neo-text tracking-wider">Profile Photo</label>
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
        {errors.avatarUrl && <p className="text-neo-pink text-xs font-black mt-1">{errors.avatarUrl.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-3.5 bg-neo-blue text-white font-extrabold text-sm uppercase tracking-wider rounded-xl border-3 border-neo-border shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal active:translate-y-0.5 transition-all text-center disabled:opacity-50"
      >
        {isSubmitting ? 'Saving Profile...' : 'Save Profile Changes'}
      </button>
    </form>
  );
}

