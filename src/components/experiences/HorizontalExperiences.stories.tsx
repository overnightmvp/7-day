import type { Meta, StoryObj } from '@storybook/nextjs'
import { HorizontalExperiences } from './HorizontalExperiences'

const meta: Meta<typeof HorizontalExperiences> = {
  title: 'Business Components/HorizontalExperiences',
  component: HorizontalExperiences,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Horizontal Experience Browser

Touch-optimized horizontal scrolling component for browsing Australian corporate experiences. Designed for mobile-first HR manager workflow.

### Key Features
- **Touch-Optimized**: Smooth horizontal scrolling with momentum
- **Mobile-First**: Optimized for thumb navigation and one-handed use
- **Australian Context**: Local venues with AUD pricing and distances
- **Performance**: Lazy loading and efficient scroll handling
- **Corporate UX**: Professional presentation with booking CTAs

### Usage Guidelines
- Use for experience discovery and browsing flows
- Implement with 44px minimum touch targets
- Include clear pricing and availability indicators
- Provide immediate booking call-to-action
        `
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default horizontal experience browser showing 6 Australian corporate venues with touch-optimized scrolling and mobile-first design.'
      }
    }
  }
}

export const MobileExperience: Story = {
  name: '📱 Mobile Touch Navigation',
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile'
    },
    docs: {
      description: {
        story: 'Mobile-optimized experience browser with thumb-friendly scrolling, 44px touch targets, and one-handed navigation patterns.'
      }
    }
  }
}