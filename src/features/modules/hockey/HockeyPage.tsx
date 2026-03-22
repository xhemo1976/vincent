import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'
import { useXPStore } from '../../../shared/stores/xpStore'
import { useCoinsStore } from '../../../shared/stores/coinsStore'
import { useRewardAnimations } from '../../../shared/components/RewardAnimation'

type Mode = 'menu' | 'lessons' | 'tactics' | 'quiz'

interface Lesson {
  id: string
  title: string
  emoji: string
  content: string[]
}

const LESSONS: Lesson[] = [
  {
    id: 'equipment', title: 'Ausruestung', emoji: '🏒',
    content: [
      'Jeder Spieler braucht einen Schlaeger (Stick). Er hat eine flache und eine runde Seite.',
      'Man darf nur mit der flachen Seite des Schlaegers den Ball spielen!',
      'Schienbeinschoner und Mundschutz sind Pflicht.',
      'Der Torwart traegt extra Schutzausruestung: Helm, Beinschienen, Kicker und Handschuhe.',
    ],
  },
  {
    id: 'rules', title: 'Regeln', emoji: '📋',
    content: [
      'Zwei Teams mit je 11 Spielern (10 Feldspieler + 1 Torwart).',
      'Ein Spiel hat 2 Halbzeiten a 35 Minuten.',
      'Tore zaehlen nur aus dem Schusskreis (D-Kreis).',
      'Karten: Gruen = 2 Min. Strafe, Gelb = 5 Min. Strafe, Rot = Platzverweis.',
      'Foul: Gefaehrliches Spiel, Fuss am Ball oder Behinderung.',
    ],
  },
  {
    id: 'techniques', title: 'Techniken', emoji: '🎯',
    content: [
      'Stoppen: Ball mit dem Schlaeger kontrollieren und anhalten.',
      'Push: Ball wird mit einer schiebenden Bewegung gespielt.',
      'Schlenzen (Flick): Ball wird angehoben, z.B. fuer Ecken.',
      'Dribbling: Ball eng am Schlaeger fuehren, Richtungswechsel einbauen.',
      'Indischer Dribbling: Ball schnell von links nach rechts fuehren.',
    ],
  },
  {
    id: 'positions', title: 'Positionen', emoji: '👥',
    content: [
      'Torwart (TW): Schuetzt das Tor, darf im Kreis den Ball mit dem Koerper spielen.',
      'Verteidiger (VT): Stehen hinten und verhindern Tore des Gegners.',
      'Mittelfeld (MF): Verbinden Abwehr und Angriff, laufen am meisten.',
      'Stuermer (ST): Spielen vorne und schiessen Tore.',
      'Typische Formation: 1-4-3-3 oder 1-3-3-4.',
    ],
  },
  {
    id: 'tactics', title: 'Taktik', emoji: '🧠',
    content: [
      'Kurzecke: Wird bei Foul im Kreis gegeben. Der Ball wird von der Grundlinie herausgespielt.',
      'Konter: Schneller Gegenstoss nach Ballgewinn.',
      'Pressing: Gegner unter Druck setzen, Ball frueh erobern.',
      'Ueberzahlspiel: Durch cleveres Passspiel einen freien Spieler finden.',
      'Defensiv-Block: Alle Spieler dicht vor dem eigenen Tor.',
    ],
  },
  {
    id: 'field', title: 'Spielfeld', emoji: '🏟️',
    content: [
      'Das Feld ist 91,4 m lang und 55 m breit.',
      'Vor jedem Tor gibt es einen D-Kreis (Schusskreis) mit 14,63 m Radius.',
      'Die Mittellinie teilt das Feld in zwei Haelften.',
      'Eckfahnen markieren die vier Ecken des Feldes.',
      'Der 7-Meter-Punkt (Penalty Spot) liegt direkt vor dem Tor.',
    ],
  },
  {
    id: 'shortcorner', title: 'Kurzecke', emoji: '🔄',
    content: [
      'Die Kurzecke ist eine der wichtigsten Standardsituationen.',
      'Ein Spieler spielt den Ball von der Grundlinie zu einem Mitspieler.',
      'Der Ball muss erst gestoppt werden, bevor geschossen wird.',
      'Angreifer stehen am Kreisrand, Verteidiger hinter der Torlinie.',
      'Viele Tore fallen durch gut einstudierte Kurzecken-Varianten.',
    ],
  },
  {
    id: 'fitness', title: 'Fitness', emoji: '💪',
    content: [
      'Hockey erfordert Ausdauer, Schnelligkeit und Wendigkeit.',
      'Sprints mit Richtungswechsel trainieren die Spielschnelligkeit.',
      'Koordinationsleiter-Uebungen verbessern die Fussarbeit.',
      'Rumpfstabilitaet schuetzt vor Verletzungen.',
      'Dehnen vor und nach dem Training ist wichtig.',
    ],
  },
  {
    id: 'history', title: 'Geschichte', emoji: '📜',
    content: [
      'Hockey ist eine der aeltesten Sportarten der Welt.',
      'Schon im alten Aegypten gab es Stockballspiele.',
      'Modernes Feldhockey entstand im 19. Jahrhundert in England.',
      'Seit 1908 ist Hockey olympisch (Maenner), seit 1980 auch fuer Frauen.',
      'Deutschland ist eine der staerksten Hockey-Nationen weltweit.',
    ],
  },
  {
    id: 'tournaments', title: 'Turniere', emoji: '🏆',
    content: [
      'Die wichtigsten Turniere: Olympische Spiele, WM, EM.',
      'Die Hockey-Bundesliga ist die staerkste Liga Europas.',
      'Die Hockey World League wird alle 2 Jahre ausgetragen.',
      'Champions Trophy war ein Einladungsturnier der Top-Nationen.',
      'Jugendturniere beginnen ab der U12 und gehen bis zur U21.',
    ],
  },
  {
    id: 'referee', title: 'Schiedsrichter', emoji: '🟢',
    content: [
      'Zwei Schiedsrichter leiten ein Spiel, jeder ist fuer eine Haelfte zustaendig.',
      'Pfiff = Spielunterbrechung. Ohne Pfiff geht das Spiel weiter.',
      'Gruene Karte = Verwarnung (2 Min. Pause).',
      'Gelbe Karte = Zeitstrafe (5-10 Minuten).',
      'Rote Karte = Platzverweis fuer den Rest des Spiels.',
    ],
  },
  {
    id: 'warmup', title: 'Aufwaermen', emoji: '🔥',
    content: [
      'Leichtes Joggen (5 Min.) bringt den Kreislauf in Schwung.',
      'Dynamisches Dehnen: Ausfallschritte, Beinschwingen, Hueftkreisen.',
      'Passuebungen zu zweit: Push, Stoppen, Vorhand/Rueckhand.',
      'Kleine Spielformen wie 3-gegen-3 aktivieren Kopf und Koerper.',
      'Torschuesse zum Eingrooven vor dem Spiel.',
    ],
  },
]

