import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { SelectField } from '@/components/SelectField'
import { TextField } from '@/components/TextField'
import { BrandChip } from '@/features/checkout/BrandChip'
import {
  cardLength,
  cvcLength,
  detectBrand,
  digits,
  formatCard,
  formatExpiry,
} from '@/features/checkout/card'
import { COUNTRIES } from '@/features/checkout/catalog'
import { taxQuery } from '@/features/checkout/queries'
import { CARD_FIELDS, cardSchema, TAX_FIX } from '@/features/checkout/schemas'
import { useGoStep } from '@/features/checkout/useGoStep'
import { useCheckoutStore } from '@/stores/useCheckoutStore'

/** Card and billing fields. Values mirror into the store so they survive a declined payment. */
export function CardForm({ taxStatus, onSummary }) {
  const card = useCheckoutStore((state) => state.card)
  const update = useCheckoutStore((state) => state.update)
  const updateCard = useCheckoutStore((state) => state.updateCard)
  const goStep = useGoStep()
  const queryClient = useQueryClient()
  const [busy, setBusy] = useState(false)

  const form = useForm({
    defaultValues: card,
    resolver: zodResolver(cardSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })
  const {
    register,
    handleSubmit,
    getFieldState,
    getValues,
    setValue,
    trigger,
    control,
    subscribe,
    clearErrors,
  } = form
  const { errors } = form.formState

  useEffect(
    () => subscribe({ formState: { values: true }, callback: ({ values }) => updateCard(values) }),
    [subscribe, updateCard],
  )

  const brand = detectBrand(digits(useWatch({ control, name: 'number' })))
  const country = useWatch({ control, name: 'country' })
  const isUS = country === 'US'
  const postal = COUNTRIES[country].postal

  // Validate on blur (but not an untouched empty field), then live once a field shows an error.
  const field = (name, onChange) =>
    register(name, {
      onChange: (event) => {
        onChange?.(event)
        if (getFieldState(name).error) trigger(name)
      },
      onBlur: (event) => {
        if (event.target.value || getFieldState(name).error) trigger(name)
      },
    })

  const setFormatted = (name, el, value) => {
    el.value = value
    setValue(name, value)
  }

  function formatNumber(event) {
    const el = event.target
    const typedBefore = digits(el.value.slice(0, el.selectionStart ?? el.value.length)).length
    const d = digits(el.value)
    const b = detectBrand(d)
    const formatted = formatCard(d.slice(0, cardLength(b)), b)
    setFormatted('number', el, formatted)
    // Keep the caret after the same digit it followed before formatting.
    let pos = 0
    for (let count = 0; pos < formatted.length && count < typedBefore; pos += 1) {
      if (/\d/.test(formatted[pos])) count += 1
    }
    el.setSelectionRange?.(pos, pos)
    if (getFieldState('cvc').error) trigger('cvc')
  }

  const setBilling = (nextCountry, zip) =>
    update({ billing: { country: nextCountry, zip: zip.trim() } })

  async function onValid(values) {
    if (taxStatus === 'error') return onSummary([{ id: 'f-zip', label: 'Tax', message: TAX_FIX }])
    onSummary([])
    const d = digits(values.number)
    const billing = { country: values.country, zip: postal ? values.zip.trim() : '' }
    const payment = {
      kind: 'card',
      brand: detectBrand(d),
      last4: d.slice(-4),
      exp: values.exp.replace(/\s/g, ''),
      digits: d,
      ...billing,
    }
    setBusy(true)
    update({ billing })
    try {
      await queryClient.fetchQuery(taxQuery(billing))
      update({ payment, payAlert: null, returnToConfirm: false })
      goStep('confirm')
    } catch {
      // The tax alert above explains what to do.
    } finally {
      setBusy(false)
    }
  }

  function onInvalid(fieldErrors) {
    const items = CARD_FIELDS.filter(([key]) => fieldErrors[key] && (key !== 'zip' || postal)).map(
      ([key, label]) => ({
        id: `f-${key}`,
        label: key === 'zip' && !isUS ? 'Postal code' : label,
        message: fieldErrors[key].message,
      }),
    )
    if (taxStatus === 'error') items.push({ id: 'f-zip', label: 'Tax', message: TAX_FIX })
    onSummary(items)
  }

  return (
    <>
      <fieldset className="m-0 grid min-w-0 gap-4 rounded-lg border border-rule bg-paper px-4 py-5 min-[560px]:p-6">
        <legend className="float-left w-full p-0">
          <span className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 font-semibold">
              <Icon name="lock" />
              Secure payment
            </span>
            <ul aria-label="Accepted cards" className="flex flex-wrap gap-1.5">
              {['visa', 'mastercard', 'amex', 'discover'].map((b) => (
                <li key={b}>
                  <BrandChip brand={b} />
                </li>
              ))}
            </ul>
          </span>
        </legend>
        <TextField
          id="f-number"
          label="Card number"
          autoComplete="cc-number"
          inputMode="numeric"
          placeholder="1234 1234 1234 1234"
          error={errors.number?.message}
          trailing={<BrandChip brand={brand} />}
          {...field('number', formatNumber)}
        />
        <div className="grid grid-cols-1 gap-4 min-[375px]:grid-cols-2">
          <TextField
            id="f-exp"
            label="Expiry date"
            autoComplete="cc-exp"
            inputMode="numeric"
            placeholder="MM / YY"
            error={errors.exp?.message}
            {...field('exp', (event) =>
              setFormatted(
                'exp',
                event.target,
                formatExpiry(
                  event.target.value,
                  event.nativeEvent?.inputType?.startsWith('delete'),
                ),
              ),
            )}
          />
          <TextField
            id="f-cvc"
            label="Security code"
            autoComplete="cc-csc"
            inputMode="numeric"
            placeholder={brand === 'amex' ? '4 digits' : '3 digits'}
            helper={brand === 'amex' ? '4 digits on the front' : '3 digits on the back'}
            error={errors.cvc?.message}
            {...field('cvc', (event) =>
              setFormatted(
                'cvc',
                event.target,
                digits(event.target.value).slice(0, cvcLength(brand)),
              ),
            )}
          />
        </div>
        <TextField
          id="f-name"
          label="Name on card"
          autoComplete="cc-name"
          placeholder="As printed on the card"
          error={errors.name?.message}
          {...field('name')}
        />
        <p className="text-body-sm text-graphite">
          Card details are encrypted and never stored on this device.
        </p>
      </fieldset>

      <fieldset className="m-0 grid min-w-0 gap-4 border-0 p-0">
        <legend className="mb-4 p-0 font-semibold">Billing address</legend>
        <SelectField
          id="f-country"
          label="Country or region"
          autoComplete="country"
          {...register('country', {
            onChange: (event) => {
              clearErrors('zip')
              setBilling(event.target.value, getValues('zip'))
            },
          })}
        >
          {Object.entries(COUNTRIES).map(([code, c]) => (
            <option key={code} value={code}>
              {c.name}
            </option>
          ))}
        </SelectField>
        <div hidden={!postal}>
          <TextField
            id="f-zip"
            label={isUS ? 'ZIP code' : 'Postal code'}
            autoComplete="postal-code"
            inputMode={isUS ? 'numeric' : 'text'}
            placeholder={isUS ? '78701' : ''}
            helper={isUS ? 'Used to calculate sales tax' : undefined}
            error={errors.zip?.message}
            {...field('zip', (event) => {
              if (isUS)
                setFormatted(
                  'zip',
                  event.target,
                  event.target.value.replace(/[^\d-]/g, '').slice(0, 10),
                )
              setBilling(country, event.target.value)
            })}
          />
        </div>
      </fieldset>

      <label className="grid cursor-pointer grid-cols-[auto_1fr] items-start gap-3">
        <input type="checkbox" className="mt-0.5 size-5 accent-moss" {...register('save')} />
        <span>Save this card for future purchases</span>
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={() => goStep('plan')}>Back</Button>
        <Button
          variant="primary"
          disabled={busy}
          onClick={handleSubmit(onValid, onInvalid)}
          className="flex-[1_1_220px] md:min-w-60 md:flex-none"
        >
          {busy ? (
            <>
              <Icon name="loader-circle" className="animate-spin" />
              Checking tax…
            </>
          ) : (
            'Review order'
          )}
        </Button>
      </div>
    </>
  )
}
