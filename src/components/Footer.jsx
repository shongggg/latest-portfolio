import { forwardRef } from 'react'
import { contact } from '../data'
import { FacebookIcon, InstagramIcon, LinkedinIcon, WhatsappIcon } from './Icons'

const socialIcons = {
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  whatsapp: WhatsappIcon,
}

// Fixed behind the page card (z-0). The card slides up to reveal it.
const Footer = forwardRef(function Footer(_, ref) {
  const rows = [
    ['Location', contact.location],
    ['Email', contact.email],
    ['Contact', contact.phone],
  ]
  return (
    <footer ref={ref} id="contact" className="fixed inset-x-0 bottom-0 z-0 bg-footer">
      <div className="mx-auto flex max-w-[960px] gap-12 px-5 pb-28 pt-16 lg:px-6 lg:pb-12 lg:pt-20">
        <div className="hidden w-[272px] shrink-0 lg:block" />
        <div className="min-w-0 flex-1">
          <h2 className="text-[clamp(2.25rem,10vw,3.75rem)] font-bold uppercase leading-[0.98] tracking-tight">
            Let&apos;s work
            <span className="block text-dim">Together</span>
          </h2>
          <p className="mt-8 max-w-[460px] text-sm leading-relaxed text-neutral-300">
            Have a project in mind or just want to say hello?
            <br />
            I&apos;d love to hear from you. Let&apos;s make something great together.
          </p>

          <dl className="mt-8 space-y-3 text-sm">
            {rows.map(([label, value]) => (
              <div key={label} className="flex items-baseline gap-8">
                <dt className="w-16 shrink-0 text-[10px] uppercase tracking-wider text-neutral-500">{label}</dt>
                <dd className="min-w-0 break-words text-neutral-200">
                  {label === 'Email' ? (
                    <a href={`mailto:${value}`} className="hover:text-accent">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-7 flex gap-3">
            {contact.socials.map((s) => {
              const Icon = socialIcons[s.id]
              return (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-[#1b1a19] text-neutral-200 transition hover:border-accent hover:text-accent"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </footer>
  )
})

export default Footer
