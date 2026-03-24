import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { AuraColor } from '../stores/userStore'
import { AURA_COLORS } from '../avatar/constants'
import {
  compositeAvatarWithFallback,
  SKIN_MAP, HAIR_STYLE_MAP, HAIR_COLOR_MAP, OUTFIT_MAP,
  type SpriteAvatarConfig,
} from '../avatar/spriteCompositor'

interface SpriteAvatarProps {
  skinTone: string
  hairStyle: string
  hairColor: string
  outfitId: string
  aura: AuraColor
  size?: number
  idle?: boolean
}

export function SpriteAvatar({
  skinTone,
  hairStyle,
  hairColor,
  outfitId,
  aura,
  size = 256,
  idle = true,
}: SpriteAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loaded, setLoaded] = useState(false)
  const hasAura = aura !== 'none'
  const auraColors = AURA_COLORS[aura]

  // Map store values to LPC sprite names
  const spriteConfig: SpriteAvatarConfig = {
    skinTone: SKIN_MAP[skinTone] || 'light',
    hairStyle: HAIR_STYLE_MAP[hairStyle] || 'spiked',
    hairColor: HAIR_COLOR_MAP[hairColor] || 'black',
    torso: OUTFIT_MAP[outfitId] || 'longsleeve_white',
    legs: 'pants_black',
  }

  useEffect(() => {
    let cancelled = false

    async function render() {
      try {
        const result = await compositeAvatarWithFallback(spriteConfig, size)
        if (cancelled || !canvasRef.current) return

        const ctx = canvasRef.current.getContext('2d')
        if (!ctx) return
        ctx.imageSmoothingEnabled = false
        ctx.clearRect(0, 0, size, size)
        ctx.drawImage(result, 0, 0)
        setLoaded(true)
      } catch (e) {
        console.error('Sprite avatar render failed:', e)
      }
    }

    render()
    return () => { cancelled = true }
  }, [spriteConfig.skinTone, spriteConfig.hairStyle, spriteConfig.hairColor, spriteConfig.torso, size])

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      {/* Aura glow background */}
      {hasAura && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${auraColors[0]}40 0%, ${auraColors[1]}20 50%, transparent 70%)`,
            transform: 'scale(1.4)',
          }}
          animate={{
            scale: [1.3, 1.5, 1.3],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
      )}

      {/* Pixel art character */}
      <motion.canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="relative z-10"
        style={{
          imageRendering: 'pixelated',
          width: size,
          height: size,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
        animate={idle ? { y: [0, -4, 0] } : {}}
        transition={idle ? { repeat: Infinity, duration: 2.5, ease: 'easeInOut' } : {}}
      />

      {/* Aura particle sparkles (CSS-based for simplicity) */}
      {hasAura && (
        <>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full z-0"
              style={{
                width: 4 + Math.random() * 4,
                height: 4 + Math.random() * 4,
                backgroundColor: auraColors[i % 3],
                left: `${15 + Math.random() * 70}%`,
                bottom: `${Math.random() * 30}%`,
              }}
              animate={{
                y: [0, -(80 + Math.random() * 120)],
                x: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 50],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 2 + Math.random() * 2,
                delay: i * 0.4,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}

      {/* Ground shadow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full z-0"
        style={{
          bottom: -4,
          width: size * 0.5,
          height: size * 0.06,
          backgroundColor: 'rgba(0,0,0,0.12)',
        }}
      />
    </div>
  )
}

// Mini version for header
export function SpriteAvatarMini({
  skinTone,
  hairStyle,
  hairColor,
  outfitId,
  size = 40,
}: Omit<SpriteAvatarProps, 'aura' | 'idle'>) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const spriteConfig: SpriteAvatarConfig = {
    skinTone: SKIN_MAP[skinTone] || 'light',
    hairStyle: HAIR_STYLE_MAP[hairStyle] || 'spiked',
    hairColor: HAIR_COLOR_MAP[hairColor] || 'black',
    torso: OUTFIT_MAP[outfitId] || 'longsleeve_white',
    legs: 'pants_black',
  }

  useEffect(() => {
    let cancelled = false

    async function render() {
      try {
        const result = await compositeAvatarWithFallback(spriteConfig, 64)
        if (cancelled || !canvasRef.current) return

        const ctx = canvasRef.current.getContext('2d')
        if (!ctx) return
        ctx.imageSmoothingEnabled = false
        ctx.clearRect(0, 0, 64, 64)
        ctx.drawImage(result, 0, 0)
      } catch (e) {
        console.error('Mini sprite render failed:', e)
      }
    }

    render()
    return () => { cancelled = true }
  }, [spriteConfig.skinTone, spriteConfig.hairStyle, spriteConfig.hairColor, spriteConfig.torso])

  return (
    <canvas
      ref={canvasRef}
      width={64}
      height={64}
      style={{
        imageRendering: 'pixelated',
        width: size,
        height: size,
        borderRadius: '50%',
      }}
    />
  )
}
