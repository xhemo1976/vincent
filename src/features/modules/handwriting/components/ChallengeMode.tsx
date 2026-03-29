import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../../../shared/components/Button'
import { ProgressBar } from '../../../../shared/components/ProgressBar'
import { useXPStore } from '../../../../shared/stores/xpStore'
import { useCoinsStore } from '../../../../shared/stores/coinsStore'
import { useComboStore } from '../../../../shared/stores/comboStore'
import { useRewardAnimations } from '../../../../shared/components/RewardAnimation'
import { playCorrect, playWrong } from '../../../../shared/utils/sounds'
import { evaluateHandwriting } from '../utils/strokeMatcher'
import { TemplatePreview } from './TemplatePreview'
import { useHandwritingCanvas } from '../hooks/useHandwritingCanvas'
import { StarRating } from './StarRating'
import { drawLineatur } from './Lineatur'
import type { SASLetter, EvaluationResult } from '../types'

const CHALLENGE_TIME = 20

interface ChallengeModeProps {
  letters: SASLetter[]
  onBack: () => void
}

export function ChallengeMode({ letters, onBack }: ChallengeModeProps) {
  const [letterIndex, setLetterIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(CHALLENGE_TIME)
  const [totalScore, setTotalScore] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const [result, setResult] = useState<EvaluationResult | null>(null)
  const [hasChecked, setHasChecked] = useState(false)

  const letter = letters[letterIndex]
  const showKeller = letter.lineaturZone === 'lower'

  const { canvasRef, containerRef, userStrokes, hasContent, clearCanvas, handlers } =
    useHandwritingCanvas({ showKeller, disabled: hasChecked, letterChar: letter.char })

  const { addXP } = useXPStore()
  const { addCoins } = useCoinsStore()
  const { increment, reset: resetCombo, currentCombo } = useComboStore()
  const { showXPGain, AnimationLayer } = useRewardAnimations()

  // Timer
  useEffect(() => {
    if (finished || hasChecked) return
    if (timeLeft <= 0) {
      handleCheck()
      return
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, finished, hasChecked])

  const handleCheck = useCallback(() => {
    if (hasChecked) return
    setHasChecked(true)

    const evalResult = evaluateHandwriting(userStrokes, letter)
    setResult(evalResult)
    setTotalScore((s) => s + evalResult.accuracy)
    setCompletedCount((c) => c + 1)

    if (evalResult.stars >= 4) {
      const timeBonus = Math.floor(timeLeft / 4)
      const xp = (evalResult.stars >= 5 ? 30 : 20) + timeBonus
      increment()
      addXP(xp)
      addCoins(evalResult.stars >= 5 ? 'silver' : 'bronze', evalResult.stars >= 5 ? 1 : 3)
      showXPGain(xp)
      playCorrect()

      // Auto-advance bei 5 Sternen
      if (evalResult.stars >= 5) {
        setTimeout(() => advanceToNext(), 1500)
      }
    } else {
      if (evalResult.stars < 3) resetCombo()
      playWrong()
    }
  }, [hasChecked, userStrokes, letter, timeLeft])

  const advanceToNext = useCallback(() => {
    if (letterIndex >= letters.length - 1) {
      setFinished(true)
      return
    }
    setLetterIndex((i) => i + 1)
    setTimeLeft(CHALLENGE_TIME)
    setHasChecked(false)
    setResult(null)
    clearCanvas()
  }, [letterIndex, letters.length, clearCanvas])

  const resetChallenge = () => {
    setLetterIndex(0)
    setTimeLeft(CHALLENGE_TIME)
    setTotalScore(0)
    setCompletedCount(0)
    setFinished(false)
    setResult(null)
    setHasChecked(false)
    resetCombo()
    clearCanvas()
  }

  // Ergebnis-Screen
  if (finished) {
    const avgScore = completedCount > 0 ? Math.round(totalScore / completedCount) : 0
    const avgStars = avgScore >= 90 ? 5 : avgScore >= 80 ? 4 : avgScore >= 65 ? 3 : avgScore >= 50 ? 2 : 1
    return (
      <div className="max-w-3xl mx-auto text-center py-8">
        <AnimationLayer />
        <div className="text-7xl mb-4">
          {avgScore >= 90 ? '🏆' : avgScore >= 70 ? '⭐' : avgScore >= 50 ? '👍' : '💪'}
        </div>
        <h2 className="text-2xl mb-2 text-theme neon-text">Challenge beendet!</h2>
        <p className="text-4xl font-title text-primary neon-text mb-2">{avgScore}%</p>
        <StarRating stars={avgStars} size="lg" />
        <p className="text-secondary font-body mb-1 mt-2">Durchschnitt ueber {completedCount} Buchstaben</p>
        {currentCombo > 0 && (
          <p className="text-sm text-primary font-body mb-4">Beste Combo: {currentCombo}x</p>
        )}
        <div className="flex gap-3 justify-center mt-4">
          <Button variant="secondary" onClick={onBack}>Zurueck</Button>
          <Button onClick={resetChallenge}>Nochmal!</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-dvh flex flex-col p-2 max-w-3xl mx-auto">
      <AnimationLayer />

      {/* Header */}
      <div className="flex items-center justify-between mb-1 shrink-0">
        <Button variant="ghost" size="sm" onClick={onBack}>← Zurueck</Button>
        <span className="font-title text-lg text-theme">Challenge</span>
        <span className="text-sm text-secondary font-body">{letterIndex + 1}/{letters.length}</span>
      </div>

      <ProgressBar value={letterIndex} max={letters.length} className="mb-2 shrink-0" />

      {/* Timer + Letter + Combo */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <div className={`text-lg font-bold font-body ${timeLeft <= 5 ? 'text-[var(--color-danger)] animate-pulse' : 'text-secondary'}`}>
          {timeLeft}s
        </div>
        <motion.div
          key={letterIndex}
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          className="text-3xl font-bold text-primary/40 font-body"
        >
          {letter.char} — {letter.displayName}
        </motion.div>
        {currentCombo > 1 && (
          <span className="text-sm text-primary font-bold font-body neon-text">{currentCombo}x</span>
        )}
      </div>

      {/* Template (obere Haelfte) */}
      <TemplatePreview letter={letter} autoPlay />

      <div className="h-1 shrink-0" />

      {/* Drawing Canvas (untere Haelfte) */}
      <div
        ref={containerRef}
        className="flex-1 relative rounded-xl overflow-hidden neon-border bg-[#0a0a12]"
        style={{ minHeight: 0 }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full touch-none cursor-crosshair absolute inset-0"
          style={{ opacity: hasChecked ? 0.5 : 1 }}
          {...handlers}
        />
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/40"
          >
            <div className={`text-5xl font-title neon-text ${result.stars >= 4 ? 'text-[var(--color-success)]' : result.stars >= 3 ? 'text-primary' : 'text-[var(--color-danger)]'}`}>
              {result.accuracy}%
            </div>
            <StarRating stars={result.stars} size="md" />
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-2 mt-2 shrink-0">
        {!hasChecked ? (
          <Button
            size="sm"
            onClick={handleCheck}
            className="flex-1"
            disabled={!hasContent}
          >
            Pruefen
          </Button>
        ) : result && result.stars < 5 ? (
          <>
            <Button variant="secondary" size="sm" onClick={() => {
              setHasChecked(false)
              setResult(null)
              setTimeLeft(CHALLENGE_TIME)
              clearCanvas()
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