interface Formation {
  name: string
  positions: { x: number; y: number; label: string }[]
}

const FORMATIONS: Formation[] = [
  {
    name: '1-4-3-3',
    positions: [
      { x: 50, y: 90, label: 'TW' },
      { x: 20, y: 72, label: 'VL' }, { x: 40, y: 75, label: 'IV1' },
      { x: 60, y: 75, label: 'IV2' }, { x: 80, y: 72, label: 'VR' },
      { x: 25, y: 50, label: 'ML' }, { x: 50, y: 48, label: 'ZM' },
      { x: 75, y: 50, label: 'MR' },
      { x: 20, y: 25, label: 'SL' }, { x: 50, y: 22, label: 'MS' },
      { x: 80, y: 25, label: 'SR' },
    ],
  },
  {
    name: '1-3-3-4',
    positions: [
      { x: 50, y: 90, label: 'TW' },
      { x: 25, y: 74, label: 'VL' }, { x: 50, y: 76, label: 'IV' },
      { x: 75, y: 74, label: 'VR' },
      { x: 25, y: 52, label: 'ML' }, { x: 50, y: 50, label: 'ZM' },
      { x: 75, y: 52, label: 'MR' },
      { x: 15, y: 25, label: 'LA' }, { x: 40, y: 22, label: 'LS' },
      { x: 60, y: 22, label: 'RS' }, { x: 85, y: 25, label: 'RA' },
    ],
  },
]

