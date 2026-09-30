import { prisma } from '@/lib/prisma';

export class ExperienceRepository {
  static async findAll() {
    return await prisma.experience.findMany({ orderBy: { created_at: 'desc' } });
  }
  static async findById(id: string) {
    return await prisma.experience.findUnique({ where: { id } });
  }
  static async create(data: any) {
    return await prisma.experience.create({ data });
  }
  static async update(id: string, data: any) {
    return await prisma.experience.update({ where: { id }, data });
  }
  static async delete(id: string) {
    return await prisma.experience.delete({ where: { id } });
  }
}