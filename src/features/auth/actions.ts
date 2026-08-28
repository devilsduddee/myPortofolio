'use server'

import { AuthService } from '@/services/AuthService'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  const result = await AuthService.login({ email, password })
  
  if (result.error) {
    // In a real scenario, you'd want to return this error to the UI.
    // For simplicity, we are throwing or returning here.
    return { error: result.error }
  }
  
  redirect('/admin/dashboard')
}

export async function logoutAction() {
  await AuthService.logout()
  redirect('/admin/login')
}
