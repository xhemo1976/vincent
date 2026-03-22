import { useRef } from 'react'
import { useTick } from '@pixi/react'
import type { Container } from 'pixi.js'

interface IdleAnimationProps {
  containerRef: React.RefObject<Container | null>
  enabled?: boolean
}

export function useIdleAnimation({ containerRef, enabled = true }: IdleAnimationProps) {
  const time = useRef(0)

  useTick(({ deltaTime }) => {
    if (!enabled || !containerRef.current) return
    time.current += deltaTime * 0.016

    const container = containerRef.current
    // Gentle floating
    container.y = Math.sin(time.current * 0.8) * 3
    // Subtle breathing scale
    container.scale.set(1 + Math.sin(time.current * 0.6) * 0.005)
  })
}
