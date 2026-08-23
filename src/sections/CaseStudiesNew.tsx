import { useRef, useState } from 'react'
import { ArrowUpRight, BookOpenCheck, Gamepad2, ShieldCheck, SwatchBook } from 'lucide-react'
import { motion } from 'framer-motion'

const projects = [
  {
    id: 'field-service',
    title: 'Field Service Pro',
    category: 'Arabic Operations SaaS',
    evidence: '10 automated checks',
    description: 'Arabic RTL operations product for field teams with protected RBAC, scheduling conflict checks, live SLA attention, maintenance plans, audit history, and a limited customer portal.',
    tags: ['React', 'tRPC', 'Drizzle', 'MySQL'],
    icon: ShieldCheck,
    github: 'https://github.com/YOMNA190/field-service-pro',
    tone: 'from-blue-500/25 via-cyan-400/10 to-transparent',
  },
  {
    id: 'ps-lounge',
    title: 'PS Lounge',
    category: 'Branch Operations SaaS',
    evidence: '3 business-rule tests',
    description: 'Operations foundation for devices, sessions, orders, shifts, subscriptions, tournaments, and an audit trail. The case study distinguishes verified logic from Supabase environment dependencies.',
    tags: ['React', 'Supabase', 'Vitest', 'RTL'],
    icon: Gamepad2,
    github: 'https://github.com/YOMNA190/ps-lounge-saas-v4',
    tone: 'from-violet-500/25 via-fuchsia-400/10 to-transparent',
  },
  {
    id: 'design-system',
    title: 'Yomna Design System',
    category: 'Reusable UI Foundation',
    evidence: 'RTL & accessibility tests',
    description: 'A typed component foundation built for Arabic-first interfaces: direction context, accessible buttons, badges, empty states, and shared design tokens.',
    tags: ['TypeScript', 'React', 'Vitest', 'RTL'],
    icon: SwatchBook,
    github: 'https://github.com/YOMNA190/yomna-design-system',
    tone: 'from-amber-400/25 via-orange-400/10 to-transparent',
  },
  {
    id: 'arabic-academy',
    title: 'Arabic Academy',
    category: 'Learning Operations Prototype',
    evidence: '3 learning-flow tests',
    description: 'A front-end learning operations case study with lesson progress, assessment eligibility, role-based decisions, and a clearly labelled certificate preview—not a production LMS claim.',
    tags: ['React', 'Learning UX', 'Node Test', 'RTL'],
    icon: BookOpenCheck,
    github: 'https://github.com/YOMNA190/arabic-academy',
    tone: 'from-emerald-400/25 via-lime-400/10 to-transparent',
  },
]

export default function CaseStudiesNew() {
  return (
    <section id="case-studies" className="bg-[#050505] py-32 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-[670px]">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="font-mono text-xs text-accent-gold tracking-[0.3em] uppercase mb-4">Selected Product Work</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-inter text-5xl sm:text-6xl font-bold text-white tracking-tight">Case studies built on <span className="text-luxury">evidence.</span></motion.h2>
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-text-secondary text-lg max-w-[430px] font-light leading-relaxed">Each card points to the repository and states what is verified in code. Product limits are documented instead of being replaced with invented revenue, users, or performance claims.</motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const Icon = project.icon
  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setTilt({ x: ((event.clientX - rect.left) / rect.width - 0.5) * 5, y: ((event.clientY - rect.top) / rect.height - 0.5) * -5 })
  }

  return <motion.a ref={cardRef} href={project.github} target="_blank" rel="noreferrer" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }} onMouseMove={handleMouseMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })} style={{ rotateX: tilt.y, rotateY: tilt.x, transformStyle: 'preserve-3d' }} className="group relative min-h-[360px] rounded-3xl overflow-hidden border border-white/10 bg-[#0b0c10] p-8 flex flex-col justify-between transition-colors hover:border-accent-gold/40">
    <div className={`absolute inset-0 bg-gradient-to-br ${project.tone} opacity-80`} />
    <div className="relative z-10 flex items-start justify-between gap-5" style={{ transform: 'translateZ(35px)' }}><div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-accent-gold"><Icon size={23} /></div><span className="font-mono text-[10px] text-accent-gold tracking-widest uppercase px-3 py-1.5 border border-accent-gold/20 rounded-full bg-black/20">{project.category}</span></div>
    <div className="relative z-10 mt-12" style={{ transform: 'translateZ(45px)' }}><p className="font-mono text-xs text-white/55 mb-4">{project.evidence}</p><h3 className="text-3xl font-bold text-white mb-4 group-hover:text-accent-gold transition-colors">{project.title}</h3><p className="text-text-secondary text-sm leading-relaxed max-w-xl">{project.description}</p></div>
    <div className="relative z-10 flex items-center justify-between gap-4 mt-8" style={{ transform: 'translateZ(35px)' }}><div className="flex flex-wrap gap-x-3 gap-y-1">{project.tags.map((tag) => <span key={tag} className="text-[10px] font-mono text-text-muted">{tag}</span>)}</div><span className="shrink-0 inline-flex items-center gap-2 text-xs font-mono text-white group-hover:text-accent-gold transition-colors">View repository <ArrowUpRight size={17} /></span></div>
  </motion.a>
}
