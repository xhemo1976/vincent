import { Card } from '../../../../shared/components/Card'
import { useLevelGating } from '../hooks/useLevelGating'
import { LockedOverlay } from './LockedOverlay'
import type { HockeyMode } from '../types'

interface MenuItem {
  mode: HockeyMode
  emoji: string
  title: string
  subtitle: string
  requiredLevel: number
}

const MENU_ITEMS: MenuItem[] = [
  { mode: 'lessons', emoji: '📖', title: 'Lektionen', subtitle: 'Regeln & Techniken', requiredLevel: 1 },
  { mode: 'formations', emoji: '🗺️', title: 'Formationen', subtitle: 'Aufstellungen & Staerken', requiredLevel: 1 },
  { mode: 'plays', emoji: '⚡', title: 'Spielzuege', subtitle: 'Animierte Taktiken', requiredLevel: 2 },
  { mode: 'situations', emoji: '🧠', title: 'Situationen', subtitle: 'Was wuerdest du tun?', requiredLevel: 3 },
  { mode: 'counter', emoji: '🔍', title: 'Gegen-Analyse', subtitle: 'Formationen vergleichen', requiredLevel: 4 },
  { mode: 'quiz', emoji: '❓', title: 'Hockey-Quiz', subtitle: 'Teste dein Wissen', requiredLevel: 1 },
]

interface HockeyMenuProps {
  onSelect: (mode: HockeyMode) => void
}

export function HockeyMenu({ onSelect }: HockeyMenuProps) {
  const { isUnlocked, getRequiredXP, getRequiredRankName } = useLevelGating()

  return (
    <div>
      <h1 className="text-3xl mb-2 text-theme text-center">🏑 Arena der Staerke</h1>
      <p className="text-secondary text-center mb-6 font-body">
        Lerne alles ueber Hockey!
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
        {MENU_ITEMS.map(item => {
          const unlocked = isUnlocked(item.requiredLevel)
          return (
            <div key={item.mode} className="relative">
              <Card hoverable={unlocked} onClick={unlocked ? () => onSelect(item.mode) : undefined}>
                <div className="text-4xl sm:text-5xl mb-2 text-center">{item.emoji}</div>
                <div className="font-bold text-theme font-body text-sm sm:text-base text-center">{item.title}</div>
                <div className="text-xs text-secondary font-body text-center">{item.subtitle}</div>
              </Card>
              {!unlocked && (
                <LockedOverlay
                  requiredLevel={item.requiredLevel}
                  requiredRankName={getRequiredRankName(item.requiredLevel)}
                  xpNeeded={getRequiredXP(item.requiredLevel)}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
