import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAnalyticsStore } from '../../shared/stores/analyticsStore'

const REALMS = [
  { id: 'english', name: 'Sprach-Tal', emoji: '🇬🇧', path: '/module/english', x: 18, y: 22, color: '#5AA3FF', glow: '#5AA3FF' },
  { id: 'math', name: 'Zahlen-Gipfel', emoji: '🔢', path: '/module/math', x: 50, y: 12, color: '#2ECC96', glow: '#2ECC96' },
  { id: 'hockey', name: 'Arena der Staerke', emoji: '🏑', path: '/module/hockey', x: 82, y: 25, color: '#FF7A50', glow: '#FF7A50' },
  { id: 'memory', name: 'Gedaechtnis-Turm', emoji: '🧠', path: '/module/memory', x: 72, y: 55, color: '#9B8FFF', glow: '#9B8FFF' },
  { id: 'handwriting', name: 'Runen-Tempel', emoji: '✍️', path: '/module/handwriting', x: 28, y: 52, color: '#FFD700', glow: '#FFD700' },
  { id: 'ai', name: 'KI-Labor', emoji: '🤖', path: '/module/ai', x: 82, y: 78, color: '#9896a8', glow: '#B8AEFF' },
  { id: 'quiz', name: 'Pruefungs-Dojo', emoji: '⚔️', path: '/module/quiz', x: 50, y: 82, color: '#FF6B6B', glow: '#FF6B6B' },
]

const PATHS = [
  { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 },
  { from: 3, to: 6 }, { from: 0, to: 4 }, { from: 4, to: 6 },
  { from: 3, to: 5 }, { from: 5, to: 6 },
]

export default function MapPage() {
  const navigate = useNavigate()
  const { getModuleStats } = useAnalyticsStore()
  const stats = getModuleStats()

  const getProgress = (moduleId: string): number => {
    const s = stats[moduleId]
    if (!s) return 0
    return Math.min(100, s.sessions * 10)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl mb-2 text-theme text-center neon-text">Wissenskarte</h1>
      <p className="text-secondary text-center mb-4 font-body text-sm">
        Erkunde die 7 Reiche des Wissens!
      </p>

      {/* Map Container */}
      <div
        className="relative rounded-2xl overflow-hidden neon-border"
        style={{
          paddingBottom: '100%',
          background: 'linear-gradient(180deg, #0a0a20 0%, #0d1530 30%, #0a1a15 60%, #0d0d1a 100%)',
        }}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <defs>
            {/* Star filter */}
            <filter id="starGlow">
              <feGaussianBlur stdDeviation="0.3" />
            </filter>
          </defs>

          {/* Background stars */}
          {Array.from({ length: 40 }, (_, i) => (
            <circle
              key={`star-${i}`}
              cx={Math.random() * 100}
              cy={Math.random() * 50}
              r={0.2 + Math.random() * 0.4}
              fill="white"
              opacity={0.2 + Math.random() * 0.5}
              filter="url(#starGlow)"
            >
              <animate
                attributeName="opacity"
                values={`${0.2 + Math.random() * 0.3};${0.5 + Math.random() * 0.5};${0.2 + Math.random() * 0.3}`}
                dur={`${2 + Math.random() * 4}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* Mountain silhouettes */}
          <path d="M0,40 L10,25 L18,35 L25,18 L32,30 L38,22 L45,35 L50,15 L55,28 L62,20 L68,32 L75,12 L82,28 L88,22 L95,30 L100,35 L100,45 L0,45 Z"
            fill="#0a1520" opacity="0.6" />
          <path d="M0,42 L15,32 L25,38 L40,28 L50,35 L60,25 L75,33 L85,28 L100,38 L100,48 L0,48 Z"
            fill="#0d1a28" opacity="0.4" />

          {/* Ground */}
          <rect x="0" y="45" width="100" height="55" fill="#0d1520" opacity="0.3" />

          {/* Water glow */}
          <ellipse cx="18" cy="70" rx="10" ry="4" fill="#5AA3FF" opacity="0.08" />
          <ellipse cx="18" cy="70" rx="6" ry="2" fill="#5AA3FF" opacity="0.12">
            <animate attributeName="rx" values="6;7;6" dur="3s" repeatCount="indefinite" />
          </ellipse>

          {/* Animated paths between realms */}
          {PATHS.map((path, i) => {
            const from = REALMS[path.from]
            const to = REALMS[path.to]
            const midX = (from.x + to.x) / 2 + (Math.random() - 0.5) * 8
            const midY = (from.y + to.y) / 2 + (Math.random() - 0.5) * 8
            const d = `M${from.x},${from.y} Q${midX},${midY} ${to.x},${to.y}`
            return (
              <g key={i}>
                {/* Path glow */}
                <path
                  d={d}
                  fill="none"
                  stroke="rgba(var(--color-primary-rgb), 0.15)"
                  strokeWidth="1.5"
                />
                {/* Animated dash */}
                <path
                  d={d}
                  fill="none"
                  stroke="rgba(var(--color-primary-rgb), 0.4)"
                  strokeWidth="0.6"
                  strokeDasharray="2,2"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-20"
                    dur={`${3 + i * 0.5}s`}
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            )
          })}
        </svg>

        {/* Realm nodes */}
        {REALMS.map((realm, i) => {
          const progress = getProgress(realm.id)
          const visited = progress > 0

          return (
            <motion.div
              key={realm.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1, type: 'spring', damping: 12 }}
              className="absolute cursor-pointer"
              style={{
                left: `${realm.x}%`,
                top: `${realm.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => navigate(realm.path)}
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center"
              >
                {/* Glow ring */}
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-full blur-md"
                    style={{
                      backgroundColor: realm.glow,
                      opacity: visited ? 0.4 : 0.15,
                      transform: 'scale(1.4)',
                    }}
                  />

                  {/* Progress ring */}
                  <svg width="52" height="52" className="absolute -top-[2px] -left-[2px]">
                    <circle
                      cx="26" cy="26" r="23"
                      fill="none"
                      stroke={realm.color}
                      strokeWidth="2"
                      strokeDasharray={`${(progress / 100) * 144.5} 144.5`}
                      strokeLinecap="round"
                      transform="rotate(-90 26 26)"
                      opacity="0.7"
                    />
                  </svg>

                  <div
                    className="relative w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{
                      backgroundColor: visited ? realm.color : `${realm.color}40`,
                      boxShadow: visited ? `0 0 15px ${realm.glow}50` : 'none',
                      border: `2px solid ${realm.glow}60`,
                    }}
                  >
                    {realm.emoji}
                  </div>
                </div>

                {/* Label */}
                <div
                  className="mt-1.5 px-2 py-0.5 rounded text-[7px] font-bold text-center whitespace-nowrap font-body glass"
                  style={{
                    color: realm.glow,
                    borderColor: `${realm.glow}30`,
                    textShadow: `0 0 8px ${realm.glow}40`,
                  }}
                >
                  {realm.name}
                </div>
              </motion.div>
            </motion.div>
          )
        })}

        {/* Floating particles on map */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: 3,
              height: 3,
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              backgroundColor: 'rgba(var(--color-primary-rgb), 0.3)',
              boxShadow: '0 0 6px rgba(var(--color-primary-rgb), 0.2)',
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}
