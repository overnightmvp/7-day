import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export type Company = {
  id: string
  name: string
  admin_email: string
  created_at: string
}

export type User = {
  id: string
  company_id: string
  email: string
  role: 'admin' | 'employee'
  created_at: string
}

export type Booking = {
  id: string
  user_id: string
  experience_id: string
  start_date: string
  end_date: string
  guests: number
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export type Experience = {
  id: string
  title: string
  description: string
  location: string
  price_per_night: number
  max_guests: number
  image_url: string
  amenities: string[]
}