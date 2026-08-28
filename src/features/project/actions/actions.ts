'use server';
import { ProjectService } from '../services/ProjectService';
import { revalidatePath } from 'next/cache';

export async function createProjectAction(data: any) {
  const result = await ProjectService.create(data);
  if (result.success) { revalidatePath('/admin/project'); revalidatePath('/'); }
  return result;
}
export async function updateProjectAction(id: string, data: any) {
  const result = await ProjectService.update(id, data);
  if (result.success) { revalidatePath('/admin/project'); revalidatePath('/'); }
  return result;
}
export async function deleteProjectAction(id: string) {
  const result = await ProjectService.delete(id);
  if (result.success) { revalidatePath('/admin/project'); revalidatePath('/'); }
  return result;
}