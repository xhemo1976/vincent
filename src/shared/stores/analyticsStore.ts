import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Session {
  date: string
  hour: number
  module: string
  score: number
  duration: number // seconds
}

interface AnalyticsState {
  sessions: Session[]
  addSession: (session: Omit<Session, 'date'>) => void
  getBestHour: () => { hour: number; avgScore: number } | null
  getModuleStats: () => Record<string, { sessions: number; avgScore: number }>
  getWeeklyXP: () => number[]
}

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set, get) => ({
      sessions: [],
      addSession: (session) =>
        set((state) => ({
          sessions: [
            ...state.sessions.slice(-200), // Keep last 200 sessions
            { ...session, date: new Date().toISOString() },
          ],
        })),
      getBestHour: () => {
        const { sessions } = get()
        if (sessions.length < 5) return null

        const hourScores: Record<number, { total: number; count: number }> = {}
        for (const s of sessions) {
          if (!hourScores[s.hour]) hourScores[s.hour] = { total: 0, count: 0 }
          hourScores[s.hour].total += s.score
          hourScores[s.hour].count++
        }

        let bestHour = -1
        let bestAvg = 0
        for (const [hour, data] of Object.entries(hourScores)) {
          const avg = data.total / data.count
          if (avg > bestAvg) {
            bestAvg = avg
            bestHour = parseInt(hour)
          }
        }

        return bestHour >= 0 ? { hour: bestHour, avgScore: Math.round(bestAvg) } : null
      },
      getModuleStats: () => {
        const { sessions } = get()
        const stats: Record<string, { sessions: number; avgScore: number; total: number }> = {}
        for (const s of sessions) {
          if (!stats[s.module]) stats[s.module] = { sessions: 0, avgScore: 0, total: 0 }
          stats[s.module].sessions++
          stats[s.module].total += s.score
        }
        for (const mod of Object.keys(stats)) {
          stats[mod].avgScore = Math.round(stats[mod].total / stats[mod].sessions)
        }
        return stats
      },
      getWeeklyXP: () => {
        const { sessions } = get()
        const days: number[] = new Array(7).fill(0)
        const now = new Date()
        for (const s of sessions) {
          const d = new Date(s.date)
          const dayDiff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))
          if (dayDiff >= 0 && dayDiff < 7) {
            days[6 - dayDiff] += s.score
          }
        }
        return days
      },
    }),
    { name: 'shin-dojo-analytics' }
  )
)
