import { TUTOR_PRICE } from '@/features/checkout/catalog'
import { money, SCHOOL_YEAR_END } from '@/features/checkout/pricing'
import { useCheckoutStore } from '@/stores/useCheckoutStore'

const OPTION = 'grid cursor-pointer grid-cols-[auto_1fr] gap-3 rounded-md'
const OFF = 'border border-rule bg-paper p-4 hover:bg-paper-deep'
const ON = 'border-2 border-moss bg-moss-soft p-[15px]'

/** Plan radio cards and the Tutor add-on. */
export function PlanOptions({ plans }) {
  const planId = useCheckoutStore((state) => state.planId)
  const tutor = useCheckoutStore((state) => state.tutor)
  const update = useCheckoutStore((state) => state.update)

  return (
    <>
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="mb-3 p-0 font-medium">Plan</legend>
        <div className="grid gap-3">
          {plans.map((plan) => {
            const selected = plan.id === planId
            return (
              <label key={plan.id} className={`${OPTION} ${selected ? ON : OFF}`}>
                <input
                  type="radio"
                  name="plan"
                  value={plan.id}
                  checked={selected}
                  onChange={() => update({ planId: plan.id })}
                  className="mt-0.5 size-5 accent-moss"
                />
                <span className="grid min-w-0 gap-1">
                  <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <span className="font-semibold">{plan.name}</span>
                    <span className="font-medium tabular-nums">{plan.priceText}</span>
                  </span>
                  {plan.renews ? null : (
                    <span className="flex flex-wrap items-center gap-2 text-body-sm">
                      <span className="rounded-sm bg-highlighter px-1.5 text-caption text-on-highlighter">
                        Does not renew
                      </span>
                      <span>Ends {SCHOOL_YEAR_END}</span>
                    </span>
                  )}
                  <span className="text-body-sm text-graphite">{plan.desc}</span>
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="mb-3 p-0 font-medium">Add-on</legend>
        <label className={`${OPTION} items-start ${tutor ? ON : OFF}`}>
          <input
            type="checkbox"
            checked={tutor}
            onChange={(event) => update({ tutor: event.target.checked })}
            className="mt-0.5 size-5 accent-moss"
          />
          <span>
            <span className="flex flex-wrap justify-between gap-x-3 gap-y-1">
              <span className="font-semibold">Tutor</span>
              <span className="font-medium tabular-nums">+{money(TUTOR_PRICE)}/month</span>
            </span>
            <span className="block text-body-sm text-graphite">
              4 live 30-minute sessions per month; unused sessions expire.
            </span>
          </span>
        </label>
      </fieldset>
    </>
  )
}
