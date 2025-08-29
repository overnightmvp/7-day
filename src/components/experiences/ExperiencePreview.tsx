'use client'

import React, { useState } from 'react'
import { Card, CardContent, Button, Badge } from '@/components/ui'
import { getAllExperiences } from '@/lib/experiences'
import { formatCurrency } from '@/lib/utils'

interface ExperiencePreviewProps {
  showBookingFlow?: boolean
  limit?: number
}

export function ExperiencePreview({ showBookingFlow = false, limit = 3 }: ExperiencePreviewProps) {
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null)
  const experiences = getAllExperiences().slice(0, limit)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-neutral-900 mb-2">
          Browse Premium Experiences
        </h3>
        <p className="text-neutral-600">
          Get a preview of what your employees can book
        </p>
      </div>

      {/* Experience Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {experiences.map((experience) => (
          <Card 
            key={experience.id}
            variant={selectedExperience === experience.id ? "elevated" : "interactive"}
            padding="none"
            className={`overflow-hidden transition-all duration-300 ${
              selectedExperience === experience.id 
                ? 'ring-2 ring-blue-500 ring-offset-2' 
                : 'hover:shadow-lg'
            }`}
            onClick={() => setSelectedExperience(
              selectedExperience === experience.id ? null : experience.id
            )}
          >
            {/* Image */}
            <div className="relative h-48 bg-neutral-200">
              <img
                src={experience.image_url}
                alt={experience.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                  {formatCurrency(experience.price_per_night)}/night
                </Badge>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-1">
                    {experience.title}
                  </h4>
                  <p className="text-sm text-neutral-500">
                    {experience.location}
                  </p>
                </div>

                <p className="text-sm text-neutral-600 line-clamp-2">
                  {experience.description}
                </p>

                <div className="flex items-center justify-between text-sm text-neutral-500">
                  <span>Up to {experience.max_guests} guests</span>
                  <span>{experience.amenities.length} amenities</span>
                </div>

                {/* Amenities Preview */}
                <div className="flex flex-wrap gap-1">
                  {experience.amenities.slice(0, 3).map((amenity) => (
                    <Badge key={amenity} variant="secondary" size="xs">
                      {amenity}
                    </Badge>
                  ))}
                  {experience.amenities.length > 3 && (
                    <Badge variant="outline" size="xs">
                      +{experience.amenities.length - 3}
                    </Badge>
                  )}
                </div>

                {showBookingFlow && selectedExperience === experience.id && (
                  <div className="pt-4 border-t">
                    <div className="space-y-3">
                      <div className="text-sm text-neutral-700">
                        <strong>Booking Process:</strong>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Employee selects dates & guests
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Request goes to admin for approval
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Confirmation sent to employee
                        </div>
                      </div>
                      <Button size="sm" fullWidth variant="outline">
                        Try Demo Booking →
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          View All {getAllExperiences().length} Experiences
        </Button>
      </div>
    </div>
  )
}