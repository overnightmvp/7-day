import type { Meta, StoryObj } from '@storybook/nextjs'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'UI Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Input Component

Versatile form input component designed for Australian corporate booking workflows. Includes comprehensive validation, accessibility features, and mobile keyboard optimization.

### Key Features
- **Semantic variants** for different validation states
- **Label and hint system** for clear user guidance
- **Icon integration** for enhanced visual hierarchy
- **Error handling** with accessible error messages
- **Mobile optimization** with appropriate keyboard types
- **Australian localization** ready (date formats, phone numbers)

### Form Design Principles
1. **Clear labeling** - Every input has descriptive label
2. **Helpful hints** - Guide users with examples and expectations
3. **Immediate feedback** - Real-time validation without being annoying
4. **Error recovery** - Clear instructions for fixing validation errors
5. **Progress indication** - Users know where they are in multi-step forms

### Accessibility Features
- Proper ARIA labels and error associations
- Keyboard navigation support
- Screen reader friendly error messages
- High contrast focus indicators
        `
      }
    }
  },
  argTypes: {
    inputSize: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
      description: 'Input size - lg recommended for mobile touch interfaces'
    },
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Visual state indicating validation status'
    },
    label: {
      control: 'text',
      description: 'Descriptive label for the input field'
    },
    error: {
      control: 'text', 
      description: 'Error message - automatically sets variant to error'
    },
    hint: {
      control: 'text',
      description: 'Helpful hint text (hidden when error is present)'
    }
  },
  args: {
    placeholder: 'Enter text here...'
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Primary Stories
export const CorporateBookingForm: Story = {
  name: '🏢 Corporate Booking Examples',
  render: () => (
    <div className="space-y-6 max-w-md">
      <div className="text-sm font-medium text-neutral-600 mb-4">Real 7DAY Booking Form Inputs</div>
      
      {/* Contact Information */}
      <div className="space-y-4">
        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Contact Information</div>
        <Input
          label="Work Email"
          type="email"
          placeholder="sarah@company.com.au"
          hint="We'll send venue details to this email"
          inputSize="lg"
        />
        <Input
          label="Company Name"
          placeholder="Acme Corporation Pty Ltd"
          hint="Helps us prepare the perfect experience"
        />
        <Input
          label="Your Name"
          placeholder="Sarah Chen"
          hint="Primary contact for this booking"
        />
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+61 4XX XXX XXX"
          hint="Optional - for faster response"
        />
      </div>
      
      {/* Event Details */}
      <div className="space-y-4">
        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Event Details</div>
        <Input
          label="Preferred Date"
          type="date"
          hint="Minimum 2 weeks notice required"
        />
        <Input
          label="Special Requests"
          placeholder="Dietary requirements, accessibility needs..."
          hint="Help us prepare the perfect experience"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real examples from 7DAY corporate booking forms. Shows proper labeling, hint usage, and Australian business context.'
      }
    }
  }
}

export const ValidationStates: Story = {
  name: '✅ Validation & Error States',
  render: () => (
    <div className="space-y-4 max-w-md">
      <div className="text-sm font-medium text-neutral-600 mb-3">Form Validation Examples</div>
      <Input
        label="Email Address"
        type="email"
        placeholder="user@company.com"
        hint="We'll never share your email"
      />
      <Input
        label="Email Address (Error)"
        type="email"
        value="invalid-email"
        error="Please enter a valid email address"
      />
      <Input
        label="Email Address (Success)"
        type="email"
        value="sarah@company.com.au"
        variant="success"
        hint="Perfect! We'll send venue details here"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form validation states with helpful error messages and success confirmation. Error messages are specific and actionable.'
      }
    }
  }
}

export const MobileOptimized: Story = {
  name: '📱 Mobile Form Experience',
  render: () => (
    <div className="space-y-4 max-w-sm">
      <div className="text-sm font-medium text-neutral-600 mb-3">Mobile-First Form Design</div>
      <Input
        label="Work Email"
        type="email"
        placeholder="sarah@company.com.au"
        inputSize="lg"
        hint="Large size for easier mobile typing"
      />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="04XX XXX XXX"
        inputSize="lg"
        hint="Australian mobile format"
      />
      <Input
        label="Team Size"
        type="number"
        placeholder="12"
        inputSize="lg"
        hint="Number of attendees"
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile'
    },
    docs: {
      description: {
        story: 'Mobile-optimized inputs with large touch targets and appropriate keyboard types for Australian corporate context.'
      }
    }
  }
}

export const WithIcons: Story = {
  name: '🎯 Icon Integration',
  render: () => (
    <div className="space-y-4 max-w-md">
      <div className="text-sm font-medium text-neutral-600 mb-3">Enhanced with Icons</div>
      <Input
        label="Search Experiences"
        placeholder="Blue Mountains, harbour cruise..."
        leftIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        }
      />
      <Input
        label="Budget Range"
        placeholder="5000"
        type="number"
        leftIcon={
          <span className="text-xs font-medium">AUD</span>
        }
        rightIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        }
        hint="Total budget in Australian dollars"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon integration for enhanced visual hierarchy. Left icons for input type indication, right icons for actions or currency.'
      }
    }
  }
}

// Individual Variant Stories
export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'user@company.com.au',
    hint: 'We\'ll send confirmation to this email'
  }
}

export const WithError: Story = {
  args: {
    label: 'Company Name',
    placeholder: 'Acme Corporation',
    error: 'Company name is required for corporate bookings',
    value: ''
  }
}

export const Large: Story = {
  args: {
    label: 'Contact Information',
    placeholder: 'Enter your details...',
    inputSize: 'lg',
    hint: 'Large size optimized for mobile devices'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile'
    }
  }
}