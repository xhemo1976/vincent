import { useState, useCallback } from 'react'
import { Button } from '../../../shared/components/Button'
import { useXPStore } from '../../../shared/stores/xpStore'
import { useCoinsStore } from '../../../shared/stores/coinsStore'
import { useRewardAnimations } from '../../../shared/components/RewardAnimation'
import { playCorrect, playWrong } from '../../../shared/utils/sounds'
import { SAS_LETTERS } from './data/sasLetters'
import { evaluateHandwriting } from './utils/strokeMatcher'
import { LetterMenu } from './components/LetterMenu'
import { TemplatePreview } from './components/TemplatePreview'
import { useHandwritingCanvas } from './hooks/useHandwritingCanvas'
import { StarRating } from './components/StarRating'
import { ScoreOverlay } from './components/ScoreOverlay'
import { ChallengeMode } from './components/ChallengeMode'
import type { EvaluationResult } from './types'

type Mode = 'menu' | 'practice' | 'challenge'

export default function HandwritingPage() {
  const [mode, setMode] = useState<Mode>('menu')
  const [letterIndex, setLetterIndex] = useState(0)

  if (mode === 'menu') {
    return (
      <LetterMenu
        letters={SAS_LETTERS}
        onSelectLetter={(i) => { setLetterIndex(i); setMode('practice') }}
        onStartChallenge={() => { setLetterIndex(0); setMode('challenge') }}
      />
    )
  }

  if (mode === 'challenge') {
    return <ChallengeMode letters={SAS_LETTERS} onBack={() => setMode('menu')} />
  }

  return (
    <PracticeMode
      letterIndex={letterIndex}
      onBack={() => setMode('menu')}
      onNext={() => {
        if (letterIndex < SAS_LETTERS.length - 1) setLetterIndex(letterIndex + 1)
        else setMode('menu')
      }}
    />
  )
}

function PracticeMode({
  letterIndex,
  onBack,
  onNext,
}: {
  letterIndex: number
  onBack: () => void
  onNext: () => void
}) {
  const letter = SAS_LETTERS[letterIndex]
  const showKeller = letter.lineaturZone === 'lower'

  const [result, setResult] = useState<EvaluationResult | null>(null)
  const [hasChecked, setHasChecked] = useState(false)

  const { canvasRef, containerRef, userStrokes, hasContent, clearCanvas, handlers } =
    useHandwritingCanvas({ showKeller, disabled: hasChecked, letterChar: letter.char })

  const { addXP } = useXPStore()
  const { addCoins } = useCoinsStore()
  const { showXPGain, AnimationLayer } = useRewardAnimations()

  const handleCheck = useCallback(() => {
    if (hasChecked || !hasContent) return
    setHasChecked(true)

    const evalResult = evaluateHandwriting(userStrokes, letter)
    setResult(evalResult)

    if (evalResult.stars >= 5) {
      addXP(30)
      addCoins('silver', 1)
      showXPGain(30)
      playCorrect()
    } else if (evalResult.stars >= 4) {
      addXP(20)
      addCoins('bronze', 3)
      showXPGain(20)
      playCorrect()
    } else {
      playWrong()
    }
  }, [hasChecked, hasContent, userStrokes, letter])

  const handleRetry = () => {
    setResult(null)
    setHasChecked(false)
    clearCanvas()
  }

  const handleNext = () => {
    setResult(null)
    setHasChecked(false)
    clearCanvas()
    onNext()
  }

  return (
    <div className="h-dvh flex flex-col p-2 max-w-3xl mx-auto">
      <AnimationLayer />

      {/* Header */}
      <div className="flex items-center justify-between mb-1 shrink-0" style={{ height: 48 }}>
        <Button variant="ghost" size="sm" onClick={onBack}>← Zurueck</Button>
        <span className="font-title text-lg text-theme">{letter.displayName}</span>
        <span className="text-2xl font-bold text-primary/30 font-body">{letter.char}</span>
      </div>

      {/* Template Preview (obere Haelfte) */}
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
      </div>

      {/* Controls + Score */}
      <div className="shrink-0 mt-2">
        {result ? (
          <ScoreOverlay
            result={result}
            onRetry={handleRetry}
            onNext={handleNext}
            isLast={letterIndex >= SAS_LETTERS.length - 1}
          />
        ) : (
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={handleRetry} className="flex-1">
              Loeschen
            </Button>
            <Button
              size="sm"
              onClick={handleCheck}
              className="flex-1"
              disabled={!hasContent || hasChecked}
            >
              Pruefen
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
