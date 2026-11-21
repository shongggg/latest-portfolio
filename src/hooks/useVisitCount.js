import { useEffect, useState } from 'react'
import { visitCounter } from '../data'

const COOLDOWN_MS = 24 * 60 * 60 * 1000 // same browser = 1 visit per 24 hours, across all tabs
const LOCAL_KEY = 'portfolio:visits' // this browser's own running total (fallback)
const HIT_KEY = 'portfolio:last-hit' // when this browser last counted on the server
const LOCAL_HIT_KEY = 'portfolio:last-local-hit' // same, for the fallback counter
const OWNER_KEY = 'portfolio:owner' // set once by opening the site with ?owner=1

// Storage can be blocked (private mode etc.), so every access is wrapped.
const read = (key) => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}
const write = (key, value) => {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* ignore */
  }
}

const isOwner = () => {
  try {
    if (new URLSearchParams(window.location.search).get('owner') === '1') write(OWNER_KEY, '1')
  } catch {
    /* ignore */
  }
  return read(OWNER_KEY) === '1'
}

const dueForCount = (key) => !isOwner() && Date.now() - (Number(read(key)) || 0) > COOLDOWN_MS
const markCounted = (key) => write(key, String(Date.now()))

// Fallback: counts visits made from THIS browser only.
function localCount() {
  let n = Number(read(LOCAL_KEY)) || 0
  if (dueForCount(LOCAL_HIT_KEY)) {
    n += 1
    write(LOCAL_KEY, String(n))
    markCounted(LOCAL_HIT_KEY)
  }
  return Math.max(n, 1)
}

async function remoteCount(endpoint, hit) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), 4000)
  try {
    const res = await fetch(hit ? `${endpoint}?hit=1` : endpoint, { signal: ctrl.signal, cache: 'no-store' })
    if (!res.ok) throw new Error('bad response')
    const n = Number((await res.json()).count)
    if (!Number.isFinite(n)) throw new Error('bad payload')
    return n
  } finally {
    clearTimeout(timer)
  }
}

// Returns null while loading, then the number of visits.
export function useVisitCount() {
  const [count, setCount] = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      let n = null
      if (visitCounter.endpoint) {
        const hit = dueForCount(HIT_KEY)
        if (hit) markCounted(HIT_KEY)
        try {
          n = await remoteCount(visitCounter.endpoint, hit)
        } catch {
          n = null // endpoint missing (e.g. local dev) -> fall back to this browser's count
        }
      }
      if (n === null) n = localCount()
      if (!cancelled) setCount(n)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return count
}