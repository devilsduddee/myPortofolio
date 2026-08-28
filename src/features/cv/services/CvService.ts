import { CvRepository } from '../repositories/CvRepository';
import { CvSchema } from '../validation/schema';

export class CvService {
  static async get() {
    return await CvRepository.get();
  }
  static async save(data: any) {
    const validated = CvSchema.safeParse(data);
    if (!validated.success) return { error: 'Validation failed', details: validated.error.flatten() };
    try {
      const payload = { fileUrl: validated.data.fileUrl || '' };
      const result = await CvRepository.upsert(payload);
      return { success: true, data: result };
    } catch (e: any) {
      return { error: e.message || 'Failed to save cv' };
    }
  }
}