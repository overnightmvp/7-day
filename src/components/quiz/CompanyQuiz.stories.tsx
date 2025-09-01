import type { Meta, StoryObj } from '@storybook/nextjs'
import { CompanyQuiz } from './CompanyQuiz'
import { Badge } from '@/components/ui'

const meta: Meta<typeof CompanyQuiz> = {
  title: 'Business Components/CompanyQuiz',
  component: CompanyQuiz,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Company Assessment Quiz

Interactive multi-step form that captures company requirements and matches them with appropriate Australian corporate experiences.

### Business Logic
- **5-Question Assessment**: Team size, event type, budget, location, vibe
- **Smart Matching Algorithm**: Scores venues based on company preferences
- **Australian Context**: Sydney/Melbourne focus with local venue knowledge
- **Corporate Optimization**: Business-appropriate language and flow

### UX Principles
1. **Progressive Disclosure**: One question at a time to reduce cognitive load
2. **Progress Indication**: Clear progress bar and step counting
3. **Smart Defaults**: Pre-select common options for faster completion
4. **Mobile-First**: Touch-optimized for HR managers on mobile devices
5. **Instant Results**: Immediate venue matching after completion

### Technical Features
- **State Management**: Comprehensive quiz data tracking
- **Validation**: Required field validation with helpful messaging
- **Animation**: Smooth transitions between steps
- **Responsive Design**: Adapts to all screen sizes
- **Accessibility**: Keyboard navigation and screen reader support

### Integration Points
- Connects to experience database for venue matching
- Pre-fills booking form with assessment data
- Tracks conversion metrics for optimization
        `
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl mx-auto">
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

export const InteractiveQuiz: Story = {
  name: '📝 Complete Quiz Experience',
  args: undefined,
  parameters: {
    docs: {
      description: {
        story: `
Complete interactive quiz experience showing the full 5-step assessment flow:

**Step 1**: Team size selection (5-10, 11-20, 21-50, 50+ people)
**Step 2**: Event type (Team building, Celebration, Strategic retreat, Client entertainment) 
**Step 3**: Budget range (AUD $100-200, $200-400, $400-600, $600+)
**Step 4**: Location preference (Sydney, Melbourne, Anywhere, Remote-accessible)
**Step 5**: Event vibe (Relaxed, Adventurous, Luxurious, Productive)

**Results**: Shows 3 matched experiences with "Reserve" functionality.
        `
      }
    }
  }
}

export const MobileQuizFlow: Story = {
  name: '📱 Mobile Quiz Experience',
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile'
    },
    docs: {
      description: {
        story: 'Mobile-optimized quiz experience with touch-friendly interactions and responsive card layouts. Progress bar and navigation optimized for thumb navigation.'
      }
    }
  }
}

export const QuizResultsDemo: Story = {
  name: '🎯 Venue Matching Results',
  args: {},
  render: () => {
    // Create a mock component showing results state
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Perfect! Here are your matched experiences
          </h2>
          <p className="text-neutral-600">
            Based on your preferences, these venues are ideal for your team
          </p>
        </div>
        
        <div className="bg-neutral-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="success" className="bg-green-500 text-white text-xs font-bold">
              ✨ BEST MATCH
            </Badge>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-24 h-32 sm:h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-neutral-900">Blue Mountains Corporate Retreat</h3>
                <Badge variant="default">Top Pick</Badge>
              </div>
              <p className="text-sm text-neutral-600 mb-2">Leura, NSW</p>
              <p className="text-sm text-neutral-700 mb-3">Exclusive mountain sanctuary perfect for strategic planning</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="font-semibold text-blue-600">AUD $4,500/night</span>
                <div className="text-right">
                  <div className="text-sm text-neutral-500">Up to 24 guests</div>
                  <div className="text-xs text-green-600">15 teams booked this</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Quiz results showing matched experiences with Australian venue context. Demonstrates the outcome of the assessment algorithm.'
      }
    }
  }
}