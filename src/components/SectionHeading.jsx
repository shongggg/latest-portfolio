import Reveal from './Reveal'

// If `onClick` is given the heading becomes a button that opens the full view.
// Hover: gentle fade + scale-down signals that it is clickable.
export default function SectionHeading({ title, subtitle, onClick }) {
  return (
    <Reveal className="mb-10">
      <h2 className="text-[clamp(2.5rem,12vw,3.75rem)] font-semibold leading-none tracking-tight">
        {onClick ? (
          <button
            type="button"
            onClick={onClick}
            aria-label={`Open all ${title}`}
            className="origin-left cursor-pointer text-left transition duration-300 ease-out hover:scale-[0.97] hover:opacity-60 active:scale-[0.94] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            .{title}
          </button>
        ) : (
          <span>.{title}</span>
        )}
      </h2>
      <p className="mt-3 max-w-[460px] text-sm leading-relaxed text-neutral-400">{subtitle}</p>
    </Reveal>
  )
}
