import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, TrendingUp, ArrowUpRight, Target, Code2, Lightbulb, BarChart3 } from 'lucide-react'
import type { Project } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface Props {
  project: Project | null
  onClose: () => void
}

export default function CaseStudyModal({ project, onClose }: Props) {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!project) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0.1 : 0.3 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          role="button"
          aria-label="Close modal"
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-bg-core border border-white/10 rounded-2xl shadow-2xl"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: reduced ? 0.1 : 0.4, ease: [0.16, 1, 0.3, 1] as const }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
        >
          {/* Header Image */}
          <div className="relative h-56 sm:h-72 overflow-hidden rounded-t-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-core via-bg-core/50 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-accent-gold hover:text-black hover:border-accent-gold transition-all"
              aria-label="Close case study"
            >
              <X size={18} />
            </button>

            {/* Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-[10px] text-accent-gold tracking-widest uppercase px-3 py-1 border border-accent-gold/20 rounded-full bg-accent-gold/5">
                  {project.category}
                </span>
                <span className="font-mono text-[10px] text-text-muted tracking-wider">
                  {project.year}
                </span>
              </div>
              <h2 id="case-study-title" className="font-inter text-3xl sm:text-4xl font-bold text-white">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Metrics Row */}
            <div className="flex items-center gap-2 text-accent-gold">
              <TrendingUp size={16} />
              <span className="font-mono text-sm font-medium">{project.metrics}</span>
            </div>

            {/* Problem */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={16} className="text-accent-gold" />
                <h3 className="font-mono text-xs text-accent-gold tracking-widest uppercase">
                  The Problem
                </h3>
              </div>
              <p className="text-text-secondary leading-relaxed">{project.problem}</p>
            </div>

            {/* Solution */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Code2 size={16} className="text-accent-gold" />
                <h3 className="font-mono text-xs text-accent-gold tracking-widest uppercase">
                  The Solution
                </h3>
              </div>
              <p className="text-text-secondary leading-relaxed">{project.solution}</p>
            </div>

            {/* Impact */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 size={16} className="text-accent-gold" />
                <h3 className="font-mono text-xs text-accent-gold tracking-widest uppercase">
                  Measurable Impact
                </h3>
              </div>
              <ul className="space-y-2">
                {project.impact.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Target size={14} className="text-accent-gold mt-1 flex-shrink-0" />
                    <span className="text-white text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="pt-6 border-t border-border-dark">
              <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase mb-3">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-white/5 rounded-lg text-sm text-text-secondary border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-gold text-black font-mono text-xs uppercase tracking-widest font-bold rounded-lg hover:bg-white transition-colors"
              >
                View Live Project
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
