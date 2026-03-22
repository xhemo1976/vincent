import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'
import { ProgressBar } from '../../../shared/components/ProgressBar'
import { useXPStore } from '../../../shared/stores/xpStore'
import { useCoinsStore } from '../../../shared/stores/coinsStore'
import { useRewardAnimations } from '../../../shared/components/RewardAnimation'

type Mode = 'menu' | 'lesson' | 'sensei'

interface AILesson {
  id: string
  title: string
  emoji: string
  slides: { text: string; image?: string }[]
  quiz: { question: string; options: string[]; correctIndex: number }
}

const LESSONS: AILesson[] = [
  {
    id: 'computer', title: 'Was ist ein Computer?', emoji: '💻',
    slides: [
      { text: 'Ein Computer ist eine Maschine, die Aufgaben nach Anweisungen erledigt — superschnell!' },
      { text: 'Er besteht aus Hardware (Teile, die du anfassen kannst) und Software (Programme).' },
      { text: 'Computer können rechnen, Texte schreiben, Bilder zeigen und vieles mehr.' },
      { text: 'Smartphones, Tablets und Spielkonsolen sind auch Computer!' },
    ],
    quiz: { question: 'Was ist Software?', options: ['Ein Teil den man anfassen kann', 'Programme und Apps', 'Ein Kabel', 'Ein Monitor'], correctIndex: 1 },
  },
  {
    id: 'program', title: 'Was ist ein Programm?', emoji: '📝',
    slides: [
      { text: 'Ein Programm ist eine Liste von Anweisungen für den Computer — wie ein Kochrezept!' },
      { text: 'Programmierer schreiben diese Anweisungen in speziellen Sprachen wie Python oder JavaScript.' },
      { text: 'Der Computer führt die Anweisungen Schritt für Schritt aus.' },
      { text: 'Jede App auf deinem Handy ist ein Programm!' },
    ],
    quiz: { question: 'Was ist ein Programm?', options: ['Ein Bild', 'Anweisungen für den Computer', 'Ein Kabel', 'Eine Tastatur'], correctIndex: 1 },
  },
  {
    id: 'data', title: 'Was sind Daten?', emoji: '📊',
    slides: [
      { text: 'Daten sind Informationen, die ein Computer speichern und verarbeiten kann.' },
      { text: 'Texte, Bilder, Videos, Zahlen — alles sind Daten!' },
      { text: 'Computer speichern Daten als Nullen und Einsen (Binärsystem).' },
      { text: 'Je mehr Daten eine KI hat, desto besser kann sie lernen.' },
    ],
    quiz: { question: 'Wie speichern Computer Daten?', options: ['Als Buchstaben', 'Als Farben', 'Als Nullen und Einsen', 'Als Bilder'], correctIndex: 2 },
  },
  {
    id: 'images', title: 'Bilderkennung', emoji: '👁️',
    slides: [
      { text: 'KI kann lernen, Bilder zu erkennen — z.B. Hunde von Katzen unterscheiden!' },
      { text: 'Dafür braucht die KI tausende Beispielbilder zum Üben.' },
      { text: 'Die KI erkennt Muster: Ohrenform, Schnauze, Fell...' },
      { text: 'Nach genug Training kann sie neue Bilder richtig einordnen!' },
    ],
    quiz: { question: 'Was braucht eine KI, um Bilder zu erkennen?', options: ['Nur ein Bild', 'Viele Beispielbilder', 'Eine Kamera', 'Einen Drucker'], correctIndex: 1 },
  },
  {
    id: 'language', title: 'Sprachmodelle', emoji: '💬',
    slides: [
      { text: 'Ein Sprachmodell ist eine KI, die Text verstehen und schreiben kann.' },
      { text: 'Es hat Milliarden von Texten gelesen und Sprachmuster gelernt.' },
      { text: 'Es sagt das wahrscheinlichste nächste Wort voraus — immer wieder.' },
      { text: 'ChatGPT und Claude sind Sprachmodelle. Du kannst mit ihnen "reden"!' },
    ],
    quiz: { question: 'Was macht ein Sprachmodell?', options: ['Bilder malen', 'Sprachen übersetzen (Text verstehen und schreiben)', 'Musik spielen', 'Roboter steuern'], correctIndex: 1 },
  },
  {
    id: 'prompting', title: 'Prompting', emoji: '✨',
    slides: [
      { text: 'Ein Prompt ist eine Frage oder Anweisung, die du einer KI gibst.' },
      { text: 'Je besser dein Prompt, desto besser die Antwort!' },
      { text: 'Tipps: Sei genau, gib Kontext, sag was du willst.' },
      { text: 'Schlecht: "Erzähl was." — Gut: "Erkläre einem 10-Jährigen, wie Wolken entstehen."' },
    ],
    quiz: { question: 'Was ist ein guter Prompt?', options: ['Möglichst kurz', 'Genau und mit Kontext', 'Nur ein Wort', 'Immer auf Englisch'], correctIndex: 1 },
  },
]

