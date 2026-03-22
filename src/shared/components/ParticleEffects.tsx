import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  drift: number
  duration: number
  delay: number
  color: string
}

type EffectType = 'stars' | 'fire' | 'sparkles' | 'confetti'

const COLORS: Record<EffectType, string[]> = {
  stars: ['#ffffff', '#e8e6f0', '#9B8FFF', '#5AA3FF'],
  fire: ['#FF6B6B', '#FFA05C', '#FFD700', '#FF4444'],
  sparkles: ['#FFD700', '#FFC107', '#FFE082', '#FFFFFF'],
  confetti: ['#FF6B6B', '#9B8FFF', '#2ECC96', '#5AA3FF', '#FFD700', '#FF7BAD'],
}

function generateParticles(count: number, type: EffectType, originX?: number, originY?: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: Date.now() + i,
    x: originX ?? Math.random() * 100,
    y: originY ?? Math.random() * 100,
    size: type === 'confetti' ? 6 + Math.random() * 8 : 3 + Math.random() * 5,
    drift: (Math.random() - 0.5) * 80,
    duration: 0.8 + Math.random() * 1.2,
    delay: Math.random() * 0.3,
    color: COLORS[type][Math.floor(Math.random() * COLORS[type].length)],
  }))
}

interface ParticleBurstProps {
  type: EffectType
  count?: number
  originX?: number
  originY?: number
  trigger: number
}

export function ParticleBurst({ type, count = 15, originX, originY, trigger }: ParticleBurstProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    if (trigger <= 0) return
    const newParticles = generateParticles(count, type, originX, originY)
    setParticles(newParticles)
    const timer = setTimeout(() => setParticles([]), 2000)
    return () => clearTimeout(timer)
  }, [trigger, type, count, originX, originY])

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              top: `${p.y - 15 - Math.random() * 20}%`,
              left: `${p.x + (Math.random() - 0.5) * 10}%`,
              scale: 0,
              opacity: 0,
              rotate: type === 'confetti' ? Math.random() * 720 : 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: type === 'confetti' ? '2px' : '50%',
              boxShadow: type === 'stars' || type === 'sparkles'
                ? `0 0 ${p.size * 2}px ${p.color}`
                : 'none',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export function AmbientParticles({ count = 20 }: { count?: number }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: count }, (_, i) => {
        const size = 2 + Math.random() * 3
        const x = Math.random() * 100
        const duration = 4 + Math.random() * 8
        const delay = Math.random() * duration
        return (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.5, 0.1],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${60 + Math.random() * 35}%`,
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: 'rgba(var(--color-primary-rgb), 0.3)',
              boxShadow: `0 0 ${size * 3}px rgba(var(--color-primary-rgb), 0.2)`,
            }}
          />
        )
      })}
    </div>
  )
}
