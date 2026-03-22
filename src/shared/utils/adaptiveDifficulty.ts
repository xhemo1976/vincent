export interface TopicPerformance {
  topic: string
  correct: number
  total: number
  lastAttempts: boolean[] // last 10
  currentDifficulty: number // 1-5
}

export function adjustDifficulty(perf: TopicPerformance): number {
  if (perf.total < 3) return perf.currentDifficulty

  const recentAccuracy = perf.lastAttempts.length > 0
    ? perf.lastAttempts.filter(Boolean).length / perf.lastAttempts.length
    : 0.5

  if (recentAccuracy >= 0.9 && perf.lastAttempts.length >= 5) {
    return Math.min(5, perf.currentDifficulty + 1)
  }
  if (recentAccuracy <= 0.4 && perf.lastAttempts.length >= 3) {
    return Math.max(1, perf.currentDifficulty - 1)
  }
  return perf.currentDifficulty
}

export function recordAttempt(perf: TopicPerformance, correct: boolean): TopicPerformance {
  const lastAttempts = [...perf.lastAttempts, correct].slice(-10)
  const updated: TopicPerformance = {
    ...perf,
    correct: perf.correct + (correct ? 1 : 0),
    total: perf.total + 1,
    lastAttempts,
  }
  updated.currentDifficulty = adjustDifficulty(updated)
  return updated
}

export function selectWeakestTopic(perfs: Record<string, TopicPerformance>): string | null {
  const entries = Object.entries(perfs)
  if (entries.length === 0) return null

  let weakest = entries[0]
  for (const entry of entries) {
    const acc = entry[1].total > 0 ? entry[1].correct / entry[1].total : 0.5
    const weakestAcc = weakest[1].total > 0 ? weakest[1].correct / weakest[1].total : 0.5
    if (acc < weakestAcc) weakest = entry
  }
  return weakest[0]
}

export function getDifficultyLabel(level: number): string {
  switch (level) {
    case 1: return 'Anfaenger'
    case 2: return 'Leicht'
    case 3: return 'Mittel'
    case 4: return 'Schwer'
    case 5: return 'Meister'
    default: return 'Mittel'
  }
}

export function getDifficultyColor(level: number): string {
  switch (level) {
    case 1: return '#4CAF50'
    case 2: return '#8BC34A'
    case 3: return '#FFC107'
    case 4: return '#FF9800'
    case 5: return '#E53935'
    default: return '#FFC107'
  }
}
