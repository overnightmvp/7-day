'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Card, CardContent, Button, Badge } from '@/components/ui'
import { getAllExperiences } from '@/lib/experiences'
import { formatCurrency } from '@/lib/utils'
import { SimpleBookingModal } from '@/components/booking/SimpleBookingModal'
import { BookingSuccessState } from '@/components/booking/BookingSuccessState'

export function HorizontalExperiences() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [selectedExperience, setSelectedExperience] = useState<any>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showSuccessState, setShowSuccessState] = useState(false)
  const [bookingData, setBookingData] = useState<any>(null)
  const experiences = getAllExperiences()

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScrollability()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollability)
      return () => container.removeEventListener('scroll', checkScrollability)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320 // Card width + gap
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-neutral-900 mb-2">
          Browse Premium Australian Experiences
        </h3>
        <p className="text-neutral-600">
          Curated venues across Sydney, Melbourne, and beyond
        </p>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors touch-manipulation"
            aria-label="Scroll left"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors touch-manipulation"
            aria-label="Scroll right"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth pb-4 px-8 sm:px-12 relative"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Left Fade Gradient */}
          <div className="absolute left-0 top-0 bottom-4 w-8 sm:w-12 bg-gradient-to-r from-neutral-50 via-neutral-50/80 to-transparent pointer-events-none z-20" />
          
          {/* Right Fade Gradient */}
          <div className="absolute right-0 top-0 bottom-4 w-8 sm:w-12 bg-gradient-to-l from-neutral-50 via-neutral-50/80 to-transparent pointer-events-none z-20" />
          {experiences.map((experience) => (
            <Card 
              key={experience.id}
              className="flex-shrink-0 w-72 sm:w-80 overflow-hidden hover:shadow-lg transition-shadow duration-300 relative z-10"
              padding="none"
            >
              {/* Image */}
              <div className="relative h-48 bg-neutral-200">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${experience.image_url})` }}
                  role="img"
                  aria-label={experience.title}
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                    {formatCurrency(experience.price_per_night)}/night
                  </Badge>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                    {Math.floor(Math.random() * 3) + 2} dates left in March
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1 text-lg">
                      {experience.title}
                    </h4>
                    <p className="text-sm text-neutral-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {experience.location}
                    </p>
                  </div>

                  <p className="text-sm text-neutral-600 line-clamp-2">
                    {experience.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-neutral-500">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                      Perfect for {experience.max_guests <= 12 ? 'small' : experience.max_guests <= 16 ? 'medium' : 'large'} teams
                    </span>
                    <span className="text-xs text-blue-600 font-medium">
                      Popular choice
                    </span>
                  </div>

                  {/* Amenities Preview */}
                  <div className="flex flex-wrap gap-1">
                    {experience.amenities.slice(0, 2).map((amenity) => (
                      <Badge key={amenity} variant="secondary" size="xs">
                        {amenity}
                      </Badge>
                    ))}
                    {experience.amenities.length > 2 && (
                      <Badge variant="outline" size="xs">
                        +{experience.amenities.length - 2} more
                      </Badge>
                    )}
                  </div>

                  <Button 
                    size="sm" 
                    fullWidth 
                    className="mt-4 min-h-[44px] touch-manipulation"
                    onClick={() => {
                      setSelectedExperience(experience)
                      setShowBookingModal(true)
                    }}
                  >
                    <span className="hidden sm:inline">Reserve This Experience</span>
                    <span className="sm:hidden">Reserve</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom scrollbar hidden */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>

      {/* View All Button */}
      <div className="text-center">
        <Button variant="outline" size="lg" className="min-h-[44px] touch-manipulation">
          <span className="hidden sm:inline">Browse All {experiences.length} Venues</span>
          <span className="sm:hidden">View All Venues</span>
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
    </div>
  )
}