export interface Point2D {
  x: number // 0-100 normalisiert
  y: number // 0-100 normalisiert
}

export interface Stroke {
  points: Point2D[] // Geordnet: erster Punkt = Start, letzter = Ende
}

export interface SASLetter {
  char: string
  displayName: string
  strokes: Stroke[]
  lineaturZone: 'upper' | 'middle' | 'lower' | 'full'
}

export interface EvaluationResult {
  accuracy: number // 0-100
  stars: number // 1-5
  strokeCountScore: number // 0-1
  orderDirectionScore: number // 0-1
  shapeScore: number // 0-1
}

export interface StrokeMatch {
  userIndex: number
  templateIndex: number
  directionCorrect: boolean
  shapeSimilarity: number // 0-1
}
