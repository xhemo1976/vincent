// 3-Linien-System wie im deutschen Schreibheft
// Oberlinie: y=15%, Mittellinie: y=45%, Grundlinie: y=75%, Kellerlinie: y=95%

export const LINEATUR = {
  oberlinie: 15,
  mittellinie: 45,
  grundlinie: 75,
  kellerlinie: 95,
} as const

interface LineaturProps {
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  showKeller?: boolean
}

export function drawLineatur({ ctx, width, height, showKeller = false }: LineaturProps) {
  ctx.save()

  // Grundlinie (am staerksten sichtbar)
  ctx.strokeStyle = 'rgba(120, 120, 180, 0.35)'
  ctx.lineWidth = 1.5
  ctx.setLineDash([])
  ctx.beginPath()
  ctx.moveTo(0, (LINEATUR.grundlinie / 100) * height)
  ctx.lineTo(width, (LINEATUR.grundlinie / 100) * height)
  ctx.stroke()

  // Mittellinie (gestrichelt)
  ctx.strokeStyle = 'rgba(120, 120, 180, 0.25)'
  ctx.lineWidth = 1
  ctx.setLineDash([6, 4])
  ctx.beginPath()
  ctx.moveTo(0, (LINEATUR.mittellinie / 100) * height)
  ctx.lineTo(width, (LINEATUR.mittellinie / 100) * height)
  ctx.stroke()

  // Oberlinie (gestrichelt, duenner)
  ctx.strokeStyle = 'rgba(120, 120, 180, 0.2)'
  ctx.lineWidth = 1
  ctx.setLineDash([4, 6])
  ctx.beginPath()
  ctx.moveTo(0, (LINEATUR.oberlinie / 100) * height)
  ctx.lineTo(width, (LINEATUR.oberlinie / 100) * height)
  ctx.stroke()

  // Kellerlinie (nur bei Unterlaengen)
  if (showKeller) {
    ctx.strokeStyle = 'rgba(120, 120, 180, 0.15)'
    ctx.lineWidth = 1
    ctx.setLineDash([3, 5])
    ctx.beginPath()
    ctx.moveTo(0, (LINEATUR.kellerlinie / 100) * height)
    ctx.lineTo(width, (LINEATUR.kellerlinie / 100) * height)
    ctx.stroke()
  }

  ctx.restore()
}
