import { SKINS } from '@/features/tempest/useSkin'

/** Top strip: show or hide the change list, and pick the Tempest Line theme. */
export function SkinBar({ skin, onSkinChange, changesOpen, onToggleChanges, changeCount }) {
  return (
    <div className="border-b border-border bg-surface px-4 text-body-sm @xl:px-6">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-center gap-x-3.5 gap-y-2 py-2 @xl:justify-between">
        <button
          type="button"
          aria-expanded={changesOpen}
          aria-controls="tl-changes"
          onClick={onToggleChanges}
          className="inline-flex min-h-target cursor-pointer items-center rounded-md px-2 font-bold text-link underline underline-offset-4"
        >
          {changesOpen ? 'Hide' : 'Show'} the {changeCount} changes
        </button>

        <div className="flex items-center gap-3.5">
          <span id="tl-skin-label" className="font-bold text-ink-muted">
            Theme
          </span>
          <div
            role="group"
            aria-labelledby="tl-skin-label"
            className="inline-flex gap-0.5 rounded-pill border border-control-border p-0.5"
          >
            {SKINS.map(({ id, label }) => {
              const pressed = skin === id
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => onSkinChange(id)}
                  className={`min-h-target cursor-pointer rounded-pill px-2.5 font-bold @xl:px-3.5 ${
                    pressed ? 'bg-ink text-bg' : 'text-ink hover:bg-surface-raised'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
