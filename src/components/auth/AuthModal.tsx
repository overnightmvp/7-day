'use client'

import React, { useState, useEffect } from 'react'
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui'
import { signUpUser, signInUser, setUserSession, detectUserType } from '@/lib/auth'
import { cn } from '@/lib/utils'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultEmail?: string
  onSuccess: (user: any) => void
}

export function AuthModal({ isOpen, onClose, defaultEmail = '', onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signup')
  const [email, setEmail] = useState(defaultEmail)
  const [companyName, setCompanyName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [userType, setUserType] = useState<'company' | 'employee' | null>(null)

  // Smart email detection
  useEffect(() => {
    if (email) {
      setUserType(detectUserType(email))
    } else {
      setUserType(null)
    }
  }, [email])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      let result
      
      if (mode === 'signup') {
        result = await signUpUser(email, companyName)
      } else {
        result = await signInUser(email)
      }

      if (result.success) {
        setUserSession(email)
        setMessage(result.message)
        onSuccess(result.user)
        setTimeout(() => {
          onClose()
          window.location.reload() // Refresh to update auth state
        }, 1000)
      } else {
        setMessage(result.error)
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">7D</span>
            </div>
          </div>
          <CardTitle className="text-2xl">
            {mode === 'signup' ? 'Get Started' : 'Welcome Back'}
          </CardTitle>
          <CardDescription>
            {mode === 'signup' 
              ? 'Create your account and start exploring experiences' 
              : 'Sign in to access your dashboard'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              label="Work Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@company.com"
              required
            />
            
            {/* Smart type detection feedback */}
            {userType && (
              <div className={cn(
                "text-sm p-3 rounded-lg",
                userType === 'company' 
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "bg-orange-50 text-orange-700 border border-orange-200"
              )}>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    userType === 'company' ? "bg-blue-500" : "bg-orange-500"
                  )}></div>
                  {userType === 'company' 
                    ? "Setting up a company account" 
                    : "Joining as an employee"
                  }
                </div>
              </div>
            )}
            
            {/* Company name for business users */}
            {mode === 'signup' && userType === 'company' && (
              <Input
                type="text"
                label="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Acme Corp"
                required
              />
            )}
            
            {/* Employee note */}
            {mode === 'signup' && userType === 'employee' && (
              <div className="bg-neutral-50 p-3 rounded-lg text-sm text-neutral-600">
                💡 Your company admin needs to set up 7DAY first. 
                Ask your HR team about getting access!
              </div>
            )}
            
            <Button 
              type="submit" 
              fullWidth 
              loading={loading}
              disabled={loading || !email || (mode === 'signup' && userType === 'company' && !companyName)}
            >
              {loading ? 'Please wait...' : (
                mode === 'signup' 
                  ? (userType === 'company' ? 'Create Company Account' : 'Join Company')
                  : 'Sign In'
              )}
            </Button>
            
            {message && (
              <div className={cn(
                "text-sm p-3 rounded-lg text-center",
                message.includes('success') 
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              )}>
                {message}
              </div>
            )}
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              {mode === 'signup' 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"
              }
            </button>
          </div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </CardContent>
      </Card>
    </div>
  )
}