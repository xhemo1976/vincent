export interface LessonImage {
  src: string
  alt: string
  caption?: string
  afterPoint?: number
}

export interface Lesson {
  id: string
  title: string
  emoji: string
  content: string[]
  images?: LessonImage[]
  requiredLevel: number
}

export interface FormationPosition {
  x: number
  y: number
  label: string
}

export interface Formation {
  id: string
  name: string
  positions: FormationPosition[]
  strengths: string[]
  weaknesses: string[]
  counters: string[]
  bestAgainst: string[]
  requiredLevel: number
}

export interface Point {
  x: number
  y: number
}

export interface PlayAnnotation {
  type: 'arrow' | 'label'
  from?: Point
  to?: Point
  text?: string
}

export interface PlayKeyframe {
  time: number
  positions: Point[]
  ball: Point
  annotations?: PlayAnnotation[]
}

export interface Play {
  id: string
  name: string
  emoji: string
  description: string
  requiredLevel: number
  keyframes: PlayKeyframe[]
  durationMs: number
}

export interface TacticOption {
  text: string
  isCorrect: boolean
  explanation: string
}

export interface Situation {
  id: string
  scenario: string
  emoji: string
  options: TacticOption[]
  requiredLevel: number
  relatedPlay?: string
}

export interface QuizQuestion {
  q: string
  a: string[]
  wrong: string[]
  requiredLevel: number
}

export type HockeyMode = 'menu' | 'lessons' | 'formations' | 'plays' | 'situations' | 'counter' | 'quiz'
