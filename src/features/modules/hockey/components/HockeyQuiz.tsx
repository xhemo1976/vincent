import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../../../shared/components/Button'
import { Card } from '../../../../shared/components/Card'
import { useXPStore } from '../../../../shared/stores/xpStore'
import { useCoinsStore } from '../../../../shared/stores/coinsStore'
import { useRewardAnimations } from '../../../../shared/components/RewardAnimation'
import { useLevelGating } from '../hooks/useLevelGating'
import { HOCKEY_QUIZ_QUESTIONS } from '../data/quizQuestions'

export function HockeyQuiz({ onBack }: { onBack: () => void }) {
  const { isUnlocked } = useLevelGating()
  const availableQuestions = HOCKEY_QUIZ_QUESTIONS.filter(q => isUnlocked(q.requiredLevel))

  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)

  const { addXP } = useXPStore()
  const { addCoins } = useCoinsStore()
  const { showXPGain, AnimationLayer } = useRewardAnimations()

  const isFinished = index >= availableQuestions.length

  const handleSelect = (answer: string) => {
    if (selected) return
    setSelected(answer)
    const correct = availableQuestions[index].a.includes(answer)
    if (correct) {
      setScore(s => s + 1)
      addXP(15)
      addCoins('bronze', 3)
      showXPGain(15)
    }
    setTimeout(() => {
      setSelected(null)
      setIndex(i => i + 1)
    }, 1200)
  }

  if (isFinished) {
    return (
      <div className="text-center py-12">
        <AnimationLayer />
        <div className="text-8xl mb-6">{score >= availableQuestions.length * 0.6 ? '🏆' : '💪'}</div>
        <h2 className="text-2xl mb-2 text-theme">Hockey-Quiz fertig!</h2>
        <p className="text-xl font-bold text-primary mb-2 font-body">{score}/{availableQuestions.length}</p>
        <p className="text-sm text-secondary mb-4 font-body">
          {availableQuestions.length < HOCKEY_QUIZ_QUESTIONS.length
            ? `${HOCKEY_QUIZ_QUESTIONS.length - availableQuestions.length} weitere Fragen bei hoeherem Rang`
            : 'Alle Fragen freigeschaltet!'}
        </p>
        <Button onClick={onBack}>Zurueck</Button>
      </div>
    )
  }

  const q = availableQuestions[index]
  const options = [...q.a, ...q.wrong].sort(() => Math.random() - 0.5)

  return (
    <div className="max-w-3xl mx-auto">
      <AnimationLayer />
      <Button variant="ghost" size="sm" onClick={onBack}>← Zurueck</Button>
      <p className="text-xs text-secondary text-center mt-2 font-body">
        Frage {index + 1} / {availableQuestions.length}
      </p>
      <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-2">
        <Card className="mb-4">
          <p className="text-lg font-bold text-theme font-body">{q.q}</p>
        </Card>
        <div className="grid grid-cols-1 gap-2">
          {options.map(opt => {
            let cls = 'bg-card border-2 border-primary/20 text-theme'
            if (selected) {
              if (q.a.includes(opt)) cls = 'bg-[var(--color-success)]/20 border-2 border-[var(--color-success)]'
              else if (opt === selected) cls = 'bg-[var(--color-danger)]/20 border-2 border-[var(--color-danger)]'
            }
            return (
              <motion.button
                key={opt}
                whileTap={!selected ? { scale: 0.97 } : {}}
                onClick={() => handleSelect(opt)}
                disabled={!!selected}
                className={`p-4 sm:p-5 rounded-xl font-bold text-base sm:text-lg cursor-pointer disabled:cursor-default transition-all font-body ${cls}`}
              >
                {opt}
              </motion.button>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
