import { useRef, useState, useCallback, useEffect } from 'react'
import type { SASLetter } from '../types'
import { drawLineatur } from '../components/Lineatur'
import { distance } from '../utils/geometry'

const DRAW_SPEED = 120 // Punkte pro Sekunde (normalisierte Einheiten)

interface UseStrokeAnimationOptions {
  letter: SASLetter
  autoPlay?: boolean
}

export function useStrokeAnimation({ letter, autoPlay = true }: UseStrokeAnimationOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const animFrameRef = useRef<number>(0)
  const showKeller = letter.lineaturZone === 'lower'

  // Canvas Groesse anpassen
  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        const dpr = window.devicePixelRatio || 1
        canvas.width = width * dpr
        canvas.height = height * dpr
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
        const ctx = canvas.getContext('2d')!
        ctx.scale(dpr, dpr)
        drawStatic(width, height)
      }
    })

    observer.observe(container)
    return () => observer.disconnect()
  }, [letter])

  // Auto-play bei neuem Buchstaben
  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(() => replay(), 300)
      return () => clearTimeout(timer)
    }
  }, [letter, autoPlay])

  // Cleanup
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  const drawFontLetter = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    // Playwrite DE SAS Font als grosse Vorlage rendern
    const fontSize = h * 0.55
    ctx.save()
    ctx.font = `${fontSize}px "Playwrite DE SAS", cursive`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'alphabetic'
    // Grundlinie bei 75% der Hoehe
    const baselineY = h * 0.75
    ctx.fillStyle = 'rgba(127, 119, 221, 0.15)'
    ctx.fillText(letter.char, w / 2, baselineY)
    ctx.restore()
  }, [letter])

  const drawStatic = useCallback((width?: number, height?: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1
    const w = width ?? canvas.width / dpr
    const h = height ?? canvas.height / dpr

    ctx.clearRect(0, 0, w, h)
    drawLineatur({ ctx, width: w, height: h, showKeller })

    // Font-Vorlage im Hintergrund (dezent)
    drawFontLetter(ctx, w, h)

    // Strich-Pfade darueber
    ctx.strokeStyle = 'rgba(127, 119, 221, 0.5)'
    ctx.lineWidth = 3
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

    // Start-Punkt markieren
    if (letter.strokes.length > 0 && letter.strokes[0].points.length > 0) {
      const start = letter.strokes[0].points[0]
      ctx.fillStyle = 'rgba(76, 175, 80, 0.6)'
      ctx.beginPath()
      ctx.arc((start.x / 100) * w, (start.y / 100) * h, 5, 0, Math.PI * 2)
      ctx.fill()
    }

    // Strich-Nummern
    ctx.font = '11px sans-serif'
    ctx.fillStyle = 'rgba(127, 119, 221, 0.5)'
    letter.strokes.forEach((stroke, i) => {
      if (stroke.points.length > 0) {
        const p = stroke.points[0]
        ctx.fillText(`${i + 1}`, (p.x / 100) * w + 8, (p.y / 100) * h - 6)
      }
    })
  }, [letter, showKeller, drawFontLetter])

  const replay = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    setIsAnimating(true)

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1
    const w = canvas.width / dpr
    const h = canvas.height / dpr

    // Alle Punkte aller Striche flach sammeln mit Strich-Trennern
    type DrawSegment = { x: number; y: number; newStroke: boolean }
    const segments: DrawSegment[] = []
    let totalDist = 0

    for (const stroke of letter.strokes) {
      for (let i = 0; i < stroke.points.length; i++) {
        segments.push({
          x: stroke.points[i].x,
          y: stroke.points[i].y,
          newStroke: i === 0,
        })
        if (i > 0) {
          totalDist += distance(stroke.points[i - 1], stroke.points[i])
        }
      }
    }

    if (segments.length === 0) {
      setIsAnimating(false)
      return
    }

    const totalDuration = (totalDist / DRAW_SPEED) * 1000 // ms
    const startTime = performance.now()

    function animate(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(1, elapsed / Math.max(totalDuration, 100))

      // Hintergrund neu zeichnen
      ctx.clearRect(0, 0, w, h)
      drawLineatur({ ctx, width: w, height: h, showKeller })
      drawFontLetter(ctx, w, h)

      // Buchstabe bis zum aktuellen Fortschritt zeichnen
      ctx.strokeStyle = 'rgba(127, 119, 221, 0.6)'
      ctx.lineWidth = 4
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      // Berechne wie viele Segmente gezeichnet werden
      let drawnDist = 0
      const targetDist = progress * totalDist
      let lastDrawn = 0

      for (let i = 0; i < segments.length; i++) {
        if (i > 0 && !segments[i].newStroke) {
          const segDist = distance(
            { x: segments[i - 1].x, y: segments[i - 1].y },
            { x: segments[i].x, y: segments[i].y }
          )
          if (drawnDist + segDist > targetDist) {
            // Teilsegment
            const t = segDist > 0 ? (targetDist - drawnDist) / segDist : 0
            lastDrawn = i
            // Zeichne bis hierher + interpoliert
            drawSegments(ctx, segments, lastDrawn, t, w, h)
            break
          }
          drawnDist += segDist
        }
        lastDrawn = i
      }

      if (drawnDist >= targetDist - 0.01 && progress >= 1) {
        drawSegments(ctx, segments, segments.length - 1, 1, w, h)
      }

      // Stift-Indikator
      if (progress < 1) {
        const currentSeg = getCurrentPoint(segments, targetDist, totalDist)
        if (currentSeg) {
          ctx.fillStyle = '#f59e0b'
          ctx.beginPath()
          ctx.arc((currentSeg.x / 100) * w, (currentSeg.y / 100) * h, 4, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
        drawStatic(w, h)
      }
    }

    animFrameRef.current = requestAnimationFrame(animate)
  }, [letter, drawStatic, showKeller, drawFontLetter])

  return { canvasRef, containerRef, isAnimating, replay, drawStatic }
}

