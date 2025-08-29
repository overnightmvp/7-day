-- Create companies table
CREATE TABLE companies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    admin_email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'employee')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    experience_id TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    guests INTEGER NOT NULL CHECK (guests > 0),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create booking inquiries table (for landing page inquiries)
CREATE TABLE booking_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    work_email TEXT NOT NULL,
    company_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    phone TEXT,
    team_size INTEGER NOT NULL CHECK (team_size > 0),
    preferred_date DATE NOT NULL,
    alternate_date DATE,
    special_requests TEXT,
    experience_id TEXT NOT NULL,
    experience_title TEXT NOT NULL,
    estimated_cost DECIMAL(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'converted', 'lost')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_company_id ON users(company_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Enable Row Level Security (RLS)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies (basic - you'll need to customize based on auth)
CREATE POLICY "Users can view their own company" ON companies
    FOR SELECT USING (admin_email = auth.email());

CREATE POLICY "Users can view users in their company" ON users
    FOR SELECT USING (
        company_id IN (
            SELECT id FROM companies WHERE admin_email = auth.email()
        )
    );

CREATE POLICY "Users can view their own bookings" ON bookings
    FOR SELECT USING (
        user_id IN (
            SELECT id FROM users WHERE email = auth.email()
        )
    );