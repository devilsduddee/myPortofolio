import { createClient } from '@/lib/supabase/server'
import { LoginCredentials } from '@/types/auth'

export class AuthRepository {
  static async login(credentials: LoginCredentials) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })
    return { data, error }
  }

  static async logout() {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()
    return { error }
  }
}
