import { useEffect, useState } from 'react'
import { useReduced } from '../motion'

const rand = () => String(Math.floor(Math.random() * 10))

// Slot-machine number. While `value` is null (still loading) the digits keep spinning;
// once the value arrives they lock in one by one, left to right.
export default function Scramble({ value, duration = 1400 }) {
  const reduced = useReduced()
  const target = value == null ? null : value.toLocaleString('en-US')
  const [text, setText] = useState(target ?? '000')

  useEffect(() => {
    if (reduced) return
    const arrived = performance.now()
    const id = setInterval(() => {
      if (target === null) {
        setText(rand() + rand() + rand())
        return
      }
      const t = performance.now() - arrived
      let out = ''
      let done = true
      for (let i = 0; i < target.length; i++) {
        const ch = target[i]
        if (!/\d/.test(ch)) {
          out += ch
          continue
        }
        const settleAt = duration * (0.4 + (0.6 * (i + 1)) / target.length)
        if (t >= settleAt) out += ch
        else {
          out += rand()
          done = false
        }
      }
      setText(out)
      if (done) clearInterval(id)
    }, 55)
    return () => clearInterval(id)
  }, [target, duration, reduced])

  return (
    <span className="tabular-nums" aria-label={target ?? 'loading'}>
      {reduced ? (target ?? '–') : text}
    </span>
  )
}
