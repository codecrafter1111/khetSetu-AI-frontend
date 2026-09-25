const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || ''

export async function apiRequest(path, options = {}) {
  if (!baseUrl) throw new Error('Set VITE_API_BASE_URL before connecting to the API')
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
  if (!response.ok) throw new Error(`API request failed (${response.status})`)
  return response.status === 204 ? null : response.json()
}
