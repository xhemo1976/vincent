import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'
import { ComboCounter } from '../../../shared/components/ComboCounter'
import { useXPStore } from '../../../shared/stores/xpStore'
import { useCoinsStore } from '../../../shared/stores/coinsStore'
import { useComboStore } from '../../../shared/stores/comboStore'
import { useRewardAnimations } from '../../../shared/components/RewardAnimation'

type Mode = 'menu' | 'rooms' | 'flashcards' | 'sequence'

interface MemoryItem {
  id: string
  front: string
  back: string
  room: string
  emoji: string
}

const ROOMS = [
  { id: 'vocab', name: 'Vokabel-Raum', emoji: '📚', color: '#378ADD' },
  { id: 'formulas', name: 'Formel-Raum', emoji: '🔬', color: '#1D9E75' },
  { id: 'facts', name: 'Fakten-Raum', emoji: '🌍', color: '#D85A30' },
]

const MEMORY_ITEMS: MemoryItem[] = [
  // Vocab room
  { id: 'v1', front: 'dog', back: 'Hund', room: 'vocab', emoji: '🐕' },
  { id: 'v2', front: 'cat', back: 'Katze', room: 'vocab', emoji: '🐱' },
  { id: 'v3', front: 'house', back: 'Haus', room: 'vocab', emoji: '🏠' },
  { id: 'v4', front: 'tree', back: 'Baum', room: 'vocab', emoji: '🌳' },
  { id: 'v5', front: 'sun', back: 'Sonne', room: 'vocab', emoji: '☀️' },
  { id: 'v6', front: 'moon', back: 'Mond', room: 'vocab', emoji: '🌙' },
  { id: 'v7', front: 'water', back: 'Wasser', room: 'vocab', emoji: '💧' },
  { id: 'v8', front: 'fire', back: 'Feuer', room: 'vocab', emoji: '🔥' },

  // Formula room
  { id: 'f1', front: 'Fläche Rechteck', back: 'Länge × Breite', room: 'formulas', emoji: '📐' },
  { id: 'f2', front: 'Umfang Rechteck', back: '2 × (Länge + Breite)', room: 'formulas', emoji: '📏' },
  { id: 'f3', front: 'Fläche Dreieck', back: '(Grundseite × Höhe) / 2', room: 'formulas', emoji: '📐' },
  { id: 'f4', front: '10% berechnen', back: 'Zahl ÷ 10', room: 'formulas', emoji: '💯' },
  { id: 'f5', front: 'Fläche Quadrat', back: 'Seite × Seite', room: 'formulas', emoji: '⬜' },
  { id: 'f6', front: 'Durchschnitt', back: 'Summe ÷ Anzahl', room: 'formulas', emoji: '📊' },

  // Facts room
  { id: 'fa1', front: 'Größtes Tier', back: 'Blauwal', room: 'facts', emoji: '🐋' },
  { id: 'fa2', front: 'Anzahl Planeten', back: '8 Planeten', room: 'facts', emoji: '🪐' },
  { id: 'fa3', front: 'Höchster Berg', back: 'Mount Everest (8.849m)', room: 'facts', emoji: '🏔️' },
  { id: 'fa4', front: 'Schnellstes Tier', back: 'Gepard (120 km/h)', room: 'facts', emoji: '🐆' },
  { id: 'fa5', front: 'Größter Ozean', back: 'Pazifischer Ozean', room: 'facts', emoji: '🌊' },
  { id: 'fa6', front: 'Hauptstadt Deutschland', back: 'Berlin', room: 'facts', emoji: '🇩🇪' },
]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function MemoryPage() {
  const [mode, setMode] = useState<Mode>('menu')
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)

  if (mode === 'menu') {
    return (
      <div>
        <h1 className="text-3xl mb-2 text-theme text-center">🧠 Gedächtnis-Palast</h1>
        <p className="text-secondary text-center mb-6 font-body">
          Betrete deine Räume und trainiere dein Gedächtnis!
        </p>

        <h2 className="text-xl mb-3 text-theme">Räume</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {ROOMS.map((room) => (
            <Card
              key={room.id}
              hoverable
              onClick={() => { setSelectedRoom(room.id); setMode('rooms') }}
            >
              <div className="text-6xl mb-3">{room.emoji}</div>
              <div className="font-bold text-theme font-body">{room.name}</div>
              <div className="text-xs text-secondary font-body">
                {MEMORY_ITEMS.filter((i) => i.room === room.id).length} Items
              </div>
            </Card>
          ))}
        </div>

        <h2 className="text-xl mb-3 text-theme">Übungen</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card hoverable onClick={() => setMode('flashcards')}>
            <div className="text-3xl mb-1">🃏</div>
            <div className="font-bold text-sm text-theme font-body">Karteikarten</div>
          </Card>
          <Card hoverable onClick={() => setMode('sequence')}>
            <div className="text-3xl mb-1">🔢</div>
            <div className="font-bold text-sm text-theme font-body">Reihenfolge merken</div>
          </Card>
        </div>
      </div>
    )
  }

  if (mode === 'rooms' && selectedRoom) {
    return <RoomView roomId={selectedRoom} onBack={() => setMode('menu')} />
  }

  if (mode === 'flashcards') {
    return <FlashcardReview onBack={() => setMode('menu')} />
  }

  if (mode === 'sequence') {
    return <SequenceGame onBack={() => setMode('menu')} />
  }

  return null
}

