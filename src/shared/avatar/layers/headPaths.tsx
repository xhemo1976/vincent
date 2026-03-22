import { adjustColor } from '../constants'

interface HeadProps {
  skinTone: string
}

export function HeadShape({ skinTone }: HeadProps) {
  const skinDark = adjustColor(skinTone, -30)
  const skinHighlight = adjustColor(skinTone, 25)

  return (
    <g>
      {/* Neck with shadow */}
      <rect x="172" y="148" width="56" height="52" rx="8" fill={skinTone} />
      <rect x="172" y="148" width="56" height="18" rx="4" fill={skinDark} opacity="0.2" />
      {/* Neck tendons */}
      <line x1="188" y1="155" x2="186" y2="195" stroke={skinDark} strokeWidth="1" opacity="0.15" />
      <line x1="212" y1="155" x2="214" y2="195" stroke={skinDark} strokeWidth="1" opacity="0.15" />

      {/* Head - anime proportions: slightly elongated, pointed chin */}
      <path
        d="M200,30
           C240,30 270,55 272,90
           C274,115 268,135 258,148
           C248,160 230,168 200,170
           C170,168 152,160 142,148
           C132,135 126,115 128,90
           C130,55 160,30 200,30Z"
        fill={skinTone}
      />

      {/* Face shadow - jaw line */}
      <path
        d="M142,130 C148,150 165,162 200,164 C235,162 252,150 258,130
           L260,138 C252,156 235,168 200,170 C165,168 148,156 140,138Z"
        fill={skinDark}
        opacity="0.15"
      />

      {/* Cheek highlight - left */}
      <ellipse cx="162" cy="110" rx="12" ry="8" fill={skinHighlight} opacity="0.2" />
      {/* Cheek highlight - right */}
      <ellipse cx="238" cy="110" rx="12" ry="8" fill={skinHighlight} opacity="0.2" />

      {/* Forehead highlight */}
      <ellipse cx="200" cy="60" rx="25" ry="12" fill={skinHighlight} opacity="0.15" />

      {/* Ears */}
      <g>
        {/* Left ear */}
        <path
          d="M130,85 C125,78 122,82 120,90 C118,98 120,108 126,112 C130,115 132,108 132,100"
          fill={skinTone}
          stroke={skinDark}
          strokeWidth="1"
          opacity="0.9"
        />
        <path d="M124,90 C123,95 124,102 127,106" fill="none" stroke={skinDark} strokeWidth="1" opacity="0.2" />

        {/* Right ear */}
        <path
          d="M270,85 C275,78 278,82 280,90 C282,98 280,108 274,112 C270,115 268,108 268,100"
          fill={skinTone}
          stroke={skinDark}
          strokeWidth="1"
          opacity="0.9"
        />
        <path d="M276,90 C277,95 276,102 273,106" fill="none" stroke={skinDark} strokeWidth="1" opacity="0.2" />
      </g>

      {/* Nose - anime style, subtle */}
      <path
        d="M196,112 L200,122 L206,118"
        fill="none"
        stroke={skinDark}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
      {/* Nose highlight */}
      <circle cx="199" cy="115" r="2" fill={skinHighlight} opacity="0.3" />
    </g>
  )
}
