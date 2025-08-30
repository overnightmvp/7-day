# PRD-001: Product Assessment Interview

*Original prompt and vision that guided 7DAY development*

## Executive Summary

7DAY is envisioned as Australia's first self-service corporate experience marketplace - a two-sided platform connecting companies seeking premium team experiences with curated venue partners. This document captures the foundational product requirements that shaped the current system.

## Business Model & Value Proposition

### Core Value Proposition
**For Companies**: Transform 8-12 hours of venue research into a 5-minute self-service booking experience with transparent AUD pricing and instant confirmation.

**For Venues**: Access to premium corporate clients with streamlined booking processes and guaranteed payment terms.

### Revenue Model
- **Primary**: SaaS subscriptions ($50-200/month per company)
- **Secondary**: Transaction fees (8-15% of booking value)
- **Tertiary**: Premium venue placement and promotional features

### Target Market Analysis

#### Primary Segment: Australian SMBs (50-500 employees)
- **Geographic Focus**: Sydney and Melbourne (80% of market)
- **Budget Range**: $5k-30k per team event, quarterly frequency
- **Decision Makers**: HR managers with budget authority
- **Pain Point**: Manual vendor research consuming 8-12 hours per event

#### Market Size (Australian Corporate Events)
- **TAM**: $2.1B annual corporate event spending
- **SAM**: $420M (premium experiences segment)
- **SOM**: $21M (achievable market share within 3 years)

## Product Architecture Overview

### Two-Sided Platform Requirements

#### Company Side (Demand)
1. **Smart Onboarding**
   - Email domain detection (corporate vs personal)
   - Company profile creation with team size, budget, preferences
   - Admin portal for team member management

2. **Experience Discovery**
   - AI-powered venue matching based on company assessment
   - Filter by location, capacity, budget, activity type
   - Real-time availability and transparent pricing

3. **Self-Service Booking**
   - Instant booking confirmation (no manual follow-up)
   - Calendar integration (Google Workspace, Outlook)
   - Automated invoice generation and payment processing

#### Venue Side (Supply)
1. **Partner Onboarding**
   - Application process with quality curation
   - Experience listing creation with multimedia content
   - Pricing and availability management tools

2. **Booking Management**
   - Real-time booking notifications
   - Customer communication tools
   - Payment reconciliation and reporting

### Technical Foundation Requirements

#### Authentication & User Management
- **Single Sign-On**: Support for both company admins and employees
- **Role-Based Access**: Admin permissions vs employee booking rights
- **Email Domain Routing**: Automatic user type detection

#### Payment & Subscription System
- **Stripe Australia Integration**: Corporate invoicing and payment terms
- **Subscription Management**: Monthly/annual billing with usage tracking
- **Escrow System**: Hold payments until event completion

#### Mobile-First Architecture
- **Progressive Web App**: Native app experience via browser
- **Touch Optimization**: Swipe-friendly experience browsing
- **Offline Support**: Booking drafts and cached venue data

## Competitive Landscape Analysis

### Current Market Gap
- **Generic Platforms**: Eventbrite focuses on public events, not corporate
- **Manual Services**: Event planners charge 15-20% with 2-week lead times
- **Venue Direct**: Requires individual venue research and negotiation

### Competitive Advantages
1. **First-Mover**: Only self-service corporate marketplace in Australia
2. **Curation Quality**: Premium venues vs generic conference rooms
3. **Time Efficiency**: 5-minute booking vs 8-12 hour research process
4. **Transparent Pricing**: All-inclusive AUD pricing with no hidden fees
5. **Corporate Optimization**: Group booking tools, invoice processing, team management

## Success Metrics & KPIs

### User Acquisition
- **Monthly Active Companies**: Target 200 by month 12
- **Venue Partner Network**: 50+ premium Australian venues
- **User Retention**: 70% monthly retention for paying subscribers

