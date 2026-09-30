/**
 * File        : src/lib/prisma.ts
 * Deskripsi   : Pengelola koneksi tunggal (singleton) database Prisma ORM.
 *               Mencegah pembuatan banyak koneksi berulang ke database PostgreSQL/Supabase.
 */

import { PrismaClient } from '@prisma/client';

/**
 * Membuat instance baru dari PrismaClient.
 *
 * Kegunaan : Menyiapkan koneksi awal ke pustaka ORM Prisma.
 * Input    : Tanpa input.
 * Hasil    : Objek PrismaClient untuk kueri database.
 */
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

/**
 * Instance Prisma global yang digunakan di seluruh aplikasi server.
 */
export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
