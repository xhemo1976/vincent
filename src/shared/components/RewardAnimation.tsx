import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ParticleBurst } from './ParticleEffects'

interface FloatingCoinProps {
  type: 'bronze' | 'silver' | 'gold'
  amount: number
  onComplete: () => void
}

const coinEmoji = { bronze: '🥉', silver: '🥈', gold: '🥇' }

export function FloatingCoin({ type, amount, onComplete }: FloatingCoinProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ y: 0, opacity: 1, scale: 1 }}
      animate={{ y: -120, opacity: 0, scale: 0.5 }}
      transition={{ duration: 1.4, ease: 'easeOut' }}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
    >
      <div className="flex items-center gap-1 glass neon-border px-3 py-1.5 rounded-full shadow-lg">
        <span className="text-xl">{coinEmoji[type]}</span>
        <span className="font-bold text-lg font-body neon-text">+{amount}</span>
      </div>
    </motion.div>
  )
}

interface XPGainProps {
  amount: number
  onComplete: () => void
}

export function XPGain({ amount, onComplete }: XPGainProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ y: 0, opacity: 1, scale: 1.5 }}
      animate={{ y: -80, opacity: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
    >
      <span className="font-title text-2xl text-primary neon-text">+{amount} XP</span>
    </motion.div>
  )
}

interface LevelUpProps {
  rankName: string
  rankEmoji: string
  onComplete: () => void
}

export function LevelUp({ rankName, rankEmoji, onComplete }: LevelUpProps) {
  const [particleTrigger, setParticleTrigger] = useState(0)

  useEffect(() => {
    setParticleTrigger((p) => p + 1)
    const timer = setTimeout(onComplete, 4000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <>
      <ParticleBurst type="confetti" count={30} originX={50} originY={40} trigger={particleTrigger} />
      <ParticleBurst type="sparkles" count={20} originX={50} originY={45} trigger={particleTrigger} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
        onClick={onComplete}
      >
        {/* Dark overlay with radial glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/70"
          style={{
            background: 'radial-gradient(circle at 50% 45%, rgba(var(--color-primary-rgb), 0.15) 0%, rgba(0,0,0,0.8) 70%)',
          }}
        />

        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 10 }}
          className="relative glass rounded-3xl p-8 text-center neon-glow-strong max-w-sm mx-4"
        >
          {/* Pulsing glow ring */}
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(var(--color-primary-rgb), 0.3)',
                '0 0 60px rgba(var(--color-primary-rgb), 0.6)',
                '0 0 20px rgba(var(--color-primary-rgb), 0.3)',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-3xl"
          />

          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-7xl mb-4 relative"
          >
            {rankEmoji}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl mb-2 text-theme neon-text"
          >
            RANG AUF!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-primary font-bold font-body"
          >
            {rankName}
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="h-1 bg-primary rounded-full mt-4 neon-glow"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-xs text-secondary mt-4 font-body"
          >
            Tippe zum Fortfahren
          </motion.p>
        </motion.div>
      </motion.div>
    </>
  )
}

export function useRewardAnimations() {
  const [animations, setAnimations] = useState<
    Array<{ id: number; type: 'coin' | 'xp' | 'levelup'; props: Record<string, unknown> }>
  >([])
  const [, setNextId] = useState(0)

  const showCoinGain = useCallback((type: 'bronze' | 'silver' | 'gold', amount: number) => {
    setNextId((prev) => {
      const id = prev + 1
      setAnimations((a) => [...a, { id, type: 'coin', props: { type, amount } }])
      return id
    })
  }, [])

  const showXPGain = useCallback((amount: number) => {
    setNextId((prev) => {
      const id = prev + 1
      setAnimations((a) => [...a, { id, type: 'xp', props: { amount } }])
      return id
    })
  }, [])

  const showLevelUp = useCallback((rankName: string, rankEmoji: string) => {
    setNextId((prev) => {
      const id = prev + 1
      setAnimations((a) => [...a, { id, type: 'levelup', props: { rankName, rankEmoji } }])
      return id
    })
  }, [])

  const removeAnimation = useCallback((id: number) => {
    setAnimations((prev) => prev.filter((a) => a.id !== id))
  }, [])

  const AnimationLayer = useCallback(() => (
    <AnimatePresence>
      {animations.map((anim) => {
        switch (anim.type) {
          case 'coin':
            return (
              <FloatingCoin
                key={anim.id}
                type={anim.props.type as 'bronze' | 'silver' | 'gold'}
                amount={anim.props.amount as number}
                onComplete={() => removeAnimation(anim.id)}
              />
            )
          case 'xp':
            return (
              <XPGain
                key={anim.id}
                amount={anim.props.amount as number}
                onComplete={() => removeAnimation(anim.id)}
              />
            )
          case 'levelup':
            return (
              <LevelUp
                key={anim.id}
                rankName={anim.props.rankName as string}
                rankEmoji={anim.props.rankEmoji as string}
                onComplete={() => removeAnimation(anim.id)}
              />
            )
          default:
            return null
        }
      })}
    </AnimatePresence>
  ), [animations, removeAnimation])

  return { showCoinGain, showXPGain, showLevelUp, AnimationLayer }
}
