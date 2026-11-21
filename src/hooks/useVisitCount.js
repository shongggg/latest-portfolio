import { useEffect, useState } from 'react'
import { visitCounter } from '../data'

const LOCAL_KEY = 'portfolio:visits' // this browser's own running total (fallback)
const LOCAL_SESSION = 'portfolio:visit-local' // "already counted in this tab session"
const HIT_SESSION = 'portfolio:visit-hit'

// Storage can be blocked (private mode etc.), so every access is wrapped.
const read = (store, key) => {
  try {
    return store.getItem(key)
  } catch {
    return null
  }
}
const write = (store, key, value) => {
  try {
    store.setItem(key, value)
  } catch {
    /* ignore */
  }
}

// Fallback: counts visits made from THIS browser only.
function localCount() {
  let n = Number(read(localStorage, LOCAL_KEY)) || 0
  if (!read(sessionStorage, LOCAL_SESSION)) {
    n += 1
    write(localStorage, LOCAL_KEY, String(n))
    write(sessionStorage, LOCAL_SESSION, '1')
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
// A visit is counted once per browser tab session, so refreshing doesn't inflate it.
export function useVisitCount() {
  const [count, setCount] = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      let n = null
      if (visitCounter.endpoint) {
        const hit = !read(sessionStorage, HIT_SESSION)
        if (hit) write(sessionStorage, HIT_SESSION, '1')
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
