import { AuthRepository } from '@/repositories/AuthRepository'
import { LoginCredentials } from '@/types/auth'

export class AuthService {
  static async login(credentials: LoginCredentials) {
    if (!credentials.email || !credentials.password) {
      return { error: 'Email and password are required' }
    }
    
    const { error } = await AuthRepository.login(credentials)
    
    if (error) {
      return { error: error.message }
    }
    
    return { success: true }
  }

  static async logout() {
    const { error } = await AuthRepository.logout()
    if (error) {
      return { error: error.message }
    }
    return { success: true }
  }
}
