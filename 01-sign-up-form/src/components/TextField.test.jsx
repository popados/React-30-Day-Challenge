import { render, screen } from '@testing-library/react'
import { TextField } from '@/components/TextField'

describe('TextField', () => {
  it('labels the input and describes it with helper text', () => {
    render(<TextField label="Email" helper="Use your university address." />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAccessibleDescription('Use your university address.')
    expect(input).not.toHaveAttribute('aria-invalid')
  })

  it('announces an error in place of the helper', () => {
    render(<TextField label="Email" helper="Helper" error="Enter a valid email address." />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email address.')
    expect(screen.queryByText('Helper')).not.toBeInTheDocument()
  })
})
