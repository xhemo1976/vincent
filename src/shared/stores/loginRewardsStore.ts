import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { isSameDay } from '../utils/formatters'

export interface DayReward {
  day: number
  xp: number
  coins: { type: 'bronze' | 'silver' | 'gold'; amount: number }
  bonus?: string
}

const REWARD_CYCLE: DayReward[] = [
  { day: 1, xp: 10, coins: { type: 'bronze', amount: 5 } },
  { day: 2, xp: 15, coins: { type: 'bronze', amount: 5 } },
  { day: 3, xp: 20, coins: { type: 'bronze', amount: 8 } },
  { day: 4, xp: 20, coins: { type: 'bronze', amount: 8 } },
  { day: 5, xp: 30, coins: { type: 'silver', amount: 1 }, bonus: 'Silber-Muenze!' },
  { day: 6, xp: 25, coins: { type: 'bronze', amount: 10 } },
  { day: 7, xp: 50, coins: { type: 'silver', amount: 2 }, bonus: 'Wochen-Bonus!' },
  { day: 8, xp: 15, coins: { type: 'bronze', amount: 5 } },
  { day: 9, xp: 20, coins: { type: 'bronze', amount: 8 } },
  { day: 10, xp: 30, coins: { type: 'silver', amount: 1 }, bonus: '10-Tage-Streak!' },
  { day: 11, xp: 20, coins: { type: 'bronze', amount: 8 } },
  { day: 12, xp: 25, coins: { type: 'bronze', amount: 10 } },
  { day: 13, xp: 25, coins: { type: 'bronze', amount: 10 } },
  { day: 14, xp: 75, coins: { type: 'silver', amount: 3 }, bonus: '2-Wochen-Bonus!' },
  { day: 15, xp: 20, coins: { type: 'bronze', amount: 8 } },
  { day: 16, xp: 25, coins: { type: 'bronze', amount: 10 } },
  { day: 17, xp: 25, coins: { type: 'bronze', amount: 10 } },
  { day: 18, xp: 30, coins: { type: 'silver', amount: 1 } },
  { day: 19, xp: 30, coins: { type: 'bronze', amount: 12 } },
  { day: 20, xp: 50, coins: { type: 'silver', amount: 2 }, bonus: '20-Tage-Streak!' },
  { day: 21, xp: 75, coins: { type: 'silver', amount: 3 }, bonus: '3-Wochen-Bonus!' },
  { day: 22, xp: 30, coins: { type: 'bronze', amount: 12 } },
  { day: 23, xp: 30, coins: { type: 'bronze', amount: 12 } },
  { day: 24, xp: 35, coins: { type: 'silver', amount: 1 } },
  { day: 25, xp: 40, coins: { type: 'silver', amount: 2 }, bonus: '25 Tage!' },
  { day: 26, xp: 35, coins: { type: 'bronze', amount: 15 } },
  { day: 27, xp: 35, coins: { type: 'bronze', amount: 15 } },
  { day: 28, xp: 100, coins: { type: 'silver', amount: 5 }, bonus: '4-Wochen-Bonus!' },
  { day: 29, xp: 40, coins: { type: 'silver', amount: 2 } },
  { day: 30, xp: 200, coins: { type: 'gold', amount: 1 }, bonus: 'LEGENDAER! Gold-Muenze!' },
]

export function getRewardForDay(day: number): DayReward {
  const index = ((day - 1) % REWARD_CYCLE.length)
  return REWARD_CYCLE[index]
}

interface LoginRewardsState {
  currentDay: number
  lastClaimDate: string | null
  claimedToday: boolean
  totalClaimed: number
  claimReward: () => DayReward | null
  checkIfClaimedToday: () => boolean
}

export const useLoginRewardsStore = create<LoginRewardsState>()(
  persist(
    (set, get) => ({
      currentDay: 1,
      lastClaimDate: null,
      claimedToday: false,
      totalClaimed: 0,
      claimReward: () => {
        const { claimedToday, currentDay } = get()
        if (claimedToday) return null

        const reward = getRewardForDay(currentDay)
        set({
          claimedToday: true,
          lastClaimDate: new Date().toISOString(),
          currentDay: currentDay + 1,
          totalClaimed: get().totalClaimed + 1,
        })
        return reward
      },
      checkIfClaimedToday: () => {
        const { lastClaimDate } = get()
        if (!lastClaimDate) {
          set({ claimedToday: false })
          return false
        }
        const claimed = isSameDay(lastClaimDate, new Date())
        set({ claimedToday: claimed })
        return claimed
      },
    }),
    { name: 'shin-dojo-login-rewards' }
  )
)
