/**
 * File        : src/lib/supabase/server.ts
 * Deskripsi   : Membuat klien Supabase untuk lingkungan Server Components / Server Actions Next.js.
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Membuat instance klien server Supabase Auth & DB dengan manajemen cookie Next.js.
 *
 * Kegunaan : Menyiapkan klien Supabase server yang membaca dan memperbarui cookie autentikasi.
 * Input    : Tanpa input.
 * Hasil    : Objek SupabaseClient server (Promise).
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: any[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              const sessionOptions = { ...options };
              delete sessionOptions.maxAge;
              delete sessionOptions.expires;
              cookieStore.set(name, value, sessionOptions);
            });
          } catch (error) {
            // Dipanggil dari Server Component (baca-saja)
          }
        },
      },
    }
  );
}
