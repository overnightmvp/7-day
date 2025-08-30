# PRD-002: Technical Architecture & Implementation

*Technical foundation and implementation roadmap for 7DAY marketplace*

## Current System Architecture

### Technology Stack (Live Production)
- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: Supabase PostgreSQL with Row Level Security
- **Authentication**: Mock localStorage system (MVP)
- **Deployment**: Vercel with automatic GitHub integration
- **CDN**: Vercel Edge Network with global distribution

### Database Schema (Current Implementation)

```sql
-- Core Tables (Live)
CREATE TABLE booking_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_email TEXT NOT NULL,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  phone TEXT,
  team_size INTEGER NOT NULL,
  preferred_date DATE NOT NULL,
  alternate_date DATE,
  experience_id TEXT NOT NULL,
  estimated_cost DECIMAL(10,2),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Foundation Tables (Ready for Phase 2)
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  admin_email TEXT NOT NULL,
  domain TEXT,
  subscription_tier TEXT DEFAULT 'trial',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id),
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'employee')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id),
  user_id UUID REFERENCES users(id),
  experience_id TEXT NOT NULL,
  booking_date DATE NOT NULL,
  team_size INTEGER NOT NULL,
  total_cost DECIMAL(10,2),
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Component Architecture (Current)

#### UI Component Library
```typescript
// Core Components (src/components/ui/)
export { Button } from './Button'     // 6 variants, 5 sizes, loading states
export { Input } from './Input'       // Labels, validation, error states
export { Card } from './Card'         // Header, content, footer variants
export { Badge } from './Badge'       // 7 variants, 4 sizes

// Business Components
export { CompanyQuiz } from './quiz/CompanyQuiz'
export { ExperiencePreview } from './experiences/ExperiencePreview'
export { SimpleBookingModal } from './booking/SimpleBookingModal'
export { HorizontalExperiences } from './experiences/HorizontalExperiences'
```

#### Data Layer
```typescript
// Authentication (src/lib/auth.ts)
interface User {
  id: string
  email: string
  role: 'admin' | 'employee'
  company_id: string
  company?: Company
}

// Experience Data (src/lib/experiences.ts)
interface Experience {
  id: string
  title: string
  location: string
  price_per_person: number
  capacity: { min: number; max: number }
  duration: string
  image: string
  description: string
  highlights: string[]
  included: string[]
}

// Supabase Integration (src/lib/supabase.ts)
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

## Target Architecture (Full Marketplace)

### Phase 2: Two-Sided Platform Requirements

#### Enhanced Authentication System
```typescript
// Replace mock localStorage with proper authentication
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

// Server-side session management
interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
}

// Email domain detection for role assignment
function detectUserType(email: string): 'admin' | 'employee' {
  const domain = email.split('@')[1]
  const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com']
  return personalDomains.includes(domain) ? 'employee' : 'admin'
}
```

#### Real-Time Booking System
```typescript
// Replace inquiry system with instant booking
interface BookingFlow {
  availability: AvailabilityCheck
  pricing: DynamicPricing
  confirmation: InstantConfirmation
  payment: StripeIntegration
}

// Venue partner integration
interface VenueAPI {
  checkAvailability(date: Date, size: number): Promise<boolean>
  createBooking(details: BookingDetails): Promise<Booking>
  cancelBooking(bookingId: string): Promise<void>
}
```

#### Subscription Management
```typescript
// SaaS billing integration
interface SubscriptionTier {
  name: 'starter' | 'professional' | 'enterprise'
  monthly_price: number
  booking_limit: number
  features: string[]
}

// Stripe subscription webhook handling
const handleSubscriptionChange = async (event: Stripe.Event) => {
  // Update company subscription status
  // Grant/revoke feature access
  // Send billing notifications
}
```

### Database Evolution (Phase 2)

