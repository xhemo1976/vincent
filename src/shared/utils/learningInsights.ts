import type { TopicPerformance } from './adaptiveDifficulty'

interface ModuleStats {
  sessions: number
  avgScore: number
}

export function getStrongestWeakest(stats: Record<string, ModuleStats>): { strongest: string | null; weakest: string | null } {
  const entries = Object.entries(stats)
  if (entries.length === 0) return { strongest: null, weakest: null }

  let strongest = entries[0]
  let weakest = entries[0]

  for (const entry of entries) {
    if (entry[1].avgScore > strongest[1].avgScore) strongest = entry
    if (entry[1].avgScore < weakest[1].avgScore) weakest = entry
  }

  return {
    strongest: strongest[0],
    weakest: weakest[0],
  }
}

export function getRecommendedModule(
  stats: Record<string, ModuleStats>,
  srsCount: number,
  difficultyTopics: Record<string, TopicPerformance>
): { module: string; reason: string } {
  // Priority 1: SRS due vocab
  if (srsCount > 0) {
    return { module: 'english', reason: `${srsCount} Vokabeln faellig` }
  }

  // Priority 2: Weakest module with sessions
  const { weakest } = getStrongestWeakest(stats)
  if (weakest && stats[weakest]?.avgScore < 60) {
    return { module: weakest, reason: `${weakest} braucht Uebung (${stats[weakest].avgScore}% avg)` }
  }

  // Priority 3: Module with lowest difficulty that has been attempted
  const diffEntries = Object.entries(difficultyTopics)
  if (diffEntries.length > 0) {
    const lowest = diffEntries.reduce((a, b) =>
      a[1].currentDifficulty < b[1].currentDifficulty ? a : b
    )
    if (lowest[1].currentDifficulty < 3) {
      return { module: 'math', reason: `Mathe Lv.${lowest[1].currentDifficulty} - steigere dich!` }
    }
  }

  // Priority 4: Least played module
  const allModules = ['english', 'math', 'hockey', 'memory', 'handwriting', 'ai', 'quiz']
  const leastPlayed = allModules.reduce((best, mod) => {
    const sessions = stats[mod]?.sessions ?? 0
    const bestSessions = stats[best]?.sessions ?? 0
    return sessions < bestSessions ? mod : best
  })
  return { module: leastPlayed, reason: 'Noch nicht ausprobiert!' }
}

export function getForgettingCurveData(retention: number, totalCards: number): { day: number; retention: number }[] {
  if (totalCards === 0) return []

  const points: { day: number; retention: number }[] = []
  for (let day = 0; day <= 30; day++) {
    // Ebbinghaus curve with SRS boost
    const baseRetention = Math.exp(-0.3 * day)
    const srsBoost = Math.min(1, retention / 100)
    const boostedRetention = baseRetention * (0.3 + 0.7 * srsBoost)
    points.push({ day, retention: Math.round(boostedRetention * 100) })
  }
  return points
}

const MODULE_PATHS: Record<string, string> = {
  english: '/module/english',
  math: '/module/math',
  hockey: '/module/hockey',
  memory: '/module/memory',
  handwriting: '/module/handwriting',
  ai: '/module/ai',
  quiz: '/module/quiz',
}

export function getModulePath(module: string): string {
  return MODULE_PATHS[module] || '/dashboard'
}

const MODULE_EMOJI: Record<string, string> = {
  english: '🇬🇧',
  math: '🔢',
  hockey: '🏑',
  memory: '🧠',
  handwriting: '✍️',
  ai: '🤖',
  quiz: '⚔️',
}

export function getModuleEmoji(module: string): string {
  return MODULE_EMOJI[module] || '📚'
}
