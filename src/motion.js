import { useReducedMotion } from 'motion/react'

// ---------------------------------------------------------------
//  Set to true before launch if you want the site to obey the
//  visitor's "reduce motion" system setting (recommended for
//  accessibility). While false, the typewriter, counters, spiral
//  and marquee always animate, even if your OS has animations off.
// ---------------------------------------------------------------
export const RESPECT_REDUCED_MOTION = false

export const prefersReduced =
  RESPECT_REDUCED_MOTION &&
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useReduced() {
  const r = useReducedMotion()
  return RESPECT_REDUCED_MOTION && !!r
}
