import { motion, AnimatePresence } from 'framer-motion'
import { useComboStore } from '../stores/comboStore'

export function ComboCounter() {
  const { currentCombo, getMultiplier } = useComboStore()
  const multiplier = getMultiplier()

  if (currentCombo === 0) return null

  const isOnFire = currentCombo >= 5

  return (
    <AnimatePresence>
      <motion.div
        key={currentCombo}
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="flex items-center gap-2"
      >
        <motion.div
          animate={isOnFire ? {
            scale: [1, 1.1, 1],
            rotate: [0, -5, 5, 0],
          } : {}}
          transition={{ repeat: Infinity, duration: 0.5 }}
          className="font-title text-2xl text-[var(--color-accent)]"
        >
          {isOnFire ? '🔥' : '⚡'}
        </motion.div>
        <div className="text-center">
          <div className="font-title text-xl text-[var(--color-accent)]">
            {currentCombo}x COMBO
          </div>
          {multiplier > 1 && (
            <div className="text-xs font-bold text-[var(--color-warning)] font-body">
              x{multiplier} Multiplikator
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
