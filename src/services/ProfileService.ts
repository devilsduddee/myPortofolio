import { ProfileRepository } from '../repositories/ProfileRepository';
import { ProfileSchema, ProfileFormValues } from '../types/schema';

export class ProfileService {
  static async getProfile() {
    return await ProfileRepository.getProfile();
  }

  static async saveProfile(data: ProfileFormValues) {
    const validated = ProfileSchema.safeParse(data);
    
    if (!validated.success) {
      return { 
        error: 'Validation failed', 
        details: validated.error.flatten().fieldErrors 
      };
    }
    
    try {
      const mappedData = {
        full_name: validated.data.name,
        title: validated.data.title,
        tagline: validated.data.tagline,
        about_me: validated.data.aboutMe,
        profile_photo: validated.data.avatarUrl,
      };
      
      const result = await ProfileRepository.upsertProfile(mappedData);
      return { success: true, data: result };
    } catch (e: any) {
      console.error(e);
      return { error: 'Failed to save profile' };
    }
  }
}
