# Admin Panel Documentation

## Overview

Simple lead management dashboard for visualizing and managing booking inquiries from the 7DAY corporate experience platform.

## Features

### Lead Management
- **Lead Table**: View all booking inquiries with key details
- **Status Tracking**: Update lead status (pending → contacted → converted/lost)
- **Lead Details**: Click "View" to see full inquiry information
- **Basic Metrics**: Count of total, pending, contacted, and converted leads

### Lead Information Captured
- **Contact**: Work email, company name, contact name, phone
- **Event**: Experience title, team size, preferred/alternate dates
- **Business**: Estimated cost, special requests, submission timestamp

## Security Setup

### Current Issue: RLS Blocking Admin Access

The admin panel can't read leads because Row Level Security (RLS) policies require authenticated users, but the MVP uses mock authentication.

### Quick Fix for MVP:
```sql
-- Run in Supabase SQL Editor
ALTER TABLE booking_inquiries DISABLE ROW LEVEL SECURITY;
```

### Production Fix (Later):
```sql
-- Re-enable RLS when implementing real auth
ALTER TABLE booking_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin_access" ON booking_inquiries 
    FOR ALL USING (auth.email() = 'overnightmvp@gmail.com');
```

## Usage Workflow

1. **Access Admin**: Go to `/admin` → "Lead Management" tab
2. **View Leads**: See all booking inquiries in table format
3. **Check Details**: Click "View" for full lead information
4. **Update Status**: Mark leads as contacted/converted/lost
5. **Track Metrics**: Monitor lead counts and conversion

## Technical Implementation

- **Database**: `booking_inquiries` table in Supabase
- **Authentication**: Mock system (localStorage) - needs real auth for production
- **Security**: RLS disabled for MVP, re-enable with proper auth later
- **Frontend**: React with TypeScript, Tailwind CSS styling

## Files Modified
- `src/app/admin/page.tsx` - Main admin dashboard component
- `supabase-schema.sql` - Database security policies
- `src/components/booking/SimpleBookingModal.tsx` - Fixed RLS insert issue