import { lazy, Suspense, useState } from 'react'
import type { HairStyle, EyeStyle, AuraColor, FaceExpression } from '../stores/userStore'
import { AvatarSVG } from './AvatarSVG'

export interface AvatarPixiProps {
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

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

const AvatarPixiCanvas = lazy(() => import('./AvatarPixiCanvas'))

export function AvatarPixi(props: AvatarPixiProps) {
  const { size = 240 } = props
  const [webGL] = useState(hasWebGL)

  if (!webGL) {
    return <AvatarSVG {...props} size={size} idle />
  }

  return (
    <Suspense fallback={<AvatarSVG {...props} size={size} idle />}>
      <AvatarPixiCanvas {...props} />
    </Suspense>
  )
}
