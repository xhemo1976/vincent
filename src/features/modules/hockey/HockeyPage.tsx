import { useState } from 'react'
import { useHockeyTheme } from './hooks/useHockeyTheme'
import { HockeyMenu } from './components/HockeyMenu'
import { LessonsView } from './components/LessonsView'
import { TacticsBoard } from './components/TacticsBoard'
import { PlayAnimationView } from './components/PlayAnimation'
import { SituationMode } from './components/SituationMode'
import { CounterAnalysis } from './components/CounterAnalysis'
import { HockeyQuiz } from './components/HockeyQuiz'
import type { HockeyMode } from './types'

export default function HockeyPage() {
  const [mode, setMode] = useState<HockeyMode>('menu')
  const themeClass = useHockeyTheme()

  const goBack = () => setMode('menu')

  return (
    <div className={themeClass}>
      {mode === 'menu' && <HockeyMenu onSelect={setMode} />}
      {mode === 'lessons' && <LessonsView onBack={goBack} />}
      {mode === 'formations' && <TacticsBoard onBack={goBack} />}
      {mode === 'plays' && <PlayAnimationView onBack={goBack} />}
      {mode === 'situations' && <SituationMode onBack={goBack} />}
      {mode === 'counter' && <CounterAnalysis onBack={goBack} />}
      {mode === 'quiz' && <HockeyQuiz onBack={goBack} />}
    </div>
  )
}
