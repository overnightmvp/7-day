// Smart Authentication & Routing Logic
import { supabase } from './supabase'
import { isPersonalEmail, getCompanyDomain } from './utils'

export type UserRole = 'admin' | 'employee'
export type UserType = 'company' | 'employee'

export interface User {
  id: string
  email: string
  role: UserRole
  company_id: string
  company?: {
    id: string
    name: string
    admin_email: string
  }
}

/**
 * Determine user type based on email domain
 */
export function detectUserType(email: string): UserType {
  return isPersonalEmail(email) ? 'employee' : 'company'
}

/**
 * Smart routing based on user context
 */
export function getRedirectPath(user: User | null, intendedPath?: string): string {
  // Not logged in - go to landing
  if (!user) {
    return '/'
  }

  // If user has intended path, honor it
  if (intendedPath && intendedPath !== '/') {
    return intendedPath
  }

  // Admin users go to admin dashboard
  if (user.role === 'admin') {
    return '/admin'
  }

  // Employees go to experience browsing
  return '/app'
}

/**
 * Check if user can access a specific route
 */
export function canAccessRoute(user: User | null, path: string): boolean {
  // Public routes
  const publicRoutes = ['/', '/design-system', '/login', '/signup']
  if (publicRoutes.includes(path)) {
    return true
  }

  // Require authentication
  if (!user) {
    return false
  }

  // Admin-only routes
  const adminRoutes = ['/admin']
  if (adminRoutes.some(route => path.startsWith(route))) {
    return user.role === 'admin'
  }

  // Employee routes (both admin and employee can access)
  const employeeRoutes = ['/app', '/bookings']
  if (employeeRoutes.some(route => path.startsWith(route))) {
    return true
  }

  return false
}

/**
 * Sign up flow with smart role detection
 */
export async function signUpUser(email: string, companyName?: string) {
  const userType = detectUserType(email)
  
  if (userType === 'company' && companyName) {
    // Company admin signup
    try {
      // Create company first
      const { data: company, error: companyError } = await supabase
        .from('companies')
        .insert([{ name: companyName, admin_email: email }])
        .select()
        .single()

      if (companyError) throw companyError

      // Create admin user
      const { data: user, error: userError } = await supabase
        .from('users')
        .insert([{ 
          company_id: company.id,
          email,
          role: 'admin' 
        }])
        .select()
        .single()

      if (userError) throw userError

      return { 
        success: true, 
        user: { ...user, company },
        message: 'Company account created successfully!'
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Signup failed'
      }
    }
  } else {
    // Employee signup - need to check if company exists
    const domain = getCompanyDomain(email)
    
    try {
      // Look for existing company with this domain
      const { data: companies } = await supabase
        .from('companies')
        .select('*')
        .ilike('admin_email', `%@${domain}`)

      if (!companies || companies.length === 0) {
        return {
          success: false,
          error: 'Company not found. Please ask your admin to set up 7DAY first.'
        }
      }

      const company = companies[0]

      // Create employee user
      const { data: user, error: userError } = await supabase
        .from('users')
        .insert([{
          company_id: company.id,
          email,
          role: 'employee'
        }])
        .select()
        .single()

      if (userError) throw userError

      return {
        success: true,
        user: { ...user, company },
        message: 'Employee account created successfully!'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Signup failed'
      }
    }
  }
}

/**
 * Sign in existing user
 */
export async function signInUser(email: string) {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select(`
        *,
        company:companies(*)
      `)
      .eq('email', email)
      .single()

    if (error || !user) {
      return {
        success: false,
        error: 'User not found. Please sign up first.'
      }
    }

    return {
      success: true,
      user: user as User,
      message: 'Signed in successfully!'
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Sign in failed'
    }
  }
}

/**
 * Get current user session (mock for MVP)
 */
export async function getCurrentUser(): Promise<User | null> {
  // In a real app, this would check session storage/cookies
  // For MVP, we'll simulate this
  const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null
  
  if (!userEmail) return null
  
  const result = await signInUser(userEmail)
  return result.success ? result.user : null
}

/**
 * Sign out user
 */
export function signOut() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('userEmail')
    window.location.href = '/'
  }
}

/**
 * Set user session (mock for MVP)
 */
export function setUserSession(email: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userEmail', email)
  }
}