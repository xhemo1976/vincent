import { useState, useEffect, forwardRef } from 'react'
import { motion } from 'framer-motion'
import type { HairStyle, EyeStyle, AuraColor, FaceExpression } from '../stores/userStore'
import { AURA_COLORS, adjustColor, getOutfitColor, AVATAR_VIEWBOX } from '../avatar/constants'
import { HeadShape } from '../avatar/layers/headPaths'
import { BodyShape } from '../avatar/layers/bodyPaths'
import { HairLayer } from '../avatar/layers/hairPaths'
import { EyeLayer } from '../avatar/layers/eyePaths'
import { MouthLayer, ExpressionExtras } from '../avatar/layers/mouthPaths'
import { OutfitDetails } from '../avatar/layers/outfitPaths'
import { AccessoryLayer, isBehindBody } from '../avatar/layers/accessoryPaths'

interface AvatarSVGProps {
  hairColor: string
  hairStyle: HairStyle
  skinTone: string
  eyeStyle: EyeStyle
  aura: AuraColor
  expression?: FaceExpression
  outfitId: string
  accessoryId: string
  size?: number
  idle?: boolean
}

export const AvatarSVG = forwardRef<SVGSVGElement, AvatarSVGProps>(function AvatarSVG({
  hairColor,
  hairStyle,
  skinTone,
  eyeStyle,
  aura,
  expression = 'neutral',
  outfitId,
  accessoryId,
  size = 280,
  idle = true,
}, ref) {
  const outfit = getOutfitColor(outfitId)
  const skinDark = adjustColor(skinTone, -30)
  const auraColors = AURA_COLORS[aura]
  const hasAura = aura !== 'none'

  const [blinking, setBlinking] = useState(false)
  useEffect(() => {
    if (!idle) return
    const blink = () => {
      setBlinking(true)
      setTimeout(() => setBlinking(false), 150)
    }
    const interval = setInterval(blink, 3000 + Math.random() * 2000)
    return () => clearInterval(interval)
  }, [idle])

  const behindBody = accessoryId && isBehindBody(accessoryId)
  const frontAccessory = accessoryId && !isBehindBody(accessoryId) && accessoryId !== ''

  return (
    <motion.svg
      ref={ref}
      width={size}
      height={size * 1.25}
      viewBox={AVATAR_VIEWBOX}
      animate={hasAura ? {
        filter: [
          `drop-shadow(0 0 8px ${auraColors[1]})`,
          `drop-shadow(0 0 20px ${auraColors[1]})`,
          `drop-shadow(0 0 8px ${auraColors[1]})`,
        ],
      } : {}}
      transition={hasAura ? { repeat: Infinity, duration: 1.5 } : {}}
    >
      <defs>
        {/* Skin gradient */}
        <linearGradient id="skinGrad" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor={skinTone} />
          <stop offset="100%" stopColor={skinDark} />
        </linearGradient>
        {/* Body/outfit gradient */}
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={outfit.main} />
          <stop offset="100%" stopColor={outfit.dark} />
        </linearGradient>
        {/* Belt gradient */}
        <linearGradient id="beltGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1A1A2E" />
          <stop offset="50%" stopColor="#333355" />
          <stop offset="100%" stopColor="#1A1A2E" />
        </linearGradient>
        {/* Aura radial */}
        {hasAura && (
          <radialGradient id="auraGlow">
            <stop offset="0%" stopColor={auraColors[0]} stopOpacity="0.3" />
            <stop offset="50%" stopColor={auraColors[1]} stopOpacity="0.1" />
            <stop offset="100%" stopColor={auraColors[2]} stopOpacity="0" />
          </radialGradient>
        )}
        {/* Shadow filter */}
        <filter id="charShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* === AURA BACKGROUND === */}
      {hasAura && (
        <>
          <motion.ellipse
            cx="200" cy="260" rx="170" ry="220"
            fill="url(#auraGlow)"
            animate={{ rx: [170, 185, 170], ry: [220, 235, 220], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />
          {/* Energy lines */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <motion.line
              key={i}
              x1={80 + i * 32} y1="460"
              x2={80 + i * 32 + (i % 2 === 0 ? -12 : 12)} y2="60"
              stroke={auraColors[i % 3]}
              strokeWidth="1.5" strokeLinecap="round" opacity="0.25"
              animate={{ y1: [460, 448, 460], opacity: [0.08, 0.35, 0.08] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.15 }}
            />
          ))}
        </>
      )}

      {/* === BEHIND-BODY ACCESSORIES (Cape, Wings) === */}
      {behindBody && <AccessoryLayer id={accessoryId} />}

      {/* === MAIN CHARACTER GROUP with idle animation === */}
      <motion.g
        filter="url(#charShadow)"
        animate={idle ? { y: [0, -4, 0] } : {}}
        transition={idle ? { repeat: Infinity, duration: 2.5, ease: 'easeInOut' } : {}}
      >
        {/* Body (legs, torso, arms) */}
        <BodyShape skinTone={skinTone} outfitId={outfitId} />

        {/* Outfit special details */}
        <OutfitDetails outfitId={outfitId} />

        {/* Neck + Head */}
        <HeadShape skinTone={skinTone} />

        {/* Expression extras (blush, anger vein, sweat) */}
        <ExpressionExtras expression={expression} skinTone={skinTone} />

        {/* Mouth */}
        <MouthLayer expression={expression} />

        {/* Eyes */}
        <EyeLayer style={eyeStyle} expression={expression} blinking={blinking} />

        {/* Hair (on top of head) */}
        <HairLayer style={hairStyle} color={hairColor} />

        {/* Front accessories (headband, glasses, crown, masks, sword, shield, necklace) */}
        {frontAccessory && <AccessoryLayer id={accessoryId} />}
      </motion.g>

      {/* Ground shadow */}
      <ellipse cx="200" cy="468" rx="75" ry="10" fill="black" opacity="0.12" />
    </motion.svg>
  )
})

// Re-export AvatarMini for backward compatibility
export { AvatarMini } from './AvatarMini'
