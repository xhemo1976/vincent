import { useState, useRef, useCallback, useEffect } from 'react'
import type { Play, Point, PlayAnnotation } from '../types'

interface AnimationState {
  positions: Point[]
  ball: Point
  annotations: PlayAnnotation[]
  progress: number
  isPlaying: boolean
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function lerpPoint(a: Point, b: Point, t: number): Point {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) }
}

export function usePlayAnimation(play: Play | null) {
  const [state, setState] = useState<AnimationState>({
    positions: play?.keyframes[0]?.positions ?? [],
    ball: play?.keyframes[0]?.ball ?? { x: 50, y: 50 },
    annotations: play?.keyframes[0]?.annotations ?? [],
    progress: 0,
    isPlaying: false,
  })

  const rafRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const speedRef = useRef<number>(1)
  const pauseOffsetRef = useRef<number>(0)

  const interpolate = useCallback((progress: number) => {
    if (!play) return

    const keyframes = play.keyframes
    let fromIdx = 0
    let toIdx = 1

    for (let i = 0; i < keyframes.length - 1; i++) {
      if (progress >= keyframes[i].time && progress <= keyframes[i + 1].time) {
        fromIdx = i
        toIdx = i + 1
        break
      }
    }

    if (progress >= keyframes[keyframes.length - 1].time) {
      fromIdx = keyframes.length - 1
      toIdx = keyframes.length - 1
    }

    const from = keyframes[fromIdx]
    const to = keyframes[toIdx]
    const segmentLength = to.time - from.time
    const t = segmentLength > 0 ? (progress - from.time) / segmentLength : 1

    const positions = from.positions.map((pos, i) =>
      lerpPoint(pos, to.positions[i] ?? pos, t)
    )
    const ball = lerpPoint(from.ball, to.ball, t)
    const annotations = t > 0.5 ? (to.annotations ?? []) : (from.annotations ?? [])

    setState({ positions, ball, annotations, progress, isPlaying: true })
  }, [play])

  const animate = useCallback((timestamp: number) => {
    if (!play) return

    if (startTimeRef.current === 0) {
      startTimeRef.current = timestamp
    }

    const elapsed = (timestamp - startTimeRef.current) * speedRef.current + pauseOffsetRef.current
    const progress = Math.min(elapsed / play.durationMs, 1)

    interpolate(progress)

    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animate)
    } else {
      setState(prev => ({ ...prev, isPlaying: false, progress: 1 }))
    }
  }, [play, interpolate])

  const playAnimation = useCallback(() => {
    if (!play) return
    startTimeRef.current = 0
    rafRef.current = requestAnimationFrame(animate)
    setState(prev => ({ ...prev, isPlaying: true }))
  }, [play, animate])

  const pause = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    pauseOffsetRef.current = state.progress * (play?.durationMs ?? 0)
    setState(prev => ({ ...prev, isPlaying: false }))
  }, [state.progress, play])

  const resume = useCallback(() => {
    if (!play) return
    startTimeRef.current = 0
    rafRef.current = requestAnimationFrame(animate)
    setState(prev => ({ ...prev, isPlaying: true }))
  }, [play, animate])

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    pauseOffsetRef.current = 0
    if (play) {
      setState({
        positions: play.keyframes[0].positions,
        ball: play.keyframes[0].ball,
        annotations: play.keyframes[0].annotations ?? [],
        progress: 0,
        isPlaying: false,
      })
    }
  }, [play])

  const setSpeed = useCallback((speed: number) => {
    speedRef.current = speed
  }, [])

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  useEffect(() => {
    if (play) {
      cancelAnimationFrame(rafRef.current)
      pauseOffsetRef.current = 0
      setState({
        positions: play.keyframes[0].positions,
        ball: play.keyframes[0].ball,
        annotations: play.keyframes[0].annotations ?? [],
        progress: 0,
        isPlaying: false,
      })
    }
  }, [play])

  return {
    ...state,
    play: playAnimation,
    pause,
    resume,
    reset,
    setSpeed,
  }
}
