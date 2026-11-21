import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import Thumb from '../components/Thumb'
import { ArrowUpRight } from '../components/Icons'
import { projects } from '../data'

// Every project thumbnail uses the same 16:9 canvas (aspect-video), so all rows line up.
// all=false  -> 3 cards (Home overview)
// all=true   -> every card (dedicated view)
export default function Projects({ all = false, onNavigate }) {
  const list = all ? projects : projects.slice(0, 3)
  return (
    <section className="mb-24">
      <SectionHeading
        title="projects"
        subtitle="Identity systems and product interfaces built from scratch to launch."
        onClick={all ? undefined : () => onNavigate('projects')}
      />
      <ul>
        {list.map((p, i) => (
          <Reveal as="li" key={p.title} delay={Math.min(i, 5) * 0.08}>
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-5 py-3.5 pl-2 pr-1 focus-visible:outline-2 focus-visible:outline-accent"
            >
              {/* True 16:9 thumbnail on every screen size. Width is the only thing that changes;
                  the height always follows from aspect-video. The media is absolutely positioned
                  inside, so the image's own pixel size can never override the ratio. */}
              <div className="relative aspect-video w-[132px] shrink-0 overflow-hidden rounded-xl ring-1 ring-white/15 transition duration-500 group-hover:-translate-y-1 sm:w-[176px]">
                <div className="absolute inset-0">
                  <Thumb item={p} />
                </div>
              </div>
              <div className="min-w-0 flex-1 pt-1">
                <h3 className="text-xl font-semibold leading-tight">{p.title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-neutral-500">
                  {p.meta.map((m) => (
                    <span key={m} className="block">
                      {m}
                    </span>
                  ))}
                </p>
              </div>
              <ArrowUpRight className="mt-2 h-4 w-4 shrink-0 text-accent transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        ))}
      </ul>
      {!all && projects.length > 3 && (
        <Reveal className="mt-6 pl-2">
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs text-neutral-300 transition hover:border-accent hover:text-white"
          >
            View all projects ({projects.length}) <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
          </button>
        </Reveal>
      )}
    </section>
  )
}
