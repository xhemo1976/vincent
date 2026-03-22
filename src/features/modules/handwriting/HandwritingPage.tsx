import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'
import { ProgressBar } from '../../../shared/components/ProgressBar'
import { useXPStore } from '../../../shared/stores/xpStore'
import { useCoinsStore } from '../../../shared/stores/coinsStore'
import { useComboStore } from '../../../shared/stores/comboStore'
import { useRewardAnimations } from '../../../shared/components/RewardAnimation'
import { playCorrect, playWrong } from '../../../shared/utils/sounds'

type Mode = 'menu' | 'practice' | 'challenge'

interface LetterDef {
  char: string
  rune: string
  points: number[][]
}

const LETTERS: LetterDef[] = [
  { char: 'A', rune: 'Alpha-Rune', points: [[50,80],[25,20],[50,80],[75,20],[50,80],[35,55],[65,55]] },
  { char: 'B', rune: 'Beta-Rune', points: [[20,80],[20,20],[60,20],[70,35],[60,50],[20,50],[60,50],[70,65],[60,80],[20,80]] },
  { char: 'C', rune: 'Chi-Rune', points: [[70,25],[50,15],[30,25],[20,50],[30,75],[50,85],[70,75]] },
  { char: 'D', rune: 'Delta-Rune', points: [[20,80],[20,20],[50,20],[70,35],[75,50],[70,65],[50,80],[20,80]] },
  { char: 'E', rune: 'Epsilon-Rune', points: [[65,20],[20,20],[20,50],[55,50],[20,50],[20,80],[65,80]] },
  { char: 'F', rune: 'Phi-Rune', points: [[65,20],[20,20],[20,50],[55,50],[20,50],[20,80]] },
  { char: 'G', rune: 'Gamma-Rune', points: [[70,25],[50,15],[30,25],[20,50],[30,75],[50,85],[70,75],[70,55],[50,55]] },
  { char: 'H', rune: 'Eta-Rune', points: [[20,20],[20,80],[20,50],[70,50],[70,20],[70,80]] },
  { char: 'a', rune: 'Klein-Alpha', points: [[60,35],[40,30],[25,40],[25,60],[40,70],[60,65],[60,35],[60,70]] },
  { char: 'b', rune: 'Klein-Beta', points: [[25,15],[25,70],[35,80],[55,80],[65,65],[55,50],[25,50]] },
  { char: 'c', rune: 'Klein-Chi', points: [[65,35],[45,28],[30,40],[30,60],[45,72],[65,65]] },
  { char: 'd', rune: 'Klein-Delta', points: [[65,15],[65,70],[55,80],[35,80],[25,65],[35,50],[65,50]] },
]

const CHALLENGE_TIME = 15 // seconds per letter

