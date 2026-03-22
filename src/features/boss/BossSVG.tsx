import { motion } from 'framer-motion'
import type { BossConfig } from './bossData'

interface BossSVGProps {
  boss: BossConfig
  hp: number
  shaking: boolean
  damaged: boolean
}

export function BossSVG({ boss, hp, shaking, damaged }: BossSVGProps) {
  const hpPercent = hp / boss.maxHP
  const glowIntensity = hpPercent > 0.5 ? 1 : hpPercent > 0.25 ? 0.6 : 0.3

  return (
    <motion.div
      animate={shaking ? {
        x: [0, -8, 8, -6, 6, -3, 3, 0],
        rotate: [0, -2, 2, -1, 1, 0],
      } : { y: [0, -5, 0] }}
      transition={shaking ? { duration: 0.4 } : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      className="relative inline-block"
    >
      {/* Glow behind boss */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-50"
        style={{
          background: `radial-gradient(circle, ${boss.glowColor}40, transparent 70%)`,
          transform: 'scale(1.5)',
          opacity: glowIntensity * 0.5,
        }}
      />

      {/* Damage flash overlay */}
      {damaged && (
        <motion.div
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-10 rounded-3xl"
          style={{ background: 'white' }}
        />
      )}

      <svg viewBox="0 0 200 200" width="180" height="180" className="relative z-1">
        <defs>
          <filter id={`glow-${boss.id}`}>
            <feGaussianBlur stdDeviation="4" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id={`bodyGrad-${boss.id}`} cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor={boss.secondaryColor} />
            <stop offset="100%" stopColor={boss.primaryColor} />
          </radialGradient>
        </defs>

        {boss.shape === 'ninja' && <NinjaShape boss={boss} />}
        {boss.shape === 'dragon' && <DragonShape boss={boss} />}
        {boss.shape === 'golem' && <GolemShape boss={boss} />}
        {boss.shape === 'phantom' && <PhantomShape boss={boss} />}
        {boss.shape === 'titan' && <TitanShape boss={boss} />}
      </svg>
    </motion.div>
  )
}

function NinjaShape({ boss }: { boss: BossConfig }) {
  return (
    <g filter={`url(#glow-${boss.id})`}>
      {/* Body */}
      <ellipse cx="100" cy="120" rx="40" ry="55" fill={`url(#bodyGrad-${boss.id})`} />
      {/* Head */}
      <circle cx="100" cy="65" r="30" fill={boss.primaryColor} />
      {/* Mask band */}
      <rect x="65" y="55" width="70" height="14" rx="4" fill={boss.secondaryColor} />
      {/* Eyes */}
      <ellipse cx="85" cy="62" rx="6" ry="3" fill={boss.glowColor} />
      <ellipse cx="115" cy="62" rx="6" ry="3" fill={boss.glowColor} />
      {/* Scarf tails */}
      <path d="M130 62 Q145 75, 155 60 Q160 50, 150 55" fill={boss.secondaryColor} opacity="0.8" />
      <path d="M130 66 Q150 85, 160 70" fill={boss.secondaryColor} opacity="0.6" />
      {/* Arms */}
      <line x1="60" y1="100" x2="35" y2="85" stroke={boss.primaryColor} strokeWidth="8" strokeLinecap="round" />
      <line x1="140" y1="100" x2="165" y2="85" stroke={boss.primaryColor} strokeWidth="8" strokeLinecap="round" />
      {/* Sword */}
      <line x1="165" y1="85" x2="175" y2="40" stroke={boss.glowColor} strokeWidth="3" />
      <line x1="160" y1="87" x2="170" y2="83" stroke={boss.secondaryColor} strokeWidth="5" />
    </g>
  )
}

function DragonShape({ boss }: { boss: BossConfig }) {
  return (
    <g filter={`url(#glow-${boss.id})`}>
      {/* Body */}
      <ellipse cx="100" cy="125" rx="50" ry="50" fill={`url(#bodyGrad-${boss.id})`} />
      {/* Belly */}
      <ellipse cx="100" cy="135" rx="30" ry="35" fill={boss.secondaryColor} opacity="0.3" />
      {/* Head */}
      <ellipse cx="100" cy="65" rx="35" ry="28" fill={boss.primaryColor} />
      {/* Snout */}
      <ellipse cx="100" cy="80" rx="18" ry="12" fill={boss.secondaryColor} opacity="0.5" />
      {/* Eyes */}
      <ellipse cx="82" cy="58" rx="7" ry="5" fill={boss.glowColor} />
      <ellipse cx="118" cy="58" rx="7" ry="5" fill={boss.glowColor} />
      <circle cx="84" cy="58" r="2" fill={boss.primaryColor} />
      <circle cx="120" cy="58" r="2" fill={boss.primaryColor} />
      {/* Horns */}
      <path d="M75 48 L60 25 L78 45" fill={boss.secondaryColor} />
      <path d="M125 48 L140 25 L122 45" fill={boss.secondaryColor} />
      {/* Wings */}
      <path d="M55 110 Q20 70, 40 40 Q50 55, 55 80 Q45 65, 50 50 Q55 70, 60 95" fill={boss.secondaryColor} opacity="0.7" />
      <path d="M145 110 Q180 70, 160 40 Q150 55, 145 80 Q155 65, 150 50 Q145 70, 140 95" fill={boss.secondaryColor} opacity="0.7" />
      {/* Nostrils */}
      <circle cx="92" cy="78" r="3" fill={boss.glowColor} opacity="0.6" />
      <circle cx="108" cy="78" r="3" fill={boss.glowColor} opacity="0.6" />
    </g>
  )
}

function GolemShape({ boss }: { boss: BossConfig }) {
  return (
    <g filter={`url(#glow-${boss.id})`}>
      {/* Body - blocky */}
      <rect x="60" y="85" width="80" height="85" rx="10" fill={`url(#bodyGrad-${boss.id})`} />
      {/* Crystal formations on body */}
      <polygon points="75,90 85,70 95,90" fill={boss.glowColor} opacity="0.4" />
      <polygon points="115,95 125,75 135,95" fill={boss.glowColor} opacity="0.3" />
      {/* Head */}
      <rect x="70" y="45" width="60" height="45" rx="8" fill={boss.primaryColor} />
      {/* Eyes */}
      <rect x="80" y="58" width="12" height="8" rx="2" fill={boss.glowColor} />
      <rect x="108" y="58" width="12" height="8" rx="2" fill={boss.glowColor} />
      {/* Mouth */}
      <rect x="88" y="75" width="24" height="6" rx="2" fill={boss.secondaryColor} />
      {/* Shoulders */}
      <rect x="40" y="88" width="25" height="30" rx="6" fill={boss.primaryColor} />
      <rect x="135" y="88" width="25" height="30" rx="6" fill={boss.primaryColor} />
      {/* Ice crystals on shoulders */}
      <polygon points="52,85 52,70 58,85" fill={boss.glowColor} opacity="0.5" />
      <polygon points="148,85 148,70 154,85" fill={boss.glowColor} opacity="0.5" />
      {/* Cracks/runes */}
      <line x1="85" y1="100" x2="85" y2="130" stroke={boss.glowColor} strokeWidth="1" opacity="0.3" />
      <line x1="115" y1="105" x2="115" y2="140" stroke={boss.glowColor} strokeWidth="1" opacity="0.3" />
    </g>
  )
}

function PhantomShape({ boss }: { boss: BossConfig }) {
  return (
    <g filter={`url(#glow-${boss.id})`}>
      {/* Ghostly body fading down */}
      <ellipse cx="100" cy="100" rx="45" ry="60" fill={`url(#bodyGrad-${boss.id})`} opacity="0.8" />
      {/* Tattered bottom */}
      <path d="M55 130 Q65 155, 75 140 Q85 160, 100 145 Q115 160, 125 140 Q135 155, 145 130" fill={boss.primaryColor} opacity="0.6" />
      {/* Inner glow */}
      <ellipse cx="100" cy="95" rx="25" ry="30" fill={boss.glowColor} opacity="0.1" />
      {/* Eyes - intense */}
      <ellipse cx="85" cy="80" rx="10" ry="6" fill={boss.glowColor} />
      <ellipse cx="115" cy="80" rx="10" ry="6" fill={boss.glowColor} />
      <circle cx="85" cy="80" r="3" fill="white" />
      <circle cx="115" cy="80" r="3" fill="white" />
      {/* Lightning bolts */}
      <path d="M60 50 L55 65 L65 60 L58 80" stroke={boss.secondaryColor} strokeWidth="2" fill="none" />
      <path d="M140 50 L145 65 L135 60 L142 80" stroke={boss.secondaryColor} strokeWidth="2" fill="none" />
      {/* Crown/halo */}
      <path d="M70 55 L80 40 L90 52 L100 35 L110 52 L120 40 L130 55" stroke={boss.glowColor} strokeWidth="2" fill="none" opacity="0.6" />
    </g>
  )
}

function TitanShape({ boss }: { boss: BossConfig }) {
  return (
    <g filter={`url(#glow-${boss.id})`}>
      {/* Massive body */}
      <ellipse cx="100" cy="130" rx="55" ry="55" fill={`url(#bodyGrad-${boss.id})`} />
      {/* Armor plates */}
      <path d="M60 110 L70 100 L90 105 L100 95 L110 105 L130 100 L140 110" fill={boss.secondaryColor} opacity="0.5" />
      {/* Head - small relative to body */}
      <circle cx="100" cy="65" r="25" fill={boss.primaryColor} />
      {/* Helmet */}
      <path d="M75 60 Q100 35, 125 60" fill={boss.secondaryColor} />
      <rect x="75" y="57" width="50" height="8" rx="2" fill={boss.secondaryColor} />
      {/* Eyes */}
      <rect x="84" y="62" width="10" height="5" rx="1" fill={boss.glowColor} />
      <rect x="106" y="62" width="10" height="5" rx="1" fill={boss.glowColor} />
      {/* Massive arms */}
      <ellipse cx="42" cy="115" rx="20" ry="25" fill={boss.primaryColor} />
      <ellipse cx="158" cy="115" rx="20" ry="25" fill={boss.primaryColor} />
      {/* Fists */}
      <circle cx="35" cy="135" r="12" fill={boss.secondaryColor} />
      <circle cx="165" cy="135" r="12" fill={boss.secondaryColor} />
      {/* Gold runes */}
      <circle cx="100" cy="120" r="8" stroke={boss.glowColor} strokeWidth="1.5" fill="none" opacity="0.4" />
      <circle cx="100" cy="120" r="15" stroke={boss.glowColor} strokeWidth="1" fill="none" opacity="0.2" />
    </g>
  )
}
