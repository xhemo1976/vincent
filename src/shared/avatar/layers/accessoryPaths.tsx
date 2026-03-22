import { motion } from 'framer-motion'

interface AccessoryProps {
  id: string
}

export function AccessoryLayer({ id }: AccessoryProps) {
  switch (id) {
    case 'band-red':
      return <Headband color="#CC3333" darkColor="#AA2222" />
    case 'band-blue':
      return <Headband color="#2196F3" darkColor="#1565C0" />
    case 'band-black':
      return <Headband color="#1A1A2E" darkColor="#333355" />
    case 'glasses':
      return <Glasses />
    case 'necklace':
      return <Necklace />
    case 'sword':
      return <Sword />
    case 'shield':
      return <Shield />
    case 'cape':
      return <Cape />
    case 'wings':
      return <Wings />
    case 'crown':
      return <Crown />
    case 'mask-fox':
      return <FoxMask />
    case 'mask-oni':
      return <OniMask />
    default:
      return null
  }
}

export function isBehindBody(id: string): boolean {
  return id === 'cape' || id === 'wings'
}

function Headband({ color, darkColor }: { color: string; darkColor: string }) {
  return (
    <g>
      {/* Band wrapping around head */}
      <path
        d="M128,72 C135,68 165,62 200,60 C235,62 265,68 272,72
           L272,82 C265,78 235,72 200,70 C165,72 135,78 128,82Z"
        fill={color}
      />
      {/* Metal plate */}
      <rect x="184" y="64" width="32" height="14" rx="3" fill={darkColor} stroke={color} strokeWidth="1" />
      <circle cx="200" cy="71" r="4" fill={color} opacity="0.6" />
      {/* Fabric texture */}
      <path d="M140,72 Q170,68 200,67 Q230,68 260,72" fill="none" stroke={darkColor} strokeWidth="0.8" opacity="0.3" />
      {/* Trailing tails */}
      <g>
        <motion.path
          d="M272,76 L300,62 L296,68 L310,56"
          fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"
          animate={{ d: [
            "M272,76 L300,62 L296,68 L310,56",
            "M272,76 L298,64 L295,70 L312,60",
            "M272,76 L300,62 L296,68 L310,56",
          ]}}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        />
        <motion.path
          d="M272,80 L298,72 L295,76 L308,68"
          fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round"
          animate={{ d: [
            "M272,80 L298,72 L295,76 L308,68",
            "M272,80 L296,74 L294,78 L310,72",
            "M272,80 L298,72 L295,76 L308,68",
          ]}}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut', delay: 0.2 }}
        />
      </g>
    </g>
  )
}

function Glasses() {
  return (
    <g>
      {/* Left lens */}
      <circle cx="170" cy="100" r="18" fill="none" stroke="#444" strokeWidth="3" />
      <circle cx="170" cy="100" r="16" fill="rgba(200,220,255,0.1)" />
      {/* Right lens */}
      <circle cx="230" cy="100" r="18" fill="none" stroke="#444" strokeWidth="3" />
      <circle cx="230" cy="100" r="16" fill="rgba(200,220,255,0.1)" />
      {/* Bridge */}
      <path d="M188,100 Q200,96 212,100" fill="none" stroke="#444" strokeWidth="3" />
      {/* Arms */}
      <line x1="152" y1="96" x2="132" y2="90" stroke="#444" strokeWidth="2.5" />
      <line x1="248" y1="96" x2="268" y2="90" stroke="#444" strokeWidth="2.5" />
      {/* Lens glare */}
      <path d="M160,92 L166,86" stroke="white" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      <path d="M220,92 L226,86" stroke="white" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
    </g>
  )
}

