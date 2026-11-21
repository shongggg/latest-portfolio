import { useEffect, useState } from 'react'
import Reveal from '../components/Reveal'
import { useTypewriter } from '../hooks/useTypewriter'
import Scramble from '../components/Scramble'
import { useReduced } from '../motion'
import { useVisitCount } from '../hooks/useVisitCount'
import { heroText, roles, stats, visitCounter } from '../data'

const rand = () => String(Math.floor(Math.random() * 10))
let played = false // the slot effect plays once per page load

// Slot-machine counter: every digit flickers through random numbers,
// then locks in one by one (left to right) on the real value.
function SlotNumber({ to, duration = 1500 }) {
  const reduced = useReduced()
  const target = String(to)
  const [text, setText] = useState(() =>
    reduced || played ? target : target.replace(/\d/g, rand),
  )

  useEffect(() => {
    if (reduced || played) return
    const start = performance.now()
    const id = setInterval(() => {
      const t = performance.now() - start
      let out = ''
      let done = true
      for (let i = 0; i < target.length; i++) {
        const settleAt = duration * (0.55 + (0.45 * (i + 1)) / target.length)
        if (t >= settleAt) out += target[i]
        else {
          out += rand()
          done = false
        }
      }
      setText(out)
      if (done) {
        played = true
        clearInterval(id)
      }
    }, 55)
    return () => clearInterval(id)
  }, [target, duration, reduced])

  return (
    <span className="tabular-nums" aria-label={target}>
      {text}
    </span>
  )
}

function VisitCounter() {
  const count = useVisitCount()
  return (
    <Reveal delay={0.2} className="mt-9">
      <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-3 pr-4 text-xs text-neutral-400">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <span className="min-w-[1.5ch] text-sm font-semibold text-white">
          <Scramble value={count} />
        </span>
        {visitCounter.label}
      </div>
    </Reveal>
  )
}

export default function Hero() {
  const reduced = useReduced()
  const text = useTypewriter(roles, { enabled: !reduced })

  return (
    <section className="mb-24">
      <h1 className="text-[clamp(2rem,9.5vw,4.5rem)] font-bold uppercase leading-[0.98] tracking-tight">
        <span className="block h-[1em] whitespace-nowrap" aria-label={roles.join(', ')}>
          {text}
          {!reduced && <span className="caret ml-1 inline-block h-[0.78em] w-[3px] translate-y-[0.06em] bg-accent" />}
        </span>
        <span className="mt-[0.04em] block text-dim">Designer</span>
      </h1>

      <Reveal delay={0.1}>
        <p className="mt-6 max-w-[380px] text-sm leading-relaxed text-neutral-400">{heroText}</p>
      </Reveal>

      <dl className="mt-9 flex gap-9">
        {stats.map((s) => (
          <div key={s.label}>
            <dd className="text-5xl font-semibold leading-none tracking-tight">
              <SlotNumber to={s.value} />
            </dd>
            <dt className="mt-2 max-w-[90px] text-[10px] uppercase leading-snug tracking-wider text-neutral-400">
              {s.label}
            </dt>
          </div>
        ))}
      </dl>

      <VisitCounter />
    </section>
  )
}
