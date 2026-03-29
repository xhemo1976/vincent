import { motion } from 'framer-motion'

interface StarRatingProps {
  stars: number // 0-5
  maxStars?: number
  size?: 'sm' | 'md' | 'lg'
}

const SIZES = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-4xl',
}

export function StarRating({ stars, maxStars = 5, size = 'md' }: StarRatingProps) {
  return (
    <div className={`flex gap-1 justify-center ${SIZES[size]}`}>
      {Array.from({ length: maxStars }, (_, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 400 }}
        >
          {i < stars ? '⭐' : '☆'}
        </motion.span>
      ))}
    </div>
  )
}
