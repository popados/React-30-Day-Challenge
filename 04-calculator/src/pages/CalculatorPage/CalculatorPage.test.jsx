import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CalculatorPage } from '@/pages/CalculatorPage/CalculatorPage'
import { useCalculatorStore } from '@/stores/useCalculatorStore'

const initialState = useCalculatorStore.getState()
const readoutValue = () => document.querySelector('output')
const SAVED_LINE = /^2×sin\(30\)\+√\(16\)\s+\[deg\]$/

describe('CalculatorPage', () => {
  beforeEach(() => {
    localStorage.clear()
    useCalculatorStore.setState(initialState, true)
  })

  it('opens on a working example with a faded preview', () => {
    render(<CalculatorPage />)
    expect(screen.getByRole('tab', { name: /Scientific/ })).toHaveAttribute('aria-selected', 'true')
    expect(readoutValue()).toHaveTextContent('5')
    expect(readoutValue()).toHaveClass('opacity-55')
  })

  it('saves the answer to the tape on "=", with the angle unit', async () => {
    const user = userEvent.setup()
    render(<CalculatorPage />)
    await user.click(screen.getByRole('button', { name: '=' }))

    expect(readoutValue()).not.toHaveClass('opacity-55')
    const tape = screen.getByRole('complementary', { name: 'History tape' })
    expect(within(tape).getByText(SAVED_LINE)).toBeInTheDocument()
  })

  it('continues from Ans after "=" when an operator is pressed', async () => {
    const user = userEvent.setup()
    render(<CalculatorPage />)
    await user.click(screen.getByRole('button', { name: '=' }))
    await user.click(screen.getByRole('button', { name: '+' }))
    await user.click(screen.getByRole('button', { name: '1' }))
    expect(screen.getByLabelText('Expression')).toHaveTextContent('Ans+1')
    expect(readoutValue()).toHaveTextContent('6')
  })

  it('types from the keyboard in Scientific', async () => {
    const user = userEvent.setup()
    render(<CalculatorPage />)
    await user.keyboard('{Escape}12*3{Enter}')
    expect(readoutValue()).toHaveTextContent('36')
  })

  it('switches mode and restores a saved line from the tape', async () => {
    const user = userEvent.setup()
    render(<CalculatorPage />)

    await user.click(screen.getByRole('tab', { name: /Percent/ }))
    expect(readoutValue()).toHaveTextContent('36')
    await user.click(screen.getByRole('button', { name: 'Save to tape' }))
    expect(await screen.findByText('Saved to tape')).toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: /Scientific/ }))
    await user.click(screen.getByRole('button', { name: /15% of 240/ }))
    expect(screen.getByRole('tab', { name: /Percent/ })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByLabelText('Of value')).toHaveValue('240')
  })

  it('clears the tape only after a second press', async () => {
    const user = userEvent.setup()
    render(<CalculatorPage />)
    await user.click(screen.getByRole('button', { name: '=' }))
    const tape = screen.getByRole('complementary', { name: 'History tape' })

    await user.click(within(tape).getByRole('button', { name: 'Clear' }))
    expect(within(tape).getByText(SAVED_LINE)).toBeInTheDocument()
    await user.click(within(tape).getByRole('button', { name: 'Confirm clear' }))
    expect(within(tape).getByText('Nothing saved yet')).toBeInTheDocument()
  })

  it('copies the raw value, without separators', async () => {
    const user = userEvent.setup()
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
    render(<CalculatorPage />)
    await user.click(screen.getByRole('tab', { name: /Percent/ }))
    await user.click(screen.getByRole('button', { name: 'Discount' }))
    await user.click(screen.getByRole('button', { name: /Copy/ }))

    expect(writeText).toHaveBeenCalledWith('94.98')
    expect(await screen.findByText('Copied 94.98')).toBeInTheDocument()
  })
})
