/**
 * File        : src/middleware.ts
 * Deskripsi   : Middleware utama Next.js untuk memperbarui dan memeriksa sesi autentikasi Supabase.
 */

import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

/**
 * Fungsi middleware penanganan request masuk.
 *
 * Kegunaan : Memperbarui token sesi pengguna di cookie pada setiap request publik/admin.
 * Input    : request (Objek NextRequest)
 * Hasil    : Objek NextResponse hasil pembaruan sesi.
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
