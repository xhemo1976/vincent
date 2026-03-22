import type { HairStyle, EyeStyle } from '../stores/userStore'
import { adjustColor, getOutfitColor } from '../avatar/constants'

interface AvatarMiniProps {
  hairColor: string
  hairStyle: HairStyle
  skinTone: string
  eyeStyle: EyeStyle
  outfitId: string
  size?: number
}

export function AvatarMini({
  hairColor,
  hairStyle,
  skinTone,
  eyeStyle,
  outfitId,
  size = 40,
}: AvatarMiniProps) {
  const outfit = getOutfitColor(outfitId)
  const darkHair = adjustColor(hairColor, -40)
  const highlightHair = adjustColor(hairColor, 30)
  const skinDark = adjustColor(skinTone, -20)

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs>
        <linearGradient id="miniSkinGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={skinTone} />
          <stop offset="100%" stopColor={skinDark} />
        </linearGradient>
        <clipPath id="miniCircle">
          <circle cx="50" cy="50" r="48" />
        </clipPath>
      </defs>

      {/* Clipped to circle */}
      <g clipPath="url(#miniCircle)">
        {/* BG fill */}
        <circle cx="50" cy="50" r="48" fill="rgba(0,0,0,0.15)" />

        {/* Body hint */}
        <path d="M28,78 L28,100 L72,100 L72,78 Q50,72 28,78Z" fill={outfit.main} />
        <path d="M28,78 L45,88 L50,86 L55,88 L72,78" fill="none" stroke={outfit.accent} strokeWidth="1" />

        {/* Neck */}
        <rect x="43" y="62" width="14" height="18" fill={skinTone} />

        {/* Head - anime shape */}
        <path
          d="M50,14 C72,14 82,30 82,48 C82,60 76,70 68,75 C62,78 56,80 50,80
             C44,80 38,78 32,75 C24,70 18,60 18,48 C18,30 28,14 50,14Z"
          fill="url(#miniSkinGrad)"
        />

        {/* Hair styles */}
        {hairStyle === 'spiky' && (
          <g>
            <path d="M18,42 L10,18 L24,32 L20,8 L36,28 L34,4 L48,24 L50,2 L56,24 L64,4 L68,28 L76,8 L78,32 L86,18 L82,42" fill={hairColor} />
            <path d="M30,35 C38,25 60,25 70,35" fill={darkHair} opacity="0.3" />
            <path d="M40,20 L42,10" stroke={highlightHair} strokeWidth="1.5" opacity="0.3" />
            <path d="M58,20 L60,10" stroke={highlightHair} strokeWidth="1.5" opacity="0.3" />
          </g>
        )}
        {hairStyle === 'long' && (
          <g>
            <path d="M18,42 C18,18 30,8 50,6 C70,8 82,18 82,42" fill={hairColor} />
            <path d="M18,42 L16,85 L24,78 L22,42" fill={hairColor} />
            <path d="M82,42 L84,85 L76,78 L78,42" fill={hairColor} />
            <path d="M30,36 C38,26 60,26 70,36" fill={darkHair} opacity="0.3" />
            <path d="M42,22 L44,14" stroke={highlightHair} strokeWidth="1.5" opacity="0.25" />
          </g>
        )}
        {hairStyle === 'short' && (
          <g>
            <path d="M20,40 C20,18 32,8 50,6 C68,8 80,18 80,40" fill={hairColor} />
            <path d="M24,38 L22,26 L34,36 L36,24 L46,34 L50,22 L54,34 L64,24 L66,36 L78,26 L76,38" fill={hairColor} />
            <path d="M28,35 C38,25 60,25 72,35" fill={darkHair} opacity="0.25" />
          </g>
        )}
        {hairStyle === 'mohawk' && (
          <g>
            <path d="M24,42 C24,30 35,20 50,18 C65,20 76,30 76,42" fill={darkHair} opacity="0.15" />
            <path d="M42,42 L36,2 L45,16 L50,0 L55,16 L64,2 L58,42" fill={hairColor} />
            <path d="M48,35 C48,18 49,8 50,4 C51,8 52,18 52,35" fill={highlightHair} opacity="0.25" />
          </g>
        )}
        {hairStyle === 'samurai' && (
          <g>
            <path d="M20,42 C20,18 32,8 50,6 C68,8 80,18 80,42" fill={hairColor} />
            <ellipse cx="50" cy="3" rx="9" ry="7" fill={hairColor} />
            <rect x="46" y="7" width="8" height="5" rx="2" fill={darkHair} />
            <path d="M20,42 L18,55 L24,50 L22,42" fill={hairColor} />
            <path d="M80,42 L82,55 L76,50 L78,42" fill={hairColor} />
          </g>
        )}

        {/* Eyes */}
        {eyeStyle === 'cyber' ? (
          <g>
            <rect x="30" y="42" width="14" height="8" rx="2" fill="white" stroke="#00E5FF" strokeWidth="1" />
            <circle cx="37" cy="46" r="2.5" fill="#00E5FF" />
            <circle cx="38" cy="45" r="1" fill="white" />
            <rect x="56" y="42" width="14" height="8" rx="2" fill="white" stroke="#00E5FF" strokeWidth="1" />
            <circle cx="63" cy="46" r="2.5" fill="#00E5FF" />
            <circle cx="64" cy="45" r="1" fill="white" />
          </g>
        ) : (
          <g>
            {/* Left eye */}
            <path d="M30,46 C33,40 43,40 46,46 C43,52 33,52 30,46Z" fill="white" />
            <ellipse cx="38" cy="46" rx="4" ry="5" fill="#1A1A2E" />
            <ellipse cx="38" cy="46" rx="2.5" ry="3" fill="#2D1B69" />
            <circle cx="40" cy="44" r="1.5" fill="white" />
            <path d="M29,46 C32,39 44,39 47,46" fill="none" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" />
            {/* Right eye */}
            <path d="M54,46 C57,40 67,40 70,46 C67,52 57,52 54,46Z" fill="white" />
            <ellipse cx="62" cy="46" rx="4" ry="5" fill="#1A1A2E" />
            <ellipse cx="62" cy="46" rx="2.5" ry="3" fill="#2D1B69" />
            <circle cx="64" cy="44" r="1.5" fill="white" />
            <path d="M53,46 C56,39 68,39 71,46" fill="none" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {/* Mouth */}
        <path d="M42,58 Q50,64 58,58" fill="none" stroke="#CC7766" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Border ring */}
      <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
    </svg>
  )
}
