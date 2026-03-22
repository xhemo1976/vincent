import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  color?: string
  className?: string
}

export function ProgressBar({
  value,
  max = 100,
  label,
  color,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm text-secondary font-body">{label}</span>
          <span className="text-sm font-bold text-theme font-body">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className="w-full h-2.5 rounded-full bg-primary/20 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color || 'var(--color-primary)' }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
