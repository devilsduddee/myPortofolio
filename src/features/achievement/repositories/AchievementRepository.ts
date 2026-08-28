import { prisma } from '@/lib/prisma';

export class AchievementRepository {
  static async findAll() {
    return await prisma.achievement.findMany({ orderBy: { created_at: 'desc' } });
  }
  static async findById(id: string) {
    return await prisma.achievement.findUnique({ where: { id } });
  }
  static async create(data: any) {
    return await prisma.achievement.create({ data });
  }
  static async update(id: string, data: any) {
    return await prisma.achievement.update({ where: { id }, data });
  }
  static async delete(id: string) {
    return await prisma.achievement.delete({ where: { id } });
  }
}