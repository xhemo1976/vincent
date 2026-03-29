import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../shared/lib/AuthProvider'
import { Button } from '../../shared/components/Button'

type Mode = 'login' | 'register'

export default function LoginPage() {
  const navigate = useNavigate()
  const { signInWithEmail, signUp } = useAuth()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) return
    setLoading(true)
    setError('')
    const { error: err } = await signInWithEmail(email, password)
    setLoading(false)
    if (err) {
      setError('E-Mail oder Passwort falsch.')
    } else {
      navigate('/dashboard')
    }
  }

  const handleRegister = async () => {
    if (!email || !password) return
    if (password.length < 6) {
      setError('Passwort muss mindestens 6 Zeichen haben.')
      return
    }
    if (password !== passwordConfirm) {
      setError('Passwörter stimmen nicht überein.')
      return
    }
    setLoading(true)
    setError('')
    setSuccess('')
    const { error: err } = await signUp(email, password)
    setLoading(false)
    if (err) {
      setError(err)
    } else {
      setSuccess('Konto erstellt! Du kannst dich jetzt einloggen.')
      setMode('login')
      setPasswordConfirm('')
    }
  }

  const handleSubmit = () => {
    if (mode === 'login') handleLogin()
    else handleRegister()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
  }

  const switchMode = (newMode: Mode) => {
    setMode(newMode)
    setError('')
    setSuccess('')
  }

  return (
    <div className="min-h-dvh bg-theme flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="text-7xl mb-4">🥋</div>
          <h1 className="text-3xl text-theme">
            {mode === 'login' ? 'Willkommen zurück!' : 'Neues Konto'}
          </h1>
          <p className="text-secondary font-body mt-2">
            {mode === 'login'
              ? 'Melde dich an, um weiterzumachen.'
              : 'Erstelle dein Konto, um zu starten.'}
          </p>
        </div>

        {/* Tab-Umschalter */}
        <div className="flex mb-6 rounded-xl overflow-hidden border-2 border-primary/30">
          <button
            onClick={() => switchMode('login')}
            className={`flex-1 py-2.5 text-sm font-bold transition-colors cursor-pointer ${
              mode === 'login'
                ? 'bg-primary text-white'
                : 'bg-card text-secondary hover:text-theme'
            }`}
          >
            Einloggen
          </button>
          <button
            onClick={() => switchMode('register')}
            className={`flex-1 py-2.5 text-sm font-bold transition-colors cursor-pointer ${
              mode === 'register'
                ? 'bg-primary text-white'
                : 'bg-card text-secondary hover:text-theme'
            }`}
          >
            Registrieren
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: mode === 'login' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === 'login' ? 20 : -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="E-Mail"
              autoFocus
              className="w-full px-4 py-3 rounded-xl border-2 border-primary/30 bg-card text-theme text-sm font-body focus:border-primary focus:outline-none transition-colors"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Passwort"
              className="w-full px-4 py-3 rounded-xl border-2 border-primary/30 bg-card text-theme text-sm font-body focus:border-primary focus:outline-none transition-colors"
            />

            {mode === 'register' && (
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Passwort wiederholen"
                className="w-full px-4 py-3 rounded-xl border-2 border-primary/30 bg-card text-theme text-sm font-body focus:border-primary focus:outline-none transition-colors"
              />
            )}

            {error && (
              <p className="text-red-500 text-sm text-center font-body">{error}</p>
            )}

            {success && (
              <p className="text-green-500 text-sm text-center font-body">{success}</p>
            )}

            <Button
              onClick={handleSubmit}
              disabled={loading || !email || !password || (mode === 'register' && !passwordConfirm)}
              size="lg"
              className="w-full"
            >
              {loading
                ? 'Laden...'
                : mode === 'login'
                  ? 'Einloggen'
                  : 'Konto erstellen'}
            </Button>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
