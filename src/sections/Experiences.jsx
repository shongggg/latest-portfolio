import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { experiences } from '../data'

export default function Experiences({ all = false, onNavigate }) {
  return (
    <section className="mb-24">
      <SectionHeading
        title="experiences"
        subtitle="Roles, teams, and environments where my craft has been tested."
        onClick={all ? undefined : () => onNavigate('experiences')}
      />
      <ol className="space-y-10 pl-2">
        {experiences.map((e, i) => (
          <Reveal as="li" key={e.role + e.org} delay={Math.min(i, 5) * 0.08}>
            <h3 className="text-xl font-semibold leading-snug">
              {e.role} | {e.org}
            </h3>
            <p className="mt-2 max-w-[420px] text-[13px] leading-relaxed text-neutral-400">{e.text}</p>
            <p className="mt-3 text-xs text-neutral-500">{e.date}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
