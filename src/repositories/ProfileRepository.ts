import { prisma } from '@/lib/prisma';

export class ProfileRepository {
  static async getProfile() {
    return await prisma.profile.findFirst();
  }

  static async upsertProfile(data: any) {
    const existing = await this.getProfile();
    if (existing) {
      return await prisma.profile.update({
        where: { id: existing.id },
        data,
      });
    }
    return await prisma.profile.create({ data });
  }
}
