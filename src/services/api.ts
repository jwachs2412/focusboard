let onUnauthorized: (() => void) | null = null

export const setUnauthorizedHandler = (handler: () => void) => {
  onUnauthorized = handler
}

const API_URL = import.meta.env.VITE_API_URL

export const apiFetch = async (endpoint: string, options: RequestInit = {}, token?: string) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  })

  if (!response.ok) {
    if (response.status === 401 && onUnauthorized) {
      onUnauthorized()
    }

    throw new Error(`HTTP error! status: ${response.status}`)
  }

  if (response.status === 204) return null

  return response.json()
}
