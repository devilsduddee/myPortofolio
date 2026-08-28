import { prisma } from '@/lib/prisma';

export class ProjectRepository {
  static async findAll() {
    return await prisma.project.findMany({ orderBy: { created_at: 'desc' } });
  }
  static async findById(id: string) {
    return await prisma.project.findUnique({ where: { id } });
  }
  static async create(data: any) {
    return await prisma.project.create({ data });
  }
  static async update(id: string, data: any) {
    return await prisma.project.update({ where: { id }, data });
  }
  static async delete(id: string) {
    return await prisma.project.delete({ where: { id } });
  }
}