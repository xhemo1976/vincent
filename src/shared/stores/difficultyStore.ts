import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { recordAttempt, type TopicPerformance } from '../utils/adaptiveDifficulty'

interface DifficultyState {
  topics: Record<string, TopicPerformance>
  record: (topic: string, correct: boolean) => void
  getDifficulty: (topic: string) => number
  getAccuracy: (topic: string) => number
}

function initTopic(topic: string): TopicPerformance {
  return { topic, correct: 0, total: 0, lastAttempts: [], currentDifficulty: 1 }
}

export const useDifficultyStore = create<DifficultyState>()(
  persist(
    (set, get) => ({
      topics: {},

      record: (topic: string, correct: boolean) => {
        const state = get()
        const perf = state.topics[topic] || initTopic(topic)
        const updated = recordAttempt(perf, correct)
        set({ topics: { ...state.topics, [topic]: updated } })
      },

      getDifficulty: (topic: string) => {
        const perf = get().topics[topic]
        return perf?.currentDifficulty ?? 1
      },

      getAccuracy: (topic: string) => {
        const perf = get().topics[topic]
        if (!perf || perf.total === 0) return 0
        return Math.round((perf.correct / perf.total) * 100)
      },
    }),
    { name: 'shin-dojo-difficulty' }
  )
)
