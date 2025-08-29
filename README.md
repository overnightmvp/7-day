# 7DAY - Australian Corporate Experience Marketplace

> **Live Production System**: Curated team experiences for Australian businesses with 3-click booking and Supabase backend integration.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Supabase account (free tier)
- Vercel account for deployment

### Local Development Setup

1. **Clone and install**:
```bash
git clone https://github.com/overnightmvp/7-day.git
cd 7-day
npm install
```

2. **Configure Supabase**:
   - Create new Supabase project at https://supabase.com
   - Go to Settings → API, copy your project URL and anon key
   - Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
   - Add your Supabase credentials to `.env.local`

3. **Set up database**:
   - Go to Supabase SQL Editor
   - Run the complete `supabase-schema.sql` file
   - Verify tables created: `companies`, `users`, `bookings`, `booking_inquiries`

4. **Start development**:
```bash
npm run dev
```

## 🏗️ Production Deployment (Vercel)

### 1. Deploy to Vercel
```bash
# Connect your GitHub repository to Vercel
# Automatic deployment on every push to main
```

### 2. Configure Environment Variables
Add these to Vercel Settings → Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key

### 3. Verify Deployment
- Build should complete without TypeScript errors
- Test booking flow on live URL
- Confirm data saves to Supabase `booking_inquiries` table

## 🎯 Current Features (Live System)

### Australian Corporate Experience Marketplace
- **6 Premium Venues**: Blue Mountains, Sydney Harbour, Melbourne, Gold Coast, Adelaide, Perth
- **Interactive Quiz**: 5-question company assessment with AI venue matching
- **Real-time Booking**: Live form submission to Supabase database
- **AUD Pricing**: Transparent Australian dollar pricing with cost estimation
- **Mobile Optimized**: Touch-friendly horizontal scrolling and responsive design

### Technical Architecture
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Supabase PostgreSQL with Row Level Security
- **Components**: Custom UI library (Button, Card, Input, Badge)
- **State**: Client-side React hooks with Supabase persistence
- **Deployment**: Vercel with automatic GitHub integration

## 📊 Database Schema

### Main Tables
```sql
booking_inquiries (
  id UUID PRIMARY KEY,
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
)
```

### Admin Access
- **Supabase Dashboard**: View all booking inquiries in Table Editor
- **Real-time Updates**: New bookings appear instantly
- **Export Data**: CSV export available for analysis

## 🧪 Testing the Live System

### 1. Complete User Flow Test
1. Visit your live Vercel URL
2. Complete company quiz (5 questions)
3. Review personalized venue recommendations  
4. Click "Reserve This Experience" on any venue
5. Fill and submit booking inquiry form
6. Verify success confirmation with calendar export

### 2. Admin Verification
1. Go to Supabase dashboard → Table Editor
2. Click `booking_inquiries` table
3. Verify your test booking appears with all details
4. Check `status` is 'pending' for new inquiry follow-up

## 🔧 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Production build (tests TypeScript)
npm run start        # Start production server locally
npm run lint         # ESLint checking
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page with quiz + booking
│   ├── admin/page.tsx     # Admin portal (future)
│   ├── app/page.tsx       # Employee app (future)  
│   └── design-system/     # Component documentation
├── components/
│   ├── ui/                # Core UI components
│   ├── booking/           # Booking flow components
│   ├── quiz/              # Company assessment quiz
│   ├── experiences/       # Venue browser components
│   └── navigation/        # Header and navigation
└── lib/
    ├── supabase.ts        # Database client + TypeScript types
    ├── experiences.ts     # Australian venue data
    ├── auth.ts           # Authentication utilities
    └── utils.ts          # Helper functions
```

## 🎭 User Personas & Validation

### Primary: Sarah Chen (HR Manager)
- **Company**: 80-person tech startup, Sydney
- **Budget**: $25k annual team events
- **Pain Point**: 8-12 hours research per event
- **Solution**: 5-minute venue booking via 7DAY quiz + booking system

### Success Metrics (Live Tracking)
- **Quiz completion rate**: >60% (5 questions → venue recommendations)
- **Booking inquiry conversion**: >8% (landing page → submitted inquiry)  
- **Demo conversion**: >25% (inquiry → scheduled call)
- **Customer conversion**: >50% (demo → venue booking)

## 🇦🇺 Australian Market Context

### Competitive Advantages
- **First-mover**: Only self-service corporate experience marketplace in Australia
- **Local Focus**: Australian venues, AUD pricing, business hours support  
- **Corporate-Optimized**: Group sizes, invoice processing, business requirements
- **Time-Saving**: Eliminates 8-12 hours vendor research per event

### Target Market
- **Growth companies**: 50-200 employees with annual team event budgets
- **Geographic Focus**: Sydney and Melbourne (80% of target market)
- **Budget Range**: $5k-30k per event, quarterly frequency
- **Decision Makers**: HR managers with budget authority

## 🔮 Immediate Next Steps (Post-MVP)

### Phase 2: Enhanced Functionality
- [ ] Email automation for booking inquiry follow-up
- [ ] Payment integration (Stripe Australia)
- [ ] User authentication and company portals
- [ ] Advanced admin dashboard with booking management

### Phase 3: Scale Features  
- [ ] Team voting on venue options
- [ ] Calendar integration (Google Workspace)
- [ ] Post-event analytics and feedback collection
- [ ] Multi-city expansion (Brisbane, Perth, Adelaide)

## 🐛 Known Issues & Troubleshooting

### Common Setup Issues
1. **"supabaseUrl is required"**: Environment variables not configured in Vercel
2. **"404 on booking_inquiries"**: Need to run updated SQL schema in Supabase
3. **TypeScript build errors**: Ensure all `*Variants` exports removed from components

### Browser Extension Conflicts
- **LastPass errors**: Harmless, affects only users with password manager extensions
- **React minified errors**: Production optimization, doesn't affect functionality

### Performance Optimizations Applied
- **Image optimization**: Replaced `<img>` with CSS background-image for better Core Web Vitals
- **Component exports**: Simplified exports to reduce bundle size
- **TypeScript strict mode**: Enforced type safety throughout codebase

---

**🎉 7DAY Australian Corporate Experience Marketplace**  
**Live at**: Your Vercel URL  
**Admin Dashboard**: Your Supabase dashboard  
**Ready for**: Customer validation and growth