export default function HandwritingPage() {
  const [mode, setMode] = useState<Mode>('menu')
  const [letterIndex, setLetterIndex] = useState(0)

  if (mode === 'menu') {
    return (
      <div>
        <h1 className="text-3xl mb-2 text-theme text-center neon-text">Schreibschrift</h1>
        <p className="text-secondary text-center mb-6 font-body">
          Meistere die Runen! Zeichne jeden Buchstaben nach.
        </p>

        {/* Challenge Mode Card */}
        <Card
          hoverable
          glow
          onClick={() => { setLetterIndex(0); setMode('challenge') }}
          className="mb-6 text-center"
        >
          <div className="text-4xl mb-2">🏆</div>
          <div className="font-bold text-lg text-theme font-body">Runen-Challenge</div>
          <div className="text-xs text-secondary font-body">
            {CHALLENGE_TIME}s pro Buchstabe - 90%+ = naechster Level!
          </div>
        </Card>

        <h2 className="text-xl mb-3 text-theme">Freies Ueben</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {LETTERS.map((letter, i) => (
            <Card
              key={letter.char}
              hoverable
              onClick={() => { setLetterIndex(i); setMode('practice') }}
              className="!p-3 text-center"
            >
              <div className="text-3xl font-bold text-primary font-body">{letter.char}</div>
              <div className="text-[10px] text-secondary font-body">{letter.rune}</div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (mode === 'challenge') {
    return (
      <ChallengeMode
        onBack={() => setMode('menu')}
      />
    )
  }

  return (
    <DrawingCanvas
      letter={LETTERS[letterIndex]}
      onBack={() => setMode('menu')}
      onNext={() => {
        if (letterIndex < LETTERS.length - 1) setLetterIndex(letterIndex + 1)
        else setMode('menu')
      }}
    />
  )
}

// === SCORING ===

interface Point { x: number; y: number }

function resamplePoints(points: Point[], count: number): Point[] {
  if (points.length <= 1 || count <= 1) return points
  const result: Point[] = [points[0]]

  let totalDist = 0
  for (let i = 1; i < points.length; i++) {
    totalDist += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y)
  }
  if (totalDist === 0) return Array(count).fill(points[0])

  const step = totalDist / (count - 1)
  let accDist = 0
  let j = 1

  for (let i = 1; i < count; i++) {
    const target = step * i
    while (j < points.length) {
      const segDist = Math.hypot(points[j].x - points[j - 1].x, points[j].y - points[j - 1].y)
      if (accDist + segDist >= target) {
        const t = segDist > 0 ? (target - accDist) / segDist : 0
        result.push({
          x: points[j - 1].x + t * (points[j].x - points[j - 1].x),
          y: points[j - 1].y + t * (points[j].y - points[j - 1].y),
        })
        break
      }
      accDist += segDist
      j++
    }
    if (result.length <= i) result.push(points[points.length - 1])
  }

  while (result.length < count) result.push(points[points.length - 1])
  return result
}

function calculateAccuracy(userPoints: Point[], templateRaw: number[][]): number {
  if (userPoints.length < 5) return 0

  const templatePoints = templateRaw.map((p) => ({ x: p[0], y: p[1] }))
  const sampleCount = Math.max(templatePoints.length, 20)
  const resampled = resamplePoints(userPoints, sampleCount)
  const template = resamplePoints(templatePoints, sampleCount)

  // Average distance between corresponding points
  let totalDist = 0
  for (let i = 0; i < sampleCount; i++) {
    totalDist += Math.hypot(template[i].x - resampled[i].x, template[i].y - resampled[i].y)
  }
  const avgDist = totalDist / sampleCount

  // Also check path length ratio (too short = just a dot/line)
  let userLen = 0
  for (let i = 1; i < userPoints.length; i++) {
    userLen += Math.hypot(userPoints[i].x - userPoints[i - 1].x, userPoints[i].y - userPoints[i - 1].y)
  }
  let templateLen = 0
  for (let i = 1; i < templatePoints.length; i++) {
    templateLen += Math.hypot(templatePoints[i].x - templatePoints[i - 1].x, templatePoints[i].y - templatePoints[i - 1].y)
  }
  const lenRatio = templateLen > 0 ? userLen / templateLen : 0
  const lenPenalty = lenRatio < 0.4 ? 0.3 : lenRatio < 0.7 ? 0.7 : lenRatio > 2.0 ? 0.7 : 1.0

  // Score: avgDist of 0 = 100%, avgDist of 25+ = 0%
  const rawScore = Math.max(0, Math.min(100, 100 - avgDist * 4))
  return Math.round(rawScore * lenPenalty)
}

// === DRAWING CANVAS (Practice Mode) ===

function DrawingCanvas({
  letter,
  onBack,
  onNext,
}: {
  letter: LetterDef
  onBack: () => void
  onNext: () => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [userPoints, setUserPoints] = useState<Point[]>([])
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const [hasChecked, setHasChecked] = useState(false)
  const [showGuide, setShowGuide] = useState(true)

  const { addXP } = useXPStore()
  const { addCoins } = useCoinsStore()
  const { showXPGain, AnimationLayer } = useRewardAnimations()

  const getCanvasPoint = (e: React.PointerEvent): Point => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    return {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    }
  }

  const drawGuide = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const w = canvas.width
    const h = canvas.height

    ctx.clearRect(0, 0, w, h)

    // Grid lines
    ctx.strokeStyle = '#e0e0e020'
    ctx.lineWidth = 1
    ctx.setLineDash([4, 4])
    ctx.beginPath()
    ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2)
    ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h)
    ctx.moveTo(0, h / 4); ctx.lineTo(w, h / 4)
    ctx.moveTo(0, h * 3 / 4); ctx.lineTo(w, h * 3 / 4)
    ctx.stroke()
    ctx.setLineDash([])

    // Guide letter path
    if (showGuide && letter.points.length > 1) {
      ctx.strokeStyle = 'rgba(127, 119, 221, 0.2)'
      ctx.lineWidth = 12
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.beginPath()
      letter.points.forEach((p, i) => {
        const x = (p[0] / 100) * w
        const y = (p[1] / 100) * h
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.stroke()

      // Start dot
      ctx.fillStyle = 'rgba(76, 175, 80, 0.5)'
      ctx.beginPath()
      ctx.arc((letter.points[0][0] / 100) * w, (letter.points[0][1] / 100) * h, 6, 0, Math.PI * 2)
      ctx.fill()

      // Numbered waypoints
      ctx.font = '10px sans-serif'
      ctx.fillStyle = 'rgba(127, 119, 221, 0.4)'
      letter.points.forEach((p, i) => {
        if (i === 0) return
        ctx.fillText(`${i + 1}`, (p[0] / 100) * w + 8, (p[1] / 100) * h - 4)
      })
    }
  }, [letter, showGuide])

  useEffect(() => {
    drawGuide()
  }, [drawGuide])

  const handlePointerDown = (e: React.PointerEvent) => {
    if (hasChecked) return
    setIsDrawing(true)
    const point = getCanvasPoint(e)
    setUserPoints([point])

    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    drawGuide()
    ctx.strokeStyle = '#6366f1'
    ctx.lineWidth = 4
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo((point.x / 100) * canvas.width, (point.y / 100) * canvas.height)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing || hasChecked) return
    const point = getCanvasPoint(e)
    setUserPoints((prev) => [...prev, point])

    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.lineTo((point.x / 100) * canvas.width, (point.y / 100) * canvas.height)
    ctx.stroke()
  }

  const handlePointerUp = () => {
    setIsDrawing(false)
  }

  const handleCheck = () => {
    if (hasChecked || userPoints.length < 5) return
    const acc = calculateAccuracy(userPoints, letter.points)
    setAccuracy(acc)
    setHasChecked(true)

    // XP based on accuracy: better = more XP
    if (acc >= 90) {
      addXP(30)
      addCoins('silver', 1)
      showXPGain(30)
      playCorrect()
    } else if (acc >= 70) {
      addXP(20)
      addCoins('bronze', 3)
      showXPGain(20)
      playCorrect()
    } else if (acc >= 50) {
      addXP(10)
      addCoins('bronze', 1)
      showXPGain(10)
    } else {
      playWrong()
    }
  }

  const clearCanvas = () => {
    setUserPoints([])
    setAccuracy(null)
    setHasChecked(false)
    drawGuide()
  }

  const stars = accuracy === null ? 0 : accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : accuracy >= 50 ? 1 : 0

  return (
    <div className="max-w-3xl mx-auto">
      <AnimationLayer />
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>← Zurueck</Button>
        <span className="font-title text-xl text-theme">{letter.rune}</span>
      </div>

      {/* Target letter */}
      <div className="text-center mb-3">
        <span className="text-6xl font-bold text-primary/30 font-body">{letter.char}</span>
      </div>

      {/* Canvas */}
      <div className="relative rounded-2xl overflow-hidden neon-border bg-[#0a0a12] mb-4">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="w-full touch-none cursor-crosshair"
          style={{ opacity: hasChecked ? 0.6 : 1 }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
      </div>

      {/* Controls */}
      <div className="flex gap-2 mb-4">
        <Button variant="ghost" size="sm" onClick={() => setShowGuide(!showGuide)} className="flex-1">
          {showGuide ? 'Vorlage aus' : 'Vorlage an'}
        </Button>
        <Button variant="secondary" size="sm" onClick={clearCanvas} className="flex-1">
          Loeschen
        </Button>
        <Button
          size="sm"
          onClick={handleCheck}
          className="flex-1"
          disabled={hasChecked || userPoints.length < 5}
        >
          Pruefen
        </Button>
      </div>

      {/* Score */}
      {accuracy !== null && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
          <div className="text-4xl font-title text-primary neon-text mb-1">{accuracy}%</div>
          <div className="text-2xl mb-2">
            {'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}
          </div>
          <p className="text-secondary mb-1 font-body text-sm">
            {accuracy >= 90 ? 'Meisterhaft! +30 XP' : accuracy >= 70 ? 'Gut gemacht! +20 XP' : accuracy >= 50 ? 'Weiter ueben! +10 XP' : 'Nochmal versuchen!'}
          </p>
          <div className="flex gap-3 justify-center mt-3">
            <Button variant="secondary" onClick={clearCanvas}>Nochmal</Button>
            <Button onClick={onNext}>Naechster →</Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// === CHALLENGE MODE ===

function ChallengeMode({ onBack }: { onBack: () => void }) {
  const [letterIndex, setLetterIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(CHALLENGE_TIME)
  const [totalScore, setTotalScore] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const [currentAccuracy, setCurrentAccuracy] = useState<number | null>(null)
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

  // Canvas state
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [userPoints, setUserPoints] = useState<Point[]>([])
  const [hasChecked, setHasChecked] = useState(false)

  const { addXP } = useXPStore()
  const { addCoins } = useCoinsStore()
  const { increment, reset: resetCombo, currentCombo } = useComboStore()
  const { showXPGain, AnimationLayer } = useRewardAnimations()

  const letter = LETTERS[letterIndex]

  // Timer countdown
  useEffect(() => {
    if (finished || hasChecked) return
    if (timeLeft <= 0) {
      // Time's up - auto check
      handleCheck()
      return
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, finished, hasChecked])

  // Draw guide on letter change
  const drawGuide = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const w = canvas.width
    const h = canvas.height

    ctx.clearRect(0, 0, w, h)

    // Grid
    ctx.strokeStyle = '#e0e0e015'
    ctx.lineWidth = 1
    ctx.setLineDash([4, 4])
    ctx.beginPath()
    ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2)
    ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h)
    ctx.stroke()
    ctx.setLineDash([])

    // Guide (always on in challenge)
    ctx.strokeStyle = 'rgba(127, 119, 221, 0.15)'
    ctx.lineWidth = 14
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    letter.points.forEach((p, i) => {
      const x = (p[0] / 100) * w
      const y = (p[1] / 100) * h
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.stroke()

    // Start dot
    ctx.fillStyle = 'rgba(76, 175, 80, 0.4)'
    ctx.beginPath()
    ctx.arc((letter.points[0][0] / 100) * w, (letter.points[0][1] / 100) * h, 6, 0, Math.PI * 2)
    ctx.fill()
  }, [letter])

  useEffect(() => {
    drawGuide()
  }, [drawGuide])

  // Cleanup auto-advance timer
  useEffect(() => {
    return () => { if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer) }
  }, [autoAdvanceTimer])

  const getCanvasPoint = (e: React.PointerEvent): Point => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    return {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    }
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    if (hasChecked) return
    setIsDrawing(true)
    const point = getCanvasPoint(e)
    setUserPoints([point])

    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    drawGuide()
    ctx.strokeStyle = '#6366f1'
    ctx.lineWidth = 4
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo((point.x / 100) * canvas.width, (point.y / 100) * canvas.height)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing || hasChecked) return
    const point = getCanvasPoint(e)
    setUserPoints((prev) => [...prev, point])

    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.lineTo((point.x / 100) * canvas.width, (point.y / 100) * canvas.height)
    ctx.stroke()
  }

  const handlePointerUp = () => {
    setIsDrawing(false)
  }

  const handleCheck = () => {
    if (hasChecked) return
    setHasChecked(true)

    const acc = userPoints.length >= 5 ? calculateAccuracy(userPoints, letter.points) : 0
    setCurrentAccuracy(acc)
    setTotalScore((s) => s + acc)
    setCompletedCount((c) => c + 1)

    const timeBonus = Math.floor(timeLeft / 3)

    if (acc >= 90) {
      const xp = 25 + timeBonus
      increment()
      addXP(xp)
      addCoins('bronze', 3)
      showXPGain(xp)
      playCorrect()

      // Auto-advance after 1.5s
      const timer = setTimeout(() => advanceToNext(), 1500)
      setAutoAdvanceTimer(timer)
    } else if (acc >= 70) {
      addXP(15)
      addCoins('bronze', 1)
      showXPGain(15)
      playCorrect()
    } else {
      resetCombo()
      playWrong()
    }
  }

  const advanceToNext = () => {
    if (letterIndex >= LETTERS.length - 1) {
      setFinished(true)
      return
    }
    setLetterIndex((i) => i + 1)
    setTimeLeft(CHALLENGE_TIME)
    setUserPoints([])
    setHasChecked(false)
    setCurrentAccuracy(null)
  }

  // Challenge complete
  if (finished) {
    const avgScore = completedCount > 0 ? Math.round(totalScore / completedCount) : 0
    const passedCount = completedCount // letters that were attempted
    return (
      <div className="max-w-3xl mx-auto text-center py-8">
        <AnimationLayer />
        <div className="text-7xl mb-4">
          {avgScore >= 90 ? '🏆' : avgScore >= 70 ? '⭐' : avgScore >= 50 ? '👍' : '💪'}
        </div>
        <h2 className="text-2xl mb-2 text-theme neon-text">Challenge beendet!</h2>
        <p className="text-4xl font-title text-primary neon-text mb-2">{avgScore}%</p>
        <p className="text-secondary font-body mb-1">Durchschnitt ueber {passedCount} Buchstaben</p>
        {currentCombo > 0 && (
          <p className="text-sm text-primary font-body mb-4">Beste Combo: {currentCombo}x</p>
        )}
        <div className="flex gap-3 justify-center mt-4">
          <Button variant="secondary" onClick={onBack}>Zurueck</Button>
          <Button onClick={() => {
            setLetterIndex(0)
            setTimeLeft(CHALLENGE_TIME)
            setTotalScore(0)
            setCompletedCount(0)
            setFinished(false)
            setCurrentAccuracy(null)
            setUserPoints([])
            setHasChecked(false)
            resetCombo()
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

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <Button variant="ghost" size="sm" onClick={onBack}>← Zurueck</Button>
        <span className="font-title text-lg text-theme">Challenge</span>
        <span className="text-sm text-secondary font-body">{letterIndex + 1}/{LETTERS.length}</span>
      </div>

      <ProgressBar value={letterIndex} max={LETTERS.length} className="mb-3" />

      {/* Timer + Letter + Combo */}
      <div className="flex items-center justify-between mb-3">
        <div className={`text-lg font-bold font-body ${timeLeft <= 5 ? 'text-[var(--color-danger)] animate-pulse' : 'text-secondary'}`}>
          {timeLeft}s
        </div>
        <motion.div
          key={letterIndex}
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          className="text-5xl font-bold text-primary/40 font-body"
        >
          {letter.char}
        </motion.div>
        {currentCombo > 1 && (
          <span className="text-sm text-primary font-bold font-body neon-text">{currentCombo}x</span>
        )}
      </div>

      {/* Canvas */}
      <div className="relative rounded-2xl overflow-hidden neon-border bg-[#0a0a12] mb-3">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="w-full touch-none cursor-crosshair"
          style={{ opacity: hasChecked ? 0.5 : 1 }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />

        {/* Accuracy overlay */}
        {currentAccuracy !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className={`text-6xl font-title ${currentAccuracy >= 90 ? 'text-[var(--color-success)]' : currentAccuracy >= 70 ? 'text-primary' : 'text-[var(--color-danger)]'} neon-text`}>
              {currentAccuracy}%
            </div>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        {!hasChecked ? (
          <Button
            size="sm"
            onClick={handleCheck}
            className="flex-1"
            disabled={userPoints.length < 5}
          >
            Pruefen
          </Button>
        ) : currentAccuracy !== null && currentAccuracy < 90 ? (
          <>
            <Button variant="secondary" size="sm" onClick={() => {
              setUserPoints([])
              setHasChecked(false)
              setCurrentAccuracy(null)
              setTimeLeft(CHALLENGE_TIME)
              drawGuide()
            }} className="flex-1">
              Nochmal
            </Button>
            <Button size="sm" onClick={advanceToNext} className="flex-1">
              Weiter →
            </Button>
          </>
        ) : (
          <div className="flex-1 text-center text-sm text-[var(--color-success)] font-bold font-body py-2">
            Naechster Buchstabe kommt...
          </div>
        )}
      </div>
    </div>
  )
}
