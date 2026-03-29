import { useStrokeAnimation } from '../hooks/useStrokeAnimation'
import type { SASLetter } from '../types'

interface TemplatePreviewProps {
  letter: SASLetter
  autoPlay?: boolean
}

export function TemplatePreview({ letter, autoPlay = true }: TemplatePreviewProps) {
  const { canvasRef, containerRef, isAnimating, replay } = useStrokeAnimation({
    letter,
    autoPlay,
  })

  return (
    <div className="flex-1 flex flex-col relative" style={{ minHeight: 0 }}>
      <div
        ref={containerRef}
        className="flex-1 relative rounded-xl overflow-hidden bg-[#0a0a12]/50"
        style={{ minHeight: 0 }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full absolute inset-0"
        />
      </div>
      <button
        onClick={replay}
        disabled={isAnimating}
        className="absolute bottom-2 right-2 text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-secondary transition-colors disabled:opacity-40"
      >
        {isAnimating ? 'Spielt...' : '↻ Nochmal'}
      </button>
    </div>
  )
}
