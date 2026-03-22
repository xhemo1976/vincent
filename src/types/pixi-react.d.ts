import type { PixiReactElementProps } from '@pixi/react'
import type { Container, Sprite, Graphics, Text } from 'pixi.js'

declare module '@pixi/react' {
  interface PixiElements {
    pixiContainer: PixiReactElementProps<typeof Container>
    pixiSprite: PixiReactElementProps<typeof Sprite>
    pixiGraphics: PixiReactElementProps<typeof Graphics>
    pixiText: PixiReactElementProps<typeof Text>
  }
}
