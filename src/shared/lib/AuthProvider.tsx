import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from './supabase'
import type { User, Session } from '@supabase/supabase-js'

interface AuthCtx {
  user: User | null
  session: Session | null
  loading: boolean
  signInAnonymously: () => Promise<void>
  linkEmail: (email: string, password: string) => Promise<{ error: string | null }>
  signInWithEmail: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthCtx>({
  user: null,
  session: null,
  loading: true,
  signInAnonymously: async () => {},
  linkEmail: async () => ({ error: null }),
  signInWithEmail: async () => ({ error: null }),
  signOut: async () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInAnonymously = async () => {
    if (!supabase) return
    await supabase.auth.signInAnonymously()
  }

  const linkEmail = async (email: string, password: string) => {
    if (!supabase) return { error: 'Supabase nicht konfiguriert' }
    const { error } = await supabase.auth.updateUser({ email, password })
    return { error: error?.message ?? null }
  }

  const signInWithEmail = async (email: string, password: string) => {
    if (!supabase) return { error: 'Supabase nicht konfiguriert' }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }

  const signOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signInAnonymously, linkEmail, signInWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
