import { Button } from '@/components/Button'

const NAV_LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
]

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-bg">
      <div className="mx-auto flex max-w-page items-center justify-between gap-6 px-4 py-5 md:px-6">
        {/* No logo yet: the name in Bricolage Grotesque, title style. */}
        <a href="/" className="font-display text-title text-ink">
          Minutely
        </a>
        <nav aria-label="Main" className="flex items-center gap-2 md:gap-6">
          <ul className="hidden items-center gap-6 sm:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-target items-center text-body text-ink hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button>Sign in</Button>
        </nav>
      </div>
    </header>
  )
}
