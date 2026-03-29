import type { Point2D, Stroke, StrokeMatch, EvaluationResult, SASLetter } from '../types'
import { distance, strokeLength, strokeDirection, angleDifference, resampleStroke } from './geometry'

const RESAMPLE_COUNT = 32
const DIRECTION_THRESHOLD = Math.PI / 3 // 60 Grad Toleranz

function dtwDistance(a: Point2D[], b: Point2D[]): number {
  const n = a.length
  const m = b.length
  if (n === 0 || m === 0) return 100

  // DTW-Matrix
  const dtw: number[][] = Array.from({ length: n + 1 }, () =>
    Array(m + 1).fill(Infinity)
  )
  dtw[0][0] = 0

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const cost = distance(a[i - 1], b[j - 1])
      dtw[i][j] = cost + Math.min(
        dtw[i - 1][j],     // insertion
        dtw[i][j - 1],     // deletion
        dtw[i - 1][j - 1]  // match
      )
    }
  }

  return dtw[n][m] / Math.max(n, m)
}

function matchUserToTemplate(
  userStrokes: Stroke[],
  templateStrokes: Stroke[]
): StrokeMatch[] {
  const matches: StrokeMatch[] = []
  const usedTemplate = new Set<number>()

  for (let ui = 0; ui < userStrokes.length; ui++) {
    let bestTi = -1
    let bestDist = Infinity
    const userCenter = getStrokeCenter(userStrokes[ui])

    for (let ti = 0; ti < templateStrokes.length; ti++) {
      if (usedTemplate.has(ti)) continue
      const templateCenter = getStrokeCenter(templateStrokes[ti])
      const dist = distance(userCenter, templateCenter)
      if (dist < bestDist) {
        bestDist = dist
        bestTi = ti
      }
    }

    if (bestTi >= 0) {
      usedTemplate.add(bestTi)
      const userDir = strokeDirection(userStrokes[ui])
      const templateDir = strokeDirection(templateStrokes[bestTi])
      const dirDiff = angleDifference(userDir, templateDir)

      const userResampled = resampleStroke(userStrokes[ui], RESAMPLE_COUNT)
      const templateResampled = resampleStroke(templateStrokes[bestTi], RESAMPLE_COUNT)
      const dtwDist = dtwDistance(userResampled, templateResampled)
      const shapeSim = Math.max(0, Math.min(1, 1 - dtwDist / 30))

      matches.push({
        userIndex: ui,
        templateIndex: bestTi,
        directionCorrect: dirDiff < DIRECTION_THRESHOLD,
        shapeSimilarity: shapeSim,
      })
    }
  }

  return matches
}

function getStrokeCenter(stroke: Stroke): Point2D {
  if (stroke.points.length === 0) return { x: 50, y: 50 }
  let sx = 0, sy = 0
  for (const p of stroke.points) {
    sx += p.x
    sy += p.y
  }
  return { x: sx / stroke.points.length, y: sy / stroke.points.length }
}

export function evaluateHandwriting(
  userStrokes: Stroke[],
  letter: SASLetter
): EvaluationResult {
  const templateStrokes = letter.strokes

  // Mindestpunkte pruefen
  const totalUserPoints = userStrokes.reduce((s, st) => s + st.points.length, 0)
  if (totalUserPoints < 5) {
    return { accuracy: 0, stars: 0, strokeCountScore: 0, orderDirectionScore: 0, shapeScore: 0 }
  }

  // 1. Strichanzahl (10%)
  const countDiff = Math.abs(userStrokes.length - templateStrokes.length)
  const strokeCountScore = Math.max(0, 1 - countDiff * 0.25)

  // 2. Matching
  const matches = matchUserToTemplate(userStrokes, templateStrokes)

  // 3. Reihenfolge + Richtung (30%)
  let orderCorrect = 0
  let directionCorrect = 0
  for (const match of matches) {
    if (match.directionCorrect) directionCorrect++
    // Reihenfolge: User-Index i sollte Template-Index i matchen
    if (match.userIndex === match.templateIndex) orderCorrect++
  }
  const matchCount = Math.max(matches.length, 1)
  const orderScore = orderCorrect / matchCount
  const dirScore = directionCorrect / matchCount
  const orderDirectionScore = orderScore * 0.5 + dirScore * 0.5

  // 4. Form-Aehnlichkeit (60%)
  let shapeSum = 0
  for (const match of matches) {
    shapeSum += match.shapeSimilarity
  }
  // Ungematchte Template-Striche bestrafen
  const unmatchedPenalty = Math.max(0, templateStrokes.length - matches.length) * 0.2
  const shapeScore = Math.max(0, (matches.length > 0 ? shapeSum / templateStrokes.length : 0) - unmatchedPenalty)

  // Laengen-Check: Zu kurze Striche bestrafen
  let lengthPenalty = 1
  const totalUserLen = userStrokes.reduce((s, st) => s + strokeLength(st), 0)
  const totalTemplateLen = templateStrokes.reduce((s, st) => s + strokeLength(st), 0)
  if (totalTemplateLen > 0) {
    const lenRatio = totalUserLen / totalTemplateLen
    if (lenRatio < 0.3) lengthPenalty = 0.3
    else if (lenRatio < 0.6) lengthPenalty = 0.7
    else if (lenRatio > 2.5) lengthPenalty = 0.7
  }

  // Gesamtscore
  const rawAccuracy = (
    strokeCountScore * 0.10 +
    orderDirectionScore * 0.30 +
    shapeScore * 0.60
  ) * 100 * lengthPenalty

  const accuracy = Math.round(Math.max(0, Math.min(100, rawAccuracy)))

  // Sterne: 1-5
  const stars = accuracy >= 90 ? 5
    : accuracy >= 80 ? 4
    : accuracy >= 65 ? 3
    : accuracy >= 50 ? 2
    : accuracy >= 30 ? 1
    : 0

  return { accuracy, stars, strokeCountScore, orderDirectionScore, shapeScore }
}
