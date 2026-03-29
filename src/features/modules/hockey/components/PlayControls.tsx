import { Button } from '../../../../shared/components/Button'

interface PlayControlsProps {
  isPlaying: boolean
  progress: number
  onPlay: () => void
  onPause: () => void
  onResume: () => void
  onReset: () => void
  onSpeedChange: (speed: number) => void
}

const SPEEDS = [0.5, 1, 2] as const

export function PlayControls({ isPlaying, progress, onPlay, onPause, onResume, onReset, onSpeedChange }: PlayControlsProps) {
  const isFinished = progress >= 1

  return (
    <div className="flex flex-col gap-3 mt-4">
      {/* Progress bar */}
      <div className="w-full h-2 rounded-full bg-primary/20 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-100"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="flex items-center justify-between gap-2 flex-wrap">
        {/* Play/Pause/Reset */}
        <div className="flex gap-2">
          {isFinished ? (
            <Button size="sm" onClick={() => { onReset(); setTimeout(onPlay, 50) }}>
              🔄 Nochmal
            </Button>
          ) : isPlaying ? (
            <Button size="sm" onClick={onPause}>⏸️ Pause</Button>
          ) : progress === 0 ? (
            <Button size="sm" onClick={onPlay}>▶️ Abspielen</Button>
          ) : (
            <Button size="sm" onClick={onResume}>▶️ Weiter</Button>
          )}
          {progress > 0 && !isFinished && (
            <Button size="sm" variant="ghost" onClick={onReset}>⏮️</Button>
          )}
        </div>

        {/* Speed selector */}
        <div className="flex gap-1">
          {SPEEDS.map(speed => (
            <button
              key={speed}
              onClick={() => onSpeedChange(speed)}
              className="px-3 py-1 text-xs font-bold rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer font-body"
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
