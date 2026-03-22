import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useUserStore } from '../../shared/stores/userStore'
import { useXPStore } from '../../shared/stores/xpStore'
import { useStreakStore } from '../../shared/stores/streakStore'
import { useMissionsStore } from '../../shared/stores/missionsStore'
import { useSRSStore } from '../../shared/stores/srsStore'
import { useAnalyticsStore } from '../../shared/stores/analyticsStore'
import { useDifficultyStore } from '../../shared/stores/difficultyStore'
import { useLoginRewardsStore } from '../../shared/stores/loginRewardsStore'
import { getRecommendedModule, getModulePath, getModuleEmoji } from '../../shared/utils/learningInsights'
import { ModuleCard } from '../../shared/components/Card'
import { Card } from '../../shared/components/Card'
import { XPBar } from '../../shared/components/XPBar'
import { StreakCalendar } from '../../shared/components/StreakCalendar'
import LoginRewardModal from './LoginRewardModal'

const modules = [
  { emoji: '🇬🇧', title: 'Englisch', description: 'Vokabeln & Grammatik', path: '/module/english' },
  { emoji: '🔢', title: 'Mathe', description: 'Rechnen & Knobeln', path: '/module/math' },
  { emoji: '🏑', title: 'Hockey', description: 'Regeln & Taktik', path: '/module/hockey' },
  { emoji: '🧠', title: 'Gedaechtnis', description: 'Merken & Erinnern', path: '/module/memory' },
  { emoji: '✍️', title: 'Schreibschrift', description: 'Runen meistern', path: '/module/handwriting' },
  { emoji: '🤖', title: 'KI-Grundlagen', description: 'Lerne ueber KI', path: '/module/ai' },
  { emoji: '⚔️', title: 'Quiz-Arena', description: 'Teste dein Wissen', path: '/module/quiz' },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { name } = useUserStore()
  const { getRank } = useXPStore()
  const { currentStreak } = useStreakStore()
  const { missions, checkAndGenerate } = useMissionsStore()
  const { getDueCount } = useSRSStore()
  const { getModuleStats } = useAnalyticsStore()
  const { topics } = useDifficultyStore()
  const { checkIfClaimedToday } = useLoginRewardsStore()
  const rank = getRank()

  const [showLoginReward, setShowLoginReward] = useState(false)

  useEffect(() => {
    checkAndGenerate()
    const alreadyClaimed = checkIfClaimedToday()
    if (!alreadyClaimed) {
      setShowLoginReward(true)
    }
  }, [checkAndGenerate, checkIfClaimedToday])

  const activeMissions = missions.filter((m) => !m.completed).slice(0, 3)
  const dueCount = getDueCount()
  const stats = getModuleStats()
  const recommendation = getRecommendedModule(stats, dueCount, topics)

  return (
    <div>
      {showLoginReward && (
        <LoginRewardModal onClose={() => setShowLoginReward(false)} />
      )}

      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl sm:text-3xl text-theme neon-text">
          Willkommen zurueck, {name}!
        </h1>
        <div className="flex items-center justify-center gap-4 mt-2">
          <span className="text-lg font-body">
            {rank.emoji} {rank.name}
          </span>
          {currentStreak > 0 && (
            <span className="text-sm bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-3 py-1 rounded-full font-bold font-body neon-border">
              🔥 {currentStreak} Tage Streak
            </span>
          )}
        </div>
      </motion.div>

      {/* XP Bar */}
      <div className="mb-6 max-w-lg mx-auto">
        <XPBar />
      </div>

      {/* Recommendation Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <Card
          hoverable
          glow
          onClick={() => navigate(getModulePath(recommendation.module))}
          className="!p-4"
        >
          <div className="flex items-center gap-3">
            <div className="text-4xl">{getModuleEmoji(recommendation.module)}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-title text-base text-theme">Empfohlen fuer dich</h3>
              <p className="text-xs text-secondary font-body truncate">{recommendation.reason}</p>
            </div>
            <div className="text-primary text-xl">→</div>
          </div>
        </Card>
      </motion.div>

      {/* Quick Actions: Missions + Streak */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Card hoverable onClick={() => navigate('/missions')} className="!p-4">
          <h3 className="font-title text-lg text-theme mb-2">Missionen</h3>
          {activeMissions.length > 0 ? (
            <div className="space-y-1">
              {activeMissions.map((m) => (
                <div key={m.id} className="flex items-center gap-2 text-sm font-body">
                  <span
                    className="w-5 h-5 rounded text-xs font-title text-white flex items-center justify-center"
                    style={{
                      backgroundColor:
                        m.rank === 'S' ? '#FFD700' :
                        m.rank === 'A' ? '#D85A30' :
                        m.rank === 'B' ? '#378ADD' : '#4CAF50',
                    }}
                  >
                    {m.rank}
                  </span>
                  <span className="truncate text-secondary">{m.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-secondary font-body">Alle erledigt!</p>
          )}
        </Card>

        <StreakCalendar />
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
        {[
          { emoji: '🧑', label: 'Avatar', path: '/avatar' },
          { emoji: '🏪', label: 'Shop', path: '/shop' },
          { emoji: '🏆', label: 'Trophaeen', path: '/trophies' },
          { emoji: '🐉', label: 'Boss', path: '/boss' },
          { emoji: '🗺️', label: 'Karte', path: '/map' },
          { emoji: '⚙️', label: 'Settings', path: '/settings' },
        ].map((link) => (
          <Card key={link.path} hoverable onClick={() => navigate(link.path)} className="!p-4 text-center">
            <div className="text-4xl">{link.emoji}</div>
            <div className="text-sm font-bold text-theme font-body mt-1">{link.label}</div>
          </Card>
        ))}
      </div>

      {/* Module Grid */}
      <h2 className="text-xl mb-4 text-theme text-center neon-text">Deine Kampfkuenste</h2>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {modules.map((mod) => (
          <motion.div key={mod.path} variants={item}>
            <ModuleCard
              emoji={mod.emoji}
              title={mod.title}
              description={mod.description}
              onClick={() => navigate(mod.path)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
