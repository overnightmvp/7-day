'use client'

import React, { useState } from 'react'
import { Card, CardContent, Button, Badge } from '@/components/ui'
import { formatCurrency } from '@/lib/utils'

interface Experience {
  id: string
  title: string
  description: string
  location: string
  price_per_night: number
  max_guests: number
  image_url: string
  amenities: string[]
}

interface BookingFormData {
  workEmail: string
  companyName: string
  contactName: string
  phone: string
  teamSize: number
  preferredDate: string
  alternateDate: string
  specialRequests: string
}

interface SimpleBookingModalProps {
  experience: Experience | null
  isOpen: boolean
  onClose: () => void
  onSuccess: (booking: BookingFormData) => void
}

export function SimpleBookingModal({ experience, isOpen, onClose, onSuccess }: SimpleBookingModalProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    workEmail: '',
    companyName: '',
    contactName: '',
    phone: '',
    teamSize: 8,
    preferredDate: '',
    alternateDate: '',
    specialRequests: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen || !experience) return null

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const isDateAvailable = (date: string): boolean => {
    const selectedDate = new Date(date)
    const twoWeeksFromNow = new Date()
    twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14)
    return selectedDate >= twoWeeksFromNow
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.workEmail) {
      newErrors.workEmail = "We'll need your work email to send venue details"
    } else if (!validateEmail(formData.workEmail)) {
      newErrors.workEmail = "Please enter a valid email address"
    }

    if (!formData.companyName) {
      newErrors.companyName = "Company name helps us prepare the perfect experience"
    }

    if (!formData.contactName) {
      newErrors.contactName = "Who should we contact about this booking?"
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = "When would you like to have your team event?"
    } else if (!isDateAvailable(formData.preferredDate)) {
      newErrors.preferredDate = "Please choose a date at least 2 weeks ahead"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      onSuccess(formData)
      setIsSubmitting(false)
    }, 1500)
  }

  const updateFormData = (field: keyof BookingFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const teamSizeOptions = [5, 8, 12, 15, 20, 25, 30, 40, 50]
  const estimatedCost = experience.price_per_night * Math.ceil(formData.teamSize / experience.max_guests)

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-neutral-200 p-6 rounded-t-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-neutral-900">Reserve Your Experience</h2>
                <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                  Available
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-neutral-600">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {experience.location}
                </span>
                <span>•</span>
                <span>{formatCurrency(experience.price_per_night)}/night</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600 ml-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Experience Image */}
            <div className="relative h-32 bg-neutral-200 rounded-lg overflow-hidden">
              <img
                src={experience.image_url}
                alt={experience.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-3 left-3 text-white">
                <h3 className="font-semibold text-lg">{experience.title}</h3>
                <p className="text-sm opacity-90">{experience.description}</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Your work email *
                </label>
                <input
                  type="email"
                  value={formData.workEmail}
                  onChange={(e) => updateFormData('workEmail', e.target.value)}
                  placeholder="sarah@company.com.au"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.workEmail ? 'border-red-300' : 'border-neutral-300'
                  }`}
                />
                {errors.workEmail && (
                  <p className="text-red-600 text-xs mt-1">{errors.workEmail}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Company name *
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => updateFormData('companyName', e.target.value)}
                  placeholder="Acme Corp"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.companyName ? 'border-red-300' : 'border-neutral-300'
                  }`}
                />
                {errors.companyName && (
                  <p className="text-red-600 text-xs mt-1">{errors.companyName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Your name *
                </label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => updateFormData('contactName', e.target.value)}
                  placeholder="Sarah Chen"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.contactName ? 'border-red-300' : 'border-neutral-300'
                  }`}
                />
                {errors.contactName && (
                  <p className="text-red-600 text-xs mt-1">{errors.contactName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Phone number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="+61 4XX XXX XXX"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-neutral-500 mt-1">Optional - for faster response</p>
              </div>
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Team size *
                </label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => updateFormData('teamSize', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {teamSizeOptions.map(size => (
                    <option key={size} value={size}>
                      {size} people
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Preferred date *
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => updateFormData('preferredDate', e.target.value)}
                  min={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.preferredDate ? 'border-red-300' : 'border-neutral-300'
                  }`}
                />
                {errors.preferredDate && (
                  <p className="text-red-600 text-xs mt-1">{errors.preferredDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Backup date (optional)
                </label>
                <input
                  type="date"
                  value={formData.alternateDate}
                  onChange={(e) => updateFormData('alternateDate', e.target.value)}
                  min={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-neutral-500 mt-1">Increases booking success rate by 40%</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-700 font-semibold mb-1">Estimated Total</div>
                <div className="text-2xl font-bold text-blue-800">
                  {formatCurrency(estimatedCost)}
                </div>
                <div className="text-xs text-blue-600">
                  Based on {formData.teamSize} people • Final price confirmed by venue
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Special requests or questions
              </label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => updateFormData('specialRequests', e.target.value)}
                placeholder="Dietary requirements, accessibility needs, specific activities, catering preferences..."
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-neutral-500 mt-1">Optional - helps us prepare the perfect experience</p>
            </div>

            {/* Trust Elements */}
            <div className="bg-neutral-50 p-4 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-green-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Free to inquire
                  </div>
                  <div className="flex items-center text-green-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    2 hour response
                  </div>
                  <div className="flex items-center text-green-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.414-4.414a2 2 0 00-2.828 0L4 12l4.586 4.586a2 2 0 002.828 0L16 12l-4.586-4.586z" />
                    </svg>
                    Cancel anytime
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-3">
              <Button
                type="submit"
                fullWidth
                size="lg"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting Inquiry...
                  </div>
                ) : (
                  'Submit Booking Inquiry'
                )}
              </Button>
              
              <div className="text-center text-xs text-neutral-500">
                By submitting, you agree to receive venue details and booking information.
                <br />
                No payment required • Free cancellation up to 48 hours
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}