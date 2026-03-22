import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useUserStore } from '../shared/stores/userStore'
import { useStreakStore } from '../shared/stores/streakStore'
import { useAuth } from '../shared/lib/AuthProvider'
import { useSync } from '../shared/hooks/useSync'
import { AppRouter } from './Router'
import ToastLayer from '../shared/components/ToastNotification'
import InstallPrompt from '../shared/components/InstallPrompt'

export default function App() {
  const { theme, darkMode, isOnboarded } = useUserStore()
  const { checkStreak } = useStreakStore()
  const { user, loading, signInAnonymously } = useAuth()

  // Apply theme + dark mode to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.setAttribute('data-mode', darkMode ? 'dark' : 'light')
  }, [theme, darkMode])

  // Auto anonymous auth
  useEffect(() => {
    if (!loading && !user) {
      signInAnonymously()
    }
  }, [loading, user, signInAnonymously])

  // Check streak on app load
  useEffect(() => {
    if (isOnboarded) {
      checkStreak()
    }
  }, [isOnboarded, checkStreak])

  // Sync stores ↔ Supabase
  useSync()

  if (loading) {
    return (
      <div className="min-h-dvh bg-theme flex items-center justify-center">
        <div className="text-4xl animate-pulse">🥋</div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <ToastLayer />
      <InstallPrompt />
      <AppRouter />
    </BrowserRouter>
  )
}
