import { motion } from 'motion/react'
import { BriefcaseIcon, FolderIcon, HomeIcon, ImageIcon, WrenchIcon } from './Icons'

const items = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'projects', label: 'Projects', Icon: FolderIcon },
  { id: 'works', label: 'Works', Icon: ImageIcon },
  { id: 'experiences', label: 'Experiences', Icon: BriefcaseIcon },
  { id: 'tools', label: 'Tools', Icon: WrenchIcon },
]

// Top-center pill on desktop, bottom-center on mobile.
export default function Navbar({ view, onNavigate }) {
  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 lg:bottom-auto lg:top-8"
    >
      <ul className="flex items-center gap-1 rounded-2xl border border-white/5 bg-[#1d1c1b]/85 p-1.5 shadow-2xl shadow-black/40 backdrop-blur-md">
        {items.map(({ id, label, Icon }) => {
          const active = view === id
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => onNavigate(id)}
                aria-label={label}
                aria-current={active ? 'page' : undefined}
                className={`group relative grid h-10 w-10 cursor-pointer place-items-center rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
                  active ? 'text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl bg-white/12 ring-1 ring-accent/60"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon className="relative h-[18px] w-[18px]" />
                <span className="pointer-events-none absolute top-full mt-2 hidden whitespace-nowrap rounded-md bg-white px-2 py-1 text-[11px] font-medium text-black opacity-0 transition-opacity group-hover:opacity-100 lg:block">
                  {label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
