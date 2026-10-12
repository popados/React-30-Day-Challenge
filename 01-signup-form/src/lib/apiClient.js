// Single place for HTTP requests. Set VITE_API_URL in .env to point at your API.
const BASE_URL = import.meta.env.VITE_API_URL ?? 'https://jsonplaceholder.typicode.com'

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`)
  }
  return response.status === 204 ? null : response.json()
}

export const apiGet = (path) => request(path)
export const apiPost = (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) })
export const apiPut = (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) })
export const apiDelete = (path) => request(path, { method: 'DELETE' })
