import { useRef, useEffect, useState, useCallback } from 'react'
import { Application, extend, useTick } from '@pixi/react'
import { Container, Sprite, Graphics, Texture } from 'pixi.js'
import type { HairStyle, EyeStyle, AuraColor, FaceExpression } from '../stores/userStore'
import { AURA_COLORS } from '../avatar/constants'
import { AvatarSVG } from './AvatarSVG'
import { svgElementToTexture } from '../avatar/svgToTexture'
import { AuraParticles } from '../avatar/effects/AuraParticles'
import { useIdleAnimation } from '../avatar/effects/IdleAnimation'

extend({ Container, Sprite, Graphics })

interface AvatarPixiCanvasProps {
  hairColor: string
  hairStyle: HairStyle
  skinTone: string
  eyeStyle: EyeStyle
  aura: AuraColor
  expression?: FaceExpression
  outfitId: string
  accessoryId: string
  size?: number
}

export default function AvatarPixiCanvas({
  hairColor, hairStyle, skinTone, eyeStyle, aura,
  expression = 'neutral', outfitId, accessoryId, size = 240,
}: AvatarPixiCanvasProps) {
  const auraColors = AURA_COLORS[aura]
  const hasAura = aura !== 'none'
  const svgRef = useRef<SVGSVGElement>(null)
  const [texture, setTexture] = useState<Texture | null>(null)

  const canvasWidth = size + 60
  const canvasHeight = Math.round(size * 1.25) + 40

  // Convert SVG to texture when config changes
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!svgRef.current) return
      try {
        const tex = await svgElementToTexture(svgRef.current, size, Math.round(size * 1.25))
        setTexture(tex)
      } catch (e) {
        console.error('SVG to texture failed:', e)
      }
    }, 80)
    return () => clearTimeout(timer)
  }, [hairColor, hairStyle, skinTone, eyeStyle, aura, expression, outfitId, accessoryId, size])

  return (
    <div style={{ position: 'relative', width: canvasWidth, height: canvasHeight }}>
      {/* Hidden SVG for texture generation (no aura — PixiJS handles that) */}
      <div style={{ position: 'absolute', left: -9999, top: -9999, pointerEvents: 'none' }}>
        <AvatarSVG
          ref={svgRef}
          hairColor={hairColor}
          hairStyle={hairStyle}
          skinTone={skinTone}
          eyeStyle={eyeStyle}
          aura="none"
          expression={expression}
          outfitId={outfitId}
          accessoryId={accessoryId}
          size={size}
          idle={false}
        />
      </div>

      {/* PixiJS Canvas */}
      {texture ? (
        <Application
          width={canvasWidth}
          height={canvasHeight}
          backgroundAlpha={0}
          antialias
        >
          <PixiScene
            texture={texture}
            hasAura={hasAura}
            auraColors={auraColors}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            size={size}
          />
        </Application>
      ) : (
        // Fallback while texture loads
        <AvatarSVG
          hairColor={hairColor}
          hairStyle={hairStyle}
          skinTone={skinTone}
          eyeStyle={eyeStyle}
          aura={aura}
          expression={expression}
          outfitId={outfitId}
          accessoryId={accessoryId}
          size={size}
          idle
        />
      )}
    </div>
  )
}

function PixiScene({
  texture, hasAura, auraColors, canvasWidth, canvasHeight, size,
}: {
  texture: Texture
  hasAura: boolean
  auraColors: string[]
  canvasWidth: number
  canvasHeight: number
  size: number
}) {
  const containerRef = useRef<Container>(null)

  useIdleAnimation({ containerRef, enabled: true })

  // Glow pulsing via useTick
  const glowRef = useRef({ time: 0 })
  useTick(({ deltaTime }) => {
    if (!hasAura || !containerRef.current) return
    glowRef.current.time += deltaTime * 0.016
    const strength = 4 + Math.sin(glowRef.current.time * 1.5) * 4
    // Apply as alpha-based glow via container alpha pulse
    containerRef.current.alpha = 0.95 + Math.sin(glowRef.current.time * 1.5) * 0.05
    void strength // glow filter would go here if pixi filters are available
  })

  const drawShadow = useCallback((g: Graphics) => {
    g.clear()
    g.ellipse(canvasWidth / 2, canvasHeight - 12, 60, 8)
      .fill({ color: 0x000000, alpha: 0.12 })
  }, [canvasWidth, canvasHeight])

  return (
    <>
      {/* Aura particles behind character */}
      {hasAura && (
        <AuraParticles
          colors={auraColors}
          width={canvasWidth}
          height={canvasHeight}
        />
      )}

      {/* Character sprite */}
      <pixiContainer
        ref={containerRef}
        x={canvasWidth / 2}
        y={(canvasHeight - 12) / 2}
      >
        <pixiSprite
          texture={texture}
          anchor={0.5}
          width={size}
          height={Math.round(size * 1.25)}
        />
      </pixiContainer>

      {/* Ground shadow */}
      <pixiGraphics draw={drawShadow} />
    </>
  )
}
