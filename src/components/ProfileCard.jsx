import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { DownloadIcon } from './Icons'
import { profile } from '../data'

function Photo({ className = '' }) {
  const [ok, setOk] = useState(true)
  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('')
  return (
    <div className={`overflow-hidden bg-white ${className}`}>
      {ok ? (
        <img src={profile.photo} alt={profile.name} onError={() => setOk(false)} className="h-full w-full object-cover" />
      ) : (
        <div className="grid h-full w-full place-items-center bg-neutral-800 text-xl font-semibold text-white">
          {initials}
        </div>
      )}
    </div>
  )
}

// Your personal brand logo (PNG or SVG, any size). Shows a dashed placeholder until the file exists.
// The image is absolutely positioned inside the slot, so its original pixel size can never
// stretch or collapse the box: it always scales down to fit and stays centered.
function LogoSlot({ className = '', label = true }) {
  const [ok, setOk] = useState(true)
  return (
    <div
      className={`relative grid place-items-center overflow-hidden ${
        ok ? 'bg-white/5' : 'border border-dashed border-white/25'
      } ${className}`}
    >
      {ok ? (
        <img
          src={profile.logo}
          alt="Brand logo"
          onError={() => setOk(false)}
          className="absolute inset-0 h-full w-full object-contain p-2.5"
        />
      ) : (
        <span className="text-center text-[10px] leading-tight text-neutral-500">
          {label ? 'Your logo here' : 'Logo'}
        </span>
      )}
    </div>
  )
}

// Continuous auto-scrolling skill chips.
// The top/bottom lines sit on a static wrapper and every chip has a fixed whole-pixel height,
// so the 1px borders never land on a half pixel and vanish while the page scrolls.
function Tags() {
  const list = [...profile.tags, ...profile.tags] // doubled for a seamless loop
  const mask = 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)'
  return (
    <div className="border-y border-white/30">
      <div className="overflow-hidden" style={{ maskImage: mask, WebkitMaskImage: mask }}>
        <ul className="marquee-track">
          {list.map((t, i) => (
            <li
              key={i}
              className="flex h-9 shrink-0 items-center whitespace-nowrap border-l border-white/30 px-3 font-serif text-[13px] leading-none text-white"
            >
              <span className="mr-1.5">•</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// The full card (desktop sidebar + mobile modal)
function FullCard() {
  return (
    <div className="rounded-3xl bg-black p-9">
      <Photo className="aspect-square w-full rounded-2xl" />
      <div className="mt-9 text-center">
        <h2 className="text-[22px] font-semibold leading-[1.15]">{profile.name}</h2>
        <p className="mt-3 text-[12.5px] leading-snug text-neutral-400">{profile.tagline}</p>
      </div>
      <a
        href={profile.cv}
        download
        className="mt-5 flex items-center justify-center gap-2 rounded-md bg-white py-2.5 text-[10px] font-medium uppercase tracking-wider text-black transition hover:bg-neutral-200"
      >
        Download CV <DownloadIcon className="h-3 w-3" />
      </a>
      <div className="mt-4">
        <Tags />
      </div>
      <LogoSlot className="mt-4 h-16 rounded-xl" />
    </div>
  )
}

function ProfileModal({ onClose }) {
  const lenis = useLenis()

  useEffect(() => {
    lenis?.stop()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [lenis, onClose])

  // Portal to <body>: the page card is clipped, which would cut off a fixed modal inside it.
  return createPortal(
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-black/75 p-5 backdrop-blur-sm lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Profile"
    >
      <motion.div
        className="relative my-auto w-full max-w-[340px]"
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <FullCard />
        <p className="mt-4 text-center text-xs text-neutral-400">Tap outside the card to close</p>
      </motion.div>
    </motion.div>,
    document.body,
  )
}

// Desktop: tall sticky card. Mobile: compact header that opens the full card in a modal.
export default function ProfileCard() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="hidden lg:block">
        <FullCard />
      </div>

      <div
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label="Open full profile"
        onClick={() => setOpen(true)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setOpen(true))}
        className="flex cursor-pointer items-center gap-4 rounded-3xl bg-black p-4 transition active:scale-[0.99] lg:hidden"
      >
        <Photo className="h-16 w-16 shrink-0 rounded-xl" />
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold leading-tight">{profile.name}</h2>
          <p className="mt-1 line-clamp-2 text-xs leading-snug text-neutral-400">{profile.tagline}</p>
        </div>
        <LogoSlot className="h-12 w-12 shrink-0 rounded-lg" label={false} />
      </div>

      <AnimatePresence>{open && <ProfileModal onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  )
}
