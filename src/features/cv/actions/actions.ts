'use server';

import { CvService } from '../services/CvService';
import { CvSchema, CvFormValues } from '../validation/schema';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireAuth } from '@/lib/auth-guard';

export async function saveCvAction(data: CvFormValues) {
  try {
    await requireAuth();

    const parsed = CvSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || 'Invalid input data' };
    }
    const result = await CvService.save(parsed.data);
    if (result.success) {
      revalidatePath('/admin/cv');
      revalidatePath('/');
      revalidateTag('profile', { expire: 0 });
    }
    return result;
  } catch (error: any) {
    console.error('Error in saveCvAction:', error);
    if (error.message === 'Unauthorized') {
      return { success: false, error: 'Unauthorized. Please sign in.' };
    }
    return { success: false, error: 'Failed to save CV. Please try again.' };
  }
}