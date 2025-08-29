# Complete Deployment Guide - 7DAY Marketplace

## Overview
Complete step-by-step guide for deploying the 7DAY Australian corporate experience marketplace from development to live production system.

## Prerequisites
- GitHub account with repository access
- Supabase account (free tier sufficient)
- Vercel account (free tier sufficient)
- Basic familiarity with environment variables

## Phase 1: Supabase Database Setup

### 1.1 Create Supabase Project
1. **Sign up**: Go to https://supabase.com and create account
2. **New Project**: Click "New Project"
   - **Name**: `7day-corporate-experiences`
   - **Database Password**: Generate strong password (save it!)
   - **Region**: Asia Pacific (closest to Australia)
3. **Wait**: 2-3 minutes for database provisioning

### 1.2 Database Schema Setup
1. **Go to SQL Editor** (left sidebar in Supabase dashboard)
2. **Click "New Query"**
3. **Copy entire contents** of `supabase-schema.sql` from your project
4. **Paste and Run** - should see "Success. No rows returned"
5. **Verify tables created**: Go to Table Editor, confirm 4 tables exist:
   - `companies`
   - `users` 
   - `bookings`
   - `booking_inquiries`

### 1.3 Get Connection Details
1. **Settings** → **API** (left sidebar)
2. **Copy these values**:
   - **Project URL**: `https://[your-project-ref].supabase.co`
   - **anon public key**: `eyJ...` (long string)

## Phase 2: Local Environment Configuration

### 2.1 Environment Variables
1. **Copy environment template**:
```bash
cp .env.local.example .env.local
```

2. **Update `.env.local`** with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ[your-anon-key]
```

### 2.2 Test Local Connection
1. **Install dependencies**: `npm install`
2. **Start dev server**: `npm run dev`
3. **Test booking flow**:
   - Go to http://localhost:3000
   - Complete company quiz
   - Submit booking inquiry
   - Check Supabase Table Editor → `booking_inquiries` for your data

## Phase 3: Vercel Production Deployment

### 3.1 Connect GitHub to Vercel
1. **Go to Vercel**: https://vercel.com
2. **Sign in with GitHub**
3. **Import Project**: Click "Add New..." → "Project"
4. **Select repository**: `overnightmvp/7-day`
5. **Deploy**: Click "Deploy" (will fail first time - expected!)

### 3.2 Configure Production Environment Variables
1. **Go to your project** in Vercel dashboard
2. **Settings** → **Environment Variables**
3. **Add both variables** (copy from your local `.env.local`):
   
   **Variable 1:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: Your Supabase project URL
   - Environments: Production, Preview, Development
   
   **Variable 2:**
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
   - Value: Your Supabase anon key
   - Environments: Production, Preview, Development

### 3.3 Trigger Successful Deployment
1. **Redeploy**: Go to Deployments → Latest → "Redeploy"
2. **Monitor build**: Should complete successfully in 3-5 minutes
3. **Get live URL**: Copy your production URL (like `7-day-abc123.vercel.app`)

## Phase 4: Production Testing & Validation

### 4.1 End-to-End Testing
**Test on live URL**:
1. ✅ Landing page loads with company quiz
2. ✅ Quiz completion shows personalized venue recommendations
3. ✅ Booking form accepts inquiries and validates fields
4. ✅ Form submission saves to Supabase database
5. ✅ Success state shows confirmation and calendar export

### 4.2 Admin Verification
**Check Supabase dashboard**:
1. ✅ Table Editor → `booking_inquiries` shows live data
2. ✅ New bookings appear in real-time
3. ✅ All form fields captured correctly
4. ✅ Timestamps and status tracking working

## Common Issues & Solutions

### Build Failures

**Issue**: `"supabaseUrl is required"`
**Solution**: Add environment variables to Vercel (Step 3.2)

**Issue**: TypeScript errors on deployment
**Solution**: All fixed in current codebase - redeploy with latest commit

**Issue**: `404 on booking_inquiries table`  
**Solution**: Run the complete SQL schema in Supabase (Step 1.2)

### Local Development Issues

**Issue**: "Cannot connect to Supabase"
**Solution**: Verify `.env.local` has correct URL and key, restart dev server

**Issue**: Form submissions not saving
**Solution**: Check browser console for errors, verify Supabase table exists

## Performance Optimization Applied

### Image Loading
- **Replaced `<img>` tags** with CSS `background-image` for better Core Web Vitals
- **Optimized loading**: No external image dependencies blocking render

### Component Architecture  
- **Clean exports**: Removed unused `*Variants` exports causing build warnings
- **TypeScript strict mode**: All undefined/null handling properly implemented
- **Input component**: Fixed HTML attribute conflicts with custom props

### Bundle Size
- **Tree-shaking optimized**: Only necessary Supabase client code included
- **Component isolation**: Each UI component independently importable

## Monitoring & Analytics

### Supabase Dashboard Analytics
- **Real-time booking data**: Monitor inquiry volume and patterns
- **Performance metrics**: Database query performance and connection health
- **User behavior**: Track quiz completion vs booking conversion rates

### Vercel Deployment Monitoring  
- **Build status**: Automatic deployment health checks
- **Performance**: Core Web Vitals and loading metrics
- **Error tracking**: Runtime error monitoring and alerts

## Next Development Phase

### Immediate Opportunities (Week 1)
1. **Email automation**: Supabase webhook → email notifications for new bookings
2. **Admin dashboard**: Custom admin interface vs Supabase Table Editor
3. **Analytics integration**: Google Analytics 4 for user behavior tracking

### Growth Features (Month 1)
1. **Payment integration**: Stripe Australia for venue booking deposits
2. **User authentication**: Company portals with team member management
3. **Calendar integration**: Google Workspace calendar sync for approved bookings
4. **Venue expansion**: Add 20+ Australian venues with automated onboarding

### Scale Preparation (Month 3)
1. **Database optimization**: Indexes, caching, query performance
2. **Email templates**: Branded confirmation and reminder system
3. **Multi-tenant architecture**: Enterprise accounts with white-label options
4. **Advanced analytics**: Custom dashboards for venue ROI and booking patterns

---

**🎯 Current Status**: Production-ready Australian corporate experience marketplace  
**🚀 Live URL**: [Your Vercel deployment URL]  
**💾 Database**: Live Supabase integration with booking persistence  
**📈 Ready for**: Customer acquisition and revenue validation