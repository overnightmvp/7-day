import type { Meta, StoryObj } from '@storybook/nextjs'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card'
import { Button, Badge } from '@/components/ui'

const meta: Meta<typeof Card> = {
  title: 'UI Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Card Component

Flexible container component for grouping related content in the 7DAY marketplace. Optimized for corporate experience presentations and booking interfaces.

### Design Philosophy
- **Content Hierarchy**: Clear header, body, footer structure
- **Visual Consistency**: Consistent spacing and border radius
- **Interaction States**: Hover effects for interactive cards
- **Mobile Responsive**: Adapts gracefully to all screen sizes
- **Australian Context**: Designed for corporate venue and experience presentation

### Usage Guidelines
- **Default**: Standard content containers (venue info, booking details)
- **Outlined**: Enhanced border for emphasis (featured experiences)
- **Elevated**: Prominent cards with shadow (call-to-action cards)
- **Interactive**: Clickable cards with hover states (experience previews)

### Content Structure
1. **CardHeader**: Title and description section
2. **CardContent**: Main content area with flexible layout
3. **CardFooter**: Actions, metadata, or navigation elements
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated', 'interactive'],
      description: 'Visual style variant for different use cases'
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'base', 'lg'],
      description: 'Internal padding amount - none for custom layouts'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Primary Stories
export const ExperienceShowcase: Story = {
  name: '🏞️ Experience Venue Cards',
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      {/* Featured Experience */}
      <Card variant="elevated" className="overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 relative">
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-white/90 backdrop-blur">
              AUD $450/night
            </Badge>
          </div>
          <div className="absolute top-3 left-3">
            <Badge variant="warning" className="bg-orange-100 text-orange-700">
              ✨ Popular Choice
            </Badge>
          </div>
        </div>
        <CardHeader>
          <CardTitle>Blue Mountains Corporate Retreat</CardTitle>
          <CardDescription>
            Exclusive mountain sanctuary 90 minutes from Sydney CBD. Perfect for strategic planning and team building.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center text-sm text-neutral-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              Leura, NSW - 90min from Sydney
            </div>
            <div className="flex items-center text-sm text-neutral-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              Perfect for 8-24 people
            </div>
            <div className="flex flex-wrap gap-1 mt-3">
              <Badge size="xs" variant="secondary">Meeting Rooms</Badge>
              <Badge size="xs" variant="secondary">Catering</Badge>
              <Badge size="xs" variant="secondary">Activities</Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-4">
          <Button fullWidth variant="primary">
            Reserve This Experience
          </Button>
        </CardFooter>
      </Card>
      
      {/* Standard Experience */}
      <Card variant="interactive" className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 relative">
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-white/90 backdrop-blur">
              AUD $280/night
            </Badge>
          </div>
        </div>
        <CardHeader>
          <CardTitle>Sydney Harbour Sailing Experience</CardTitle>
          <CardDescription>
            Premium yacht charter with catering. Iconic harbour views for memorable team events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center text-sm text-neutral-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              Circular Quay, Sydney
            </div>
            <div className="flex items-center text-sm text-neutral-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              Perfect for 6-16 people
            </div>
            <div className="flex flex-wrap gap-1 mt-3">
              <Badge size="xs" variant="info">Yacht Charter</Badge>
              <Badge size="xs" variant="secondary">Catering</Badge>
              <Badge size="xs" variant="secondary">Bar Service</Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-4">
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1">
              View Details
            </Button>
            <Button variant="primary" className="flex-1">
              Reserve
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real venue presentation cards from 7DAY marketplace. Shows proper content hierarchy, Australian context, and booking interface patterns.'
      }
    }
  }
}

