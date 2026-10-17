import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PLANS } from '@/features/checkout/catalog'
import { CheckoutPage } from '@/pages/CheckoutPage/CheckoutPage'
import { useCheckoutStore } from '@/stores/useCheckoutStore'

// The mock services answer straight away in tests; the outcomes stay the same.
vi.mock('@/features/checkout/api', () => ({
  fetchPlans: vi.fn(async ({ empty } = {}) => (empty ? [] : PLANS)),
  fetchTax: vi.fn(async ({ country, zip = '' }) => {
    if (zip.startsWith('00000')) throw new Error('tax')
    return { rate: country === 'US' ? 8.25 : 0, country, zip }
  }),
  submitPayment: vi.fn(async ({ cardDigits, amount }) => {
    if (cardDigits === '4000000000000002') throw new Error('declined')
    return { charged: amount }
  }),
}))

const initialState = useCheckoutStore.getState()

function renderCheckout() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={queryClient}>
      <CheckoutPage />
    </QueryClientProvider>,
  )
}

async function fillCardStep(user, number = '4242424242424242') {
  await user.type(await screen.findByLabelText('Card number'), number)
  await user.type(screen.getByLabelText('Expiry date'), '0839')
  await user.type(screen.getByLabelText('Security code'), '123')
  await user.type(screen.getByLabelText('Name on card'), 'Dana Reyes')
  await user.type(screen.getByLabelText('ZIP code'), '78701')
}

describe('CheckoutPage', () => {
  beforeEach(() => {
    useCheckoutStore.setState(initialState, true)
  })

  it('shows the plans and keeps the order summary in step', async () => {
    const user = userEvent.setup()
    renderCheckout()
    const summary = screen.getByRole('complementary', { name: 'Order summary' })

    await user.click(await screen.findByRole('radio', { name: /Plus school year/ }))
    expect(within(summary).getByText('Does not renew')).toBeInTheDocument()
    expect(within(summary).getByText('Calculated at next step')).toBeInTheDocument()
  })

  it('lists what to fix when the email is wrong', async () => {
    const user = userEvent.setup()
    renderCheckout()
    await user.type(await screen.findByLabelText('Email'), 'dana@')
    await user.click(screen.getByRole('button', { name: 'Continue to payment' }))

    const summary = await screen.findByText('Fix 1 thing to continue')
    expect(summary.closest('[role="alert"]')).toHaveFocus()
    expect(
      screen.getByRole('link', { name: 'Email: Enter an email like name@example.com' }),
    ).toBeInTheDocument()
  })

  it('takes a new customer from plan to subscribed', async () => {
    const user = userEvent.setup()
    renderCheckout()

    await user.type(await screen.findByLabelText('Email'), 'dana@example.com')
    await user.click(screen.getByRole('button', { name: 'Continue to payment' }))
    expect(await screen.findByRole('heading', { level: 2, name: 'Payment' })).toBeInTheDocument()

    await fillCardStep(user)
    expect(screen.getByLabelText('Card number')).toHaveValue('4242 4242 4242 4242')
    expect(screen.getByLabelText('Expiry date')).toHaveValue('08 / 39')
    await user.click(screen.getByRole('button', { name: 'Review order' }))

    expect(
      await screen.findByRole('heading', { level: 2, name: 'Review and subscribe' }),
    ).toBeInTheDocument()
    const subscribe = screen.getByRole('button', { name: 'Subscribe · $9.99/month' })
    expect(subscribe).toBeDisabled()

    await user.click(screen.getByRole('checkbox', { name: 'I agree to the renewal terms above.' }))
    await user.click(subscribe)

    expect(await screen.findByRole('heading', { name: 'You’re subscribed' })).toBeInTheDocument()
    expect(screen.getByText('Visa ending 4242, expires 08/39')).toBeInTheDocument()
    expect(useCheckoutStore.getState().card.number).toBe('')
  })

  it('returns to Payment with the details kept when a card is declined', async () => {
    const user = userEvent.setup()
    renderCheckout()

    await user.type(await screen.findByLabelText('Email'), 'dana@example.com')
    await user.click(screen.getByRole('button', { name: 'Continue to payment' }))
    await fillCardStep(user, '4000000000000002')
    await user.click(screen.getByRole('button', { name: 'Review order' }))
    await user.click(await screen.findByRole('checkbox', { name: /I agree/ }))
    await user.click(screen.getByRole('button', { name: /Subscribe/ }))

    expect(await screen.findByText('Your card was declined.')).toBeInTheDocument()
    expect(screen.getByLabelText('Name on card')).toHaveValue('Dana Reyes')
    expect(screen.getByLabelText('Security code')).toHaveValue('')
  })
})
