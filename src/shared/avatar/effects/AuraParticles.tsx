import { useRef, useCallback } from 'react'
import { extend, useTick } from '@pixi/react'
import { Graphics } from 'pixi.js'

extend({ Graphics })

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  radius: number
  color: number
  life: number
  maxLife: number
}

interface AuraParticlesProps {
  colors: string[]
  width: number
  height: number
  intensity?: number
}

function hexToNum(hex: string): number {
  return parseInt(hex.replace('#', ''), 16)
}

export function AuraParticles({ colors, width, height, intensity = 1 }: AuraParticlesProps) {
  const particleCount = Math.round(40 * intensity)
  const particles = useRef<Particle[]>([])
  const graphicsRef = useRef<Graphics>(null)
  const colorNums = colors.map(hexToNum)

  // Initialize particles lazily
  if (particles.current.length === 0) {
    for (let i = 0; i < particleCount; i++) {
      particles.current.push(createParticle(width, height, colorNums))
    }
  }

  useTick(({ deltaTime }) => {
    const gfx = graphicsRef.current
    if (!gfx) return

    gfx.clear()

    for (let i = 0; i < particles.current.length; i++) {
      const p = particles.current[i]
      p.life += deltaTime * 0.016
      p.x += p.vx * deltaTime
      p.y += p.vy * deltaTime
      p.vx += Math.sin(p.life * 3) * 0.02 * deltaTime

      const progress = p.life / p.maxLife
      p.alpha = progress < 0.2
        ? progress / 0.2
        : progress > 0.7
          ? (1 - progress) / 0.3
          : 1
      p.alpha *= 0.6

      const currentRadius = p.radius * (1 - progress * 0.4)

      if (p.life >= p.maxLife) {
        particles.current[i] = createParticle(width, height, colorNums)
      } else {
        gfx.circle(p.x, p.y, currentRadius)
          .fill({ color: p.color, alpha: p.alpha })
      }
    }
  })

  const draw = useCallback(() => {}, [])

  return <pixiGraphics ref={graphicsRef} draw={draw} />
}

function createParticle(width: number, height: number, colors: number[]): Particle {
  return {
    x: width * 0.2 + Math.random() * width * 0.6,
    y: height * 0.7 + Math.random() * height * 0.25,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -(0.5 + Math.random() * 0.8),
    alpha: 0,
    radius: 2 + Math.random() * 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: Math.random() * 2, // stagger start
    maxLife: 3 + Math.random() * 2,
  }
}
