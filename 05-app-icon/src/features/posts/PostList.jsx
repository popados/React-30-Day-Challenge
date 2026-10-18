import { Alert } from '@/components/Alert'
import { Icon } from '@/components/Icon'
import { usePosts } from '@/features/posts/usePosts'

export function PostList() {
  const { data: posts, isPending, isError, error } = usePosts()

  if (isPending) {
    return (
      <div aria-busy="true" aria-label="Loading sources" className="flex flex-col gap-3">
        {[0, 1, 2].map((k) => (
          <span key={k} className="block h-3 w-3/4 rounded-sm bg-paper-deep" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <Alert tone="error" title="We couldn't load your sources.">
        {error.message}. Check your connection and reload the page.
      </Alert>
    )
  }

  if (posts.length === 0) {
    return <p className="text-body text-graphite">No sources yet.</p>
  }

  return (
    <ul className="m-0 flex list-none flex-col divide-y divide-hairline p-0">
      {posts.map((post) => (
        <li key={post.id} className="flex items-start gap-3 py-3">
          <Icon name="file-text" className="mt-0.5 text-graphite" />
          <span className="text-body">{post.title}</span>
        </li>
      ))}
    </ul>
  )
}
