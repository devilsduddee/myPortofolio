import { ProjectRepository } from '../repositories/ProjectRepository';
import { ProjectSchema } from '../validation/schema';

export class ProjectService {
  static async getAll() { return await ProjectRepository.findAll(); }
  static async getById(id: string) { return await ProjectRepository.findById(id); }
  
  static async create(data: any) {
    const validated = ProjectSchema.safeParse(data);
    if (!validated.success) return { error: 'Validation failed', details: validated.error.flatten() };
    try {
      const dbData = {
        project_name: validated.data.projectName,
        description: validated.data.description,
        tech_stack: validated.data.techStack,
        image_url: validated.data.imageUrl,
        demo_url: validated.data.demoUrl,
        repository_url: validated.data.repositoryUrl,
      };
      const result = await ProjectRepository.create(dbData);
      return { success: true, data: result };
    } catch (e: any) { return { error: e.message }; }
  }

  static async update(id: string, data: any) {
    const validated = ProjectSchema.safeParse(data);
    if (!validated.success) return { error: 'Validation failed', details: validated.error.flatten() };
    try {
      const dbData = {
        project_name: validated.data.projectName,
        description: validated.data.description,
        tech_stack: validated.data.techStack,
        image_url: validated.data.imageUrl,
        demo_url: validated.data.demoUrl,
        repository_url: validated.data.repositoryUrl,
      };
      const result = await ProjectRepository.update(id, dbData);
      return { success: true, data: result };
    } catch (e: any) { return { error: e.message }; }
  }

  static async delete(id: string) {
    try {
      await ProjectRepository.delete(id);
      return { success: true };
    } catch (e: any) { return { error: e.message }; }
  }
}