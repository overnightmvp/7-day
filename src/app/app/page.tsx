'use client'

import { useState, useEffect } from 'react'
import { getAllExperiences, getExperienceById, type Experience } from '@/lib/experiences'
import { supabase } from '@/lib/supabase'

export default function EmployeeApp() {
  const [experiences] = useState<Experience[]>(getAllExperiences())
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [bookingForm, setBookingForm] = useState({
    userEmail: '',
    startDate: '',
    endDate: '',
    guests: 1
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedExperience) return

    setLoading(true)
    setMessage('')

    try {
      // First, get user ID from email
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', bookingForm.userEmail)
        .eq('role', 'employee')
        .single()

      if (userError || !user) {
        throw new Error('Employee not found. Please contact your admin.')
      }

      // Create booking
      const { error: bookingError } = await supabase
        .from('bookings')
        .insert([{
          user_id: user.id,
          experience_id: selectedExperience.id,
          start_date: bookingForm.startDate,
          end_date: bookingForm.endDate,
          guests: bookingForm.guests
        }])

      if (bookingError) throw bookingError

      setMessage('Booking submitted successfully! Waiting for admin approval.')
      setSelectedExperience(null)
      setBookingForm({
        userEmail: '',
        startDate: '',
        endDate: '',
        guests: 1
      })
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">7DAY Employee App</h1>
          <p className="text-gray-600 mt-2">Book amazing experiences for your team</p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          }`}>
            {message}
          </div>
        )}

        {!selectedExperience ? (
          // Experience Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((experience) => (
              <div key={experience.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img
                  src={experience.image_url}
                  alt={experience.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {experience.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {experience.location}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {experience.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-primary">
                      ${experience.price_per_night}/night
                    </span>
                    <span className="text-sm text-gray-500">
                      Up to {experience.max_guests} guests
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {experience.amenities.slice(0, 3).map((amenity) => (
                        <span
                          key={amenity}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                      {experience.amenities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          +{experience.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedExperience(experience)}
                    className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Booking Form
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Book {selectedExperience.title}
                </h2>
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ← Back to experiences
                </button>
              </div>

              <div className="mb-6">
                <img
                  src={selectedExperience.image_url}
                  alt={selectedExperience.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="mt-4">
                  <p className="text-gray-600">{selectedExperience.location}</p>
                  <p className="text-gray-700 mt-2">{selectedExperience.description}</p>
                </div>
              </div>

              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label htmlFor="user-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Work Email
                  </label>
                  <input
                    id="user-email"
                    type="email"
                    required
                    value={bookingForm.userEmail}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, userEmail: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    placeholder="john@company.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in Date
                    </label>
                    <input
                      id="start-date"
                      type="date"
                      required
                      value={bookingForm.startDate}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out Date
                    </label>
                    <input
                      id="end-date"
                      type="date"
                      required
                      value={bookingForm.endDate}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Guests
                  </label>
                  <select
                    id="guests"
                    required
                    value={bookingForm.guests}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  >
                    {Array.from({ length: selectedExperience.max_guests }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} guest{i === 0 ? '' : 's'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold"
                  >
                    {loading ? 'Submitting...' : 'Submit Booking Request'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}