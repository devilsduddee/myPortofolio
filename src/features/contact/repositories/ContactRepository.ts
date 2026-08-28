import { prisma } from '@/lib/prisma';

export class ContactRepository {
  static async get() {
    return await prisma.contact.findFirst();
  }
  static async upsert(data: any) {
    const existing = await this.get();
    if (existing) return await prisma.contact.update({ where: { id: existing.id }, data });
    return await prisma.contact.create({ data });
  }
}