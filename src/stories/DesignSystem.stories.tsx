import type { Meta, StoryObj } from '@storybook/nextjs'
import { Button, Input, Card, Badge } from '@/components/ui'

const meta: Meta = {
  title: 'Design System/Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## 7DAY Design System

Comprehensive design system for the Australian corporate experience marketplace. Built for scalability, accessibility, and mobile-first user experiences.

### Design Philosophy
- **Australian Corporate Context**: Professional, trustworthy, efficient
- **Mobile-First**: Optimized for HR managers booking on mobile devices
- **Accessibility**: WCAG 2.1 AA compliance throughout
- **Consistent Brand**: Blue primary (#3b82f6) with semantic color system
- **High Performance**: Minimal CSS footprint with design token system
        `
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const ColorPalette: Story = {
  name: '🎨 Color System',
  render: () => (
    <div className="p-6 space-y-8">
      <div className="text-xl font-bold text-neutral-900 mb-4">7DAY Color Palette</div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-800">Primary Brand Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-500 rounded-lg mb-3 mx-auto shadow-sm"></div>
            <div className="text-sm font-medium text-neutral-900">Primary Blue</div>
            <div className="text-xs text-neutral-500">#3b82f6</div>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500 rounded-lg mb-3 mx-auto shadow-sm"></div>
            <div className="text-sm font-medium text-neutral-900">Success</div>
            <div className="text-xs text-neutral-500">#10b981</div>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-orange-500 rounded-lg mb-3 mx-auto shadow-sm"></div>
            <div className="text-sm font-medium text-neutral-900">Warning</div>
            <div className="text-xs text-neutral-500">#f59e0b</div>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-red-500 rounded-lg mb-3 mx-auto shadow-sm"></div>
            <div className="text-sm font-medium text-neutral-900">Danger</div>
            <div className="text-xs text-neutral-500">#ef4444</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete color palette with semantic meanings for Australian corporate booking context.'
      }
    }
  }
}

export const TypographyScale: Story = {
  name: '📝 Typography System',
  render: () => (
    <div className="p-6 space-y-8 max-w-4xl">
      <div className="text-xl font-bold text-neutral-900 mb-4">Typography Scale</div>
      
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-neutral-800">Heading Hierarchy</h3>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-neutral-900">7DAY Corporate Experiences</h1>
          <h2 className="text-3xl font-bold text-neutral-900">Find Your Perfect Venue</h2>
          <h3 className="text-2xl font-bold text-neutral-900">Blue Mountains Corporate Retreat</h3>
          <h4 className="text-xl font-semibold text-neutral-900">Booking Confirmation</h4>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-neutral-800">Body Text System</h3>
        <div className="space-y-4">
          <p className="text-base text-neutral-700">
            Standard body text for corporate descriptions and form instructions.
          </p>
          <p className="text-sm text-neutral-600">
            Secondary information, captions, and supporting details.
          </p>
          <p className="text-xs text-neutral-500">
            Fine print, timestamps, and metadata.
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Typography scale with Australian corporate context examples.'
      }
    }
  }
}