#### Enhanced Schema
```sql
-- Venue Partner Management
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  location_city TEXT NOT NULL,
  capacity_min INTEGER NOT NULL,
  capacity_max INTEGER NOT NULL,
  base_price_per_person DECIMAL(8,2),
  commission_rate DECIMAL(4,2) DEFAULT 0.15,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Dynamic Experience Management
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id UUID REFERENCES venues(id),
  title TEXT NOT NULL,
  description TEXT,
  duration_hours INTEGER,
  price_per_person DECIMAL(8,2),
  max_capacity INTEGER,
  category TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Availability Management
CREATE TABLE availability_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id UUID REFERENCES experiences(id),
  date DATE NOT NULL,
  time_slot TIME,
  available_capacity INTEGER,
  base_price DECIMAL(8,2),
  surge_multiplier DECIMAL(3,2) DEFAULT 1.0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscription & Billing
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id),
  stripe_subscription_id TEXT UNIQUE,
  tier TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Performance Optimizations
```sql
-- Indexes for common queries
CREATE INDEX idx_bookings_company_date ON bookings(company_id, booking_date);
CREATE INDEX idx_availability_experience_date ON availability_slots(experience_id, date);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_companies_domain ON companies(domain);

-- Row Level Security policies
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Companies can view their own bookings" ON bookings
  FOR SELECT USING (company_id = auth.jwt() ->> 'company_id');
```

### API Architecture (Phase 2)

#### RESTful Endpoints
```typescript
// Next.js API Routes (app/api/)
POST /api/bookings/create
GET  /api/bookings/[companyId]
PUT  /api/bookings/[id]/cancel

GET  /api/experiences/search
POST /api/experiences/availability

POST /api/auth/signup
POST /api/auth/signin
POST /api/auth/signout

POST /api/stripe/webhook
POST /api/subscription/create
PUT  /api/subscription/update
```

#### Real-Time Features
```typescript
// Supabase real-time subscriptions
const subscribeToBookings = (companyId: string) => {
  return supabase
    .channel('bookings')
    .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'bookings' },
        (payload) => {
          // Real-time booking notifications
          notifyAdmins(payload.new)
        }
    )
    .subscribe()
}
```

## Mobile-First Implementation

### Progressive Web App Features
```typescript
// Service Worker (public/sw.js)
const CACHE_NAME = '7day-v1'
const urlsToCache = [
  '/',
  '/app',
  '/static/js/bundle.js',
  '/static/css/main.css'
]

// Offline booking drafts
interface OfflineBooking {
  id: string
  experience: Experience
  details: BookingDetails
  created_at: Date
  sync_status: 'pending' | 'synced' | 'error'
}
```

### Touch-Optimized Components
```typescript
// Swipeable experience browser
interface TouchGesture {
  startX: number
  endX: number
  threshold: 50
}

const SwipeableExperiences = () => {
  const handleSwipe = (direction: 'left' | 'right') => {
    // Navigate between experiences
    // Smooth touch animations
  }
}
```

## Integration Requirements

### Payment Processing (Stripe Australia)
```typescript
// Stripe integration with Australian requirements
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

// GST-compliant pricing
interface AustralianPricing {
  subtotal: number
  gst: number        // 10% GST
  total: number
  currency: 'AUD'
}

// Corporate invoicing
const createCorporateInvoice = async (booking: Booking) => {
  return stripe.invoices.create({
    customer: booking.company.stripe_customer_id,
    collection_method: 'send_invoice',
    days_until_due: 30,
    currency: 'aud',
    tax_percent: 10
  })
}
```

### Email Automation
```typescript
// Supabase Edge Functions for email triggers
const sendBookingConfirmation = async (booking: Booking) => {
  // Welcome email to booking contact
  // Calendar invite (.ics file)
  // Team notification emails
  // Venue partner notification
}

// Subscription lifecycle emails
const subscriptionEmailTriggers = {
  trial_started: sendWelcomeSequence,
  trial_ending: sendUpgradeReminder,
  payment_failed: sendPaymentRetry,
  subscription_canceled: sendWinbackCampaign
}
```

### Calendar Integration
```typescript
// Google Workspace integration
const createCalendarEvent = async (booking: Booking) => {
  const event = {
    summary: `Team Event: ${booking.experience.title}`,
    location: booking.experience.location,
    start: { dateTime: booking.booking_date },
    attendees: booking.team_members.map(email => ({ email })),
    conferenceData: { /* Meet link for remote coordination */ }
  }
  
  return await calendar.events.insert({
    calendarId: 'primary',
    resource: event
  })
}
```

## Performance & Scalability

### Caching Strategy
```typescript
// Redis for session and experience data
const redis = new Redis(process.env.REDIS_URL)

