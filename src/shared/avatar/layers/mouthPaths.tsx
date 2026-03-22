import type { FaceExpression } from '../../stores/userStore'

interface MouthProps {
  expression: FaceExpression
}

export function MouthLayer({ expression }: MouthProps) {
  switch (expression) {
    case 'happy':
      return (
        <g>
          {/* Wide happy grin */}
          <path d="M178,130 Q200,148 222,130" fill="none" stroke="#CC7766" strokeWidth="2.5" strokeLinecap="round" />
          {/* Open mouth interior */}
          <path d="M182,130 Q200,144 218,130" fill="#AA5544" opacity="0.4" />
          {/* Top teeth row */}
          <path d="M186,131 L190,134 L194,131 L198,134 L202,131 L206,134 L210,131 L214,134" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />
          {/* Tongue hint */}
          <ellipse cx="200" cy="140" rx="6" ry="3" fill="#E57373" opacity="0.5" />
        </g>
      )
    case 'determined':
      return (
        <g>
          {/* Tight-lipped, tense */}
          <path d="M182,132 L218,132" fill="none" stroke="#CC7766" strokeWidth="3" strokeLinecap="round" />
          {/* Chin clench shadow */}
          <path d="M188,136 L212,136" fill="none" stroke="#CC7766" strokeWidth="1" opacity="0.2" />
          {/* Slight lip press */}
          <path d="M186,130 Q200,128 214,130" fill="none" stroke="#CC7766" strokeWidth="1" opacity="0.3" />
        </g>
      )
    case 'angry':
      return (
        <g>
          {/* Snarling open mouth */}
          <path d="M180,134 Q200,126 220,134" fill="none" stroke="#CC5544" strokeWidth="3" strokeLinecap="round" />
          {/* Mouth interior */}
          <path d="M184,132 Q200,127 216,132 Q200,140 184,132" fill="#882222" opacity="0.5" />
          {/* Sharp teeth / fangs */}
          <path d="M188,132 L190,137 L192,132" fill="white" stroke="white" strokeWidth="0.5" />
          <path d="M196,131 L198,136 L200,131" fill="white" stroke="white" strokeWidth="0.5" />
          <path d="M204,131 L206,136 L208,131" fill="white" stroke="white" strokeWidth="0.5" />
          <path d="M212,132 L214,137 L216,132" fill="white" stroke="white" strokeWidth="0.5" />
          {/* Canine fangs - longer */}
          <path d="M185,132 L186,139 L188,133" fill="white" />
          <path d="M216,132 L218,139 L220,133" fill="white" />
        </g>
      )
    case 'surprised':
      return (
        <g>
          {/* Big O mouth */}
          <ellipse cx="200" cy="134" rx="10" ry="14" fill="#AA5544" opacity="0.5" />
          <ellipse cx="200" cy="134" rx="10" ry="14" fill="none" stroke="#CC7766" strokeWidth="2" />
          {/* Tongue */}
          <ellipse cx="200" cy="140" rx="5" ry="3" fill="#E57373" opacity="0.5" />
          {/* Inner shadow */}
          <ellipse cx="200" cy="136" rx="7" ry="8" fill="#882222" opacity="0.2" />
        </g>
      )
    case 'cool':
      return (
        <g>
          {/* Slight asymmetric smirk */}
          <path d="M185,130 Q200,138 220,128" fill="none" stroke="#CC7766" strokeWidth="2.5" strokeLinecap="round" />
          {/* Corner uptick */}
          <path d="M218,128 L222,126" fill="none" stroke="#CC7766" strokeWidth="2" strokeLinecap="round" />
        </g>
      )
    default: // neutral
      return (
        <g>
          {/* Relaxed natural mouth */}
          <path d="M184,130 Q200,140 216,130" fill="none" stroke="#CC7766" strokeWidth="2.5" strokeLinecap="round" />
          {/* Subtle lower lip */}
          <path d="M190,134 Q200,138 210,134" fill="none" stroke="#CC7766" strokeWidth="1" opacity="0.2" />
        </g>
      )
  }
}

interface ExpressionExtrasProps {
  expression: FaceExpression
  skinTone: string
}

export function ExpressionExtras({ expression, skinTone: _st }: ExpressionExtrasProps) {
  switch (expression) {
    case 'happy':
      return (
        <g opacity="0.35">
          {/* Blush marks */}
          <ellipse cx="155" cy="118" rx="12" ry="6" fill="#FF8A80" />
          <ellipse cx="245" cy="118" rx="12" ry="6" fill="#FF8A80" />
        </g>
      )
    case 'angry':
      return (
        <g>
          {/* Anime anger vein */}
          <g transform="translate(240, 55)" opacity="0.7">
            <path d="M0,0 L5,-5 L10,0 L5,5 Z" fill="#E53935" />
            <line x1="5" y1="-5" x2="5" y2="5" stroke="#E53935" strokeWidth="1.2" />
            <line x1="0" y1="0" x2="10" y2="0" stroke="#E53935" strokeWidth="1.2" />
          </g>
          {/* Forehead vein */}
          <path d="M225,58 Q230,52 228,48" fill="none" stroke="#E53935" strokeWidth="1" opacity="0.4" />
        </g>
      )
    case 'surprised':
      return (
        <g>
          {/* Sweat drop */}
          <path
            d="M260,68 C262,62 265,68 263,74 C261,78 258,75 260,68Z"
            fill="#80D8FF"
            opacity="0.7"
          />
          {/* Impact lines */}
          <line x1="145" y1="70" x2="138" y2="65" stroke="#333" strokeWidth="1" opacity="0.2" />
          <line x1="255" y1="70" x2="262" y2="65" stroke="#333" strokeWidth="1" opacity="0.2" />
        </g>
      )
    default:
      return null
  }
}
