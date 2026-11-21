import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import Thumb from '../components/Thumb'
import Gallery from '../components/Gallery'
import { ArrowUpRight } from '../components/Icons'
import { works } from '../data'

const SLIDE_GRADIENTS = [
  'linear-gradient(160deg,#6d5dfc,#2a1f78)',
  'linear-gradient(160deg,#ff7a59,#7a1f3d)',
  'linear-gradient(160deg,#1fb6a6,#0b3d4a)',
  'linear-gradient(160deg,#f2c14e,#7a4a0c)',
]

// Detects what a work contains:
//   images: ['a.png','b.png', ...]  (2 or more)  -> STACK  (stacked look + opens a carousel)
//   image: 'a.png'  (or images with 1 entry)      -> SINGLE (hover only, no click)
//   slides: 4  (placeholder demo, no files yet)   -> STACK of gradient slides
// Returns the list of slides for a stack, or null for a single image.
function getSlides(w) {
  if (Array.isArray(w.images) && w.images.length > 1) return w.images.map((image) => ({ image }))
  if (w.slides > 1) {
    return Array.from({ length: w.slides }, (_, i) => ({
      bg: SLIDE_GRADIENTS[i % SLIDE_GRADIENTS.length],
      label: `Slide ${i + 1}`,
    }))
  }
  return null
}

// Real image + no `aspect`  -> shown at its own natural ratio (nothing cropped, nothing stretched).
// `aspect` set              -> fixed frame; fit 'cover' fills it, fit 'contain' keeps the whole
//                              image visible on top of the `canvas` color (good for logos).
// No image yet              -> gradient mock using `aspect`.
function WorkMedia({ w }) {
  if (w.image && !w.aspect) {
    return <img src={w.image} alt={w.title} loading="lazy" className="block h-auto w-full" />
  }
  return (
    <div style={{ aspectRatio: w.aspect || '4 / 3' }}>
      <Thumb item={w} fit={w.fit} />
    </div>
  )
}

const LayersIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="m12 2 9 5-9 5-9-5 9-5z" />
    <path d="m3 12 9 5 9-5" />
    <path d="m3 17 9 5 9-5" />
  </svg>
)

function Caption({ w, index }) {
  return (
    <div className="mt-2.5 flex items-start justify-between gap-2">
      <div>
        <h3 className="text-[15px] font-semibold leading-tight">{w.title}</h3>
        <p className="mt-0.5 text-xs text-neutral-500">{w.category}</p>
      </div>
      <span className="text-[10px] tabular-nums text-neutral-500">{String(index + 1).padStart(2, '0')}</span>
    </div>
  )
}

// SINGLE image: hover zoom only. Not a button, no click.
function SingleCard({ w, index, delay }) {
  const item = { ...w, image: w.image ?? (w.images?.length === 1 ? w.images[0] : null) }
  return (
    <Reveal delay={delay} className="group mb-6 break-inside-avoid">
      <div className="overflow-hidden rounded-xl ring-1 ring-white/10" style={{ background: item.canvas }}>
        <div className="transition duration-700 ease-out group-hover:scale-105">
          <WorkMedia w={item} />
        </div>
      </div>
      <Caption w={w} index={index} />
    </Reveal>
  )
}

// STACK of images: layered card + count badge, clickable, opens the carousel.
function StackCard({ w, slides, index, delay, onOpen }) {
  const cover = { ...w, image: slides[0].image ?? null, bg: slides[0].bg ?? w.bg }
  return (
    <Reveal delay={delay} className="mb-6 break-inside-avoid">
      <button
        type="button"
        onClick={() => onOpen(w, slides)}
        aria-haspopup="dialog"
        aria-label={`Open ${w.title}: ${slides.length} images`}
        className="group block w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <div className="relative mb-3">
          {/* the two cards peeking out from behind */}
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl bg-white/[0.07] ring-1 ring-white/10 transition duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />
          <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-xl bg-white/[0.14] ring-1 ring-white/10 transition duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
          <div className="relative overflow-hidden rounded-xl ring-1 ring-white/15 transition duration-500 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
            <div className="transition duration-700 ease-out group-hover:scale-105">
              <WorkMedia w={cover} />
            </div>
            <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/65 px-2 py-1 text-[10px] font-medium text-white backdrop-blur">
              <LayersIcon className="h-3 w-3" />
              {slides.length}
            </span>
          </div>
        </div>
        <Caption w={w} index={index} />
      </button>
    </Reveal>
  )
}

export default function Works({ all = false, onNavigate }) {
  const list = all ? works : works.slice(0, 3)
  const [gallery, setGallery] = useState(null) // { work, slides } | null

  return (
    <section className="mb-24">
      <SectionHeading
        title="works"
        subtitle="A gallery of my work — across formats, canvases, and dimensions."
        onClick={all ? undefined : () => onNavigate('works')}
      />
      {/* two columns with different image ratios = the staggered gallery in the design */}
      <div className="columns-2 gap-5">
        {list.map((w, i) => {
          const slides = getSlides(w)
          const delay = Math.min(i, 5) * 0.08
          return slides ? (
            <StackCard
              key={w.title}
              w={w}
              slides={slides}
              index={i}
              delay={delay}
              onOpen={(work, s) => setGallery({ work, slides: s })}
            />
          ) : (
            <SingleCard key={w.title} w={w} index={i} delay={delay} />
          )
        })}
      </div>
      {!all && works.length > 3 && (
        <Reveal className="mt-4">
          <button
            type="button"
            onClick={() => onNavigate('works')}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs text-neutral-300 transition hover:border-accent hover:text-white"
          >
            View all works ({works.length}) <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
          </button>
        </Reveal>
      )}

      <AnimatePresence>
        {gallery && (
          <Gallery
            title={gallery.work.title}
            category={gallery.work.category}
            slides={gallery.slides}
            onClose={() => setGallery(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
