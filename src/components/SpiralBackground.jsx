import { useEffect, useMemo } from 'react'
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { VIEWS } from '../hooks/useHashView'
import { useReduced } from '../motion'

const ORANGE = '#e8542c'

// Idle rotation in degrees per second (subtle), and how much scroll speed adds on top.
const BASE_SPEED = 3.5
const MAX_BOOST = 80

// Lemniscate (infinity) path, stretched and tilted to look like a ribbon.
function loop(a, stretch) {
  const pts = []
  for (let i = 0; i <= 160; i++) {
    const t = (i / 160) * Math.PI * 2
    const d = 1 + Math.sin(t) ** 2
    const x = 400 + (a * Math.cos(t)) / d
    const y = 400 + (a * stretch * Math.sin(t) * Math.cos(t)) / d
    pts.push(`${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return pts.join(' ') + 'Z'
}

// Fan of rotated ellipses = swirling "spiral" of thin lines.
function SwirlSvg() {
  const lines = useMemo(() => Array.from({ length: 28 }, (_, i) => i), [])
  return (
    <svg viewBox="0 0 800 800" className="h-full w-full" fill="none">
      <g stroke="#fff">
        {lines.map((i) => (
          <ellipse
            key={i}
            cx="400"
            cy="400"
            rx={370 - i * 3.2}
            ry={250 - i * 1.6}
            transform={`rotate(${i * 3.4} 400 400)`}
            strokeWidth="1"
            strokeOpacity={0.11 - i * 0.0022}
          />
        ))}
      </g>
      <ellipse
        className="orbit"
        cx="400"
        cy="400"
        rx="370"
        ry="250"
        pathLength="1000"
        strokeDasharray="46 954"
        stroke={ORANGE}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <ellipse
        className="orbit"
        style={{ animationDuration: '26s', animationDirection: 'reverse' }}
        cx="400"
        cy="400"
        rx="340"
        ry="230"
        transform="rotate(20 400 400)"
        pathLength="1000"
        strokeDasharray="30 970"
        stroke={ORANGE}
        strokeOpacity="0.7"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="716" cy="560" r="3.5" fill={ORANGE} />
    </svg>
  )
}

function InfinitySvg() {
  const paths = useMemo(
    () => Array.from({ length: 16 }, (_, i) => ({ d: loop(330 - i * 4, 1.7), rot: -62 + i * 1.7, o: 0.12 - i * 0.004 })),
    [],
  )
  return (
    <svg viewBox="0 0 800 800" className="h-full w-full" fill="none">
      <g stroke="#fff">
        {paths.map((p, i) => (
          <path key={i} d={p.d} transform={`rotate(${p.rot} 400 400)`} strokeWidth="1" strokeOpacity={p.o} />
        ))}
      </g>
      <path
        className="orbit"
        d={paths[0].d}
        transform={`rotate(${paths[0].rot} 400 400)`}
        pathLength="1000"
        strokeDasharray="40 960"
        stroke={ORANGE}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="150" cy="520" r="3.5" fill={ORANGE} />
    </svg>
  )
}

export default function SpiralBackground({ view }) {
  const reduced = useReduced()

  // Scroll velocity, smoothed so the extra speed fades out after you stop scrolling.
  const { scrollY } = useScroll()
  const smoothVelocity = useSpring(useVelocity(scrollY), { stiffness: 60, damping: 25 })

  // One angle that keeps growing: always turning on its own, faster while scrolling.
  const angle = useMotionValue(0)
  useAnimationFrame((_, delta) => {
    if (reduced) return
    const v = Math.min(Math.abs(smoothVelocity.get()), 4000)
    const boost = Math.min(v * 0.02, MAX_BOOST)
    angle.set(angle.get() + ((BASE_SPEED + boost) * delta) / 1000)
  })

  // Extra shift every time the section changes
  const shift = useMotionValue(VIEWS.indexOf(view) * 38)
  useEffect(() => {
    const c = animate(shift, VIEWS.indexOf(view) * 38, {
      duration: reduced ? 0 : 1.6,
      ease: [0.22, 1, 0.36, 1],
    })
    return () => c.stop()
  }, [view, reduced, shift])

  const rotA = useTransform([angle, shift], ([a, h]) => a + h)
  const rotB = useTransform([angle, shift], ([a, h]) => -(a * 0.75) - h * 0.8)
  const xA = useTransform(shift, (h) => h * -1.5)
  const xB = useTransform(shift, (h) => h * 1.2)

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        style={{ rotate: rotA, x: xA }}
        className="absolute -right-[300px] top-[40px] h-[620px] w-[620px] lg:h-[900px] lg:w-[900px]"
      >
        <SwirlSvg />
      </motion.div>

      <motion.div
        style={{ rotate: rotB, x: xB }}
        className="absolute -bottom-[220px] -left-[320px] h-[600px] w-[600px] lg:h-[820px] lg:w-[820px]"
      >
        <InfinitySvg />
      </motion.div>
    </div>
  )
}
