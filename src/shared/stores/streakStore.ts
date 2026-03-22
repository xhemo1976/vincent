import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { isSameDay, isYesterday } from '../utils/formatters'

interface StreakState {
  currentStreak: number
  longestStreak: number
  lastLogin: string | null
  checkStreak: () => void
  reset: () => void
}

export const useStreakStore = create<StreakState>()(
  persist(
    (set, get) => ({
      currentStreak: 0,
      longestStreak: 0,
      lastLogin: null,
      checkStreak: () => {
        const { lastLogin, currentStreak, longestStreak } = get()
        const now = new Date()

        if (lastLogin && isSameDay(lastLogin, now)) {
          return // Already checked in today
        }

        let newStreak: number
        if (lastLogin && isYesterday(lastLogin)) {
          newStreak = currentStreak + 1
        } else if (lastLogin && !isSameDay(lastLogin, now)) {
          newStreak = 1 // Streak broken
        } else {
          newStreak = 1 // First login
        }

        set({
          currentStreak: newStreak,
          longestStreak: Math.max(longestStreak, newStreak),
          lastLogin: now.toISOString(),
        })
      },
      reset: () => set({ currentStreak: 0, longestStreak: 0, lastLogin: null }),
    }),
    { name: 'shin-dojo-streak' }
  )
)
