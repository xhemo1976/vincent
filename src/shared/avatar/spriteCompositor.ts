// LPC Sprite Sheet Compositor
// Sprites are 64x64 per frame, idle sheets have 2 columns x 4 rows
// Row 0: up, Row 1: left, Row 2: down (front-facing), Row 3: right

const FRAME_W = 64
const FRAME_H = 64
const FRONT_ROW = 2 // facing down = front view
const FRONT_COL = 0 // first frame of idle

const imageCache = new Map<string, HTMLImageElement>()

function loadImage(src: string): Promise<HTMLImageElement> {
  const cached = imageCache.get(src)
  if (cached?.complete) return Promise.resolve(cached)

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      imageCache.set(src, img)
      resolve(img)
    }
    img.onerror = () => reject(new Error(`Failed to load: ${src}`))
    img.src = src
  })
}

export interface SpriteAvatarConfig {
  skinTone: string    // 'light' | 'olive' | 'brown' | 'bronze' | 'black'
  hairStyle: string   // 'spiked' | 'long' | 'plain' | 'buzzcut' | etc.
  hairColor: string   // 'black' | 'blonde' | 'blue' | 'red' | etc.
  torso: string       // 'longsleeve_blue' | 'longsleeve_red' | etc.
  legs: string        // 'pants_black' | 'pants_blue' | etc.
}

// Map user store skin tones to LPC file names
export const SKIN_MAP: Record<string, string> = {
  '#FFDAB9': 'light',
  '#F5CBA7': 'olive',
  '#D4A574': 'bronze',
  '#A0785A': 'brown',
  '#6B4226': 'black',
}

// Map user store hair styles to LPC file names
export const HAIR_STYLE_MAP: Record<string, string> = {
  'spiky': 'spiked',
  'long': 'long',
  'short': 'plain',
  'mohawk': 'longhawk',
  'samurai': 'ponytail',
}

// Map hair color hex to LPC color names
export const HAIR_COLOR_MAP: Record<string, string> = {
  '#2D2B3D': 'black',
  '#5C3A1E': 'black',
  '#DAA520': 'blonde',
  '#CC3333': 'red',
  '#4169E1': 'blue',
  '#9370DB': 'purple',
  '#E8E8E8': 'white',
  '#FF6B35': 'red',
  '#2E7D32': 'green',
  '#FF1493': 'red',
  '#00CED1': 'blue',
  '#FFD700': 'blonde',
}

// Map outfit IDs to LPC torso files
export const OUTFIT_MAP: Record<string, string> = {
  'gi-white': 'longsleeve_white',
  'gi-blue': 'longsleeve_blue',
  'gi-green': 'longsleeve_green',
  'gi-red': 'longsleeve_red',
  'gi-purple': 'longsleeve_purple',
  'gi-black': 'longsleeve_black',
  'gi-gold': 'longsleeve_white',
  'gi-cyber': 'longsleeve_blue',
  'gi-dragon': 'longsleeve_green',
  'gi-phoenix': 'longsleeve_red',
}

// Skin tone hex values for procedural head drawing
const SKIN_HEX: Record<string, string> = {
  light: '#FFDAB9',
  olive: '#F5CBA7',
  bronze: '#D4A574',
  brown: '#A0785A',
  black: '#6B4226',
}

