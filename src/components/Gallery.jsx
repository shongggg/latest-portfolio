import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { useLenis } from 'lenis/react'

const slideVariants = {
  enter: (d) => ({ x: d > 0 ? 80 : -80, opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (d) => ({ x: d > 0 ? -80 : 80, opacity: 0, scale: 0.96 }),
}

const Chevron = ({ dir }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={dir === 'left' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} />
  </svg>
)

// Fullscreen carousel for a stack of images (used by the Works section).
// Controls: arrows, dots, swipe/drag, keyboard arrows, Esc, tap outside.
export default function Gallery({ title, category, slides, onClose }) {
  const lenis = useLenis()
  const [[index, dir], setPage] = useState([0, 0])
  const n = slides.length

  const paginate = useCallback((d) => setPage(([i]) => [(i + d + n) % n, d]), [n])

  useEffect(() => {
    lenis?.stop()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') paginate(1)
      if (e.key === 'ArrowLeft') paginate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [lenis, onClose, paginate])

  const slide = slides[index]

  // Portal to <body>: the page card is clipped, which would cut off a fixed modal inside it.
  return createPortal(
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery`}
    >
      <div className="my-auto w-full max-w-[560px]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between gap-3 px-1">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{title}</p>
            <p className="truncate text-xs text-neutral-400">{category}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs tabular-nums text-neutral-400">
              {index + 1} / {n}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={index}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.35}
              onDragEnd={(_, { offset, velocity }) => {
                if (offset.x < -80 || velocity.x < -500) paginate(1)
                else if (offset.x > 80 || velocity.x > 500) paginate(-1)
              }}
              className="flex cursor-grab items-center justify-center active:cursor-grabbing"
            >
              {slide.image ? (
                <img
                  src={slide.image}
                  alt={`${title}, image ${index + 1} of ${n}`}
                  draggable={false}
                  className="max-h-[74vh] w-auto max-w-full select-none rounded-xl object-contain"
                />
              ) : (
                <div
                  className="grid w-[min(80vw,380px)] select-none place-items-center rounded-xl text-sm font-medium text-white/80"
                  style={{ aspectRatio: '4 / 5', background: slide.bg }}
                >
                  {slide.label}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {n > 1 && (
            <>
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
              >
                <Chevron dir="left" />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next image"
                className="absolute right-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
              >
                <Chevron dir="right" />
              </button>
            </>
          )}
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={() => setPage([i, i > index ? 1 : -1])}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-accent' : 'w-1.5 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>,
    document.body,
  )
}
