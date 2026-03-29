import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserStore, type ThemeColor } from '../../shared/stores/userStore'
import { useStreakStore } from '../../shared/stores/streakStore'
import { Button } from '../../shared/components/Button'

const themes: { id: ThemeColor; color: string; name: string }[] = [
  { id: 'purple', color: '#7F77DD', name: 'Lila' },
  { id: 'green', color: '#1D9E75', name: 'Grün' },
  { id: 'blue', color: '#378ADD', name: 'Blau' },
  { id: 'red', color: '#D85A30', name: 'Rot' },
]

const steps = [
  { key: 'name', title: 'Wie heißt du, junger Krieger?' },
  { key: 'theme', title: 'Wähle deine Farbe!' },
  { key: 'welcome', title: 'Willkommen im Shin Dojo!' },
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { setName, setTheme, setOnboarded, name, theme } = useUserStore()
  const { checkStreak } = useStreakStore()
  const [step, setStep] = useState(0)
  const [inputName, setInputName] = useState(name)

  const handleNext = () => {
    if (step === 0) {
      if (!inputName.trim()) return
      setName(inputName.trim())
      setStep(1)
    } else if (step === 1) {
      setStep(2)
    } else {
      setOnboarded(true)
      checkStreak()
      navigate('/dashboard')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleNext()
  }

  return (
    <div className="min-h-dvh bg-theme flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Step indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? 'w-8 bg-primary' : i < step ? 'w-4 bg-primary/60' : 'w-4 bg-primary/20'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="name"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="text-8xl mb-6"
              >
                🥋
              </motion.div>
              <h1 className="text-3xl mb-2 text-theme">{steps[0].title}</h1>
              <p className="text-secondary mb-6 font-body">
                Gib deinen Heldennamen ein, um dein Training zu beginnen!
              </p>
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Dein Name..."
                maxLength={20}
                autoFocus
                className="w-full px-4 py-3 rounded-xl border-2 border-primary/30 bg-card text-center text-lg font-bold text-theme focus:border-primary focus:outline-none transition-colors font-body"
              />
              <div className="mt-6">
                <Button onClick={handleNext} disabled={!inputName.trim()} size="lg" className="w-full">
                  Weiter →
                </Button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="theme"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="text-8xl mb-6"
              >
                🎨
              </motion.div>
              <h1 className="text-3xl mb-2 text-theme">{steps[1].title}</h1>
              <p className="text-secondary mb-8 font-body">
                Wähle ein Farbthema für dein Dojo!
              </p>
              <div className="flex justify-center gap-6 mb-8">
                {themes.map((t) => (
                  <motion.button
                    key={t.id}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setTheme(t.id)}
                    className={`w-20 h-20 rounded-full cursor-pointer transition-all ${
                      theme === t.id
                        ? 'ring-4 ring-offset-4 ring-offset-[var(--color-bg)]'
                        : ''
                    }`}
                    style={{
                      backgroundColor: t.color,
                      outlineColor: theme === t.id ? t.color : undefined,
                    }}
                    aria-label={t.name}
                  />
                ))}
              </div>
              <p className="text-sm text-secondary mb-4 font-body">
                Gewählt: <strong>{themes.find((t) => t.id === theme)?.name}</strong>
              </p>
              <Button onClick={handleNext} size="lg" className="w-full">
                Weiter →
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', delay: 0.3 }}
                className="text-9xl mb-6"
              >
                ⚔️
              </motion.div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-4xl mb-2 text-theme"
              >
                {steps[2].title}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-secondary mb-2 font-body"
              >
                Willkommen, <strong className="text-primary">{inputName}</strong>!
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-secondary mb-8 font-body"
              >
                Dein Abenteuer beginnt jetzt. Lerne, trainiere und werde stärker!
                <br />
                Wissen ist deine mächtigste Waffe. 💪
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <Button onClick={handleNext} size="lg" className="w-full">
                  Los geht's! 🚀
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