function darken(hex: string, amount: number): string {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = Math.max(0, ((n >> 16) & 0xFF) - amount)
  const g = Math.max(0, ((n >> 8) & 0xFF) - amount)
  const b = Math.max(0, (n & 0xFF) - amount)
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

/** Draw a pixel-art head on the canvas.
 *  Positioned to sit directly on the body's neck stump (~y20). */
function drawHead(ctx: CanvasRenderingContext2D, skinTone: string, outputSize: number) {
  const skin = SKIN_HEX[skinTone] || SKIN_HEX.light
  const skinDark = darken(skin, 30)
  const px = outputSize / 64
  // Y offset — push head down to sit on body shoulders
  const oy = 13

  // Neck
  ctx.fillStyle = skin
  ctx.fillRect(28 * px, (18 + oy) * px, 8 * px, 4 * px)

  // Head oval
  ctx.fillStyle = skin
  roundRect(ctx, 21 * px, (4 + oy) * px, 22 * px, 16 * px, 7 * px)
  ctx.fill()

  // Ears
  ctx.fillStyle = skin
  ctx.fillRect(19 * px, (10 + oy) * px, 3 * px, 5 * px)
  ctx.fillRect(42 * px, (10 + oy) * px, 3 * px, 5 * px)
  ctx.fillStyle = skinDark
  ctx.fillRect(19 * px, (12 + oy) * px, 2 * px, 2 * px)
  ctx.fillRect(43 * px, (12 + oy) * px, 2 * px, 2 * px)

  // Eyes
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(25 * px, (11 + oy) * px, 4 * px, 3 * px)
  ctx.fillRect(35 * px, (11 + oy) * px, 4 * px, 3 * px)

  // Pupils
  ctx.fillStyle = '#1a1a2e'
  ctx.fillRect(26 * px, (12 + oy) * px, 3 * px, 2 * px)
  ctx.fillRect(36 * px, (12 + oy) * px, 3 * px, 2 * px)

  // Eye shine
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(27 * px, (12 + oy) * px, 1 * px, 1 * px)
  ctx.fillRect(37 * px, (12 + oy) * px, 1 * px, 1 * px)

  // Nose
  ctx.fillStyle = skinDark
  ctx.fillRect(31 * px, (15 + oy) * px, 2 * px, 2 * px)

  // Mouth
  ctx.fillStyle = darken(skin, 50)
  ctx.fillRect(29 * px, (18 + oy) * px, 6 * px, 1 * px)
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

// Layer z-order for compositing (head drawn procedurally)
const LAYERS = ['body', 'legs', 'torso'] as const

export async function compositeAvatar(
  config: SpriteAvatarConfig,
  outputSize: number = 256
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas')
  canvas.width = outputSize
  canvas.height = outputSize
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('No canvas 2d context')

  ctx.imageSmoothingEnabled = false

  const basePath = '/sprites'

  const layerUrls: Record<string, string> = {
    body: `${basePath}/body/${config.skinTone}.png`,
    legs: `${basePath}/legs/${config.legs}.png`,
    torso: `${basePath}/torso/${config.torso}.png`,
  }

  // Load sprite layers
  const images: Record<string, HTMLImageElement | null> = {}
  await Promise.all(
    LAYERS.map(async (layer) => {
      try {
        images[layer] = await loadImage(layerUrls[layer])
      } catch {
        images[layer] = null
      }
    })
  )

  // Load hair separately
  let hairImg: HTMLImageElement | null = null
  const hairUrl = getHairUrl(basePath, config.hairStyle, config.hairColor)
  try {
    hairImg = await loadImage(hairUrl)
  } catch {
    // Try base style without color
    try {
      hairImg = await loadImage(`${basePath}/hair/${config.hairStyle}.png`)
    } catch {
      // Try spiked_black as last resort
      try {
        hairImg = await loadImage(`${basePath}/hair/spiked_black.png`)
      } catch { /* no hair */ }
    }
  }

  // Draw body layers
  for (const layer of LAYERS) {
    const img = images[layer]
    if (!img) continue
    const sx = FRONT_COL * FRAME_W
    const sy = FRONT_ROW * FRAME_H
    ctx.drawImage(img, sx, sy, FRAME_W, FRAME_H, 0, 0, outputSize, outputSize)
  }

  // Draw procedural head
  drawHead(ctx, config.skinTone, outputSize)

  // Draw hair on top
  if (hairImg) {
    const sx = FRONT_COL * FRAME_W
    const sy = FRONT_ROW * FRAME_H
    ctx.drawImage(hairImg, sx, sy, FRAME_W, FRAME_H, 0, 0, outputSize, outputSize)
  }

  return canvas
}

function getHairUrl(basePath: string, style: string, color: string): string {
  if (!color) return `${basePath}/hair/${style}.png`
  return `${basePath}/hair/${style}_${color}.png`
}

// Hair fallback is now handled inside compositeAvatar
export async function compositeAvatarWithFallback(
  config: SpriteAvatarConfig,
  outputSize: number = 256
): Promise<HTMLCanvasElement> {
  return compositeAvatar(config, outputSize)
}

// Pre-generate a data URL for use in img tags
export async function getAvatarDataUrl(
  config: SpriteAvatarConfig,
  size: number = 256
): Promise<string> {
  const canvas = await compositeAvatarWithFallback(config, size)
  return canvas.toDataURL('image/png')
}
