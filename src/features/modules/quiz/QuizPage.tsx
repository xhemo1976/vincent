import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'
import { ComboCounter } from '../../../shared/components/ComboCounter'
import { ProgressBar } from '../../../shared/components/ProgressBar'
import { useXPStore } from '../../../shared/stores/xpStore'
import { useCoinsStore } from '../../../shared/stores/coinsStore'
import { useComboStore } from '../../../shared/stores/comboStore'
import { useRewardAnimations } from '../../../shared/components/RewardAnimation'
import { QUIZ_QUESTIONS } from './quizData'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type QuizMode = 'menu' | 'classic' | 'timeattack'

export default function QuizPage() {
  const [mode, setMode] = useState<QuizMode>('menu')

  if (mode === 'menu') {
    return (
      <div>
        <h1 className="text-3xl mb-2 text-theme text-center">⚔️ Quiz-Arena</h1>
        <p className="text-secondary text-center mb-6 font-body">Teste dein Wissen!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
          <Card hoverable onClick={() => setMode('classic')}>
            <div className="text-6xl mb-3">📚</div>
            <div className="font-bold text-theme font-body">Klassisch</div>
            <div className="text-xs text-secondary font-body">10 Fragen, kein Zeitdruck</div>
          </Card>
          <Card hoverable onClick={() => setMode('timeattack')}>
            <div className="text-6xl mb-3">⏱️</div>
            <div className="font-bold text-theme font-body">Zeitrennen</div>
            <div className="text-xs text-secondary font-body">30 Sekunden pro Frage!</div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <QuizGame
      timed={mode === 'timeattack'}
      onBack={() => setMode('menu')}
    />
  )
}

function QuizGame({ timed, onBack }: { timed: boolean; onBack: () => void }) {
  const questions = useState(() => shuffle(QUIZ_QUESTIONS).slice(0, 10))[0]
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)

  const { addXP } = useXPStore()
  const { addCoins } = useCoinsStore()
  const { increment, reset: resetCombo, getMultiplier } = useComboStore()
  const { showXPGain, AnimationLayer } = useRewardAnimations()

  const isFinished = index >= questions.length

  const handleNext = useCallback(() => {
    setSelected(null)
    setIndex((i) => i + 1)
    setTimeLeft(30)
  }, [])

  const handleSelect = useCallback((optIndex: number) => {
    if (selected !== null) return
    setSelected(optIndex)
    const correct = optIndex === questions[index].correctIndex
    if (correct) {
      const mult = getMultiplier()
      const xp = 15 * mult
      setScore((s) => s + 1)
      increment()
      addXP(xp)
      addCoins('bronze', 3)
      showXPGain(xp)
    } else {
      resetCombo()
    }
    setTimeout(handleNext, 1200)
  }, [selected, index, questions, increment, resetCombo, addXP, addCoins, showXPGain, getMultiplier, handleNext])

  // Timer
  useEffect(() => {
    if (!timed || isFinished || selected !== null) return
    if (timeLeft <= 0) {
      resetCombo()
      handleNext()
      return
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(timer)
  }, [timed, timeLeft, isFinished, selected, handleNext, resetCombo])

  if (isFinished) {
    const stars = score >= 9 ? 3 : score >= 7 ? 2 : score >= 4 ? 1 : 0
    return (
      <div className="text-center py-12">
        <AnimationLayer />
        <div className="text-8xl mb-6">
          {stars === 3 ? '🏆' : stars === 2 ? '⭐' : '💪'}
        </div>
        <h2 className="text-2xl mb-2 text-theme">Quiz beendet!</h2>
        <p className="text-xl text-primary font-bold mb-2 font-body">{score}/{questions.length}</p>
        <div className="text-2xl mb-6">{'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}</div>
        <Button onClick={onBack}>Zurück zur Arena</Button>
      </div>
    )
  }

  const q = questions[index]

  return (
    <div className="max-w-3xl mx-auto">
      <AnimationLayer />
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>← Zurück</Button>
        <ComboCounter />
        <span className="text-sm text-secondary font-body">{index + 1}/{questions.length}</span>
      </div>

      <ProgressBar value={index} max={questions.length} className="mb-2" />

      {timed && (
        <div className={`text-center text-sm font-bold mb-2 font-body ${timeLeft <= 10 ? 'text-[var(--color-danger)]' : 'text-secondary'}`}>
          ⏱️ {timeLeft}s
        </div>
      )}

      <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="mb-4">
          <div className="text-xs text-secondary mb-2 font-body">{q.category}</div>
          <div className="text-lg font-bold text-theme font-body">{q.question}</div>
        </Card>

        <div className={`grid ${q.type === 'truefalse' ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
          {q.options.map((opt, i) => {
            let classes = 'bg-card border-2 border-primary/20 text-theme'
            if (selected !== null) {
              if (i === q.correctIndex) classes = 'bg-[var(--color-success)]/20 border-2 border-[var(--color-success)] text-[var(--color-success)]'
              else if (i === selected) classes = 'bg-[var(--color-danger)]/20 border-2 border-[var(--color-danger)] text-[var(--color-danger)]'
            }
            return (
              <motion.button
                key={i}
                whileTap={selected === null ? { scale: 0.97 } : {}}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                className={`p-5 rounded-xl font-bold text-lg cursor-pointer disabled:cursor-default transition-all font-body ${classes}`}
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
