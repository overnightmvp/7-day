'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, Button, Badge } from '@/components/ui'
import { getAllExperiences } from '@/lib/experiences'
import { formatCurrency } from '@/lib/utils'
import { SimpleBookingModal } from '@/components/booking/SimpleBookingModal'
import { BookingSuccessState } from '@/components/booking/BookingSuccessState'

interface QuizData {
  teamSize: string
  eventType: string
  budget: string
  location: string
  vibe: string
}

interface QuizStepProps {
  title: string
  options: { value: string; label: string; description?: string }[]
  selected: string
  onSelect: (value: string) => void
}

function QuizStep({ title, options, selected, onSelect }: QuizStepProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      <div className="grid gap-3 sm:grid-cols-1">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md transform hover:scale-[1.02] ${
              selected === option.value
                ? 'border-blue-500 bg-blue-50 shadow-sm'
                : 'border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <div className="font-medium text-neutral-900">{option.label}</div>
            {option.description && (
              <div className="text-sm text-neutral-600 mt-1">{option.description}</div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export function CompanyQuiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [quizData, setQuizData] = useState<QuizData>({
    teamSize: '',
    eventType: '',
    budget: '',
    location: '',
    vibe: ''
  })
  const [matchedExperiences, setMatchedExperiences] = useState<any[]>([])
  const [selectedExperience, setSelectedExperience] = useState<any>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showSuccessState, setShowSuccessState] = useState(false)
  const [bookingData, setBookingData] = useState<any>(null)

  const steps = [
    {
      key: 'teamSize' as keyof QuizData,
      title: "How big is your team?",
      options: [
        { value: '5-10', label: '5-10 people', description: 'Small team, intimate setting' },
        { value: '11-20', label: '11-20 people', description: 'Medium team, versatile venues' },
        { value: '21-50', label: '21-50 people', description: 'Large team, spacious venues' },
        { value: '50+', label: '50+ people', description: 'Corporate event, premium venues' }
      ]
    },
    {
      key: 'eventType' as keyof QuizData,
      title: "What's the occasion?",
      options: [
        { value: 'team-building', label: 'Team Building', description: 'Activities and bonding experiences' },
        { value: 'celebration', label: 'Celebration', description: 'Success party or milestone' },
        { value: 'retreat', label: 'Strategic Retreat', description: 'Planning and offsite meetings' },
        { value: 'client', label: 'Client Entertainment', description: 'Impress clients and partners' }
      ]
    },
    {
      key: 'budget' as keyof QuizData,
      title: "What's your budget per person?",
      options: [
        { value: '100-200', label: 'AUD $100-200', description: 'Quality experiences, good value' },
        { value: '200-400', label: 'AUD $200-400', description: 'Premium venues and activities' },
        { value: '400-600', label: 'AUD $400-600', description: 'Luxury experiences' },
        { value: '600+', label: 'AUD $600+', description: 'Ultra-premium, exclusive venues' }
      ]
    },
    {
      key: 'location' as keyof QuizData,
      title: "Where would you like to go?",
      options: [
        { value: 'sydney', label: 'Sydney & Surrounds', description: 'Harbour, beaches, city venues' },
        { value: 'melbourne', label: 'Melbourne & Region', description: 'Culture, wine country, city rooftops' },
        { value: 'anywhere', label: 'Anywhere in Australia', description: 'Show me the best options' },
        { value: 'remote', label: 'Remote-Accessible', description: 'Easy travel for distributed teams' }
      ]
    },
    {
      key: 'vibe' as keyof QuizData,
      title: "What vibe are you going for?",
      options: [
        { value: 'relaxed', label: 'Relaxed & Social', description: 'Casual atmosphere, good food & drinks' },
        { value: 'adventurous', label: 'Adventurous', description: 'Activities, outdoor experiences' },
        { value: 'luxurious', label: 'Luxurious', description: 'Premium service, impressive venues' },
        { value: 'productive', label: 'Productive', description: 'Focus on work with beautiful setting' }
      ]
    }
  ]

  // Match experiences based on quiz data
  useEffect(() => {
    if (currentStep === steps.length) {
      const experiences = getAllExperiences()
      // Simple matching logic - in real app this would be more sophisticated
      const matched = experiences.filter(exp => {
        let score = 0
        
        // Team size matching
        const teamNum = parseInt(quizData.teamSize.split('-')[0])
        if (teamNum <= exp.max_guests) score += 2
        
        // Budget matching
        const budgetRange = quizData.budget.split('-').map(b => parseInt(b.replace('+', '')))
        const pricePerPerson = exp.price_per_night / (exp.max_guests * 0.7) // Assume 70% occupancy
        if (pricePerPerson <= budgetRange[1] || (budgetRange.length === 1 && pricePerPerson >= budgetRange[0])) score += 2
        
        // Location matching
        if (quizData.location === 'sydney' && exp.location.includes('NSW')) score += 2
        if (quizData.location === 'melbourne' && exp.location.includes('VIC')) score += 2
        if (quizData.location === 'anywhere') score += 1
        
        // Event type and vibe matching (simplified)
        if (quizData.eventType === 'celebration' && exp.amenities.some(a => a.includes('Bar') || a.includes('Catering'))) score += 1
        if (quizData.vibe === 'luxurious' && (exp.price_per_night > 1000 || exp.title.includes('Executive'))) score += 1
        
        return score >= 3 // Minimum score to be considered a match
      })
      
      setMatchedExperiences(matched.slice(0, 3)) // Top 3 matches
    }
  }, [currentStep, quizData, steps.length])

  const updateQuizData = (key: keyof QuizData, value: string) => {
    setQuizData(prev => ({ ...prev, [key]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const restartQuiz = () => {
    setCurrentStep(0)
    setQuizData({
      teamSize: '',
      eventType: '',
      budget: '',
      location: '',
      vibe: ''
    })
    setMatchedExperiences([])
  }

  if (currentStep === steps.length) {
    // Results view
    return (
      <Card className="w-full">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              Perfect! Here are your matched experiences
            </h2>
            <p className="text-neutral-600">
              Based on your preferences, these venues are ideal for your team
            </p>
          </div>

          <div className="space-y-6 overflow-hidden">
            {matchedExperiences.map((exp, index) => (
              <div 
                key={exp.id} 
                className="relative flex flex-col sm:flex-row gap-4 p-4 bg-neutral-50 rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {index === 0 && (
                  <div className="inline-flex items-center gap-1 mb-2 sm:mb-0">
                    <Badge variant="success" className="bg-green-500 text-white text-xs font-bold">
                      ✨ BEST MATCH
                    </Badge>
                  </div>
                )}
                <div 
                  className="w-full sm:w-24 h-32 sm:h-24 bg-cover bg-center rounded-lg flex-shrink-0 transition-transform hover:scale-105"
                  style={{ backgroundImage: `url(${exp.image_url})` }}
                  role="img"
                  aria-label={exp.title}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-neutral-900 truncate">{exp.title}</h3>
                    <Badge variant={index === 0 ? "default" : "secondary"} className="ml-2 flex-shrink-0">
                      {index === 0 ? 'Top Pick' : `Option ${index + 1}`}
                    </Badge>
                  </div>
                  <p className="text-sm text-neutral-600 mb-2 truncate">{exp.location}</p>
                  <p className="text-sm text-neutral-700 mb-3 line-clamp-2">{exp.description}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="font-semibold text-blue-600">
                      {formatCurrency(exp.price_per_night)}/night
                    </span>
                    <div className="text-right">
                      <div className="text-sm text-neutral-500">
                        Up to {exp.max_guests} guests
                      </div>
                      <div className="text-xs text-green-600">
                        {Math.floor(Math.random() * 20) + 10} teams booked this
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="mt-3 w-full min-h-[44px] text-sm"
                    onClick={() => {
                      setSelectedExperience(exp)
                      setShowBookingModal(true)
                    }}
                  >
                    <span className="hidden sm:inline">Reserve This Experience</span>
                    <span className="sm:hidden">Reserve</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-500">
            <Button 
              onClick={restartQuiz} 
              variant="outline" 
              className="flex-1 min-h-[44px] hover:scale-105 transition-transform"
            >
              <span className="hidden sm:inline">Refine My Search</span>
              <span className="sm:hidden">Refine Search</span>
            </Button>
            <Button 
              className="flex-1 min-h-[44px] hover:scale-105 transition-transform bg-gradient-to-r from-blue-500 to-blue-600"
              onClick={() => {
                if (matchedExperiences[0]) {
                  setSelectedExperience(matchedExperiences[0])
                  setShowBookingModal(true)
                }
              }}
            >
              <span className="hidden sm:inline">Reserve My Top Match</span>
              <span className="sm:hidden">Reserve Top Pick</span>
            </Button>
          </div>
          
          {/* Booking Modal */}
          <SimpleBookingModal
            experience={selectedExperience}
            isOpen={showBookingModal}
            onClose={() => {
              setShowBookingModal(false)
              setSelectedExperience(null)
            }}
            onSuccess={(data) => {
              setBookingData(data)
              setShowBookingModal(false)
              setShowSuccessState(true)
            }}
          />
          
          {/* Success State */}
          {showSuccessState && selectedExperience && bookingData && (
            <BookingSuccessState
              booking={bookingData}
              experience={selectedExperience}
              onClose={() => {
                setShowSuccessState(false)
                setSelectedExperience(null)
                setBookingData(null)
              }}
              onBookAnother={() => {
                setShowSuccessState(false)
                setSelectedExperience(null)
                setBookingData(null)
              }}
            />
          )}
        </CardContent>
      </Card>
    )
  }

  // Quiz steps view
  const step = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <Card className="w-full">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-neutral-600 mb-2">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Quiz Step */}
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <QuizStep
            title={step.title}
            options={step.options}
            selected={quizData[step.key]}
            onSelect={(value) => updateQuizData(step.key, value)}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={prevStep}
            variant="outline"
            disabled={currentStep === 0}
          >
            ← Previous
          </Button>
          <Button
            onClick={nextStep}
            disabled={!quizData[step.key]}
            className={`transition-all duration-200 ${!quizData[step.key] ? 'opacity-50' : 'hover:scale-105'}`}
          >
            {currentStep === steps.length - 1 ? 'Find Perfect Venues ✨' : 'Next →'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}