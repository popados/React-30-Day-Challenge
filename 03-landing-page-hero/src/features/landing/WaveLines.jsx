// Decorative contour lines behind the recap card. Colours come from tokens via
// currentColor on each path.
const LINES = [
  { d: 'M0 140 C 180 100, 360 120, 480 110 S 620 70, 680 55', className: 'text-learner/45', w: 2 },
  { d: 'M0 520 C 160 470, 300 430, 460 400 S 620 330, 680 300', className: 'text-white/20', w: 1 },
  { d: 'M0 560 C 180 520, 320 490, 480 460 S 620 410, 680 390', className: 'text-white/15', w: 1 },
  { d: 'M0 600 C 200 570, 360 540, 500 520 S 630 480, 680 470', className: 'text-white/10', w: 1 },
]

export function WaveLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 size-full"
      viewBox="0 0 680 640"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {LINES.map((line) => (
        <path
          key={line.d}
          d={line.d}
          className={line.className}
          stroke="currentColor"
          strokeWidth={line.w}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}
