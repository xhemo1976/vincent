export interface SM2Card {
  id: string
  easeFactor: number
  interval: number
  repetitions: number
  nextReview: string
  lastQuality: number
}

export function createCard(id: string): SM2Card {
  return {
    id,
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: new Date().toISOString(),
    lastQuality: 0,
  }
}

// quality: 0-5 (0=forgot, 3=hard, 4=good, 5=easy)
export function reviewCard(card: SM2Card, quality: number): SM2Card {
  const updated = { ...card, lastQuality: quality }

  if (quality >= 3) {
    if (updated.repetitions === 0) {
      updated.interval = 1
    } else if (updated.repetitions === 1) {
      updated.interval = 6
    } else {
      updated.interval = Math.round(updated.interval * updated.easeFactor)
    }
    updated.repetitions += 1
  } else {
    updated.repetitions = 0
    updated.interval = 1
  }

  updated.easeFactor = Math.max(
    1.3,
    updated.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  )

  const next = new Date()
  next.setDate(next.getDate() + updated.interval)
  updated.nextReview = next.toISOString()

  return updated
}

export function isDue(card: SM2Card): boolean {
  return new Date(card.nextReview) <= new Date()
}

export function getDueCards(cards: SM2Card[]): SM2Card[] {
  return cards.filter(isDue).sort((a, b) =>
    new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime()
  )
}

export function getNewCardIds(allIds: string[], learnedIds: Set<string>, limit: number): string[] {
  return allIds.filter((id) => !learnedIds.has(id)).slice(0, limit)
}

export function getRetentionEstimate(cards: SM2Card[]): number {
  if (cards.length === 0) return 0
  const now = Date.now()
  let retained = 0
  for (const card of cards) {
    const daysOverdue = Math.max(0, (now - new Date(card.nextReview).getTime()) / 86400000)
    const retention = Math.exp(-0.3 * daysOverdue)
    retained += retention
  }
  return Math.round((retained / cards.length) * 100)
}
