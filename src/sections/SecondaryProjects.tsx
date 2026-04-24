import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    name: 'Portfolio CMS',
    description: 'Headless CMS for creative portfolios',
    tech: ['Next.js', 'Sanity'],
    link: '#',
  },
  {
    name: 'Task Automation',
    description: 'Workflow automation with webhooks',
    tech: ['Node.js', 'n8n'],
    link: '#',
  },
  {
    name: 'API Gateway',
    description: 'Microservice routing layer',
    tech: ['Go', 'Docker', 'Redis'],
    link: '#',
  },
  {
    name: 'Analytics Pipeline',
    description: 'Event tracking and visualization',
    tech: ['Python', 'ClickHouse', 'Grafana'],
    link: '#',
  },
  {
    name: 'Auth Microservice',
    description: 'JWT-based auth system',
    tech: ['Node.js', 'PostgreSQL'],
    link: '#',
  },
  {
    name: 'Chat Interface',
    description: 'Real-time messaging component',
    tech: ['React', 'Firebase'],
    link: '#',
  },
]

export default function SecondaryProjects() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(
          card,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            },
            delay: i * 0.08,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-bg-core py-16 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <p className="font-mono text-xs text-text-muted tracking-[0.04em] mb-4">
          MORE WORK
        </p>
        <h3 className="font-inter text-2xl sm:text-3xl font-medium text-text-primary mb-10">
          Additional projects.
        </h3>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, idx) => (
            <div
              key={project.name}
              ref={(el) => { cardsRef.current[idx] = el }}
              className="group border border-border-dark hover:border-border-light hover:bg-surface transition-all duration-300 p-6 relative"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 text-text-muted group-hover:text-accent-gold transition-colors duration-200"
                aria-label={`View ${project.name}`}
              >
                <ExternalLink size={14} />
              </a>

              <h4 className="font-inter text-base font-medium text-text-primary mb-1 pr-6">
                {project.name}
              </h4>
              <p className="text-sm text-text-secondary mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] text-text-muted tracking-[0.02em]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
