import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../../../shared/components/Button'
import { Card } from '../../../../shared/components/Card'
import { useLevelGating } from '../hooks/useLevelGating'
import { LockedOverlay } from './LockedOverlay'
import { FORMATIONS } from '../data/formations'

export function TacticsBoard({ onBack }: { onBack: () => void }) {
  const [formationIndex, setFormationIndex] = useState(0)
  const { isUnlocked, getRequiredXP, getRequiredRankName } = useLevelGating()

  const formation = FORMATIONS[formationIndex]
  const currentUnlocked = isUnlocked(formation.requiredLevel)

  return (
    <div className="max-w-3xl mx-auto">
      <Button variant="ghost" size="sm" onClick={onBack}>← Zurueck</Button>
      <h2 className="text-2xl mt-4 mb-4 text-theme text-center">🗺️ Formationen</h2>

      {/* Formation selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {FORMATIONS.map((f, i) => {
          const unlocked = isUnlocked(f.requiredLevel)
          return (
            <Button
              key={f.id}
              variant={i === formationIndex ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFormationIndex(i)}
              disabled={!unlocked}
            >
              {unlocked ? f.name : '🔒'}
            </Button>
          )
        })}
      </div>

      {/* Field */}
      <div className="relative bg-[var(--color-field,#388E3C)] rounded-2xl overflow-hidden" style={{ paddingBottom: '140%' }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 140" preserveAspectRatio="none">
          <rect x="2" y="2" width="96" height="136" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.6" />
          <line x1="2" y1="70" x2="98" y2="70" stroke="white" strokeWidth="0.3" strokeOpacity="0.5" />
          <circle cx="50" cy="70" r="10" fill="none" stroke="white" strokeWidth="0.3" strokeOpacity="0.5" />
          <rect x="35" y="0" width="30" height="5" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.6" />
          <rect x="35" y="135" width="30" height="5" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.6" />
          <path d="M 30 2 A 25 20 0 0 0 70 2" fill="none" stroke="white" strokeWidth="0.3" strokeOpacity="0.5" />
          <path d="M 30 138 A 25 20 0 0 1 70 138" fill="none" stroke="white" strokeWidth="0.3" strokeOpacity="0.5" />
        </svg>

        {currentUnlocked && formation.positions.map((pos, i) => (
          <motion.div
            key={`${formationIndex}-${i}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.05, type: 'spring' }}
            className="absolute flex flex-col items-center"
            style={{
              left: `${pos.x}%`,
              top: `${(pos.y / 100) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-primary flex items-center justify-center text-white text-[7px] sm:text-[9px] font-bold shadow-md font-body">
              {pos.label}
            </div>
          </motion.div>
        ))}

        {!currentUnlocked && (
          <LockedOverlay
            requiredLevel={formation.requiredLevel}
            requiredRankName={getRequiredRankName(formation.requiredLevel)}
            xpNeeded={getRequiredXP(formation.requiredLevel)}
          />
        )}
      </div>

      {/* Formation info */}
      {currentUnlocked && (
        <div className="mt-4 space-y-3">
          <Card>
            <h3 className="font-bold text-theme font-body mb-2">💪 Staerken</h3>
            <ul className="space-y-1">
              {formation.strengths.map((s, i) => (
                <li key={i} className="text-sm text-theme font-body">✅ {s}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="font-bold text-theme font-body mb-2">⚠️ Schwaechen</h3>
            <ul className="space-y-1">
              {formation.weaknesses.map((w, i) => (
                <li key={i} className="text-sm text-theme font-body">❌ {w}</li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  )
}
