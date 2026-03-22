import { motion } from 'framer-motion'
import { useStreakStore } from '../stores/streakStore'

const STREAK_REWARDS = [
  { days: 3, reward: '🥉 3 Bronze' },
  { days: 7, reward: '🥈 2 Silber' },
  { days: 14, reward: '🥇 1 Gold' },
  { days: 30, reward: '👑 Spezial-Item' },
]

export function StreakCalendar() {
  const { currentStreak, longestStreak } = useStreakStore()

  return (
    <div className="bg-card rounded-2xl p-5 shadow-anime border-2 border-primary/20">
      <div className="text-center mb-4">
        <motion.div
          animate={currentStreak >= 5 ? { scale: [1, 1.2, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-5xl mb-2"
        >
          {currentStreak >= 7 ? '🔥' : currentStreak >= 3 ? '⚡' : '📅'}
        </motion.div>
        <h3 className="font-title text-2xl text-theme">{currentStreak} Tage Streak</h3>
        <p className="text-sm text-secondary font-body">
          Rekord: {longestStreak} Tage
        </p>
      </div>

      {/* Streak dots */}
      <div className="flex justify-center gap-1.5 mb-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-body ${
              i < (currentStreak % 7 || (currentStreak > 0 ? 7 : 0))
                ? 'bg-primary text-white'
                : 'bg-primary/10 text-secondary'
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* Rewards */}
      <div className="space-y-2">
        {STREAK_REWARDS.map((sr) => (
          <div
            key={sr.days}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-body ${
              currentStreak >= sr.days
                ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]'
                : 'bg-primary/5 text-secondary'
            }`}
          >
            <span>
              {currentStreak >= sr.days ? '✅' : '🔒'} {sr.days} Tage
            </span>
            <span className="font-bold">{sr.reward}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
