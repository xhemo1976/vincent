import { motion, AnimatePresence } from 'framer-motion'
import { useCoinsStore } from '../stores/coinsStore'

interface CoinBadgeProps {
  type: 'bronze' | 'silver' | 'gold'
  amount: number
}

const coinEmoji = {
  bronze: '🥉',
  silver: '🥈',
  gold: '🥇',
}

const coinColors = {
  bronze: 'text-[var(--color-bronze)]',
  silver: 'text-[var(--color-silver)]',
  gold: 'text-[var(--color-gold)]',
}

function CoinBadge({ type, amount }: CoinBadgeProps) {
  return (
    <div className={`flex items-center gap-1 ${coinColors[type]}`}>
      <span className="text-sm">{coinEmoji[type]}</span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={amount}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          className="text-sm font-bold font-body"
        >
          {amount}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export function CoinDisplay({ compact = false }: { compact?: boolean }) {
  const { bronze, silver, gold } = useCoinsStore()

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <CoinBadge type="gold" amount={gold} />
        <CoinBadge type="silver" amount={silver} />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <CoinBadge type="gold" amount={gold} />
      <CoinBadge type="silver" amount={silver} />
      <CoinBadge type="bronze" amount={bronze} />
    </div>
  )
}
