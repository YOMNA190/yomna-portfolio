import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, ArrowUpRight } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'PS Lounge SaaS',
    category: 'SaaS Architecture',
    metrics: '+320% ROI',
    description: 'A complete management ecosystem for entertainment lounges, scaling from local to regional.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    color: 'from-accent-gold/20 to-transparent'
  },
  {
    id: 2,
    title: 'Qena Market',
    category: 'E-commerce Scaling',
    metrics: '1.2M EGP GMV',
    description: 'Optimized multi-vendor marketplace with automated logistics and high-conversion funnels.',
    tags: ['Next.js', 'Growth', 'Automation'],
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800',
    color: 'from-accent-gold/20 to-transparent'
  },
  {
    id: 3,
    title: 'Happiness Plaza',
    category: 'Interactive Real Estate',
    metrics: 'Lead Gen +45%',
    description: '3D interactive visualization tool for premium real estate developments.',
    tags: ['Three.js', 'React', 'Marketing'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    color: 'from-accent-gold/20 to-transparent'
  }
]

export default function CaseStudiesNew() {
  return (
    <section id="case-studies" className="bg-[#050505] py-32 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-[600px]">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-mono text-xs text-accent-gold tracking-[0.3em] uppercase mb-4"
            >
              Featured Work
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-inter text-5xl sm:text-6xl font-bold text-white tracking-tight"
            >
              High-Impact <span className="text-luxury">Case Studies.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-text-secondary text-lg max-w-[400px] font-light"
          >
            A selection of projects where engineering meets growth to deliver exceptional results.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, idx }: { project: any, idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
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
      transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        rotateX: tilt.y,
        rotateY: tilt.x,
        transformStyle: 'preserve-3d',
      }}
      className="group relative h-[500px] rounded-3xl overflow-hidden glass-effect-premium glass-effect-hover border-white/5 cursor-pointer"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700 ease-out"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent`} />
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
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
