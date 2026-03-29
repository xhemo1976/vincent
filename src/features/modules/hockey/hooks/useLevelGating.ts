import { useXPStore } from '../../../../shared/stores/xpStore'
import { getXPForNextRank } from '../../../../shared/utils/rankSystem'

const RANK_NAMES = ['Schueler', 'Krieger', 'Meister', 'Legende', 'Dojo-Meister'] as const
const RANK_MIN_XP = [0, 500, 2000, 5000, 10000] as const

export function useLevelGating() {
  const { totalXP, getRank } = useXPStore()
  const rank = getRank()

  const isUnlocked = (requiredLevel: number) => rank.level >= requiredLevel

  const getRequiredXP = (requiredLevel: number): number => {
    if (rank.level >= requiredLevel) return 0
    return RANK_MIN_XP[requiredLevel - 1] - totalXP
  }

  const getRequiredRankName = (requiredLevel: number): string => {
    return RANK_NAMES[requiredLevel - 1] ?? 'Unbekannt'
  }

  return {
    isUnlocked,
    currentLevel: rank.level,
    currentRankName: rank.name,
    getRequiredXP,
    getRequiredRankName,
    xpForNextRank: getXPForNextRank(totalXP),
  }
}
