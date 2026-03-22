import { motion } from 'framer-motion'
import { getOutfitColor } from '../constants'

interface OutfitProps {
  outfitId: string
}

export function OutfitDetails({ outfitId }: OutfitProps) {
  const outfit = getOutfitColor(outfitId)

  switch (outfitId) {
    case 'gi-dragon':
      return (
        <g transform="translate(175,230)" opacity="0.65">
          {/* Dragon emblem - carved into chest */}
          <path
            d="M25,0 C32,6 38,4 35,14 C42,12 45,20 38,25 C42,30 38,38 30,35
               C28,42 20,40 20,34 C14,38 8,32 14,25 C8,20 12,12 20,14 C16,6 22,0 25,0Z"
            fill={outfit.accent}
          />
          <circle cx="25" cy="20" r="5" fill={outfit.accent} opacity="0.5" />
          {/* Scale pattern on shoulders */}
          <g transform="translate(-50,-40)" opacity="0.3">
            {[0,1,2,3].map(i => (
              <path key={`ls${i}`} d={`M${i*12},0 Q${i*12+6},6 ${i*12+12},0`} fill="none" stroke={outfit.accent} strokeWidth="1" />
            ))}
          </g>
          <g transform="translate(50,-40)" opacity="0.3">
            {[0,1,2,3].map(i => (
              <path key={`rs${i}`} d={`M${i*12},0 Q${i*12+6},6 ${i*12+12},0`} fill="none" stroke={outfit.accent} strokeWidth="1" />
            ))}
          </g>
        </g>
      )
    case 'gi-phoenix':
      return (
        <g transform="translate(170,222)" opacity="0.6">
          {/* Phoenix fire emblem */}
          <motion.path
            d="M30,40 C24,30 14,25 10,16 C14,10 22,6 30,14 C38,6 46,10 50,16 C46,25 36,30 30,40Z"
            fill="#FF6D00"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <path
            d="M28,28 C24,20 18,17 15,12 C19,9 25,7 28,14 C31,7 37,9 41,12 C38,17 32,20 28,28Z"
            fill="#FFD54F"
          />
          {/* Wing marks on sides */}
          <g opacity="0.3">
            <path d="M-40,-10 Q-30,-20 -20,-10" fill="none" stroke="#FF6D00" strokeWidth="1.5" />
            <path d="M-45,-5 Q-35,-15 -25,-5" fill="none" stroke="#FF6D00" strokeWidth="1" />
            <path d="M90,-10 Q80,-20 70,-10" fill="none" stroke="#FF6D00" strokeWidth="1.5" />
            <path d="M95,-5 Q85,-15 75,-5" fill="none" stroke="#FF6D00" strokeWidth="1" />
          </g>
        </g>
      )
    case 'gi-cyber':
      return (
        <g>
          {/* Circuit lines */}
          <motion.line x1="158" y1="240" x2="158" y2="290" stroke="#00E5FF" strokeWidth="1.2" opacity="0.4"
            animate={{ opacity: [0.15, 0.5, 0.15] }} transition={{ repeat: Infinity, duration: 2 }} />
          <motion.line x1="242" y1="240" x2="242" y2="290" stroke="#00E5FF" strokeWidth="1.2" opacity="0.4"
            animate={{ opacity: [0.15, 0.5, 0.15] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} />
          {/* Center power core */}
          <motion.circle cx="200" cy="258" r="5" fill="#00E5FF" opacity="0.5"
            animate={{ r: [4, 6, 4], opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} />
          {/* Tech panel lines */}
          <path d="M162,245 L162,250 L168,255" fill="none" stroke="#00E5FF" strokeWidth="0.8" opacity="0.3" />
          <path d="M238,245 L238,250 L232,255" fill="none" stroke="#00E5FF" strokeWidth="0.8" opacity="0.3" />
          {/* Shoulder plates */}
          <rect x="138" y="198" width="20" height="8" rx="2" fill="#00E5FF" opacity="0.15" />
          <rect x="242" y="198" width="20" height="8" rx="2" fill="#00E5FF" opacity="0.15" />
        </g>
      )
    case 'gi-gold':
      return (
        <g opacity="0.4">
          {/* Shimmer patterns */}
          <motion.path
            d="M180,230 L185,225 L190,230 L185,235Z"
            fill="#FFF176"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <motion.path
            d="M210,245 L215,240 L220,245 L215,250Z"
            fill="#FFF176"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.7 }}
          />
          {/* Ornamental borders */}
          <path d="M155,215 Q200,208 245,215" fill="none" stroke="#E65100" strokeWidth="1" opacity="0.4" />
          <path d="M155,290 Q200,283 245,290" fill="none" stroke="#E65100" strokeWidth="1" opacity="0.4" />
        </g>
      )
    default:
      return null
  }
}
