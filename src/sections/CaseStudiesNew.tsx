import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, ExternalLink, Rocket } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'PlayStation Lounge SaaS',
    slug: 'ps-lounge-saas-v4',
    problem: 'Lounge owners managing bookings, sessions, and payments manually with spreadsheets.',
    solution: 'End-to-end SaaS platform with real-time slot booking, automated billing, and staff management dashboard.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Socket.io'],
    impact: '40% reduction in admin time. Revenue tracking automated for 12+ lounge locations.',
    image: '/project-ps-lounge.jpg',
    featured: true,
    gridClass: 'md:col-span-2 lg:col-span-3 lg:row-span-2',
  },
  {
    id: 2,
    title: 'Qena Marketplace',
    slug: 'qena-market',
    problem: 'Local vendors in Qena lacked digital presence.',
    solution: 'Multi-vendor marketplace with vendor onboarding, product catalog, and order management.',
    tech: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind'],
    impact: '50+ vendors onboarded. 3x monthly order volume growth.',
    image: '/project-qena-market.jpg',
    featured: false,
    gridClass: 'md:col-span-1 lg:col-span-2 lg:row-span-1',
  },
  {
    id: 3,
    title: 'Happiness Plaza 3D',
    slug: 'happiness-plaza',
    problem: 'Real estate listings are static images.',
    solution: 'Interactive 3D property walkthrough system with real-time unit availability.',
    tech: ['Three.js', 'React', 'WebGL', 'Node.js'],
    impact: '60% increase in qualified leads. 4x engagement time.',
    image: '/project-happiness-plaza.jpg',
    featured: false,
    gridClass: 'md:col-span-1 lg:col-span-2 lg:row-span-1',
  },
]

function TechTag({ name }: { name: string }) {
  return (
    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[10px] text-text-muted uppercase tracking-wider hover:border-accent-gold/50 hover:bg-accent-gold/5 transition-all">
      {name}
    </span>
  )
}

interface ProjectCardProps {
  project: (typeof projects)[0]
  idx: number
}

function ProjectCard({ project, idx }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const rotateX = ((y - centerY) / centerY) * 3
    const rotateY = ((centerX - x) / centerX) * 3

    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1, duration: 0.8, type: 'spring' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        transformStyle: 'preserve-3d',
      }}
      className={`${project.gridClass} group relative bg-surface border border-white/5 rounded-3xl overflow-hidden hover:border-accent-gold/30 transition-all duration-500 cursor-pointer`}
    >
      {/* Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent" />
      </div>

      {/* Glow Effect on Hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content Layer */}
      <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col justify-end">
        <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] text-accent-gold tracking-[0.2em] uppercase">
              {project.slug}
            </p>
            <ExternalLink size={16} className="text-white/40 group-hover:text-accent-gold transition-colors" />
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h3>

          <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
            {project.solution}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((t) => (
              <TechTag key={t} name={t} />
            ))}
          </div>

          <div className="pt-6 border-t border-white/5 flex items-start gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <div className="p-2 bg-accent-gold/10 rounded-lg">
              <TrendingUp size={18} className="text-accent-gold" />
            </div>
            <div>
              <p className="font-mono text-[10px] text-accent-gold uppercase tracking-wider mb-1">
                Impact
              </p>
              <p className="text-sm text-white font-medium">{project.impact}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function CaseStudiesNew() {
  return (
    <section id="case-studies" className="bg-bg-core py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-accent-gold" />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-gold/80">
                Selected Case Studies
              </p>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-inter text-5xl md:text-7xl font-bold text-white tracking-tight"
            >
              Engineering <span className="italic font-light text-accent-gold">Impact.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-text-secondary max-w-[450px] text-lg leading-relaxed"
          >
            I build digital products that solve complex problems and drive measurable business growth.
          </motion.p>
        </div>

        {/* Bento Grid 2.0 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 auto-rows-[minmax(300px,auto)]">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}

          {/* Special Bento Card: Stats/Tech Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="md:col-span-1 lg:col-span-2 bg-accent-gold p-8 rounded-3xl flex flex-col justify-between group overflow-hidden relative hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-500"
          >
            <div className="relative z-10">
              <motion.div whileHover={{ rotate: 12 }} transition={{ type: 'spring' }}>
                <Rocket size={32} className="text-black mb-6" />
              </motion.div>
              <h3 className="text-2xl font-bold text-black mb-2">Always Scaling.</h3>
              <p className="text-black/70 text-sm font-medium">
                Pushing the boundaries of what's possible in the intersection of code and commerce.
              </p>
            </div>
            <div className="relative z-10 flex items-end justify-between">
              <div className="text-4xl font-black text-black tracking-tighter">99.9%</div>
              <div className="font-mono text-[10px] text-black font-bold uppercase tracking-widest">
                Uptime Architecture
              </div>
            </div>
            {/* Decorative pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
