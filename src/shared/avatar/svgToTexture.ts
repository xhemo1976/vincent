import { Texture } from 'pixi.js'

const textureCache = new Map<string, Texture>()
const MAX_CACHE_SIZE = 8

export function svgElementToTexture(
  svgElement: SVGSVGElement,
  width: number,
  height: number
): Promise<Texture> {
  const key = svgElement.outerHTML.slice(0, 200) + `_${width}x${height}`

  const cached = textureCache.get(key)
  if (cached && !cached.destroyed) return Promise.resolve(cached)

  return new Promise((resolve, reject) => {
    const svgString = new XMLSerializer().serializeToString(svgElement)
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const img = new Image()
    // Render at 2x for sharpness
    img.width = width * 2
    img.height = height * 2

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = width * 2
      canvas.height = height * 2
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        URL.revokeObjectURL(url)
        reject(new Error('Failed to get canvas context'))
        return
      }
      ctx.drawImage(img, 0, 0, width * 2, height * 2)
      URL.revokeObjectURL(url)

      const texture = Texture.from(canvas)

      // Evict oldest if cache full
      if (textureCache.size >= MAX_CACHE_SIZE) {
        const firstKey = textureCache.keys().next().value
        if (firstKey) {
          const old = textureCache.get(firstKey)
          if (old && !old.destroyed) old.destroy(true)
          textureCache.delete(firstKey)
        }
      }
      textureCache.set(key, texture)
      resolve(texture)
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load SVG as image'))
    }

    img.src = url
  })
}

export function clearTextureCache() {
  textureCache.forEach((tex) => {
    if (!tex.destroyed) tex.destroy(true)
  })
  textureCache.clear()
}
