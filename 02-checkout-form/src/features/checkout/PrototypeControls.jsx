import { Button } from '@/components/Button'
import { TEST_CARDS, TEST_VALUES } from '@/features/checkout/catalog'
import { useCheckoutStore } from '@/stores/useCheckoutStore'

const TOGGLES = [
  ['saved', 'Returning user with a saved card'],
  ['apple', 'Device supports Apple Pay'],
  ['google', 'Device supports Google Pay'],
  ['empty', 'Plans service returns no plans'],
]
const CELL = 'border-b border-hairline py-1.5 pr-3 text-left align-middle'

/** Not part of the checkout design: switches and test values to reach every state. */
export function PrototypeControls({ onToggleSaved, onFillCard, onRestart }) {
  const signedIn = useCheckoutStore((state) => state.signedIn)
  const dev = useCheckoutStore((state) => state.dev)
  const setDev = useCheckoutStore((state) => state.setDev)

  return (
    <section aria-labelledby="dev-h" className="mx-auto mb-12 max-w-shell px-4">
      <div className="grid gap-4 rounded-lg border border-dashed border-rule p-5">
        <div>
          <h2 id="dev-h" className="font-serif text-heading-sm">
            Prototype controls
          </h2>
          <p className="text-body-sm text-graphite">
            Not part of the checkout design. Use these to reach each state from the requirements.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-6 gap-y-1">
          {TOGGLES.map(([key, label]) => (
            <label key={key} className="flex min-h-target cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                className="size-5 accent-moss"
                checked={key === 'saved' ? signedIn : dev[key]}
                onChange={(event) =>
                  key === 'saved'
                    ? onToggleSaved(event.target.checked)
                    : setDev(key, event.target.checked)
                }
              />
              {label}
            </label>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-body-sm">
            <thead>
              <tr>
                <th scope="col" className={`${CELL} font-medium text-graphite`}>
                  Test value
                </th>
                <th scope="col" className={`${CELL} font-medium text-graphite`}>
                  What happens
                </th>
                <th scope="col" className={CELL}>
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {TEST_CARDS.map((test) => (
                <tr key={test.number}>
                  <td className={CELL}>
                    <code className="font-mono text-caption whitespace-nowrap">{test.label}</code>
                  </td>
                  <td className={CELL}>{test.outcome}</td>
                  <td className={CELL}>
                    <Button size="sm" onClick={() => onFillCard(test.number)}>
                      Fill card
                    </Button>
                  </td>
                </tr>
              ))}
              {TEST_VALUES.map((test) => (
                <tr key={test.value}>
                  <td className={CELL}>
                    <code className="font-mono text-caption whitespace-nowrap">{test.value}</code>
                  </td>
                  <td className={CELL}>{test.outcome}</td>
                  <td className={CELL} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <Button onClick={onRestart}>Start over</Button>
        </div>
      </div>
    </section>
  )
}
