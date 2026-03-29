import { useState } from 'react'

interface HockeyImageProps {
  src: string
  alt: string
  caption?: string
  fallbackEmoji?: string
  className?: string
}

export function HockeyImage({ src, alt, caption, fallbackEmoji = '🏑', className = '' }: HockeyImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <figure className={`my-4 ${className}`}>
        <div className="w-full max-w-md mx-auto aspect-video rounded-xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent,#FF9800)]/20 flex flex-col items-center justify-center gap-2 border border-[var(--color-primary)]/20">
          <span className="text-4xl">{fallbackEmoji}</span>
          <span className="text-sm text-secondary font-body">Bild folgt</span>
        </div>
        {caption && (
          <figcaption className="text-center text-xs text-secondary mt-2 font-body">{caption}</figcaption>
        )}
      </figure>
    )
  }

  return (
    <figure className={`my-4 ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setHasError(true)}
        className="w-full max-w-md mx-auto rounded-xl object-cover aspect-video"
      />
      {caption && (
        <figcaption className="text-center text-xs text-secondary mt-2 font-body">{caption}</figcaption>
      )}
    </figure>
  )
}
