import { useState } from 'react'
import { motion } from 'framer-motion'
import { GRAMMAR_EXERCISES, GRAMMAR_CATEGORIES } from './grammarData'
import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'
import { ComboCounter } from '../../../shared/components/ComboCounter'
import { ProgressBar } from '../../../shared/components/ProgressBar'
import { useXPStore } from '../../../shared/stores/xpStore'
import { useCoinsStore } from '../../../shared/stores/coinsStore'
import { useComboStore } from '../../../shared/stores/comboStore'
import { useRewardAnimations } from '../../../shared/components/RewardAnimation'
import { playCorrect, playWrong } from '../../../shared/utils/sounds'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type GrammarView = 'categories' | 'practice'

export default function GrammarMode({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<GrammarView>('categories')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  if (view === 'categories') {
    return (
      <div>
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
          ← Zurueck
        </Button>
        <h2 className="text-2xl mb-2 text-theme text-center neon-text">Grammatik</h2>
        <p className="text-secondary text-center mb-6 font-body">Waehle ein Thema</p>

        <div className="grid grid-cols-2 gap-3">
          {GRAMMAR_CATEGORIES.map((cat) => {
            const count = GRAMMAR_EXERCISES.filter((e) => e.category === cat.id).length
            return (
              <Card
                key={cat.id}
                hoverable
                onClick={() => {
                  setSelectedCategory(cat.id)
                  setView('practice')
                }}
              >
                <div className="text-3xl mb-1">{cat.emoji}</div>
                <div className="font-bold text-sm text-theme font-body">{cat.name}</div>
                <div className="text-xs text-secondary font-body">{count} Uebungen</div>
              </Card>
            )
          })}

          <Card
            hoverable
            glow
            onClick={() => {
              setSelectedCategory(null)
              setView('practice')
            }}
            className="col-span-2"
          >
            <div className="text-3xl mb-1">🎲</div>
            <div className="font-bold text-sm text-theme font-body">Zufalls-Mix</div>
            <div className="text-xs text-secondary font-body">
              10 zufaellige Uebungen aus allen Themen
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <GrammarPractice
      category={selectedCategory}
      onBack={() => setView('categories')}
    />
  )
}

function GrammarPractice({ category, onBack }: { category: string | null; onBack: () => void }) {
  const exercises = useState(() => {
    const filtered = category
      ? GRAMMAR_EXERCISES.filter((e) => e.category === category)
      : shuffle(GRAMMAR_EXERCISES).slice(0, 10)
    return shuffle(filtered)
  })[0]

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  const { addXP } = useXPStore()
  const { addCoins } = useCoinsStore()
  const { increment, reset: resetCombo } = useComboStore()
  const { showXPGain, AnimationLayer } = useRewardAnimations()

  const isFinished = index >= exercises.length

  const handleSelect = (optIndex: number) => {
    if (selected !== null) return
    setSelected(optIndex)
    const correct = optIndex === exercises[index].correctIndex
    if (correct) {
      setScore((s) => s + 1)
      increment()
      addXP(12)
      addCoins('bronze', 2)
      showXPGain(12)
      playCorrect()
    } else {
      resetCombo()
      playWrong()
    }
    setTimeout(() => {
      setSelected(null)
      setIndex((i) => i + 1)
    }, 1500)
  }

  if (isFinished) {
    const stars = score >= exercises.length * 0.9 ? 3 : score >= exercises.length * 0.7 ? 2 : score >= exercises.length * 0.5 ? 1 : 0
    return (
      <div className="text-center py-12">
        <AnimationLayer />
        <div className="text-8xl mb-6">
          {stars === 3 ? '🏆' : stars === 2 ? '⭐' : '💪'}
        </div>
        <h2 className="text-2xl mb-2 text-theme neon-text">Grammatik-Runde fertig!</h2>
        <p className="text-xl text-primary font-bold mb-2 font-body">
          {score} / {exercises.length}
        </p>
        <div className="text-2xl mb-6">{'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}</div>
        <Button onClick={onBack}>Zurueck</Button>
      </div>
    )
  }

  const ex = exercises[index]
  const parts = ex.sentence.split(ex.blank)
  const catInfo = GRAMMAR_CATEGORIES.find((c) => c.id === ex.category)

  return (
    <div className="max-w-3xl mx-auto">
      <AnimationLayer />
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>← Zurueck</Button>
        <ComboCounter />
        <span className="text-sm text-secondary font-body">{index + 1}/{exercises.length}</span>
      </div>

      <ProgressBar value={index} max={exercises.length} className="mb-4" />

      <motion.div key={index} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
        <Card className="mb-4 text-center" glow>
          {catInfo && (
            <div className="text-xs text-secondary mb-2 font-body">
              {catInfo.emoji} {catInfo.name}
            </div>
          )}
          <div className="text-xl font-bold text-theme font-body leading-relaxed">
            {parts[0]}
            <span className={`inline-block min-w-[60px] mx-1 px-2 py-0.5 rounded-lg border-2 border-dashed ${
              selected !== null
                ? selected === ex.correctIndex
                  ? 'border-[var(--color-success)] bg-[var(--color-success)]/10'
                  : 'border-[var(--color-danger)] bg-[var(--color-danger)]/10'
                : 'border-primary/40'
            }`}>
              {selected !== null ? ex.options[selected] : '?'}
            </span>
            {parts[1]}
          </div>
          {ex.hint && selected === null && (
            <div className="text-xs text-secondary mt-2 font-body">
              Tipp: {ex.hint}
            </div>
          )}
        </Card>

        <div className="grid grid-cols-2 gap-3">
          {ex.options.map((opt, i) => {
            let extraClass = ''
            if (selected !== null) {
              if (i === ex.correctIndex) extraClass = 'neon-glow-strong !border-[var(--color-success)]'
              else if (i === selected) extraClass = '!border-[var(--color-danger)]'
            }
            return (
              <motion.button
                key={i}
                whileTap={selected === null ? { scale: 0.95 } : {}}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                className={`glass neon-border p-4 rounded-xl font-bold text-lg text-theme cursor-pointer disabled:cursor-default transition-all font-body ${extraClass}`}
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
