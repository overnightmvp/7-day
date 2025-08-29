# 7DAY MVP

Corporate experience booking platform MVP built with Next.js and Supabase.

## Quick Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup Supabase:**
   - Create account at [supabase.com](https://supabase.com)
   - Create new project
   - Copy `.env.local.example` to `.env.local`
   - Add your Supabase URL and anon key

3. **Setup database:**
   - Run the SQL in `supabase-schema.sql` in Supabase SQL editor
   
4. **Start development:**
   ```bash
   npm run dev
   ```

## Project Structure

- `src/app/` - Next.js app router pages
- `src/components/` - Reusable components  
- `src/lib/` - Utilities and database client
- `docs/` - Documentation and specs

## MVP Features

- Landing page with demo form
- Admin portal (company registration, user management, booking approvals)
- Employee app (browse experiences, book, view bookings)
- 5 hardcoded experiences (no search needed)

## Tech Stack

- Next.js 15 with TypeScript
- Tailwind CSS
- Supabase (auth + database)
- No custom backend required