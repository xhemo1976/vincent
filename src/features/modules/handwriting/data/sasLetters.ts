import type { SASLetter } from '../types'

// Schulausgangsschrift (SAS) Buchstaben-Definitionen
// Koordinaten: 0-100 normalisiert
// Lineatur-Zonen (y-Werte):
//   Oberlinie:  ~15
//   Mittellinie: ~45
//   Grundlinie:  ~75
//   Kellerlinie: ~95
// Kleinbuchstaben x-Hoehe: ~45 bis ~75
// Grossbuchstaben: ~15 bis ~75
// Oberlaengen (b,d,f,h,k,l,t): ~15 bis ~75
// Unterlaengen (g,j,p,q,y): ~45 bis ~95

const SAS_LOWERCASE: SASLetter[] = [
  {
    char: 'a',
    displayName: 'a (klein)',
    lineaturZone: 'middle',
    strokes: [
      { points: [
        { x: 55, y: 47 }, { x: 48, y: 44 }, { x: 40, y: 44 },
        { x: 32, y: 48 }, { x: 28, y: 55 }, { x: 28, y: 62 },
        { x: 32, y: 69 }, { x: 40, y: 73 }, { x: 48, y: 73 },
        { x: 55, y: 69 }, { x: 55, y: 47 }, { x: 55, y: 62 },
        { x: 55, y: 73 }, { x: 60, y: 76 },
      ] },
    ],
  },
  {
    char: 'b',
    displayName: 'b (klein)',
    lineaturZone: 'upper',
    strokes: [
      { points: [
        { x: 30, y: 15 }, { x: 30, y: 25 }, { x: 30, y: 35 },
        { x: 30, y: 45 }, { x: 30, y: 55 }, { x: 30, y: 65 },
        { x: 30, y: 73 }, { x: 38, y: 73 }, { x: 48, y: 73 },
        { x: 56, y: 67 }, { x: 58, y: 58 }, { x: 56, y: 50 },
        { x: 48, y: 45 }, { x: 38, y: 45 }, { x: 30, y: 50 },
      ] },
    ],
  },
  {
    char: 'c',
    displayName: 'c (klein)',
    lineaturZone: 'middle',
    strokes: [
      { points: [
        { x: 58, y: 48 }, { x: 50, y: 44 }, { x: 42, y: 44 },
        { x: 34, y: 48 }, { x: 30, y: 55 }, { x: 30, y: 62 },
        { x: 34, y: 69 }, { x: 42, y: 73 }, { x: 50, y: 73 },
        { x: 58, y: 70 }, { x: 62, y: 76 },
      ] },
    ],
  },
  {
    char: 'd',
    displayName: 'd (klein)',
    lineaturZone: 'upper',
    strokes: [
      { points: [
        { x: 55, y: 47 }, { x: 48, y: 44 }, { x: 40, y: 44 },
        { x: 32, y: 48 }, { x: 28, y: 55 }, { x: 28, y: 62 },
        { x: 32, y: 69 }, { x: 40, y: 73 }, { x: 48, y: 73 },
        { x: 55, y: 69 }, { x: 55, y: 55 }, { x: 55, y: 45 },
        { x: 55, y: 35 }, { x: 55, y: 25 }, { x: 55, y: 15 },
      ] },
    ],
  },
  {
    char: 'e',
    displayName: 'e (klein)',
    lineaturZone: 'middle',
    strokes: [
      { points: [
        { x: 30, y: 58 }, { x: 35, y: 58 }, { x: 45, y: 58 },
        { x: 55, y: 55 }, { x: 58, y: 50 }, { x: 55, y: 45 },
        { x: 48, y: 44 }, { x: 40, y: 44 }, { x: 32, y: 48 },
        { x: 30, y: 55 }, { x: 30, y: 62 }, { x: 34, y: 69 },
        { x: 42, y: 73 }, { x: 50, y: 73 }, { x: 58, y: 70 },
        { x: 62, y: 76 },
      ] },
    ],
  },
  {
    char: 'f',
    displayName: 'f (klein)',
    lineaturZone: 'upper',
    strokes: [
      { points: [
        { x: 55, y: 20 }, { x: 50, y: 15 }, { x: 42, y: 15 },
        { x: 36, y: 20 }, { x: 34, y: 30 }, { x: 34, y: 40 },
        { x: 34, y: 50 }, { x: 34, y: 60 }, { x: 34, y: 73 },
      ] },
      { points: [
        { x: 22, y: 45 }, { x: 30, y: 45 }, { x: 40, y: 45 },
        { x: 48, y: 45 },
      ] },
    ],
  },
  {
    char: 'g',
    displayName: 'g (klein)',
    lineaturZone: 'lower',
    strokes: [
      { points: [
        { x: 55, y: 47 }, { x: 48, y: 44 }, { x: 40, y: 44 },
        { x: 32, y: 48 }, { x: 28, y: 55 }, { x: 28, y: 62 },
        { x: 32, y: 69 }, { x: 40, y: 73 }, { x: 48, y: 73 },
        { x: 55, y: 69 }, { x: 55, y: 55 }, { x: 55, y: 73 },
        { x: 55, y: 82 }, { x: 52, y: 90 }, { x: 44, y: 94 },
        { x: 36, y: 92 },
      ] },
    ],
  },
  {
    char: 'h',
    displayName: 'h (klein)',
    lineaturZone: 'upper',
    strokes: [
      { points: [
        { x: 30, y: 15 }, { x: 30, y: 25 }, { x: 30, y: 35 },
        { x: 30, y: 45 }, { x: 30, y: 55 }, { x: 30, y: 65 },
        { x: 30, y: 73 },
      ] },
      { points: [
        { x: 30, y: 50 }, { x: 38, y: 45 }, { x: 46, y: 44 },
        { x: 54, y: 47 }, { x: 58, y: 53 }, { x: 58, y: 60 },
        { x: 58, y: 68 }, { x: 58, y: 73 }, { x: 62, y: 76 },
      ] },
    ],
  },
  {
    char: 'i',
    displayName: 'i (klein)',
    lineaturZone: 'middle',
    strokes: [
      { points: [
        { x: 42, y: 45 }, { x: 42, y: 52 }, { x: 42, y: 60 },
        { x: 42, y: 68 }, { x: 42, y: 73 }, { x: 48, y: 76 },
      ] },
      { points: [
        { x: 42, y: 36 }, { x: 42, y: 38 },
      ] },
    ],
  },
  {
    char: 'j',
    displayName: 'j (klein)',
    lineaturZone: 'lower',
    strokes: [
      { points: [
        { x: 45, y: 45 }, { x: 45, y: 55 }, { x: 45, y: 65 },
        { x: 45, y: 75 }, { x: 45, y: 83 }, { x: 42, y: 90 },
        { x: 36, y: 94 }, { x: 28, y: 92 },
      ] },
      { points: [
        { x: 45, y: 36 }, { x: 45, y: 38 },
      ] },
    ],
  },
  {
    char: 'k',
    displayName: 'k (klein)',
    lineaturZone: 'upper',
    strokes: [
      { points: [
        { x: 30, y: 15 }, { x: 30, y: 25 }, { x: 30, y: 35 },
        { x: 30, y: 45 }, { x: 30, y: 55 }, { x: 30, y: 65 },
        { x: 30, y: 73 },
      ] },
      { points: [
        { x: 55, y: 45 }, { x: 48, y: 50 }, { x: 40, y: 55 },
        { x: 30, y: 58 },
      ] },
      { points: [
        { x: 38, y: 55 }, { x: 45, y: 62 }, { x: 52, y: 68 },
        { x: 58, y: 73 }, { x: 62, y: 76 },
      ] },
    ],
  },
  {
    char: 'l',
    displayName: 'l (klein)',
    lineaturZone: 'upper',
    strokes: [
      { points: [
        { x: 42, y: 15 }, { x: 42, y: 25 }, { x: 42, y: 35 },
        { x: 42, y: 45 }, { x: 42, y: 55 }, { x: 42, y: 65 },
        { x: 42, y: 73 }, { x: 48, y: 76 },
      ] },
    ],
  },
  {
    char: 'm',
    displayName: 'm (klein)',
    lineaturZone: 'middle',
    strokes: [
      { points: [
        { x: 18, y: 45 }, { x: 18, y: 55 }, { x: 18, y: 65 },
        { x: 18, y: 73 },
      ] },
      { points: [
        { x: 18, y: 50 }, { x: 24, y: 45 }, { x: 32, y: 44 },
        { x: 38, y: 48 }, { x: 40, y: 55 }, { x: 40, y: 65 },
        { x: 40, y: 73 },
      ] },
      { points: [
        { x: 40, y: 50 }, { x: 46, y: 45 }, { x: 54, y: 44 },
        { x: 60, y: 48 }, { x: 62, y: 55 }, { x: 62, y: 65 },
        { x: 62, y: 73 }, { x: 68, y: 76 },
      ] },
    ],
  },
  {
    char: 'n',
    displayName: 'n (klein)',
    lineaturZone: 'middle',
    strokes: [
      { points: [
        { x: 30, y: 45 }, { x: 30, y: 55 }, { x: 30, y: 65 },
        { x: 30, y: 73 },
      ] },
      { points: [
        { x: 30, y: 50 }, { x: 38, y: 45 }, { x: 46, y: 44 },
        { x: 54, y: 47 }, { x: 58, y: 53 }, { x: 58, y: 60 },
        { x: 58, y: 68 }, { x: 58, y: 73 }, { x: 62, y: 76 },
      ] },
    ],
  },
  {
    char: 'o',
    displayName: 'o (klein)',
    lineaturZone: 'middle',
    strokes: [
      { points: [
        { x: 44, y: 44 }, { x: 36, y: 44 }, { x: 30, y: 48 },
        { x: 27, y: 55 }, { x: 27, y: 62 }, { x: 30, y: 69 },
        { x: 38, y: 73 }, { x: 46, y: 73 }, { x: 54, y: 69 },
        { x: 57, y: 62 }, { x: 57, y: 55 }, { x: 54, y: 48 },
        { x: 46, y: 44 }, { x: 44, y: 44 }, { x: 50, y: 46 },
        { x: 58, y: 50 }, { x: 62, y: 76 },
      ] },
    ],
  },
  {
    char: 'p',
    displayName: 'p (klein)',
    lineaturZone: 'lower',
    strokes: [
      { points: [
        { x: 30, y: 45 }, { x: 30, y: 55 }, { x: 30, y: 65 },
        { x: 30, y: 73 }, { x: 30, y: 82 }, { x: 30, y: 90 },
        { x: 30, y: 95 },
      ] },
      { points: [
        { x: 30, y: 50 }, { x: 38, y: 45 }, { x: 46, y: 44 },
        { x: 54, y: 48 }, { x: 58, y: 55 }, { x: 58, y: 62 },
        { x: 54, y: 69 }, { x: 46, y: 73 }, { x: 38, y: 73 },
        { x: 30, y: 68 },
      ] },
    ],
  },
  {
    char: 'q',
    displayName: 'q (klein)',
    lineaturZone: 'lower',
    strokes: [
      { points: [
        { x: 55, y: 47 }, { x: 48, y: 44 }, { x: 40, y: 44 },
        { x: 32, y: 48 }, { x: 28, y: 55 }, { x: 28, y: 62 },
        { x: 32, y: 69 }, { x: 40, y: 73 }, { x: 48, y: 73 },
        { x: 55, y: 69 }, { x: 55, y: 55 }, { x: 55, y: 73 },
        { x: 55, y: 82 }, { x: 55, y: 90 }, { x: 55, y: 95 },
      ] },
    ],
  },
  {
    char: 'r',
    displayName: 'r (klein)',
    lineaturZone: 'middle',
    strokes: [
      { points: [
        { x: 32, y: 45 }, { x: 32, y: 55 }, { x: 32, y: 65 },
        { x: 32, y: 73 },
      ] },
      { points: [
        { x: 32, y: 52 }, { x: 38, y: 46 }, { x: 46, y: 44 },
        { x: 54, y: 45 }, { x: 58, y: 48 },
      ] },
    ],
  },
  {
    char: 's',
    displayName: 's (klein)',
    lineaturZone: 'middle',
    strokes: [
      { points: [
        { x: 55, y: 48 }, { x: 48, y: 44 }, { x: 40, y: 44 },
        { x: 32, y: 47 }, { x: 30, y: 52 }, { x: 34, y: 57 },
        { x: 42, y: 59 }, { x: 50, y: 62 }, { x: 55, y: 67 },
        { x: 52, y: 72 }, { x: 44, y: 73 }, { x: 36, y: 73 },
        { x: 30, y: 70 }, { x: 35, y: 76 },
      ] },
    ],
  },
  {
    char: 't',
    displayName: 't (klein)',
    lineaturZone: 'upper',
    strokes: [
      { points: [
        { x: 42, y: 20 }, { x: 42, y: 30 }, { x: 42, y: 40 },
        { x: 42, y: 50 }, { x: 42, y: 60 }, { x: 42, y: 68 },
        { x: 44, y: 73 }, { x: 50, y: 76 },
      ] },
      { points: [
        { x: 28, y: 45 }, { x: 35, y: 45 }, { x: 42, y: 45 },
        { x: 50, y: 45 }, { x: 56, y: 45 },
      ] },
    ],
  },
  {
    char: 'u',
    displayName: 'u (klein)',
    lineaturZone: 'middle',
    strokes: [
      { points: [
        { x: 30, y: 45 }, { x: 30, y: 52 }, { x: 30, y: 60 },
        { x: 32, y: 67 }, { x: 38, y: 72 }, { x: 46, y: 73 },
        { x: 54, y: 70 }, { x: 58, y: 65 },
      ] },
      { points: [
        { x: 58, y: 45 }, { x: 58, y: 55 }, { x: 58, y: 65 },
        { x: 58, y: 73 }, { x: 62, y: 76 },
      ] },
    ],
  },
  {
    char: 'v',
    displayName: 'v (klein)',
    lineaturZone: 'middle',
    strokes: [
      { points: [
        { x: 25, y: 45 }, { x: 30, y: 52 }, { x: 36, y: 60 },
        { x: 42, y: 68 }, { x: 44, y: 73 },
      ] },
      { points: [
        { x: 62, y: 45 }, { x: 56, y: 52 }, { x: 50, y: 60 },
        { x: 44, y: 68 }, { x: 44, y: 73 }, { x: 50, y: 76 },
      ] },
    ],
  },
  {
    char: 'w',
    displayName: 'w (klein)',
    lineaturZone: 'middle',
    strokes: [
      { points: [
        { x: 18, y: 45 }, { x: 22, y: 55 }, { x: 26, y: 65 },
        { x: 30, y: 73 },
      ] },
      { points: [
        { x: 30, y: 73 }, { x: 34, y: 60 }, { x: 38, y: 50 },
        { x: 42, y: 45 },
      ] },
      { points: [
        { x: 42, y: 45 }, { x: 46, y: 55 }, { x: 50, y: 65 },
        { x: 54, y: 73 },
      ] },
      { points: [
        { x: 54, y: 73 }, { x: 58, y: 60 }, { x: 62, y: 50 },
        { x: 66, y: 45 }, { x: 70, y: 76 },
      ] },
    ],
  },
  {
    char: 'x',
    displayName: 'x (klein)',
    lineaturZone: 'middle',
    strokes: [
      { points: [
        { x: 28, y: 45 }, { x: 35, y: 52 }, { x: 42, y: 58 },
        { x: 50, y: 65 }, { x: 58, y: 73 },
      ] },
      { points: [
        { x: 58, y: 45 }, { x: 50, y: 52 }, { x: 42, y: 58 },
        { x: 35, y: 65 }, { x: 28, y: 73 }, { x: 35, y: 76 },
      ] },
    ],
  },
  {
    char: 'y',
    displayName: 'y (klein)',
    lineaturZone: 'lower',
    strokes: [
      { points: [
        { x: 28, y: 45 }, { x: 32, y: 52 }, { x: 38, y: 60 },
        { x: 44, y: 68 }, { x: 44, y: 73 },
      ] },
      { points: [
        { x: 60, y: 45 }, { x: 56, y: 52 }, { x: 50, y: 60 },
        { x: 44, y: 73 }, { x: 40, y: 82 }, { x: 36, y: 90 },
        { x: 30, y: 94 },
      ] },
    ],
  },
  {
    char: 'z',
    displayName: 'z (klein)',
    lineaturZone: 'middle',
    strokes: [
      { points: [
        { x: 28, y: 45 }, { x: 38, y: 45 }, { x: 48, y: 45 },
        { x: 58, y: 45 },
      ] },
      { points: [
        { x: 58, y: 45 }, { x: 50, y: 53 }, { x: 42, y: 61 },
        { x: 34, y: 69 }, { x: 28, y: 73 },
      ] },
      { points: [
        { x: 28, y: 73 }, { x: 38, y: 73 }, { x: 48, y: 73 },
        { x: 58, y: 73 }, { x: 62, y: 76 },
      ] },
    ],
  },
]

