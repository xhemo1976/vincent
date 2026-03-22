import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { HairStyle, EyeStyle, AuraColor, FaceExpression } from '../stores/userStore'

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

const AURA_COLORS: Record<AuraColor, string[]> = {
  none: [],
  purple: ['#B388FF', '#7C4DFF', '#651FFF'],
  blue: ['#80D8FF', '#40C4FF', '#00B0FF'],
  green: ['#B9F6CA', '#69F0AE', '#00E676'],
  red: ['#FF8A80', '#FF5252', '#FF1744'],
  gold: ['#FFE57F', '#FFD740', '#FFC400'],
}

const OUTFIT_COLORS: Record<string, { main: string; dark: string; accent: string }> = {
  'gi-white': { main: '#F5F5F5', dark: '#E0E0E0', accent: '#BDBDBD' },
  'gi-blue': { main: '#42A5F5', dark: '#1E88E5', accent: '#1565C0' },
  'gi-green': { main: '#66BB6A', dark: '#43A047', accent: '#2E7D32' },
  'gi-red': { main: '#EF5350', dark: '#E53935', accent: '#C62828' },
  'gi-purple': { main: '#AB47BC', dark: '#8E24AA', accent: '#6A1B9A' },
  'gi-black': { main: '#37474F', dark: '#263238', accent: '#1A1A2E' },
  'gi-gold': { main: '#FFD54F', dark: '#FFC107', accent: '#FF8F00' },
  'gi-cyber': { main: '#1A237E', dark: '#0D47A1', accent: '#00E5FF' },
  'gi-dragon': { main: '#2E7D32', dark: '#1B5E20', accent: '#00C853' },
  'gi-phoenix': { main: '#BF360C', dark: '#D84315', accent: '#FF6D00' },
}

function getOutfitColor(id: string) {
  return OUTFIT_COLORS[id] || OUTFIT_COLORS['gi-white']
}

// === HAIR ===
function HairPath({ style, color, darkColor }: { style: HairStyle; color: string; darkColor: string }) {
  switch (style) {
    case 'spiky':
      return (
        <g>
          <path d="M100,72 C100,42 108,28 120,22 C128,18 136,16 150,14 C164,12 176,16 184,22 C196,32 200,42 200,72" fill={color} />
          <path d="M100,60 L92,30 L112,52 L105,18 L128,48 L125,10 L148,44 L150,8 L170,42 L178,12 L190,46 L198,22 L200,60" fill={color} />
          <path d="M105,65 C105,50 118,38 150,36 C182,38 195,50 195,65" fill={darkColor} opacity="0.4" />
          <path d="M96,55 L82,35 L100,52" fill={color} />
          <path d="M204,55 L218,35 L200,52" fill={color} />
          <path d="M90,70 L72,55 L96,68" fill={color} />
          <path d="M210,70 L228,55 L204,68" fill={color} />
        </g>
      )
    case 'long':
      return (
        <g>
          <path d="M95,72 C95,38 110,22 150,18 C190,22 205,38 205,72" fill={color} />
          <path d="M95,72 C92,90 88,130 94,170 C96,178 102,180 106,172 C110,155 108,100 100,72" fill={color} />
          <path d="M205,72 C208,90 212,130 206,170 C204,178 198,180 194,172 C190,155 192,100 200,72" fill={color} />
          <path d="M102,62 C108,52 120,46 150,44 C180,46 192,52 198,62 L195,68 C190,58 174,50 150,48 C126,50 110,58 105,68 Z" fill={darkColor} opacity="0.5" />
          <path d="M148,18 L150,54 L152,18" fill={darkColor} opacity="0.3" />
        </g>
      )
    case 'short':
      return (
        <g>
          <path d="M100,70 C100,40 115,24 150,20 C185,24 200,40 200,70" fill={color} />
          <path d="M108,58 C115,42 130,32 150,30 C170,32 185,42 192,58" fill={darkColor} opacity="0.3" />
          <path d="M105,65 C110,55 125,48 150,46 C175,48 190,55 195,65" fill={color} />
          <path d="M110,64 L108,52 L118,62 L120,48 L130,60 L135,46 L142,58 L150,44 L158,58 L165,46 L170,60 L180,48 L182,62 L192,52 L190,64" fill={color} />
        </g>
      )
    case 'mohawk':
      return (
        <g>
          <path d="M102,72 C102,52 115,38 150,34 C185,38 198,52 198,72" fill={color} opacity="0.3" />
          <path d="M138,72 L130,4 L142,20 L148,0 L155,18 L162,2 L170,22 L162,72" fill={color} />
          <path d="M142,68 C142,40 146,20 150,10 C154,20 158,40 158,68" fill={darkColor} opacity="0.3" />
        </g>
      )
    case 'samurai':
      return (
        <g>
          <path d="M98,72 C98,38 112,22 150,18 C188,22 202,38 202,72" fill={color} />
          <ellipse cx="150" cy="8" rx="14" ry="10" fill={color} />
          <path d="M140,18 C140,12 144,6 150,4 C156,6 160,12 160,18" fill={color} />
          <rect x="146" y="14" width="8" height="6" rx="2" fill={darkColor} />
          <path d="M98,72 C96,85 98,95 104,100 C108,95 106,80 102,72" fill={color} />
          <path d="M202,72 C204,85 202,95 196,100 C192,95 194,80 198,72" fill={color} />
          <path d="M108,62 C120,48 135,42 150,40 C165,42 180,48 192,62" fill={darkColor} opacity="0.4" />
        </g>
      )
  }
}

