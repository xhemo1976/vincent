import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../../../shared/components/Button'
import { Card } from '../../../../shared/components/Card'
import { useXPStore } from '../../../../shared/stores/xpStore'
import { useCoinsStore } from '../../../../shared/stores/coinsStore'
import { useRewardAnimations } from '../../../../shared/components/RewardAnimation'
import { useLevelGating } from '../hooks/useLevelGating'
import { SITUATIONS } from '../data/situations'

export function SituationMode({ onBack }: { onBack: () => void }) {
  const { isUnlocked } = useLevelGating()
  const availableSituations = SITUATIONS.filter(s => isUnlocked(s.requiredLevel))

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  const { addXP } = useXPStore()
  const { addCoins } = useCoinsStore()
  const { showXPGain, AnimationLayer } = useRewardAnimations()

  const isFinished = index >= availableSituations.length

  if (isFinished) {
    return (
      <div className="text-center py-12">
        <AnimationLayer />
        <div className="text-8xl mb-6">{score >= availableSituations.length * 0.6 ? '🧠' : '💪'}</div>
        <h2 className="text-2xl mb-2 text-theme">Situationen abgeschlossen!</h2>
        <p className="text-xl font-bold text-primary mb-4 font-body">{score}/{availableSituations.length}</p>
        <Button onClick={onBack}>Zurueck</Button>
      </div>
    )
  }

  const situation = availableSituations[index]

  const handleSelect = (optIdx: number) => {
    if (selected !== null) return
    setSelected(optIdx)
    if (situation.options[optIdx].isCorrect) {
      setScore(s => s + 1)
      addXP(20)
      addCoins('bronze', 5)
      showXPGain(20)
    }
  }

  const goNext = () => {
    setSelected(null)
    setIndex(i => i + 1)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <AnimationLayer />
      <Button variant="ghost" size="sm" onClick={onBack}>← Zurueck</Button>
      <p className="text-xs text-secondary text-center mt-2 font-body">
        Situation {index + 1} / {availableSituations.length}
      </p>

      <motion.div key={situation.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-2">
        <Card className="mb-4">
          <div className="text-3xl mb-2">{situation.emoji}</div>
          <p className="text-base font-bold text-theme font-body">{situation.scenario}</p>
        </Card>

        <div className="space-y-2">
          {situation.options.map((opt, i) => {
            let cls = 'bg-card border-2 border-primary/20 text-theme'
            if (selected !== null) {
              if (opt.isCorrect) cls = 'bg-[var(--color-success)]/20 border-2 border-[var(--color-success)]'
              else if (i === selected) cls = 'bg-[var(--color-danger)]/20 border-2 border-[var(--color-danger)]'
            }
            return (
              <div key={i}>
                <motion.button
                  whileTap={selected === null ? { scale: 0.97 } : {}}
                  onClick={() => handleSelect(i)}
                  disabled={selected !== null}
                  className={`w-full p-4 rounded-xl font-bold text-sm sm:text-base text-left cursor-pointer disabled:cursor-default transition-all font-body ${cls}`}
                >
                  {opt.text}
                </motion.button>
                {selected !== null && (i === selected || opt.isCorrect) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-1 px-4 py-2 text-xs text-secondary font-body"
                  >
                    {opt.explanation}
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>

        {selected !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-center">
            <Button size="sm" onClick={goNext}>
              {index < availableSituations.length - 1 ? 'Naechste Situation →' : 'Ergebnis ansehen'}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
