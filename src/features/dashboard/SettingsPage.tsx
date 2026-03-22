import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../shared/components/Button'
import { Card } from '../../shared/components/Card'
import { useUserStore, type ThemeColor } from '../../shared/stores/userStore'
import { useXPStore } from '../../shared/stores/xpStore'
import { useCoinsStore } from '../../shared/stores/coinsStore'
import { useStreakStore } from '../../shared/stores/streakStore'
import { useAnalyticsStore } from '../../shared/stores/analyticsStore'
import { useAudioStore } from '../../shared/stores/audioStore'
import { useAuth } from '../../shared/lib/AuthProvider'
import { musicEngine } from '../../shared/utils/musicEngine'
import { playClick } from '../../shared/utils/sounds'

function AudioSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <input
      type="range"
      min={0}
      max={1}
      step={0.05}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-2 rounded-full appearance-none cursor-pointer bg-primary/20
        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer
        [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.5)]"
      style={{ minHeight: 'auto', minWidth: 'auto' }}
    />
  )
}

const themes: { id: ThemeColor; color: string; name: string }[] = [
  { id: 'purple', color: '#7F77DD', name: 'Lila' },
  { id: 'green', color: '#1D9E75', name: 'Grün' },
  { id: 'blue', color: '#378ADD', name: 'Blau' },
  { id: 'red', color: '#D85A30', name: 'Rot' },
]