// === EYES with blinking ===
function EyesSVG({ style, blinking, expression }: { style: EyeStyle; skinTone: string; blinking: boolean; expression: FaceExpression }) {
  if (blinking) {
    return (
      <g>
        <line x1="118" y1="82" x2="140" y2="82" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="160" y1="82" x2="182" y2="82" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  }

  // Expression modifiers
  const eyebrowY = expression === 'angry' ? -3 : expression === 'surprised' ? -5 : 0
  const eyebrowAngleL = expression === 'angry' ? 'rotate(-8, 128, 72)' : ''
  const eyebrowAngleR = expression === 'angry' ? 'rotate(8, 172, 72)' : ''
  const eyeScaleY = expression === 'surprised' ? 1.3 : expression === 'cool' ? 0.7 : 1

  switch (style) {
    case 'sharp':
      return (
        <g>
          <g transform={`scale(1,${eyeScaleY})`} style={{ transformOrigin: '129px 82px' }}>
            <path d="M118,82 C122,76 134,76 138,82 C134,88 122,88 118,82Z" fill="white" />
            <ellipse cx="129" cy="82" rx="5" ry="5.5" fill="#1A1A2E" />
            <circle cx="131" cy="80" r="2" fill="white" />
            <circle cx="127" cy="84" r="1" fill="white" opacity="0.6" />
          </g>
          <path d={`M115,${72 + eyebrowY} C120,${68 + eyebrowY} 134,${68 + eyebrowY} 140,${72 + eyebrowY}`} fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" transform={eyebrowAngleL} />
          <g transform={`scale(1,${eyeScaleY})`} style={{ transformOrigin: '171px 82px' }}>
            <path d="M162,82 C166,76 178,76 182,82 C178,88 166,88 162,82Z" fill="white" />
            <ellipse cx="171" cy="82" rx="5" ry="5.5" fill="#1A1A2E" />
            <circle cx="173" cy="80" r="2" fill="white" />
            <circle cx="169" cy="84" r="1" fill="white" opacity="0.6" />
          </g>
          <path d={`M160,${72 + eyebrowY} C166,${68 + eyebrowY} 178,${68 + eyebrowY} 185,${72 + eyebrowY}`} fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" transform={eyebrowAngleR} />
          {expression === 'cool' && (
            <g opacity="0.15">
              <rect x="112" y="74" width="32" height="16" rx="8" fill="#1A1A2E" />
              <rect x="156" y="74" width="32" height="16" rx="8" fill="#1A1A2E" />
              <line x1="144" y1="82" x2="156" y2="82" stroke="#1A1A2E" strokeWidth="2" />
            </g>
          )}
        </g>
      )
    case 'round':
      return (
        <g>
          <g transform={`scale(1,${eyeScaleY})`} style={{ transformOrigin: '129px 82px' }}>
            <ellipse cx="129" cy="82" rx="10" ry="10" fill="white" stroke="#333" strokeWidth="1" />
            <ellipse cx="130" cy="83" rx="6" ry="6.5" fill="#2D1B69" />
            <circle cx="132" cy="80" r="2.5" fill="white" />
            <circle cx="127" cy="85" r="1.2" fill="white" opacity="0.5" />
          </g>
          <path d={`M117,${70 + eyebrowY} C122,${66 + eyebrowY} 136,${66 + eyebrowY} 141,${70 + eyebrowY}`} fill="none" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" transform={eyebrowAngleL} />
          <g transform={`scale(1,${eyeScaleY})`} style={{ transformOrigin: '171px 82px' }}>
            <ellipse cx="171" cy="82" rx="10" ry="10" fill="white" stroke="#333" strokeWidth="1" />
            <ellipse cx="172" cy="83" rx="6" ry="6.5" fill="#2D1B69" />
            <circle cx="174" cy="80" r="2.5" fill="white" />
            <circle cx="169" cy="85" r="1.2" fill="white" opacity="0.5" />
          </g>
          <path d={`M159,${70 + eyebrowY} C164,${66 + eyebrowY} 178,${66 + eyebrowY} 183,${70 + eyebrowY}`} fill="none" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" transform={eyebrowAngleR} />
        </g>
      )
    case 'narrow':
      return (
        <g>
          <path d="M116,82 C122,78 136,78 142,82 C136,85 122,85 116,82Z" fill="white" />
          <ellipse cx="129" cy="82" rx="5" ry="3.5" fill="#1A1A2E" />
          <circle cx="131" cy="81" r="1.5" fill="white" />
          <path d={`M114,${74 + eyebrowY} C120,${70 + eyebrowY} 136,${70 + eyebrowY} 142,${74 + eyebrowY}`} fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" transform={eyebrowAngleL} />
          <path d="M158,82 C164,78 178,78 184,82 C178,85 164,85 158,82Z" fill="white" />
          <ellipse cx="171" cy="82" rx="5" ry="3.5" fill="#1A1A2E" />
          <circle cx="173" cy="81" r="1.5" fill="white" />
          <path d={`M158,${74 + eyebrowY} C164,${70 + eyebrowY} 178,${70 + eyebrowY} 186,${74 + eyebrowY}`} fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" transform={eyebrowAngleR} />
        </g>
      )
    case 'cyber':
      return (
        <g>
          <rect x="117" y="76" width="24" height="12" rx="3" fill="#00E5FF" opacity="0.15" />
          <rect x="119" y="77" width="20" height="10" rx="2" fill="white" />
          <rect x="119" y="77" width="20" height="10" rx="2" fill="none" stroke="#00E5FF" strokeWidth="1.5" />
          <ellipse cx="130" cy="82" rx="4" ry="4" fill="#00E5FF" />
          <circle cx="132" cy="80" r="1.5" fill="white" />
          <motion.line x1="119" y1="82" x2="139" y2="82" stroke="#00E5FF" strokeWidth="0.5" opacity="0.5"
            animate={{ x2: [119, 139, 119] }} transition={{ repeat: Infinity, duration: 2 }} />
          <path d={`M116,${72 + eyebrowY} L142,${72 + eyebrowY}`} stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="159" y="76" width="24" height="12" rx="3" fill="#00E5FF" opacity="0.15" />
          <rect x="161" y="77" width="20" height="10" rx="2" fill="white" />
          <rect x="161" y="77" width="20" height="10" rx="2" fill="none" stroke="#00E5FF" strokeWidth="1.5" />
          <ellipse cx="172" cy="82" rx="4" ry="4" fill="#00E5FF" />
          <circle cx="174" cy="80" r="1.5" fill="white" />
          <motion.line x1="161" y1="82" x2="181" y2="82" stroke="#00E5FF" strokeWidth="0.5" opacity="0.5"
            animate={{ x2: [161, 181, 161] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} />
          <path d={`M158,${72 + eyebrowY} L184,${72 + eyebrowY}`} stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )
  }
}

// === MOUTH based on expression ===
function MouthSVG({ expression }: { expression: FaceExpression }) {
  switch (expression) {
    case 'happy':
      return (
        <g>
          <path d="M134,104 Q150,118 166,104" fill="none" stroke="#CC7766" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M138,104 Q150,115 162,104" fill="#CC7766" opacity="0.3" />
        </g>
      )
    case 'determined':
      return (
        <g>
          <path d="M138,108 L162,108" fill="none" stroke="#CC7766" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M140,112 L160,112" fill="none" stroke="#CC7766" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        </g>
      )
    case 'angry':
      return (
        <g>
          <path d="M136,110 Q150,104 164,110" fill="none" stroke="#CC5544" strokeWidth="2.5" strokeLinecap="round" />
          {/* Teeth showing */}
          <path d="M142,108 L144,112 L147,108 L150,112 L153,108 L156,112 L158,108" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />
        </g>
      )
    case 'surprised':
      return (
        <ellipse cx="150" cy="108" rx="8" ry="10" fill="#CC7766" opacity="0.6" stroke="#CC7766" strokeWidth="1.5" />
      )
    case 'cool':
      return (
        <path d="M140,106 Q150,112 160,106" fill="none" stroke="#CC7766" strokeWidth="2" strokeLinecap="round" />
      )
    default: // neutral
      return (
        <path d="M138,106 Q150,114 162,106" fill="none" stroke="#CC7766" strokeWidth="2" strokeLinecap="round" />
      )
  }
}

// === ACCESSORIES ===
function AccessorySVG({ id }: { id: string }) {
  switch (id) {
    case 'band-red':
      return (
        <g>
          <rect x="98" y="58" width="104" height="10" rx="3" fill="#CC3333" />
          <circle cx="210" cy="63" r="5" fill="#CC3333" stroke="#AA2222" strokeWidth="1" />
          <path d="M214,60 L230,50 L228,55 L235,48" fill="none" stroke="#CC3333" strokeWidth="3" strokeLinecap="round" />
          <path d="M214,66 L228,72 L226,68 L234,74" fill="none" stroke="#CC3333" strokeWidth="3" strokeLinecap="round" />
        </g>
      )
    case 'band-blue':
      return (
        <g>
          <rect x="98" y="58" width="104" height="10" rx="3" fill="#2196F3" />
          <circle cx="210" cy="63" r="5" fill="#2196F3" stroke="#1565C0" strokeWidth="1" />
          <path d="M214,60 L230,50 L228,55 L235,48" fill="none" stroke="#2196F3" strokeWidth="3" strokeLinecap="round" />
          <path d="M214,66 L228,72 L226,68 L234,74" fill="none" stroke="#2196F3" strokeWidth="3" strokeLinecap="round" />
        </g>
      )
    case 'band-black':
      return (
        <g>
          <rect x="98" y="58" width="104" height="10" rx="3" fill="#1A1A2E" />
          <circle cx="210" cy="63" r="5" fill="#1A1A2E" stroke="#333355" strokeWidth="1" />
          <path d="M214,60 L230,50 L228,55 L235,48" fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" />
          <path d="M214,66 L228,72 L226,68 L234,74" fill="none" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" />
        </g>
      )
    case 'glasses':
      return (
        <g>
          <circle cx="129" cy="82" r="14" fill="none" stroke="#333" strokeWidth="2.5" />
          <circle cx="171" cy="82" r="14" fill="none" stroke="#333" strokeWidth="2.5" />
          <line x1="143" y1="82" x2="157" y2="82" stroke="#333" strokeWidth="2.5" />
          <line x1="115" y1="80" x2="100" y2="76" stroke="#333" strokeWidth="2" />
          <line x1="185" y1="80" x2="200" y2="76" stroke="#333" strokeWidth="2" />
          {/* Lens glare */}
          <path d="M122,76 L126,72" stroke="white" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
          <path d="M164,76 L168,72" stroke="white" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
        </g>
      )
    case 'necklace':
      return (
        <g>
          <path d="M125,125 Q150,148 175,125" fill="none" stroke="#DAA520" strokeWidth="2" />
          {/* Jade pendant */}
          <circle cx="150" cy="145" r="8" fill="#4CAF50" stroke="#DAA520" strokeWidth="2" />
          <circle cx="150" cy="145" r="4" fill="#66BB6A" />
          <circle cx="148" cy="143" r="1.5" fill="white" opacity="0.5" />
        </g>
      )
    case 'sword':
      return (
        <g transform="translate(240,120) rotate(20)">
          <rect x="-3" y="-80" width="6" height="80" rx="2" fill="#C0C0C0" />
          <rect x="-1" y="-80" width="2" height="80" fill="#E8E8E8" opacity="0.6" />
          <path d="M-3,-80 L0,-90 L3,-80" fill="#C0C0C0" />
          <rect x="-10" y="0" width="20" height="5" rx="2" fill="#DAA520" />
          <rect x="-4" y="5" width="8" height="25" rx="2" fill="#8B4513" />
          <line x1="-2" y1="8" x2="-2" y2="28" stroke="#A0522D" strokeWidth="1" />
          <line x1="2" y1="8" x2="2" y2="28" stroke="#A0522D" strokeWidth="1" />
          <circle cx="0" cy="32" r="4" fill="#DAA520" />
        </g>
      )
    case 'shield':
      return (
        <g transform="translate(50,150)">
          <path d="M0,-20 L18,-15 L20,10 L0,25 L-20,10 L-18,-15 Z" fill="#1565C0" stroke="#FFD700" strokeWidth="2" />
          <path d="M0,-12 L10,-8 L10,5 L0,14 L-10,5 L-10,-8 Z" fill="#1976D2" />
          {/* Emblem */}
          <circle cx="0" cy="0" r="5" fill="#FFD700" />
          <circle cx="0" cy="0" r="3" fill="#FFA000" />
        </g>
      )
    case 'cape':
      return (
        <g>
          <motion.path
            d="M115,140 C110,180 100,240 108,300 C120,310 150,315 180,310 C195,300 190,240 185,180 L192,140"
            fill="#B71C1C"
            opacity="0.7"
            animate={{ d: [
              "M115,140 C110,180 100,240 108,300 C120,310 150,315 180,310 C195,300 190,240 185,180 L192,140",
              "M115,140 C108,185 95,245 105,305 C120,315 150,318 180,315 C198,305 195,245 188,185 L192,140",
              "M115,140 C110,180 100,240 108,300 C120,310 150,315 180,310 C195,300 190,240 185,180 L192,140",
            ] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          />
          {/* Cape inner lining */}
          <path d="M120,145 C118,175 112,220 118,280 C130,290 150,292 170,290 C178,280 182,220 180,175 L185,145"
            fill="#D32F2F" opacity="0.3" />
        </g>
      )
    case 'wings':
      return (
        <g opacity="0.8">
          {/* Left wing */}
          <motion.g
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{ transformOrigin: '110px 160px' }}
          >
            <path d="M110,160 C80,130 50,110 30,120 C20,130 30,150 50,155 C40,145 55,135 70,140 C55,140 45,155 60,165 C50,158 55,170 75,170 C65,168 70,180 90,175 L110,170 Z"
              fill="white" stroke="#E0E0E0" strokeWidth="1" />
          </motion.g>
          {/* Right wing */}
          <motion.g
            animate={{ rotate: [5, -5, 5] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{ transformOrigin: '190px 160px' }}
          >
            <path d="M190,160 C220,130 250,110 270,120 C280,130 270,150 250,155 C260,145 245,135 230,140 C245,140 255,155 240,165 C250,158 245,170 225,170 C235,168 230,180 210,175 L190,170 Z"
              fill="white" stroke="#E0E0E0" strokeWidth="1" />
          </motion.g>
        </g>
      )
    case 'crown':
      return (
        <g>
          <path d="M112,28 L118,6 L128,22 L138,0 L150,20 L162,0 L172,22 L182,6 L188,28 Z" fill="#FFD700" stroke="#FFA000" strokeWidth="1.5" />
          <circle cx="138" cy="12" r="3" fill="#E53935" />
          <circle cx="150" cy="10" r="3.5" fill="#2196F3" />
          <circle cx="162" cy="12" r="3" fill="#4CAF50" />
          <rect x="112" y="24" width="76" height="8" rx="2" fill="#FFD700" stroke="#FFA000" strokeWidth="1" />
          <rect x="112" y="26" width="76" height="3" fill="#FFC107" opacity="0.5" />
        </g>
      )
    case 'mask-fox':
      return (
        <g>
          <path d="M112,70 C112,62 125,54 150,54 C175,54 188,62 188,70 L188,90 C188,98 175,105 150,105 C125,105 112,98 112,90 Z"
            fill="#FF8A65" stroke="#E64A19" strokeWidth="1.5" opacity="0.85" />
          {/* Fox eye holes */}
          <path d="M122,78 L132,72 L140,80 L132,84 Z" fill="#1A1A2E" />
          <path d="M178,78 L168,72 L160,80 L168,84 Z" fill="#1A1A2E" />
          {/* Fox nose */}
          <circle cx="150" cy="92" r="3" fill="#1A1A2E" />
          {/* Whiskers */}
          <line x1="130" y1="90" x2="110" y2="86" stroke="#1A1A2E" strokeWidth="1" />
          <line x1="130" y1="93" x2="108" y2="94" stroke="#1A1A2E" strokeWidth="1" />
          <line x1="170" y1="90" x2="190" y2="86" stroke="#1A1A2E" strokeWidth="1" />
          <line x1="170" y1="93" x2="192" y2="94" stroke="#1A1A2E" strokeWidth="1" />
          {/* Fox ears */}
          <path d="M118,62 L105,36 L128,56" fill="#FF8A65" stroke="#E64A19" strokeWidth="1" />
          <path d="M182,62 L195,36 L172,56" fill="#FF8A65" stroke="#E64A19" strokeWidth="1" />
          <path d="M114,56 L108,42 L124,54" fill="#FFCCBC" />
          <path d="M186,56 L192,42 L176,54" fill="#FFCCBC" />
        </g>
      )
    case 'mask-oni':
      return (
        <g>
          <path d="M108,65 C108,55 122,45 150,45 C178,45 192,55 192,65 L192,95 C192,108 178,115 150,115 C122,115 108,108 108,95 Z"
            fill="#B71C1C" stroke="#880E4F" strokeWidth="2" opacity="0.9" />
          {/* Oni horns */}
          <path d="M120,55 L108,20 L118,40 L112,10 L126,45" fill="#FFD54F" stroke="#FFA000" strokeWidth="1" />
          <path d="M180,55 L192,20 L182,40 L188,10 L174,45" fill="#FFD54F" stroke="#FFA000" strokeWidth="1" />
          {/* Oni eyes */}
          <path d="M120,72 L135,68 L140,76 L130,82 Z" fill="#FFD740" />
          <path d="M180,72 L165,68 L160,76 L170,82 Z" fill="#FFD740" />
          <circle cx="132" cy="75" r="3" fill="#1A1A2E" />
          <circle cx="168" cy="75" r="3" fill="#1A1A2E" />
          {/* Oni nose */}
          <circle cx="145" cy="88" r="3" fill="#880E4F" />
          <circle cx="155" cy="88" r="3" fill="#880E4F" />
          {/* Oni teeth */}
          <path d="M125,98 L130,108 L135,98 L140,110 L145,98 L150,112 L155,98 L160,110 L165,98 L170,108 L175,98"
            fill="white" stroke="#E0E0E0" strokeWidth="0.5" />
          {/* Tusks */}
          <path d="M128,100 L122,115 L132,105" fill="white" />
          <path d="M172,100 L178,115 L168,105" fill="white" />
        </g>
      )
    default:
      return null
  }
}

export function AvatarSVG({
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
}: AvatarSVGProps) {
  const outfit = getOutfitColor(outfitId)
  const darkHair = adjustColor(hairColor, -40)
  const skinDark = adjustColor(skinTone, -25)
  const auraColors = AURA_COLORS[aura]
  const hasAura = aura !== 'none'

  // Blink state
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

  // Accessories that render behind body
  const isCape = accessoryId === 'cape'
  const isWings = accessoryId === 'wings'

  return (
    <motion.svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 300 375"
      animate={hasAura ? { filter: ['drop-shadow(0 0 8px ' + auraColors[1] + ')', 'drop-shadow(0 0 16px ' + auraColors[1] + ')', 'drop-shadow(0 0 8px ' + auraColors[1] + ')'] } : {}}
      transition={hasAura ? { repeat: Infinity, duration: 1.5 } : {}}
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={outfit.main} />
          <stop offset="100%" stopColor={outfit.dark} />
        </linearGradient>
        <linearGradient id="skinGrad" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor={skinTone} />
          <stop offset="100%" stopColor={skinDark} />
        </linearGradient>
        <linearGradient id="beltGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1A1A2E" />
          <stop offset="50%" stopColor="#333355" />
          <stop offset="100%" stopColor="#1A1A2E" />
        </linearGradient>
        {hasAura && (
          <radialGradient id="auraGlow">
            <stop offset="0%" stopColor={auraColors[0]} stopOpacity="0.3" />
            <stop offset="50%" stopColor={auraColors[1]} stopOpacity="0.1" />
            <stop offset="100%" stopColor={auraColors[2]} stopOpacity="0" />
          </radialGradient>
        )}
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Aura background */}
      {hasAura && (
        <motion.ellipse
          cx="150" cy="200" rx="130" ry="170"
          fill="url(#auraGlow)"
          animate={{ rx: [130, 140, 130], ry: [170, 180, 170], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
      )}

      {/* Aura energy lines */}
      {hasAura && (
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.line
              key={i}
              x1={90 + i * 25} y1="350"
              x2={90 + i * 25 + (i % 2 === 0 ? -10 : 10)} y2="50"
              stroke={auraColors[i % 3]}
              strokeWidth="1.5" strokeLinecap="round" opacity="0.3"
              animate={{ y1: [350, 340, 350], opacity: [0.1, 0.4, 0.1] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
            />
          ))}
        </g>
      )}

      {/* Cape/Wings render behind body */}
      {isCape && <AccessorySVG id="cape" />}
      {isWings && <AccessorySVG id="wings" />}

      {/* Main body group with idle breathing */}
      <motion.g
        filter="url(#shadow)"
        animate={idle ? { y: [0, -3, 0] } : {}}
        transition={idle ? { repeat: Infinity, duration: 2.5, ease: 'easeInOut' } : {}}
      >
        {/* === LEGS === */}
        <g>
          <path d="M118,268 L112,330 C112,338 118,342 126,342 L132,342 C138,342 140,338 138,332 L138,268" fill="#1A1A2E" />
          <path d="M162,268 L162,330 C162,338 166,342 172,342 L178,342 C184,342 188,338 188,332 L192,268" fill="#1A1A2E" />
          <path d="M110,336 L132,336 C136,336 138,338 138,340 L138,342 L108,342 C106,342 106,338 110,336Z" fill="#2D2B3D" />
          <path d="M162,336 L180,336 C184,336 186,338 186,340 L186,342 L160,342 C158,342 158,338 162,336Z" fill="#2D2B3D" />
        </g>

        {/* === BODY / GI === */}
        <g>
          <path d="M108,140 C104,145 100,170 100,200 L100,270 C100,278 108,280 115,280 L185,280 C192,280 200,278 200,270 L200,200 C200,170 196,145 192,140 Z"
            fill="url(#bodyGrad)" />
          <path d="M108,140 L145,195 L150,192 L155,195 L192,140" fill="none" stroke={outfit.accent} strokeWidth="2.5" />
          <path d="M108,140 L145,195 L108,200" fill={outfit.main} stroke={outfit.accent} strokeWidth="1" opacity="0.4" />
          <path d="M192,140 L155,195 L192,200" fill={outfit.main} stroke={outfit.accent} strokeWidth="1" opacity="0.4" />
          <path d="M120,160 C125,190 130,220 128,270" fill="none" stroke={outfit.dark} strokeWidth="1.5" opacity="0.3" />
          <path d="M180,160 C175,190 170,220 172,270" fill="none" stroke={outfit.dark} strokeWidth="1.5" opacity="0.3" />

          {/* Belt */}
          <rect x="100" y="225" width="100" height="14" rx="2" fill="url(#beltGrad)" />
          <circle cx="150" cy="232" r="6" fill="#1A1A2E" stroke="#444466" strokeWidth="1" />
          <path d="M144,238 L138,265 L142,264 L140,238" fill="#1A1A2E" />
          <path d="M156,238 L162,265 L158,264 L160,238" fill="#1A1A2E" />

          {/* Outfit emblems */}
          {outfitId === 'gi-dragon' && (
            <g transform="translate(135,165)" opacity="0.7">
              <path d="M15,0 C20,5 25,2 22,10 C28,8 30,14 24,18 C28,22 24,28 18,26 C16,32 10,30 10,24 C4,28 0,22 6,18 C0,14 4,8 10,10 C6,4 12,0 15,0Z" fill={outfit.accent} />
            </g>
          )}
          {outfitId === 'gi-phoenix' && (
            <g transform="translate(130,160)" opacity="0.6">
              <motion.path
                d="M20,30 C15,22 8,18 5,10 C8,5 15,2 20,8 C25,2 32,5 35,10 C32,18 25,22 20,30Z"
                fill="#FF6D00"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <path d="M18,20 C16,14 12,12 10,8 C13,6 17,5 18,10 C19,5 23,6 26,8 C24,12 20,14 18,20Z" fill="#FFD54F" />
            </g>
          )}
          {outfitId === 'gi-cyber' && (
            <g>
              {/* Circuit lines */}
              <motion.line x1="120" y1="180" x2="120" y2="220" stroke="#00E5FF" strokeWidth="1" opacity="0.4"
                animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ repeat: Infinity, duration: 2 }} />
              <motion.line x1="180" y1="180" x2="180" y2="220" stroke="#00E5FF" strokeWidth="1" opacity="0.4"
                animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} />
              <motion.circle cx="150" cy="190" r="3" fill="#00E5FF" opacity="0.5"
                animate={{ r: [3, 5, 3], opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} />
            </g>
          )}
        </g>

        {/* === ARMS === */}
        <g>
          <path d="M108,145 C95,148 78,160 68,180 C62,192 60,200 65,204 C70,208 78,204 82,196 C88,182 96,170 108,165"
            fill="url(#bodyGrad)" stroke={outfit.accent} strokeWidth="1" />
          <ellipse cx="65" cy="200" rx="10" ry="8" fill="url(#skinGrad)" />
          {/* Fingers hint */}
          <path d="M58,196 C56,194 55,198 57,200" fill="none" stroke={skinDark} strokeWidth="1" opacity="0.4" />
          <path d="M60,194 C58,192 57,196 59,198" fill="none" stroke={skinDark} strokeWidth="1" opacity="0.4" />

          <path d="M192,145 C205,148 222,160 232,180 C238,192 240,200 235,204 C230,208 222,204 218,196 C212,182 204,170 192,165"
            fill="url(#bodyGrad)" stroke={outfit.accent} strokeWidth="1" />
          <ellipse cx="235" cy="200" rx="10" ry="8" fill="url(#skinGrad)" />
          <path d="M242,196 C244,194 245,198 243,200" fill="none" stroke={skinDark} strokeWidth="1" opacity="0.4" />
          <path d="M240,194 C242,192 243,196 241,198" fill="none" stroke={skinDark} strokeWidth="1" opacity="0.4" />
        </g>

        {/* === NECK === */}
        <path d="M132,110 L132,140 L168,140 L168,110" fill="url(#skinGrad)" />

        {/* === HEAD === */}
        <g>
          <ellipse cx="150" cy="72" rx="48" ry="52" fill="url(#skinGrad)" />
          {/* Cheek blush for happy expression */}
          {expression === 'happy' && (
            <g opacity="0.3">
              <ellipse cx="120" cy="95" rx="10" ry="5" fill="#FF8A80" />
              <ellipse cx="180" cy="95" rx="10" ry="5" fill="#FF8A80" />
            </g>
          )}
          {/* Angry vein */}
          {expression === 'angry' && (
            <g transform="translate(175, 50)" opacity="0.6">
              <path d="M0,0 L4,-4 L8,0 L4,4 Z" fill="#E53935" />
              <line x1="4" y1="-4" x2="4" y2="4" stroke="#E53935" strokeWidth="1" />
              <line x1="0" y1="0" x2="8" y2="0" stroke="#E53935" strokeWidth="1" />
            </g>
          )}
          {/* Surprised sweat drop */}
          {expression === 'surprised' && (
            <motion.path
              d="M190,55 C192,50 194,55 192,60 C190,63 188,60 190,55Z"
              fill="#80D8FF" opacity="0.7"
              animate={{ y: [0, 5, 0], opacity: [0.7, 0.3, 0.7] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          )}
          {/* Nose */}
          <path d="M148,92 L150,98 L154,95" fill="none" stroke={skinDark} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          {/* Mouth */}
          <MouthSVG expression={expression} />
          {/* Eyes */}
          <EyesSVG style={eyeStyle} skinTone={skinTone} blinking={blinking} expression={expression} />
          {/* Hair */}
          <HairPath style={hairStyle} color={hairColor} darkColor={darkHair} />
        </g>

        {/* === ACCESSORIES (front-rendered) === */}
        {accessoryId && accessoryId !== 'cape' && accessoryId !== 'wings' && accessoryId !== '' && (
          <AccessorySVG id={accessoryId} />
        )}

        {/* Necklace renders on neck */}
        {accessoryId === 'necklace' && <AccessorySVG id="necklace" />}
      </motion.g>

      {/* Ground shadow */}
      <ellipse cx="150" cy="360" rx="60" ry="8" fill="black" opacity="0.15" />
    </motion.svg>
  )
}

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xFF) + amount))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xFF) + amount))
  const b = Math.min(255, Math.max(0, (num & 0xFF) + amount))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

