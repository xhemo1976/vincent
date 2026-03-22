import { motion, AnimatePresence } from 'framer-motion'
import { useToastStore, type ToastType } from '../stores/toastStore'

const TYPE_STYLES: Record<ToastType, { border: string; bg: string }> = {
  achievement: { border: 'border-[#FFD700]', bg: 'bg-[#FFD700]/10' },
  success: { border: 'border-[var(--color-success)]', bg: 'bg-[var(--color-success)]/10' },
  info: { border: 'border-primary', bg: 'bg-primary/10' },
  warning: { border: 'border-[var(--color-warning)]', bg: 'bg-[var(--color-warning)]/10' },
}

export default function ToastLayer() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 max-w-xs w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const style = TYPE_STYLES[toast.type]
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={() => removeToast(toast.id)}
              className={`pointer-events-auto cursor-pointer glass rounded-xl p-3 border-2 ${style.border} ${style.bg} shadow-lg`}
            >
              <div className="flex items-start gap-2">
                {toast.emoji && <span className="text-2xl flex-shrink-0">{toast.emoji}</span>}
                <div className="min-w-0">
                  <div className="font-bold text-sm text-theme font-body">{toast.title}</div>
                  {toast.message && (
                    <div className="text-xs text-secondary font-body mt-0.5">{toast.message}</div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