function drawSegments(
  ctx: CanvasRenderingContext2D,
  segments: { x: number; y: number; newStroke: boolean }[],
  upTo: number,
  partialT: number,
  w: number,
  h: number
) {
  let inPath = false

  for (let i = 0; i <= upTo; i++) {
    const seg = segments[i]
    if (seg.newStroke) {
      if (inPath) ctx.stroke()
      ctx.beginPath()
      ctx.moveTo((seg.x / 100) * w, (seg.y / 100) * h)
      inPath = true
    } else if (i === upTo && partialT < 1 && i > 0) {
      // Interpolierter Endpunkt
      const prev = segments[i - 1]
      const px = prev.x + (seg.x - prev.x) * partialT
      const py = prev.y + (seg.y - prev.y) * partialT
      ctx.lineTo((px / 100) * w, (py / 100) * h)
    } else {
      ctx.lineTo((seg.x / 100) * w, (seg.y / 100) * h)
    }
  }
  if (inPath) ctx.stroke()
}

function getCurrentPoint(
  segments: { x: number; y: number; newStroke: boolean }[],
  targetDist: number,
  _totalDist: number
): { x: number; y: number } | null {
  let accDist = 0
  for (let i = 1; i < segments.length; i++) {
    if (segments[i].newStroke) continue
    const segDist = distance(
      { x: segments[i - 1].x, y: segments[i - 1].y },
      { x: segments[i].x, y: segments[i].y }
    )
    if (accDist + segDist >= targetDist) {
      const t = segDist > 0 ? (targetDist - accDist) / segDist : 0
      return {
        x: segments[i - 1].x + (segments[i].x - segments[i - 1].x) * t,
        y: segments[i - 1].y + (segments[i].y - segments[i - 1].y) * t,
      }
    }
    accDist += segDist
  }
  return segments.length > 0 ? segments[segments.length - 1] : null
}