/** Small avatar for the header/dashboard */
export function AvatarMini({
  hairColor,
  hairStyle,
  skinTone,
  eyeStyle,
  outfitId,
  size = 40,
}: {
  hairColor: string
  hairStyle: HairStyle
  skinTone: string
  eyeStyle: EyeStyle
  outfitId: string
  size?: number
}) {
  const outfit = getOutfitColor(outfitId)
  const darkHair = adjustColor(hairColor, -40)

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs>
        <linearGradient id="miniSkinGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={skinTone} />
          <stop offset="100%" stopColor={adjustColor(skinTone, -20)} />
        </linearGradient>
      </defs>
      <rect x="30" y="70" width="40" height="30" rx="8" fill={outfit.main} />
      <rect x="42" y="62" width="16" height="12" fill={skinTone} />
      <ellipse cx="50" cy="42" rx="28" ry="30" fill="url(#miniSkinGrad)" />
      {hairStyle === 'spiky' && (
        <path d="M22,40 L18,15 L30,30 L28,8 L42,28 L40,4 L55,26 L58,6 L65,28 L72,10 L74,32 L82,18 L78,40" fill={hairColor} />
      )}
      {hairStyle === 'long' && (
        <g>
          <path d="M22,40 C22,18 32,8 50,6 C68,8 78,18 78,40" fill={hairColor} />
          <path d="M22,40 L20,80 L28,75 L26,40" fill={hairColor} />
          <path d="M78,40 L80,80 L72,75 L74,40" fill={hairColor} />
        </g>
      )}
      {hairStyle === 'short' && (
        <g>
          <path d="M22,38 C22,18 32,8 50,6 C68,8 78,18 78,38" fill={hairColor} />
          <path d="M26,36 L24,26 L34,34 L36,24 L46,32 L50,22 L56,32 L64,24 L66,34 L76,26 L74,36" fill={hairColor} />
        </g>
      )}
      {hairStyle === 'mohawk' && (
        <g>
          <path d="M26,40 C26,28 36,18 50,16 C64,18 74,28 74,40" fill={darkHair} opacity="0.3" />
          <path d="M42,40 L38,2 L46,14 L50,0 L54,14 L62,2 L58,40" fill={hairColor} />
        </g>
      )}
      {hairStyle === 'samurai' && (
        <g>
          <path d="M22,40 C22,18 32,8 50,6 C68,8 78,18 78,40" fill={hairColor} />
          <ellipse cx="50" cy="4" rx="8" ry="6" fill={hairColor} />
          <rect x="47" y="7" width="6" height="4" rx="1" fill={darkHair} />
        </g>
      )}
      {eyeStyle === 'cyber' ? (
        <g>
          <rect x="33" y="38" width="12" height="6" rx="1.5" fill="white" stroke="#00E5FF" strokeWidth="0.8" />
          <circle cx="39" cy="41" r="2" fill="#00E5FF" />
          <rect x="55" y="38" width="12" height="6" rx="1.5" fill="white" stroke="#00E5FF" strokeWidth="0.8" />
          <circle cx="61" cy="41" r="2" fill="#00E5FF" />
        </g>
      ) : (
        <g>
          <ellipse cx="39" cy="42" rx="4" ry="4.5" fill="#1A1A2E" />
          <circle cx="40" cy="41" r="1.5" fill="white" />
          <ellipse cx="61" cy="42" rx="4" ry="4.5" fill="#1A1A2E" />
          <circle cx="62" cy="41" r="1.5" fill="white" />
        </g>
      )}
      <path d="M42,54 Q50,58 58,54" fill="none" stroke="#CC7766" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
