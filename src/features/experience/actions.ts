/**
 * File        : src/features/experience/actions/actions.ts
 * Deskripsi   : Server Actions untuk manajemen CRUD entitas pengalaman kerja (Experience).
 */

'use server';

import { ExperienceService } from './ExperienceService';
import { ExperienceSchema, ExperienceFormValues } from '@/types/schema';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireAuth } from '@/lib/auth-guard';

/**
 * Membuat data pengalaman kerja baru di database.
 *
 * Kegunaan : Memvalidasi input formulir pengalaman, membuat entitas baru, dan memperbarui cache.
 * Input    : data (Objek ExperienceFormValues)
 * Hasil    : Objek status { success: boolean, data?: Experience, error?: string }.
 */
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

/**
 * Memperbarui data pengalaman kerja yang ada.
 *
 * Kegunaan : Memvalidasi input, memperbarui pengalaman berdasarkan ID, dan membersihkan cache.
 * Input    : id (String ID pengalaman), data (Objek ExperienceFormValues)
 * Hasil    : Objek status { success: boolean, data?: Experience, error?: string }.
 */
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

/**
 * Menghapus data pengalaman kerja.
 *
 * Kegunaan : Menghapus riwayat pengalaman berdasarkan ID dan memperbarui cache tampilan.
 * Input    : id (String ID pengalaman kerja)
 * Hasil    : Objek status { success: boolean, error?: string }.
 */
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

