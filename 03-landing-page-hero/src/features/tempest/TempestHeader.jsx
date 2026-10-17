import { Button } from '@/components/Button'

const NAV_LINKS = [
  { label: 'How it works', href: '#how' },
  { label: 'For parents', href: '#parents' },
  { label: 'Pricing', href: '#pricing' },
]

export function TempestHeader() {
  return (
    <header className="border-b border-border px-4 @xl:px-6">
      <div className="mx-auto flex max-w-page items-center justify-between gap-4 py-4">
        {/* No logo supplied: the name in Bricolage Grotesque until a mark exists. */}
        <a
          href="#top"
          className="inline-flex min-h-target items-center font-display text-title no-underline"
        >
          Tempest Line
        </a>
        <nav aria-label="Main" className="flex items-center gap-6.5">
          <ul className="hidden items-center gap-6.5 text-body-strong @2xl:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-target items-center no-underline underline-offset-4 hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href="#login">Log in</Button>
        </nav>
      </div>
    </header>
  )
}
