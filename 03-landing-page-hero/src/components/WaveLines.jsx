// Decorative contour lines for blueprint panels. Stroke colour comes from
// currentColor: set it with a text-* token class.
const LINES = [
  { d: 'M0 140 C 180 100, 360 120, 480 110 S 620 70, 680 55', opacity: 'opacity-45', w: 2 },
  { d: 'M0 520 C 160 470, 300 430, 460 400 S 620 330, 680 300', opacity: 'opacity-25', w: 1.2 },
  { d: 'M0 560 C 180 520, 320 490, 480 460 S 620 410, 680 390', opacity: 'opacity-20', w: 1.2 },
  { d: 'M0 600 C 200 570, 360 540, 500 520 S 630 480, 680 470', opacity: 'opacity-15', w: 1.2 },
]

/**
 * @param {object} props
 * @param {string} [props.className] Colour of every line, e.g. 'text-white'.
 * @param {string} [props.accentClassName] Colour of the top line, if different.
 */
export function WaveLines({ className = 'text-white', accentClassName }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 size-full"
      viewBox="0 0 680 640"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {LINES.map((line, index) => (
        <path
          key={line.d}
          d={line.d}
          className={`${index === 0 && accentClassName ? accentClassName : className} ${line.opacity}`}
          stroke="currentColor"
          strokeWidth={line.w}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}
