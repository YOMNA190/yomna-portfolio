import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, ArrowUpRight } from 'lucide-react'
import { featuredProjects } from '../data/portfolio'
import CaseStudyModal from '../components/CaseStudyModal'
import { useReducedMotion } from '../hooks/useReducedMotion'
import type { Project } from '../data/portfolio'

export default function CaseStudiesNew() {
  const [selected, setSelected] = useState<Project | null>(null)
  const reduced = useReducedMotion()

  return (
    <>
      <section id="case-studies" className="bg-[#050505] py-32 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-[600px]">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-mono text-xs text-accent-gold tracking-[0.3em] uppercase mb-4"
              >
                03 — Featured Work
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="font-inter text-5xl sm:text-6xl font-bold text-white tracking-tight leading-[1.05]"
              >
                High-Impact <span className="text-luxury">Case Studies.</span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-text-secondary text-lg max-w-[400px] font-light"
            >
              Real projects. Real metrics. Problem, solution, and impact — documented.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                idx={idx}
                reduced={reduced}
                onSelect={() => setSelected(project)}
              />
            ))}
          </div>
        </div>
      </section>

      <CaseStudyModal project={selected} onClose={() => setSelected(null)} />
    </>
  )
}

function ProjectCard({
  project,
  idx,
  reduced,
  onSelect,
}: {
  project: Project
  idx: number
  reduced: boolean
  onSelect: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || reduced) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: x * 10, y: y * -10 })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect() }}
      style={{
        rotateX: tilt.y,
        rotateY: tilt.x,
        transformStyle: 'preserve-3d',
      }}
      className="group relative h-[500px] rounded-3xl overflow-hidden glass-effect-premium glass-effect-hover border-white/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-gold/50"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end" style={{ transform: 'translateZ(50px)' }}>
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[10px] text-accent-gold tracking-widest uppercase px-3 py-1 border border-accent-gold/20 rounded-full bg-accent-gold/5">
            {project.category}
          </span>
          <div className="flex items-center gap-2 text-accent-gold">
            <TrendingUp size={14} />
            <span className="font-mono text-xs font-medium">{project.metrics}</span>
          </div>
        </div>

        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-accent-gold transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-text-secondary text-sm mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-500 font-light leading-relaxed">
          {project.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            {project.tags.map((tag: string) => (
              <span key={tag} className="text-[10px] font-mono text-text-muted">
                {tag}
              </span>
            ))}
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent-gold group-hover:text-black transition-all duration-300">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>

      {/* Border Highlight */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-accent-gold/20 rounded-3xl transition-colors duration-500 pointer-events-none" />
    </motion.div>
  )
}
