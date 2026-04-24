import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TrendingUp } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'PlayStation Lounge SaaS',
    slug: 'ps-lounge-saas-v4',
    problem: 'Lounge owners managing bookings, sessions, and payments manually with spreadsheets.',
    solution:
      'End-to-end SaaS platform with real-time slot booking, automated billing, and staff management dashboard.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Socket.io'],
    impact: '40% reduction in admin time. Revenue tracking automated for 12+ lounge locations.',
    image: '/project-ps-lounge.jpg',
    featured: true,
  },
  {
    id: 2,
    title: 'Qena Marketplace',
    slug: 'qena-market',
    problem: 'Local vendors in Qena lacked digital presence. No centralized platform for regional commerce.',
    solution:
      'Multi-vendor marketplace with vendor onboarding, product catalog, order management, and local delivery integration.',
    tech: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind', 'REST API'],
    impact: '50+ vendors onboarded in first quarter. 3x average monthly order volume growth.',
    image: '/project-qena-market.jpg',
    featured: false,
  },
  {
    id: 3,
    title: 'Happiness Plaza 3D',
    slug: 'happiness-plaza',
    problem: 'Real estate listings are static images. Buyers cannot experience spatial layout before visiting.',
    solution:
      'Interactive 3D property walkthrough system with floor plan navigation and real-time unit availability.',
    tech: ['Three.js', 'React', 'WebGL', 'Node.js', 'MongoDB'],
    impact: '60% increase in qualified leads. Average engagement time 4x longer than static listings.',
    image: '/project-happiness-plaza.jpg',
    featured: false,
  },
]

function TechTag({ name }: { name: string }) {
  return (
    <span className="font-mono text-[11px] text-text-muted tracking-[0.02em]">{name}</span>
  )
}

export default function CaseStudies() {
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
            delay: i * 0.1,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const featured = projects.find((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section ref={sectionRef} id="case-studies" className="bg-bg-core py-24 sm:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <p className="font-mono text-xs text-text-muted tracking-[0.04em] mb-4">
          SELECTED WORK
        </p>
        <h2 className="font-inter text-4xl sm:text-5xl lg:text-6xl font-medium text-text-primary tracking-[-0.02em] mb-4">
          Case Studies.
        </h2>
        <p className="text-base text-text-secondary max-w-[600px] mb-16">
          Business cases, not GitHub cards. Every project built with revenue in mind.
        </p>

        {/* Featured Project */}
        {featured && (
          <div
            ref={(el) => { cardsRef.current[0] = el }}
            className="bg-surface border border-border-dark hover:border-border-light hover:bg-surface-hover hover:-translate-y-0.5 transition-all duration-300 mb-6"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 p-8 sm:p-12 lg:p-16">
                <p className="font-mono text-xs text-text-muted tracking-[0.04em] mb-3">
                  {featured.slug}
                </p>
                <h3 className="font-inter text-2xl sm:text-3xl lg:text-4xl font-medium text-text-primary mb-6">
                  {featured.title}
                </h3>

                <div className="space-y-4 mb-8">
                  <div>
                    <p className="font-mono text-[11px] text-text-muted tracking-[0.04em] mb-1">
                      PROBLEM
                    </p>
                    <p className="text-sm text-text-secondary">{featured.problem}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] text-text-muted tracking-[0.04em] mb-1">
                      SOLUTION
                    </p>
                    <p className="text-sm text-text-primary">{featured.solution}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-8">
                  {featured.tech.map((t) => (
                    <TechTag key={t} name={t} />
                  ))}
                </div>

                <div className="flex items-start gap-3 pt-6 border-t border-border-dark">
                  <TrendingUp size={20} className="text-accent-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-mono text-[11px] text-accent-gold tracking-[0.04em] mb-1">
                      BUSINESS IMPACT
                    </p>
                    <p className="text-sm text-text-primary">{featured.impact}</p>
                  </div>
                </div>
              </div>

              <div className="lg:w-[45%] relative overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover min-h-[300px] lg:min-h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-transparent lg:bg-gradient-to-l" />
              </div>
            </div>
          </div>
        )}

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {others.map((project, idx) => (
            <div
              key={project.id}
              ref={(el) => { cardsRef.current[idx + 1] = el }}
              className="bg-surface border border-border-dark hover:border-border-light hover:bg-surface-hover hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="relative overflow-hidden h-[200px]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              </div>
              <div className="p-8 sm:p-10">
                <p className="font-mono text-xs text-text-muted tracking-[0.04em] mb-2">
                  {project.slug}
                </p>
                <h3 className="font-inter text-xl sm:text-2xl font-medium text-text-primary mb-4">
                  {project.title}
                </h3>

                <div className="space-y-3 mb-6">
                  <p className="text-sm text-text-secondary">{project.problem}</p>
                  <p className="text-sm text-text-primary">{project.solution}</p>
                </div>

                <div className="flex flex-wrap gap-x-3 gap-y-1 mb-6">
                  {project.tech.map((t) => (
                    <TechTag key={t} name={t} />
                  ))}
                </div>

                <div className="flex items-start gap-3 pt-4 border-t border-border-dark">
                  <TrendingUp size={16} className="text-accent-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-mono text-[11px] text-accent-gold tracking-[0.04em] mb-1">
                      IMPACT
                    </p>
                    <p className="text-sm text-text-primary">{project.impact}</p>
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
