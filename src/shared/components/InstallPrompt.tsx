import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './Button'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [dismissed, setDismissed] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    const checkDismissed = sessionStorage.getItem('shin-dojo-install-dismissed')
    if (checkDismissed) {
      setDismissed(true)
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setIsInstalled(true)
    }
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setDismissed(true)
    sessionStorage.setItem('shin-dojo-install-dismissed', 'true')
  }

  if (isInstalled || dismissed || !deferredPrompt) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-4 right-4 z-[150] max-w-md mx-auto"
      >
        <div className="glass rounded-2xl p-4 neon-border shadow-2xl">
          <div className="flex items-start gap-3">
            <div className="text-3xl flex-shrink-0">🥋</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-title text-base text-theme">Shin Dojo installieren?</h3>
              <p className="text-xs text-secondary font-body mt-0.5">
                Fuer schnellen Zugriff auf deinem Homescreen - wie eine echte App!
              </p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" onClick={handleInstall}>
                  Installieren
                </Button>
                <Button size="sm" variant="ghost" onClick={handleDismiss}>
                  Spaeter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
