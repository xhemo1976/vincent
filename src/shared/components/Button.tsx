import { motion } from 'framer-motion'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark hover:neon-glow-strong',
  secondary: 'glass text-primary neon-border hover:bg-primary hover:text-white hover:neon-glow',
  danger: 'bg-[var(--color-danger)] text-white hover:opacity-90',
  ghost: 'bg-transparent text-primary hover:bg-primary/10',
}

const sizes = {
  sm: 'px-4 py-2 text-base',
  md: 'px-6 py-3 text-lg',
  lg: 'px-10 py-4 text-xl',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      className={`
        font-bold rounded-xl transition-all duration-300
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      disabled={disabled}
      {...(props as any)}
    >
      {children}
    </motion.button>
  )
}
