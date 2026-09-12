'use server';

import { ProfileService } from '@/services/ProfileService';
import { ProfileSchema, ProfileFormValues } from '@/types/schema';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireAuth } from '@/lib/auth-guard';

export async function saveProfileAction(data: ProfileFormValues) {
  try {
    await requireAuth();

    const parsed = ProfileSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || 'Invalid input data' };
    }
    const result = await ProfileService.saveProfile(parsed.data);
    
    if (result.success) {
      revalidatePath('/admin/profile');
      revalidatePath('/');
      revalidateTag('profile', { expire: 0 });
    }
    
    return result;
  } catch (error: any) {
    console.error('Error in saveProfileAction:', error);
    if (error.message === 'Unauthorized') {
      return { success: false, error: 'Unauthorized. Please sign in.' };
    }
    return { success: false, error: 'Failed to save profile. Please try again.' };
  }
}

