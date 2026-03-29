import type { Point2D, Stroke } from '../types'

export function distance(a: Point2D, b: Point2D): number {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

export function strokeLength(stroke: Stroke): number {
  let len = 0
  for (let i = 1; i < stroke.points.length; i++) {
    len += distance(stroke.points[i - 1], stroke.points[i])
  }
  return len
}

export function strokeDirection(stroke: Stroke): number {
  if (stroke.points.length < 2) return 0
  const first = stroke.points[0]
  const last = stroke.points[stroke.points.length - 1]
  return Math.atan2(last.y - first.y, last.x - first.x)
}

export function angleDifference(a: number, b: number): number {
  let diff = Math.abs(a - b) % (2 * Math.PI)
  if (diff > Math.PI) diff = 2 * Math.PI - diff
  return diff
}

export function resampleStroke(stroke: Stroke, count: number): Point2D[] {
  const pts = stroke.points
  if (pts.length <= 1 || count <= 1) return pts.length > 0 ? [pts[0]] : []

  const result: Point2D[] = [pts[0]]
  const totalLen = strokeLength(stroke)
  if (totalLen === 0) return Array(count).fill(pts[0])

  const step = totalLen / (count - 1)
  let accDist = 0
  let j = 1

  for (let i = 1; i < count; i++) {
    const target = step * i
    while (j < pts.length) {
      const segDist = distance(pts[j - 1], pts[j])
      if (accDist + segDist >= target) {
        const t = segDist > 0 ? (target - accDist) / segDist : 0
        result.push({
          x: pts[j - 1].x + t * (pts[j].x - pts[j - 1].x),
          y: pts[j - 1].y + t * (pts[j].y - pts[j - 1].y),
        })
        break
      }
      accDist += segDist
      j++
    }
    if (result.length <= i) result.push(pts[pts.length - 1])
  }

  while (result.length < count) result.push(pts[pts.length - 1])
  return result
}

export function boundingBox(points: Point2D[]): { minX: number; minY: number; maxX: number; maxY: number } {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const p of points) {
    if (p.x < minX) minX = p.x
    if (p.y < minY) minY = p.y
    if (p.x > maxX) maxX = p.x
    if (p.y > maxY) maxY = p.y
  }
  return { minX, minY, maxX, maxY }
}

export function normalizeToBox(
  points: Point2D[],
  targetMinX: number,
  targetMinY: number,
  targetMaxX: number,
  targetMaxY: number
): Point2D[] {
  const bb = boundingBox(points)
  const srcW = bb.maxX - bb.minX || 1
  const srcH = bb.maxY - bb.minY || 1
  const tgtW = targetMaxX - targetMinX
  const tgtH = targetMaxY - targetMinY

  // Uniform scale (preserve aspect ratio)
  const scale = Math.min(tgtW / srcW, tgtH / srcH)
  const offX = targetMinX + (tgtW - srcW * scale) / 2
  const offY = targetMinY + (tgtH - srcH * scale) / 2

  return points.map((p) => ({
    x: (p.x - bb.minX) * scale + offX,
    y: (p.y - bb.minY) * scale + offY,
  }))
}

export function pointsToStroke(points: Point2D[]): Stroke {
  return { points }
}
