import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../../../shared/components/Button'
import { Card } from '../../../../shared/components/Card'
import { useXPStore } from '../../../../shared/stores/xpStore'
import { useRewardAnimations } from '../../../../shared/components/RewardAnimation'
import { useLevelGating } from '../hooks/useLevelGating'
import { LockedOverlay } from './LockedOverlay'
import { LessonDetail } from './LessonDetail'
import { LESSONS } from '../data/lessons'
import type { Lesson } from '../types'

export function LessonsView({ onBack }: { onBack: () => void }) {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const { addXP } = useXPStore()
  const { showXPGain, AnimationLayer } = useRewardAnimations()
  const { isUnlocked, getRequiredXP, getRequiredRankName } = useLevelGating()

  if (selectedLesson) {
    return (
      <div className="max-w-3xl mx-auto">
        <AnimationLayer />
        <Button variant="ghost" size="sm" onClick={() => {
          addXP(10)
          showXPGain(10)
          setSelectedLesson(null)
        }}>← Zurueck</Button>
        <h2 className="text-2xl mt-4 mb-4 text-theme text-center">
          {selectedLesson.emoji} {selectedLesson.title}
        </h2>
        <LessonDetail lesson={selectedLesson} />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <AnimationLayer />
      <Button variant="ghost" size="sm" onClick={onBack}>← Zurueck</Button>
      <h2 className="text-2xl mt-4 mb-4 text-theme text-center">📖 Lektionen</h2>
      <div className="space-y-3">
        {LESSONS.map((lesson, i) => {
          const unlocked = isUnlocked(lesson.requiredLevel)
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="relative">
                <Card hoverable={unlocked} onClick={unlocked ? () => setSelectedLesson(lesson) : undefined}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lesson.emoji}</span>
                    <div>
                      <div className="font-bold text-theme font-body">{lesson.title}</div>
                      <div className="text-xs text-secondary font-body">
                        {lesson.content.length} Punkte
                        {lesson.images && lesson.images.length > 0 && ` · ${lesson.images.length} Bilder`}
                      </div>
                    </div>
                  </div>
                </Card>
                {!unlocked && (
                  <LockedOverlay
                    requiredLevel={lesson.requiredLevel}
                    requiredRankName={getRequiredRankName(lesson.requiredLevel)}
                    xpNeeded={getRequiredXP(lesson.requiredLevel)}
                  />
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
