'use server';
import { ExperienceService } from '../services/ExperienceService';
import { revalidatePath } from 'next/cache';

export async function createExperienceAction(data: any) {
  const result = await ExperienceService.create(data);
  if (result.success) { revalidatePath('/admin/experience'); revalidatePath('/'); }
  return result;
}
export async function updateExperienceAction(id: string, data: any) {
  const result = await ExperienceService.update(id, data);
  if (result.success) { revalidatePath('/admin/experience'); revalidatePath('/'); }
  return result;
}
export async function deleteExperienceAction(id: string) {
  const result = await ExperienceService.delete(id);
  if (result.success) { revalidatePath('/admin/experience'); revalidatePath('/'); }
  return result;
}