// Cache frequently accessed data
const getCachedExperiences = async (filters: ExperienceFilters) => {
  const cacheKey = `experiences:${JSON.stringify(filters)}`
  const cached = await redis.get(cacheKey)
  
  if (cached) return JSON.parse(cached)
  
  const experiences = await fetchExperiences(filters)
  await redis.setex(cacheKey, 3600, JSON.stringify(experiences))
  return experiences
}
```

### CDN & Asset Optimization
```typescript
// Next.js Image optimization
import Image from 'next/image'

const ExperienceImage = ({ src, alt }: ImageProps) => (
  <Image
    src={src}
    alt={alt}
    width={400}
    height={300}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    priority={false}
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABA..."
  />
)
```

### Error Handling & Monitoring
```typescript
// Global error boundary
const GlobalErrorBoundary = ({ children }: { children: ReactNode }) => {
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    // Log to monitoring service
    console.error('Application Error:', error, errorInfo)
    
    // Send to error tracking
    // Sentry, LogRocket, or similar
  }
  
  return (
    <ErrorBoundary onError={handleError}>
      {children}
    </ErrorBoundary>
  )
}
```

## Security Implementation

### Row Level Security (RLS)
```sql
-- Ensure companies can only access their own data
CREATE POLICY "Company data isolation" ON bookings
  FOR ALL USING (company_id = auth.jwt() ->> 'company_id');

CREATE POLICY "User company access" ON users
  FOR ALL USING (company_id = auth.jwt() ->> 'company_id');
```

### Input Validation & Sanitization
```typescript
// Zod schema validation
import { z } from 'zod'

const BookingSchema = z.object({
  workEmail: z.string().email(),
  companyName: z.string().min(2).max(100),
  teamSize: z.number().min(5).max(500),
  preferredDate: z.date().min(new Date()),
  experienceId: z.string().uuid()
})

// Rate limiting
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
})
```

## Deployment & DevOps

### Production Environment
```yaml
# Vercel deployment configuration
name: 7day-production
builds:
  - src: next.config.js
    use: '@vercel/next'
env:
  NEXT_PUBLIC_SUPABASE_URL: production-url
  NEXT_PUBLIC_SUPABASE_ANON_KEY: production-key
  STRIPE_SECRET_KEY: live-key
  REDIS_URL: production-redis
```

### Monitoring & Alerting
```typescript
// Health check endpoints
export async function GET() {
  try {
    // Check database connection
    await supabase.from('companies').select('count').single()
    
    // Check external services
    await fetch('https://api.stripe.com/v1/account', {
      headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` }
    })
    
    return Response.json({ status: 'healthy', timestamp: new Date() })
  } catch (error) {
    return Response.json({ status: 'unhealthy', error }, { status: 500 })
  }
}
```

## Migration Path: Current → Target

### Phase 1 → Phase 2 Migration Steps

1. **Authentication Upgrade**
   - Replace localStorage with Supabase Auth
   - Implement proper session management
   - Add role-based route protection

2. **Database Evolution**
   - Add venue and experience tables
   - Migrate hardcoded experiences to database
   - Implement availability system

3. **Payment Integration**
   - Stripe Australia account setup
   - Subscription billing implementation
   - Corporate invoicing features

4. **Real-Time Features**
   - Replace inquiry system with instant booking
   - Add real-time notifications
   - Implement booking confirmations

### Estimated Timeline
- **Weeks 1-2**: Authentication and user management
- **Weeks 3-4**: Payment processing and subscriptions
- **Weeks 5-6**: Real-time booking system
- **Weeks 7-8**: Venue partner portal
- **Weeks 9-10**: Mobile app and PWA features
- **Weeks 11-12**: Performance optimization and monitoring

### Success Metrics
- **System Reliability**: 99.9% uptime
- **Performance**: <2s page load times
- **Conversion**: 35% trial to paid subscription
- **User Satisfaction**: >4.5/5 NPS score

---

**Current Status**: Phase 1 complete (inquiry-based MVP)  
**Next Milestone**: Phase 2 authentication and payment integration  
**Architecture Decision**: Maintain Supabase + Next.js foundation, add real-time and payment layers

*This document outlines the technical evolution from current inquiry system to full two-sided marketplace platform.*