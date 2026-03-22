import { motion } from 'framer-motion'
import type { EyeStyle, FaceExpression } from '../../stores/userStore'

interface EyeProps {
  style: EyeStyle
  expression: FaceExpression
  blinking: boolean
}

export function EyeLayer({ style, expression, blinking }: EyeProps) {
  if (blinking) {
    return (
      <g>
        <path d="M155,102 Q170,98 185,102" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M215,102 Q230,98 245,102" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>
    )
  }

  const eyebrowY = expression === 'angry' ? -4 : expression === 'surprised' ? -7 : 0
  const eyebrowAngleL = expression === 'angry' ? 'rotate(-10, 170, 82)' : ''
  const eyebrowAngleR = expression === 'angry' ? 'rotate(10, 230, 82)' : ''
  const eyeScaleY = expression === 'surprised' ? 1.25 : expression === 'cool' ? 0.7 : 1

  switch (style) {
    case 'sharp':
      return <SharpEyes eyebrowY={eyebrowY} eyebrowAngleL={eyebrowAngleL} eyebrowAngleR={eyebrowAngleR} eyeScaleY={eyeScaleY} expression={expression} />
    case 'round':
      return <RoundEyes eyebrowY={eyebrowY} eyebrowAngleL={eyebrowAngleL} eyebrowAngleR={eyebrowAngleR} eyeScaleY={eyeScaleY} expression={expression} />
    case 'narrow':
      return <NarrowEyes eyebrowY={eyebrowY} eyebrowAngleL={eyebrowAngleL} eyebrowAngleR={eyebrowAngleR} eyeScaleY={eyeScaleY} expression={expression} />
    case 'cyber':
      return <CyberEyes eyebrowY={eyebrowY} expression={expression} />
  }
}

interface StyleEyeProps {
  eyebrowY: number
  eyebrowAngleL: string
  eyebrowAngleR: string
  eyeScaleY: number
  expression: FaceExpression
}

function SharpEyes({ eyebrowY, eyebrowAngleL, eyebrowAngleR, eyeScaleY, expression }: StyleEyeProps) {
  return (
    <g>
      {/* Left eye */}
      <g transform={`scale(1,${eyeScaleY})`} style={{ transformOrigin: '170px 100px' }}>
        {/* Eye white - almond shape */}
        <path d="M153,100 C158,90 178,90 185,100 C178,112 158,112 153,100Z" fill="white" />
        {/* Iris - multi-ring */}
        <ellipse cx="170" cy="100" rx="9" ry="10" fill="#1A1A2E" />
        <ellipse cx="170" cy="100" rx="7" ry="8" fill="#2D1B69" />
        <ellipse cx="170" cy="101" rx="4" ry="5" fill="#4A2D99" />
        {/* Pupil */}
        <ellipse cx="170" cy="101" rx="3" ry="3.5" fill="#0D0D1A" />
        {/* Specular highlights */}
        <circle cx="174" cy="96" r="3" fill="white" />
        <circle cx="166" cy="104" r="1.5" fill="white" opacity="0.7" />
        {/* Upper eyelid - thick anime line */}
        <path d="M152,100 C157,89 179,89 186,100" fill="none" stroke="#1A1A2E" strokeWidth="3.5" strokeLinecap="round" />
        {/* Lower eyelid hint */}
        <path d="M157,107 C163,111 177,111 183,107" fill="none" stroke="#1A1A2E" strokeWidth="1" opacity="0.3" />
        {/* Eyelash accents */}
        <path d="M153,98 L149,93" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" />
        <path d="M185,98 L189,93" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* Left eyebrow */}
      <path
        d={`M150,${82 + eyebrowY} C158,${76 + eyebrowY} 178,${76 + eyebrowY} 188,${82 + eyebrowY}`}
        fill="none" stroke="#1A1A2E" strokeWidth="3.5" strokeLinecap="round"
        transform={eyebrowAngleL}
      />

      {/* Right eye */}
      <g transform={`scale(1,${eyeScaleY})`} style={{ transformOrigin: '230px 100px' }}>
        <path d="M215,100 C220,90 240,90 247,100 C240,112 220,112 215,100Z" fill="white" />
        <ellipse cx="230" cy="100" rx="9" ry="10" fill="#1A1A2E" />
        <ellipse cx="230" cy="100" rx="7" ry="8" fill="#2D1B69" />
        <ellipse cx="230" cy="101" rx="4" ry="5" fill="#4A2D99" />
        <ellipse cx="230" cy="101" rx="3" ry="3.5" fill="#0D0D1A" />
        <circle cx="234" cy="96" r="3" fill="white" />
        <circle cx="226" cy="104" r="1.5" fill="white" opacity="0.7" />
        <path d="M214,100 C219,89 241,89 248,100" fill="none" stroke="#1A1A2E" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M219,107 C225,111 239,111 245,107" fill="none" stroke="#1A1A2E" strokeWidth="1" opacity="0.3" />
        <path d="M215,98 L211,93" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" />
        <path d="M247,98 L251,93" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" />
      </g>
      <path
        d={`M212,${82 + eyebrowY} C220,${76 + eyebrowY} 240,${76 + eyebrowY} 250,${82 + eyebrowY}`}
        fill="none" stroke="#1A1A2E" strokeWidth="3.5" strokeLinecap="round"
        transform={eyebrowAngleR}
      />

      {/* Cool shades overlay */}
      {expression === 'cool' && (
        <g opacity="0.18">
          <rect x="148" y="92" width="42" height="20" rx="10" fill="#1A1A2E" />
          <rect x="210" y="92" width="42" height="20" rx="10" fill="#1A1A2E" />
          <line x1="190" y1="102" x2="210" y2="102" stroke="#1A1A2E" strokeWidth="2.5" />
        </g>
      )}
    </g>
  )
}

