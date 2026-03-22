import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ComboState {
  currentCombo: number
  bestCombo: number
  increment: () => void
  reset: () => void
  getMultiplier: () => number
}

export const useComboStore = create<ComboState>()(
  persist(
    (set, get) => ({
      currentCombo: 0,
      bestCombo: 0,
      increment: () =>
        set((state) => ({
          currentCombo: state.currentCombo + 1,
          bestCombo: Math.max(state.bestCombo, state.currentCombo + 1),
        })),
      reset: () => set({ currentCombo: 0 }),
      getMultiplier: () => {
        const combo = get().currentCombo
        if (combo >= 20) return 4
        if (combo >= 10) return 3
        if (combo >= 5) return 2
        return 1
      },
    }),
    { name: 'shin-dojo-combo' }
  )
)
