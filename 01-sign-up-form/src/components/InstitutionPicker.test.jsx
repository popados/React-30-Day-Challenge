import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InstitutionPicker } from '@/components/InstitutionPicker'

const INSTITUTIONS = [
  { name: 'Northfield University', domain: 'northfield.edu' },
  { name: 'Northfield College of Art', domain: 'nca.edu' },
  { name: 'Lakeshore Institute', domain: 'lakeshore.edu' },
]

describe('InstitutionPicker', () => {
  it('prompts before anything is typed', async () => {
    render(<InstitutionPicker institutions={INSTITUTIONS} />)
    await userEvent.click(screen.getByRole('combobox'))
    expect(screen.getByText('Start typing your university or email domain.')).toBeInTheDocument()
  })

  it('filters by name or domain and selects with the keyboard', async () => {
    const onSelect = vi.fn()
    render(<InstitutionPicker institutions={INSTITUTIONS} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'nca.edu')
    expect(screen.getAllByRole('option')).toHaveLength(1)
    await userEvent.clear(input)
    await userEvent.type(input, 'north')
    expect(screen.getAllByRole('option')).toHaveLength(2)
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}')
    expect(onSelect).toHaveBeenCalledWith(INSTITUTIONS[1])
  })

  it('offers to request an institution when nothing matches', async () => {
    const onRequestInstitution = vi.fn()
    render(
      <InstitutionPicker institutions={INSTITUTIONS} onRequestInstitution={onRequestInstitution} />,
    )
    await userEvent.type(screen.getByRole('combobox'), 'Westbrook')
    await userEvent.click(screen.getByRole('button', { name: 'Request your institution' }))
    expect(onRequestInstitution).toHaveBeenCalledOnce()
  })

  it('shows the redirect state with a cancel link', async () => {
    const onCancel = vi.fn()
    render(
      <InstitutionPicker
        state="redirecting"
        redirectTo="Lakeshore Institute"
        onCancel={onCancel}
      />,
    )
    expect(screen.getByText('Taking you to Lakeshore Institute…')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onCancel).toHaveBeenCalledOnce()
  })
})
