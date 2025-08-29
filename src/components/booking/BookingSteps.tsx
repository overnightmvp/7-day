'use client'

import React, { useState } from 'react'
import { Card, CardContent, Button, Badge } from '@/components/ui'

const STEPS = [
  {
    id: 1,
    title: 'Tell Us About Your Team',
    description: 'Team size, event type, and budget preferences',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    details: 'Quick 2-minute questionnaire about your team size, preferred event type, and budget range.'
  },
  {
    id: 2,
    title: 'AI Recommends Perfect Matches',
    description: 'Smart suggestions based on your requirements',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    details: 'Our AI instantly analyzes Australian venues and matches you with 3-5 perfect options.'
  },
  {
    id: 3,
    title: 'Browse & Book Instantly',
    description: 'No vendor calls, no negotiations needed',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    details: 'View detailed info, check availability, and book with one click. All pricing is transparent.'
  },
  {
    id: 4,
    title: 'Instant Confirmation',
    description: 'Team gets notified, logistics handled automatically',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    details: 'Confirmation emails sent, calendar invites created, and venue details shared with your team.'
  }
]

interface BookingStepsProps {
  withAIChat?: boolean
}

export function BookingSteps({ withAIChat = false }: BookingStepsProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-neutral-900 mb-2">
          How Companies Book Team Events in 4 Simple Steps
        </h3>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          From idea to confirmed booking in under 10 minutes. No vendor management, no endless calls.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STEPS.map((step, index) => (
          <Card 
            key={step.id}
            className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg ${
              activeStep === step.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
            }`}
            onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
          >
            {/* Step Number Badge */}
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">{step.id}</span>
            </div>

            <CardContent className="pt-6 pb-4">
              <div className="space-y-4">
                {/* Icon */}
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  {step.icon}
                </div>

                {/* Title */}
                <div>
                  <h4 className="font-semibold text-neutral-900 text-lg mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-neutral-600">
                    {step.description}
                  </p>
                </div>

                {/* Expandable Details */}
                {activeStep === step.id && (
                  <div className="pt-4 border-t border-neutral-100 animate-in slide-in-from-top-2 duration-200">
                    <p className="text-sm text-neutral-700 mb-4">
                      {step.details}
                    </p>
                    
                    {step.id === 1 && (
                      <div className="space-y-2 text-xs text-neutral-500">
                        <div>• Team size (5-50+ people)</div>
                        <div>• Event type (retreat, celebration, training)</div>
                        <div>• Budget range (AUD per person)</div>
                        <div>• Preferred locations in Australia</div>
                      </div>
                    )}
                    
                    {step.id === 2 && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-xs text-blue-700 font-semibold mb-1">AI MATCHING CONSIDERS:</div>
                        <div className="text-xs text-blue-600 space-y-1">
                          <div>• Group dynamics & activities</div>
                          <div>• Budget optimization</div>
                          <div>• Travel distance from your office</div>
                          <div>• Seasonal availability</div>
                        </div>
                      </div>
                    )}
                    
                    {step.id === 3 && (
                      <div className="flex gap-2">
                        <Badge variant="secondary" size="xs">Real-time availability</Badge>
                        <Badge variant="secondary" size="xs">Transparent pricing</Badge>
                        <Badge variant="secondary" size="xs">Instant booking</Badge>
                      </div>
                    )}
                    
                    {step.id === 4 && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-xs text-green-700 font-semibold mb-1">WHAT HAPPENS NEXT:</div>
                        <div className="text-xs text-green-600 space-y-1">
                          <div>✓ Venue confirmation within 1 hour</div>
                          <div>✓ Calendar invites sent to team</div>
                          <div>✓ Contact details & directions shared</div>
                          <div>✓ 24/7 support for any questions</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* CTA for first step */}
                {step.id === 1 && (
                  <Button size="sm" fullWidth variant="outline" className="mt-4">
                    Find My Perfect Venue →
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-4 bg-neutral-50 rounded-full px-6 py-3">
          <div className="text-sm text-neutral-600">Average completion time:</div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-semibold text-neutral-900">8 minutes</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Button size="lg" className="min-w-[200px]">
          Start My Team Event Search
        </Button>
        <p className="text-xs text-neutral-500 mt-2">
          No signup required • See how it works with sample data
        </p>
      </div>
    </div>
  )
}