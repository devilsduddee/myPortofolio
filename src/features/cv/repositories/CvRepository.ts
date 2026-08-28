import { prisma } from '@/lib/prisma';

export class CvRepository {
  static async get() {
    const profile = await prisma.profile.findFirst();
    return { fileUrl: profile?.cv_file || '' };
  }
  
  static async upsert(data: { fileUrl: string }) {
    const existing = await prisma.profile.findFirst();
    if (existing) {
      return await prisma.profile.update({
        where: { id: existing.id },
        data: { cv_file: data.fileUrl }
      });
    }
    // Technically Profile should always exist from seeding, but fallback
    return null;
  }
}