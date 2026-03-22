import { useRef } from 'react'
import { useTick } from '@pixi/react'
import { GlowFilter as PixiGlowFilter } from 'pixi.js'

interface GlowConfig {
  color: string
  enabled: boolean
}

export function useGlowFilter({ color, enabled }: GlowConfig) {
  const filter = useRef<PixiGlowFilter | null>(null)
  const time = useRef(0)

  if (enabled && !filter.current) {
    const colorNum = parseInt(color.replace('#', ''), 16)
    filter.current = new PixiGlowFilter({
      distance: 12,
      outerStrength: 3,
      innerStrength: 0,
      color: colorNum,
      quality: 0.3,
    })
  }

  if (!enabled && filter.current) {
    filter.current = null
  }

  useTick(({ deltaTime }) => {
    if (!enabled || !filter.current) return
    time.current += deltaTime * 0.016
    filter.current.outerStrength = 2 + Math.sin(time.current * 1.5) * 2
  })

  return enabled && filter.current ? [filter.current] : []
}
