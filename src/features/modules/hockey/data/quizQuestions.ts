import type { QuizQuestion } from '../types'

export const HOCKEY_QUIZ_QUESTIONS: QuizQuestion[] = [
  { q: 'Wie viele Spieler hat ein Team auf dem Feld?', a: ['11'], wrong: ['9', '10', '12'], requiredLevel: 1 },
  { q: 'Was bedeutet eine gruene Karte?', a: ['2 Min. Strafe'], wrong: ['Tor', 'Platzverweis', 'Freistoss'], requiredLevel: 1 },
  { q: 'Tore zaehlen nur aus dem...', a: ['Schusskreis'], wrong: ['Mittelfeld', 'Strafraum', 'Seitenaus'], requiredLevel: 1 },
  { q: 'Wie heisst die Technik, den Ball anzuheben?', a: ['Schlenzen/Flick'], wrong: ['Push', 'Stoppen', 'Dribbling'], requiredLevel: 1 },
  { q: 'Was ist Indischer Dribbling?', a: ['Ball schnell hin- und herfuehren'], wrong: ['Ueber den Ball springen', 'Rueckwaerts laufen', 'Den Ball werfen'], requiredLevel: 1 },
  { q: 'Wie lang ist eine Halbzeit?', a: ['35 Minuten'], wrong: ['30 Minuten', '40 Minuten', '45 Minuten'], requiredLevel: 1 },
  { q: 'Welche Seite des Schlaegers benutzt man?', a: ['Die flache Seite'], wrong: ['Die runde Seite', 'Beide Seiten', 'Die Kante'], requiredLevel: 1 },
  { q: 'Was bedeutet eine rote Karte?', a: ['Platzverweis'], wrong: ['2 Min. Strafe', 'Verwarnung', 'Freistoss'], requiredLevel: 1 },
  { q: 'Wie gross ist der D-Kreis-Radius?', a: ['14,63 m'], wrong: ['10 m', '16 m', '20 m'], requiredLevel: 2 },
  { q: 'Seit wann ist Hockey olympisch (Maenner)?', a: ['1908'], wrong: ['1920', '1936', '1896'], requiredLevel: 2 },
  { q: 'Wie viele Schiedsrichter leiten ein Spiel?', a: ['2'], wrong: ['1', '3', '4'], requiredLevel: 2 },
  { q: 'Was ist ein Push?', a: ['Schiebende Ballbewegung'], wrong: ['Schlag von oben', 'Wurf', 'Kopfball'], requiredLevel: 2 },
  { q: 'Was ist eine Kurzecke?', a: ['Standardsituation bei Foul im Kreis'], wrong: ['Abstoss', 'Einwurf', 'Freistoss im Mittelfeld'], requiredLevel: 3 },
  { q: 'Was trainiert man mit der Koordinationsleiter?', a: ['Fussarbeit'], wrong: ['Armkraft', 'Koepfen', 'Torschuesse'], requiredLevel: 3 },
  { q: 'Wie breit ist das Spielfeld?', a: ['55 m'], wrong: ['50 m', '60 m', '45 m'], requiredLevel: 3 },
]
