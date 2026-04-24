import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
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

export default function SecondaryProjectsNew() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section ref={sectionRef} className="bg-bg-core py-16 sm:py-20 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-gold/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-10"
        >
          <motion.p
            variants={itemVariants}
            className="font-mono text-xs text-text-muted tracking-[0.04em] mb-4"
          >
            MORE WORK
          </motion.p>
          <motion.h3
            variants={itemVariants}
            className="font-inter text-2xl sm:text-3xl font-medium text-text-primary"
          >
            Additional projects.
          </motion.h3>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, idx) => (
            <motion.div
              key={project.name}
              ref={(el) => {
                cardsRef.current[idx] = el
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group glass-effect hover:glow-gold transition-all duration-300 p-6 relative rounded-2xl overflow-hidden"
            >
              {/* Background glow on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-inter text-base font-medium text-text-primary pr-6">
                    {project.name}
                  </h4>
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted group-hover:text-accent-gold transition-colors duration-200 flex-shrink-0"
                    aria-label={`View ${project.name}`}
                    whileHover={{ scale: 1.2, rotate: 45 }}
                  >
                    <ExternalLink size={14} />
                  </motion.a>
                </div>

                <p className="text-sm text-text-secondary mb-4 line-clamp-2 group-hover:line-clamp-none transition-all">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-x-3 gap-y-2">
                  {project.tech.map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0.6 }}
                      animate={{
                        opacity: hoveredIndex === idx ? 1 : 0.6,
                      }}
                      transition={{ delay: i * 0.05 }}
                      className="font-mono text-[11px] text-text-muted tracking-[0.02em] hover:text-accent-gold transition-colors"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Border accent */}
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-gold to-transparent group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