export default function HockeyPage() {
  const [mode, setMode] = useState<Mode>('menu')

  if (mode === 'menu') {
    return (
      <div>
        <h1 className="text-3xl mb-2 text-theme text-center">🏑 Hockey</h1>
        <p className="text-secondary text-center mb-6 font-body">
          Lerne alles über Hockey!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <Card hoverable onClick={() => setMode('lessons')}>
            <div className="text-6xl mb-3">📖</div>
            <div className="font-bold text-theme font-body">Lektionen</div>
            <div className="text-xs text-secondary font-body">Regeln & Techniken</div>
          </Card>
          <Card hoverable onClick={() => setMode('tactics')}>
            <div className="text-6xl mb-3">🗺️</div>
            <div className="font-bold text-theme font-body">Taktik-Board</div>
            <div className="text-xs text-secondary font-body">Formationen ansehen</div>
          </Card>
          <Card hoverable onClick={() => setMode('quiz')}>
            <div className="text-6xl mb-3">❓</div>
            <div className="font-bold text-theme font-body">Hockey-Quiz</div>
            <div className="text-xs text-secondary font-body">Teste dein Wissen</div>
          </Card>
        </div>
      </div>
    )
  }

  if (mode === 'lessons') {
    return <LessonsView onBack={() => setMode('menu')} />
  }

  if (mode === 'tactics') {
    return <TacticsBoard onBack={() => setMode('menu')} />
  }

  if (mode === 'quiz') {
    return <HockeyQuiz onBack={() => setMode('menu')} />
  }

  return null
}

