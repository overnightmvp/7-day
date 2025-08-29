# 7DAY User Flow Documentation

## Primary User Journey: Quiz → Matching → Booking Inquiry

### Flow Overview
**Goal**: Convert landing page visitors to qualified booking inquiries through personalized venue matching
**Target Time**: <5 minutes from landing to inquiry submission
**Conversion Funnel**: Landing → Quiz → Recommendations → Booking → Confirmation

## Detailed User Flow

### 1. Landing Page Entry
**Entry Points**:
- Direct URL: `7day.com.au`
- Google Ads: Corporate team events Australia
- LinkedIn: HR manager targeting
- Referral: Existing customer recommendations

**Key Elements**:
- Hero: "Why Smart Companies Are Ditching Generic Team Events"
- Social proof banner: "247 team events booked this month"
- Two-column layout: Company quiz (left) + Value propositions (right)

**User Actions**:
- Read value proposition
- Start company assessment quiz
- Alternative: Scroll to browse experiences directly

### 2. Company Assessment Quiz
**Component**: `CompanyQuiz.tsx`
**Duration**: 2-3 minutes
**Questions** (5 steps):

1. **Company Size**: 5-15, 15-30, 30-50, 50+ people
2. **Budget Range**: $2k-5k, $5k-10k, $10k-20k, $20k+ per event
3. **Event Type**: Team building, celebration, planning retreat, client entertainment
4. **Location Preference**: Sydney, Melbourne, Brisbane, Gold Coast, Other
5. **Team Dynamics**: Creative/collaborative, competitive/achievement, relaxed/social, mixed

**Scoring Algorithm**:
```typescript
const calculateScore = (venue: Experience, answers: QuizAnswers): number => {
  let score = 0
  
  // Budget compatibility (40% weight)
  if (venue.price_per_night * Math.ceil(answers.teamSize / venue.max_guests) <= answers.budget) {
    score += 40
  }
  
  // Location preference (30% weight)
  if (venue.location.includes(answers.location)) {
    score += 30
  }
  
  // Team dynamics fit (30% weight)
  const venueType = venue.amenities.includes('team-building') ? 'collaborative' : 
                   venue.amenities.includes('competitive') ? 'achievement' : 'social'
  if (venueType === answers.teamDynamics) {
    score += 30
  }
  
  return score
}
```

**Output**: Ranked list of 3 recommended venues with match scores

### 3. Venue Recommendations Display
**Component**: Quiz results + `HorizontalExperiences.tsx`
**Features**:
- Personalized recommendations with match percentages
- "Why this matches your company" explanations
- Prominent "Reserve This Experience" CTAs

**User Actions**:
- Review top 3 recommended venues
- Click to view detailed venue information
- Compare alternative venues in horizontal browser
- Select preferred venue for booking inquiry

### 4. Experience Detail Modal
**Component**: Experience modal within `HorizontalExperiences.tsx`
**Information Displayed**:
- High-quality venue images with Australian context
- Detailed amenities and group size capabilities
- Transparent AUD pricing with group size estimation
- Customer reviews from similar Australian companies
- Availability calendar (next 6 months)

**User Actions**:
- Review venue details and pricing
- Check preferred dates
- Click "Reserve This Experience" CTA

### 5. Booking Inquiry Form
**Component**: `SimpleBookingModal.tsx`
**Form Fields** (3 sections):

**Contact Information**:
- Work email (required, validated)
- Company name (required)
- Contact name (required)
- Phone number (optional, Australian format)

**Event Details**:
- Team size (dropdown: 5-50 people)
- Preferred date (date picker, minimum 2 weeks ahead)
- Alternate date (optional, increases success rate by 40%)
- Real-time cost estimation based on team size

**Special Requests**:
- Dietary requirements
- Accessibility needs
- Activity preferences
- Catering requirements

**Trust Elements**:
- "Free to inquire" + "2 hour response" + "Cancel anytime"
- Real-time pricing with "Final price confirmed by venue" disclaimer

