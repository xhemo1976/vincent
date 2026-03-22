import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../shared/lib/AuthProvider'
import { Button } from '../../shared/components/Button'

export default function LoginPage() {
  const navigate = useNavigate()
  const { signInWithEmail } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin()
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
          <h1 className="text-3xl text-theme">Willkommen zurück!</h1>
          <p className="text-secondary font-body mt-2">Melde dich an, um weiterzumachen.</p>
        </div>

        <div className="space-y-4">
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

          {error && (
            <p className="text-red-500 text-sm text-center font-body">{error}</p>
          )}

          <Button onClick={handleLogin} disabled={loading || !email || !password} size="lg" className="w-full">
            {loading ? 'Laden...' : 'Einloggen'}
          </Button>

          <button
            onClick={() => navigate('/onboarding')}
            className="w-full text-center text-sm text-secondary font-body hover:text-primary transition-colors py-2"
          >
            Noch kein Konto? Neu starten
          </button>
        </div>
      </motion.div>
    </div>
  )
}