### Conversion Funnel
- **Landing → Quiz Completion**: >60%
- **Quiz → Venue Click**: >40%
- **Venue Click → Booking Intent**: >25%
- **Booking Intent → Completed Booking**: >80%
- **Trial → Paid Subscription**: >35%

### Financial Targets
- **ARR**: $500k by month 18
- **Customer LTV**: $2,400 (2-year average retention)
- **CAC**: $180 (payback period: 4 months)
- **Gross Margin**: 85% (SaaS model)

## User Experience Principles

### Design Philosophy
1. **Simplicity Over Features**: One-click booking vs complex customization
2. **Transparency**: Upfront pricing with no surprise fees
3. **Mobile-First**: Touch-optimized for on-the-go decision making
4. **Australian Context**: Local venues, AUD pricing, business hour support

### Core User Journeys

#### Primary: HR Manager Booking Team Event
1. **Discovery**: Google search → 7DAY landing page
2. **Assessment**: 5-question company quiz (2 minutes)
3. **Matching**: AI-powered venue recommendations
4. **Selection**: Review 3-5 personalized options
5. **Booking**: Single-click booking with instant confirmation
6. **Management**: Calendar sync + team notification automation

#### Secondary: Employee Team Event Voting
1. **Invitation**: HR manager shares venue options with team
2. **Voting**: Team members vote on preferred experiences
3. **Selection**: Highest-voted option auto-selected
4. **Confirmation**: Automated booking completion

## Implementation Constraints & Considerations

### Technical Constraints
- **MVP Timeline**: 7-day development cycle (current achievement)
- **Budget Limitations**: Bootstrap development with minimal external dependencies
- **Scalability**: Architecture must support 10x growth without major rewrites

### Regulatory Considerations
- **Australian Consumer Law**: Transparent pricing and cancellation policies
- **GST Compliance**: Proper tax handling for business-to-business transactions
- **Privacy Act**: GDPR-equivalent data protection for company information

### Market Validation Requirements
- **Customer Interviews**: 25 pre-launch interviews with target personas
- **Venue Partner Validation**: 10 committed venue partners before launch
- **Pricing Testing**: A/B test subscription tiers and transaction fees

## Risk Assessment

### High-Risk Factors
1. **Chicken-and-Egg**: Need venues to attract companies, need companies to attract venues
2. **Seasonality**: Corporate events concentrated in Q1 and Q4
3. **Economic Sensitivity**: Discretionary spending vulnerable to economic downturns
4. **Competition**: Large players (Eventbrite, local event planners) may enter market

### Mitigation Strategies
1. **Supply-Side Focus**: Secure 20+ venues before major marketing launch
2. **Diversification**: Mix of indoor/outdoor, seasonal/year-round experiences
3. **Value Demonstration**: ROI calculator showing cost savings vs traditional planning
4. **Niche Protection**: Focus on premium corporate segment vs mass market

## Next Phase Requirements

### Phase 2: Full Marketplace (Month 2-3)
- [ ] Venue partner onboarding system
- [ ] Real-time availability and pricing
- [ ] Payment processing and subscription billing
- [ ] Advanced admin dashboard and analytics

### Phase 3: Scale Features (Month 4-6)
- [ ] Team voting and approval workflows
- [ ] Calendar integration (Google Workspace, Outlook)
- [ ] Mobile app development (iOS/Android)
- [ ] Multi-city expansion (Brisbane, Perth, Adelaide)

### Phase 4: Enterprise Features (Month 7-12)
- [ ] White-label corporate portals
- [ ] Advanced analytics and ROI reporting
- [ ] API for enterprise integrations
- [ ] Custom venue sourcing for large accounts

---

**Document Status**: Foundation requirements that guided initial 7DAY development  
**Current Implementation**: Booking inquiry system (Phase 1 of full vision)  
**Gap Analysis**: See PRD-002 for technical architecture requirements to achieve full marketplace

*This document represents the original product vision that shaped 7DAY's development. The current system delivers core user value while serving as foundation for the complete two-sided marketplace described above.*