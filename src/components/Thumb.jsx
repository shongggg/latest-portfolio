// Shows the real image if provided, otherwise a gradient mock so the layout still looks right.
// fit="cover" fills the frame (default), fit="contain" shows the whole image with no cropping.
export default function Thumb({ item, fit = 'cover' }) {
  if (item.image) {
    return (
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover object-top'}`}
      />
    )
  }
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: item.bg }} role="img" aria-label={item.title}>
      <div className="absolute inset-x-[14%] top-[24%] -bottom-[10%] rounded-lg bg-white/90 p-2 shadow-xl">
        <div className="h-1.5 w-1/2 rounded bg-black/70" />
        <div className="mt-1.5 h-1 w-3/4 rounded bg-black/20" />
        <div className="mt-1 h-1 w-2/3 rounded bg-black/20" />
      </div>
    </div>
  )
}
