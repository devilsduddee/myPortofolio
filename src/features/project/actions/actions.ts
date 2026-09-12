'use server';

import { ProjectService } from '../services/ProjectService';
import { ProjectSchema, ProjectFormValues } from '@/types/schema';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireAuth } from '@/lib/auth-guard';

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