export const BookingProgressCards: Story = {
  name: '📈 Booking Flow States',
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
      {/* Step 1 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">1</span>
            </div>
            <CardTitle className="text-base">Tell Us About Your Team</CardTitle>
          </div>
          <CardDescription>
            Quick assessment to match you with perfect venues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-neutral-600">
            • Team size and preferences<br/>
            • Budget and location<br/>
            • Event type and vibe
          </div>
        </CardContent>
      </Card>
      
      {/* Step 2 */}
      <Card variant="elevated">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">2</span>
            </div>
            <CardTitle className="text-base">Browse Recommendations</CardTitle>
          </div>
          <CardDescription>
            AI-curated venues matched to your requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-neutral-600">
            • 3-5 personalized matches<br/>
            • Transparent AUD pricing<br/>
            • Available dates shown
          </div>
        </CardContent>
      </Card>
      
      {/* Step 3 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-neutral-300 rounded-full flex items-center justify-center">
              <span className="text-neutral-600 font-bold text-sm">3</span>
            </div>
            <CardTitle className="text-base">Instant Booking</CardTitle>
          </div>
          <CardDescription>
            Submit inquiry and get confirmation within 2 hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-neutral-600">
            • Contact details<br/>
            • Event preferences<br/>
            • Special requirements
          </div>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progressive disclosure cards showing the 7DAY booking workflow. Uses color coding and visual hierarchy to guide users through the process.'
      }
    }
  }
}

export const MobileCardLayouts: Story = {
  name: '📱 Mobile Card Patterns',
  render: () => (
    <div className="space-y-4 max-w-sm">
      <div className="text-sm font-medium text-neutral-600 mb-3">Mobile-Optimized Card Layouts</div>
      
      {/* Compact Info Card */}
      <Card padding="sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-6m-2-4V9m-2 4h6m-6 4h6" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-neutral-900">Your Company</div>
            <div className="text-sm text-neutral-600 truncate">Acme Corporation Pty Ltd</div>
          </div>
          <Badge size="xs" variant="success">Active</Badge>
        </div>
      </Card>
      
      {/* Action Card */}
      <Card>
        <CardContent className="pt-4">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-neutral-900">Booking Confirmed!</div>
              <div className="text-sm text-neutral-600">Blue Mountains Retreat - March 15</div>
            </div>
            <Button variant="outline" size="sm" fullWidth>
              View Booking Details
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Statistics Card */}
      <Card variant="elevated">
        <CardContent className="pt-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">47</div>
            <div className="text-sm text-neutral-600 mb-2">Team Events This Year</div>
            <div className="text-xs text-neutral-500">89% employee attendance rate</div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile'
    },
    docs: {
      description: {
        story: 'Mobile-optimized card patterns for different content types. Compact layouts maximize screen real estate while maintaining readability.'
      }
    }
  }
}

export const CorporateBookingCards: Story = {
  name: '🏢 Corporate Booking Interface',
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div className="text-sm font-medium text-neutral-600 mb-3">Corporate Event Management Cards</div>
      
      {/* Booking Request Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Blue Mountains Team Retreat</CardTitle>
              <CardDescription>Acme Corporation • March 15, 2024 • 15 people</CardDescription>
            </div>
            <Badge variant="warning">Pending</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">Estimated Cost:</span>
              <span className="font-semibold">AUD $6,750</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">Contact:</span>
              <span>sarah@acme.com.au</span>
            </div>
            <div className="text-sm text-neutral-600">
              <span className="font-medium">Special Requests:</span> Dietary requirements for 2 vegetarians, accessible transport needed
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2 w-full">
            <Button variant="danger" size="sm" className="flex-1">
              Decline
            </Button>
            <Button variant="success" size="sm" className="flex-1">
              Approve Booking
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      {/* Company Stats Card */}
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Acme Corporation</CardTitle>
          <CardDescription>85 employees • Member since Jan 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-xs text-neutral-600">Events Booked</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">94%</div>
              <div className="text-xs text-neutral-600">Attendance Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">4.8</div>
              <div className="text-xs text-neutral-600">Avg. Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Corporate-specific card layouts for admin portal and booking management. Shows real Australian business context and data presentation patterns.'
      }
    }
  }
}

export const CardVariants: Story = {
  name: '🎨 All Card Variants',
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-2xl">
      <Card variant="default">
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>Standard container with subtle border</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600">Perfect for general content and information display.</p>
        </CardContent>
      </Card>
      
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Outlined Card</CardTitle>
          <CardDescription>Enhanced border for emphasis</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600">Use for important information that needs attention.</p>
        </CardContent>
      </Card>
      
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
          <CardDescription>Prominent shadow for hierarchy</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600">Ideal for featured content and call-to-action sections.</p>
        </CardContent>
      </Card>
      
      <Card variant="interactive" className="cursor-pointer">
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Hover effects for clickable content</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600">Perfect for clickable venue previews and selectable options.</p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All card variants with their intended use cases. Each variant serves specific information hierarchy needs in the booking interface.'
      }
    }
  }
}

// Individual Stories
export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description providing context</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content goes here...</p>
        </CardContent>
      </>
    )
  }
}

export const WithFooter: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Experience Booking</CardTitle>
          <CardDescription>Blue Mountains Corporate Retreat</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600">Premium mountain venue perfect for team building and strategic planning sessions.</p>
        </CardContent>
        <CardFooter>
          <Button fullWidth>Reserve Experience</Button>
        </CardFooter>
      </>
    )
  }
}

export const NoPadding: Story = {
  args: {
    padding: 'none',
    className: 'overflow-hidden',
    children: (
      <>
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="p-4">
          <CardTitle>Custom Layout Card</CardTitle>
          <CardDescription>Full control over internal spacing</CardDescription>
        </div>
      </>
    )
  }
}