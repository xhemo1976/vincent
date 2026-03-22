import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  hoverable?: boolean
  glow?: boolean
}

export function Card({ children, className = '', onClick, hoverable = false, glow = false }: CardProps) {
  return (
    <motion.div
      whileHover={hoverable ? { scale: 1.03, y: -2 } : {}}
      whileTap={hoverable ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`
        glass rounded-2xl p-6 neon-border
        transition-all duration-300
        ${hoverable ? 'cursor-pointer hover:neon-glow' : ''}
        ${glow ? 'neon-glow' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}

interface ModuleCardProps {
  emoji: string
  title: string
  description: string
  progress?: number
  onClick: () => void
}

export function ModuleCard({ emoji, title, description, progress = 0, onClick }: ModuleCardProps) {
  return (
    <Card hoverable onClick={onClick}>
      <div className="text-5xl mb-3">{emoji}</div>
      <h3 className="text-xl font-title text-theme">{title}</h3>
      <p className="text-base text-secondary mt-1">{description}</p>
      {progress > 0 && (
        <div className="mt-3 w-full h-2 rounded-full bg-primary/20 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary neon-glow"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}
    </Card>
  )
}