function Necklace() {
  return (
    <g>
      {/* Chain */}
      <path d="M165,170 Q200,198 235,170" fill="none" stroke="#DAA520" strokeWidth="2.5" />
      {/* Jade pendant */}
      <circle cx="200" cy="194" r="10" fill="#4CAF50" stroke="#DAA520" strokeWidth="2.5" />
      <circle cx="200" cy="194" r="6" fill="#66BB6A" />
      <circle cx="197" cy="191" r="2.5" fill="white" opacity="0.4" />
      {/* Chain links hint */}
      <circle cx="175" cy="178" r="1" fill="#DAA520" opacity="0.5" />
      <circle cx="185" cy="185" r="1" fill="#DAA520" opacity="0.5" />
      <circle cx="215" cy="185" r="1" fill="#DAA520" opacity="0.5" />
      <circle cx="225" cy="178" r="1" fill="#DAA520" opacity="0.5" />
    </g>
  )
}

function Sword() {
  return (
    <g transform="translate(310,160) rotate(18)">
      {/* Blade */}
      <path d="M-4,-100 L0,-115 L4,-100 L4,0 L-4,0Z" fill="#C0C0C0" />
      <path d="M-1,-100 L0,-112 L1,-100 L1,0 L-1,0Z" fill="#E8E8E8" opacity="0.7" />
      {/* Edge highlight */}
      <line x1="-3" y1="-90" x2="-3" y2="-10" stroke="white" strokeWidth="0.5" opacity="0.4" />
      {/* Guard - ornate */}
      <path d="M-14,0 L-6,-4 L6,-4 L14,0 L6,4 L-6,4Z" fill="#DAA520" stroke="#B8860B" strokeWidth="1" />
      <circle cx="0" cy="0" r="3" fill="#B8860B" />
      {/* Handle wrap */}
      <rect x="-5" y="4" width="10" height="32" rx="3" fill="#8B4513" />
      <path d="M-4,8 L4,12 M-4,16 L4,20 M-4,24 L4,28" fill="none" stroke="#A0522D" strokeWidth="1.5" />
      {/* Pommel */}
      <circle cx="0" cy="40" r="6" fill="#DAA520" stroke="#B8860B" strokeWidth="1" />
      <circle cx="0" cy="40" r="3" fill="#E53935" />
    </g>
  )
}

function Shield() {
  return (
    <g transform="translate(60,200)">
      {/* Main shield shape */}
      <path d="M0,-28 L24,-20 L28,12 L0,36 L-28,12 L-24,-20Z" fill="#1565C0" stroke="#FFD700" strokeWidth="2.5" />
      {/* Inner bevel */}
      <path d="M0,-18 L14,-12 L16,6 L0,22 L-16,6 L-14,-12Z" fill="#1976D2" />
      {/* Central emblem */}
      <circle cx="0" cy="2" r="8" fill="#FFD700" />
      <circle cx="0" cy="2" r="5" fill="#FFA000" />
      <circle cx="0" cy="2" r="2.5" fill="#FFD700" />
      {/* Highlight */}
      <path d="M-18,-16 L-10,-10" stroke="white" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
      {/* Rivet details */}
      <circle cx="-20" cy="-16" r="2" fill="#FFD700" opacity="0.6" />
      <circle cx="20" cy="-16" r="2" fill="#FFD700" opacity="0.6" />
      <circle cx="-22" cy="6" r="2" fill="#FFD700" opacity="0.6" />
      <circle cx="22" cy="6" r="2" fill="#FFD700" opacity="0.6" />
    </g>
  )
}

function Cape() {
  return (
    <g>
      <motion.path
        d="M152,195 C145,240 132,320 142,400 C158,415 200,420 242,415 C258,400 255,320 248,240 L252,195"
        fill="#B71C1C"
        opacity="0.7"
        animate={{ d: [
          "M152,195 C145,240 132,320 142,400 C158,415 200,420 242,415 C258,400 255,320 248,240 L252,195",
          "M152,195 C142,245 128,325 138,405 C158,420 200,424 242,420 C262,405 258,325 252,245 L252,195",
          "M152,195 C145,240 132,320 142,400 C158,415 200,420 242,415 C258,400 255,320 248,240 L252,195",
        ]}}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      />
      {/* Inner lining */}
      <path
        d="M158,200 C154,235 146,300 152,380 C165,392 200,395 235,392 C242,380 246,300 242,235 L248,200"
        fill="#D32F2F" opacity="0.25"
      />
      {/* Clasp */}
      <circle cx="155" cy="196" r="4" fill="#FFD700" />
      <circle cx="245" cy="196" r="4" fill="#FFD700" />
      <path d="M159,196 Q200,188 241,196" fill="none" stroke="#FFD700" strokeWidth="1.5" />
    </g>
  )
}

