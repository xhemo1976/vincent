import type { Play } from '../types'

export const PLAYS: Play[] = [
  {
    id: 'kurzecke',
    name: 'Kurzecke',
    emoji: '🔄',
    description: 'Die wichtigste Standardsituation: Ball von der Grundlinie, Stopp, Schuss.',
    requiredLevel: 2,
    durationMs: 5000,
    keyframes: [
      {
        time: 0,
        positions: [
          { x: 50, y: 85 }, // TW
          { x: 30, y: 60 }, { x: 40, y: 62 }, { x: 60, y: 62 }, { x: 70, y: 60 }, // Verteidiger am Kreisrand
          { x: 45, y: 55 }, { x: 55, y: 55 }, // Mittelfeld
          { x: 35, y: 48 }, { x: 50, y: 45 }, { x: 65, y: 48 }, // Stuermer am Kreisrand
          { x: 90, y: 95 }, // Einspielender Spieler an der Grundlinie
        ],
        ball: { x: 90, y: 95 },
        annotations: [{ type: 'label', text: 'Aufstellung', from: { x: 50, y: 35 }, to: { x: 50, y: 35 } }],
      },
      {
        time: 0.25,
        positions: [
          { x: 50, y: 85 },
          { x: 30, y: 58 }, { x: 40, y: 60 }, { x: 60, y: 60 }, { x: 70, y: 58 },
          { x: 45, y: 53 }, { x: 55, y: 53 },
          { x: 35, y: 46 }, { x: 50, y: 42 }, { x: 65, y: 46 },
          { x: 80, y: 90 },
        ],
        ball: { x: 50, y: 50 },
        annotations: [{ type: 'arrow', from: { x: 90, y: 95 }, to: { x: 50, y: 50 }, text: 'Einspiel' }],
      },
      {
        time: 0.5,
        positions: [
          { x: 50, y: 85 },
          { x: 30, y: 55 }, { x: 40, y: 58 }, { x: 60, y: 58 }, { x: 70, y: 55 },
          { x: 45, y: 50 }, { x: 55, y: 50 },
          { x: 35, y: 44 }, { x: 50, y: 40 }, { x: 65, y: 44 },
          { x: 75, y: 85 },
        ],
        ball: { x: 50, y: 48 },
        annotations: [{ type: 'label', text: 'Stopp!', from: { x: 50, y: 48 }, to: { x: 50, y: 48 } }],
      },
      {
        time: 0.75,
        positions: [
          { x: 50, y: 85 },
          { x: 28, y: 52 }, { x: 38, y: 55 }, { x: 62, y: 55 }, { x: 72, y: 52 },
          { x: 43, y: 47 }, { x: 57, y: 47 },
          { x: 33, y: 42 }, { x: 50, y: 38 }, { x: 67, y: 42 },
          { x: 70, y: 80 },
        ],
        ball: { x: 50, y: 40 },
        annotations: [{ type: 'arrow', from: { x: 50, y: 48 }, to: { x: 50, y: 40 }, text: 'Schuss!' }],
      },
      {
        time: 1,
        positions: [
          { x: 50, y: 85 },
          { x: 25, y: 50 }, { x: 35, y: 53 }, { x: 65, y: 53 }, { x: 75, y: 50 },
          { x: 40, y: 45 }, { x: 60, y: 45 },
          { x: 30, y: 40 }, { x: 50, y: 35 }, { x: 70, y: 40 },
          { x: 65, y: 75 },
        ],
        ball: { x: 50, y: 10 },
      },
    ],
  },
  {
    id: 'konter',
    name: 'Konter',
    emoji: '⚡',
    description: 'Schneller Gegenstoss nach Ballgewinn — Tempo ist alles.',
    requiredLevel: 2,
    durationMs: 4000,
    keyframes: [
      {
        time: 0,
        positions: [
          { x: 50, y: 90 },
          { x: 20, y: 75 }, { x: 40, y: 78 }, { x: 60, y: 78 }, { x: 80, y: 75 },
          { x: 30, y: 55 }, { x: 50, y: 53 }, { x: 70, y: 55 },
          { x: 25, y: 35 }, { x: 50, y: 30 }, { x: 75, y: 35 },
        ],
        ball: { x: 40, y: 78 },
        annotations: [{ type: 'label', text: 'Ballgewinn!', from: { x: 40, y: 72 }, to: { x: 40, y: 72 } }],
      },
      {
        time: 0.3,
        positions: [
          { x: 50, y: 88 },
          { x: 25, y: 70 }, { x: 40, y: 72 }, { x: 60, y: 72 }, { x: 75, y: 70 },
          { x: 35, y: 45 }, { x: 50, y: 42 }, { x: 65, y: 45 },
          { x: 25, y: 28 }, { x: 50, y: 22 }, { x: 75, y: 28 },
        ],
        ball: { x: 50, y: 42 },
        annotations: [{ type: 'arrow', from: { x: 40, y: 78 }, to: { x: 50, y: 42 }, text: 'Schneller Pass' }],
      },
      {
        time: 0.6,
        positions: [
          { x: 50, y: 85 },
          { x: 28, y: 65 }, { x: 42, y: 68 }, { x: 58, y: 68 }, { x: 72, y: 65 },
          { x: 35, y: 38 }, { x: 50, y: 35 }, { x: 65, y: 38 },
          { x: 20, y: 20 }, { x: 50, y: 15 }, { x: 80, y: 20 },
        ],
        ball: { x: 80, y: 20 },
        annotations: [{ type: 'arrow', from: { x: 50, y: 42 }, to: { x: 80, y: 20 }, text: 'Fluegel!' }],
      },
      {
        time: 1,
        positions: [
          { x: 50, y: 82 },
          { x: 30, y: 60 }, { x: 45, y: 63 }, { x: 55, y: 63 }, { x: 70, y: 60 },
          { x: 38, y: 32 }, { x: 50, y: 28 }, { x: 62, y: 32 },
          { x: 20, y: 15 }, { x: 50, y: 10 }, { x: 75, y: 15 },
        ],
        ball: { x: 50, y: 10 },
        annotations: [{ type: 'arrow', from: { x: 80, y: 20 }, to: { x: 50, y: 10 }, text: 'Tor!' }],
      },
    ],
  },
  {
    id: 'pressing',
    name: 'Pressing',
    emoji: '🔥',
    description: 'Gegner frueh unter Druck setzen und Fehler erzwingen.',
    requiredLevel: 2,
    durationMs: 4500,
    keyframes: [
      {
        time: 0,
        positions: [
          { x: 50, y: 88 },
          { x: 20, y: 65 }, { x: 40, y: 68 }, { x: 60, y: 68 }, { x: 80, y: 65 },
          { x: 25, y: 42 }, { x: 50, y: 40 }, { x: 75, y: 42 },
          { x: 20, y: 20 }, { x: 50, y: 18 }, { x: 80, y: 20 },
        ],
        ball: { x: 50, y: 10 },
        annotations: [{ type: 'label', text: 'Gegner hat Ball', from: { x: 50, y: 5 }, to: { x: 50, y: 5 } }],
      },
      {
        time: 0.35,
        positions: [
          { x: 50, y: 80 },
          { x: 22, y: 55 }, { x: 42, y: 58 }, { x: 58, y: 58 }, { x: 78, y: 55 },
          { x: 28, y: 32 }, { x: 50, y: 28 }, { x: 72, y: 32 },
          { x: 25, y: 15 }, { x: 50, y: 12 }, { x: 75, y: 15 },
        ],
        ball: { x: 50, y: 10 },
        annotations: [
          { type: 'arrow', from: { x: 25, y: 20 }, to: { x: 25, y: 15 }, text: 'Druck!' },
          { type: 'arrow', from: { x: 50, y: 18 }, to: { x: 50, y: 12 } },
          { type: 'arrow', from: { x: 75, y: 20 }, to: { x: 75, y: 15 } },
        ],
      },
      {
        time: 0.65,
        positions: [
          { x: 50, y: 72 },
          { x: 25, y: 48 }, { x: 42, y: 50 }, { x: 58, y: 50 }, { x: 75, y: 48 },
          { x: 30, y: 25 }, { x: 50, y: 20 }, { x: 70, y: 25 },
          { x: 28, y: 12 }, { x: 50, y: 8 }, { x: 72, y: 12 },
        ],
        ball: { x: 45, y: 12 },
        annotations: [{ type: 'label', text: 'Ballgewinn!', from: { x: 45, y: 6 }, to: { x: 45, y: 6 } }],
      },
      {
        time: 1,
        positions: [
          { x: 50, y: 70 },
          { x: 25, y: 45 }, { x: 42, y: 48 }, { x: 58, y: 48 }, { x: 75, y: 45 },
          { x: 30, y: 22 }, { x: 50, y: 18 }, { x: 70, y: 22 },
          { x: 25, y: 10 }, { x: 50, y: 5 }, { x: 75, y: 10 },
        ],
        ball: { x: 50, y: 5 },
      },
    ],
  },
  {
    id: 'ueberzahl',
    name: 'Ueberzahlspiel',
    emoji: '🎯',
    description: 'Durch cleveres Passspiel Ueberzahl auf einer Seite herstellen.',
    requiredLevel: 3,
    durationMs: 5000,
    keyframes: [
      {
        time: 0,
        positions: [
          { x: 50, y: 90 },
          { x: 20, y: 72 }, { x: 40, y: 75 }, { x: 60, y: 75 }, { x: 80, y: 72 },
          { x: 25, y: 50 }, { x: 50, y: 48 }, { x: 75, y: 50 },
          { x: 20, y: 25 }, { x: 50, y: 22 }, { x: 80, y: 25 },
        ],
        ball: { x: 25, y: 50 },
        annotations: [{ type: 'label', text: 'Aufbau links', from: { x: 15, y: 45 }, to: { x: 15, y: 45 } }],
      },
      {
        time: 0.3,
        positions: [
          { x: 50, y: 90 },
          { x: 20, y: 72 }, { x: 40, y: 75 }, { x: 60, y: 75 }, { x: 80, y: 72 },
          { x: 22, y: 42 }, { x: 35, y: 40 }, { x: 75, y: 50 },
          { x: 18, y: 22 }, { x: 30, y: 20 }, { x: 80, y: 25 },
        ],
        ball: { x: 22, y: 42 },
        annotations: [{ type: 'arrow', from: { x: 50, y: 48 }, to: { x: 35, y: 40 }, text: 'Verschieben' }],
      },
      {
        time: 0.6,
        positions: [
          { x: 50, y: 90 },
          { x: 20, y: 72 }, { x: 40, y: 75 }, { x: 60, y: 75 }, { x: 80, y: 72 },
          { x: 20, y: 35 }, { x: 30, y: 32 }, { x: 75, y: 50 },
          { x: 15, y: 18 }, { x: 28, y: 15 }, { x: 80, y: 25 },
        ],
        ball: { x: 15, y: 18 },
        annotations: [{ type: 'label', text: '3 vs 2!', from: { x: 10, y: 12 }, to: { x: 10, y: 12 } }],
      },
      {
        time: 1,
        positions: [
          { x: 50, y: 90 },
          { x: 20, y: 72 }, { x: 40, y: 75 }, { x: 60, y: 75 }, { x: 80, y: 72 },
          { x: 18, y: 30 }, { x: 28, y: 28 }, { x: 75, y: 50 },
          { x: 12, y: 15 }, { x: 25, y: 12 }, { x: 80, y: 25 },
        ],
        ball: { x: 25, y: 10 },
        annotations: [{ type: 'arrow', from: { x: 15, y: 18 }, to: { x: 25, y: 10 }, text: 'Tor!' }],
      },
    ],
  },
  {
    id: 'defensivblock',
    name: 'Defensiv-Block',
    emoji: '🛡️',
    description: 'Alle Spieler formieren sich dicht vor dem eigenen Tor.',
    requiredLevel: 3,
    durationMs: 4000,
    keyframes: [
      {
        time: 0,
        positions: [
          { x: 50, y: 90 },
          { x: 20, y: 72 }, { x: 40, y: 75 }, { x: 60, y: 75 }, { x: 80, y: 72 },
          { x: 25, y: 50 }, { x: 50, y: 48 }, { x: 75, y: 50 },
          { x: 20, y: 25 }, { x: 50, y: 22 }, { x: 80, y: 25 },
        ],
        ball: { x: 50, y: 10 },
        annotations: [{ type: 'label', text: 'Gegner greift an', from: { x: 50, y: 5 }, to: { x: 50, y: 5 } }],
      },
      {
        time: 0.5,
        positions: [
          { x: 50, y: 90 },
          { x: 25, y: 78 }, { x: 42, y: 80 }, { x: 58, y: 80 }, { x: 75, y: 78 },
          { x: 28, y: 68 }, { x: 50, y: 65 }, { x: 72, y: 68 },
          { x: 30, y: 58 }, { x: 50, y: 55 }, { x: 70, y: 58 },
        ],
        ball: { x: 50, y: 30 },
        annotations: [
          { type: 'arrow', from: { x: 20, y: 25 }, to: { x: 30, y: 58 }, text: 'Zurueck!' },
          { type: 'arrow', from: { x: 80, y: 25 }, to: { x: 70, y: 58 } },
        ],
      },
      {
        time: 1,
        positions: [
          { x: 50, y: 92 },
          { x: 25, y: 82 }, { x: 42, y: 84 }, { x: 58, y: 84 }, { x: 75, y: 82 },
          { x: 30, y: 74 }, { x: 50, y: 72 }, { x: 70, y: 74 },
          { x: 35, y: 65 }, { x: 50, y: 62 }, { x: 65, y: 65 },
        ],
        ball: { x: 50, y: 45 },
        annotations: [{ type: 'label', text: 'Block steht!', from: { x: 50, y: 58 }, to: { x: 50, y: 58 } }],
      },
    ],
  },
  {
    id: 'spielaufbau',
    name: 'Spielaufbau',
    emoji: '🔨',
    description: 'Kontrollierter Aufbau aus der eigenen Haelfte.',
    requiredLevel: 3,
    durationMs: 5000,
    keyframes: [
      {
        time: 0,
        positions: [
          { x: 50, y: 92 },
          { x: 20, y: 78 }, { x: 40, y: 80 }, { x: 60, y: 80 }, { x: 80, y: 78 },
          { x: 25, y: 55 }, { x: 50, y: 52 }, { x: 75, y: 55 },
          { x: 20, y: 30 }, { x: 50, y: 25 }, { x: 80, y: 30 },
        ],
        ball: { x: 50, y: 92 },
        annotations: [{ type: 'label', text: 'Abstoss TW', from: { x: 50, y: 97 }, to: { x: 50, y: 97 } }],
      },
      {
        time: 0.25,
        positions: [
          { x: 50, y: 92 },
          { x: 15, y: 72 }, { x: 40, y: 76 }, { x: 60, y: 76 }, { x: 85, y: 72 },
          { x: 25, y: 52 }, { x: 50, y: 50 }, { x: 75, y: 52 },
          { x: 20, y: 28 }, { x: 50, y: 23 }, { x: 80, y: 28 },
        ],
        ball: { x: 40, y: 76 },
        annotations: [{ type: 'arrow', from: { x: 50, y: 92 }, to: { x: 40, y: 76 }, text: 'Kurzer Pass' }],
      },
      {
        time: 0.5,
        positions: [
          { x: 50, y: 90 },
          { x: 15, y: 68 }, { x: 35, y: 70 }, { x: 55, y: 70 }, { x: 85, y: 68 },
          { x: 20, y: 48 }, { x: 45, y: 45 }, { x: 70, y: 48 },
          { x: 18, y: 25 }, { x: 50, y: 20 }, { x: 82, y: 25 },
        ],
        ball: { x: 45, y: 45 },
        annotations: [{ type: 'arrow', from: { x: 40, y: 76 }, to: { x: 45, y: 45 }, text: 'Mittelfeld' }],
      },
      {
        time: 0.75,
        positions: [
          { x: 50, y: 88 },
          { x: 18, y: 62 }, { x: 38, y: 65 }, { x: 58, y: 65 }, { x: 82, y: 62 },
          { x: 22, y: 42 }, { x: 45, y: 38 }, { x: 68, y: 42 },
          { x: 15, y: 20 }, { x: 50, y: 15 }, { x: 85, y: 20 },
        ],
        ball: { x: 85, y: 20 },
        annotations: [{ type: 'arrow', from: { x: 45, y: 45 }, to: { x: 85, y: 20 }, text: 'Seitenwechsel' }],
      },
      {
        time: 1,
        positions: [
          { x: 50, y: 85 },
          { x: 20, y: 58 }, { x: 40, y: 62 }, { x: 60, y: 62 }, { x: 80, y: 58 },
          { x: 25, y: 38 }, { x: 48, y: 35 }, { x: 70, y: 38 },
          { x: 18, y: 18 }, { x: 50, y: 12 }, { x: 82, y: 18 },
        ],
        ball: { x: 50, y: 12 },
        annotations: [{ type: 'arrow', from: { x: 85, y: 20 }, to: { x: 50, y: 12 }, text: 'Flanke!' }],
      },
    ],
  },
  {
    id: 'eckenabwehr',
    name: 'Eckenabwehr',
    emoji: '🧱',
    description: 'Verteidigung einer Kurzecke des Gegners.',
    requiredLevel: 3,
    durationMs: 4000,
    keyframes: [
      {
        time: 0,
        positions: [
          { x: 50, y: 95 },
          { x: 30, y: 97 }, { x: 40, y: 97 }, { x: 50, y: 97 }, { x: 60, y: 97 },
          { x: 70, y: 97 }, // 5 hinter der Torlinie
          { x: 50, y: 60 }, { x: 60, y: 60 }, // Restliche Spieler weiter vorn
          { x: 40, y: 55 }, { x: 50, y: 50 }, { x: 60, y: 50 },
        ],
        ball: { x: 90, y: 95 },
        annotations: [{ type: 'label', text: 'Gegner spielt ein', from: { x: 85, y: 90 }, to: { x: 85, y: 90 } }],
      },
      {
        time: 0.35,
        positions: [
          { x: 50, y: 92 },
          { x: 25, y: 85 }, { x: 38, y: 83 }, { x: 50, y: 82 }, { x: 62, y: 83 },
          { x: 75, y: 85 },
          { x: 50, y: 60 }, { x: 60, y: 58 },
          { x: 40, y: 55 }, { x: 50, y: 50 }, { x: 60, y: 50 },
        ],
        ball: { x: 50, y: 65 },
        annotations: [
          { type: 'arrow', from: { x: 30, y: 97 }, to: { x: 25, y: 85 }, text: 'Rauslaufen!' },
          { type: 'arrow', from: { x: 70, y: 97 }, to: { x: 75, y: 85 } },
        ],
      },
      {
        time: 0.7,
        positions: [
          { x: 50, y: 90 },
          { x: 22, y: 80 }, { x: 35, y: 78 }, { x: 50, y: 76 }, { x: 65, y: 78 },
          { x: 78, y: 80 },
          { x: 48, y: 58 }, { x: 58, y: 56 },
          { x: 38, y: 52 }, { x: 50, y: 48 }, { x: 62, y: 52 },
        ],
        ball: { x: 35, y: 78 },
        annotations: [{ type: 'label', text: 'Block!', from: { x: 35, y: 73 }, to: { x: 35, y: 73 } }],
      },
      {
        time: 1,
        positions: [
          { x: 50, y: 88 },
          { x: 20, y: 75 }, { x: 35, y: 73 }, { x: 50, y: 72 }, { x: 65, y: 73 },
          { x: 80, y: 75 },
          { x: 45, y: 55 }, { x: 55, y: 53 },
          { x: 35, y: 48 }, { x: 50, y: 45 }, { x: 65, y: 48 },
        ],
        ball: { x: 20, y: 75 },
        annotations: [{ type: 'label', text: 'Geklaert!', from: { x: 15, y: 70 }, to: { x: 15, y: 70 } }],
      },
    ],
  },
  {
    id: 'manndeckung',
    name: 'Manndeckung',
    emoji: '👤',
    description: 'Jeder Verteidiger bewacht einen bestimmten Gegenspieler.',
    requiredLevel: 4,
    durationMs: 4500,
    keyframes: [
      {
        time: 0,
        positions: [
          { x: 50, y: 90 },
          { x: 22, y: 72 }, { x: 42, y: 75 }, { x: 58, y: 75 }, { x: 78, y: 72 },
          { x: 28, y: 50 }, { x: 50, y: 48 }, { x: 72, y: 50 },
          { x: 22, y: 28 }, { x: 50, y: 25 }, { x: 78, y: 28 },
        ],
        ball: { x: 50, y: 10 },
        annotations: [{ type: 'label', text: 'Zuordnung', from: { x: 50, y: 5 }, to: { x: 50, y: 5 } }],
      },
      {
        time: 0.35,
        positions: [
          { x: 50, y: 90 },
          { x: 18, y: 68 }, { x: 38, y: 70 }, { x: 62, y: 70 }, { x: 82, y: 68 },
          { x: 25, y: 45 }, { x: 48, y: 42 }, { x: 75, y: 45 },
          { x: 20, y: 24 }, { x: 52, y: 22 }, { x: 80, y: 24 },
        ],
        ball: { x: 20, y: 22 },
        annotations: [
          { type: 'arrow', from: { x: 22, y: 28 }, to: { x: 20, y: 24 }, text: 'Dranbleiben!' },
        ],
      },
      {
        time: 0.7,
        positions: [
          { x: 50, y: 90 },
          { x: 32, y: 65 }, { x: 45, y: 68 }, { x: 55, y: 68 }, { x: 68, y: 65 },
          { x: 35, y: 42 }, { x: 52, y: 40 }, { x: 65, y: 42 },
          { x: 30, y: 22 }, { x: 55, y: 20 }, { x: 70, y: 22 },
        ],
        ball: { x: 55, y: 35 },
        annotations: [
          { type: 'arrow', from: { x: 48, y: 42 }, to: { x: 52, y: 40 }, text: 'Enge Deckung' },
        ],
      },
      {
        time: 1,
        positions: [
          { x: 50, y: 88 },
          { x: 28, y: 62 }, { x: 42, y: 65 }, { x: 58, y: 65 }, { x: 72, y: 62 },
          { x: 32, y: 40 }, { x: 50, y: 38 }, { x: 68, y: 40 },
          { x: 28, y: 20 }, { x: 52, y: 18 }, { x: 72, y: 20 },
        ],
        ball: { x: 32, y: 40 },
        annotations: [{ type: 'label', text: 'Ballgewinn!', from: { x: 32, y: 35 }, to: { x: 32, y: 35 } }],
      },
    ],
  },
  {
    id: 'zonenverteidigung',
    name: 'Zonenverteidigung',
    emoji: '📐',
    description: 'Jeder Spieler deckt eine Zone statt einen Gegenspieler.',
    requiredLevel: 4,
    durationMs: 4500,
    keyframes: [
      {
        time: 0,
        positions: [
          { x: 50, y: 90 },
          { x: 20, y: 75 }, { x: 40, y: 78 }, { x: 60, y: 78 }, { x: 80, y: 75 },
          { x: 25, y: 55 }, { x: 50, y: 52 }, { x: 75, y: 55 },
          { x: 25, y: 35 }, { x: 50, y: 32 }, { x: 75, y: 35 },
        ],
        ball: { x: 20, y: 15 },
        annotations: [{ type: 'label', text: 'Zonen besetzen', from: { x: 50, y: 5 }, to: { x: 50, y: 5 } }],
      },
      {
        time: 0.4,
        positions: [
          { x: 50, y: 90 },
          { x: 18, y: 72 }, { x: 38, y: 75 }, { x: 58, y: 75 }, { x: 78, y: 72 },
          { x: 22, y: 50 }, { x: 48, y: 48 }, { x: 72, y: 50 },
          { x: 22, y: 30 }, { x: 48, y: 28 }, { x: 72, y: 30 },
        ],
        ball: { x: 15, y: 28 },
        annotations: [{ type: 'label', text: 'Links verschieben', from: { x: 10, y: 22 }, to: { x: 10, y: 22 } }],
      },
      {
        time: 0.7,
        positions: [
          { x: 50, y: 90 },
          { x: 22, y: 72 }, { x: 42, y: 75 }, { x: 62, y: 75 }, { x: 82, y: 72 },
          { x: 28, y: 50 }, { x: 52, y: 48 }, { x: 78, y: 50 },
          { x: 28, y: 30 }, { x: 52, y: 28 }, { x: 78, y: 30 },
        ],
        ball: { x: 85, y: 28 },
        annotations: [{ type: 'label', text: 'Rechts verschieben', from: { x: 90, y: 22 }, to: { x: 90, y: 22 } }],
      },
      {
        time: 1,
        positions: [
          { x: 50, y: 90 },
          { x: 20, y: 72 }, { x: 40, y: 75 }, { x: 60, y: 75 }, { x: 80, y: 72 },
          { x: 25, y: 50 }, { x: 50, y: 48 }, { x: 75, y: 50 },
          { x: 25, y: 30 }, { x: 50, y: 28 }, { x: 75, y: 30 },
        ],
        ball: { x: 50, y: 48 },
        annotations: [{ type: 'label', text: 'Abgefangen!', from: { x: 50, y: 42 }, to: { x: 50, y: 42 } }],
      },
    ],
  },
  {
    id: 'torschuss',
    name: 'Torschuss-Varianten',
    emoji: '⚽',
    description: 'Verschiedene Wege zum Torabschluss aus dem Schusskreis.',
    requiredLevel: 4,
    durationMs: 5000,
    keyframes: [
      {
        time: 0,
        positions: [
          { x: 50, y: 88 },
          { x: 20, y: 70 }, { x: 40, y: 72 }, { x: 60, y: 72 }, { x: 80, y: 70 },
          { x: 30, y: 50 }, { x: 50, y: 48 }, { x: 70, y: 50 },
          { x: 20, y: 30 }, { x: 50, y: 25 }, { x: 80, y: 30 },
        ],
        ball: { x: 50, y: 48 },
        annotations: [{ type: 'label', text: 'Aufbau im Mittelfeld', from: { x: 50, y: 42 }, to: { x: 50, y: 42 } }],
      },
      {
        time: 0.3,
        positions: [
          { x: 50, y: 88 },
          { x: 22, y: 68 }, { x: 42, y: 70 }, { x: 58, y: 70 }, { x: 78, y: 68 },
          { x: 28, y: 45 }, { x: 48, y: 42 }, { x: 68, y: 45 },
          { x: 15, y: 25 }, { x: 50, y: 20 }, { x: 85, y: 25 },
        ],
        ball: { x: 15, y: 25 },
        annotations: [{ type: 'arrow', from: { x: 50, y: 48 }, to: { x: 15, y: 25 }, text: 'Fluegel links' }],
      },
      {
        time: 0.55,
        positions: [
          { x: 50, y: 88 },
          { x: 22, y: 65 }, { x: 42, y: 68 }, { x: 58, y: 68 }, { x: 78, y: 65 },
          { x: 25, y: 40 }, { x: 45, y: 38 }, { x: 65, y: 40 },
          { x: 12, y: 20 }, { x: 50, y: 15 }, { x: 85, y: 20 },
        ],
        ball: { x: 12, y: 15 },
        annotations: [{ type: 'arrow', from: { x: 15, y: 25 }, to: { x: 12, y: 15 }, text: 'In den Kreis' }],
      },
      {
        time: 0.8,
        positions: [
          { x: 50, y: 88 },
          { x: 22, y: 62 }, { x: 42, y: 65 }, { x: 58, y: 65 }, { x: 78, y: 62 },
          { x: 25, y: 38 }, { x: 42, y: 35 }, { x: 62, y: 38 },
          { x: 10, y: 18 }, { x: 50, y: 12 }, { x: 85, y: 18 },
        ],
        ball: { x: 50, y: 12 },
        annotations: [{ type: 'arrow', from: { x: 12, y: 15 }, to: { x: 50, y: 12 }, text: 'Querpass!' }],
      },
      {
        time: 1,
        positions: [
          { x: 50, y: 88 },
          { x: 22, y: 60 }, { x: 42, y: 63 }, { x: 58, y: 63 }, { x: 78, y: 60 },
          { x: 25, y: 35 }, { x: 40, y: 32 }, { x: 60, y: 35 },
          { x: 10, y: 16 }, { x: 50, y: 8 }, { x: 85, y: 16 },
        ],
        ball: { x: 50, y: 3 },
        annotations: [{ type: 'label', text: 'TOR!', from: { x: 50, y: 3 }, to: { x: 50, y: 3 } }],
      },
    ],
  },
]
