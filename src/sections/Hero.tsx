import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, Phone } from 'lucide-react'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const [counts, setCounts] = useState({ cpr: 0, ctr: 0, conv: 0 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          headlineRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.3'
        )
        .fromTo(
          subRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          metricsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          portraitRef.current,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 1 },
          '-=0.8'
        )

      // Animate counters
      const counterTl = gsap.timeline({ delay: 1.2 })
      counterTl.to(
        {},
        {
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: function () {
            const progress = this.progress()
            setCounts({
              cpr: parseFloat((1.47 * progress).toFixed(2)),
              ctr: parseFloat((7.85 * progress).toFixed(2)),
              conv: Math.floor(1600 * progress),
            })
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-bg-core overflow-hidden"
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#F5F5F5" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 w-full pt-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Text Content */}
          <div className="flex-1 max-w-[720px]">
            <p
              ref={labelRef}
              className="font-mono text-xs tracking-[0.08em] text-text-secondary mb-6 opacity-0"
            >
              FULL-STACK DEVELOPER & MEDIA BUYER
            </p>

            <h1
              ref={headlineRef}
              className="font-inter text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-medium text-text-primary leading-[0.95] tracking-[-0.03em] mb-6 opacity-0"
            >
              I build systems
              <br />
              that generate
              <br />
              <span className="text-accent-gold">revenue.</span>
            </h1>

            <p
              ref={subRef}
              className="text-lg sm:text-xl text-text-secondary mb-10 max-w-[480px] opacity-0"
            >
              Full-stack developer & performance media buyer.
            </p>

            {/* Metrics */}
            <div ref={metricsRef} className="flex flex-wrap gap-8 sm:gap-12 mb-10 opacity-0">
              <div>
                <div className="font-inter text-3xl sm:text-4xl font-medium text-accent-gold tracking-[-0.02em]">
                  {counts.cpr.toFixed(2)} <span className="text-lg">EGP</span>
                </div>
                <div className="font-mono text-xs text-text-muted mt-1 tracking-[0.02em]">
                  COST PER RESULT
                </div>
              </div>
              <div>
                <div className="font-inter text-3xl sm:text-4xl font-medium text-accent-gold tracking-[-0.02em]">
                  {counts.ctr.toFixed(2)}%
                </div>
                <div className="font-mono text-xs text-text-muted mt-1 tracking-[0.02em]">
                  CTR
                </div>
              </div>
              <div>
                <div className="font-inter text-3xl sm:text-4xl font-medium text-accent-gold tracking-[-0.02em]">
                  {counts.conv.toLocaleString()}+
                </div>
                <div className="font-mono text-xs text-text-muted mt-1 tracking-[0.02em]">
                  CONVERSIONS GENERATED
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0">
              <a
                href="#case-studies"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#case-studies')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent-gold text-bg-core font-inter text-sm font-medium hover:bg-accent-gold-hover transition-all duration-200 hover:-translate-y-0.5"
              >
                View Case Studies
                <ArrowRight size={16} />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 px-8 py-4 border border-border-light text-text-primary font-inter text-sm font-medium hover:border-accent-gold hover:text-accent-gold transition-all duration-200 hover:-translate-y-0.5"
              >
                <Phone size={16} />
                Contact Me
              </a>
            </div>
          </div>

          {/* Portrait */}
          <div
            ref={portraitRef}
            className="hidden lg:block w-[380px] xl:w-[420px] flex-shrink-0 opacity-0"
          >
            <div className="relative">
              <img
                src="/hero-portrait.jpg"
                alt="Yomna Ali Salama"
                className="w-full h-auto object-cover grayscale-[30%] contrast-110"
                style={{ maxHeight: '560px' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-core via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-mono text-xs text-text-muted tracking-[0.04em]">
                  BASED IN EGYPT · WORKING GLOBALLY
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-10 bg-border-dark relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 bg-accent-gold animate-pulse" />
        </div>
        <span className="font-mono text-[10px] tracking-[0.08em] text-text-muted">SCROLL</span>
      </div>
    </section>
  )
}
