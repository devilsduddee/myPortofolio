import { AchievementRepository } from '../repositories/AchievementRepository';
import { AchievementSchema } from '../validation/schema';

export class AchievementService {
  static async getAll() { return await AchievementRepository.findAll(); }
  static async getById(id: string) { return await AchievementRepository.findById(id); }
  
  static async create(data: any) {
    const validated = AchievementSchema.safeParse(data);
    if (!validated.success) return { error: 'Validation failed', details: validated.error.flatten() };
    try {
      const dbData = {
        title: validated.data.title,
        description: validated.data.description,
        achievement_date: validated.data.date ? new Date(validated.data.date).toISOString() : new Date().toISOString(),
        certificate_url: validated.data.certificateUrl,
      };
      const result = await AchievementRepository.create(dbData);
      return { success: true, data: result };
    } catch (e: any) { return { error: e.message }; }
  }

  static async update(id: string, data: any) {
    const validated = AchievementSchema.safeParse(data);
    if (!validated.success) return { error: 'Validation failed', details: validated.error.flatten() };
    try {
      const dbData = {
        title: validated.data.title,
        description: validated.data.description,
        achievement_date: validated.data.date ? new Date(validated.data.date).toISOString() : new Date().toISOString(),
        certificate_url: validated.data.certificateUrl,
      };
      const result = await AchievementRepository.update(id, dbData);
      return { success: true, data: result };
    } catch (e: any) { return { error: e.message }; }
  }

  static async delete(id: string) {
    try {
      await AchievementRepository.delete(id);
      return { success: true };
    } catch (e: any) { return { error: e.message }; }
  }
}