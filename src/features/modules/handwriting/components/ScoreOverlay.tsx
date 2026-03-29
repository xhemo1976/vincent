import { motion } from 'framer-motion'
import { Button } from '../../../../shared/components/Button'
import { StarRating } from './StarRating'
import type { EvaluationResult } from '../types'

interface ScoreOverlayProps {
  result: EvaluationResult
  onRetry: () => void
  onNext: () => void
  isLast?: boolean
}

function getMessage(stars: number): string {
  if (stars >= 5) return 'Meisterhaft! Perfekte Rune!'
  if (stars >= 4) return 'Sehr gut! Weiter so!'
  if (stars >= 3) return 'Gut, aber da geht noch mehr!'
  if (stars >= 2) return 'Weiter ueben!'
  return 'Nochmal versuchen!'
}

export function ScoreOverlay({ result, onRetry, onNext, isLast }: ScoreOverlayProps) {
  const rewarded = result.stars >= 4

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-3"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="text-4xl font-title text-primary neon-text mb-2"
      >
        {result.accuracy}%
      </motion.div>

      <StarRating stars={result.stars} size="lg" />

      <p className="text-secondary font-body text-sm mt-2 mb-1">
        {getMessage(result.stars)}
      </p>

      {rewarded && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-primary font-body mb-2"
        >
          {result.stars >= 5 ? '+30 XP, +1 Silber' : '+20 XP, +3 Bronze'}
        </motion.p>
      )}

      <div className="flex gap-3 justify-center mt-3">
        <Button variant="secondary" size="sm" onClick={onRetry}>Nochmal</Button>
        <Button size="sm" onClick={onNext}>
          {isLast ? 'Fertig' : 'Naechster →'}
        </Button>
      </div>
    </motion.div>
  )
}
