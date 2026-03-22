import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../shared/components/Button'
import { Card } from '../../shared/components/Card'
import { useXPStore } from '../../shared/stores/xpStore'
import { useCoinsStore } from '../../shared/stores/coinsStore'
import { useComboStore } from '../../shared/stores/comboStore'
import { useRewardAnimations } from '../../shared/components/RewardAnimation'
import { ParticleBurst } from '../../shared/components/ParticleEffects'
import { playBossHit, playBossDeath, playCorrect, playWrong } from '../../shared/utils/sounds'
import { BossSVG } from './BossSVG'
import { getBossForWeek, BOSS_QUESTIONS, shuffle, getCategoryEmoji, BOSSES } from './bossData'
import type { BossConfig } from './bossData'

export default function BossPage() {
  const [started, setStarted] = useState(false)
  const [boss] = useState<BossConfig>(() => getBossForWeek())

  // Calculate next bosses for schedule preview
  const currentBossIndex = BOSSES.findIndex((b) => b.id === boss.id)
  const nextBosses = [1, 2, 3].map((i) => BOSSES[(currentBossIndex + i) % BOSSES.length])

  if (!started) {
    return (
      <div className="max-w-3xl mx-auto text-center py-4">
        {/* Boss entrance */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12, delay: 0.2 }}
        >
          <BossSVG boss={boss} hp={boss.maxHP} shaking={false} damaged={false} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-3xl mb-1 text-theme neon-text">{boss.name}</h1>
          <p className="text-sm text-secondary font-body mb-1">{boss.title}</p>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xs font-body px-2 py-1 rounded-full neon-border" style={{ color: boss.glowColor }}>
              HP: {boss.maxHP}
            </span>
          </div>

          <p className="text-sm text-secondary mb-6 font-body">
            Beantworte Fragen aus ALLEN Faechern um den Boss zu besiegen!
          </p>

          <Button size="lg" onClick={() => setStarted(true)} className="animate-neon-pulse">
            Kampf beginnen!
          </Button>
        </motion.div>

        {/* Boss schedule */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card className="!p-4">
            <h3 className="font-title text-sm text-secondary mb-2">Naechste Bosse</h3>
            <div className="flex justify-center gap-4">
              {nextBosses.map((b, i) => (
                <div key={b.id} className="text-center">
                  <div
                    className="w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center text-xs"
                    style={{ backgroundColor: b.primaryColor, border: `2px solid ${b.glowColor}` }}
                  >
                    <svg viewBox="0 0 200 200" width="20" height="20">
                      <circle cx="100" cy="80" r="20" fill={b.secondaryColor} />
                      <ellipse cx="100" cy="130" rx="30" ry="35" fill={b.secondaryColor} />
                    </svg>
                  </div>
                  <div className="text-[10px] text-secondary font-body">KW+{i + 1}</div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

  return <BossFight boss={boss} />
}

function BossFight({ boss }: { boss: BossConfig }) {
  const questions = useState(() => shuffle(BOSS_QUESTIONS).slice(0, 12))[0]
  const [index, setIndex] = useState(0)
  const [bossHP, setBossHP] = useState(boss.maxHP)
  const [selected, setSelected] = useState<number | null>(null)
  const [shaking, setShaking] = useState(false)
  const [damaged, setDamaged] = useState(false)
  const [victory, setVictory] = useState(false)
  const [defeat, setDefeat] = useState(false)
  const [lastDamage, setLastDamage] = useState(0)
  const [particleTrigger, setParticleTrigger] = useState(0)
  const [victoryParticle, setVictoryParticle] = useState(0)

  const { addXP } = useXPStore()
  const { addCoins } = useCoinsStore()
  const { increment, reset: resetCombo, currentCombo, getMultiplier } = useComboStore()
  const { showXPGain, AnimationLayer } = useRewardAnimations()

  const damagePerHit = 10

  useEffect(() => {
    if (bossHP <= 0 && !victory) {
      setVictory(true)
      playBossDeath()
      addXP(200)
      addCoins('gold', 1)
      addCoins('silver', 5)
      showXPGain(200)
      setTimeout(() => setVictoryParticle((p) => p + 1), 300)
    }
  }, [bossHP, victory, addXP, addCoins, showXPGain])

  const handleSelect = (optIndex: number) => {
    if (selected !== null) return
    setSelected(optIndex)

    const q = questions[index % questions.length]
    const correct = optIndex === q.correctIndex

    if (correct) {
      const mult = getMultiplier()
      const damage = damagePerHit * mult
      increment()
      playCorrect()
      setBossHP((hp) => Math.max(0, hp - damage))
      setLastDamage(damage)
      setShaking(true)
      setDamaged(true)
      setParticleTrigger((p) => p + 1)
      setTimeout(() => { setShaking(false); setDamaged(false) }, 500)
      setTimeout(() => playBossHit(), 150)
    } else {
      resetCombo()
      playWrong()
    }

    setTimeout(() => {
      setSelected(null)
      setLastDamage(0)
      if (index >= questions.length - 1 && bossHP > 0) {
        setDefeat(true)
      } else {
        setIndex((i) => i + 1)
      }
    }, 1200)
  }

  const hpPercent = bossHP / boss.maxHP
  const hpColor = hpPercent > 0.5 ? '#4CAF50' : hpPercent > 0.25 ? '#FFC107' : '#E53935'

  if (victory) {
    return (
      <div className="max-w-3xl mx-auto text-center py-4">
        <AnimationLayer />
        <ParticleBurst type="confetti" count={40} originX={50} originY={30} trigger={victoryParticle} />
        <ParticleBurst type="sparkles" count={25} originX={50} originY={40} trigger={victoryParticle} />

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 10 }}
          className="mb-6"
        >
          <div
            className="text-8xl inline-block rounded-full p-6"
            style={{
              boxShadow: `0 0 40px ${boss.glowColor}60, 0 0 80px ${boss.glowColor}30`,
            }}
          >
            🏆
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl mb-2 text-theme neon-text"
        >
          SIEG!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-secondary mb-4 font-body"
        >
          {boss.name} wurde besiegt!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-6 mt-4"
        >
          <Card glow className="!p-4 text-center">
            <div className="text-2xl font-title text-primary neon-text">+200</div>
            <div className="text-xs text-secondary font-body">XP</div>
          </Card>
          <Card glow className="!p-4 text-center">
            <div className="text-2xl">🥇</div>
            <div className="text-xs text-secondary font-body">+1 Gold</div>
          </Card>
          <Card glow className="!p-4 text-center">
            <div className="text-2xl">🥈</div>
            <div className="text-xs text-secondary font-body">+5 Silber</div>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (defeat) {
    return (
      <div className="max-w-3xl mx-auto text-center py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <BossSVG boss={boss} hp={bossHP} shaking={false} damaged={false} />
        </motion.div>

        <h1 className="text-3xl mb-2 text-theme">Knapp!</h1>
        <p className="text-secondary mb-2 font-body">
          {boss.name} hatte noch <strong style={{ color: boss.glowColor }}>{bossHP} HP</strong> uebrig.
        </p>
        <p className="text-sm text-secondary mb-4 font-body">
          Trainiere weiter und versuche es naechste Woche nochmal!
        </p>
      </div>
    )
  }

  const q = questions[index % questions.length]

  return (
    <div className="max-w-3xl mx-auto">
      <AnimationLayer />
      <ParticleBurst type="fire" count={10} originX={50} originY={25} trigger={particleTrigger} />

      {/* Boss display */}
      <div className="text-center mb-4 relative">
        <BossSVG boss={boss} hp={bossHP} shaking={shaking} damaged={damaged} />

        {/* Damage number popup */}
        <AnimatePresence>
          {lastDamage > 0 && (
            <motion.div
              initial={{ opacity: 1, y: 0, scale: 1.5 }}
              animate={{ opacity: 0, y: -40, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 font-title text-3xl z-20"
              style={{ color: boss.glowColor, textShadow: `0 0 10px ${boss.glowColor}` }}
            >
              -{lastDamage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Boss name + HP */}
        <h2 className="font-title text-lg text-theme mt-2">{boss.name}</h2>

        {/* HP Bar with glow */}
        <div className="max-w-md mx-auto mt-2 relative">
          <div className="h-4 rounded-full overflow-hidden neon-border" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
            <motion.div
              className="h-full rounded-full"
              initial={{ width: '100%' }}
              animate={{ width: `${hpPercent * 100}%` }}
              transition={{ type: 'spring', damping: 15 }}
              style={{
                backgroundColor: hpColor,
                boxShadow: `0 0 10px ${hpColor}, inset 0 0 5px rgba(255,255,255,0.2)`,
              }}
            />
          </div>
          <div className="text-xs text-secondary font-body mt-1 text-center">
            HP: {bossHP}/{boss.maxHP}
          </div>
        </div>

        {/* Combo + Progress */}
        <div className="flex justify-center gap-4 mt-2 text-xs font-body">
          {currentCombo > 0 && (
            <span className="text-primary neon-text font-bold">
              {currentCombo}x Combo ({getMultiplier()}x DMG)
            </span>
          )}
          <span className="text-secondary">Frage {index + 1}/{questions.length}</span>
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="mb-4" glow>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">{getCategoryEmoji(q.category)}</span>
              <span className="text-xs text-secondary font-body">Frage {index + 1}</span>
            </div>
            <div className="font-bold text-theme font-body text-lg">{q.question}</div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            {q.options.map((opt, i) => {
              let extraClass = ''
              let borderColor = 'rgba(var(--color-primary-rgb), 0.2)'

              if (selected !== null) {
                if (i === q.correctIndex) {
                  extraClass = 'neon-glow-strong'
                  borderColor = 'var(--color-success)'
                } else if (i === selected) {
                  borderColor = 'var(--color-danger)'
                }
              }

              return (
                <motion.button
                  key={i}
                  whileTap={selected === null ? { scale: 0.95 } : {}}
                  whileHover={selected === null ? { scale: 1.02 } : {}}
                  onClick={() => handleSelect(i)}
                  disabled={selected !== null}
                  className={`glass p-5 rounded-xl font-bold text-lg cursor-pointer disabled:cursor-default transition-all font-body text-theme ${extraClass}`}
                  style={{ borderColor, borderWidth: 2, borderStyle: 'solid' }}
                >
                  {opt}
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
