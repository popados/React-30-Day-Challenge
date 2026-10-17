import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CHANGES } from '@/features/tempest/changes'
import { TempestPage } from '@/pages/TempestPage/TempestPage'

describe('TempestPage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('leads with the headline and the main action', () => {
    render(<TempestPage />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Stuck on homework? Get it explained step by step.',
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'Start free' })).toHaveLength(2)
    expect(screen.getByRole('link', { name: 'See how it works' })).toHaveAttribute('href', '#how')
  })

  it('starts in Blueprint and switches theme', async () => {
    const { container } = render(<TempestPage />)
    const page = container.firstChild
    expect(page).toHaveAttribute('data-skin', 'blueprint')
    expect(screen.getByRole('button', { name: 'Blueprint' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )

    await userEvent.click(screen.getByRole('button', { name: 'High Contrast' }))
    expect(page).toHaveAttribute('data-skin', 'contrast')
    expect(screen.getByRole('button', { name: 'High Contrast' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(localStorage.getItem('tl-skin')).toBe('contrast')
  })

  it('remembers the theme picked earlier', () => {
    localStorage.setItem('tl-skin', 'graph')
    const { container } = render(<TempestPage />)
    expect(container.firstChild).toHaveAttribute('data-skin', 'graph')
  })

  it('announces the worked problem steps without relying on the tick', () => {
    render(<TempestPage />)
    const card = screen.getByRole('article', { name: 'Example: a worked problem in Tempest Line' })
    expect(within(card).getByText('Done:')).toBeInTheDocument()
    expect(within(card).getByText('Divide both sides by 3').closest('li')).toHaveAttribute(
      'aria-current',
      'step',
    )
  })

  it('lists every change and can hide the list', async () => {
    render(<TempestPage />)
    const list = screen.getByRole('complementary', { name: 'Changes from the HTML' })
    expect(within(list).getAllByText(/^Why:/)).toHaveLength(CHANGES.length)

    const toggle = screen.getByRole('button', { name: `Hide the ${CHANGES.length} changes` })
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await userEvent.click(toggle)
    expect(
      screen.queryByRole('complementary', { name: 'Changes from the HTML' }),
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: `Show the ${CHANGES.length} changes` }),
    ).toHaveAttribute('aria-expanded', 'false')
  })
})
