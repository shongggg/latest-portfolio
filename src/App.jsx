import { useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { ReactLenis, useLenis } from 'lenis/react'
import Navbar from './components/Navbar'
import ProfileCard from './components/ProfileCard'
import SpiralBackground from './components/SpiralBackground'
import Footer from './components/Footer'
import { ArrowLeft } from './components/Icons'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Works from './sections/Works'
import Experiences from './sections/Experiences'
import Tools from './sections/Tools'
import { useHashView } from './hooks/useHashView'
import { RESPECT_REDUCED_MOTION, prefersReduced } from './motion'


function ViewContent({ view, go }) {
  switch (view) {
    case 'projects':
      return <Projects all onNavigate={go} />
    case 'works':
      return <Works all onNavigate={go} />
    case 'experiences':
      return <Experiences all onNavigate={go} />
    case 'tools':
      return <Tools all onNavigate={go} />
    default:
      // Home overview: 3 projects + 3 works, everything else in full
      return (
        <>
          <Hero />
          <Projects onNavigate={go} />
          <Works onNavigate={go} />
          <Experiences onNavigate={go} />
          <Tools onNavigate={go} />
        </>
      )
  }
}

function Shell() {
  const { view, go } = useHashView()
  const lenis = useLenis()

  // Footer is position:fixed, so the page card needs a bottom margin equal to its height.
  const footerRef = useRef(null)
  const [footerH, setFooterH] = useState(0)
  useLayoutEffect(() => {
    const el = footerRef.current
    if (!el) return
    const measure = () => setFooterH(el.offsetHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
  }

  return (
    <>
      <Navbar view={view} onNavigate={go} />

      {/* The page "card": sits above the fixed footer and slides up to reveal it */}
      <div
        className="relative z-10 min-h-screen rounded-b-[2.5rem] bg-page"
        style={{ marginBottom: footerH, clipPath: 'inset(0 round 0 0 2.5rem 2.5rem)' }}
      >
        <SpiralBackground view={view} />

        <div className="relative mx-auto flex max-w-[960px] flex-col gap-6 px-5 pb-28 pt-6 lg:flex-row lg:gap-12 lg:px-6 lg:pb-32 lg:pt-[120px]">
          <aside className="lg:w-[272px] lg:shrink-0">
            <div className="lg:sticky lg:top-[120px]">
              <ProfileCard />
            </div>
          </aside>

          <main className="min-w-0 flex-1 lg:max-w-[600px]">
            <AnimatePresence mode="wait" onExitComplete={toTop}>
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {view !== 'home' && (
                  <button
                    type="button"
                    onClick={() => go('home')}
                    className="mb-10 inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs text-neutral-300 transition hover:border-accent hover:text-white"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
                  </button>
                )}
                <ViewContent view={view} go={go} />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      <Footer ref={footerRef} />
    </>
  )
}

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: !prefersReduced }}>
      <MotionConfig reducedMotion={RESPECT_REDUCED_MOTION ? 'user' : 'never'}>
        <Shell />
      </MotionConfig>
    </ReactLenis>
  )
}
