import { useRef } from 'react'
import { useTick } from '@pixi/react'
import type { Container } from 'pixi.js'

interface GlowConfig {
  color: string
  enabled: boolean
  containerRef: React.RefObject<Container | null>
}

export function useGlowPulse({ enabled, containerRef }: GlowConfig) {
  const time = useRef(0)

  useTick(({ deltaTime }) => {
    if (!enabled || !containerRef.current) return
    time.current += deltaTime * 0.016
    containerRef.current.alpha = 0.95 + Math.sin(time.current * 1.5) * 0.05
  })
}
