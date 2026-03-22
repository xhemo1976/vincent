export interface BossQuestion {
  question: string
  options: string[]
  correctIndex: number
  category: string
}

export interface BossConfig {
  id: string
  name: string
  title: string
  maxHP: number
  primaryColor: string
  secondaryColor: string
  glowColor: string
  shape: 'ninja' | 'dragon' | 'golem' | 'phantom' | 'titan'
}

export const BOSSES: BossConfig[] = [
  {
    id: 'shadow-ninja',
    name: 'Schatten-Ninja',
    title: 'Meister der Dunkelheit',
    maxHP: 60,
    primaryColor: '#2D1B4E',
    secondaryColor: '#6B3FA0',
    glowColor: '#9B8FFF',
    shape: 'ninja',
  },
  {
    id: 'fire-dragon',
    name: 'Feuer-Drache',
    title: 'Flammen-Bestie',
    maxHP: 80,
    primaryColor: '#8B2500',
    secondaryColor: '#FF6B35',
    glowColor: '#FFD700',
    shape: 'dragon',
  },
  {
    id: 'ice-golem',
    name: 'Eis-Golem',
    title: 'Frostwaechter',
    maxHP: 100,
    primaryColor: '#1A3A5C',
    secondaryColor: '#5AA3FF',
    glowColor: '#B8E6FF',
    shape: 'golem',
  },
  {
    id: 'storm-phantom',
    name: 'Sturm-Phantom',
    title: 'Herr der Blitze',
    maxHP: 90,
    primaryColor: '#1A1A2E',
    secondaryColor: '#E0E722',
    glowColor: '#FFFFAA',
    shape: 'phantom',
  },
  {
    id: 'earth-titan',
    name: 'Erd-Titan',
    title: 'Unzerstoerbarer Koloss',
    maxHP: 120,
    primaryColor: '#3D2B1F',
    secondaryColor: '#8B6914',
    glowColor: '#FFD700',
    shape: 'titan',
  },
]

