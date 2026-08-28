'use server';
import { AchievementService } from '../services/AchievementService';
import { revalidatePath } from 'next/cache';

export async function createAchievementAction(data: any) {
  const result = await AchievementService.create(data);
  if (result.success) { revalidatePath('/admin/achievement'); revalidatePath('/'); }
  return result;
}
export async function updateAchievementAction(id: string, data: any) {
  const result = await AchievementService.update(id, data);
  if (result.success) { revalidatePath('/admin/achievement'); revalidatePath('/'); }
  return result;
}
export async function deleteAchievementAction(id: string) {
  const result = await AchievementService.delete(id);
  if (result.success) { revalidatePath('/admin/achievement'); revalidatePath('/'); }
  return result;
}