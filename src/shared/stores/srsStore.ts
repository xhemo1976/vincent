import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createCard, reviewCard, getDueCards, getRetentionEstimate, type SM2Card } from '../utils/spacedRepetition'

interface SRSState {
  cards: Record<string, SM2Card>
  review: (id: string, quality: number) => void
  getDueCount: () => number
  getDueCardsList: () => SM2Card[]
  getRetention: () => number
  isLearned: (id: string) => boolean
  ensureCard: (id: string) => void
}

export const useSRSStore = create<SRSState>()(
  persist(
    (set, get) => ({
      cards: {},

      ensureCard: (id: string) => {
        if (!get().cards[id]) {
          set((state) => ({
            cards: { ...state.cards, [id]: createCard(id) },
          }))
        }
      },

      review: (id: string, quality: number) => {
        const state = get()
        const card = state.cards[id] || createCard(id)
        const updated = reviewCard(card, quality)
        set({ cards: { ...state.cards, [id]: updated } })
      },

      getDueCount: () => {
        const cards = Object.values(get().cards)
        return getDueCards(cards).length
      },

      getDueCardsList: () => {
        return getDueCards(Object.values(get().cards))
      },

      getRetention: () => {
        const cards = Object.values(get().cards)
        if (cards.length === 0) return 100
        return getRetentionEstimate(cards)
      },

      isLearned: (id: string) => {
        return !!get().cards[id]
      },
    }),
    { name: 'shin-dojo-srs' }
  )
)
