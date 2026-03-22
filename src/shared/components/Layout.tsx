import { useEffect, useState, type ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserStore } from '../stores/userStore'
import { useXPStore } from '../stores/xpStore'
import { useStreakStore } from '../stores/streakStore'
import { useInventoryStore } from '../stores/inventoryStore'
import { useAudioStore } from '../stores/audioStore'
import { musicEngine } from '../utils/musicEngine'
import { AvatarMini } from './AvatarSVG'
import { CoinDisplay } from './CoinDisplay'
import { XPBar } from './XPBar'

function VolumeToggle() {
  const { bgmVolume, sfxVolume, bgmEnabled, sfxEnabled, setBGMVolume, setSFXVolume, toggleBGM, toggleSFX } = useAudioStore()
  const [open, setOpen] = useState(false)
  const isMuted = !bgmEnabled && !sfxEnabled

  const handleMuteAll = () => {
    if (isMuted) {
      if (!bgmEnabled) toggleBGM()
      if (!sfxEnabled) toggleSFX()
    } else {
      if (bgmEnabled) toggleBGM()
      if (sfxEnabled) toggleSFX()
      musicEngine.stop()
    }
  }

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-9 h-9 rounded-full cursor-pointer transition-all hover:neon-glow"
        style={{ minHeight: 'auto', minWidth: 'auto' }}
        aria-label="Lautstaerke"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          {isMuted ? (
            <>
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </>
          ) : (
            <>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" opacity={bgmVolume > 0.3 || sfxVolume > 0.3 ? 1 : 0.3} />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" opacity={bgmVolume > 0.6 || sfxVolume > 0.6 ? 1 : 0.3} />
            </>
          )}
        </svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -5 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-12 z-50 glass neon-border rounded-xl p-4 w-48 shadow-xl"
            >
              {/* Mute toggle */}
              <button
                onClick={handleMuteAll}
                className="w-full text-center text-sm font-body font-bold mb-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                style={{
                  minHeight: 'auto', minWidth: 'auto',
                  color: isMuted ? 'var(--color-danger)' : 'var(--color-success)',
                  backgroundColor: isMuted ? 'rgba(229,57,53,0.1)' : 'rgba(76,175,80,0.1)',
                }}
              >
                {isMuted ? 'Stumm' : 'Ton an'}
              </button>

              {/* BGM */}
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] text-secondary font-body">Musik</span>
                  <span className="text-[10px] text-secondary font-body">{Math.round(bgmVolume * 100)}%</span>
                </div>
                <input
                  type="range" min={0} max={1} step={0.05} value={bgmVolume}
                  onChange={(e) => { const v = parseFloat(e.target.value); setBGMVolume(v); musicEngine.setVolume(v) }}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-primary/20
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(var(--color-primary-rgb),0.5)]"
                  style={{ minHeight: 'auto', minWidth: 'auto' }}
                />
              </div>

              {/* SFX */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] text-secondary font-body">Effekte</span>
                  <span className="text-[10px] text-secondary font-body">{Math.round(sfxVolume * 100)}%</span>
                </div>
                <input
                  type="range" min={0} max={1} step={0.05} value={sfxVolume}
                  onChange={(e) => setSFXVolume(parseFloat(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-primary/20
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(var(--color-primary-rgb),0.5)]"
                  style={{ minHeight: 'auto', minWidth: 'auto' }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

interface LayoutProps {
  children: ReactNode
}

const pageVariants = {
  initial: { opacity: 0, y: 12, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.99 },
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { name, avatarConfig } = useUserStore()
  const { getRank } = useXPStore()
  const { currentStreak } = useStreakStore()
  const { equippedOutfit } = useInventoryStore()
  const rank = getRank()

  const { bgmEnabled } = useAudioStore()

  // Music transitions based on route
  useEffect(() => {
    if (!bgmEnabled) return
    const track = musicEngine.getTrackForRoute(location.pathname)
    if (track) {
      musicEngine.play(track)
    }
  }, [location.pathname, bgmEnabled])

  const isOnboarding = location.pathname === '/onboarding'
  if (isOnboarding) {
    return <div className="min-h-dvh animated-bg">{children}</div>
  }

  const showBackButton = location.pathname !== '/dashboard'

  return (
    <div className="min-h-dvh animated-bg flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 glass-strong border-b border-[rgba(var(--color-primary-rgb),0.15)] px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Back + Avatar + Name */}
          <div className="flex items-center gap-2 min-w-0">
            {showBackButton && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/dashboard')}
                className="text-primary text-xl p-1 cursor-pointer hover:neon-text transition-all"
                aria-label="Zurueck"
              >
                ←
              </motion.button>
            )}
            <div
              className="shrink-0 cursor-pointer rounded-full overflow-hidden neon-border"
              onClick={() => navigate('/avatar')}
            >
              <AvatarMini
                hairColor={avatarConfig.hairColor}
                hairStyle={avatarConfig.hairStyle || 'spiky'}
                skinTone={avatarConfig.skinTone || '#FFDAB9'}
                eyeStyle={avatarConfig.eyeStyle || 'sharp'}
                outfitId={equippedOutfit}
                size={38}
              />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold truncate text-theme font-body">{name}</div>
              <div className="text-xs text-secondary font-body">
                {rank.emoji} {rank.name}
              </div>
            </div>
          </div>

          {/* Center: Streak */}
          {currentStreak > 0 && (
            <div className="hidden sm:flex items-center gap-1 text-sm">
              <span>🔥</span>
              <span className="font-bold text-[var(--color-accent)] font-body">{currentStreak}</span>
            </div>
          )}

          {/* Right: Coins + XP + Audio */}
          <div className="flex items-center gap-3">
            <CoinDisplay compact />
            <div className="hidden sm:block w-24">
              <XPBar compact />
            </div>
            <VolumeToggle />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6 max-w-6xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