const SAS_UPPERCASE: SASLetter[] = [
  {
    char: 'A',
    displayName: 'A (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 22, y: 75 }, { x: 26, y: 65 }, { x: 32, y: 50 },
        { x: 38, y: 35 }, { x: 42, y: 22 }, { x: 44, y: 18 },
        { x: 48, y: 22 }, { x: 54, y: 35 }, { x: 60, y: 50 },
        { x: 64, y: 65 }, { x: 68, y: 75 },
      ] },
      { points: [
        { x: 30, y: 55 }, { x: 38, y: 55 }, { x: 46, y: 55 },
        { x: 54, y: 55 }, { x: 62, y: 55 },
      ] },
    ],
  },
  {
    char: 'B',
    displayName: 'B (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 25, y: 75 }, { x: 25, y: 65 }, { x: 25, y: 55 },
        { x: 25, y: 45 }, { x: 25, y: 35 }, { x: 25, y: 25 },
        { x: 25, y: 18 },
      ] },
      { points: [
        { x: 25, y: 18 }, { x: 35, y: 18 }, { x: 45, y: 18 },
        { x: 54, y: 22 }, { x: 58, y: 30 }, { x: 56, y: 38 },
        { x: 48, y: 45 }, { x: 38, y: 47 }, { x: 25, y: 47 },
      ] },
      { points: [
        { x: 25, y: 47 }, { x: 38, y: 47 }, { x: 48, y: 50 },
        { x: 58, y: 56 }, { x: 60, y: 64 }, { x: 56, y: 71 },
        { x: 48, y: 75 }, { x: 38, y: 75 }, { x: 25, y: 75 },
      ] },
    ],
  },
  {
    char: 'C',
    displayName: 'C (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 62, y: 28 }, { x: 55, y: 20 }, { x: 45, y: 17 },
        { x: 35, y: 18 }, { x: 27, y: 25 }, { x: 23, y: 35 },
        { x: 22, y: 46 }, { x: 23, y: 57 }, { x: 27, y: 67 },
        { x: 35, y: 73 }, { x: 45, y: 75 }, { x: 55, y: 73 },
        { x: 62, y: 67 },
      ] },
    ],
  },
  {
    char: 'D',
    displayName: 'D (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 25, y: 75 }, { x: 25, y: 65 }, { x: 25, y: 55 },
        { x: 25, y: 45 }, { x: 25, y: 35 }, { x: 25, y: 25 },
        { x: 25, y: 18 },
      ] },
      { points: [
        { x: 25, y: 18 }, { x: 35, y: 18 }, { x: 48, y: 20 },
        { x: 58, y: 28 }, { x: 63, y: 38 }, { x: 65, y: 47 },
        { x: 63, y: 58 }, { x: 58, y: 67 }, { x: 48, y: 73 },
        { x: 35, y: 75 }, { x: 25, y: 75 },
      ] },
    ],
  },
  {
    char: 'E',
    displayName: 'E (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 55, y: 18 }, { x: 42, y: 18 }, { x: 30, y: 18 },
        { x: 25, y: 18 },
      ] },
      { points: [
        { x: 25, y: 18 }, { x: 25, y: 28 }, { x: 25, y: 38 },
        { x: 25, y: 47 }, { x: 25, y: 57 }, { x: 25, y: 67 },
        { x: 25, y: 75 },
      ] },
      { points: [
        { x: 25, y: 47 }, { x: 35, y: 47 }, { x: 45, y: 47 },
        { x: 50, y: 47 },
      ] },
      { points: [
        { x: 25, y: 75 }, { x: 35, y: 75 }, { x: 45, y: 75 },
        { x: 55, y: 75 },
      ] },
    ],
  },
  {
    char: 'F',
    displayName: 'F (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 55, y: 18 }, { x: 42, y: 18 }, { x: 30, y: 18 },
        { x: 25, y: 18 },
      ] },
      { points: [
        { x: 25, y: 18 }, { x: 25, y: 28 }, { x: 25, y: 38 },
        { x: 25, y: 47 }, { x: 25, y: 57 }, { x: 25, y: 67 },
        { x: 25, y: 75 },
      ] },
      { points: [
        { x: 25, y: 47 }, { x: 35, y: 47 }, { x: 45, y: 47 },
        { x: 50, y: 47 },
      ] },
    ],
  },
  {
    char: 'G',
    displayName: 'G (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 62, y: 28 }, { x: 55, y: 20 }, { x: 45, y: 17 },
        { x: 35, y: 18 }, { x: 27, y: 25 }, { x: 23, y: 35 },
        { x: 22, y: 46 }, { x: 23, y: 57 }, { x: 27, y: 67 },
        { x: 35, y: 73 }, { x: 45, y: 75 }, { x: 55, y: 73 },
        { x: 62, y: 67 }, { x: 62, y: 57 }, { x: 62, y: 50 },
      ] },
      { points: [
        { x: 48, y: 50 }, { x: 55, y: 50 }, { x: 62, y: 50 },
      ] },
    ],
  },
  {
    char: 'H',
    displayName: 'H (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 25, y: 18 }, { x: 25, y: 28 }, { x: 25, y: 38 },
        { x: 25, y: 47 }, { x: 25, y: 57 }, { x: 25, y: 67 },
        { x: 25, y: 75 },
      ] },
      { points: [
        { x: 25, y: 47 }, { x: 35, y: 47 }, { x: 45, y: 47 },
        { x: 55, y: 47 }, { x: 65, y: 47 },
      ] },
      { points: [
        { x: 65, y: 18 }, { x: 65, y: 28 }, { x: 65, y: 38 },
        { x: 65, y: 47 }, { x: 65, y: 57 }, { x: 65, y: 67 },
        { x: 65, y: 75 },
      ] },
    ],
  },
  {
    char: 'I',
    displayName: 'I (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 34, y: 18 }, { x: 42, y: 18 }, { x: 50, y: 18 },
      ] },
      { points: [
        { x: 42, y: 18 }, { x: 42, y: 28 }, { x: 42, y: 38 },
        { x: 42, y: 47 }, { x: 42, y: 57 }, { x: 42, y: 67 },
        { x: 42, y: 75 },
      ] },
      { points: [
        { x: 34, y: 75 }, { x: 42, y: 75 }, { x: 50, y: 75 },
      ] },
    ],
  },
  {
    char: 'J',
    displayName: 'J (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 55, y: 18 }, { x: 55, y: 28 }, { x: 55, y: 38 },
        { x: 55, y: 48 }, { x: 55, y: 58 }, { x: 55, y: 65 },
        { x: 52, y: 71 }, { x: 45, y: 75 }, { x: 38, y: 75 },
        { x: 32, y: 71 }, { x: 28, y: 65 },
      ] },
    ],
  },
  {
    char: 'K',
    displayName: 'K (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 25, y: 18 }, { x: 25, y: 28 }, { x: 25, y: 38 },
        { x: 25, y: 47 }, { x: 25, y: 57 }, { x: 25, y: 67 },
        { x: 25, y: 75 },
      ] },
      { points: [
        { x: 60, y: 18 }, { x: 52, y: 27 }, { x: 44, y: 36 },
        { x: 36, y: 44 }, { x: 25, y: 50 },
      ] },
      { points: [
        { x: 35, y: 45 }, { x: 42, y: 53 }, { x: 50, y: 62 },
        { x: 58, y: 70 }, { x: 62, y: 75 },
      ] },
    ],
  },
  {
    char: 'L',
    displayName: 'L (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 25, y: 18 }, { x: 25, y: 28 }, { x: 25, y: 38 },
        { x: 25, y: 47 }, { x: 25, y: 57 }, { x: 25, y: 67 },
        { x: 25, y: 75 },
      ] },
      { points: [
        { x: 25, y: 75 }, { x: 35, y: 75 }, { x: 45, y: 75 },
        { x: 55, y: 75 },
      ] },
    ],
  },
  {
    char: 'M',
    displayName: 'M (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 18, y: 75 }, { x: 18, y: 65 }, { x: 18, y: 55 },
        { x: 18, y: 45 }, { x: 18, y: 35 }, { x: 18, y: 25 },
        { x: 18, y: 18 },
      ] },
      { points: [
        { x: 18, y: 18 }, { x: 24, y: 28 }, { x: 30, y: 38 },
        { x: 36, y: 48 }, { x: 42, y: 55 },
      ] },
      { points: [
        { x: 42, y: 55 }, { x: 48, y: 48 }, { x: 54, y: 38 },
        { x: 60, y: 28 }, { x: 66, y: 18 },
      ] },
      { points: [
        { x: 66, y: 18 }, { x: 66, y: 28 }, { x: 66, y: 38 },
        { x: 66, y: 48 }, { x: 66, y: 58 }, { x: 66, y: 68 },
        { x: 66, y: 75 },
      ] },
    ],
  },
  {
    char: 'N',
    displayName: 'N (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 25, y: 75 }, { x: 25, y: 65 }, { x: 25, y: 55 },
        { x: 25, y: 45 }, { x: 25, y: 35 }, { x: 25, y: 25 },
        { x: 25, y: 18 },
      ] },
      { points: [
        { x: 25, y: 18 }, { x: 32, y: 28 }, { x: 40, y: 40 },
        { x: 48, y: 52 }, { x: 56, y: 64 }, { x: 62, y: 75 },
      ] },
      { points: [
        { x: 62, y: 75 }, { x: 62, y: 65 }, { x: 62, y: 55 },
        { x: 62, y: 45 }, { x: 62, y: 35 }, { x: 62, y: 25 },
        { x: 62, y: 18 },
      ] },
    ],
  },
  {
    char: 'O',
    displayName: 'O (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 44, y: 17 }, { x: 35, y: 18 }, { x: 27, y: 24 },
        { x: 22, y: 33 }, { x: 20, y: 44 }, { x: 22, y: 56 },
        { x: 27, y: 66 }, { x: 35, y: 73 }, { x: 44, y: 75 },
        { x: 54, y: 73 }, { x: 62, y: 66 }, { x: 67, y: 56 },
        { x: 68, y: 44 }, { x: 67, y: 33 }, { x: 62, y: 24 },
        { x: 54, y: 18 }, { x: 44, y: 17 },
      ] },
    ],
  },
  {
    char: 'P',
    displayName: 'P (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 25, y: 75 }, { x: 25, y: 65 }, { x: 25, y: 55 },
        { x: 25, y: 45 }, { x: 25, y: 35 }, { x: 25, y: 25 },
        { x: 25, y: 18 },
      ] },
      { points: [
        { x: 25, y: 18 }, { x: 35, y: 18 }, { x: 46, y: 18 },
        { x: 56, y: 22 }, { x: 60, y: 30 }, { x: 58, y: 40 },
        { x: 50, y: 47 }, { x: 40, y: 48 }, { x: 25, y: 47 },
      ] },
    ],
  },
  {
    char: 'Q',
    displayName: 'Q (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 44, y: 17 }, { x: 35, y: 18 }, { x: 27, y: 24 },
        { x: 22, y: 33 }, { x: 20, y: 44 }, { x: 22, y: 56 },
        { x: 27, y: 66 }, { x: 35, y: 73 }, { x: 44, y: 75 },
        { x: 54, y: 73 }, { x: 62, y: 66 }, { x: 67, y: 56 },
        { x: 68, y: 44 }, { x: 67, y: 33 }, { x: 62, y: 24 },
        { x: 54, y: 18 }, { x: 44, y: 17 },
      ] },
      { points: [
        { x: 50, y: 62 }, { x: 56, y: 68 }, { x: 62, y: 74 },
        { x: 68, y: 80 },
      ] },
    ],
  },
  {
    char: 'R',
    displayName: 'R (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 25, y: 75 }, { x: 25, y: 65 }, { x: 25, y: 55 },
        { x: 25, y: 45 }, { x: 25, y: 35 }, { x: 25, y: 25 },
        { x: 25, y: 18 },
      ] },
      { points: [
        { x: 25, y: 18 }, { x: 35, y: 18 }, { x: 46, y: 18 },
        { x: 56, y: 22 }, { x: 60, y: 30 }, { x: 58, y: 38 },
        { x: 50, y: 44 }, { x: 40, y: 47 }, { x: 25, y: 47 },
      ] },
      { points: [
        { x: 42, y: 47 }, { x: 48, y: 55 }, { x: 54, y: 63 },
        { x: 60, y: 70 }, { x: 65, y: 75 },
      ] },
    ],
  },
  {
    char: 'S',
    displayName: 'S (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 60, y: 25 }, { x: 55, y: 20 }, { x: 46, y: 17 },
        { x: 38, y: 18 }, { x: 30, y: 22 }, { x: 26, y: 28 },
        { x: 26, y: 35 }, { x: 30, y: 41 }, { x: 38, y: 45 },
        { x: 48, y: 49 }, { x: 56, y: 54 }, { x: 60, y: 60 },
        { x: 60, y: 67 }, { x: 56, y: 72 }, { x: 48, y: 75 },
        { x: 40, y: 75 }, { x: 32, y: 72 }, { x: 26, y: 67 },
      ] },
    ],
  },
  {
    char: 'T',
    displayName: 'T (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 20, y: 18 }, { x: 30, y: 18 }, { x: 42, y: 18 },
        { x: 55, y: 18 }, { x: 65, y: 18 },
      ] },
      { points: [
        { x: 42, y: 18 }, { x: 42, y: 28 }, { x: 42, y: 38 },
        { x: 42, y: 48 }, { x: 42, y: 58 }, { x: 42, y: 68 },
        { x: 42, y: 75 },
      ] },
    ],
  },
  {
    char: 'U',
    displayName: 'U (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 25, y: 18 }, { x: 25, y: 28 }, { x: 25, y: 38 },
        { x: 25, y: 48 }, { x: 25, y: 58 }, { x: 28, y: 66 },
        { x: 34, y: 72 }, { x: 42, y: 75 }, { x: 52, y: 72 },
        { x: 58, y: 66 }, { x: 62, y: 58 }, { x: 62, y: 48 },
        { x: 62, y: 38 }, { x: 62, y: 28 }, { x: 62, y: 18 },
      ] },
    ],
  },
  {
    char: 'V',
    displayName: 'V (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 20, y: 18 }, { x: 25, y: 28 }, { x: 30, y: 38 },
        { x: 35, y: 48 }, { x: 40, y: 58 }, { x: 44, y: 68 },
        { x: 44, y: 75 },
      ] },
      { points: [
        { x: 68, y: 18 }, { x: 62, y: 28 }, { x: 56, y: 38 },
        { x: 50, y: 48 }, { x: 48, y: 58 }, { x: 44, y: 68 },
        { x: 44, y: 75 },
      ] },
    ],
  },
  {
    char: 'W',
    displayName: 'W (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 12, y: 18 }, { x: 16, y: 28 }, { x: 20, y: 42 },
        { x: 24, y: 56 }, { x: 28, y: 68 }, { x: 30, y: 75 },
      ] },
      { points: [
        { x: 30, y: 75 }, { x: 34, y: 62 }, { x: 38, y: 48 },
        { x: 42, y: 38 }, { x: 44, y: 32 },
      ] },
      { points: [
        { x: 44, y: 32 }, { x: 48, y: 42 }, { x: 52, y: 55 },
        { x: 56, y: 66 }, { x: 58, y: 75 },
      ] },
      { points: [
        { x: 58, y: 75 }, { x: 62, y: 62 }, { x: 66, y: 48 },
        { x: 70, y: 34 }, { x: 74, y: 22 }, { x: 76, y: 18 },
      ] },
    ],
  },
  {
    char: 'X',
    displayName: 'X (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 22, y: 18 }, { x: 30, y: 28 }, { x: 36, y: 36 },
        { x: 42, y: 45 }, { x: 50, y: 56 }, { x: 56, y: 65 },
        { x: 64, y: 75 },
      ] },
      { points: [
        { x: 64, y: 18 }, { x: 56, y: 28 }, { x: 50, y: 36 },
        { x: 42, y: 45 }, { x: 36, y: 56 }, { x: 30, y: 65 },
        { x: 22, y: 75 },
      ] },
    ],
  },
  {
    char: 'Y',
    displayName: 'Y (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 20, y: 18 }, { x: 26, y: 26 }, { x: 32, y: 34 },
        { x: 38, y: 42 }, { x: 42, y: 47 },
      ] },
      { points: [
        { x: 65, y: 18 }, { x: 58, y: 26 }, { x: 52, y: 34 },
        { x: 46, y: 42 }, { x: 42, y: 47 },
      ] },
      { points: [
        { x: 42, y: 47 }, { x: 42, y: 55 }, { x: 42, y: 63 },
        { x: 42, y: 70 }, { x: 42, y: 75 },
      ] },
    ],
  },
  {
    char: 'Z',
    displayName: 'Z (gross)',
    lineaturZone: 'full',
    strokes: [
      { points: [
        { x: 22, y: 18 }, { x: 32, y: 18 }, { x: 42, y: 18 },
        { x: 52, y: 18 }, { x: 62, y: 18 },
      ] },
      { points: [
        { x: 62, y: 18 }, { x: 55, y: 28 }, { x: 48, y: 38 },
        { x: 42, y: 47 }, { x: 35, y: 57 }, { x: 28, y: 67 },
        { x: 22, y: 75 },
      ] },
      { points: [
        { x: 22, y: 75 }, { x: 32, y: 75 }, { x: 42, y: 75 },
        { x: 52, y: 75 }, { x: 62, y: 75 },
      ] },
    ],
  },
]

export const SAS_LETTERS: SASLetter[] = [...SAS_UPPERCASE, ...SAS_LOWERCASE]

export const SAS_LOWERCASE_LETTERS = SAS_LOWERCASE
export const SAS_UPPERCASE_LETTERS = SAS_UPPERCASE
