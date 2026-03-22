import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WeeklyChallenge {
  id: string
  title: string
  description: string
  target: number
  progress: number
  completed: boolean
  xpReward: number
  coinReward: { type: 'bronze' | 'silver' | 'gold'; amount: number }
}

interface WeeklyChallengeTemplate {
  title: string
  description: string
  target: number
  xpReward: number
  coinReward: { type: 'bronze' | 'silver' | 'gold'; amount: number }
}

const WEEKLY_TEMPLATES: WeeklyChallengeTemplate[] = [
  { title: 'Wochentliche Pflicht', description: 'Logge dich 5 Tage diese Woche ein', target: 5, xpReward: 150, coinReward: { type: 'silver', amount: 5 } },
  { title: 'Vokabel-Marathon', description: 'Lerne 50 Vokabeln diese Woche', target: 50, xpReward: 200, coinReward: { type: 'silver', amount: 8 } },
  { title: 'Mathe-Meister', description: 'Loese 40 Mathe-Aufgaben diese Woche', target: 40, xpReward: 200, coinReward: { type: 'silver', amount: 8 } },
  { title: 'Quiz-Profi', description: 'Beantworte 30 Quiz-Fragen richtig', target: 30, xpReward: 180, coinReward: { type: 'silver', amount: 6 } },
  { title: 'Boss-Jaeger', description: 'Besiege den Wochen-Boss', target: 1, xpReward: 250, coinReward: { type: 'gold', amount: 1 } },
  { title: 'Combo-Meister', description: 'Erreiche insgesamt 30 Combo-Punkte', target: 30, xpReward: 150, coinReward: { type: 'silver', amount: 4 } },
  { title: 'Allround-Training', description: 'Besuche 5 verschiedene Module', target: 5, xpReward: 120, coinReward: { type: 'silver', amount: 3 } },
  { title: 'XP-Sammler', description: 'Sammle 500 XP diese Woche', target: 500, xpReward: 200, coinReward: { type: 'gold', amount: 1 } },
]

function getWeekNumber(): number {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  const diff = now.getTime() - start.getTime()
  return Math.ceil(diff / (7 * 24 * 60 * 60 * 1000))
}

function generateWeeklyChallenges(weekNum: number): WeeklyChallenge[] {
  let hash = weekNum * 16807
  const rng = () => {
    hash = (hash * 16807) % 2147483647
    return hash
  }

  const indices: number[] = []
  while (indices.length < 3) {
    const idx = rng() % WEEKLY_TEMPLATES.length
    if (!indices.includes(idx)) indices.push(idx)
  }

  return indices.map((idx, i) => {
    const tmpl = WEEKLY_TEMPLATES[idx]
    return {
      id: `week-${weekNum}-${i}`,
      ...tmpl,
      progress: 0,
      completed: false,
    }
  })
}

interface WeeklyChallengeState {
  challenges: WeeklyChallenge[]
  currentWeek: number
  checkAndGenerate: () => void
  updateProgress: (challengeId: string, amount: number) => void
  completeChallenge: (challengeId: string) => void
}

export const useWeeklyChallengeStore = create<WeeklyChallengeState>()(
  persist(
    (set, get) => ({
      challenges: [],
      currentWeek: 0,
      checkAndGenerate: () => {
        const week = getWeekNumber()
        if (get().currentWeek !== week) {
          set({
            challenges: generateWeeklyChallenges(week),
            currentWeek: week,
          })
        }
      },
      updateProgress: (challengeId, amount) =>
        set((state) => ({
          challenges: state.challenges.map((c) =>
            c.id === challengeId && !c.completed
              ? { ...c, progress: Math.min(c.progress + amount, c.target) }
              : c
          ),
        })),
      completeChallenge: (challengeId) =>
        set((state) => ({
          challenges: state.challenges.map((c) =>
            c.id === challengeId ? { ...c, completed: true } : c
          ),
        })),
    }),
    { name: 'shin-dojo-weekly' }
  )
)
