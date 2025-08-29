# 7DAY MVP - BMAD Documentation

## Business Requirements

**Goal**: Validate corporate experience booking platform with 1 paying customer in 21 days.

**Target Users**:
- Business admins (HR, managers) who need to book team experiences
- Employees who want to book experiences using company perks

**Core Value Proposition**: "Transform Company Perks Into Real Experiences"

## MVP User Stories

### Admin Portal
1. As an admin, I can register my company account
2. As an admin, I can upload employee list via CSV  
3. As an admin, I can view all booking requests
4. As an admin, I can approve/reject bookings with 1 click

### Employee App  
1. As an employee, I can login with company email
2. As an employee, I can browse available experiences
3. As an employee, I can book an experience for specific dates
4. As an employee, I can view my booking status

## API Endpoints (Supabase)

```
GET    /api/experiences       - List hardcoded experiences
POST   /api/bookings         - Create new booking
GET    /api/bookings         - Get user's bookings  
PATCH  /api/bookings/:id     - Update booking status (admin)
POST   /api/companies        - Register company
POST   /api/users/bulk       - Upload employees (CSV)
```

## Database Schema

### companies
```sql
id: uuid (primary key)
name: text
admin_email: text
created_at: timestamp
```

### users  
```sql
id: uuid (primary key)
company_id: uuid (foreign key)
email: text
role: enum ('admin', 'employee')
created_at: timestamp
```

### bookings
```sql
id: uuid (primary key) 
user_id: uuid (foreign key)
experience_id: text
start_date: date
end_date: date
guests: integer
status: enum ('pending', 'approved', 'rejected')
created_at: timestamp
```

## Success Metrics

- [ ] 1 company successfully registers
- [ ] 1 employee successfully books experience  
- [ ] 1 admin successfully approves booking
- [ ] Landing page generates 1 demo request
- [ ] Total time to book < 2 minutes

## Technical Constraints

- No custom backend (use Supabase)
- No mobile app (responsive web only)
- No real-time features (polling OK)
- 5-10 hardcoded experiences max
- Single admin per company
- No payment processing (manual invoicing)