function RoundEyes({ eyebrowY, eyebrowAngleL, eyebrowAngleR, eyeScaleY, expression }: StyleEyeProps) {
  return (
    <g>
      {/* Left eye */}
      <g transform={`scale(1,${eyeScaleY})`} style={{ transformOrigin: '170px 100px' }}>
        <ellipse cx="170" cy="100" rx="14" ry="14" fill="white" stroke="#333" strokeWidth="1.5" />
        <ellipse cx="171" cy="101" rx="9" ry="10" fill="#2D1B69" />
        <ellipse cx="171" cy="101" rx="6" ry="7" fill="#4527A0" />
        <ellipse cx="171" cy="102" rx="3" ry="4" fill="#7C4DFF" />
        <circle cx="175" cy="96" r="3.5" fill="white" />
        <circle cx="166" cy="105" r="1.8" fill="white" opacity="0.6" />
        <path d="M156,96 C160,90 180,90 184,96" fill="none" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <path
        d={`M154,${80 + eyebrowY} C162,${74 + eyebrowY} 178,${74 + eyebrowY} 186,${80 + eyebrowY}`}
        fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round"
        transform={eyebrowAngleL}
      />

      {/* Right eye */}
      <g transform={`scale(1,${eyeScaleY})`} style={{ transformOrigin: '230px 100px' }}>
        <ellipse cx="230" cy="100" rx="14" ry="14" fill="white" stroke="#333" strokeWidth="1.5" />
        <ellipse cx="231" cy="101" rx="9" ry="10" fill="#2D1B69" />
        <ellipse cx="231" cy="101" rx="6" ry="7" fill="#4527A0" />
        <ellipse cx="231" cy="102" rx="3" ry="4" fill="#7C4DFF" />
        <circle cx="235" cy="96" r="3.5" fill="white" />
        <circle cx="226" cy="105" r="1.8" fill="white" opacity="0.6" />
        <path d="M216,96 C220,90 240,90 244,96" fill="none" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <path
        d={`M214,${80 + eyebrowY} C222,${74 + eyebrowY} 238,${74 + eyebrowY} 246,${80 + eyebrowY}`}
        fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round"
        transform={eyebrowAngleR}
      />

      {expression === 'cool' && (
        <g opacity="0.18">
          <rect x="150" y="90" width="40" height="22" rx="11" fill="#1A1A2E" />
          <rect x="210" y="90" width="40" height="22" rx="11" fill="#1A1A2E" />
          <line x1="190" y1="101" x2="210" y2="101" stroke="#1A1A2E" strokeWidth="2.5" />
        </g>
      )}
    </g>
  )
}

