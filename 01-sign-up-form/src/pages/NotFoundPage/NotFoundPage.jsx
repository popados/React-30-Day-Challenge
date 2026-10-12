import { Link } from 'react-router'
import { Icon } from '@/components/Icon'

export function NotFoundPage() {
  return (
    <main className="mx-auto flex max-w-card flex-col gap-4 px-4 py-12">
      <h1 className="font-serif text-heading-lg">Page not found</h1>
      <p className="text-body text-graphite">
        This page doesn't exist or has moved. Check the address, or go back to the start.
      </p>
      <Link
        to="/"
        className="inline-flex min-h-target items-center gap-2 text-link underline underline-offset-2"
      >
        Go to the home page
        <Icon name="arrow-right" />
      </Link>
    </main>
  )
}
