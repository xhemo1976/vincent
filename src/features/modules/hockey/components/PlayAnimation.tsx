import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '../../../../shared/components/Button'
import { Card } from '../../../../shared/components/Card'
import { usePlayAnimation } from '../hooks/usePlayAnimation'
import { PlayControls } from './PlayControls'
import { LockedOverlay } from './LockedOverlay'
import { useLevelGating } from '../hooks/useLevelGating'
import { PLAYS } from '../data/plays'
import type { Play } from '../types'

export function PlayAnimationView({ onBack }: { onBack: () => void }) {
  const [selectedPlay, setSelectedPlay] = useState<Play | null>(null)
  const { isUnlocked, getRequiredXP, getRequiredRankName } = useLevelGating()

  if (selectedPlay) {
    return <PlayDetail play={selectedPlay} onBack={() => setSelectedPlay(null)} />
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Button variant="ghost" size="sm" onClick={onBack}>← Zurueck</Button>
      <h2 className="text-2xl mt-4 mb-4 text-theme text-center">⚡ Spielzuege</h2>
      <div className="space-y-3">
        {PLAYS.map((play, i) => {
          const unlocked = isUnlocked(play.requiredLevel)
          return (
            <motion.div
              key={play.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="relative">
                <Card hoverable={unlocked} onClick={unlocked ? () => setSelectedPlay(play) : undefined}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{play.emoji}</span>
                    <div>
                      <div className="font-bold text-theme font-body">{play.name}</div>
                      <div className="text-xs text-secondary font-body">{play.description}</div>
                    </div>
                  </div>
                </Card>
                {!unlocked && (
                  <LockedOverlay
                    requiredLevel={play.requiredLevel}
                    requiredRankName={getRequiredRankName(play.requiredLevel)}
                    xpNeeded={getRequiredXP(play.requiredLevel)}
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

function PlayDetail({ play, onBack }: { play: Play; onBack: () => void }) {
  const anim = usePlayAnimation(play)

  return (
    <div className="max-w-3xl mx-auto">
      <Button variant="ghost" size="sm" onClick={onBack}>← Zurueck</Button>
      <h2 className="text-2xl mt-4 mb-2 text-theme text-center">
        {play.emoji} {play.name}
      </h2>
      <p className="text-sm text-secondary text-center mb-4 font-body">{play.description}</p>

      {/* Field */}
      <div className="relative bg-[var(--color-field,#388E3C)] rounded-2xl overflow-hidden" style={{ paddingBottom: '140%' }}>
        {/* Field lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 140" preserveAspectRatio="none">
          <rect x="2" y="2" width="96" height="136" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.6" />
          <line x1="2" y1="70" x2="98" y2="70" stroke="white" strokeWidth="0.3" strokeOpacity="0.5" />
          <circle cx="50" cy="70" r="10" fill="none" stroke="white" strokeWidth="0.3" strokeOpacity="0.5" />
          <rect x="35" y="0" width="30" height="5" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.6" />
          <rect x="35" y="135" width="30" height="5" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.6" />
          <path d="M 30 2 A 25 20 0 0 0 70 2" fill="none" stroke="white" strokeWidth="0.3" strokeOpacity="0.5" />
          <path d="M 30 138 A 25 20 0 0 1 70 138" fill="none" stroke="white" strokeWidth="0.3" strokeOpacity="0.5" />

          {/* Annotations: arrows */}
          {anim.annotations.filter(a => a.type === 'arrow' && a.from && a.to).map((a, i) => (
            <g key={`arrow-${i}`}>
              <defs>
                <marker id={`arrowhead-${i}`} markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                  <polygon points="0 0, 6 2, 0 4" fill="rgba(255,255,255,0.8)" />
                </marker>
              </defs>
              <line
                x1={a.from!.x} y1={(a.from!.y / 100) * 140}
                x2={a.to!.x} y2={(a.to!.y / 100) * 140}
                stroke="rgba(255,255,255,0.7)" strokeWidth="0.5" strokeDasharray="2,1"
                markerEnd={`url(#arrowhead-${i})`}
              />
              {a.text && (
                <text
                  x={(a.from!.x + a.to!.x) / 2}
                  y={((a.from!.y + a.to!.y) / 2 / 100) * 140 - 2}
                  textAnchor="middle" fill="white" fontSize="3" fontWeight="bold"
                >
                  {a.text}
                </text>
              )}
            </g>
          ))}

          {/* Annotations: labels */}
          {anim.annotations.filter(a => a.type === 'label' && a.from).map((a, i) => (
            <text
              key={`label-${i}`}
              x={a.from!.x}
              y={(a.from!.y / 100) * 140}
              textAnchor="middle" fill="#FFD700" fontSize="3.5" fontWeight="bold"
            >
              {a.text}
            </text>
          ))}
        </svg>

        {/* Players */}
        {anim.positions.map((pos, i) => (
          <div
            key={i}
            className="absolute flex items-center justify-center"
            style={{
              left: `${pos.x}%`,
              top: `${(pos.y / 100) * 100}%`,
              transform: 'translate(-50%, -50%)',
              transition: anim.isPlaying ? 'none' : 'all 0.3s ease',
            }}
          >
            <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-primary flex items-center justify-center text-white text-[7px] sm:text-[9px] font-bold shadow-md font-body">
              {i === 0 ? 'TW' : i}
            </div>
          </div>
        ))}

        {/* Ball */}
        <div
          className="absolute"
          style={{
            left: `${anim.ball.x}%`,
            top: `${(anim.ball.y / 100) * 100}%`,
            transform: 'translate(-50%, -50%)',
            transition: anim.isPlaying ? 'none' : 'all 0.3s ease',
          }}
        >
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white shadow-lg border border-gray-300" />
        </div>
      </div>

      <PlayControls
        isPlaying={anim.isPlaying}
        progress={anim.progress}
        onPlay={anim.play}
        onPause={anim.pause}
        onResume={anim.resume}
        onReset={anim.reset}
        onSpeedChange={anim.setSpeed}
      />
    </div>
  )
}