export function getBossForWeek(): BossConfig {
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const weekNumber = Math.ceil(((now.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7)
  return BOSSES[weekNumber % BOSSES.length]
}

export const BOSS_QUESTIONS: BossQuestion[] = [
  // English (15)
  { question: 'Was bedeutet "butterfly"?', options: ['Butter', 'Schmetterling', 'Fliege', 'Vogel'], correctIndex: 1, category: 'english' },
  { question: 'Was bedeutet "library"?', options: ['Labor', 'Buecherei', 'Freiheit', 'Lieber'], correctIndex: 1, category: 'english' },
  { question: 'Was bedeutet "brave"?', options: ['Brav', 'Mutig', 'Breit', 'Braun'], correctIndex: 1, category: 'english' },
  { question: '"I ___ a student." - richtig?', options: ['is', 'am', 'are', 'be'], correctIndex: 1, category: 'english' },
  { question: 'Was ist das Gegenteil von "hot"?', options: ['warm', 'cool', 'cold', 'wet'], correctIndex: 2, category: 'english' },
  { question: 'Was bedeutet "kitchen"?', options: ['Kueche', 'Katze', 'Kissen', 'Kirche'], correctIndex: 0, category: 'english' },
  { question: '"She ___ two brothers."', options: ['have', 'has', 'had', 'having'], correctIndex: 1, category: 'english' },
  { question: 'Mehrzahl von "child"?', options: ['childs', 'childes', 'children', 'childern'], correctIndex: 2, category: 'english' },
  { question: 'Was bedeutet "Thursday"?', options: ['Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'], correctIndex: 2, category: 'english' },
  { question: '"The cat is ___ the table."', options: ['in', 'on', 'at', 'by'], correctIndex: 1, category: 'english' },
  { question: 'Was bedeutet "umbrella"?', options: ['Regenschirm', 'Unterhose', 'Umschlag', 'Uniform'], correctIndex: 0, category: 'english' },
  { question: 'Was ist "fourteen" als Zahl?', options: ['4', '40', '14', '44'], correctIndex: 2, category: 'english' },
  { question: 'Was bedeutet "to run"?', options: ['rennen', 'rufen', 'ruhen', 'rollen'], correctIndex: 0, category: 'english' },
  { question: '"We ___ happy."', options: ['is', 'am', 'are', 'be'], correctIndex: 2, category: 'english' },
  { question: 'Was ist das Gegenteil von "big"?', options: ['tall', 'small', 'wide', 'long'], correctIndex: 1, category: 'english' },

  // Math (15)
  { question: 'Was ist 12 x 12?', options: ['124', '144', '132', '156'], correctIndex: 1, category: 'math' },
  { question: '25% von 400?', options: ['75', '100', '125', '50'], correctIndex: 1, category: 'math' },
  { question: 'Was ist 3/5 + 1/5?', options: ['2/5', '4/5', '3/5', '1'], correctIndex: 1, category: 'math' },
  { question: 'Was ist 7 x 8?', options: ['54', '56', '58', '64'], correctIndex: 1, category: 'math' },
  { question: 'Was ist 1000 - 367?', options: ['633', '643', '533', '637'], correctIndex: 0, category: 'math' },
  { question: 'Was ist 2/3 von 90?', options: ['30', '45', '60', '75'], correctIndex: 2, category: 'math' },
  { question: 'Was ist 15 x 15?', options: ['215', '225', '235', '250'], correctIndex: 1, category: 'math' },
  { question: '50% von 250?', options: ['100', '125', '150', '175'], correctIndex: 1, category: 'math' },
  { question: 'Was ist 144 / 12?', options: ['11', '12', '13', '14'], correctIndex: 1, category: 'math' },
  { question: 'Was ist (-3) + (-7)?', options: ['-4', '-10', '4', '10'], correctIndex: 1, category: 'math' },
  { question: 'Wie viele Seiten hat ein Wuerfel?', options: ['4', '6', '8', '12'], correctIndex: 1, category: 'math' },
  { question: 'Was ist 1/4 + 1/2?', options: ['2/6', '3/4', '1/6', '2/4'], correctIndex: 1, category: 'math' },
  { question: '10% von 350?', options: ['30', '35', '40', '45'], correctIndex: 1, category: 'math' },
  { question: 'Was ist 9 x 9?', options: ['72', '81', '89', '91'], correctIndex: 1, category: 'math' },
  { question: 'Flaeche eines Quadrats (Seite=5)?', options: ['10', '20', '25', '30'], correctIndex: 2, category: 'math' },

  // Hockey (10)
  { question: 'Wie viele Spieler pro Hockey-Team?', options: ['10', '11', '12', '9'], correctIndex: 1, category: 'hockey' },
  { question: 'Was bedeutet eine rote Karte?', options: ['Tor', 'Halbzeit', 'Platzverweis', 'Ecke'], correctIndex: 2, category: 'hockey' },
  { question: 'Was ist ein "Flick" im Hockey?', options: ['Schuss', 'Pass', 'Lupfer', 'Block'], correctIndex: 2, category: 'hockey' },
  { question: 'Wie heisst der Torraum im Hockey?', options: ['Box', 'Kreis', 'Zone', 'Netz'], correctIndex: 1, category: 'hockey' },
  { question: 'Was ist ein "Push-Pass"?', options: ['Schlag', 'Schiebe-Pass', 'Kopfball', 'Wurf'], correctIndex: 1, category: 'hockey' },
  { question: 'Wie lange dauert ein Halbzeit?', options: ['30 Min', '35 Min', '40 Min', '45 Min'], correctIndex: 1, category: 'hockey' },
  { question: 'Welche Seite des Schlaegers benutzt man?', options: ['Beide', 'Nur flach', 'Nur rund', 'Egal'], correctIndex: 1, category: 'hockey' },
  { question: 'Was passiert bei einer Strafecke?', options: ['Freistoss', 'Einwurf', 'Kurzer Eckball', 'Penalty'], correctIndex: 2, category: 'hockey' },
  { question: 'Wo spielt der Torwart?', options: ['Im Kreis', 'Auf dem Feld', 'An der Seite', 'Im Tor'], correctIndex: 0, category: 'hockey' },
  { question: 'Was ist "Dribbling"?', options: ['Werfen', 'Ballfuehrung', 'Schiessen', 'Blocken'], correctIndex: 1, category: 'hockey' },

  // AI / KI (10)
  { question: 'Was speichern Computer als 0 und 1?', options: ['Farben', 'Daten', 'Strom', 'Bilder'], correctIndex: 1, category: 'ai' },
  { question: 'Was ist ein Prompt?', options: ['Kabel', 'Anweisung an KI', 'Programm', 'Bildschirm'], correctIndex: 1, category: 'ai' },
  { question: 'Wofuer steht "KI"?', options: ['Kluge Idee', 'Kuenstliche Intelligenz', 'Kleiner Input', 'Kein Internet'], correctIndex: 1, category: 'ai' },
  { question: 'Was macht eine Bilderkennung?', options: ['Malt Bilder', 'Erkennt Objekte', 'Druckt Fotos', 'Loescht Dateien'], correctIndex: 1, category: 'ai' },
  { question: 'Was ist ein Algorithmus?', options: ['Ein Virus', 'Eine Schritt-fuer-Schritt Anleitung', 'Ein Kabel', 'Ein Monitor'], correctIndex: 1, category: 'ai' },
  { question: 'Wie lernt eine KI?', options: ['Durch Schlafen', 'Aus vielen Daten', 'Durch Zufall', 'Aus dem Internet'], correctIndex: 1, category: 'ai' },
  { question: 'Was nutzt YouTube fuer Empfehlungen?', options: ['Zufall', 'Algorithmen', 'Menschen', 'Timer'], correctIndex: 1, category: 'ai' },
  { question: 'Was ist ein Sprachmodell?', options: ['Mikrofon', 'KI die Text versteht', 'Woerterbuch', 'Tastatur'], correctIndex: 1, category: 'ai' },
  { question: 'Was ist Machine Learning?', options: ['Maschinenbau', 'Maschine lernt aus Daten', 'Maschine kaputt', 'Roboter laufen'], correctIndex: 1, category: 'ai' },
  { question: 'Wo steckt KI im Handy?', options: ['Nur Kamera', 'Ueberall', 'Nirgends', 'Nur Akku'], correctIndex: 1, category: 'ai' },
]

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const CATEGORY_EMOJI: Record<string, string> = {
  english: '🇬🇧',
  math: '🔢',
  hockey: '🏑',
  ai: '🤖',
}

export function getCategoryEmoji(category: string): string {
  return CATEGORY_EMOJI[category] || '❓'
}
