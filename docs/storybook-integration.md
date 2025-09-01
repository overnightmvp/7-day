# Storybook Integration Guide

## Overview

The 7DAY design system is documented using Storybook 9.1.3, providing comprehensive component documentation with Australian corporate context and mobile-first design patterns.

## Getting Started

### Installation & Setup

Storybook is already configured in this project. To start the development server:

```bash
npm run storybook
```

This will launch Storybook at `http://localhost:6006` with hot-reload enabled.

### Project Structure

```
.storybook/
├── main.ts          # Storybook configuration
└── preview.ts       # Global decorators and parameters

src/
├── components/
│   ├── ui/          # Core UI components with stories
│   ├── auth/        # Authentication components  
│   ├── booking/     # Booking flow components
│   ├── experiences/ # Experience browsing components
│   ├── navigation/  # Header and navigation
│   └── quiz/        # Company assessment quiz
└── stories/
    ├── DesignSystem.stories.tsx    # Design tokens and color system
    └── DeveloperGuide.stories.tsx  # Implementation guidelines
```

## Story Categories

### 1. UI Components (`src/components/ui/`)
Core reusable components with comprehensive variant documentation:

- **Button**: 6 semantic variants, 3 sizes, fullWidth option
- **Input**: Form inputs with Australian formatting and validation
- **Card**: Layout containers with responsive padding
- **Badge**: Status indicators with semantic color system

### 2. Business Components (`src/components/`)
Domain-specific components for the corporate booking flow:

- **CompanyQuiz**: 5-step assessment with venue matching
- **HorizontalExperiences**: Touch-optimized venue browser
- **SimpleBookingModal**: Corporate booking form with quiz integration
- **Header**: Responsive navigation for landing and authenticated states

### 3. Design System (`src/stories/`)
Complete design system documentation:

- **DesignSystem**: Color palette, typography, spacing system
- **DeveloperGuide**: Microcopy guidelines and code patterns

## Key Features

### Australian Corporate Context
All components include examples relevant to Australian corporate users:
- AUD currency formatting ($4,500/night)
- Australian phone number formats (+61 4XX XXX XXX)
- Local business context (Sydney CBD, Melbourne venues)
- Professional corporate tone and messaging

### Mobile-First Documentation
Every component story includes mobile optimization examples:
- 44px touch targets for iOS/Android compliance
- Responsive breakpoint demonstrations
- Touch interaction patterns
- Mobile form optimization

### Accessibility Standards
Built-in accessibility documentation:
- WCAG 2.1 AA color contrast ratios
- Keyboard navigation patterns
- Screen reader support
- Focus management examples

### Interactive Examples
Storybook includes interactive stories showing:
- Complete booking workflow simulation
- Quiz assessment with real venue matching
- Form validation with Australian context
- Responsive behavior across devices

## Development Workflow

### Adding New Components

1. **Create Component**: Build component in appropriate `src/components/` directory
2. **Add Story**: Create `.stories.tsx` file with comprehensive documentation
3. **Document Usage**: Include Australian corporate context and mobile examples
4. **Test Accessibility**: Verify touch targets and color contrast
5. **Update Index**: Export component from `src/components/ui/index.ts` if applicable

### Story Structure Template

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { YourComponent } from './YourComponent'

const meta: Meta<typeof YourComponent> = {
  title: 'UI Components/YourComponent', // or Business Components/
  component: YourComponent,
  parameters: {
    layout: 'centered', // or 'fullscreen', 'padded'
    docs: {
      description: {
        component: `
## Component Name

Brief description of the component's purpose in the 7DAY system.

### Key Features
- Feature 1
- Feature 2
- Australian corporate context

### Usage Guidelines
- When to use this component
- Mobile optimization notes
- Accessibility considerations
        `
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // Default props
  }
}

export const MobileOptimized: Story = {
  name: '📱 Mobile Experience',
  args: {
    // Mobile-specific props
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile'
    }
  }
}
```

## Configuration Details

### Tailwind CSS Integration
Storybook is configured to use the same Tailwind CSS configuration as the main application, ensuring visual consistency.

### Viewport Testing
Pre-configured viewports for comprehensive testing:
- Mobile: iPhone 12 Pro (390px)
- Tablet: iPad (768px)  
- Desktop: Standard desktop (1024px)

### Addons Enabled
- **@storybook/addon-essentials**: Controls, docs, actions, viewport
- **@storybook/addon-a11y**: Accessibility testing and validation
- **@storybook/addon-interactions**: Component interaction testing

## Best Practices

### Story Naming Convention
Use descriptive names with emojis for easy navigation:
- `📱 Mobile Experience` - Mobile-specific examples
- `🏢 Corporate Context` - Business use case examples
- `✅ Validation States` - Error and success state examples
- `🎯 Advanced Usage` - Complex implementation patterns

### Documentation Standards
Each story should include:
- Clear component description with business context
- Australian corporate usage examples
- Mobile optimization details
- Code implementation examples
- Accessibility considerations

### Australian Corporate Focus
All stories should demonstrate:
- Professional business tone
- Australian currency and date formatting
- Local venue and company examples
- Corporate user workflow patterns
- HR manager mobile-first design

## Maintenance

### Keeping Stories Updated
- Update stories when component APIs change
- Add new examples when implementing new features
- Review mobile examples for latest iOS/Android guidelines
- Update Australian context as business requirements evolve

### Performance Optimization
- Keep story count reasonable (5-8 per component)
- Use lazy loading for large components
- Optimize images and mock data
- Regular bundle size monitoring

## Resources

- **Storybook Documentation**: https://storybook.js.org/docs
- **Component Library**: All components available at `http://localhost:6006`
- **Design Tokens**: `src/lib/design-tokens.ts`
- **Australian Context**: `src/lib/experiences.ts` for local examples