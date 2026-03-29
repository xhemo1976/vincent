import { useRef, useState, useCallback, useEffect } from 'react'
import type { Point2D, Stroke } from '../types'
import { drawLineatur } from '../components/Lineatur'

interface UseHandwritingCanvasOptions {
  showKeller?: boolean
  disabled?: boolean
  letterChar?: string // Buchstabe fuer Font-Vorlage auf dem Canvas
}

function drawFontGuide(ctx: CanvasRenderingContext2D, w: number, h: number, char: string) {
  ctx.save()
  const fontSize = h * 0.55
  ctx.font = `${fontSize}px "Playwrite DE SAS", cursive`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = 'rgba(127, 119, 221, 0.08)'
  ctx.fillText(char, w / 2, h * 0.75)
  ctx.restore()
}

export function useHandwritingCanvas({ showKeller = false, disabled = false, letterChar }: UseHandwritingCanvasOptions = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [userStrokes, setUserStrokes] = useState<Stroke[]>([])
  const currentStrokeRef = useRef<Point2D[]>([])

  // Responsive Canvas-Groesse
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
        redraw(width, height)
      }
    })

    observer.observe(container)
    return () => observer.disconnect()
  }, [showKeller, userStrokes, letterChar])

  const getCanvasPoint = useCallback((e: React.PointerEvent): Point2D => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    return {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    }
  }, [])

  const redraw = useCallback((width?: number, height?: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1
    const w = width ?? canvas.width / dpr
    const h = height ?? canvas.height / dpr

    ctx.clearRect(0, 0, w, h)

    // Lineatur
    drawLineatur({ ctx, width: w, height: h, showKeller })

    // Font-Vorlage (sehr dezent)
    if (letterChar) {
      drawFontGuide(ctx, w, h, letterChar)
    }

    // Alle bisherigen Striche neu zeichnen
    ctx.strokeStyle = '#6366f1'
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    for (const stroke of userStrokes) {
      if (stroke.points.length < 2) continue
      ctx.beginPath()
      ctx.moveTo((stroke.points[0].x / 100) * w, (stroke.points[0].y / 100) * h)
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo((stroke.points[i].x / 100) * w, (stroke.points[i].y / 100) * h)
      }
      ctx.stroke()
    }
  }, [userStrokes, showKeller, letterChar])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (disabled) return
    e.preventDefault()
    setIsDrawing(true)
    const point = getCanvasPoint(e)
    currentStrokeRef.current = [point]

    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1
    const w = canvas.width / dpr
    const h = canvas.height / dpr

    ctx.strokeStyle = '#6366f1'
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo((point.x / 100) * w, (point.y / 100) * h)
  }, [disabled, getCanvasPoint])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDrawing || disabled) return
    e.preventDefault()
    const point = getCanvasPoint(e)
    currentStrokeRef.current.push(point)

    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1
    const w = canvas.width / dpr
    const h = canvas.height / dpr

    ctx.lineTo((point.x / 100) * w, (point.y / 100) * h)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo((point.x / 100) * w, (point.y / 100) * h)
  }, [isDrawing, disabled, getCanvasPoint])

  const handlePointerUp = useCallback(() => {
    if (!isDrawing) return
    setIsDrawing(false)
    const points = currentStrokeRef.current
    if (points.length >= 2) {
      setUserStrokes((prev) => [...prev, { points: [...points] }])
    }
    currentStrokeRef.current = []
  }, [isDrawing])

  const clearCanvas = useCallback(() => {
    setUserStrokes([])
    currentStrokeRef.current = []
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1
    const w = canvas.width / dpr
    const h = canvas.height / dpr
    ctx.clearRect(0, 0, w, h)
    drawLineatur({ ctx, width: w, height: h, showKeller })
    if (letterChar) {
      drawFontGuide(ctx, w, h, letterChar)
    }
  }, [showKeller, letterChar])

  const hasContent = userStrokes.length > 0

  return {
    canvasRef,
    containerRef,
    userStrokes,
    isDrawing,
    hasContent,
    clearCanvas,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerLeave: handlePointerUp,
    },
  }
}
