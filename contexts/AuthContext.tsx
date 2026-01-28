import React, { createContext, useContext, useEffect, useState } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  session: Session | null
  user: User | null
  loading: boolean
  signUp: (phone: string) => Promise<{ error: any }>
  signIn: (phone: string) => Promise<{ error: any }>
  verifyOtp: (phone: string, token: string) => Promise<{ error: any }>
  signOut: () => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth event:', event)
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)

      // Create profile on sign up
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (!profile) {
          // Create new profile
          await supabase
            .from('profiles')
            .insert({
              id: session.user.id,
              phone_number: session.user.phone,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (phone: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      phone: phone,
    })
    return { error }
  }

  const signIn = async (phone: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      phone: phone,
    })
    return { error }
  }

  const verifyOtp = async (phone: string, token: string) => {
    const { error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    })
    return { error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const value = {
    session,
    user,
    loading,
    signUp,
    signIn,
    verifyOtp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}