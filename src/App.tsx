import { useEffect, useState, useRef, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './sections/Navigation'
import HeroNew from './sections/HeroNew'
import Footer from './sections/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './pages/NotFound'
import { useReducedMotion } from './hooks/useReducedMotion'

// Lazy load all sections below the fold for performance
const TrustStripNew = lazy(() => import('./sections/TrustStripNew'))
const DualPositioning = lazy(() => import('./sections/DualPositioning'))
const AboutSection = lazy(() => import('./sections/AboutSection'))
const SkillsMatrix = lazy(() => import('./sections/SkillsMatrix'))
const CaseStudiesNew = lazy(() => import('./sections/CaseStudiesNew'))
const CodeToCash = lazy(() => import('./sections/CodeToCash'))
const PerformanceDashboardNew = lazy(() => import('./sections/PerformanceDashboardNew'))
const ProcessSection = lazy(() => import('./sections/ProcessSection'))
const TestimonialsSection = lazy(() => import('./sections/TestimonialsSection'))
const WritingSection = lazy(() => import('./sections/WritingSection'))
const SecondaryProjectsNew = lazy(() => import('./sections/SecondaryProjectsNew'))
const ContactSectionNew = lazy(() => import('./sections/ContactSectionNew'))

gsap.registerPlugin(ScrollTrigger)

function SectionLoader() {
  return (
    <div className="py-32 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin" />
    </div>
  )
}

function CustomCursor({ variant }: { variant: string }) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15

      if (cursorRef.current) {
        const offset = variant === 'hover' ? 32 : 16
        cursorRef.current.style.transform = `translate(${posRef.current.x - offset}px, ${posRef.current.y - offset}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [variant])

  const size = variant === 'hover' ? 64 : 32
  const bg = variant === 'hover'
    ? 'rgba(212, 175, 55, 0.1)'
    : 'rgba(212, 175, 55, 0.3)'
  const border = variant === 'hover' ? '1px solid rgba(212, 175, 55, 0.5)' : 'none'

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block backdrop-blur-[2px]"
      style={{
        width: size,
        height: size,
        backgroundColor: bg,
        border,
        transition: 'width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border 0.3s ease',
        willChange: 'transform',
      }}
    />
  )
}

function HomePage() {
  const reduced = useReducedMotion()
  const [cursorVariant, setCursorVariant] = useState('default')

  useEffect(() => {
    if (reduced) {
      ScrollTrigger.getAll().forEach(st => st.kill())
      return
    }

    const timer = setTimeout(() => ScrollTrigger.refresh(), 500)
    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [reduced])

  return (
    <>
      <CustomCursor variant={cursorVariant} />
      <ScrollProgress />
      <Navigation />

      <main>
        <div
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <HeroNew />
        </div>

        <Suspense fallback={<SectionLoader />}>
          <div
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <TrustStripNew />
            <DualPositioning />
            <AboutSection />
            <SkillsMatrix />
            <CaseStudiesNew />
            <CodeToCash />
            <PerformanceDashboardNew />
            <ProcessSection />
            <TestimonialsSection />
            <WritingSection />
            <SecondaryProjectsNew />
            <ContactSectionNew />
          </div>
        </Suspense>
      </main>

      <Footer />
      <GlobalStyles />
    </>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#050505] selection:bg-accent-gold selection:text-black cursor-none md:cursor-none">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ErrorBoundary>
  )
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[101] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-accent-gold to-accent-gold-hover transition-[width] duration-100 ease-linear"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}

function GlobalStyles() {
  return (
    <style>{`
      @keyframes gradient-x {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      .animate-gradient-x {
        background-size: 200% 200%;
        animation: gradient-x 15s ease infinite;
      }
      html {
        scroll-behavior: smooth;
      }
      body {
        overflow-x: hidden;
      }
      .noise-overlay {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
        background-repeat: repeat;
        background-size: 200px 200px;
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `}</style>
  )
}
