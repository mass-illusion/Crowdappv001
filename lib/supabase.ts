import { createClient } from '@supabase/supabase-js'

// Replace with your Supabase project URL and anon key
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for your database tables
export interface FavoritePlace {
  id: string
  user_id: string
  place_id: string
  name: string
  category: 'restaurant' | 'bar' | 'coffee' | 'boba' | 'ice_cream' | 'other'
  latitude: number
  longitude: number
  address?: string
  rating?: number
  notes?: string
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  email: string
  username?: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface PlaceMatch {
  id: string
  user1_id: string
  user2_id: string
  place_id: string
  place_name: string
  match_score: number
  created_at: string
}