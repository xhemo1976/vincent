import { useState } from 'react'
import { motion } from 'framer-motion'
import { VOCAB_TOPICS, VOCAB_WORDS, type VocabWord } from './vocabData'
import GrammarMode from './GrammarMode'
import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'
import { ComboCounter } from '../../../shared/components/ComboCounter'
import { useXPStore } from '../../../shared/stores/xpStore'
import { useCoinsStore } from '../../../shared/stores/coinsStore'
import { useComboStore } from '../../../shared/stores/comboStore'
import { useSRSStore } from '../../../shared/stores/srsStore'
import { useRewardAnimations } from '../../../shared/components/RewardAnimation'
import { playCorrect, playWrong } from '../../../shared/utils/sounds'

type Mode = 'menu' | 'flashcards' | 'fillblank' | 'match' | 'review' | 'grammar'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function EnglishPage() {
  const [mode, setMode] = useState<Mode>('menu')
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  if (mode === 'menu') {
    return <TopicMenu onSelect={(topic, mode) => { setSelectedTopic(topic); setMode(mode) }} />
  }

  const words = selectedTopic
    ? VOCAB_WORDS.filter((w) => w.topic === selectedTopic)
    : VOCAB_WORDS

  if (mode === 'grammar') return <GrammarMode onBack={() => setMode('menu')} />
  if (mode === 'review') return <SRSReviewMode onBack={() => setMode('menu')} />
  if (mode === 'flashcards') return <FlashCardMode words={words} onBack={() => setMode('menu')} />
  if (mode === 'fillblank') return <FillBlankMode words={words} onBack={() => setMode('menu')} />
  if (mode === 'match') return <MatchMode words={words} onBack={() => setMode('menu')} />

  return null
}

