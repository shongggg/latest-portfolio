import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { ArrowUpRight } from '../components/Icons'
import { tools } from '../data'

const HOME_LIMIT = 6

// Simple vector/lettermarks. Swap for official logos (PNG/SVG) whenever you like.
const Letters = ({ children, color = '#fff', className = '' }) => (
  <span className={`font-bold leading-none ${className}`} style={{ color }}>
    {children}
  </span>
)

const marks = {
  figma: {
    bg: '#fff',
    node: (
      <svg viewBox="0 0 38 57" className="h-6 w-auto">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1abcfe" />
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0acf83" />
        <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#ff7262" />
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#f24e1e" />
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff" />
      </svg>
    ),
  },
  canva: {
    bg: 'linear-gradient(135deg,#00c4cc,#7d2ae8)',
    node: <Letters className="font-serif text-xl italic">C</Letters>,
  },
  affinity: {
    bg: 'linear-gradient(135deg,#e0178d,#2d6cdf)',
    node: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="#fff">
        <path d="M12 3 2.5 21h4l1.5-3h8l1.5 3h4L12 3zm0 7.5L14.3 15H9.7L12 10.5z" />
      </svg>
    ),
  },
  capcut: {
    bg: '#000',
    node: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8.5 12 4l8 4.5M4 15.5 12 20l8-4.5M4 8.5v7M20 8.5v7" />
      </svg>
    ),
  },
  illustrator: { bg: '#2b0b00', node: <Letters color="#ff9a00" className="text-[15px]">Ai</Letters> },
  lightroom: { bg: '#001e36', node: <Letters color="#31a8ff" className="text-[15px]">Lr</Letters> },
  pixellab: {
    bg: 'linear-gradient(135deg,#ff5f6d,#ffc371)',
    node: <Letters className="text-[15px]">Px</Letters>,
  },
  claude: {
    bg: '#d97757',
    node: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
        {[0, 45, 90, 135].map((r) => (
          <line key={r} x1="12" y1="3.5" x2="12" y2="20.5" transform={`rotate(${r} 12 12)`} />
        ))}
      </svg>
    ),
  },
  gemini: {
    bg: '#fff',
    node: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <defs>
          <linearGradient id="gemini-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4285f4" />
            <stop offset="0.5" stopColor="#9b72cb" />
            <stop offset="1" stopColor="#d96570" />
          </linearGradient>
        </defs>
        <path d="M12 2c.6 5.6 4.4 9.4 10 10-5.6.6-9.4 4.4-10 10-.6-5.6-4.4-9.4-10-10 5.6-.6 9.4-4.4 10-10z" fill="url(#gemini-grad)" />
      </svg>
    ),
  },
  trello: {
    bg: '#0079bf',
    node: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#fff" />
        <rect x="6" y="6" width="5" height="10" rx="1" fill="#0079bf" />
        <rect x="13" y="6" width="5" height="6" rx="1" fill="#0079bf" />
      </svg>
    ),
  },
  drive: {
    bg: '#fff',
    node: (
      <svg viewBox="0 0 87.3 78" className="h-5 w-auto">
        <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
        <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0-1.2 4.5h27.5z" fill="#00ac47" />
        <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.5l5.85 11.5z" fill="#ea4335" />
        <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
        <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc" />
        <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00" />
      </svg>
    ),
  },
  photopea: { bg: '#18a497', node: <Letters className="text-xl">p</Letters> },
}

export default function Tools({ all = false, onNavigate }) {
  const list = all ? tools : tools.slice(0, HOME_LIMIT)
  return (
    <section className="mb-24">
      <SectionHeading
        title="tools"
        subtitle="Instruments for moving from rough marks to interactive systems."
        onClick={all ? undefined : () => onNavigate('tools')}
      />
      <ul className="grid grid-cols-1 gap-x-10 gap-y-6 pl-2 sm:grid-cols-2">
        {list.map((t, i) => {
          const m = marks[t.icon]
          return (
            <Reveal as="li" key={t.name} delay={Math.min(i, 5) * 0.06} className="flex items-center gap-4">
              <div
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                style={{ background: m?.bg ?? '#fff' }}
              >
                {m?.node ?? <Letters color="#111">{t.name[0]}</Letters>}
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold leading-tight">{t.name}</h3>
                <p className="mt-0.5 text-xs text-neutral-500">{t.desc}</p>
              </div>
            </Reveal>
          )
        })}
      </ul>
      {!all && tools.length > HOME_LIMIT && (
        <Reveal className="mt-8 pl-2">
          <button
            type="button"
            onClick={() => onNavigate('tools')}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs text-neutral-300 transition hover:border-accent hover:text-white"
          >
            View all tools ({tools.length}) <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
          </button>
        </Reveal>
      )}
    </section>
  )
}
