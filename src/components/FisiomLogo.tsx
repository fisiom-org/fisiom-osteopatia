interface FisiomLogoProps {
  className?: string
  mainColor?: string
  subColor?: string
}

export default function FisiomLogo({
  className = 'w-40 h-auto',
  mainColor = '#2C4242',
  subColor = '#C2B67A',
}: FisiomLogoProps) {
  return (
    <svg viewBox="20 0 380 185" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 128,0 C 168,26 248,26 288,0 C 248,32 168,32 128,0 Z" fill={mainColor} />
      <path d="M 128,35 C 168,9 248,9 288,35 C 248,3 168,3 128,35 Z" fill={subColor} opacity="0.95" />
      <g fill={mainColor}>
        <path d="M 46,140 L 60,140 L 60,103 L 74,103 L 74,91 L 60,91 L 60,81 C 60,72 66,66 75,66 L 80,66 L 80,54 L 75,54 C 57,54 46,65 46,83 L 46,91 L 32,91 L 32,103 L 46,103 Z" />
        <path d="M 96,140 L 110,140 L 110,76 L 96,76 Z" />
        <path d="M 164,97 L 150,97 C 150,91 146,87 140,87 C 134,87 131,90 131,94 C 131,98 134,100 141,103 C 155,107 165,111 165,122 C 165,132 153,140 139,140 C 123,140 113,132 112,120 L 126,120 C 127,126 132,129 139,129 C 145,129 150,126 150,122 C 150,117 146,115 139,113 C 125,109 115,105 115,94 C 115,83 126,76 139,76 C 154,76 163,83 164,97 Z" />
        <path d="M 180,140 L 194,140 L 194,76 L 180,76 Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M 240,76 C 257.67,76 272,90.33 272,108 C 272,125.67 257.67,140 240,140 C 222.33,140 208,125.67 208,108 C 208,90.33 222.33,76 240,76 Z M 240,90 C 230.06,90 222,98.06 222,108 C 222,117.94 230.06,126 240,126 C 249.94,126 258,117.94 258,108 C 258,98.06 249.94,90 240,90 Z" />
        <path d="M 286,140 L 300,140 L 300,99 C 300,92 306,87 314,87 C 322,87 328,92 328,99 L 328,140 L 342,140 L 342,99 C 342,92 348,87 356,87 C 364,87 370,92 370,99 L 370,140 L 384,140 L 384,94 C 384,82 370,76 359,76 C 348,76 337,81 335,86 C 333,81 322,76 311,76 C 300,76 286,82 286,94 Z" />
      </g>
      <text x="208" y="173" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="17.5" letterSpacing="14" textAnchor="middle" fill={subColor}>OSTEOPATIA</text>
    </svg>
  )
}
