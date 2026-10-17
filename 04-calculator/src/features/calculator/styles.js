// Class strings shared by the calculator's controls.

/** Readout and tape buttons. */
export const BUTTON =
  'inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-control border border-line bg-sunk px-4 font-semibold phone:px-3'
export const PRIMARY = 'border-accent bg-accent text-panel'

/** Mode marker colours: tabs, tape dots. */
export const MODE_DOT = { sci: 'bg-m-sci', conv: 'bg-m-conv', pct: 'bg-m-pct', date: 'bg-m-date' }

/** Form fields. */
export const FIELD = 'flex min-w-0 flex-col gap-1.5'
export const FIELD_LABEL = 'p-0 text-[0.85rem] font-semibold text-muted'
export const INPUT =
  'min-h-[54px] w-full rounded-control border border-line bg-num px-3.5 font-mono text-[1.2rem] aria-invalid:border-danger'
export const SELECT =
  'min-h-[54px] w-full cursor-pointer rounded-control border border-line bg-num px-3.5 font-sans text-[1.05rem]'

/** Segmented choices (sub-calculations, radio options). */
export const SEGMENTS = 'flex flex-wrap gap-1 rounded-control border border-line bg-sunk p-1'
export const SEGMENT =
  'flex min-h-11 flex-auto cursor-pointer items-center justify-center rounded-[9px] px-3 text-center font-semibold text-muted'
export const SEGMENT_ON = 'bg-panel text-ink shadow-soft'

export const HINT = 'mt-3.5 text-[0.85rem] text-muted'
