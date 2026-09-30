/**
 * File        : src/lib/supabase/middleware.ts
 * Deskripsi   : Pengelola sesi Supabase pada lapisan middleware HTTP Next.js.
 *               Melindungi rute admin dan menangani pengalihan (redirection) pengguna.
 */

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Memperbarui sesi cookie dan memeriksa proteksi rute admin.
 *
 * Kegunaan : Memperbarui token autentikasi pada cookie response, serta mengalihkan pengguna
 *            yang belum login dari area admin ke halaman login.
 * Input    : request (Objek NextRequest)
 * Hasil    : Objek NextResponse (halaman asli atau pengalihan rute).
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: any[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            const sessionOptions = { ...options };
            delete sessionOptions.maxAge;
            delete sessionOptions.expires;
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            const sessionOptions = { ...options };
            delete sessionOptions.maxAge;
            delete sessionOptions.expires;
            supabaseResponse.cookies.set(name, value, sessionOptions);
          });
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAuthRoute = request.nextUrl.pathname.startsWith('/admin/login');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  // Pengalihan 1: Belum login mencoba akses admin -> ke login
  if (!user && isAdminRoute && !isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  // Pengalihan 2: Sudah login membuka login -> ke dashboard
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