function TopicMenu({ onSelect }: { onSelect: (topic: string | null, mode: Mode) => void }) {
  const { getDueCount, getRetention } = useSRSStore()
  const dueCount = getDueCount()
  const retention = getRetention()
  const learnedCount = Object.keys(useSRSStore.getState().cards).length

  return (
    <div>
      <h1 className="text-3xl mb-2 text-theme text-center neon-text">Englisch</h1>
      <p className="text-secondary text-center mb-6 font-body">Die Sprache der Alten</p>

      {/* SRS Review Card */}
      {learnedCount > 0 && (
        <Card
          hoverable
          glow={dueCount > 0}
          onClick={() => onSelect(null, 'review')}
          className="mb-6 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-title text-lg text-theme">Vokabel-Review</h3>
              <p className="text-xs text-secondary font-body">
                {dueCount > 0
                  ? `${dueCount} Vokabeln faellig!`
                  : 'Alle Vokabeln wiederholt'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-title text-primary neon-text">{retention}%</div>
              <div className="text-[10px] text-secondary font-body">Merkrate</div>
            </div>
          </div>
          {/* Retention bar */}
          <div className="mt-3 h-2 rounded-full overflow-hidden bg-primary/10">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${retention}%` }}
              style={{
                backgroundColor: retention > 80 ? 'var(--color-success)' : retention > 50 ? 'var(--color-warning)' : 'var(--color-danger)',
              }}
            />
          </div>
          {dueCount > 0 && (
            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-xs text-white font-bold animate-neon-pulse">
              {dueCount}
            </div>
          )}
        </Card>
      )}

      <h2 className="text-xl mb-3 text-theme">Themen</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {VOCAB_TOPICS.map((topic) => (
          <Card key={topic.id} hoverable onClick={() => onSelect(topic.id, 'flashcards')}>
            <div className="text-5xl mb-2">{topic.emoji}</div>
            <div className="font-bold text-sm text-theme font-body">{topic.name}</div>
            <div className="text-xs text-secondary font-body">
              {VOCAB_WORDS.filter((w) => w.topic === topic.id).length} Woerter
            </div>
          </Card>
        ))}
      </div>

      <h2 className="text-xl mb-3 text-theme">Uebungsmodi</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card hoverable onClick={() => onSelect(null, 'flashcards')}>
          <div className="text-5xl mb-2">🃏</div>
          <div className="font-bold text-sm text-theme font-body">Karteikarten</div>
          <div className="text-xs text-secondary font-body">Alle Vokabeln flippen</div>
        </Card>
        <Card hoverable onClick={() => onSelect(null, 'fillblank')}>
          <div className="text-5xl mb-2">📝</div>
          <div className="font-bold text-sm text-theme font-body">Lueckentext</div>
          <div className="text-xs text-secondary font-body">Waehle das richtige Wort</div>
        </Card>
        <Card hoverable onClick={() => onSelect(null, 'match')}>
          <div className="text-5xl mb-2">🔗</div>
          <div className="font-bold text-sm text-theme font-body">Zuordnung</div>
          <div className="text-xs text-secondary font-body">Paare finden</div>
        </Card>
        <Card hoverable glow onClick={() => onSelect(null, 'grammar')}>
          <div className="text-5xl mb-2">📐</div>
          <div className="font-bold text-sm text-theme font-body">Grammatik</div>
          <div className="text-xs text-secondary font-body">Saetze vervollstaendigen</div>
        </Card>
      </div>
    </div>
  )
}

// SM-2 based review mode
function SRSReviewMode({ onBack }: { onBack: () => void }) {
  const { getDueCardsList, review } = useSRSStore()
  const dueCards = useState(() => getDueCardsList())[0]
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [reviewed, setReviewed] = useState(0)

  const { addXP } = useXPStore()
  const { addCoins } = useCoinsStore()
  const { increment, reset: resetCombo } = useComboStore()
  const { showXPGain, AnimationLayer } = useRewardAnimations()

  const isFinished = index >= dueCards.length

  if (dueCards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-8xl mb-6">✨</div>
        <h2 className="text-2xl mb-2 text-theme">Alles wiederholt!</h2>
        <p className="text-secondary mb-6 font-body">
          Keine Vokabeln faellig. Komm spaeter wieder!
        </p>
        <Button onClick={onBack}>Zurueck</Button>
      </div>
    )
  }

  const currentCard = dueCards[index]
  const word = VOCAB_WORDS.find((w) => w.id === currentCard?.id)

  if (isFinished || !word) {
    return (
      <div className="text-center py-12">
        <AnimationLayer />
        <div className="text-8xl mb-6">🧠</div>
        <h2 className="text-2xl mb-2 text-theme neon-text">Review fertig!</h2>
        <p className="text-secondary mb-6 font-body">
          {reviewed} Vokabeln wiederholt
        </p>
        <Button onClick={onBack}>Zurueck zum Menu</Button>
      </div>
    )
  }

  const handleQuality = (quality: number) => {
    review(currentCard.id, quality)
    setReviewed((r) => r + 1)

    if (quality >= 3) {
      increment()
      addXP(quality >= 4 ? 8 : 5)
      addCoins('bronze', 1)
      showXPGain(quality >= 4 ? 8 : 5)
      playCorrect()
    } else {
      resetCombo()
      playWrong()
    }

    setFlipped(false)
    setIndex((i) => i + 1)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <AnimationLayer />
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>← Zurueck</Button>
        <ComboCounter />
        <span className="text-sm text-secondary font-body">{index + 1}/{dueCards.length}</span>
      </div>

      <motion.div
        key={index}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="perspective-[600px]"
      >
        <motion.div
          onClick={() => setFlipped(!flipped)}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.4 }}
          className="relative h-48 cursor-pointer"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 glass neon-border rounded-2xl flex items-center justify-center p-6"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-primary font-body neon-text">{word.en}</div>
              <div className="text-sm text-secondary mt-2 font-body">Tippe zum Umdrehen</div>
              {currentCard.repetitions > 0 && (
                <div className="text-xs text-secondary mt-1 font-body">
                  Wiederholung #{currentCard.repetitions + 1}
                </div>
              )}
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 bg-primary rounded-2xl neon-glow flex items-center justify-center p-6"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="text-center text-white">
              <div className="text-3xl font-bold font-body">{word.de}</div>
              {word.example && (
                <div className="text-sm mt-2 opacity-80 font-body">{word.example}</div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {flipped && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-2"
        >
          <p className="text-xs text-center text-secondary font-body mb-2">Wie gut wusstest du es?</p>
          <div className="grid grid-cols-4 gap-2">
            <Button variant="danger" size="sm" onClick={() => handleQuality(1)}>
              Vergessen
            </Button>
            <Button variant="secondary" size="sm" onClick={() => handleQuality(3)}>
              Schwer
            </Button>
            <Button variant="secondary" size="sm" onClick={() => handleQuality(4)}>
              Gut
            </Button>
            <Button size="sm" onClick={() => handleQuality(5)}>
              Leicht!
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

function FlashCardMode({ words, onBack }: { words: VocabWord[]; onBack: () => void }) {
  const shuffled = useState(() => shuffle(words))[0]
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState(0)

  const { addXP } = useXPStore()
  const { addCoins } = useCoinsStore()
  const { increment, reset: resetCombo } = useComboStore()
  const { review } = useSRSStore()
  const { showXPGain, AnimationLayer } = useRewardAnimations()

  const word = shuffled[index]
  const isFinished = index >= shuffled.length

  const handleAnswer = (correct: boolean) => {
    // Track in SRS
    review(word.id, correct ? 4 : 1)

    if (correct) {
      setKnown((k) => k + 1)
      increment()
      addXP(5)
      addCoins('bronze', 1)
      showXPGain(5)
      playCorrect()
    } else {
      resetCombo()
      playWrong()
    }
    setFlipped(false)
    setIndex((i) => i + 1)
  }

  if (isFinished) {
    return (
      <div className="text-center py-12">
        <AnimationLayer />
        <div className="text-8xl mb-6">🎉</div>
        <h2 className="text-2xl mb-2 text-theme">Fertig!</h2>
        <p className="text-secondary mb-6 font-body">
          {known} von {shuffled.length} gewusst!
        </p>
        <Button onClick={onBack}>Zurueck zum Menu</Button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <AnimationLayer />
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>← Zurueck</Button>
        <ComboCounter />
        <span className="text-sm text-secondary font-body">{index + 1}/{shuffled.length}</span>
      </div>

      <motion.div
        key={index}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="perspective-[600px]"
      >
        <motion.div
          onClick={() => setFlipped(!flipped)}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.4 }}
          className="relative h-48 cursor-pointer"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="absolute inset-0 glass neon-border rounded-2xl flex items-center justify-center p-6"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-primary font-body neon-text">{word.en}</div>
              <div className="text-sm text-secondary mt-2 font-body">Tippe zum Umdrehen</div>
            </div>
          </div>

          <div
            className="absolute inset-0 bg-primary rounded-2xl neon-glow flex items-center justify-center p-6"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="text-center text-white">
              <div className="text-3xl font-bold font-body">{word.de}</div>
              {word.example && (
                <div className="text-sm mt-2 opacity-80 font-body">{word.example}</div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {flipped && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 mt-6 justify-center"
        >
          <Button variant="danger" onClick={() => handleAnswer(false)}>
            Nicht gewusst
          </Button>
          <Button onClick={() => handleAnswer(true)}>
            Gewusst!
          </Button>
        </motion.div>
      )}
    </div>
  )
}

function FillBlankMode({ words, onBack }: { words: VocabWord[]; onBack: () => void }) {
  const questions = useState(() => {
    const shuffled = shuffle(words).slice(0, 10)
    return shuffled.map((word) => {
      const wrongAnswers = shuffle(words.filter((w) => w.id !== word.id)).slice(0, 3)
      const options = shuffle([word, ...wrongAnswers])
      return { word, options }
    })
  })[0]

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  const { addXP } = useXPStore()
  const { addCoins } = useCoinsStore()
  const { increment, reset: resetCombo } = useComboStore()
  const { review } = useSRSStore()
  const { showXPGain, AnimationLayer } = useRewardAnimations()

  const isFinished = index >= questions.length

  const handleSelect = (optionId: string) => {
    if (selected) return
    setSelected(optionId)
    const correct = optionId === questions[index].word.id
    review(questions[index].word.id, correct ? 4 : 1)
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
      setIndex((i) => i + 1)
    }, 1200)
  }

  if (isFinished) {
    return (
      <div className="text-center py-12">
        <AnimationLayer />
        <div className="text-8xl mb-6">{score >= 8 ? '🏆' : score >= 5 ? '👍' : '💪'}</div>
        <h2 className="text-2xl mb-2 text-theme">Ergebnis</h2>
        <p className="text-secondary mb-6 font-body">
          {score} von {questions.length} richtig!
        </p>
        <Button onClick={onBack}>Zurueck zum Menu</Button>
      </div>
    )
  }

  const q = questions[index]

  return (
    <div className="max-w-3xl mx-auto">
      <AnimationLayer />
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>← Zurueck</Button>
        <ComboCounter />
        <span className="text-sm text-secondary font-body">{index + 1}/{questions.length}</span>
      </div>

      <motion.div key={index} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
        <Card className="mb-4 text-center" glow>
          <p className="text-sm text-secondary mb-2 font-body">Was bedeutet...</p>
          <p className="text-2xl font-bold text-primary font-body neon-text">{q.word.en}</p>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          {q.options.map((opt) => {
            let extraClass = ''
            if (selected) {
              if (opt.id === q.word.id) extraClass = 'neon-glow-strong !border-[var(--color-success)]'
              else if (opt.id === selected) extraClass = '!border-[var(--color-danger)]'
            }
            return (
              <motion.button
                key={opt.id}
                whileTap={!selected ? { scale: 0.95 } : {}}
                onClick={() => handleSelect(opt.id)}
                disabled={!!selected}
                className={`glass neon-border p-5 rounded-xl font-bold text-lg text-theme cursor-pointer disabled:cursor-default transition-all font-body ${extraClass}`}
              >
                {opt.de}
              </motion.button>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

function MatchMode({ words, onBack }: { words: VocabWord[]; onBack: () => void }) {
  const gameWords = useState(() => shuffle(words).slice(0, 6))[0]
  const [pairs] = useState(() => {
    const enItems = gameWords.map((w) => ({ id: `en-${w.id}`, text: w.en, wordId: w.id, type: 'en' as const }))
    const deItems = gameWords.map((w) => ({ id: `de-${w.id}`, text: w.de, wordId: w.id, type: 'de' as const }))
    return shuffle([...enItems, ...deItems])
  })
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrong, setWrong] = useState<Set<string>>(new Set())

  const { addXP } = useXPStore()
  const { addCoins } = useCoinsStore()
  const { increment, reset: resetCombo } = useComboStore()
  const { review } = useSRSStore()
  const { showXPGain, AnimationLayer } = useRewardAnimations()

  const isFinished = matched.size === gameWords.length * 2

  const handleClick = (id: string) => {
    if (matched.has(id) || wrong.has(id)) return

    if (!selectedId) {
      setSelectedId(id)
      return
    }

    const first = pairs.find((p) => p.id === selectedId)!
    const second = pairs.find((p) => p.id === id)!

    if (first.type === second.type) {
      setSelectedId(id)
      return
    }

    if (first.wordId === second.wordId) {
      setMatched((prev) => new Set([...prev, first.id, second.id]))
      review(first.wordId, 4)
      increment()
      addXP(15)
      addCoins('bronze', 2)
      showXPGain(15)
      playCorrect()
    } else {
      setWrong(new Set([first.id, second.id]))
      resetCombo()
      playWrong()
      setTimeout(() => setWrong(new Set()), 800)
    }
    setSelectedId(null)
  }

  if (isFinished) {
    return (
      <div className="text-center py-12">
        <AnimationLayer />
        <div className="text-8xl mb-6">🎊</div>
        <h2 className="text-2xl mb-2 text-theme neon-text">Alle Paare gefunden!</h2>
        <Button onClick={onBack} className="mt-4">Zurueck zum Menu</Button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <AnimationLayer />
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>← Zurueck</Button>
        <ComboCounter />
      </div>
      <p className="text-center text-secondary mb-4 font-body">Finde die passenden Paare!</p>
      <div className="grid grid-cols-3 gap-2">
        {pairs.map((p) => {
          const isMatched = matched.has(p.id)
          const isSelected = selectedId === p.id
          const isWrong = wrong.has(p.id)
          return (
            <motion.button
              key={p.id}
              whileTap={!isMatched ? { scale: 0.95 } : {}}
              animate={isWrong ? { x: [0, -5, 5, -5, 0] } : {}}
              onClick={() => handleClick(p.id)}
              disabled={isMatched}
              className={`p-3 rounded-xl text-sm font-bold cursor-pointer transition-all font-body ${
                isMatched
                  ? 'bg-[var(--color-success)]/20 text-[var(--color-success)] scale-95 neon-glow'
                  : isSelected
                  ? 'bg-primary text-white neon-glow-strong'
                  : isWrong
                  ? 'bg-[var(--color-danger)]/20 border-[var(--color-danger)]'
                  : 'glass neon-border text-theme'
              }`}
            >
              {p.text}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
