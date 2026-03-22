import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLoginRewardsStore, getRewardForDay } from '../../shared/stores/loginRewardsStore'
import { useXPStore } from '../../shared/stores/xpStore'
import { useCoinsStore } from '../../shared/stores/coinsStore'
import { Button } from '../../shared/components/Button'
import { ParticleBurst } from '../../shared/components/ParticleEffects'

const COIN_EMOJI = { bronze: '🥉', silver: '🥈', gold: '🥇' }

export default function LoginRewardModal({ onClose }: { onClose: () => void }) {
  const { currentDay, claimReward } = useLoginRewardsStore()
  const { addXP } = useXPStore()
  const { addCoins } = useCoinsStore()
  const [claimed, setClaimed] = useState(false)
  const [particleTrigger, setParticleTrigger] = useState(0)

  const todayReward = getRewardForDay(currentDay)
  const isBonus = !!todayReward.bonus

  const handleClaim = () => {
    const reward = claimReward()
    if (!reward) return
    addXP(reward.xp)
    addCoins(reward.coins.type, reward.coins.amount)
    setClaimed(true)
    setParticleTrigger((p) => p + 1)
  }

  // Show calendar preview (last 3 + today + next 3)
  const calendarDays = []
  for (let i = -3; i <= 3; i++) {
    const day = currentDay + i
    if (day < 1) continue
    const reward = getRewardForDay(day)
    calendarDays.push({
      day,
      reward,
      isCurrent: i === 0,
      isPast: i < 0,
      isFuture: i > 0,
    })
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={claimed ? onClose : undefined}
      >
        <div className="absolute inset-0 bg-black/80" />

        <ParticleBurst type="sparkles" count={15} originX={50} originY={40} trigger={particleTrigger} />

        <motion.div
          initial={{ scale: 0.8, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 15 }}
          className="relative glass rounded-3xl p-6 max-w-sm w-full neon-glow-strong"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl text-center text-theme neon-text mb-1">
            Tages-Belohnung
          </h2>
          <p className="text-center text-secondary text-sm font-body mb-4">
            Tag {currentDay}
          </p>

          {/* Calendar strip */}
          <div className="flex justify-center gap-2 mb-6">
            {calendarDays.map((d) => (
              <div
                key={d.day}
                className={`flex flex-col items-center ${
                  d.isCurrent ? 'scale-110' : d.isPast ? 'opacity-40' : 'opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold font-body ${
                    d.isCurrent
                      ? 'bg-primary text-white neon-glow'
                      : d.isPast
                      ? 'bg-[var(--color-success)]/20 text-[var(--color-success)]'
                      : 'glass neon-border text-secondary'
                  }`}
                >
                  {d.isPast ? '✓' : d.day}
                </div>
                <div className="text-[9px] text-secondary mt-0.5 font-body">
                  {COIN_EMOJI[d.reward.coins.type]}
                </div>
              </div>
            ))}
          </div>

          {/* Today's reward */}
          <motion.div
            animate={claimed ? {} : { scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="glass rounded-2xl p-5 text-center mb-4 neon-border"
          >
            {isBonus && (
              <div className="text-xs text-primary font-bold mb-1 font-body animate-neon-pulse">
                {todayReward.bonus}
              </div>
            )}

            <div className="flex items-center justify-center gap-6">
              <div>
                <div className="text-3xl font-title text-primary neon-text">+{todayReward.xp}</div>
                <div className="text-xs text-secondary font-body">XP</div>
              </div>
              <div>
                <div className="text-3xl">{COIN_EMOJI[todayReward.coins.type]}</div>
                <div className="text-xs text-secondary font-body">+{todayReward.coins.amount}</div>
              </div>
            </div>
          </motion.div>

          {!claimed ? (
            <Button onClick={handleClaim} className="w-full animate-neon-pulse" size="lg">
              Belohnung abholen!
            </Button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="text-4xl mb-2">✨</div>
              <p className="text-sm text-[var(--color-success)] font-bold font-body mb-3">
                Eingesammelt!
              </p>
              <Button variant="secondary" onClick={onClose} className="w-full">
                Weiter
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
