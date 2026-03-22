import { adjustColor, getOutfitColor } from '../constants'

interface BodyProps {
  skinTone: string
  outfitId: string
}

export function BodyShape({ skinTone, outfitId }: BodyProps) {
  const outfit = getOutfitColor(outfitId)
  const skinDark = adjustColor(skinTone, -30)

  return (
    <g>
      {/* === LEGS === */}
      <g>
        {/* Left leg - pants */}
        <path
          d="M160,350 L152,430 C152,438 158,444 166,444 L174,444 C180,444 184,438 182,432 L182,350"
          fill="#1A1A2E"
        />
        {/* Left leg highlight */}
        <path
          d="M162,355 L156,420 C156,425 160,428 164,428"
          fill="none" stroke="#2A2A4E" strokeWidth="2" opacity="0.4"
        />
        {/* Left leg fold lines */}
        <path d="M158,370 Q170,374 180,370" fill="none" stroke="#333355" strokeWidth="1" opacity="0.3" />
        <path d="M156,400 Q168,404 180,400" fill="none" stroke="#333355" strokeWidth="1" opacity="0.3" />

        {/* Right leg - pants */}
        <path
          d="M218,350 L218,430 C218,438 222,444 228,444 L236,444 C242,444 246,438 246,432 L250,350"
          fill="#1A1A2E"
        />
        {/* Right leg highlight */}
        <path
          d="M220,355 L220,420 C220,425 224,428 228,428"
          fill="none" stroke="#2A2A4E" strokeWidth="2" opacity="0.4"
        />
        {/* Right leg fold lines */}
        <path d="M220,370 Q232,374 248,370" fill="none" stroke="#333355" strokeWidth="1" opacity="0.3" />
        <path d="M220,400 Q232,404 248,400" fill="none" stroke="#333355" strokeWidth="1" opacity="0.3" />

        {/* Left shoe */}
        <path
          d="M148,438 L174,438 C180,438 184,440 184,444 L184,448 L144,448 C140,448 140,442 148,438Z"
          fill="#2D2B3D"
        />
        <path d="M150,442 L180,442" fill="none" stroke="#3D3B5D" strokeWidth="1" opacity="0.4" />

        {/* Right shoe */}
        <path
          d="M216,438 L240,438 C246,438 250,440 250,444 L250,448 L212,448 C208,448 208,442 216,438Z"
          fill="#2D2B3D"
        />
        <path d="M218,442 L246,442" fill="none" stroke="#3D3B5D" strokeWidth="1" opacity="0.4" />
      </g>

      {/* === TORSO / GI === */}
      <g>
        {/* Main torso - broader shoulders, tapered waist */}
        <path
          d="M148,195 C140,200 132,220 130,260 L130,355 C130,362 140,366 155,366
             L245,366 C260,366 270,362 270,355 L270,260 C268,220 260,200 252,195Z"
          fill={outfit.main}
        />
        {/* Torso shadow - right side */}
        <path
          d="M240,200 C252,210 260,235 262,260 L262,350 C262,355 258,358 250,360
             L245,360 C255,358 262,355 262,350 L262,260 C260,235 252,210 240,200Z"
          fill={outfit.dark}
          opacity="0.3"
        />
        {/* Torso highlight - left side */}
        <path
          d="M155,200 C145,210 140,235 138,260 L138,280"
          fill="none" stroke={outfit.highlight} strokeWidth="3" opacity="0.2"
        />

        {/* Gi V-neck cross-over */}
        <path
          d="M148,195 L195,275 L200,272 L205,275 L252,195"
          fill="none"
          stroke={outfit.accent}
          strokeWidth="2.5"
        />
        {/* Left lapel */}
        <path
          d="M148,195 L195,275 L148,285"
          fill={outfit.main}
          stroke={outfit.accent}
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Right lapel */}
        <path
          d="M252,195 L205,275 L252,285"
          fill={outfit.main}
          stroke={outfit.accent}
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Fabric fold lines */}
        <path d="M160,220 C170,250 172,280 168,350" fill="none" stroke={outfit.dark} strokeWidth="1.5" opacity="0.2" />
        <path d="M240,220 C230,250 228,280 232,350" fill="none" stroke={outfit.dark} strokeWidth="1.5" opacity="0.2" />
        <path d="M175,240 C185,244 215,244 225,240" fill="none" stroke={outfit.dark} strokeWidth="1" opacity="0.15" />

        {/* === BELT === */}
        <rect x="130" y="300" width="140" height="18" rx="3" fill="#1A1A2E" />
        {/* Belt gradient highlight */}
        <rect x="130" y="300" width="140" height="6" rx="2" fill="#333355" opacity="0.4" />
        {/* Belt buckle */}
        <circle cx="200" cy="309" r="8" fill="#1A1A2E" stroke="#555577" strokeWidth="1.5" />
        <circle cx="200" cy="309" r="4" fill="#333355" />
        {/* Belt hanging ends */}
        <path d="M192,318 L186,348 L190,346 L188,318" fill="#1A1A2E" />
        <path d="M208,318 L214,348 L210,346 L212,318" fill="#1A1A2E" />
      </g>

      {/* === ARMS === */}
      <g>
        {/* Left arm - sleeve + skin */}
        <path
          d="M148,198 C130,204 108,222 92,248 C84,262 80,272 86,278 C92,284 102,278 108,268 C118,248 132,230 148,220"
          fill={outfit.main}
          stroke={outfit.accent}
          strokeWidth="1"
        />
        {/* Left arm shadow */}
        <path
          d="M140,205 C125,215 110,232 98,252"
          fill="none" stroke={outfit.dark} strokeWidth="2" opacity="0.25"
        />
        {/* Left hand */}
        <g>
          <ellipse cx="86" cy="274" rx="14" ry="11" fill={skinTone} />
          {/* Fingers */}
          <path d="M76,270 C73,267 72,272 74,275" fill="none" stroke={skinDark} strokeWidth="1.2" opacity="0.4" />
          <path d="M78,267 C75,264 74,269 76,272" fill="none" stroke={skinDark} strokeWidth="1.2" opacity="0.4" />
          <path d="M80,265 C78,262 76,267 78,270" fill="none" stroke={skinDark} strokeWidth="1.2" opacity="0.4" />
          {/* Thumb */}
          <path d="M96,268 C99,265 100,270 98,274" fill="none" stroke={skinDark} strokeWidth="1.2" opacity="0.4" />
          {/* Knuckle highlight */}
          <ellipse cx="84" cy="271" rx="6" ry="4" fill={adjustColor(skinTone, 15)} opacity="0.2" />
        </g>

        {/* Right arm - sleeve + skin */}
        <path
          d="M252,198 C270,204 292,222 308,248 C316,262 320,272 314,278 C308,284 298,278 292,268 C282,248 268,230 252,220"
          fill={outfit.main}
          stroke={outfit.accent}
          strokeWidth="1"
        />
        {/* Right arm shadow */}
        <path
          d="M260,205 C275,215 290,232 302,252"
          fill="none" stroke={outfit.dark} strokeWidth="2" opacity="0.25"
        />
        {/* Right hand */}
        <g>
          <ellipse cx="314" cy="274" rx="14" ry="11" fill={skinTone} />
          <path d="M324,270 C327,267 328,272 326,275" fill="none" stroke={skinDark} strokeWidth="1.2" opacity="0.4" />
          <path d="M322,267 C325,264 326,269 324,272" fill="none" stroke={skinDark} strokeWidth="1.2" opacity="0.4" />
          <path d="M320,265 C322,262 324,267 322,270" fill="none" stroke={skinDark} strokeWidth="1.2" opacity="0.4" />
          <path d="M304,268 C301,265 300,270 302,274" fill="none" stroke={skinDark} strokeWidth="1.2" opacity="0.4" />
          <ellipse cx="316" cy="271" rx="6" ry="4" fill={adjustColor(skinTone, 15)} opacity="0.2" />
        </g>
      </g>
    </g>
  )
}