function NarrowEyes({ eyebrowY, eyebrowAngleL, eyebrowAngleR, eyeScaleY: _s, expression }: StyleEyeProps) {
  return (
    <g>
      {/* Left eye - slit-like, intense */}
      <path d="M152,100 C160,92 180,92 188,100 C180,107 160,107 152,100Z" fill="white" />
      <ellipse cx="170" cy="100" rx="7" ry="5" fill="#1A1A2E" />
      <ellipse cx="170" cy="100" rx="5" ry="3.5" fill="#4A148C" />
      <circle cx="173" cy="98" r="2" fill="white" />
      <path d="M150,100 C158,91 182,91 190,100" fill="none" stroke="#1A1A2E" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M150,98 L145,92" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M190,98 L195,92" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" />

      <path
        d={`M148,${84 + eyebrowY} C158,${78 + eyebrowY} 180,${78 + eyebrowY} 192,${84 + eyebrowY}`}
        fill="none" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round"
        transform={eyebrowAngleL}
      />

      {/* Right eye */}
      <path d="M212,100 C220,92 240,92 248,100 C240,107 220,107 212,100Z" fill="white" />
      <ellipse cx="230" cy="100" rx="7" ry="5" fill="#1A1A2E" />
      <ellipse cx="230" cy="100" rx="5" ry="3.5" fill="#4A148C" />
      <circle cx="233" cy="98" r="2" fill="white" />
      <path d="M210,100 C218,91 242,91 250,100" fill="none" stroke="#1A1A2E" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M210,98 L205,92" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M250,98 L255,92" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" />

      <path
        d={`M208,${84 + eyebrowY} C218,${78 + eyebrowY} 240,${78 + eyebrowY} 252,${84 + eyebrowY}`}
        fill="none" stroke="#1A1A2E" strokeWidth="4" strokeLinecap="round"
        transform={eyebrowAngleR}
      />

      {expression === 'cool' && (
        <g opacity="0.18">
          <rect x="146" y="92" width="48" height="18" rx="9" fill="#1A1A2E" />
          <rect x="206" y="92" width="48" height="18" rx="9" fill="#1A1A2E" />
          <line x1="194" y1="101" x2="206" y2="101" stroke="#1A1A2E" strokeWidth="2.5" />
        </g>
      )}
    </g>
  )
}

function CyberEyes({ eyebrowY, expression }: { eyebrowY: number; expression: FaceExpression }) {
  return (
    <g>
      {/* Left eye - HUD visor */}
      <rect x="152" y="92" width="34" height="18" rx="4" fill="#00E5FF" opacity="0.12" />
      <rect x="154" y="93" width="30" height="16" rx="3" fill="white" />
      <rect x="154" y="93" width="30" height="16" rx="3" fill="none" stroke="#00E5FF" strokeWidth="2" />
      <ellipse cx="170" cy="101" rx="6" ry="6" fill="#00E5FF" />
      <ellipse cx="170" cy="101" rx="3.5" ry="3.5" fill="#00B8D4" />
      <circle cx="173" cy="98" r="2" fill="white" />
      {/* Scan line */}
      <motion.line
        x1="156" y1="101" x2="182" y2="101"
        stroke="#00E5FF" strokeWidth="0.8" opacity="0.5"
        animate={{ x2: [156, 182, 156] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
      {/* HUD brackets */}
      <path d="M154,95 L150,95 L150,107 L154,107" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.4" />
      <path d="M184,95 L188,95 L188,107 L184,107" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.4" />
      {/* Eyebrow - tech style */}
      <path d={`M150,${82 + eyebrowY} L190,${82 + eyebrowY}`} stroke="#00E5FF" strokeWidth="3" strokeLinecap="round" />

      {/* Right eye */}
      <rect x="214" y="92" width="34" height="18" rx="4" fill="#00E5FF" opacity="0.12" />
      <rect x="216" y="93" width="30" height="16" rx="3" fill="white" />
      <rect x="216" y="93" width="30" height="16" rx="3" fill="none" stroke="#00E5FF" strokeWidth="2" />
      <ellipse cx="232" cy="101" rx="6" ry="6" fill="#00E5FF" />
      <ellipse cx="232" cy="101" rx="3.5" ry="3.5" fill="#00B8D4" />
      <circle cx="235" cy="98" r="2" fill="white" />
      <motion.line
        x1="218" y1="101" x2="244" y2="101"
        stroke="#00E5FF" strokeWidth="0.8" opacity="0.5"
        animate={{ x2: [218, 244, 218] }}
        transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
      />
      <path d="M216,95 L212,95 L212,107 L216,107" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.4" />
      <path d="M246,95 L250,95 L250,107 L246,107" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.4" />
      <path d={`M210,${82 + eyebrowY} L250,${82 + eyebrowY}`} stroke="#00E5FF" strokeWidth="3" strokeLinecap="round" />

      {expression === 'cool' && (
        <g opacity="0.15">
          <rect x="148" y="88" width="44" height="26" rx="6" fill="#00E5FF" />
          <rect x="208" y="88" width="44" height="26" rx="6" fill="#00E5FF" />
        </g>
      )}
    </g>
  )
}
