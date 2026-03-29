import { Card } from '../../../../shared/components/Card'
import type { SASLetter } from '../types'

interface LetterMenuProps {
  letters: SASLetter[]
  onSelectLetter: (index: number) => void
  onStartChallenge: () => void
}

export function LetterMenu({ letters, onSelectLetter, onStartChallenge }: LetterMenuProps) {
  const uppercase = letters.filter((l) => l.char === l.char.toUpperCase())
  const lowercase = letters.filter((l) => l.char === l.char.toLowerCase())

  return (
    <div>
      <h1 className="text-3xl mb-2 text-theme text-center neon-text">Kalligraphie-Kunst</h1>
      <p className="text-secondary text-center mb-6 font-body">
        Meistere die Schulausgangsschrift! Zeichne jeden Buchstaben nach.
      </p>

      <Card
        hoverable
        glow
        onClick={onStartChallenge}
        className="mb-6 text-center"
      >
        <div className="text-4xl mb-2">🏆</div>
        <div className="font-bold text-lg text-theme font-body">Runen-Challenge</div>
        <div className="text-xs text-secondary font-body">
          Alle Buchstaben auf Zeit — 4+ Sterne = Belohnung!
        </div>
      </Card>

      <h2 className="text-xl mb-3 text-theme">Grossbuchstaben</h2>
      <div className="grid grid-cols-6 sm:grid-cols-9 gap-2 mb-6">
        {uppercase.map((letter) => {
          const globalIndex = letters.indexOf(letter)
          return (
            <Card
              key={letter.char}
              hoverable
              onClick={() => onSelectLetter(globalIndex)}
              className="!p-2 text-center"
            >
              <div className="text-2xl font-bold text-primary" style={{ fontFamily: '"Playwrite DE SAS", cursive' }}>{letter.char}</div>
            </Card>
          )
        })}
      </div>

      <h2 className="text-xl mb-3 text-theme">Kleinbuchstaben</h2>
      <div className="grid grid-cols-6 sm:grid-cols-9 gap-2">
        {lowercase.map((letter) => {
          const globalIndex = letters.indexOf(letter)
          return (
            <Card
              key={`lower-${letter.char}`}
              hoverable
              onClick={() => onSelectLetter(globalIndex)}
              className="!p-2 text-center"
            >
              <div className="text-2xl font-bold text-primary" style={{ fontFamily: '"Playwrite DE SAS", cursive' }}>{letter.char}</div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
