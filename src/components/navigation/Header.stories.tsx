import type { Meta, StoryObj } from '@storybook/nextjs'
import { Header } from './Header'

const meta: Meta<typeof Header> = {
  title: 'Business Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Header Navigation

Responsive navigation header for the 7DAY Australian corporate experience marketplace. Adapts between landing page and authenticated app experiences.

### Navigation Strategy
- **Landing Variant**: Marketing-focused with features, experiences, pricing links
- **App Variant**: Task-focused with dashboard, bookings, account management
- **Mobile-First**: Hamburger menu with touch-optimized interactions
- **Brand Consistency**: 7DAY logo and blue brand color throughout

### Authentication States
- **Guest Users**: Sign In/Sign Up call-to-action buttons
- **Authenticated Users**: Profile dropdown with role-based options
- **Admin Users**: Additional admin portal access
- **Employee Users**: Company context and booking history

### Australian Corporate Context
- **Business Hours**: AEST/AEDT timezone awareness
- **Professional Tone**: Corporate-appropriate language and interactions
- **Local Navigation**: Australian venue categories and regions
- **Mobile Optimization**: Touch-friendly for HR managers on mobile
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['landing', 'app'],
      description: 'Navigation variant for different page contexts'
    },
    user: {
      control: 'object',
      description: 'User object for authenticated states'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const LandingPageHeader: Story = {
  name: '🏠 Landing Page Navigation',
  args: {
    variant: 'landing'
  },
  parameters: {
    docs: {
      description: {
        story: `
Landing page header optimized for corporate lead generation:

**Navigation Links**:
- **Features**: Platform capabilities and benefits
- **Experiences**: Browse Australian venue options
- **Pricing**: Transparent cost structure

**Call-to-Action**: "Start Free Trial" button for immediate conversion
**Brand Elements**: 7DAY logo with professional blue color scheme
        `
      }
    }
  }
}

export const AuthenticatedAppHeader: Story = {
  name: '💼 Authenticated App Header',
  args: {
    variant: 'app',
    user: {
      name: 'Sarah Chen',
      email: 'sarah@acme.com.au',
      role: 'admin',
      company: 'Acme Corporation'
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
Authenticated app header for corporate users:

**User Context**: Company name and role displayed
**Navigation**: Dashboard, My Bookings, Team Management
**Profile Menu**: Account settings, company admin, sign out
**Notifications**: Booking approvals and team event reminders
        `
      }
    }
  }
}

export const EmployeeAppHeader: Story = {
  name: '👥 Employee Experience Header',
  args: {
    variant: 'app',
    user: {
      name: 'Michael Thompson',
      email: 'michael@acme.com.au', 
      role: 'employee',
      company: 'Acme Corporation'
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
Employee-focused header for team members:

**Simplified Navigation**: Browse Experiences, My Bookings, Profile
**Company Context**: Shows company name and available budget
**Employee Actions**: Book experiences, view team events, update preferences
**Notifications**: Booking confirmations and team event invitations
        `
      }
    }
  }
}

export const MobileHeaderExperience: Story = {
  name: '📱 Mobile Navigation',
  args: {
    variant: 'landing'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile'
    },
    docs: {
      description: {
        story: `
Mobile-optimized header navigation:

**Responsive Design**: 
- Logo remains prominent on mobile
- Navigation collapses to hamburger menu
- CTA button adapts to mobile width
- Touch-friendly menu interactions

**Mobile UX Considerations**:
- Thumb-reachable navigation elements
- Simplified menu structure
- Quick access to primary actions
- Efficient use of limited screen space
        `
      }
    }
  }
}

export const BrandingShowcase: Story = {
  name: '🎨 Brand Identity Elements',
  render: () => (
    <div className="space-y-8">
      <div className="text-sm font-medium text-neutral-600 mb-3">7DAY Brand Implementation</div>
      
      {/* Logo Variations */}
      <div className="space-y-4">
        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Logo Variations</div>
        <div className="flex items-center gap-6 bg-white p-4 rounded-lg border">
          {/* Standard Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">7D</span>
            </div>
            <span className="text-xl font-bold text-neutral-900">7DAY</span>
          </div>
          
          {/* Compact Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">7D</span>
            </div>
            <span className="text-lg font-bold text-neutral-900">7DAY</span>
          </div>
          
          {/* Icon Only */}
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">7D</span>
          </div>
        </div>
      </div>
      
      {/* Brand Colors */}
      <div className="space-y-4">
        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Brand Colors</div>
        <div className="flex gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-lg mb-2"></div>
            <div className="text-xs font-medium">Primary Blue</div>
            <div className="text-xs text-neutral-500">#3b82f6</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-neutral-900 rounded-lg mb-2"></div>
            <div className="text-xs font-medium">Text Primary</div>
            <div className="text-xs text-neutral-500">#171717</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-neutral-600 rounded-lg mb-2"></div>
            <div className="text-xs font-medium">Text Secondary</div>
            <div className="text-xs text-neutral-500">#525252</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '7DAY brand identity elements including logo variations, color palette, and usage guidelines for consistent corporate presentation.'
      }
    }
  }
}

// Default Stories
export const Default: Story = {
  args: {
    variant: 'landing'
  }
}

export const WithUser: Story = {
  args: {
    variant: 'app',
    user: {
      name: 'Sarah Chen',
      email: 'sarah@acme.com.au',
      role: 'admin',
      company: 'Acme Corporation'
    }
  }
}