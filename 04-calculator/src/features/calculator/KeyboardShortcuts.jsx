function Kbd({ children }) {
  return (
    <kbd className="rounded-md border border-line bg-sunk px-1.5 py-px font-mono text-[0.78rem]">
      {children}
    </kbd>
  )
}

const SHORTCUTS = [
  [['Alt', '1', '–', '4'], 'Switch mode'],
  [['0', '–', '9', '+', '-', '*', '/'], 'Type in Scientific'],
  [['^', '(', ')', '!', '%'], 'Power, brackets, factorial, percent'],
  [['s', 'c', 't', 'l', 'g'], 'sin, cos, tan, ln, log'],
  [['r', 'p', 'e', 'a'], '√, π, e, Ans'],
  [['Enter'], 'Evaluate, or save the result to the tape'],
  [['⌫', 'Esc'], 'Delete, clear'],
  [['Alt', 'C'], 'Copy the result'],
]

/** Hidden on touch screens, where there's no keyboard to use them with. */
export function KeyboardShortcuts() {
  return (
    <details className="border-t border-line px-4 pt-3 pb-3.5 text-[0.85rem] touch:hidden">
      <summary className="flex min-h-8 cursor-pointer items-center font-semibold">
        Keyboard shortcuts
      </summary>
      <dl className="mt-2 mb-0 grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1.5">
        {SHORTCUTS.map(([keys, action]) => (
          <div key={action} className="contents">
            <dt className="flex flex-wrap items-center gap-1 whitespace-nowrap">
              {keys.map((key, index) =>
                key === '–' ? <span key={index}>–</span> : <Kbd key={index}>{key}</Kbd>,
              )}
            </dt>
            <dd className="m-0 text-muted">{action}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3.5 text-[0.85rem] text-muted">
        Number fields in every mode also accept arithmetic, such as <Kbd>12*3.5</Kbd>.
      </p>
    </details>
  )
}