function LessonsView({ onBack }: { onBack: () => void }) {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const { addXP } = useXPStore()
  const { showXPGain, AnimationLayer } = useRewardAnimations()

  if (selectedLesson) {
    return (
      <div className="max-w-3xl mx-auto">
        <AnimationLayer />
        <Button variant="ghost" size="sm" onClick={() => {
          addXP(10)
          showXPGain(10)
          setSelectedLesson(null)
        }}>← Zurück</Button>
        <h2 className="text-2xl mt-4 mb-4 text-theme text-center">
          {selectedLesson.emoji} {selectedLesson.title}
        </h2>
        <div className="space-y-3">
          {selectedLesson.content.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <Card>
                <p className="text-sm text-theme font-body">{text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <AnimationLayer />
      <Button variant="ghost" size="sm" onClick={onBack}>← Zurück</Button>
      <h2 className="text-2xl mt-4 mb-4 text-theme text-center">📖 Lektionen</h2>
      <div className="space-y-3">
        {LESSONS.map((lesson, i) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card hoverable onClick={() => setSelectedLesson(lesson)}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{lesson.emoji}</span>
                <div>
                  <div className="font-bold text-theme font-body">{lesson.title}</div>
                  <div className="text-xs text-secondary font-body">
                    {lesson.content.length} Punkte
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function TacticsBoard({ onBack }: { onBack: () => void }) {
  const [formationIndex, setFormationIndex] = useState(0)
  const formation = FORMATIONS[formationIndex]

  return (
    <div className="max-w-3xl mx-auto">
      <Button variant="ghost" size="sm" onClick={onBack}>← Zurück</Button>
      <h2 className="text-2xl mt-4 mb-4 text-theme text-center">🗺️ Taktik-Board</h2>

      <div className="flex justify-center gap-2 mb-4">
        {FORMATIONS.map((f, i) => (
          <Button
            key={i}
            variant={i === formationIndex ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFormationIndex(i)}
          >
            {f.name}
          </Button>
        ))}
      </div>

      {/* Field */}
      <div className="relative bg-green-500 rounded-2xl overflow-hidden" style={{ paddingBottom: '140%' }}>
        {/* Field lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 140" preserveAspectRatio="none">
          {/* Border */}
          <rect x="2" y="2" width="96" height="136" fill="none" stroke="white" strokeWidth="0.5" />
          {/* Half line */}
          <line x1="2" y1="70" x2="98" y2="70" stroke="white" strokeWidth="0.3" />
          {/* Center circle */}
          <circle cx="50" cy="70" r="10" fill="none" stroke="white" strokeWidth="0.3" />
          {/* Goals */}
          <rect x="35" y="0" width="30" height="5" fill="none" stroke="white" strokeWidth="0.5" />
          <rect x="35" y="135" width="30" height="5" fill="none" stroke="white" strokeWidth="0.5" />
          {/* D-circles */}
          <path d="M 30 2 A 25 20 0 0 0 70 2" fill="none" stroke="white" strokeWidth="0.3" />
          <path d="M 30 138 A 25 20 0 0 1 70 138" fill="none" stroke="white" strokeWidth="0.3" />
        </svg>

        {/* Players */}
        {formation.positions.map((pos, i) => (
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
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-[9px] font-bold shadow-md font-body">
              {pos.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const HOCKEY_QUIZ_QUESTIONS = [
  { q: 'Wie viele Spieler hat ein Team auf dem Feld?', a: ['11'], wrong: ['9', '10', '12'] },
  { q: 'Was bedeutet eine gruene Karte?', a: ['2 Min. Strafe'], wrong: ['Tor', 'Platzverweis', 'Freistoss'] },
  { q: 'Tore zaehlen nur aus dem...', a: ['Schusskreis'], wrong: ['Mittelfeld', 'Strafraum', 'Seitenaus'] },
  { q: 'Wie heisst die Technik, den Ball anzuheben?', a: ['Schlenzen/Flick'], wrong: ['Push', 'Stoppen', 'Dribbling'] },
  { q: 'Was ist Indischer Dribbling?', a: ['Ball schnell hin- und herfuehren'], wrong: ['Ueber den Ball springen', 'Rueckwaerts laufen', 'Den Ball werfen'] },
  { q: 'Wie lang ist eine Halbzeit?', a: ['35 Minuten'], wrong: ['30 Minuten', '40 Minuten', '45 Minuten'] },
  { q: 'Welche Seite des Schlaegers benutzt man?', a: ['Die flache Seite'], wrong: ['Die runde Seite', 'Beide Seiten', 'Die Kante'] },
  { q: 'Was bedeutet eine rote Karte?', a: ['Platzverweis'], wrong: ['2 Min. Strafe', 'Verwarnung', 'Freistoss'] },
  { q: 'Wie gross ist der D-Kreis-Radius?', a: ['14,63 m'], wrong: ['10 m', '16 m', '20 m'] },
  { q: 'Seit wann ist Hockey olympisch (Maenner)?', a: ['1908'], wrong: ['1920', '1936', '1896'] },
  { q: 'Wie viele Schiedsrichter leiten ein Spiel?', a: ['2'], wrong: ['1', '3', '4'] },
  { q: 'Was ist ein Push?', a: ['Schiebende Ballbewegung'], wrong: ['Schlag von oben', 'Wurf', 'Kopfball'] },
  { q: 'Was ist eine Kurzecke?', a: ['Standardsituation bei Foul im Kreis'], wrong: ['Abstoss', 'Einwurf', 'Freistoss im Mittelfeld'] },
  { q: 'Was trainiert man mit der Koordinationsleiter?', a: ['Fussarbeit'], wrong: ['Armkraft', 'Koepfen', 'Torschuesse'] },
  { q: 'Wie breit ist das Spielfeld?', a: ['55 m'], wrong: ['50 m', '60 m', '45 m'] },
]

function HockeyQuiz({ onBack }: { onBack: () => void }) {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)

  const { addXP } = useXPStore()
  const { addCoins } = useCoinsStore()
  const { showXPGain, AnimationLayer } = useRewardAnimations()

  const isFinished = index >= HOCKEY_QUIZ_QUESTIONS.length

  const handleSelect = (answer: string) => {
    if (selected) return
    setSelected(answer)
    const correct = HOCKEY_QUIZ_QUESTIONS[index].a.includes(answer)
    if (correct) {
      setScore((s) => s + 1)
      addXP(15)
      addCoins('bronze', 3)
      showXPGain(15)
    }
    setTimeout(() => {
      setSelected(null)
      setIndex((i) => i + 1)
    }, 1200)
  }

  if (isFinished) {
    return (
      <div className="text-center py-12">
        <AnimationLayer />
        <div className="text-8xl mb-6">{score >= 4 ? '🏆' : '💪'}</div>
        <h2 className="text-2xl mb-2 text-theme">Hockey-Quiz fertig!</h2>
        <p className="text-xl font-bold text-primary mb-4 font-body">{score}/{HOCKEY_QUIZ_QUESTIONS.length}</p>
        <Button onClick={onBack}>Zurück</Button>
      </div>
    )
  }

  const q = HOCKEY_QUIZ_QUESTIONS[index]
  const options = [...q.a, ...q.wrong].sort(() => Math.random() - 0.5)

  return (
    <div className="max-w-3xl mx-auto">
      <AnimationLayer />
      <Button variant="ghost" size="sm" onClick={onBack}>← Zurück</Button>
      <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
        <Card className="mb-4">
          <p className="text-lg font-bold text-theme font-body">{q.q}</p>
        </Card>
        <div className="grid grid-cols-1 gap-2">
          {options.map((opt) => {
            let cls = 'bg-card border-2 border-primary/20 text-theme'
            if (selected) {
              if (q.a.includes(opt)) cls = 'bg-[var(--color-success)]/20 border-2 border-[var(--color-success)]'
              else if (opt === selected) cls = 'bg-[var(--color-danger)]/20 border-2 border-[var(--color-danger)]'
            }
            return (
              <motion.button
                key={opt}
                whileTap={!selected ? { scale: 0.97 } : {}}
                onClick={() => handleSelect(opt)}
                disabled={!!selected}
                className={`p-5 rounded-xl font-bold text-lg cursor-pointer disabled:cursor-default transition-all font-body ${cls}`}
              >
                {opt}
              </motion.button>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
