interface LockedOverlayProps {
  requiredLevel: number
  requiredRankName: string
  xpNeeded: number
}

export function LockedOverlay({ requiredRankName, xpNeeded }: LockedOverlayProps) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-black/40 backdrop-blur-sm">
      <span className="text-3xl mb-2">🔒</span>
      <span className="text-sm font-bold text-white font-body">Ab Rang {requiredRankName}</span>
      <span className="text-xs text-white/70 font-body">Noch {xpNeeded} XP</span>
    </div>
  )
}
