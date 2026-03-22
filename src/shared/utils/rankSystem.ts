export interface Rank {
  name: string
  emoji: string
  level: number
  minXP: number
  maxXP: number
  progress: number
}

const RANKS = [
  { name: 'Schüler', emoji: '🥋', minXP: 0, maxXP: 499 },
  { name: 'Krieger', emoji: '⚔️', minXP: 500, maxXP: 1999 },
  { name: 'Meister', emoji: '🏯', minXP: 2000, maxXP: 4999 },
  { name: 'Legende', emoji: '🐉', minXP: 5000, maxXP: 9999 },
  { name: 'Dojo-Meister', emoji: '👑', minXP: 10000, maxXP: Infinity },
] as const

export function getRankForXP(xp: number): Rank {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    const rank = RANKS[i]
    if (xp >= rank.minXP) {
      const rangeSize = rank.maxXP === Infinity ? 10000 : rank.maxXP - rank.minXP + 1
      const progress = Math.min((xp - rank.minXP) / rangeSize, 1)
      return {
        name: rank.name,
        emoji: rank.emoji,
        level: i + 1,
        minXP: rank.minXP,
        maxXP: rank.maxXP === Infinity ? rank.minXP + 10000 : rank.maxXP,
        progress,
      }
    }
  }
  return { name: 'Schüler', emoji: '🥋', level: 1, minXP: 0, maxXP: 499, progress: 0 }
}

export function getXPForNextRank(xp: number): number {
  for (const rank of RANKS) {
    if (xp <= rank.maxXP && rank.maxXP !== Infinity) {
      return rank.maxXP + 1 - xp
    }
  }
  return 0
}
