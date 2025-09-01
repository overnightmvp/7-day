import type { Meta, StoryObj } from '@storybook/nextjs'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'UI Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Badge Component

Semantic labeling system for status indication, categorization, and content organization in the 7DAY corporate marketplace.

### Design Philosophy
- **Semantic Color System**: Each variant has specific meaning in corporate context
- **Hierarchical Sizing**: 4 sizes for different content densities
- **High Contrast**: Ensures readability across all Australian business contexts
- **Icon Integration**: Enhanced with icons for quick visual scanning

### Semantic Meanings
- **Default/Secondary**: General labels and categories
- **Primary**: Important branding and featured content
- **Success**: Confirmed bookings, approved requests, positive status
- **Warning**: Pending actions, limited availability, attention needed
- **Danger**: Cancelled events, errors, critical alerts
- **Info**: Informational content, tips, neutral status
- **Outline**: Subtle labeling, secondary information

### Corporate Use Cases
- **Booking Status**: Pending, Confirmed, Cancelled
- **Venue Categories**: Team Building, Corporate Events, Luxury
- **Availability**: Limited, Available, Sold Out
- **Company Tiers**: Starter, Professional, Enterprise
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'outline'],
      description: 'Semantic variant for different status types'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg'],
      description: 'Badge size - xs for dense layouts, lg for emphasis'
    }
  },
  args: {
    children: 'Badge'
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Primary Stories
export const BookingStatusBadges: Story = {
  name: '📋 Booking Status System',
  render: () => (
    <div className="space-y-6">
      <div className="text-sm font-medium text-neutral-600 mb-3">Corporate Booking Status Indicators</div>
      
      {/* Booking States */}
      <div className="space-y-4">
        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Booking Workflow</div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="warning">Pending Review</Badge>
          <Badge variant="info">Under Consideration</Badge>
          <Badge variant="success">Booking Confirmed</Badge>
          <Badge variant="danger">Cancelled</Badge>
          <Badge variant="outline">Draft</Badge>
        </div>
      </div>
      
      {/* Experience Categories */}
      <div className="space-y-4">
        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Experience Types</div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary">Team Building</Badge>
          <Badge variant="secondary">Strategic Retreat</Badge>
          <Badge variant="info">Client Entertainment</Badge>
          <Badge variant="default">Celebration</Badge>
        </div>
      </div>
      
      {/* Availability Status */}
      <div className="space-y-4">
        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Venue Availability</div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Available</Badge>
          <Badge variant="warning">Limited Spots</Badge>
          <Badge variant="danger">Fully Booked</Badge>
          <Badge variant="outline">Coming Soon</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive status system for 7DAY corporate booking workflows. Each color has specific semantic meaning for consistent user understanding.'
      }
    }
  }
}

export const SizeVariations: Story = {
  name: '📎 Size Hierarchy',
  render: () => (
    <div className="space-y-6">
      <div className="text-sm font-medium text-neutral-600 mb-3">Badge Size System</div>
      
      {/* Size Comparison */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Badge size="xs" variant="primary">XS Badge</Badge>
          <span className="text-sm text-neutral-600">Dense interfaces, tag lists</span>
        </div>
        <div className="flex items-center gap-3">
          <Badge size="sm" variant="primary">Small Badge</Badge>
          <span className="text-sm text-neutral-600">Default size, most common use</span>
        </div>
        <div className="flex items-center gap-3">
          <Badge size="base" variant="primary">Base Badge</Badge>
          <span className="text-sm text-neutral-600">Emphasis, important status</span>
        </div>
        <div className="flex items-center gap-3">
          <Badge size="lg" variant="primary">Large Badge</Badge>
          <span className="text-sm text-neutral-600">Hero sections, primary status</span>
        </div>
      </div>
      
      {/* Real Usage Examples */}
      <div className="space-y-4">
        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Real Usage Context</div>
        
        {/* Venue Card with Multiple Badges */}
        <div className="bg-neutral-50 p-4 rounded-lg">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-semibold">Sydney Harbour Sailing</h4>
              <p className="text-sm text-neutral-600">Premium yacht charter experience</p>
            </div>
            <Badge size="base" variant="success">Available</Badge>
          </div>
          <div className="flex flex-wrap gap-1">
            <Badge size="xs" variant="secondary">Yacht Charter</Badge>
            <Badge size="xs" variant="secondary">Catering</Badge>
            <Badge size="xs" variant="secondary">Bar Service</Badge>
            <Badge size="xs" variant="outline">+3 more</Badge>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Size hierarchy system for different content densities. Shows real-world usage patterns in venue and booking interfaces.'
      }
    }
  }
}

export const WithIcons: Story = {
  name: '🎯 Enhanced with Icons',
  render: () => (
    <div className="space-y-6">
      <div className="text-sm font-medium text-neutral-600 mb-3">Icon-Enhanced Status Badges</div>
      
      <div className="space-y-4">
        {/* Status with Icons */}
        <div className="flex flex-wrap gap-3">
          <Badge 
            variant="success"
            icon={
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            }
          >
            Confirmed
          </Badge>
          <Badge 
            variant="warning"
            icon={
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            Pending
          </Badge>
          <Badge 
            variant="danger"
            icon={
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            }
          >
            Cancelled
          </Badge>
        </div>
        
        {/* Feature Badges */}
        <div className="flex flex-wrap gap-3">
          <Badge 
            variant="info"
            icon={
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            More Info
          </Badge>
          <Badge 
            variant="primary"
            icon={
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            }
          >
            Popular
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon integration for enhanced visual scanning and immediate status recognition. Icons should be 12px (w-3 h-3) for proper proportion.'
      }
    }
  }
}

export const MobileDensity: Story = {
  name: '📱 Mobile Layout Density',
  render: () => (
    <div className="space-y-4 max-w-sm">
      <div className="text-sm font-medium text-neutral-600 mb-3">Mobile Badge Layouts</div>
      
      {/* Dense Layout */}
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-sm">Blue Mountains Retreat</h4>
          <Badge size="sm" variant="success">Available</Badge>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          <Badge size="xs" variant="secondary">Meeting Rooms</Badge>
          <Badge size="xs" variant="secondary">Catering</Badge>
          <Badge size="xs" variant="secondary">Activities</Badge>
          <Badge size="xs" variant="outline">+4 more</Badge>
        </div>
        <div className="text-xs text-neutral-600">Perfect for 8-24 people</div>
      </div>
      
      {/* Spacious Layout */}
      <div className="bg-white p-4 rounded-lg border">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Harbour Sailing Experience</h4>
            <Badge variant="warning">2 spots left</Badge>
          </div>
          <div className="flex gap-2">
            <Badge variant="info">Yacht Charter</Badge>
            <Badge variant="secondary">Premium</Badge>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile'
    },
    docs: {
      description: {
        story: 'Mobile-optimized badge layouts showing different information densities. XS badges allow more content in limited space.'
      }
    }
  }
}

// Individual Variant Stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Featured'
  }
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Confirmed'
  }
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Pending'
  }
}

export const WithIcon: Story = {
  args: {
    variant: 'success',
    icon: (
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    children: 'Approved'
  }
}