import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CoinsState {
  bronze: number
  silver: number
  gold: number
  addCoins: (type: 'bronze' | 'silver' | 'gold', amount: number) => void
  spendCoins: (type: 'bronze' | 'silver' | 'gold', amount: number) => boolean
  getTotalValue: () => number
  reset: () => void
}

export const useCoinsStore = create<CoinsState>()(
  persist(
    (set, get) => ({
      bronze: 0,
      silver: 0,
      gold: 0,
      addCoins: (type, amount) =>
        set((state) => ({ [type]: state[type] + amount })),
      spendCoins: (type, amount) => {
        const current = get()[type]
        if (current >= amount) {
          set({ [type]: current - amount })
          return true
        }
        return false
      },
      getTotalValue: () => {
        const { bronze, silver, gold } = get()
        return bronze + silver * 10 + gold * 100
      },
      reset: () => set({ bronze: 0, silver: 0, gold: 0 }),
    }),
    { name: 'shin-dojo-coins' }
  )
)
