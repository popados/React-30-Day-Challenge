import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import { Highlight } from '@/components/Highlight'
import { Icon } from '@/components/Icon'
import { PostList } from '@/features/posts/PostList'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useCounterStore } from '@/stores/useCounterStore'

const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'App'

export function HomePage() {
  useDocumentTitle('Home')
  const count = useCounterStore((state) => state.count)
  const increment = useCounterStore((state) => state.increment)
  const reset = useCounterStore((state) => state.reset)

  return (
    <div className="min-h-screen">
      <header className="border-b border-hairline px-4 py-4 md:px-8">
        {/* No logo yet: the name in Source Serif 4, heading-md, weight 600. */}
        <span className="font-serif text-heading-md">{APP_NAME}</span>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col gap-12 px-4 py-12 md:px-8">
        <section className="flex flex-col gap-3">
          <h1 className="font-serif text-heading-lg md:text-heading-xl">
            Your research notes, in one place
          </h1>
          <p className="text-body text-graphite">
            This page shows the design system and the data patterns your project starts with.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-serif text-heading-sm">Client state</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" icon={<Icon name="notebook-pen" />} onClick={increment}>
              Add a note
            </Button>
            <Button onClick={reset} disabled={count === 0}>
              Clear notes
            </Button>
          </div>
          <Alert tone={count > 0 ? 'success' : 'info'}>
            {count > 0
              ? `You've added ${count} ${count === 1 ? 'note' : 'notes'}.`
              : 'Notes you add are counted here.'}
          </Alert>
        </section>

        <section className="flex flex-col gap-4 rounded-lg bg-paper-deep p-8">
          <h2 className="font-serif text-heading-sm">Thesis: Urban heat islands, Ch. 2</h2>
          <p className="font-serif text-note italic">
            “Surface temperatures in dense cores ran{' '}
            <Highlight>4–6 °C above the rural fringe</Highlight>, with the widest gap after sunset.”
          </p>
          <p className="text-body-sm text-graphite">Reading notes sit beside their sources.</p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-serif text-heading-sm">Server data</h2>
          <PostList />
        </section>
      </main>
    </div>
  )
}
