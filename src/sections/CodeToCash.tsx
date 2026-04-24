import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code, TrendingUp, DollarSign } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const strategies = [
  {
    project: 'ps-lounge-saas-v4',
    build: 'SaaS booking platform with automated billing',
    scale: 'Meta lead ads targeting lounge owners in Egypt. Free trial funnel → paid tier conversion.',
    revenue: 'Subscription SaaS model. Monthly per-location fee + transaction commission.',
  },
  {
    project: 'qena-market',
    build: 'Multi-vendor marketplace with delivery logistics',
    scale: 'Google Search campaigns for local product keywords. Retargeting abandoned carts.',
    revenue: 'Commission per sale + featured vendor placement fees + delivery markup.',
  },
  {
    project: 'happiness-plaza',
    build: '3D interactive real estate visualization tool',
    scale: 'YouTube pre-roll targeting property investors. Landing page with lead capture form.',
    revenue: 'Per-project licensing to developers + lead generation fee per qualified inquiry.',
  },
]

export default function CodeToCash() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(
          card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
            delay: i * 0.12,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-surface border-t border-border-dark py-24 sm:py-32"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <p className="font-mono text-xs text-text-muted tracking-[0.04em] mb-4">
          REVENUE STRATEGY
        </p>
        <h2 className="font-inter text-4xl sm:text-5xl lg:text-6xl font-medium text-text-primary tracking-[-0.02em] mb-4">
          From code to cash.
        </h2>
        <p className="text-base text-text-secondary max-w-[600px] mb-16">
          How every system is engineered for monetization from day one.
        </p>

        {/* Strategy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {strategies.map((strategy, idx) => (
            <div
              key={strategy.project}
              ref={(el) => { cardsRef.current[idx] = el }}
              className="bg-bg-core border border-border-dark hover:border-border-light hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
            >
              {/* Gold accent line */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-accent-gold opacity-0 hover:opacity-100 transition-opacity duration-300" />

              <div className="p-8 sm:p-10">
                <p className="font-mono text-xs text-text-muted tracking-[0.04em] mb-6">
                  {strategy.project}
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Code size={16} className="text-accent-gold mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-mono text-[11px] text-text-muted tracking-[0.04em] mb-1">
                        BUILD
                      </p>
                      <p className="text-sm text-text-primary">{strategy.build}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <TrendingUp size={16} className="text-accent-gold mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-mono text-[11px] text-text-muted tracking-[0.04em] mb-1">
                        SCALE
                      </p>
                      <p className="text-sm text-text-secondary">{strategy.scale}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <DollarSign size={16} className="text-accent-gold mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-mono text-[11px] text-text-muted tracking-[0.04em] mb-1">
                        REVENUE MODEL
                      </p>
                      <p className="text-sm text-text-secondary">{strategy.revenue}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
