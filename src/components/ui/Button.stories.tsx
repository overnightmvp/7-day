import type { Meta, StoryObj } from '@storybook/nextjs'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Button Component

Versatile button component with multiple variants, sizes, and states. Optimized for Australian corporate marketplace with touch-friendly mobile interactions.

### Key Features
- **6 semantic variants** for different actions and contexts
- **5 responsive sizes** with mobile-optimized touch targets (44px minimum)
- **Loading states** with smooth animations
- **Icon support** for enhanced visual hierarchy
- **Full accessibility** with proper ARIA attributes and keyboard navigation
- **Australian UX** optimized for corporate booking workflows

### Usage Guidelines
- **Primary**: Main call-to-action ("Reserve Experience", "Submit Booking")
- **Secondary**: Secondary actions ("View Details", "Learn More")
- **Outline**: Alternative actions ("Cancel", "Go Back")
- **Ghost**: Subtle actions ("Skip", "Maybe Later")
- **Danger**: Destructive actions ("Delete Booking", "Cancel Event")
- **Success**: Confirmation actions ("Confirm Booking", "Approve Request")

### Mobile Optimization
All buttons include \`min-h-[44px]\` for iOS/Android touch guidelines and \`touch-manipulation\` for improved responsiveness.
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success'],
      description: 'Visual style variant for different use cases'
    },
    size: {
      control: 'select', 
      options: ['xs', 'sm', 'base', 'lg', 'xl', 'icon'],
      description: 'Button size - all sizes meet 44px touch target on mobile'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner animation'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state with reduced opacity'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button for mobile forms'
    }
  },
  args: {
    children: 'Button Text'
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Primary Stories
export const AllVariants: Story = {
  name: '🎨 All Variants',
  render: () => (
    <div className="space-y-4">
      <div className="text-sm font-medium text-neutral-600 mb-3">Corporate Marketplace Button Variants</div>
      <div className="flex flex-wrap gap-3">
        <Button variant="primary">Reserve Experience</Button>
        <Button variant="secondary">View Details</Button>
        <Button variant="outline">Go Back</Button>
        <Button variant="ghost">Skip</Button>
        <Button variant="danger">Cancel Booking</Button>
        <Button variant="success">Confirm Booking</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete variant showcase for 7DAY marketplace actions. Each variant has specific semantic meaning in the booking workflow.'
      }
    }
  }
}

export const MobileSizes: Story = {
  name: '📱 Mobile Touch Targets',
  render: () => (
    <div className="space-y-4">
      <div className="text-sm font-medium text-neutral-600 mb-3">Touch-Optimized Sizes (44px minimum)</div>
      <div className="flex flex-col gap-3 max-w-xs">
        <Button size="xs">Extra Small (Emergency use only)</Button>
        <Button size="sm">Small Button</Button>
        <Button size="base">Standard Button</Button>
        <Button size="lg">Large CTA</Button>
        <Button size="xl">Hero CTA</Button>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile'
    },
    docs: {
      description: {
        story: 'Mobile-optimized button sizes following iOS Human Interface Guidelines (44px minimum touch target). XS should only be used in dense interfaces.'
      }
    }
  }
}

export const LoadingStates: Story = {
  name: '⏳ Loading & States',
  render: () => (
    <div className="space-y-4">
      <div className="text-sm font-medium text-neutral-600 mb-3">Interactive States</div>
      <div className="flex flex-wrap gap-3">
        <Button>Normal State</Button>
        <Button loading>Submitting Booking...</Button>
        <Button disabled>Disabled</Button>
        <Button variant="primary" className="hover:scale-105 transition-transform">Hover Effect</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading states for form submissions and async actions. Includes micro-animations for premium feel.'
      }
    }
  }
}

export const CorporateBookingFlow: Story = {
  name: '🏢 Corporate Booking Examples',
  render: () => (
    <div className="space-y-6 max-w-md">
      <div className="text-sm font-medium text-neutral-600 mb-3">Real-world Corporate Booking Buttons</div>
      
      {/* Primary Actions */}
      <div className="space-y-3">
        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Primary Actions</div>
        <Button variant="primary" fullWidth size="lg">
          Reserve This Experience
        </Button>
        <Button variant="primary" fullWidth>
          Submit Booking Inquiry
        </Button>
      </div>
      
      {/* Secondary Actions */}
      <div className="space-y-3">
        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Secondary Actions</div>
        <Button variant="secondary" fullWidth>
          View Venue Details
        </Button>
        <Button variant="outline" fullWidth>
          Download Information Pack
        </Button>
      </div>
      
      {/* Admin Actions */}
      <div className="space-y-3">
        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Admin Portal Actions</div>
        <div className="flex gap-2">
          <Button variant="success" size="sm" className="flex-1">
            Approve Booking
          </Button>
          <Button variant="danger" size="sm" className="flex-1">
            Decline
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples from 7DAY corporate experience booking workflows. Shows semantic meaning and typical usage patterns.'
      }
    }
  }
}

export const WithIcons: Story = {
  name: '🎯 Icon Integration',
  render: () => (
    <div className="space-y-4">
      <div className="text-sm font-medium text-neutral-600 mb-3">Enhanced with Icons</div>
      <div className="flex flex-wrap gap-3">
        <Button 
          leftIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          }
        >
          Add Experience
        </Button>
        <Button 
          variant="outline"
          rightIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          }
        >
          View in New Tab
        </Button>
        <Button 
          variant="success"
          leftIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          }
        >
          Booking Confirmed
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon integration for enhanced visual hierarchy and faster user comprehension. Icons should be 16px (w-4 h-4) for optimal readability.'
      }
    }
  }
}

// Individual Variant Stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Reserve Experience'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary', 
    children: 'View Details'
  }
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Go Back'
  }
}

export const Loading: Story = {
  args: {
    variant: 'primary',
    loading: true,
    children: 'Submitting Booking...'
  }
}

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    fullWidth: true,
    size: 'lg',
    children: 'Submit Booking Inquiry'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile'
    }
  }
}