export default function SettingsPage() {
  const { name, theme, darkMode, setName, setTheme, toggleDarkMode } = useUserStore()
  const { totalXP } = useXPStore()
  const { bronze, silver, gold } = useCoinsStore()
  const { currentStreak, longestStreak } = useStreakStore()
  const { getBestHour, getModuleStats, getWeeklyXP } = useAnalyticsStore()
  const { user, linkEmail } = useAuth()
  const [editName, setEditName] = useState(name)
  const [showNameEdit, setShowNameEdit] = useState(false)
  const [linkEmailVal, setLinkEmailVal] = useState('')
  const [linkPassword, setLinkPassword] = useState('')
  const [linkMsg, setLinkMsg] = useState('')
  const [linkLoading, setLinkLoading] = useState(false)
  const isAnonymous = user?.is_anonymous ?? true

  const handleLinkEmail = async () => {
    if (!linkEmailVal || !linkPassword) return
    setLinkLoading(true)
    setLinkMsg('')
    const { error } = await linkEmail(linkEmailVal, linkPassword)
    setLinkLoading(false)
    if (error) {
      setLinkMsg(error)
    } else {
      setLinkMsg('Konto gesichert! Du kannst dich jetzt auf anderen Geräten einloggen.')
    }
  }

  const bestHour = getBestHour()
  const moduleStats = getModuleStats()
  const weeklyXP = getWeeklyXP()
  const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl mb-6 text-theme text-center">Einstellungen</h1>

      {/* Name */}
      <Card className="mb-4">
        <h3 className="font-title text-lg text-theme mb-2">Heldenname</h3>
        {showNameEdit ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              maxLength={20}
              className="flex-1 px-3 py-2 rounded-lg border-2 border-primary/20 bg-theme text-theme text-sm font-body focus:border-primary focus:outline-none"
            />
            <Button size="sm" onClick={() => { setName(editName); setShowNameEdit(false) }}>
              Speichern
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="font-bold text-theme font-body">{name}</span>
            <Button variant="ghost" size="sm" onClick={() => setShowNameEdit(true)}>Ändern</Button>
          </div>
        )}
      </Card>

      {/* Dark Mode */}
      <Card className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-title text-lg text-theme">Dark Mode</h3>
            <p className="text-xs text-secondary font-body">Dunkles Anime-Design</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className={`relative w-14 h-8 rounded-full cursor-pointer transition-colors duration-300 ${
              darkMode ? 'bg-primary neon-glow' : 'bg-[var(--color-text-secondary)]/30'
            }`}
          >
            <motion.div
              animate={{ x: darkMode ? 24 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-xs"
            >
              {darkMode ? '🌙' : '☀️'}
            </motion.div>
          </motion.button>
        </div>
      </Card>

      {/* Audio */}
      <Card className="mb-4">
        <h3 className="font-title text-lg text-theme mb-3">Audio</h3>
        <div className="space-y-4">
          {/* BGM Toggle + Volume */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-body text-theme">Hintergrundmusik</span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  useAudioStore.getState().toggleBGM()
                  musicEngine.toggle()
                }}
                className={`relative w-12 h-7 rounded-full cursor-pointer transition-colors duration-300 ${
                  useAudioStore.getState().bgmEnabled ? 'bg-primary neon-glow' : 'bg-[var(--color-text-secondary)]/30'
                }`}
              >
                <motion.div
                  animate={{ x: useAudioStore.getState().bgmEnabled ? 20 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md"
                />
              </motion.button>
            </div>
            <AudioSlider
              value={useAudioStore.getState().bgmVolume}
              onChange={(v) => {
                useAudioStore.getState().setBGMVolume(v)
                musicEngine.setVolume(v)
              }}
            />
          </div>

          {/* SFX Toggle + Volume */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-body text-theme">Sound-Effekte</span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => useAudioStore.getState().toggleSFX()}
                className={`relative w-12 h-7 rounded-full cursor-pointer transition-colors duration-300 ${
                  useAudioStore.getState().sfxEnabled ? 'bg-primary neon-glow' : 'bg-[var(--color-text-secondary)]/30'
                }`}
              >
                <motion.div
                  animate={{ x: useAudioStore.getState().sfxEnabled ? 20 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md"
                />
              </motion.button>
            </div>
            <AudioSlider
              value={useAudioStore.getState().sfxVolume}
              onChange={(v) => useAudioStore.getState().setSFXVolume(v)}
            />
            <button
              onClick={() => playClick()}
              className="mt-2 text-xs text-primary font-body cursor-pointer hover:underline min-h-0 min-w-0"
            >
              Test Sound
            </button>
          </div>
        </div>
      </Card>

      {/* Theme */}
      <Card className="mb-4">
        <h3 className="font-title text-lg text-theme mb-3">Farbthema</h3>
        <div className="flex justify-center gap-4">
          {themes.map((t) => (
            <motion.button
              key={t.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(t.id)}
              className={`w-12 h-12 rounded-full cursor-pointer transition-all ${
                theme === t.id ? 'ring-4 ring-offset-2 neon-glow' : ''
              }`}
              style={{ backgroundColor: t.color }}
              aria-label={t.name}
            />
          ))}
        </div>
      </Card>

      {/* Stats */}
      <Card className="mb-4">
        <h3 className="font-title text-lg text-theme mb-3">Statistiken</h3>
        <div className="grid grid-cols-2 gap-3 text-sm font-body">
          <div className="text-center p-2 rounded-lg bg-primary/5">
            <div className="text-lg font-bold text-primary">{totalXP}</div>
            <div className="text-xs text-secondary">Gesamt XP</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-primary/5">
            <div className="text-lg font-bold text-primary">{currentStreak}</div>
            <div className="text-xs text-secondary">Aktuelle Streak</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-primary/5">
            <div className="text-lg font-bold text-primary">{longestStreak}</div>
            <div className="text-xs text-secondary">Längste Streak</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-primary/5">
            <div className="text-lg font-bold text-[var(--color-gold)]">
              {gold}🥇 {silver}🥈 {bronze}🥉
            </div>
            <div className="text-xs text-secondary">Münzen</div>
          </div>
        </div>
      </Card>

      {/* Weekly chart */}
      <Card className="mb-4">
        <h3 className="font-title text-lg text-theme mb-3">Wochenaktivität</h3>
        <div className="flex items-end justify-between gap-1 h-24">
          {weeklyXP.map((xp, i) => {
            const maxXP = Math.max(...weeklyXP, 1)
            const height = (xp / maxXP) * 100
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  className="w-full rounded-t bg-primary min-h-[2px]"
                />
                <span className="text-[10px] text-secondary font-body">{weekDays[i]}</span>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Best hour */}
      {bestHour && (
        <Card className="mb-4">
          <h3 className="font-title text-lg text-theme mb-2">Beste Lernzeit</h3>
          <p className="text-sm text-secondary font-body">
            Du lernst am besten um <strong className="text-primary">{bestHour.hour}:00 Uhr</strong>!
          </p>
        </Card>
      )}

      {/* Module stats */}
      {Object.keys(moduleStats).length > 0 && (
        <Card className="mb-4">
          <h3 className="font-title text-lg text-theme mb-2">Modul-Statistiken</h3>
          <div className="space-y-2">
            {Object.entries(moduleStats).map(([mod, stats]) => (
              <div key={mod} className="flex items-center justify-between text-sm font-body">
                <span className="text-theme">{mod}</span>
                <span className="text-secondary">{stats.sessions} Sessions, ∅ {stats.avgScore}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Link Email */}
      <Card className="mb-4">
        <h3 className="font-title text-lg text-theme mb-2">Fortschritt sichern</h3>
        {isAnonymous ? (
          <div className="space-y-3">
            <p className="text-sm text-secondary font-body">
              Verknüpfe eine E-Mail, um deinen Fortschritt auf anderen Geräten zu nutzen.
            </p>
            <input
              type="email"
              value={linkEmailVal}
              onChange={(e) => setLinkEmailVal(e.target.value)}
              placeholder="E-Mail"
              className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 bg-theme text-theme text-sm font-body focus:border-primary focus:outline-none"
            />
            <input
              type="password"
              value={linkPassword}
              onChange={(e) => setLinkPassword(e.target.value)}
              placeholder="Passwort (min. 6 Zeichen)"
              className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 bg-theme text-theme text-sm font-body focus:border-primary focus:outline-none"
            />
            {linkMsg && (
              <p className={`text-sm font-body ${linkMsg.includes('gesichert') ? 'text-green-500' : 'text-red-500'}`}>
                {linkMsg}
              </p>
            )}
            <Button
              onClick={handleLinkEmail}
              disabled={linkLoading || !linkEmailVal || linkPassword.length < 6}
              size="sm"
              className="w-full"
            >
              {linkLoading ? 'Laden...' : 'E-Mail verknüpfen'}
            </Button>
          </div>
        ) : (
          <p className="text-sm text-green-500 font-body">
            Konto gesichert mit E-Mail. Du kannst dich auf anderen Geräten einloggen.
          </p>
        )}
      </Card>

      <div className="text-center text-xs text-secondary mt-8 font-body">
        Shin Dojo v2.0 — Wissen ist Kraft! 🥋
      </div>
    </div>
  )
}
