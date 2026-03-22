import { motion } from 'framer-motion'
import { useXPStore } from '../stores/xpStore'

interface XPBarProps {
  compact?: boolean
}

export function XPBar({ compact = false }: XPBarProps) {
  const { totalXP, getRank } = useXPStore()
  const rank = getRank()

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm">{rank.emoji}</span>
        <div className="w-20 h-2 rounded-full bg-primary/20">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${rank.progress * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-lg">{rank.emoji}</span>
          <span className="font-title text-sm text-theme">{rank.name}</span>
        </div>
        <span className="text-xs text-secondary font-body">{totalXP} XP</span>
      </div>
      <div className="w-full h-3 rounded-full bg-primary/20 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${rank.progress * 100}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <div className="flex justify-between mt-0.5">
        <span className="text-xs text-secondary font-body">{rank.minXP} XP</span>
        <span className="text-xs text-secondary font-body">{rank.maxXP} XP</span>
      </div>
    </div>
  )
}
