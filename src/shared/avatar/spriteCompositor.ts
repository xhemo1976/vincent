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

// Layer z-order for compositing
const LAYERS = ['body', 'legs', 'torso', 'hair'] as const

export async function compositeAvatar(
  config: SpriteAvatarConfig,
  outputSize: number = 256
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas')
  canvas.width = outputSize
  canvas.height = outputSize
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('No canvas 2d context')

  // Disable image smoothing for crisp pixel art upscaling
  ctx.imageSmoothingEnabled = false

  const basePath = '/sprites'

  // Build layer URLs
  const layerUrls: Record<string, string> = {
    body: `${basePath}/body/${config.skinTone}.png`,
    legs: `${basePath}/legs/${config.legs}.png`,
    torso: `${basePath}/torso/${config.torso}.png`,
    hair: getHairUrl(basePath, config.hairStyle, config.hairColor),
  }

  // Load all images in parallel
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

  // Composite each layer - extract front-facing idle frame
  for (const layer of LAYERS) {
    const img = images[layer]
    if (!img) continue

    // Calculate source position for front-facing idle frame
    const sx = FRONT_COL * FRAME_W
    const sy = FRONT_ROW * FRAME_H

    ctx.drawImage(
      img,
      sx, sy, FRAME_W, FRAME_H, // source rect
      0, 0, outputSize, outputSize // dest rect (scaled up)
    )
  }

  return canvas
}

function getHairUrl(basePath: string, style: string, color: string): string {
  // First try style-specific color variant
  // e.g., /sprites/hair/spiked_blue.png
  return `${basePath}/hair/${style}_${color}.png`
}

// Fallback: try generic style (black) if color variant doesn't exist
export async function compositeAvatarWithFallback(
  config: SpriteAvatarConfig,
  outputSize: number = 256
): Promise<HTMLCanvasElement> {
  try {
    return await compositeAvatar(config, outputSize)
  } catch {
    // Try with black hair fallback
    return await compositeAvatar({ ...config, hairColor: 'black' }, outputSize)
  }
}

// Pre-generate a data URL for use in img tags
export async function getAvatarDataUrl(
  config: SpriteAvatarConfig,
  size: number = 256
): Promise<string> {
  const canvas = await compositeAvatarWithFallback(config, size)
  return canvas.toDataURL('image/png')
}
