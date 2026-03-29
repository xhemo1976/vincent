import { motion } from 'framer-motion'
import { Card } from '../../../../shared/components/Card'
import { HockeyImage } from './HockeyImage'
import type { Lesson } from '../types'

interface LessonDetailProps {
  lesson: Lesson
}

export function LessonDetail({ lesson }: LessonDetailProps) {
  const imageMap = new Map<number, typeof lesson.images extends (infer T)[] | undefined ? T : never>()
  lesson.images?.forEach(img => {
    if (img.afterPoint !== undefined) {
      imageMap.set(img.afterPoint, img)
    }
  })

  return (
    <div className="space-y-3">
      {lesson.content.map((text, i) => (
        <div key={i}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
          >
            <Card>
              <p className="text-sm text-theme font-body">{text}</p>
            </Card>
          </motion.div>
          {imageMap.has(i) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.12 + 0.06 }}
            >
              <HockeyImage
                src={imageMap.get(i)!.src}
                alt={imageMap.get(i)!.alt}
                caption={imageMap.get(i)!.caption}
                fallbackEmoji={lesson.emoji}
              />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  )
}
