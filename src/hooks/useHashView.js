import { useCallback, useEffect, useState } from 'react'

export const VIEWS = ['home', 'projects', 'works', 'experiences', 'tools']

const read = () => {
  const h = window.location.hash.replace('#', '')
  return VIEWS.includes(h) ? h : 'home'
}

// Keeps the active section in sync with the URL hash,
// so the browser back/forward buttons and shared links work.
export function useHashView() {
  const [view, setView] = useState(read)

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    const onChange = () => setView(read())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const go = useCallback((id) => {
    if (id === read()) return
    window.location.hash = id
  }, [])

  return { view, go }
}
