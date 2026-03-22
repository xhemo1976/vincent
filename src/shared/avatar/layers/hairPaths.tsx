import type { HairStyle } from '../../stores/userStore'
import { adjustColor } from '../constants'

interface HairProps {
  style: HairStyle
  color: string
}

export function HairLayer({ style, color }: HairProps) {
  const dark = adjustColor(color, -50)
  const highlight = adjustColor(color, 40)

  switch (style) {
    case 'spiky':
      return <SpikyHair color={color} dark={dark} highlight={highlight} />
    case 'long':
      return <LongHair color={color} dark={dark} highlight={highlight} />
    case 'short':
      return <ShortHair color={color} dark={dark} highlight={highlight} />
    case 'mohawk':
      return <MohawkHair color={color} dark={dark} highlight={highlight} />
    case 'samurai':
      return <SamuraiHair color={color} dark={dark} highlight={highlight} />
  }
}

interface StyleProps { color: string; dark: string; highlight: string }

function SpikyHair({ color, dark, highlight }: StyleProps) {
  return (
    <g>
      {/* Base hair volume */}
      <path
        d="M200,28 C245,28 275,52 278,88 C278,70 270,48 260,38
           L200,28
           L140,38 C130,48 122,70 122,88 C125,52 155,28 200,28Z"
        fill={color}
      />

      {/* Main spikes - Goku/Naruto style, aggressive and dynamic */}
      {/* Center spike */}
      <path d="M195,42 L188,2 L200,28 L212,2 L205,42" fill={color} />
      <path d="M197,38 L194,12 L200,30 L206,12 L203,38" fill={highlight} opacity="0.3" />

      {/* Left spikes */}
      <path d="M170,48 L148,6 L172,35 L155,0 L178,40" fill={color} />
      <path d="M172,44 L156,14 L174,36" fill={highlight} opacity="0.25" />

      <path d="M150,60 L118,22 L152,48 L125,10 L158,52" fill={color} />
      <path d="M152,56 L128,28 L154,48" fill={highlight} opacity="0.2" />

      {/* Far left spike */}
      <path d="M135,72 L95,42 L130,62 L100,30 L140,65" fill={color} />

      {/* Right spikes */}
      <path d="M230,48 L252,6 L228,35 L245,0 L222,40" fill={color} />
      <path d="M228,44 L244,14 L226,36" fill={highlight} opacity="0.25" />

      <path d="M250,60 L282,22 L248,48 L275,10 L242,52" fill={color} />
      <path d="M248,56 L272,28 L246,48" fill={highlight} opacity="0.2" />

      {/* Far right spike */}
      <path d="M265,72 L305,42 L270,62 L300,30 L260,65" fill={color} />

      {/* Side tufts near ears */}
      <path d="M128,80 L105,60 L125,75 L108,50 L132,72" fill={color} />
      <path d="M272,80 L295,60 L275,75 L292,50 L268,72" fill={color} />

      {/* Hair shadow under spikes */}
      <path
        d="M135,70 C145,55 170,42 200,40 C230,42 255,55 265,70
           L260,78 C252,62 230,50 200,48 C170,50 148,62 140,78Z"
        fill={dark}
        opacity="0.35"
      />

      {/* Strand detail lines */}
      <path d="M165,55 L160,38" fill="none" stroke={dark} strokeWidth="1" opacity="0.2" />
      <path d="M185,48 L182,30" fill="none" stroke={dark} strokeWidth="1" opacity="0.2" />
      <path d="M215,48 L218,30" fill="none" stroke={dark} strokeWidth="1" opacity="0.2" />
      <path d="M235,55 L240,38" fill="none" stroke={dark} strokeWidth="1" opacity="0.2" />
    </g>
  )
}

function LongHair({ color, dark, highlight }: StyleProps) {
  return (
    <g>
      {/* Back hair - flows down behind shoulders */}
      <path
        d="M122,80 C118,110 112,170 118,240 C120,252 128,258 136,248 C142,230 138,160 134,100 L132,80"
        fill={color}
      />
      <path
        d="M278,80 C282,110 288,170 282,240 C280,252 272,258 264,248 C258,230 262,160 266,100 L268,80"
        fill={color}
      />

      {/* Main hair dome */}
      <path
        d="M122,88 C122,42 148,22 200,18 C252,22 278,42 278,88"
        fill={color}
      />

      {/* Flowing side strands - left */}
      <path d="M128,85 C124,100 120,140 122,180 C124,200 130,210 134,200 C136,185 132,130 130,90" fill={color} />
      <path d="M130,90 C128,105 126,135 127,160" fill="none" stroke={highlight} strokeWidth="2" opacity="0.3" />

      {/* Flowing side strands - right */}
      <path d="M272,85 C276,100 280,140 278,180 C276,200 270,210 266,200 C264,185 268,130 270,90" fill={color} />
      <path d="M270,90 C272,105 274,135 273,160" fill="none" stroke={highlight} strokeWidth="2" opacity="0.3" />

      {/* Bangs - layered fringe */}
      <path d="M145,65 L138,82 L148,72 L142,88" fill={color} />
      <path d="M165,58 L158,78 L168,66 L162,82" fill={color} />
      <path d="M185,54 L180,75 L188,62 L184,78" fill={color} />
      <path d="M215,54 L220,75 L212,62 L216,78" fill={color} />
      <path d="M235,58 L242,78 L232,66 L238,82" fill={color} />
      <path d="M255,65 L262,82 L252,72 L258,88" fill={color} />

      {/* Crown shadow */}
      <path
        d="M140,70 C155,55 175,46 200,44 C225,46 245,55 260,70"
        fill="none" stroke={dark} strokeWidth="2" opacity="0.3"
      />

      {/* Highlight streaks */}
      <path d="M175,40 L178,65" fill="none" stroke={highlight} strokeWidth="2.5" opacity="0.25" />
      <path d="M225,40 L222,65" fill="none" stroke={highlight} strokeWidth="2.5" opacity="0.25" />
      <path d="M200,36 L200,60" fill="none" stroke={highlight} strokeWidth="2" opacity="0.2" />

      {/* Hair shadow */}
      <path
        d="M135,75 C150,60 175,50 200,48 C225,50 250,60 265,75"
        fill={dark} opacity="0.25"
      />
    </g>
  )
}