function Wings() {
  return (
    <g opacity="0.85">
      {/* Left wing */}
      <motion.g
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        style={{ transformOrigin: '148px 215px' }}
      >
        <path
          d="M148,215 C115,180 75,155 45,168 C32,178 42,200 65,208
             C52,198 68,185 88,192 C72,192 58,208 78,220
             C65,212 70,226 95,225 C82,224 88,238 115,232 L148,225Z"
          fill="white" stroke="#E0E0E0" strokeWidth="1.5"
        />
        {/* Feather detail lines */}
        <path d="M60,190 Q90,200 140,220" fill="none" stroke="#E0E0E0" strokeWidth="0.8" opacity="0.5" />
        <path d="M70,200 Q100,210 140,222" fill="none" stroke="#E0E0E0" strokeWidth="0.8" opacity="0.5" />
      </motion.g>

      {/* Right wing */}
      <motion.g
        animate={{ rotate: [5, -5, 5] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        style={{ transformOrigin: '252px 215px' }}
      >
        <path
          d="M252,215 C285,180 325,155 355,168 C368,178 358,200 335,208
             C348,198 332,185 312,192 C328,192 342,208 322,220
             C335,212 330,226 305,225 C318,224 312,238 285,232 L252,225Z"
          fill="white" stroke="#E0E0E0" strokeWidth="1.5"
        />
        <path d="M340,190 Q310,200 260,220" fill="none" stroke="#E0E0E0" strokeWidth="0.8" opacity="0.5" />
        <path d="M330,200 Q300,210 260,222" fill="none" stroke="#E0E0E0" strokeWidth="0.8" opacity="0.5" />
      </motion.g>
    </g>
  )
}

function Crown() {
  return (
    <g>
      {/* Crown base */}
      <path
        d="M148,32 L156,6 L170,26 L182,0 L200,22 L218,0 L230,26 L244,6 L252,32Z"
        fill="#FFD700" stroke="#FFA000" strokeWidth="2"
      />
      {/* Jewels */}
      <circle cx="182" cy="14" r="4" fill="#E53935" />
      <circle cx="182" cy="14" r="2" fill="#EF5350" opacity="0.5" />
      <circle cx="200" cy="11" r="5" fill="#2196F3" />
      <circle cx="200" cy="11" r="2.5" fill="#42A5F5" opacity="0.5" />
      <circle cx="218" cy="14" r="4" fill="#4CAF50" />
      <circle cx="218" cy="14" r="2" fill="#66BB6A" opacity="0.5" />
      {/* Crown band */}
      <rect x="148" y="28" width="104" height="10" rx="2" fill="#FFD700" stroke="#FFA000" strokeWidth="1" />
      <rect x="148" y="30" width="104" height="4" fill="#FFC107" opacity="0.4" />
      {/* Jewel on band */}
      <circle cx="175" cy="33" r="2.5" fill="#E53935" opacity="0.6" />
      <circle cx="200" cy="33" r="2.5" fill="#2196F3" opacity="0.6" />
      <circle cx="225" cy="33" r="2.5" fill="#4CAF50" opacity="0.6" />
    </g>
  )
}

function FoxMask() {
  return (
    <g>
      {/* Mask shape */}
      <path
        d="M148,82 C148,72 168,62 200,62 C232,62 252,72 252,82
           L252,110 C252,120 232,130 200,130 C168,130 148,120 148,110Z"
        fill="#FF8A65" stroke="#E64A19" strokeWidth="2" opacity="0.88"
      />
      {/* Fox ears */}
      <path d="M156,74 L138,40 L170,65" fill="#FF8A65" stroke="#E64A19" strokeWidth="1.5" />
      <path d="M244,74 L262,40 L230,65" fill="#FF8A65" stroke="#E64A19" strokeWidth="1.5" />
      <path d="M152,68 L142,48 L166,62" fill="#FFCCBC" />
      <path d="M248,68 L258,48 L234,62" fill="#FFCCBC" />
      {/* Eye holes - angular */}
      <path d="M160,92 L175,85 L185,95 L175,102Z" fill="#1A1A2E" />
      <path d="M240,92 L225,85 L215,95 L225,102Z" fill="#1A1A2E" />
      {/* Nose */}
      <circle cx="200" cy="112" r="4" fill="#1A1A2E" />
      {/* Whiskers */}
      <line x1="172" y1="108" x2="145" y2="104" stroke="#1A1A2E" strokeWidth="1.2" />
      <line x1="172" y1="112" x2="142" y2="113" stroke="#1A1A2E" strokeWidth="1.2" />
      <line x1="172" y1="116" x2="145" y2="122" stroke="#1A1A2E" strokeWidth="1.2" />
      <line x1="228" y1="108" x2="255" y2="104" stroke="#1A1A2E" strokeWidth="1.2" />
      <line x1="228" y1="112" x2="258" y2="113" stroke="#1A1A2E" strokeWidth="1.2" />
      <line x1="228" y1="116" x2="255" y2="122" stroke="#1A1A2E" strokeWidth="1.2" />
      {/* Cheek marks */}
      <path d="M160,105 Q165,110 160,115" fill="none" stroke="#E64A19" strokeWidth="1" opacity="0.5" />
      <path d="M240,105 Q235,110 240,115" fill="none" stroke="#E64A19" strokeWidth="1" opacity="0.5" />
    </g>
  )
}

function OniMask() {
  return (
    <g>
      {/* Mask body */}
      <path
        d="M142,78 C142,65 165,52 200,52 C235,52 258,65 258,78
           L258,115 C258,130 235,142 200,142 C165,142 142,130 142,115Z"
        fill="#B71C1C" stroke="#880E4F" strokeWidth="2.5" opacity="0.92"
      />
      {/* Horns */}
      <path d="M158,65 L142,22 L155,45 L145,10 L165,52" fill="#FFD54F" stroke="#FFA000" strokeWidth="1.5" />
      <path d="M242,65 L258,22 L245,45 L255,10 L235,52" fill="#FFD54F" stroke="#FFA000" strokeWidth="1.5" />
      {/* Horn tips glow */}
      <circle cx="145" cy="12" r="3" fill="#FFD54F" opacity="0.5" />
      <circle cx="255" cy="12" r="3" fill="#FFD54F" opacity="0.5" />
      {/* Eyes - fierce */}
      <path d="M158,85 L175,80 L182,90 L172,98Z" fill="#FFD740" />
      <path d="M242,85 L225,80 L218,90 L228,98Z" fill="#FFD740" />
      <circle cx="172" cy="90" r="4" fill="#1A1A2E" />
      <circle cx="228" cy="90" r="4" fill="#1A1A2E" />
      {/* Nose holes */}
      <circle cx="192" cy="108" r="4" fill="#880E4F" />
      <circle cx="208" cy="108" r="4" fill="#880E4F" />
      {/* Teeth - jagged */}
      <path
        d="M162,120 L168,132 L174,120 L180,134 L186,120 L192,136 L198,120
           L204,136 L210,120 L216,134 L222,120 L228,132 L234,120"
        fill="white" stroke="#E0E0E0" strokeWidth="0.5"
      />
      {/* Tusks */}
      <path d="M166,122 L158,142 L172,128" fill="white" />
      <path d="M234,122 L242,142 L228,128" fill="white" />
      {/* Forehead detail */}
      <path d="M185,65 Q200,58 215,65" fill="none" stroke="#880E4F" strokeWidth="2" opacity="0.5" />
    </g>
  )
}
