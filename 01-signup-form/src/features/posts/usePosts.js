import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from '@/features/posts/api'

export const postKeys = {
  all: ['posts'],
  list: (limit) => ['posts', 'list', { limit }],
}

export function usePosts({ limit = 5 } = {}) {
  return useQuery({
    queryKey: postKeys.list(limit),
    queryFn: () => fetchPosts({ limit }),
  })
}
