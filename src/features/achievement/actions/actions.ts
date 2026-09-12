'use server';

import { AchievementService } from '../services/AchievementService';
import { AchievementSchema, AchievementFormValues } from '../validation/schema';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireAuth } from '@/lib/auth-guard';

export async function createAchievementAction(data: AchievementFormValues) {
  try {
    await requireAuth();

    const parsed = AchievementSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || 'Invalid input data' };
    }
    const result = await AchievementService.create(parsed.data);
    if (result.success) {
      revalidatePath('/admin/achievement');
      revalidatePath('/');
      revalidateTag('achievement', { expire: 0 });
    }
    return result;
  } catch (error: any) {
    console.error('Error in createAchievementAction:', error);
    if (error.message === 'Unauthorized') {
      return { success: false, error: 'Unauthorized. Please sign in.' };
    }
    return { success: false, error: 'Failed to create achievement. Please try again.' };
  }
}

export async function updateAchievementAction(id: string, data: AchievementFormValues) {
  try {
    await requireAuth();

    const parsed = AchievementSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || 'Invalid input data' };
    }
    const result = await AchievementService.update(id, parsed.data);
    if (result.success) {
      revalidatePath('/admin/achievement');
      revalidatePath('/');
      revalidateTag('achievement', { expire: 0 });
    }
    return result;
  } catch (error: any) {
    console.error('Error in updateAchievementAction:', error);
    if (error.message === 'Unauthorized') {
      return { success: false, error: 'Unauthorized. Please sign in.' };
    }
    return { success: false, error: 'Failed to update achievement. Please try again.' };
  }
}

export async function deleteAchievementAction(id: string) {
  try {
    await requireAuth();

    const result = await AchievementService.delete(id);
    if (result.success) {
      revalidatePath('/admin/achievement');
      revalidatePath('/');
      revalidateTag('achievement', { expire: 0 });
    }
    return result;
  } catch (error: any) {
    console.error('Error in deleteAchievementAction:', error);
    if (error.message === 'Unauthorized') {
      return { success: false, error: 'Unauthorized. Please sign in.' };
    }
    return { success: false, error: 'Failed to delete achievement. Please try again.' };
  }
}