const SENSEI_RESPONSES: Record<string, string> = {
  'was ist ki': 'KI steht für Künstliche Intelligenz. Das bedeutet, ein Computer kann Dinge lernen und Aufgaben lösen, ähnlich wie ein Mensch — aber auf seine eigene Art! 🤖',
  'wie funktioniert ki': 'KI lernt aus Daten! Stell dir vor, du zeigst einem Computer 1000 Bilder von Hunden. Nach dem Training kann er neue Hundebilder erkennen. Das ist maschinelles Lernen! 🧠',
  'was ist ein prompt': 'Ein Prompt ist wie eine Frage oder ein Befehl an eine KI. Je besser du fragst, desto besser antwortet die KI. Probier es aus! ✨',
  'was ist chatgpt': 'ChatGPT ist ein Sprachmodell — eine KI, die Texte schreiben und Fragen beantworten kann. Claude (das bin quasi ich!) ist auch ein Sprachmodell! 💬',
  'hallo': 'Hallo, junger Schüler! Willkommen in der KI-Lektion. Was möchtest du über Künstliche Intelligenz erfahren? 🥋',
  'hilfe': 'Frag mich einfach etwas über KI! Zum Beispiel: "Was ist KI?", "Wie funktioniert KI?" oder "Was ist ein Prompt?" 🤔',
}

function findSenseiResponse(input: string): string {
  const lower = input.toLowerCase().trim()
  for (const [key, value] of Object.entries(SENSEI_RESPONSES)) {
    if (lower.includes(key)) return value
  }
  return 'Hmm, das ist eine gute Frage! Leider kenne ich mich damit noch nicht so gut aus. Frag mich etwas über KI, z.B. "Was ist KI?" oder "Wie funktioniert KI?" 🤔'
}

