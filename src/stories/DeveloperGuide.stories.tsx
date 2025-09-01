import type { Meta, StoryObj } from '@storybook/nextjs'
import { Button, Input, Card, Badge } from '@/components/ui'

const meta: Meta = {
  title: 'Documentation/Developer Guide',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Developer Documentation

Comprehensive guide for developers working with the 7DAY Australian corporate experience marketplace design system.

### Quick Start
1. Import components from \`@/components/ui\`
2. Use design tokens from \`@/lib/design-tokens.ts\`
3. Follow Australian corporate UX patterns
4. Test on mobile devices first

### Development Workflow
- **Component-First**: Build reusable components with variants
- **Mobile-First**: Start with mobile layouts, enhance for desktop
- **Type-Safe**: Full TypeScript integration with proper prop types
- **Accessible**: WCAG 2.1 AA compliance built-in
        `
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const MicrocopyGuidelines: Story = {
  name: '✍️ Microcopy & Content Guidelines',
  render: () => (
    <div className="p-6 space-y-8 max-w-4xl">
      <div className="text-2xl font-bold text-neutral-900 mb-4">Microcopy Guidelines</div>
      
      {/* Button Labels */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800">Button Text Patterns</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="text-sm font-medium text-neutral-700">✅ Preferred Patterns</div>
            <div className="space-y-2">
              <Button variant="primary" fullWidth>Reserve This Experience</Button>
              <Button variant="secondary" fullWidth>View Venue Details</Button>
              <Button variant="outline" fullWidth>Save for Later</Button>
              <Button variant="ghost" fullWidth>Compare Options</Button>
            </div>
            <div className="text-xs text-neutral-600 space-y-1">
              <div>• Action-oriented and specific</div>
              <div>• Clear outcome expectations</div>
              <div>• Corporate-appropriate tone</div>
              <div>• Australian English spelling</div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-sm font-medium text-neutral-700">❌ Avoid These Patterns</div>
            <div className="space-y-2 opacity-50">
              <Button variant="secondary" fullWidth disabled>Click Here</Button>
              <Button variant="secondary" fullWidth disabled>Submit</Button>
              <Button variant="secondary" fullWidth disabled>Book Now!</Button>
              <Button variant="secondary" fullWidth disabled>Get Started</Button>
            </div>
            <div className="text-xs text-neutral-600 space-y-1">
              <div>• Too generic or vague</div>
              <div>• Overly promotional tone</div>
              <div>• Unclear next step</div>
              <div>• American spelling variants</div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Labels & Hints */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800">Form Microcopy Patterns</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="text-sm font-medium text-neutral-700">Input Labels & Hints</div>
            <div className="space-y-3">
              <Input 
                label="Work Email" 
                placeholder="sarah@acme.com.au"
                hint="We'll send venue details to this email"
              />
              <Input 
                label="Company Name" 
                placeholder="Acme Corporation"
                hint="Helps us prepare the perfect experience"
              />
              <Input 
                label="Contact Name" 
                placeholder="Sarah Chen"
                hint="Who should we contact about this booking?"
              />
              <Input 
                label="Phone (Optional)" 
                placeholder="+61 4XX XXX XXX"
                hint="For faster response (within 2 hours)"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-neutral-700">Validation Messages</div>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-red-50 border border-red-200 rounded">
                <div className="text-red-800 font-medium">Required field</div>
                <div className="text-red-700">"We'll need your work email to send venue details"</div>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                <div className="text-orange-800 font-medium">Date validation</div>
                <div className="text-orange-700">"Please choose a date at least 2 weeks ahead"</div>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <div className="text-green-800 font-medium">Success confirmation</div>
                <div className="text-green-700">"Perfect! We'll send venue details here"</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800">Status & Badge Text</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="text-sm font-medium text-neutral-700">Booking States</div>
            <div className="space-y-2">
              <Badge variant="warning">Pending Review</Badge>
              <Badge variant="info">Under Consideration</Badge>
              <Badge variant="success">Booking Confirmed</Badge>
              <Badge variant="danger">Booking Cancelled</Badge>
            </div>
            <div className="text-xs text-neutral-600">
              Clear, professional status language
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-sm font-medium text-neutral-700">Availability States</div>
            <div className="space-y-2">
              <Badge variant="success">Available</Badge>
              <Badge variant="warning">2 spots left</Badge>
              <Badge variant="danger">Fully Booked</Badge>
              <Badge variant="outline">Coming Soon</Badge>
            </div>
            <div className="text-xs text-neutral-600">
              Urgency without pressure tactics
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-sm font-medium text-neutral-700">Experience Types</div>
            <div className="space-y-2">
              <Badge variant="primary">Team Building</Badge>
              <Badge variant="secondary">Strategic Retreat</Badge>
              <Badge variant="info">Client Entertainment</Badge>
              <Badge variant="default">Celebration</Badge>
            </div>
            <div className="text-xs text-neutral-600">
              Business-appropriate categorization
            </div>
          </div>
        </div>
      </div>

      {/* Australian Context */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800">Australian Corporate Tone</h3>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-blue-900 mb-3">Tone & Voice Guidelines</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold text-blue-800 mb-2">Professional & Approachable</div>
              <div className="text-blue-700 space-y-1">
                <div>• "Perfect for your team" not "Perfect for you"</div>
                <div>• "Book your experience" not "Book now!"</div>
                <div>• "Free inquiry" not "No obligation"</div>
                <div>• "2-hour response" not "Lightning fast"</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-blue-800 mb-2">Australian Context</div>
              <div className="text-blue-700 space-y-1">
                <div>• "90 minutes from Sydney CBD"</div>
                <div>• "Melbourne's premier venue"</div>
                <div>• "All-inclusive AUD pricing"</div>
                <div>• "Australian business hours"</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive microcopy guidelines for buttons, forms, status messages, and Australian corporate context. Ensures consistent professional tone.'
      }
    }
  }
}

export const ComponentUsagePatterns: Story = {
  name: '🔧 Component Usage Patterns',
  render: () => (
    <div className="p-6 space-y-8 max-w-4xl">
      <div className="text-2xl font-bold text-neutral-900 mb-4">Component Usage Patterns</div>
      
      {/* Button Combinations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800">Button Hierarchy & Combinations</h3>
        <div className="space-y-6">
          
          {/* Primary + Secondary */}
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-sm font-medium text-neutral-700 mb-3">Primary + Secondary Actions</div>
            <div className="flex gap-3">
              <Button variant="primary">Reserve Experience</Button>
              <Button variant="secondary">View Details</Button>
            </div>
            <div className="text-xs text-neutral-600 mt-2">
              Use for main action + supporting action combinations
            </div>
          </div>

          {/* Action Groups */}
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-sm font-medium text-neutral-700 mb-3">Action Groups</div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">Save Draft</Button>
              <Button variant="ghost" size="sm">Cancel</Button>
              <Button variant="primary" size="sm">Submit Inquiry</Button>
            </div>
            <div className="text-xs text-neutral-600 mt-2">
              Grouped actions with visual hierarchy (outline → ghost → primary)
            </div>
          </div>

          {/* Mobile Stack */}
          <div className="bg-white p-4 rounded-lg border max-w-sm">
            <div className="text-sm font-medium text-neutral-700 mb-3">Mobile Button Stack</div>
            <div className="space-y-2">
              <Button variant="primary" fullWidth>Reserve This Experience</Button>
              <Button variant="outline" fullWidth>Compare Options</Button>
            </div>
            <div className="text-xs text-neutral-600 mt-2">
              Full-width stacked layout for mobile interfaces
            </div>
          </div>
        </div>
      </div>

      {/* Form Patterns */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800">Form Layout Patterns</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Single Column */}
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-sm font-medium text-neutral-700 mb-3">Single Column (Mobile)</div>
            <div className="space-y-3 max-w-sm">
              <Input label="Work Email" placeholder="sarah@acme.com.au" />
              <Input label="Company Name" placeholder="Acme Corporation" />
              <div className="grid grid-cols-2 gap-2">
                <Input label="First Name" placeholder="Sarah" />
                <Input label="Last Name" placeholder="Chen" />
              </div>
              <Button variant="primary" fullWidth>Submit Inquiry</Button>
            </div>
          </div>

          {/* Two Column */}
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-sm font-medium text-neutral-700 mb-3">Two Column (Desktop)</div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Work Email" placeholder="sarah@acme.com.au" />
                <Input label="Company Name" placeholder="Acme Corporation" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" placeholder="Sarah" />
                <Input label="Last Name" placeholder="Chen" />
              </div>
              <Button variant="primary" className="ml-auto">Submit Inquiry</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Card Patterns */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800">Card Layout Patterns</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Experience Card */}
          <Card className="overflow-hidden">
            <div className="relative h-32 bg-gradient-to-br from-blue-400 to-blue-600">
              <div className="absolute top-3 right-3">
                <Badge variant="default" className="bg-white/90 text-neutral-900">
                  AUD $450/night
                </Badge>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <h4 className="font-semibold text-neutral-900">Blue Mountains Retreat</h4>
                <Badge variant="success" size="sm">Available</Badge>
              </div>
              <p className="text-sm text-neutral-600">
                Exclusive mountain sanctuary 90 minutes from Sydney CBD
              </p>
              <div className="flex gap-1">
                <Badge size="xs" variant="secondary">Meeting Rooms</Badge>
                <Badge size="xs" variant="secondary">Catering</Badge>
                <Badge size="xs" variant="outline">+3 more</Badge>
              </div>
              <Button variant="primary" fullWidth>Reserve</Button>
            </div>
          </Card>

          {/* Booking Summary Card */}
          <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-neutral-900">Booking Summary</h4>
              <Badge variant="warning">Pending</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Experience</span>
                <span className="font-medium">Harbour Sailing</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Date</span>
                <span className="font-medium">15 March 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Team Size</span>
                <span className="font-medium">12 people</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>AUD $5,400</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Modify</Button>
              <Button variant="primary" size="sm">Confirm</Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Error & Success Messages */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800">Messaging Patterns</h3>
        <div className="space-y-4">
          
          {/* Error Messages */}
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <div className="text-sm font-medium text-red-900 mb-2">Error Messages</div>
            <div className="space-y-2 text-sm text-red-800">
              <div>"We'll need your work email to send venue details"</div>
              <div>"Please choose a date at least 2 weeks ahead"</div>
              <div>"This experience is fully booked for your selected date"</div>
            </div>
            <div className="text-xs text-red-700 mt-3">
              Helpful, solution-oriented language that explains the requirement
            </div>
          </div>

          {/* Success Messages */}
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <div className="text-sm font-medium text-green-900 mb-2">Success Messages</div>
            <div className="space-y-2 text-sm text-green-800">
              <div>"Perfect! We'll send venue details to sarah@acme.com.au"</div>
              <div>"Booking inquiry submitted. Expect a response within 2 hours"</div>
              <div>"Your team experience is confirmed for 15 March 2024"</div>
            </div>
            <div className="text-xs text-green-700 mt-3">
              Positive reinforcement with specific next steps and timeframes
            </div>
          </div>

          {/* Loading States */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <div className="text-sm font-medium text-blue-900 mb-2">Loading Messages</div>
            <div className="space-y-2 text-sm text-blue-800">
              <div>"Finding perfect venues for your team..."</div>
              <div>"Submitting your booking inquiry..."</div>
              <div>"Preparing your experience details..."</div>
            </div>
            <div className="text-xs text-blue-700 mt-3">
              Active language that explains what's happening behind the scenes
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive microcopy guidelines including button text, form labels, validation messages, and Australian corporate tone examples.'
      }
    }
  }
}

export const CodeExamples: Story = {
  name: '💻 Code Implementation Patterns',
  render: () => (
    <div className="p-6 space-y-8 max-w-4xl">
      <div className="text-2xl font-bold text-neutral-900 mb-4">Code Implementation Examples</div>
      
      {/* Button Patterns */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800">Button Implementation</h3>
        <div className="bg-neutral-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div className="text-green-300 mb-2">{/* Primary action with loading state */}</div>
          <pre>{`<Button 
  variant="primary" 
  fullWidth 
  disabled={isLoading}
  onClick={handleReservation}
>
  {isLoading ? 'Submitting...' : 'Reserve This Experience'}
</Button>`}</pre>
          
          <div className="text-green-300 mb-2 mt-4">{/* Action group with hierarchy */}</div>
          <pre>{`<div className="flex gap-3">
  <Button variant="primary">Reserve Experience</Button>
  <Button variant="secondary">View Details</Button>
  <Button variant="ghost">Save for Later</Button>
</div>`}</pre>

          <div className="text-green-300 mb-2 mt-4">{/* Mobile-optimized stack */}</div>
          <pre>{`<div className="space-y-2 sm:space-y-0 sm:flex sm:gap-3">
  <Button variant="primary" fullWidth>
    Reserve This Experience
  </Button>
  <Button variant="outline" fullWidth>
    Compare Options
  </Button>
</div>`}</pre>
        </div>
      </div>

      {/* Form Patterns */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800">Form Implementation</h3>
        <div className="bg-neutral-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div className="text-green-300 mb-2">{/* Australian corporate form */}</div>
          <pre>{`<form className="space-y-4">
  <Input
    label="Work Email"
    type="email"
    placeholder="sarah@acme.com.au"
    hint="We'll send venue details to this email"
    required
  />
  <Input
    label="Company Name"
    placeholder="Acme Corporation"
    hint="Helps us prepare the perfect experience"
    required
  />
  <Input
    label="Phone (Optional)"
    type="tel"
    placeholder="+61 4XX XXX XXX"
    hint="For faster response (within 2 hours)"
  />
  <Button variant="primary" fullWidth type="submit">
    Submit Booking Inquiry
  </Button>
</form>`}</pre>
        </div>
      </div>

      {/* Badge Patterns */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800">Badge Implementation</h3>
        <div className="bg-neutral-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div className="text-green-300 mb-2">{/* Status badge with icon */}</div>
          <pre>{`<Badge 
  variant="success"
  icon={<CheckIcon className="w-3 h-3" />}
>
  Booking Confirmed
</Badge>`}</pre>

          <div className="text-green-300 mb-2 mt-4">{/* Venue amenity tags */}</div>
          <pre>{`<div className="flex flex-wrap gap-1">
  {amenities.slice(0, 3).map((amenity) => (
    <Badge key={amenity} size="xs" variant="secondary">
      {amenity}
    </Badge>
  ))}
  {amenities.length > 3 && (
    <Badge size="xs" variant="outline">
      +{amenities.length - 3} more
    </Badge>
  )}
</div>`}</pre>

          <div className="text-green-300 mb-2 mt-4">{/* Conditional status */}</div>
          <pre>{`<Badge 
  variant={
    booking.status === 'confirmed' ? 'success' :
    booking.status === 'pending' ? 'warning' :
    'danger'
  }
>
  {booking.status === 'confirmed' ? 'Booking Confirmed' :
   booking.status === 'pending' ? 'Pending Review' :
   'Booking Cancelled'}
</Badge>`}</pre>
        </div>
      </div>

      {/* Australian Formatting */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800">Australian Formatting</h3>
        <div className="bg-neutral-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div className="text-green-300 mb-2">{/* Currency formatting */}</div>
          <pre>{`import { formatAUD } from '@/lib/experiences'

const priceDisplay = formatAUD(4500) // "AUD $4,500"

<span className="font-semibold text-blue-600">
  {formatAUD(experience.price_per_night)}/night
</span>`}</pre>

          <div className="text-green-300 mb-2 mt-4">{/* Date formatting */}</div>
          <pre>{`const formatAustralianDate = (date: Date) => {
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long', 
    year: 'numeric',
    timeZone: 'Australia/Sydney'
  })
}

// Result: "15 March 2024"`}</pre>

          <div className="text-green-300 mb-2 mt-4">{/* Phone validation */}</div>
          <pre>{`const validateAustralianPhone = (phone: string) => {
  const cleaned = phone.replace(/\\s+/g, '')
  return /^(\\+61|0)[2-478]\\d{8}$/.test(cleaned)
}

// Accepts: +61 4XX XXX XXX, 04XX XXX XXX`}</pre>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Code implementation patterns for buttons, forms, badges, and Australian corporate formatting. Copy-paste ready examples for developers.'
      }
    }
  }
}

export const QuickReference: Story = {
  name: '📚 Quick Reference',
  render: () => (
    <div className="p-6 space-y-8">
      <div className="text-2xl font-bold text-neutral-900 mb-4">Developer Quick Reference</div>
      
      {/* Component Imports */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800">Component Imports</h3>
        <div className="bg-neutral-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`// Core UI Components
import { Button, Input, Card, Badge } from '@/components/ui'

// Business Components
import { CompanyQuiz } from '@/components/quiz/CompanyQuiz'
import { HorizontalExperiences } from '@/components/experiences/HorizontalExperiences'
import { SimpleBookingModal } from '@/components/booking/SimpleBookingModal'
import { Header } from '@/components/navigation/Header'

// Utilities & Data
import { formatAUD, experiences } from '@/lib/experiences'
import { designTokens } from '@/lib/design-tokens'
import { cn } from '@/lib/utils'`}</pre>
        </div>
      </div>

      {/* Common Patterns */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800">Common Implementation Patterns</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-sm font-medium text-neutral-700 mb-3">Button Size Guide</div>
            <div className="space-y-2 text-xs">
              <div><code>size="sm"</code> - Dense interfaces, secondary actions</div>
              <div><code>size="base"</code> - Default size, most common</div>
              <div><code>size="lg"</code> - Mobile primary actions, emphasis</div>
              <div><code>fullWidth</code> - Mobile forms, modal actions</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className="text-sm font-medium text-neutral-700 mb-3">Badge Usage Guide</div>
            <div className="space-y-2 text-xs">
              <div><code>variant="success"</code> - Confirmed, available, positive</div>
              <div><code>variant="warning"</code> - Pending, limited, caution</div>
              <div><code>variant="danger"</code> - Cancelled, error, blocked</div>
              <div><code>size="xs"</code> - Tag lists, amenities, dense layouts</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className="text-sm font-medium text-neutral-700 mb-3">Input Best Practices</div>
            <div className="space-y-2 text-xs">
              <div><code>type="email"</code> - Shows @ keyboard on mobile</div>
              <div><code>type="tel"</code> - Number pad for phone inputs</div>
              <div><code>inputSize="lg"</code> - Mobile-optimized touch targets</div>
              <div><code>hint</code> - Always explain why field is needed</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className="text-sm font-medium text-neutral-700 mb-3">Responsive Classes</div>
            <div className="space-y-2 text-xs">
              <div><code>sm:flex</code> - Stack on mobile, flex on tablet+</div>
              <div><code>md:grid-cols-2</code> - Single column mobile, 2 cols desktop</div>
              <div><code>lg:p-6</code> - Compact mobile, spacious desktop</div>
              <div><code>space-y-3 sm:space-y-0 sm:gap-4</code> - Mobile stack → desktop flex</div>
            </div>
          </div>
        </div>
      </div>

      {/* Australian Context Checklist */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800">Australian Corporate Checklist</h3>
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <div className="text-sm font-medium text-green-900 mb-3">Pre-Launch Checklist</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800">
            <div className="space-y-1">
              <div>✅ All prices display in AUD format</div>
              <div>✅ Phone numbers use Australian format</div>
              <div>✅ Dates use DD/MM/YYYY or "15 March" format</div>
              <div>✅ Timezone shows AEST/AEDT</div>
              <div>✅ Australian English spelling (colour, centre)</div>
            </div>
            <div className="space-y-1">
              <div>✅ Touch targets minimum 44px</div>
              <div>✅ Works on 3G mobile networks</div>
              <div>✅ Keyboard types optimized for mobile</div>
              <div>✅ Focus rings visible for keyboard users</div>
              <div>✅ WCAG 2.1 AA color contrast</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Quick reference guide with code examples, component usage patterns, responsive classes, and Australian corporate implementation checklist.'
      }
    }
  }
}