import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'
import { useXPStore } from '../../../shared/stores/xpStore'
import { useCoinsStore } from '../../../shared/stores/coinsStore'
import { useRewardAnimations } from '../../../shared/components/RewardAnimation'

type Mode = 'menu' | 'practice'

const LETTERS = [
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

export default function HandwritingPage() {
  const [mode, setMode] = useState<Mode>('menu')
  const [letterIndex, setLetterIndex] = useState(0)

  if (mode === 'menu') {
    return (
      <div>
        <h1 className="text-3xl mb-2 text-theme text-center">✍️ Schreibschrift</h1>
        <p className="text-secondary text-center mb-6 font-body">
          Meistere die Runen! Zeichne jeden Buchstaben nach.
        </p>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
          {LETTERS.map((letter, i) => (
            <Card
              key={letter.char}
              hoverable
              onClick={() => { setLetterIndex(i); setMode('practice') }}
              className="!p-4 text-center"
            >
              <div className="text-4xl font-bold text-primary font-body">{letter.char}</div>
              <div className="text-xs text-secondary font-body">{letter.rune}</div>
            </Card>
          ))}
        </div>
      </div>
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

interface Point { x: number; y: number }

function DrawingCanvas({
  letter,
  onBack,
  onNext,
}: {
  letter: typeof LETTERS[0]
  onBack: () => void
  onNext: () => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [userPoints, setUserPoints] = useState<Point[]>([])
  const [score, setScore] = useState<number | null>(null)
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

    // Grid
    ctx.strokeStyle = '#e0e0e0'
    ctx.lineWidth = 1
    ctx.setLineDash([4, 4])
    ctx.beginPath()
    ctx.moveTo(0, h / 2)
    ctx.lineTo(w, h / 2)
    ctx.moveTo(w / 2, 0)
    ctx.lineTo(w / 2, h)
    ctx.stroke()
    ctx.setLineDash([])

    // Guide letter
    if (showGuide && letter.points.length > 1) {
      ctx.strokeStyle = 'rgba(127, 119, 221, 0.25)'
      ctx.lineWidth = 8
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
    }
  }, [letter, showGuide])

  useEffect(() => {
    drawGuide()
  }, [drawGuide])

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDrawing(true)
    const point = getCanvasPoint(e)
    setUserPoints([point])

    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.strokeStyle = 'var(--color-primary)'
    ctx.lineWidth = 4
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo((point.x / 100) * canvas.width, (point.y / 100) * canvas.height)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing) return
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

  const calculateScore = () => {
    if (userPoints.length < 5) {
      setScore(0)
      return
    }

    // Compare user path to template
    const templatePoints = letter.points.map((p) => ({ x: p[0], y: p[1] }))

    // Resample user points to same count as template
    const resample = (points: Point[], count: number): Point[] => {
      if (points.length <= 1) return points
      const result: Point[] = [points[0]]
      const totalDist = points.reduce((sum, p, i) => {
        if (i === 0) return 0
        return sum + Math.hypot(p.x - points[i - 1].x, p.y - points[i - 1].y)
      }, 0)
      const step = totalDist / (count - 1)
      let dist = 0
      let j = 1
      for (let i = 1; i < count; i++) {
        const target = step * i
        while (j < points.length) {
          const d = Math.hypot(points[j].x - points[j - 1].x, points[j].y - points[j - 1].y)
          if (dist + d >= target) {
            const t = (target - dist) / d
            result.push({
              x: points[j - 1].x + t * (points[j].x - points[j - 1].x),
              y: points[j - 1].y + t * (points[j].y - points[j - 1].y),
            })
            break
          }
          dist += d
          j++
        }
      }
      while (result.length < count) result.push(points[points.length - 1])
      return result
    }

    const resampled = resample(userPoints, templatePoints.length)
    const avgDist = templatePoints.reduce((sum, tp, i) => {
      return sum + Math.hypot(tp.x - resampled[i].x, tp.y - resampled[i].y)
    }, 0) / templatePoints.length

    // Score: lower distance = better score
    const normalized = Math.max(0, Math.min(100, 100 - avgDist * 2))
    const stars = normalized >= 70 ? 3 : normalized >= 45 ? 2 : normalized >= 20 ? 1 : 0
    setScore(stars)

    if (stars >= 1) {
      const xp = stars * 10
      addXP(xp)
      addCoins('bronze', stars)
      showXPGain(xp)
    }
  }

  const clearCanvas = () => {
    setUserPoints([])
    setScore(null)
    drawGuide()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <AnimationLayer />
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>← Zurück</Button>
        <span className="font-title text-xl text-theme">{letter.rune}</span>
      </div>

      {/* Target letter display */}
      <div className="text-center mb-3">
        <span className="text-6xl font-bold text-primary/30 font-body">{letter.char}</span>
      </div>

      {/* Canvas */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 bg-white mb-4">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="w-full touch-none cursor-crosshair"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
      </div>

      {/* Controls */}
      <div className="flex gap-2 mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowGuide(!showGuide)}
          className="flex-1"
        >
          {showGuide ? '🙈 Vorlage aus' : '👁️ Vorlage an'}
        </Button>
        <Button variant="secondary" size="sm" onClick={clearCanvas} className="flex-1">
          🗑️ Löschen
        </Button>
        <Button size="sm" onClick={calculateScore} className="flex-1">
          ✅ Prüfen
        </Button>
      </div>

      {/* Score */}
      {score !== null && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <div className="text-3xl mb-2">
            {'⭐'.repeat(score)}{'☆'.repeat(3 - score)}
          </div>
          <p className="text-secondary mb-4 font-body">
            {score === 3 ? 'Perfekt!' : score === 2 ? 'Gut gemacht!' : score === 1 ? 'Weiter üben!' : 'Versuche es nochmal!'}
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="secondary" onClick={clearCanvas}>Nochmal</Button>
            <Button onClick={onNext}>Nächster →</Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
