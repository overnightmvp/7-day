'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { AuthModal } from '@/components/auth/AuthModal'
import { signOut } from '@/lib/auth'
import { cn } from '@/lib/utils'

interface HeaderProps {
  variant?: 'landing' | 'app'
  user?: {
    name: string
    email: string
    role: 'admin' | 'employee'
    company?: string
  }
}

export function Header({ variant = 'landing', user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">7D</span>
              </div>
              <span className="text-xl font-bold text-neutral-900">7DAY</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {variant === 'landing' ? (
              <>
                <Link href="#features" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Features
                </Link>
                <Link href="#experiences" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Experiences
                </Link>
                <Link href="#pricing" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Pricing
                </Link>
                <Link href="/design-system" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Design System
                </Link>
              </>
            ) : (
              <>
                <Link href="/app" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Experiences
                </Link>
                <Link href="/bookings" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  My Bookings
                </Link>
                {user?.role === 'admin' && (
                  <Link href="/admin" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                    Admin
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right">
                  <div className="text-sm font-medium text-neutral-900">{user.name}</div>
                  <div className="text-xs text-neutral-500">
                    {user.role === 'admin' ? 'Admin' : 'Employee'} • {user.company}
                  </div>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 text-sm font-medium">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={signOut}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setAuthModalOpen(true)}
                >
                  Sign In
                </Button>
                <Button 
                  size="sm"
                  onClick={() => setAuthModalOpen(true)}
                >
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200">
            <div className="flex flex-col space-y-3">
              {variant === 'landing' ? (
                <>
                  <Link href="#features" className="text-neutral-600 hover:text-neutral-900 px-2 py-1">
                    Features
                  </Link>
                  <Link href="#experiences" className="text-neutral-600 hover:text-neutral-900 px-2 py-1">
                    Experiences
                  </Link>
                  <Link href="#pricing" className="text-neutral-600 hover:text-neutral-900 px-2 py-1">
                    Pricing
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/app" className="text-neutral-600 hover:text-neutral-900 px-2 py-1">
                    Experiences
                  </Link>
                  <Link href="/bookings" className="text-neutral-600 hover:text-neutral-900 px-2 py-1">
                    My Bookings
                  </Link>
                  {user?.role === 'admin' && (
                    <Link href="/admin" className="text-neutral-600 hover:text-neutral-900 px-2 py-1">
                      Admin
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(user) => {
          console.log('User signed in:', user)
          // Handle successful auth
        }}
      />
    </header>
  )
}