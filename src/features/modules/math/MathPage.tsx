import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'
import { ComboCounter } from '../../../shared/components/ComboCounter'
import { ProgressBar } from '../../../shared/components/ProgressBar'
import { useXPStore } from '../../../shared/stores/xpStore'
import { useCoinsStore } from '../../../shared/stores/coinsStore'
import { useComboStore } from '../../../shared/stores/comboStore'
import { useDifficultyStore } from '../../../shared/stores/difficultyStore'
import { getDifficultyLabel, getDifficultyColor } from '../../../shared/utils/adaptiveDifficulty'
import { useRewardAnimations } from '../../../shared/components/RewardAnimation'
import { playCorrect, playWrong } from '../../../shared/utils/sounds'
import { generateProblem, type Difficulty } from './mathProblems'

type Mode = 'menu' | 'practice'

export default function MathPage() {
  const [mode, setMode] = useState<Mode>('menu')
  const [grade, setGrade] = useState<Difficulty>('5')
  const { getDifficulty, getAccuracy } = useDifficultyStore()

  if (mode === 'menu') {
    const mathDiff5 = getDifficulty('math-5')
    const mathDiff6 = getDifficulty('math-6')
    const acc5 = getAccuracy('math-5')
    const acc6 = getAccuracy('math-6')

    return (
      <div>
        <h1 className="text-3xl mb-2 text-theme text-center neon-text">Mathe</h1>
        <p className="text-secondary text-center mb-6 font-body">Logik-Jutsu</p>
        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
          <Card hoverable onClick={() => { setGrade('5'); setMode('practice') }}>
            <div className="text-6xl mb-3">5</div>
            <div className="font-bold text-theme font-body">Klasse 5</div>
            <div className="text-xs text-secondary font-body mb-2">
              Grundrechenarten, Brueche
            </div>
            {acc5 > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <div
                  className="text-xs font-bold px-2 py-0.5 rounded-full font-body"
                  style={{ color: getDifficultyColor(mathDiff5), border: `1px solid ${getDifficultyColor(mathDiff5)}` }}
                >
                  Lv.{mathDiff5} {getDifficultyLabel(mathDiff5)}
                </div>
                <span className="text-xs text-secondary font-body">{acc5}%</span>
              </div>
            )}
          </Card>
          <Card hoverable onClick={() => { setGrade('6'); setMode('practice') }}>
            <div className="text-6xl mb-3">6</div>
            <div className="font-bold text-theme font-body">Klasse 6</div>
            <div className="text-xs text-secondary font-body mb-2">
              Prozente, Neg. Zahlen, Flaechen
            </div>
            {acc6 > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <div
                  className="text-xs font-bold px-2 py-0.5 rounded-full font-body"
                  style={{ color: getDifficultyColor(mathDiff6), border: `1px solid ${getDifficultyColor(mathDiff6)}` }}
                >
                  Lv.{mathDiff6} {getDifficultyLabel(mathDiff6)}
                </div>
                <span className="text-xs text-secondary font-body">{acc6}%</span>
              </div>
            )}
          </Card>
        </div>
      </div>
    )
  }

  return <MathPractice grade={grade} onBack={() => setMode('menu')} />
}

function MathPractice({ grade, onBack }: { grade: Difficulty; onBack: () => void }) {
  const totalProblems = 10
  const topicKey = `math-${grade}`
  const { record, getDifficulty } = useDifficultyStore()
  const diffLevel = getDifficulty(topicKey)

  const [problemIndex, setProblemIndex] = useState(0)
  const [problem, setProblem] = useState(() => generateProblem(grade, diffLevel))
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  const { addXP } = useXPStore()
  const { addCoins } = useCoinsStore()
  const { increment, reset: resetCombo } = useComboStore()
  const { showXPGain, AnimationLayer } = useRewardAnimations()

  const isFinished = problemIndex >= totalProblems
  const currentDiff = getDifficulty(topicKey)

  const handleSelect = useCallback((value: number) => {
    if (selected !== null) return
    setSelected(value)
    const correct = value === problem.answer
    record(topicKey, correct)
    if (correct) {
      setScore((s) => s + 1)
      increment()
      addXP(10)
      addCoins('bronze', 2)
      showXPGain(10)
      playCorrect()
    } else {
      resetCombo()
      playWrong()
    }
    setTimeout(() => {
      setSelected(null)
      setProblemIndex((i) => i + 1)
      const newDiff = useDifficultyStore.getState().getDifficulty(topicKey)
      setProblem(generateProblem(grade, newDiff))
    }, 1000)
  }, [selected, problem.answer, grade, topicKey, increment, resetCombo, addXP, addCoins, showXPGain, record])

  if (isFinished) {
    const stars = score >= 9 ? 3 : score >= 7 ? 2 : score >= 5 ? 1 : 0
    return (
      <div className="text-center py-12">
        <AnimationLayer />
        <div className="text-8xl mb-6">
          {stars === 3 ? '🏆' : stars === 2 ? '⭐' : stars === 1 ? '👍' : '💪'}
        </div>
        <h2 className="text-2xl mb-2 text-theme">Ergebnis</h2>
        <p className="text-xl text-primary font-bold mb-2 font-body neon-text">
          {score} / {totalProblems}
        </p>
        <div className="text-2xl mb-4">{'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}</div>
        <div
          className="text-sm font-body mb-6 px-3 py-1 rounded-full inline-block"
          style={{ color: getDifficultyColor(currentDiff), border: `1px solid ${getDifficultyColor(currentDiff)}` }}
        >
          Schwierigkeit: Lv.{currentDiff} {getDifficultyLabel(currentDiff)}
        </div>
        <div className="flex gap-3 justify-center">
          <Button variant="secondary" onClick={onBack}>Zurueck</Button>
          <Button onClick={() => {
            setProblemIndex(0)
            setScore(0)
            setProblem(generateProblem(grade, currentDiff))
          }}>
            Nochmal!
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <AnimationLayer />
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>← Zurueck</Button>
        <ComboCounter />
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full font-body"
            style={{ color: getDifficultyColor(currentDiff), border: `1px solid ${getDifficultyColor(currentDiff)}` }}
          >
            Lv.{currentDiff}
          </span>
          <span className="text-sm text-secondary font-body">Kl.{grade}</span>
        </div>
      </div>

      <ProgressBar value={problemIndex} max={totalProblems} className="mb-4" />

      <motion.div
        key={problemIndex}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Card className="mb-4 text-center" glow>
          <div className="text-xs text-secondary mb-2 font-body">{problem.category}</div>
          <div className="text-2xl font-bold text-theme whitespace-pre-line font-body">
            {problem.question}
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          {problem.options.map((opt, i) => {
            let extraClass = ''
            if (selected !== null) {
              if (opt === problem.answer) extraClass = 'neon-glow-strong !border-[var(--color-success)]'
              else if (opt === selected) extraClass = '!border-[var(--color-danger)]'
            }
            return (
              <motion.button
                key={i}
                whileTap={selected === null ? { scale: 0.95 } : {}}
                onClick={() => handleSelect(opt)}
                disabled={selected !== null}
                className={`glass neon-border p-5 rounded-xl font-bold text-xl text-theme cursor-pointer disabled:cursor-default transition-all font-body ${extraClass}`}
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
