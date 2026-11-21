import { useEffect, useState } from 'react'

// Types a word, holds, deletes it, then moves to the next one.
export function useTypewriter(words, { type = 85, del = 45, hold = 1500, gap = 300, enabled = true } = {}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    if (!enabled) return
    const word = words[index]
    let t
    if (phase === 'typing') {
      if (text.length < word.length) t = setTimeout(() => setText(word.slice(0, text.length + 1)), type)
      else t = setTimeout(() => setPhase('deleting'), hold)
    } else if (text.length > 0) {
      t = setTimeout(() => setText(text.slice(0, -1)), del)
    } else {
      t = setTimeout(() => {
        setIndex((index + 1) % words.length)
        setPhase('typing')
      }, gap)
    }
    return () => clearTimeout(t)
  }, [text, phase, index, words, type, del, hold, gap, enabled])

  return enabled ? text : words[0]
}