function ShortHair({ color, dark, highlight }: StyleProps) {
  return (
    <g>
      {/* Base cap */}
      <path
        d="M128,82 C128,42 155,22 200,18 C245,22 272,42 272,82"
        fill={color}
      />

      {/* Textured top - directional strands */}
      <path d="M145,70 L140,52 L155,66 L152,44 L168,62 L165,40 L180,58 L178,36 L195,54 L195,34
               L210,54 L212,36 L220,58 L225,40 L235,62 L238,44 L248,66 L250,52 L258,70"
            fill={color} />

      {/* Highlight strands */}
      <path d="M160,50 L165,38" fill="none" stroke={highlight} strokeWidth="2.5" opacity="0.3" />
      <path d="M195,42 L198,32" fill="none" stroke={highlight} strokeWidth="2.5" opacity="0.3" />
      <path d="M230,50 L235,38" fill="none" stroke={highlight} strokeWidth="2.5" opacity="0.3" />

      {/* Side volume */}
      <path d="M130,78 C132,68 138,58 148,52" fill={color} />
      <path d="M270,78 C268,68 262,58 252,52" fill={color} />

      {/* Shadow under hair */}
      <path
        d="M140,72 C155,58 175,48 200,46 C225,48 245,58 260,72
           L255,78 C242,65 225,55 200,53 C175,55 158,65 145,78Z"
        fill={dark} opacity="0.3"
      />

      {/* Subtle texture lines */}
      <path d="M155,55 L160,45" fill="none" stroke={dark} strokeWidth="0.8" opacity="0.2" />
      <path d="M175,48 L178,38" fill="none" stroke={dark} strokeWidth="0.8" opacity="0.2" />
      <path d="M220,48 L222,38" fill="none" stroke={dark} strokeWidth="0.8" opacity="0.2" />
      <path d="M245,55 L240,45" fill="none" stroke={dark} strokeWidth="0.8" opacity="0.2" />
    </g>
  )
}

function MohawkHair({ color, dark, highlight }: StyleProps) {
  return (
    <g>
      {/* Shaved sides - subtle stubble */}
      <path
        d="M132,82 C132,60 150,42 200,38 C250,42 268,60 268,82"
        fill={color}
        opacity="0.15"
      />

      {/* Main mohawk crest - tall and aggressive */}
      <path
        d="M182,82 L170,4 L185,28 L192,0 L198,24 L205,0 L212,28 L218,4 L230,82"
        fill={color}
      />

      {/* Mohawk inner volume */}
      <path
        d="M188,78 C188,45 192,22 200,8 C208,22 212,45 212,78"
        fill={dark}
        opacity="0.25"
      />

      {/* Highlight streak down center */}
      <path
        d="M198,12 L198,75"
        fill="none" stroke={highlight} strokeWidth="3" opacity="0.3"
      />

      {/* Side spike details */}
      <path d="M178,72 L162,52 L182,68" fill={color} />
      <path d="M222,72 L238,52 L218,68" fill={color} />

      {/* Shaved side texture */}
      <path d="M140,65 Q170,58 180,65" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <path d="M142,72 Q170,65 180,72" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <path d="M260,65 Q230,58 220,65" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <path d="M258,72 Q230,65 220,72" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
    </g>
  )
}

function SamuraiHair({ color, dark, highlight }: StyleProps) {
  return (
    <g>
      {/* Main hair dome */}
      <path
        d="M126,88 C126,42 152,22 200,18 C248,22 274,42 274,88"
        fill={color}
      />

      {/* Top-knot bun */}
      <ellipse cx="200" cy="8" rx="18" ry="14" fill={color} />
      <path d="M188,18 C188,10 192,4 200,2 C208,4 212,10 212,18" fill={color} />
      {/* Bun wrap band */}
      <rect x="192" y="16" width="16" height="8" rx="3" fill={dark} />
      <rect x="194" y="18" width="12" height="4" rx="2" fill={highlight} opacity="0.2" />

      {/* Side wing strands */}
      <path
        d="M126,82 C122,95 124,115 132,125 C138,118 134,95 130,82"
        fill={color}
      />
      <path
        d="M274,82 C278,95 276,115 268,125 C262,118 266,95 270,82"
        fill={color}
      />

      {/* Front framing strands */}
      <path d="M145,68 L140,85 L150,75 L146,90" fill={color} />
      <path d="M255,68 L260,85 L250,75 L254,90" fill={color} />

      {/* Hair shadow */}
      <path
        d="M140,72 C158,55 178,45 200,43 C222,45 242,55 260,72"
        fill={dark}
        opacity="0.3"
      />

      {/* Highlight streaks */}
      <path d="M170,45 L175,65" fill="none" stroke={highlight} strokeWidth="2" opacity="0.25" />
      <path d="M230,45 L225,65" fill="none" stroke={highlight} strokeWidth="2" opacity="0.25" />

      {/* Top-knot shadow */}
      <ellipse cx="200" cy="10" rx="10" ry="6" fill={dark} opacity="0.2" />
    </g>
  )
}