export default function AiBasicsPage() {
  const [mode, setMode] = useState<Mode>('menu')
  const [lessonIndex, setLessonIndex] = useState(0)

  if (mode === 'menu') {
    return (
      <div>
        <h1 className="text-3xl mb-2 text-theme text-center">🤖 KI-Grundlagen</h1>
        <p className="text-secondary text-center mb-6 font-body">
          Lerne, wie Künstliche Intelligenz funktioniert!
        </p>

        <h2 className="text-xl mb-3 text-theme">Lernpfad</h2>
        <div className="space-y-3 mb-8">
          {LESSONS.map((lesson, i) => (
            <Card
              key={lesson.id}
              hoverable
              onClick={() => { setLessonIndex(i); setMode('lesson') }}
            >
              <div className="flex items-center gap-3">
                <div className="text-5xl">{lesson.emoji}</div>
                <div>
                  <div className="font-bold text-theme font-body">
                    Lektion {i + 1}: {lesson.title}
                  </div>
                  <div className="text-xs text-secondary font-body">
                    {lesson.slides.length} Schritte
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card hoverable onClick={() => setMode('sensei')}>
          <div className="flex items-center gap-3">
            <div className="text-4xl">🧙</div>
            <div>
              <div className="font-bold text-theme font-body">KI-Sensei fragen</div>
              <div className="text-xs text-secondary font-body">
                Stelle dem Sensei Fragen über KI!
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (mode === 'lesson') {
    return (
      <LessonView
        lesson={LESSONS[lessonIndex]}
        onBack={() => setMode('menu')}
      />
    )
  }

  if (mode === 'sensei') {
    return <SenseiChat onBack={() => setMode('menu')} />
  }

  return null
}

function LessonView({ lesson, onBack }: { lesson: AILesson; onBack: () => void }) {
  const [slideIndex, setSlideIndex] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null)

  const { addXP } = useXPStore()
  const { addCoins } = useCoinsStore()
  const { showXPGain, AnimationLayer } = useRewardAnimations()

  const isLastSlide = slideIndex >= lesson.slides.length - 1

  const handleQuizAnswer = (index: number) => {
    if (quizAnswer !== null) return
    setQuizAnswer(index)
    if (index === lesson.quiz.correctIndex) {
      addXP(20)
      addCoins('bronze', 5)
      showXPGain(20)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <AnimationLayer />
      <Button variant="ghost" size="sm" onClick={onBack}>← Zurück</Button>

      <h2 className="text-xl mt-4 mb-2 text-theme text-center">
        {lesson.emoji} {lesson.title}
      </h2>

      <ProgressBar
        value={showQuiz ? lesson.slides.length : slideIndex}
        max={lesson.slides.length}
        className="mb-4"
      />

      <AnimatePresence mode="wait">
        {!showQuiz ? (
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
          >
            {/* Sensei avatar */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-2xl shrink-0">
                🧙
              </div>
              <Card className="flex-1">
                <p className="text-sm text-theme font-body">
                  {lesson.slides[slideIndex].text}
                </p>
              </Card>
            </div>

            <div className="flex justify-between mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSlideIndex((i) => i - 1)}
                disabled={slideIndex === 0}
              >
                ← Zurück
              </Button>
              {isLastSlide ? (
                <Button size="sm" onClick={() => setShowQuiz(true)}>
                  Quiz! 🧠
                </Button>
              ) : (
                <Button size="sm" onClick={() => setSlideIndex((i) => i + 1)}>
                  Weiter →
                </Button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="mb-4">
              <h3 className="font-bold text-theme mb-3 font-body">{lesson.quiz.question}</h3>
              <div className="space-y-2">
                {lesson.quiz.options.map((opt, i) => {
                  let cls = 'bg-primary/5 border border-primary/20 text-theme'
                  if (quizAnswer !== null) {
                    if (i === lesson.quiz.correctIndex) cls = 'bg-[var(--color-success)]/20 border border-[var(--color-success)] text-[var(--color-success)]'
                    else if (i === quizAnswer) cls = 'bg-[var(--color-danger)]/20 border border-[var(--color-danger)] text-[var(--color-danger)]'
                  }
                  return (
                    <motion.button
                      key={i}
                      whileTap={quizAnswer === null ? { scale: 0.97 } : {}}
                      onClick={() => handleQuizAnswer(i)}
                      disabled={quizAnswer !== null}
                      className={`w-full p-3 rounded-xl text-sm font-bold text-left cursor-pointer disabled:cursor-default transition-all font-body ${cls}`}
                    >
                      {opt}
                    </motion.button>
                  )
                })}
              </div>
            </Card>

            {quizAnswer !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <p className="text-lg mb-4 font-body">
                  {quizAnswer === lesson.quiz.correctIndex
                    ? '✅ Richtig! Super gemacht!'
                    : '❌ Leider falsch. Schau dir die Lektion nochmal an!'}
                </p>
                <Button onClick={onBack}>Zurück zum Menü</Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SenseiChat({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'sensei'; text: string }[]>([
    { role: 'sensei', text: 'Hallo, junger Schüler! Ich bin dein KI-Sensei. 🧙 Stelle mir eine Frage über Künstliche Intelligenz!' },
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }])

    // Simulated response (fallback since no API key)
    setTimeout(() => {
      const response = findSenseiResponse(userMsg)
      setMessages((prev) => [...prev, { role: 'sensei', text: response }])
    }, 500)
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[70vh]">
      <Button variant="ghost" size="sm" onClick={onBack}>← Zurück</Button>
      <h2 className="text-xl mt-2 mb-3 text-theme text-center">🧙 KI-Sensei</h2>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg shrink-0 bg-primary/10">
              {msg.role === 'sensei' ? '🧙' : '🥋'}
            </div>
            <div
              className={`p-3 rounded-2xl max-w-[80%] text-sm font-body ${
                msg.role === 'sensei'
                  ? 'bg-card border border-primary/20 text-theme'
                  : 'bg-primary text-white'
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Frage den Sensei..."
          className="flex-1 px-4 py-3 rounded-xl border-2 border-primary/20 bg-card text-sm text-theme focus:border-primary focus:outline-none font-body"
        />
        <Button onClick={handleSend} size="sm">Senden</Button>
      </div>

      <p className="text-xs text-secondary text-center mt-2 font-body">
        Tipp: Frage "Was ist KI?" oder "Wie funktioniert KI?"
      </p>
    </div>
  )
}
