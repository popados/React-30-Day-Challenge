import { apiGet } from '@/lib/apiClient'

// Raw API calls for this feature. Components never call these directly;
// they use the hooks in usePosts.js.
export function fetchPosts({ limit = 5 } = {}) {
  return apiGet(`/posts?_limit=${limit}`)
}
