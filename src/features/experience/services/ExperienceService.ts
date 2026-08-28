import { ExperienceRepository } from '../repositories/ExperienceRepository';
import { ExperienceSchema } from '../validation/schema';

export class ExperienceService {
  static async getAll() { return await ExperienceRepository.findAll(); }
  static async getById(id: string) { return await ExperienceRepository.findById(id); }
  
  static async create(data: any) {
    const validated = ExperienceSchema.safeParse(data);
    if (!validated.success) return { error: 'Validation failed', details: validated.error.flatten() };
    try {
      const dbData = {
        company_name: validated.data.companyName,
        position: validated.data.position,
        start_date: validated.data.startDate ? new Date(validated.data.startDate).toISOString() : new Date().toISOString(),
        end_date: validated.data.endDate ? new Date(validated.data.endDate).toISOString() : null,
        description: validated.data.description,
      };
      const result = await ExperienceRepository.create(dbData);
      return { success: true, data: result };
    } catch (e: any) { return { error: e.message }; }
  }

  static async update(id: string, data: any) {
    const validated = ExperienceSchema.safeParse(data);
    if (!validated.success) return { error: 'Validation failed', details: validated.error.flatten() };
    try {
      const dbData = {
        company_name: validated.data.companyName,
        position: validated.data.position,
        start_date: validated.data.startDate ? new Date(validated.data.startDate).toISOString() : new Date().toISOString(),
        end_date: validated.data.endDate ? new Date(validated.data.endDate).toISOString() : null,
        description: validated.data.description,
      };
      const result = await ExperienceRepository.update(id, dbData);
      return { success: true, data: result };
    } catch (e: any) { return { error: e.message }; }
  }

  static async delete(id: string) {
    try {
      await ExperienceRepository.delete(id);
      return { success: true };
    } catch (e: any) { return { error: e.message }; }
  }
}