import { render, screen, within } from '@testing-library/react'
import { HomePage } from '@/pages/HomePage/HomePage'

describe('HomePage', () => {
  it('leads with the headline', () => {
    render(<HomePage />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'Meetings in. Action items out.' }),
    ).toBeInTheDocument()
  })

  it('offers the main action and a low-commitment one', () => {
    render(<HomePage />)
    expect(screen.getAllByRole('button', { name: 'Try it on your next call' })).toHaveLength(2)
    expect(screen.getByRole('link', { name: 'See how it works' })).toHaveAttribute(
      'href',
      '#how-it-works',
    )
  })

  it('lists the three steps in order', () => {
    render(<HomePage />)
    const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    expect(titles).toEqual([
      'It joins from your calendar',
      'It catches every commitment',
      'It sends the recap for you',
    ])
  })

  it('shows a sample recap with an owner and date on each item', () => {
    render(<HomePage />)
    const recap = screen.getByRole('figure', { name: 'Example recap' })
    expect(within(recap).getByText('Leo · Wed')).toBeInTheDocument()
    expect(within(recap).getByText('Recap sent to 4 attendees')).toBeInTheDocument()
  })
})
