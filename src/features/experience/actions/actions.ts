'use server';

import { ExperienceService } from '../services/ExperienceService';
import { ExperienceSchema, ExperienceFormValues } from '@/types/schema';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireAuth } from '@/lib/auth-guard';

export async function createExperienceAction(data: ExperienceFormValues) {
  try {
    await requireAuth();

    const parsed = ExperienceSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || 'Invalid input data' };
    }
    const result = await ExperienceService.create(parsed.data);
    if (result.success) {
      revalidatePath('/admin/experience');
      revalidatePath('/');
      revalidateTag('experience', { expire: 0 });
    }
    return result;
  } catch (error: any) {
    console.error('Error in createExperienceAction:', error);
    if (error.message === 'Unauthorized') {
      return { success: false, error: 'Unauthorized. Please sign in.' };
    }
    return { success: false, error: 'Failed to create experience. Please try again.' };
  }
}

export async function updateExperienceAction(id: string, data: ExperienceFormValues) {
  try {
    await requireAuth();

    const parsed = ExperienceSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || 'Invalid input data' };
    }
    const result = await ExperienceService.update(id, parsed.data);
    if (result.success) {
      revalidatePath('/admin/experience');
      revalidatePath('/');
      revalidateTag('experience', { expire: 0 });
    }
    return result;
  } catch (error: any) {
    console.error('Error in updateExperienceAction:', error);
    if (error.message === 'Unauthorized') {
      return { success: false, error: 'Unauthorized. Please sign in.' };
    }
    return { success: false, error: 'Failed to update experience. Please try again.' };
  }
}

export async function deleteExperienceAction(id: string) {
  try {
    await requireAuth();

    const result = await ExperienceService.delete(id);
    if (result.success) {
      revalidatePath('/admin/experience');
      revalidatePath('/');
      revalidateTag('experience', { expire: 0 });
    }
    return result;
  } catch (error: any) {
    console.error('Error in deleteExperienceAction:', error);
    if (error.message === 'Unauthorized') {
      return { success: false, error: 'Unauthorized. Please sign in.' };
    }
    return { success: false, error: 'Failed to delete experience. Please try again.' };
  }
}