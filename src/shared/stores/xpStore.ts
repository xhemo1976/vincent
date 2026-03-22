import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getRankForXP } from '../utils/rankSystem'

interface XPState {
  totalXP: number
  addXP: (amount: number) => void
  getRank: () => ReturnType<typeof getRankForXP>
  reset: () => void
}

export const useXPStore = create<XPState>()(
  persist(
    (set, get) => ({
      totalXP: 0,
      addXP: (amount) =>
        set((state) => ({ totalXP: state.totalXP + amount })),
      getRank: () => getRankForXP(get().totalXP),
      reset: () => set({ totalXP: 0 }),
    }),
    { name: 'shin-dojo-xp' }
  )
)
