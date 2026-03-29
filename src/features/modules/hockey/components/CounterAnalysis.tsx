import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../../../shared/components/Button'
import { Card } from '../../../../shared/components/Card'
import { useLevelGating } from '../hooks/useLevelGating'
import { FORMATIONS } from '../data/formations'
import type { Formation } from '../types'

function MiniField({ formation, label }: { formation: Formation; label: string }) {
  return (
    <div>
      <p className="text-xs font-bold text-theme text-center mb-1 font-body">{label}: {formation.name}</p>
      <div className="relative bg-[var(--color-field,#388E3C)] rounded-xl overflow-hidden" style={{ paddingBottom: '140%' }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 140" preserveAspectRatio="none">
          <rect x="3" y="3" width="94" height="134" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="3" y1="70" x2="97" y2="70" stroke="white" strokeWidth="0.3" strokeOpacity="0.3" />
          <path d="M 30 3 A 25 20 0 0 0 70 3" fill="none" stroke="white" strokeWidth="0.3" strokeOpacity="0.3" />
          <path d="M 30 137 A 25 20 0 0 1 70 137" fill="none" stroke="white" strokeWidth="0.3" strokeOpacity="0.3" />
        </svg>
        {formation.positions.map((pos, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${pos.x}%`,
              top: `${(pos.y / 100) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary flex items-center justify-center text-white text-[5px] sm:text-[7px] font-bold shadow-sm font-body">
              {pos.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CounterAnalysis({ onBack }: { onBack: () => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { isUnlocked } = useLevelGating()

  const unlockedFormations = FORMATIONS.filter(f => isUnlocked(f.requiredLevel))
  const selected = unlockedFormations.find(f => f.id === selectedId)
  const counterFormations = selected
    ? FORMATIONS.filter(f => selected.counters.includes(f.id))
    : []
  const bestAgainstFormations = selected
    ? FORMATIONS.filter(f => selected.bestAgainst.includes(f.id))
    : []

  return (
    <div className="max-w-3xl mx-auto">
      <Button variant="ghost" size="sm" onClick={onBack}>← Zurueck</Button>
      <h2 className="text-2xl mt-4 mb-4 text-theme text-center">🔍 Gegen-Analyse</h2>

      {/* Formation picker */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {unlockedFormations.map(f => (
          <Button
            key={f.id}
            variant={selectedId === f.id ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedId(f.id)}
          >
            {f.name}
          </Button>
        ))}
      </div>

      {!selected && (
        <Card>
          <p className="text-sm text-secondary text-center font-body">
            Waehle eine Formation, um zu sehen welche Formationen dagegen wirken.
          </p>
        </Card>
      )}

      {selected && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <MiniField formation={selected} label="Deine Formation" />

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card>
              <h4 className="font-bold text-theme font-body text-sm mb-1">💪 Staerken</h4>
              {selected.strengths.map((s, i) => (
                <p key={i} className="text-xs text-theme font-body">✅ {s}</p>
              ))}
            </Card>
            <Card>
              <h4 className="font-bold text-theme font-body text-sm mb-1">⚠️ Schwaechen</h4>
              {selected.weaknesses.map((w, i) => (
                <p key={i} className="text-xs text-theme font-body">❌ {w}</p>
              ))}
            </Card>
          </div>

          {/* Counters */}
          {counterFormations.length > 0 && (
            <div>
              <h3 className="text-lg text-theme mb-2">🛡️ Wird gekontert von:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {counterFormations.map(f => (
                  <MiniField key={f.id} formation={f} label="Gegner" />
                ))}
              </div>
            </div>
          )}

          {/* Best against */}
          {bestAgainstFormations.length > 0 && (
            <div>
              <h3 className="text-lg text-theme mb-2">⚔️ Stark gegen:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bestAgainstFormations.map(f => (
                  <MiniField key={f.id} formation={f} label="Gegner" />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
