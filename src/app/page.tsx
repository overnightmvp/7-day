'use client'

import React, { useState, useEffect } from 'react'
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui'
import { Header } from '@/components/navigation/Header'
import { HorizontalExperiences } from '@/components/experiences/HorizontalExperiences'
import { BookingSteps } from '@/components/booking/BookingSteps'
import { AIChatWidget } from '@/components/ai/AIChatWidget'
import { CompanyQuiz } from '@/components/quiz/CompanyQuiz'
import { isPersonalEmail } from '@/lib/utils'

export default function Home() {
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [userType, setUserType] = useState<'company' | 'employee' | null>(null)
  const [showDemo, setShowDemo] = useState(false)

  // Smart email detection
  useEffect(() => {
    if (email) {
      const isPersonal = isPersonalEmail(email)
      setUserType(isPersonal ? 'employee' : 'company')
    } else {
      setUserType(null)
    }
  }, [email])

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header variant="landing" />
      
      {/* Social Proof Banner */}
      <div className="bg-blue-500 text-white text-center py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-6">
          <span>🔥 247 team events booked this month</span>
          <span>•</span>
          <span>⭐ Rated 4.9/5 by Australian HR teams</span>
          <span>•</span>
          <span>🏢 Trusted by 200+ companies</span>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl">
              Why Smart Companies Are Ditching
              <span className="text-blue-500 block">Generic Team Events</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-600 max-w-3xl mx-auto">
              7DAY is the curated marketplace connecting Australian HR teams with premium team experiences 
              that employees actually remember. Self-service platform, pre-approved budgets, zero admin headache.
            </p>
          </div>
          
          {/* 2-Column Quiz Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Quiz */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  Find Your Perfect Team Experience
                </h2>
                <p className="text-neutral-600">
                  Answer 5 quick questions and get personalized venue recommendations
                </p>
              </div>
              <CompanyQuiz />
            </div>
            
            {/* Right Column - Value Props */}
            <div className="space-y-8">
              <div className="bg-blue-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">
                  Why Australian Companies Choose 7DAY
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">Curated Australian Venues</div>
                      <div className="text-sm text-neutral-600">From Sydney Harbour to Blue Mountains - all venues pre-vetted and corporate-ready</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">Zero Admin Headache</div>
                      <div className="text-sm text-neutral-600">No vendor calls, no negotiations. Book instantly with transparent AUD pricing</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">Budget Controls</div>
                      <div className="text-sm text-neutral-600">Set limits, track spend, and get detailed ROI reports for leadership</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-2xl p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700 mb-1">89%</div>
                  <div className="text-sm text-green-600 mb-2">Higher team event attendance</div>
                  <div className="text-xs text-neutral-500">vs traditional corporate events</div>
                </div>
              </div>
              
              <div className="text-center">
                <Button size="lg" variant="outline">
                  Schedule Quick Demo Call
                </Button>
                <p className="text-xs text-neutral-500 mt-2">
                  See live venues • No pressure • Get answers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      {showDemo && (
        <section className="py-16 bg-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BookingSteps withAIChat={true} />
          </div>
        </section>
      )}

      {/* Problem & Solution */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-neutral-900 mb-8">
                The Team Event Planning Crisis Every HR Manager Knows
              </h2>
            </div>
            
            <div className="bg-neutral-50 rounded-2xl p-8 mb-12">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 font-semibold text-sm">SC</span>
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 mb-2">Sarah Chen, HR Manager</div>
                  <div className="text-neutral-600 italic">
                    "I spent 3 weeks planning our quarterly team event. Researched venues across Sydney, 
                    negotiated prices, coordinated with 15 different vendors. The result? 
                    Half the team didn't show up, and those who did were on their phones. 
                    We spent $12,000 on an event nobody talks about."
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Administrative Nightmare</h3>
                <p className="text-neutral-600 text-sm">
                  Hours spent researching, negotiating, coordinating. Your time is worth more than vendor management.
                </p>
              </div>
              
              <div>
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.87 0-5.431.58-7.5 1.5A8.014 8.014 0 016.5 8.5c0-.653.077-1.29.22-1.897M18 21l-1.5-1.5" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Low Engagement</h3>
                <p className="text-neutral-600 text-sm">
                  Generic venues and activities don't inspire. Modern employees expect memorable experiences.
                </p>
              </div>
              
              <div>
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Budget Waste</h3>
                <p className="text-neutral-600 text-sm">
                  No way to measure ROI. Money spent on events that don't build culture or improve retention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Introduction */}
      <section className="bg-blue-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              Meet 7DAY: Australia's Curated Marketplace for Team Experiences
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
              We connect Australian HR teams with vetted, premium experience providers across major cities. 
              Self-service platform, pre-approved budgets, instant booking approvals.
            </p>
            <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="text-sm text-blue-600 font-semibold mb-2">THE RESULT</div>
              <div className="text-2xl font-bold text-neutral-900 mb-2">
                Team events that people actually remember
              </div>
              <div className="text-neutral-600">
                Zero admin headache. Maximum team engagement.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              How 7DAY Solves Team Event Planning
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              A curated marketplace designed specifically for HR teams who value their time
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.414-4.414a2 2 0 00-2.828 0L4 12l4.586 4.586a2 2 0 002.828 0L16 12l-4.586-4.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Curated Marketplace</h3>
                <p className="text-neutral-600">
                  Every venue is vetted, insured, and ready for corporate groups. 
                  No more research, no more vendor management, no more surprises.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Budget Control</h3>
                <p className="text-neutral-600">
                  Set spending limits, approval workflows, and cost centers. 
                  Teams can book within budget without asking permission every time.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">ROI Analytics</h3>
                <p className="text-neutral-600">
                  Track engagement, measure team satisfaction, prove the value 
                  of your team event investment to leadership.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              From Setup to Team Event in 3 Simple Steps
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Setup takes 5 minutes. Planning takes zero.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Quick Platform Setup</h3>
              <p className="text-neutral-600 mb-4">
                Connect your team directory, set budget limits, and define approval workflows. 
                Your account is ready in minutes.
              </p>
              <div className="bg-white p-4 rounded-lg text-left">
                <div className="text-sm text-neutral-500 mb-1">✓ Team integration</div>
                <div className="text-sm text-neutral-500 mb-1">✓ Budget controls</div>
                <div className="text-sm text-neutral-500">✓ Approval settings</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Teams Browse & Book</h3>
              <p className="text-neutral-600 mb-4">
                Your team explores curated experiences, selects dates, and books within 
                pre-approved budgets. No back-and-forth required.
              </p>
              <div className="bg-white p-4 rounded-lg text-left">
                <div className="text-sm text-neutral-500 mb-1">✓ Curated experiences</div>
                <div className="text-sm text-neutral-500 mb-1">✓ Instant availability</div>
                <div className="text-sm text-neutral-500">✓ Budget compliance</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">One-Click Approval</h3>
              <p className="text-neutral-600 mb-4">
                Review booking details in your dashboard and approve with one click. 
                Automated confirmations handle the rest.
              </p>
              <div className="bg-white p-4 rounded-lg text-left">
                <div className="text-sm text-neutral-500 mb-1">✓ Instant notifications</div>
                <div className="text-sm text-neutral-500 mb-1">✓ One-click approval</div>
                <div className="text-sm text-neutral-500">✓ Automated logistics</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Experiences */}
      <section id="experiences" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HorizontalExperiences />
        </div>
      </section>
      
      {/* Booking Steps Process */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingSteps withAIChat={true} />
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Companies Like Yours Are Already Using 7DAY
            </h2>
            <p className="text-lg text-neutral-600">
              HR teams at growth-stage companies trust 7DAY for their team events
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-6m-2-4V9m-2 4h6m-6 4h6" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Growing Tech Companies</h3>
              <p className="text-neutral-600 text-sm">
                50-200 employees, need scalable team event solutions that work across remote and hybrid teams.
              </p>
              <div className="mt-4 text-xs text-neutral-500">
                "Startups to Series B companies"
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">People-First Companies</h3>
              <p className="text-neutral-600 text-sm">
                Organizations that compete on culture and employee experience, not just salary and equity.
              </p>
              <div className="mt-4 text-xs text-neutral-500">
                "Culture-driven organizations"
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.414-4.414a2 2 0 00-2.828 0L4 12l4.586 4.586a2 2 0 002.828 0L16 12l-4.586-4.586z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Efficiency-Focused HR</h3>
              <p className="text-neutral-600 text-sm">
                HR teams that want maximum impact with minimal administrative overhead and clear ROI metrics.
              </p>
              <div className="mt-4 text-xs text-neutral-500">
                "Modern HR departments"
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-white rounded-2xl p-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-sm text-blue-600 font-semibold mb-2">EARLY RESULTS</div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-neutral-900 mb-1">89%</div>
                  <div className="text-sm text-neutral-600">Team Event Attendance</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-neutral-900 mb-1">65%</div>
                  <div className="text-sm text-neutral-600">Reduction in Planning Time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-neutral-900 mb-1">2min</div>
                  <div className="text-sm text-neutral-600">Average Booking Time</div>
                </div>
              </div>
              <div className="mt-4 text-xs text-neutral-500">
                *Based on early adopter feedback from pilot companies
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="pricing" className="bg-blue-500 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Team Events?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Book a 15-minute demo and see how 7DAY can solve your team event planning challenges.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-6">
                <div className="text-3xl font-bold text-neutral-900 mb-2">Schedule Demo</div>
                <div className="text-neutral-600">See your first team event solution in action</div>
              </div>
              
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                />
                <Input
                  type="text"
                  placeholder="Company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  size="lg"
                />
                <Button
                  fullWidth
                  size="lg"
                  disabled={!email || !companyName}
                >
                  Book 15-Minute Demo
                </Button>
              </div>
              
              <div className="text-xs text-neutral-500 mt-4">
                No sales pitch • See real team events • Ask any questions
              </div>
            </div>
          </div>
          
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="bg-blue-400/30 rounded-lg p-6">
              <div className="text-blue-100 text-sm mb-2">
                <strong>What HR teams see in the demo:</strong>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-blue-50 text-sm">
                <div>• Live venue booking process</div>
                <div>• Budget control settings</div>
                <div>• Team approval workflow</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* AI Chat Widget */}
      <AIChatWidget />
    </div>
  )
}