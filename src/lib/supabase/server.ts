import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

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
              // Convert cookie to Session Cookie (expires on browser close)
              const sessionOptions = { ...options };
              delete sessionOptions.maxAge;
              delete sessionOptions.expires;
              cookieStore.set(name, value, sessionOptions);
            });
          } catch (error) {
            // The `set` method was called from a Server Component.
          }
        },

      },
    }
  );
}
