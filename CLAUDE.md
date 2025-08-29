# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚨 CRITICAL: CONCURRENT EXECUTION & FILE MANAGEMENT

**ABSOLUTE RULES**:
1. ALL operations MUST be concurrent/parallel in a single message
2. **NEVER save working files, text/mds and tests to the root folder**
3. ALWAYS organize files in appropriate subdirectories

### ⚡ GOLDEN RULE: "1 MESSAGE = ALL RELATED OPERATIONS"

**MANDATORY PATTERNS:**
- **TodoWrite**: ALWAYS batch ALL todos in ONE call (5-10+ todos minimum)
- **Task tool**: ALWAYS spawn ALL agents in ONE message with full instructions
- **File operations**: ALWAYS batch ALL reads/writes/edits in ONE message
- **Bash commands**: ALWAYS batch ALL terminal operations in ONE message

### 📁 File Organization Rules

**NEVER save to root folder. Use these directories:**
- `/src` - Source code files
- `/tests` - Test files
- `/docs` - Documentation and markdown files
- `/config` - Configuration files
- `/scripts` - Utility scripts
- `/examples` - Example code

## Project Overview

Corporate experience marketplace MVP built with Next.js, TypeScript, and Supabase. Australian-focused team event booking platform with admin portal and employee app.

## Build Commands

**Development:**
```bash
npm run dev          # Start development server with turbo
npm run build        # Build production bundle
npm run start        # Start production server
npm run lint         # Run ESLint checks
```

**Setup:**
```bash
npm install          # Install dependencies
cp .env.local.example .env.local  # Setup environment
# Configure Supabase URL and anon key in .env.local
# Run supabase-schema.sql in Supabase SQL editor
```

## Architecture Overview

### Core Stack
- **Next.js 14** with App Router (`src/app/`)
- **TypeScript** with strict configuration
- **Tailwind CSS** with custom design system
- **Supabase** for authentication and database
- **Component-based** architecture with reusable UI library

### Application Structure

**Main Applications:**
- Landing page (`src/app/page.tsx`) - Demo form and marketing
- Admin portal (`src/app/admin/`) - Company management, user approvals, booking oversight
- Employee app (`src/app/app/`) - Experience browsing and booking
- Design system (`src/app/design-system/`) - Component documentation

**Core Libraries:**
- `src/lib/auth.ts` - Smart authentication with role-based routing and email domain detection
- `src/lib/supabase.ts` - Database client with TypeScript types for Company, User, Booking, Experience
- `src/lib/experiences.ts` - Hardcoded Australian experiences (6 total) with formatAUD helper
- `src/lib/utils.ts` - Common utilities (cn, formatCurrency, formatDate, email validation, domain extraction)
- `src/lib/design-tokens.ts` - Complete design system tokens (colors, typography, spacing, shadows)

**Component Organization:**
- `src/components/ui/` - Base UI components (Button, Card, Input, Badge) with variants
- `src/components/auth/` - Authentication modals and flows
- `src/components/booking/` - Booking steps, success states, modals
- `src/components/experiences/` - Experience previews and listings
- `src/components/navigation/` - Header and navigation
- `src/components/ai/` - AI chat widget

### Authentication Flow
- **Email domain detection**: Personal emails (gmail.com, etc.) → employee, corporate emails → admin
- **Smart routing**: Admins → `/admin`, employees → `/app`
- **Mock sessions**: Uses localStorage for MVP (replace with proper auth later)
- **Role-based access**: Route protection via `canAccessRoute()` function

### Database Schema
PostgreSQL with Supabase:
- **companies**: Company registration with admin_email
- **users**: Role-based users linked to companies 
- **bookings**: Experience bookings with approval workflow
- **RLS policies**: Row-level security for data isolation

### Design System
- **8-color palette** with primary blue (#3b82f6)
- **Australian formatting**: Currency (AUD), dates (en-AU)
- **Component variants**: Consistent styling patterns via design tokens
- **8px grid system** for spacing consistency

## Development Patterns

### Component Development
- Use `src/components/ui/index.ts` for component exports
- Follow variant pattern with `buttonVariants`, `cardVariants`, etc.
- Import design tokens from `src/lib/design-tokens.ts`
- Use `cn()` utility for conditional class merging

### Data Handling
- Import types from `src/lib/supabase.ts`
- Use hardcoded experiences from `src/lib/experiences.ts`
- Format currency with `formatAUD()` or `formatCurrency()`
- Validate emails with `isValidEmail()` and detect domains with `getCompanyDomain()`

### Path Configuration
- Use `@/*` imports for `src/` directory (configured in tsconfig.json)
- Tailwind scans all files in `src/` directory
- Next.js App Router structure in `src/app/`

## Important Notes
- MVP uses hardcoded experiences (no search functionality)
- Authentication is mock implementation for rapid prototyping
- Australian market focus (currency, locations, formatting)
- No custom backend required - Supabase handles all data operations