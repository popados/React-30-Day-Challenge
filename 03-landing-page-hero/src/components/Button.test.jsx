import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'

describe('Button', () => {
  it('renders its label', () => {
    render(<Button>Continue with email</Button>)
    expect(screen.getByRole('button', { name: 'Continue with email' })).toBeInTheDocument()
  })

  it('is secondary by default and action-filled as primary', () => {
    const { rerender } = render(<Button>Save</Button>)
    expect(screen.getByRole('button')).toHaveClass('border-control-border', 'bg-transparent')
    rerender(<Button variant="primary">Save</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-action', 'text-on-action')
  })

  it('keeps a decorative icon out of the accessible name', () => {
    render(<Button icon={<Icon name="mail" />}>Continue with email</Button>)
    expect(screen.getByRole('button', { name: 'Continue with email' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Save</Button>)
    await userEvent.click(screen.getByRole('button', { name: 'Save' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not fire when disabled', async () => {
    const onClick = vi.fn()
    render(
      <Button onClick={onClick} disabled>
        Save
      </Button>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Save' }))
    expect(onClick).not.toHaveBeenCalled()
  })
})
