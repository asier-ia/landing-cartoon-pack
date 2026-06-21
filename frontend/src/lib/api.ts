export interface ParticipantPublic {
  id: number
  name: string
  flavor_voted: string
  created_at: string
}

export interface SweepstakesStatus {
  deadline: string | null
  total_participants: number
  has_winner: boolean
  winner_name: string | null
}

export interface SearchResult {
  exists: boolean
  name: string | null
  flavor_voted: string | null
}

export interface DrawResponse {
  winner_id: number
  winner_name: string
}

export interface CreateParticipantResponse {
  success: boolean
  name: string
  is_returning: boolean
}

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(body.detail || 'Error de conexión')
  }
  return res.json()
}

export function createParticipant(data: {
  name: string
  email: string
  code: string
  flavor_voted: string
}) {
  return api<CreateParticipantResponse>('/api/participants', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function fetchRecentParticipants(limit = 10) {
  return api<ParticipantPublic[]>(`/api/participants/recent?limit=${limit}`)
}

export function searchParticipant(name: string) {
  return api<SearchResult>(`/api/participants/search?name=${encodeURIComponent(name)}`)
}

export function fetchSweepstakesStatus() {
  return api<SweepstakesStatus>('/api/sweepstakes/status')
}

export function drawWinner() {
  return api<DrawResponse>('/api/sweepstakes/draw', { method: 'POST' })
}
