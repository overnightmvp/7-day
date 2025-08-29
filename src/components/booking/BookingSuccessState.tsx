'use client'

import React from 'react'
import { Card, CardContent, Button } from '@/components/ui'
import { formatCurrency } from '@/lib/utils'

interface BookingData {
  workEmail: string
  companyName: string
  contactName: string
  phone: string
  teamSize: number
  preferredDate: string
  alternateDate: string
  specialRequests: string
}

interface Experience {
  id: string
  title: string
  location: string
  price_per_night: number
}

interface BookingSuccessStateProps {
  booking: BookingData
  experience: Experience
  onClose: () => void
  onBookAnother: () => void
}

export function BookingSuccessState({ booking, experience, onClose, onBookAnother }: BookingSuccessStateProps) {
  
  const generateCalendarFile = () => {
    const startDate = new Date(booking.preferredDate)
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + 1)
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//7DAY//Team Event//EN',
      'BEGIN:VEVENT',
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `SUMMARY:Team Event - ${experience.title}`,
      `DESCRIPTION:Team event at ${experience.title}, ${experience.location}. Booking inquiry submitted through 7DAY.`,
      `LOCATION:${experience.location}`,
      'STATUS:TENTATIVE',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n')
    
    const blob = new Blob([icsContent], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `7day-team-event-${experience.title.toLowerCase().replace(/\s+/g, '-')}.ics`
    a.click()
    URL.revokeObjectURL(url)
  }

  const shareDetails = () => {
    const details = `
🏢 Team Event Booking Inquiry

📍 Venue: ${experience.title}
🗺️  Location: ${experience.location}
📅 Date: ${new Date(booking.preferredDate).toLocaleDateString('en-AU')}
👥 Team Size: ${booking.teamSize} people
💰 Estimated: ${formatCurrency(experience.price_per_night * Math.ceil(booking.teamSize / 12))}

Contact: ${booking.contactName}
Company: ${booking.companyName}
Email: ${booking.workEmail}

Next Steps:
• 7DAY team will call within 2 hours
• Venue availability confirmation
• Final pricing and logistics

Questions? Reply to this email or call our team.
    `.trim()

    const mailtoLink = `mailto:${booking.workEmail}?subject=7DAY Team Event - ${experience.title}&body=${encodeURIComponent(details)}`
    window.open(mailtoLink)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="p-8 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Booking Inquiry Confirmed! ✨
          </h2>
          <p className="text-neutral-600 mb-6">
            Your team event inquiry for <strong>{experience.title}</strong> has been submitted successfully.
          </p>

          {/* Booking Summary */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
            <div className="text-sm text-blue-700 font-semibold mb-3">WHAT HAPPENS NEXT:</div>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Confirmation sent to <strong>{booking.workEmail}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Our team will call <strong>{booking.contactName}</strong> within 2 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Venue availability confirmed for <strong>{new Date(booking.preferredDate).toLocaleDateString('en-AU')}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Final details and pricing sent within 4 hours</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={generateCalendarFile}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                📅 Add to Calendar
              </Button>
              <Button
                onClick={shareDetails}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                📧 Email Details
              </Button>
            </div>
            
            <Button
              onClick={onBookAnother}
              variant="outline"
              fullWidth
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              Reserve Another Experience
            </Button>
            
            <Button
              onClick={onClose}
              fullWidth
              size="lg"
            >
              Perfect! Close This
            </Button>
          </div>

          {/* Support */}
          <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
            <div className="text-sm text-neutral-700 mb-2">
              <strong>Questions? Need to make changes?</strong>
            </div>
            <div className="text-sm text-neutral-600">
              📞 Call us: +61 2 8000 7329<br />
              📧 Email: bookings@7day.com.au<br />
              💬 Live chat available 9am-6pm AEST
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}