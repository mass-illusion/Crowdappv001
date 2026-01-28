import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

// Replace with your actual Supabase project URL and anon key
const supabaseUrl = 'https://your-project.supabase.co'
const supabaseAnonKey = 'your-anon-key-here'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Types for your database tables
export interface UserProfile {
  id: string
  email?: string
  phone_number?: string
  username?: string
  full_name?: string
  avatar_url?: string
  gender?: 'male' | 'female' | 'nonbinary'
  age?: number
  looking_for?: string[]
  profile_photos?: string[]
  interests?: string[]
  bio?: string
  onboarding_completed?: boolean
  created_at: string
  updated_at: string
}

// Auth helper functions
export const signUpWithPhone = async (phone: string) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    phone: phone,
  })
  return { data, error }
}

export const verifyOtp = async (phone: string, token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: 'sms'
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = () => {
  return supabase.auth.getUser()
}

export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback)
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