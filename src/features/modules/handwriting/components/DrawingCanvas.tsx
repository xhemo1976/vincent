import { useHandwritingCanvas } from '../hooks/useHandwritingCanvas'
import type { SASLetter } from '../types'
import { drawLineatur } from './Lineatur'
import { useEffect } from 'react'

interface DrawingCanvasProps {
  letter: SASLetter
  disabled?: boolean
  showGuide?: boolean
  opacity?: number
  onStrokesChange?: (hasContent: boolean) => void
}

export function DrawingCanvas({
  letter,
  disabled = false,
  showGuide = true,
  opacity = 1,
  onStrokesChange,
}: DrawingCanvasProps) {
  const showKeller = letter.lineaturZone === 'lower'
  const { canvasRef, containerRef, userStrokes, hasContent, clearCanvas, handlers } =
    useHandwritingCanvas({ showKeller, disabled, letterChar: letter.char })

  useEffect(() => {
    onStrokesChange?.(hasContent)
  }, [hasContent, onStrokesChange])

  // Guide zeichnen wenn gewuenscht
  useEffect(() => {
    if (!showGuide) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1
    const w = canvas.width / dpr
    const h = canvas.height / dpr

    // Guide ueber die User-Striche zeichnen (dezent)
    ctx.save()
    ctx.strokeStyle = 'rgba(127, 119, 221, 0.12)'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    for (const stroke of letter.strokes) {
      if (stroke.points.length < 2) continue
      ctx.beginPath()
      ctx.moveTo((stroke.points[0].x / 100) * w, (stroke.points[0].y / 100) * h)
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo((stroke.points[i].x / 100) * w, (stroke.points[i].y / 100) * h)
      }
      ctx.stroke()
    }

    // Start-Punkt
    if (letter.strokes.length > 0 && letter.strokes[0].points.length > 0) {
      const start = letter.strokes[0].points[0]
      ctx.fillStyle = 'rgba(76, 175, 80, 0.3)'
      ctx.beginPath()
      ctx.arc((start.x / 100) * w, (start.y / 100) * h, 4, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()
  }, [letter, showGuide, userStrokes])

  return {
    containerRef,
    canvasRef,
    userStrokes,
    hasContent,
    clearCanvas,
    handlers,
    opacity,
    element: (
      <div
        ref={containerRef}
        className="flex-1 relative rounded-xl overflow-hidden neon-border bg-[#0a0a12]"
        style={{ minHeight: 0 }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full touch-none cursor-crosshair absolute inset-0"
          style={{ opacity: disabled ? 0.5 : opacity }}
          {...handlers}
        />
      </div>
    ),
  }
}
