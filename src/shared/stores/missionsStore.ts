import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { isSameDay } from '../utils/formatters'

export type MissionRank = 'C' | 'B' | 'A' | 'S'

export interface Mission {
  id: string
  title: string
  description: string
  rank: MissionRank
  xpReward: number
  coinReward: { type: 'bronze' | 'silver' | 'gold'; amount: number }
  module?: string
  target: number
  progress: number
  completed: boolean
}

const rankColors: Record<MissionRank, string> = {
  C: '#4CAF50',
  B: '#378ADD',
  A: '#D85A30',
  S: '#FFD700',
}

export { rankColors as missionRankColors }

const MISSION_TEMPLATES: Omit<Mission, 'id' | 'progress' | 'completed'>[] = [
  // C-Rank (leicht)
  { title: 'Vokabel-Start', description: 'Lerne 5 neue Vokabeln', rank: 'C', xpReward: 20, coinReward: { type: 'bronze', amount: 5 }, module: 'english', target: 5 },
  { title: 'Schnellrechner', description: 'Löse 5 Mathe-Aufgaben', rank: 'C', xpReward: 20, coinReward: { type: 'bronze', amount: 5 }, module: 'math', target: 5 },
  { title: 'Tagesübung', description: 'Schließe eine Übung in einem Modul ab', rank: 'C', xpReward: 15, coinReward: { type: 'bronze', amount: 3 }, target: 1 },
  { title: 'Wissenstest', description: 'Beantworte 3 Quiz-Fragen richtig', rank: 'C', xpReward: 15, coinReward: { type: 'bronze', amount: 3 }, module: 'quiz', target: 3 },
  // B-Rank (mittel)
  { title: 'Vokabel-Meister', description: 'Lerne 15 Vokabeln ohne Fehler', rank: 'B', xpReward: 50, coinReward: { type: 'silver', amount: 2 }, module: 'english', target: 15 },
  { title: 'Mathe-Ninja', description: 'Löse 15 Aufgaben in Folge richtig', rank: 'B', xpReward: 50, coinReward: { type: 'silver', amount: 2 }, module: 'math', target: 15 },
  { title: 'Multitalent', description: 'Besuche 3 verschiedene Module', rank: 'B', xpReward: 40, coinReward: { type: 'silver', amount: 1 }, target: 3 },
  // A-Rank (schwer)
  { title: 'Unaufhaltsam', description: 'Erreiche eine 10er Combo', rank: 'A', xpReward: 100, coinReward: { type: 'silver', amount: 5 }, target: 10 },
  { title: 'Gelehrter', description: 'Sammle 200 XP an einem Tag', rank: 'A', xpReward: 80, coinReward: { type: 'silver', amount: 3 }, target: 200 },
  // S-Rank (wöchentlich)
  { title: 'Legende der Woche', description: 'Schließe alle täglichen Missionen 5 Tage ab', rank: 'S', xpReward: 300, coinReward: { type: 'gold', amount: 1 }, target: 5 },
  { title: 'Dojo-Champion', description: 'Sammle 1000 XP in einer Woche', rank: 'S', xpReward: 250, coinReward: { type: 'gold', amount: 1 }, target: 1000 },
]

function generateDailyMissions(seed: string): Mission[] {
  // Use date as seed for pseudo-random but deterministic mission selection
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0
  }
  const rng = (i: number) => Math.abs((hash * (i + 1) * 16807) % 2147483647)

  const cMissions = MISSION_TEMPLATES.filter((m) => m.rank === 'C')
  const bMissions = MISSION_TEMPLATES.filter((m) => m.rank === 'B')
  const aMissions = MISSION_TEMPLATES.filter((m) => m.rank === 'A')
  const sMissions = MISSION_TEMPLATES.filter((m) => m.rank === 'S')

  const pick = (arr: typeof MISSION_TEMPLATES, i: number) => arr[rng(i) % arr.length]

  const missions: Mission[] = [
    { ...pick(cMissions, 1), id: `${seed}-c1`, progress: 0, completed: false },
    { ...pick(cMissions, 2), id: `${seed}-c2`, progress: 0, completed: false },
    { ...pick(bMissions, 3), id: `${seed}-b1`, progress: 0, completed: false },
    { ...pick(aMissions, 4), id: `${seed}-a1`, progress: 0, completed: false },
    { ...pick(sMissions, 5), id: `${seed}-s1`, progress: 0, completed: false },
  ]

  return missions
}

interface MissionsState {
  missions: Mission[]
  lastGenerated: string | null
  completedMissionDays: number
  checkAndGenerate: () => void
  updateProgress: (missionId: string, amount: number) => void
  completeMission: (missionId: string) => void
}

export const useMissionsStore = create<MissionsState>()(
  persist(
    (set, get) => ({
      missions: [],
      lastGenerated: null,
      completedMissionDays: 0,
      checkAndGenerate: () => {
        const today = new Date().toISOString().split('T')[0]
        const { lastGenerated } = get()
        if (lastGenerated && isSameDay(lastGenerated, new Date())) return
        const missions = generateDailyMissions(today)
        set({ missions, lastGenerated: today })
      },
      updateProgress: (missionId, amount) =>
        set((state) => ({
          missions: state.missions.map((m) =>
            m.id === missionId && !m.completed
              ? { ...m, progress: Math.min(m.progress + amount, m.target) }
              : m
          ),
        })),
      completeMission: (missionId) =>
        set((state) => ({
          missions: state.missions.map((m) =>
            m.id === missionId ? { ...m, completed: true } : m
          ),
        })),
    }),
    { name: 'shin-dojo-missions' }
  )
)
