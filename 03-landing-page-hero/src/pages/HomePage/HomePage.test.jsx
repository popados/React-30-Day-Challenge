import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HomePage } from '@/pages/HomePage/HomePage'

describe('HomePage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('leads with the headline and the main action', () => {
    render(<HomePage />)
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
    const { container } = render(<HomePage />)
    const page = container.firstChild
    expect(page).toHaveAttribute('data-skin', 'blueprint')

    await userEvent.click(screen.getByRole('button', { name: 'Graph Paper' }))
    expect(page).toHaveAttribute('data-skin', 'graph')
    expect(screen.getByRole('button', { name: 'Graph Paper' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: 'Blueprint' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
    expect(localStorage.getItem('tl-skin')).toBe('graph')
  })

  it('remembers the theme picked earlier', () => {
    localStorage.setItem('tl-skin', 'contrast')
    const { container } = render(<HomePage />)
    expect(container.firstChild).toHaveAttribute('data-skin', 'contrast')
  })

  it('lists the three steps in order', () => {
    render(<HomePage />)
    const how = screen.getByRole('region', { name: 'How it works' })
    expect(
      within(how)
        .getAllByRole('heading', { level: 3 })
        .map((heading) => heading.textContent),
    ).toEqual([
      'Snap or type the problem',
      'Work through it step by step',
      'Check your answer',
      'Covers',
      'For parents',
    ])
  })

  it('announces the worked problem steps without relying on the tick', () => {
    render(<HomePage />)
    const card = screen.getByRole('article', { name: 'Example: a worked problem in Tempest Line' })
    expect(within(card).getByText('Done:')).toBeInTheDocument()
    expect(within(card).getByText('Divide both sides by 3').closest('li')).toHaveAttribute(
      'aria-current',
      'step',
    )
  })
})