function RoomView({ roomId, onBack }: { roomId: string; onBack: () => void }) {
  const room = ROOMS.find((r) => r.id === roomId)!
  const items = MEMORY_ITEMS.filter((i) => i.room === roomId)
  const [revealedId, setRevealedId] = useState<string | null>(null)

  return (
    <div className="max-w-3xl mx-auto">
      <Button variant="ghost" size="sm" onClick={onBack}>← Zurück</Button>
      <h2 className="text-2xl mt-4 mb-4 text-theme text-center">
        {room.emoji} {room.name}
      </h2>
      <p className="text-sm text-secondary text-center mb-6 font-body">
        Tippe auf einen Gegenstand, um die Antwort zu sehen!
      </p>

      <div className="grid grid-cols-2 gap-3">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card
              hoverable
              onClick={() => setRevealedId(revealedId === item.id ? null : item.id)}
              className="text-center min-h-[100px] flex flex-col items-center justify-center"
            >
              <div className="text-3xl mb-1">{item.emoji}</div>
              <div className="font-bold text-sm text-theme font-body">{item.front}</div>
              <AnimatePresence>
                {revealedId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="text-xs text-primary font-bold mt-1 font-body"
                  >
                    → {item.back}
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function FlashcardReview({ onBack }: { onBack: () => void }) {
  const cards = useState(() => shuffle(MEMORY_ITEMS))[0]
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [score, setScore] = useState(0)

  const { addXP } = useXPStore()
  const { addCoins } = useCoinsStore()
  const { increment, reset: resetCombo } = useComboStore()
  const { showXPGain, AnimationLayer } = useRewardAnimations()

  const isFinished = index >= cards.length

  const handleAnswer = (knew: boolean) => {
    if (knew) {
      setScore((s) => s + 1)
      increment()
      addXP(5)
      addCoins('bronze', 1)
      showXPGain(5)
    } else {
      resetCombo()
    }
    setFlipped(false)
    setIndex((i) => i + 1)
  }

  if (isFinished) {
    return (
      <div className="text-center py-12">
        <AnimationLayer />
        <div className="text-8xl mb-6">🎉</div>
        <h2 className="text-2xl mb-2 text-theme">Alle Karten durch!</h2>
        <p className="text-secondary mb-4 font-body">{score} von {cards.length} gewusst</p>
        <Button onClick={onBack}>Zurück</Button>
      </div>
    )
  }

  const card = cards[index]

  return (
    <div className="max-w-3xl mx-auto">
      <AnimationLayer />
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>← Zurück</Button>
        <ComboCounter />
        <span className="text-sm text-secondary font-body">{index + 1}/{cards.length}</span>
      </div>

      <motion.div key={index} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
        <Card
          className="text-center min-h-[180px] flex flex-col items-center justify-center cursor-pointer"
          onClick={() => setFlipped(!flipped)}
          hoverable
        >
          <div className="text-6xl mb-3">{card.emoji}</div>
          {!flipped ? (
            <>
              <div className="text-2xl font-bold text-theme font-body">{card.front}</div>
              <div className="text-xs text-secondary mt-2 font-body">Tippe zum Umdrehen</div>
            </>
          ) : (
            <motion.div initial={{ rotateX: 90 }} animate={{ rotateX: 0 }}>
              <div className="text-2xl font-bold text-primary font-body">{card.back}</div>
            </motion.div>
          )}
        </Card>
      </motion.div>

      {flipped && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 mt-4 justify-center"
        >
          <Button variant="danger" onClick={() => handleAnswer(false)}>
            Nicht gewusst ❌
          </Button>
          <Button onClick={() => handleAnswer(true)}>
            Gewusst! ✅
          </Button>
        </motion.div>
      )}
    </div>
  )
}

function SequenceGame({ onBack }: { onBack: () => void }) {
  const [sequence, setSequence] = useState<string[]>([])
  const [userSequence, setUserSequence] = useState<string[]>([])
  const [phase, setPhase] = useState<'showing' | 'input' | 'result'>('showing')
  const [level, setLevel] = useState(3)
  const [showIndex, setShowIndex] = useState(0)
  const emojis = ['🐕', '🐱', '🏠', '🌳', '☀️', '🌙', '💧', '🔥', '⭐', '🎵']

  const { addXP } = useXPStore()
  const { showXPGain, AnimationLayer } = useRewardAnimations()

  const startRound = () => {
    const seq = []
    for (let i = 0; i < level; i++) {
      seq.push(emojis[Math.floor(Math.random() * emojis.length)])
    }
    setSequence(seq)
    setUserSequence([])
    setPhase('showing')
    setShowIndex(0)

    // Animate showing
    let idx = 0
    const interval = setInterval(() => {
      idx++
      setShowIndex(idx)
      if (idx >= seq.length) {
        clearInterval(interval)
        setTimeout(() => setPhase('input'), 800)
      }
    }, 800)
  }

  const handleEmojiClick = (emoji: string) => {
    if (phase !== 'input') return
    const newSeq = [...userSequence, emoji]
    setUserSequence(newSeq)

    if (newSeq.length === sequence.length) {
      const correct = newSeq.every((e, i) => e === sequence[i])
      if (correct) {
        addXP(level * 5)
        showXPGain(level * 5)
        setLevel((l) => l + 1)
      }
      setPhase('result')
    }
  }

  // Start first round
  if (sequence.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center">
        <AnimationLayer />
        <Button variant="ghost" size="sm" onClick={onBack}>← Zurück</Button>
        <h2 className="text-2xl mt-8 mb-4 text-theme">🔢 Reihenfolge merken</h2>
        <p className="text-secondary mb-6 font-body">
          Merke dir die Reihenfolge der Symbole und gib sie wieder ein!
        </p>
        <p className="text-sm text-secondary mb-4 font-body">Level: {level} Symbole</p>
        <Button onClick={startRound}>Start!</Button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto text-center">
      <AnimationLayer />
      <Button variant="ghost" size="sm" onClick={onBack}>← Zurück</Button>
      <p className="text-sm text-secondary mt-4 mb-2 font-body">Level {level}</p>

      {/* Display area */}
      <div className="min-h-[80px] flex items-center justify-center gap-2 mb-4">
        {phase === 'showing' && sequence.map((emoji, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={i < showIndex ? { scale: 1 } : { scale: 0 }}
            className="text-4xl"
          >
            {emoji}
          </motion.div>
        ))}
        {phase === 'input' && (
          <div className="flex gap-2">
            {sequence.map((_, i) => (
              <div
                key={i}
                className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl ${
                  i < userSequence.length
                    ? 'border-primary bg-primary/10'
                    : 'border-primary/20'
                }`}
              >
                {userSequence[i] || '?'}
              </div>
            ))}
          </div>
        )}
        {phase === 'result' && (
          <div>
            {userSequence.every((e, i) => e === sequence[i]) ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-4xl">
                🎉 Richtig!
              </motion.div>
            ) : (
              <div>
                <div className="text-2xl mb-2">❌ Leider falsch</div>
                <div className="text-sm text-secondary font-body">
                  Richtig: {sequence.join(' ')}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input grid */}
      {phase === 'input' && (
        <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
          {emojis.map((emoji) => (
            <motion.button
              key={emoji}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleEmojiClick(emoji)}
              className="text-3xl p-2 rounded-xl bg-card border-2 border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors"
            >
              {emoji}
            </motion.button>
          ))}
        </div>
      )}

      {phase === 'result' && (
        <div className="flex gap-3 justify-center mt-4">
          <Button variant="secondary" onClick={onBack}>Beenden</Button>
          <Button onClick={startRound}>Nächste Runde!</Button>
        </div>
      )}
    </div>
  )
}
