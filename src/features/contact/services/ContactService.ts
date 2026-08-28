import { ContactRepository } from '../repositories/ContactRepository';
import { ContactSchema } from '../validation/schema';

export class ContactService {
  static async get() {
    return await ContactRepository.get();
  }
  static async save(data: any) {
    const validated = ContactSchema.safeParse(data);
    if (!validated.success) return { error: 'Validation failed', details: validated.error.flatten() };
    try {
      const dbData = {
        email: validated.data.email,
        phone: validated.data.phoneNumber,
        linkedin_url: validated.data.linkedinUrl,
        github_url: validated.data.githubUrl,
        website_url: validated.data.personalWebsite,
      };
      const result = await ContactRepository.upsert(dbData);
      return { success: true, data: result };
    } catch (e: any) {
      return { error: e.message || 'Failed to save contact' };
    }
  }
}