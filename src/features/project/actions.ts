/**
 * File        : src/features/project/actions/actions.ts
 * Deskripsi   : Server Actions untuk manajemen CRUD entitas proyek (Project).
 *               Menangani penambahan, pembaruan, penghapusan proyek, serta pembaharuan cache halaman.
 */

'use server';

import { ProjectService } from './ProjectService';
import { ProjectSchema, ProjectFormValues } from '@/types/schema';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireAuth } from '@/lib/auth-guard';

/**
 * Membuat data proyek baru di database.
 *
 * Kegunaan : Memvalidasi input formulir proyek, menambahkan proyek baru, dan memperbarui cache.
 * Input    : data (Objek ProjectFormValues dari form proyek)
 * Hasil    : Objek status { success: boolean, data?: Project, error?: string }.
 */
export async function createProjectAction(data: ProjectFormValues) {
  try {
    await requireAuth();

    const parsed = ProjectSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || 'Invalid input data' };
    }
    const result = await ProjectService.create(parsed.data);
    if (result.success) {
      revalidatePath('/admin/project');
      revalidatePath('/');
      revalidateTag('project', { expire: 0 });
    }
    return result;
  } catch (error: any) {
    console.error('Error in createProjectAction:', error);
    if (error.message === 'Unauthorized') {
      return { success: false, error: 'Unauthorized. Please sign in.' };
    }
    return { success: false, error: 'Failed to create project. Please try again.' };
  }
}

/**
 * Memperbarui data proyek yang sudah ada.
 *
 * Kegunaan : Memvalidasi input, memperbarui entitas proyek berdasarkan ID, dan membersihkan cache.
 * Input    : id (String ID proyek), data (Objek ProjectFormValues)
 * Hasil    : Objek status { success: boolean, data?: Project, error?: string }.
 */
export async function updateProjectAction(id: string, data: ProjectFormValues) {
  try {
    await requireAuth();

    const parsed = ProjectSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || 'Invalid input data' };
    }
    const result = await ProjectService.update(id, parsed.data);
    if (result.success) {
      revalidatePath('/admin/project');
      revalidatePath('/');
      revalidateTag('project', { expire: 0 });
    }
    return result;
  } catch (error: any) {
    console.error('Error in updateProjectAction:', error);
    if (error.message === 'Unauthorized') {
      return { success: false, error: 'Unauthorized. Please sign in.' };
    }
    return { success: false, error: 'Failed to update project. Please try again.' };
  }
}

/**
 * Menghapus data proyek dari database.
 *
 * Kegunaan : Menghapus proyek berdasarkan ID dan memperbarui cache tampilan publik dan admin.
 * Input    : id (String ID proyek yang ingin dihapus)
 * Hasil    : Objek status { success: boolean, error?: string }.
 */
export async function deleteProjectAction(id: string) {
  try {
    await requireAuth();

    const result = await ProjectService.delete(id);
    if (result.success) {
      revalidatePath('/admin/project');
      revalidatePath('/');
      revalidateTag('project', { expire: 0 });
    }
    return result;
  } catch (error: any) {
    console.error('Error in deleteProjectAction:', error);
    if (error.message === 'Unauthorized') {
      return { success: false, error: 'Unauthorized. Please sign in.' };
    }
    return { success: false, error: 'Failed to delete project. Please try again.' };
  }
}