### 6. Form Validation & Submission
**Validation Rules**:
- Work email domain validation (no gmail/yahoo/hotmail)
- Date must be minimum 2 weeks in future
- Team size must be within venue capacity
- Required field validation with helpful error messages

**Submission Process**:
- Loading state: "Submitting Inquiry..." with spinner
- Simulated API delay: 1.5 seconds
- Success transition to confirmation state

### 7. Booking Confirmation
**Component**: `BookingSuccessState.tsx`
**Success Elements**:
- Green checkmark icon with "Booking Inquiry Confirmed!" headline
- Clear next steps timeline with bullet points
- Estimated total cost display

**Next Steps Communication**:
- Email confirmation sent to work email
- 7DAY team will call within 2 hours
- Venue availability confirmed for preferred date
- Final details and pricing within 4 hours

**Action Options**:
- 📅 Add to Calendar (generates .ics file)
- 📧 Email Details (opens pre-filled email template)
- Reserve Another Experience (returns to venue browser)
- Perfect! Close This (closes modal)

**Support Information**:
- Phone: +61 2 8000 7329
- Email: bookings@7day.com.au
- Live chat: 9am-6pm AEST

## Alternative User Flows

### Direct Experience Browsing
**Entry**: User skips quiz, scrolls to experience browser
**Flow**: Landing → Horizontal browser → Experience detail → Booking inquiry
**Conversion**: Typically 40% lower than quiz-guided flow

### Demo Booking Flow  
**Entry**: "Schedule Quick Demo" CTA in hero or footer
**Flow**: Landing → Demo form (email + company name) → Calendar booking
**Purpose**: Higher-touch sales for enterprise accounts

## Flow Optimization Insights

### Conversion Drop-off Points
1. **Quiz Question 3-4**: 25% abandon (complexity increases)
2. **Venue Recommendations**: 30% don't click through to details
3. **Booking Form**: 45% abandon before submission (form friction)
4. **Date Selection**: 20% abandon due to availability constraints

### A/B Testing Opportunities
**Quiz Optimization**:
- 3 questions vs 5 questions completion rates
- Progress bar vs step indicators
- "Skip quiz, browse venues" escape option

**Booking Form**:
- Single-page form vs multi-step wizard
- Required vs optional phone number field
- Alternate date field prominence

**CTA Testing**:
- "Reserve This Experience" vs "Get Quote" vs "Book Now"
- Button color (blue vs green vs orange)
- Urgency indicators ("3 other companies viewing")

## Mobile Experience Optimization

### Touch Interactions
- Horizontal scroll with momentum on mobile devices
- Touch-friendly form inputs with proper keyboard types
- Swipe gestures for image galleries

### Mobile-Specific Features
- Click-to-call phone numbers
- Mobile-optimized date pickers
- Auto-zoom prevention on form focus
- Thumb-friendly button sizing (44px minimum)

## Australian Business Context Integration

### Cultural Considerations
- Business communication style (direct, practical)
- Local venue knowledge (Blue Mountains, Sydney Harbour)
- Australian business calendar (end-of-financial-year events)
- Local payment preferences (company credit card, Net 30 invoicing)

### Localization Elements
- AUD currency throughout
- Australian business phone number format
- Local venue imagery and descriptions
- Australian business hours for support (AEST)
- Local testimonials and case studies

## Analytics & Tracking Points

### Key Conversion Events
1. **Quiz Started**: User clicks first quiz question
2. **Quiz Completed**: User reaches venue recommendations
3. **Experience Clicked**: User opens venue detail modal
4. **Booking Started**: User opens booking inquiry form
5. **Inquiry Submitted**: User completes booking form submission

### User Behavior Metrics
- Time spent on quiz (target: 2-3 minutes)
- Venue recommendation click-through rate
- Form field completion rates
- Mobile vs desktop conversion differences
- Peak usage times (Australian business hours)

### Success Indicators
- Quiz completion rate >60%
- Quiz-to-booking conversion >25%
- Overall landing page conversion >8%
- Mobile conversion rate >6% (mobile traffic typically 45%)