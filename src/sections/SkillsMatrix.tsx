import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { skills } from '../data/portfolio'

type Category = 'All' | 'Frontend' | 'Backend' | 'Growth' | 'DevOps' | 'Design'

const categories: Category[] = ['All', 'Frontend', 'Backend', 'Growth', 'DevOps', 'Design']

export default function SkillsMatrix() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const reduced = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory)

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: reduced ? 0 : i * 0.05,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  }

  return (
    <section ref={ref} id="skills" className="bg-surface py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-xs text-accent-gold tracking-[0.3em] uppercase mb-4">
            02 — Capabilities
          </p>
          <h2 className="font-inter text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Skills Matrix.
          </h2>
          <p className="text-text-secondary max-w-[500px]">
            Proficiency measured by production hours, not tutorial completions.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-10"
          role="tablist"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`
                px-5 py-2 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-all duration-300
                ${activeCategory === cat
                  ? 'bg-accent-gold text-black font-bold'
                  : 'bg-white/5 text-text-muted hover:text-white hover:bg-white/10'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill, i) => (
            <motion.div
              key={`${activeCategory}-${skill.name}`}
              custom={i}
              variants={variants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="group p-5 glass-effect-premium rounded-xl border border-white/5 hover:border-accent-gold/20 transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-white font-medium">{skill.name}</span>
                <span className="font-mono text-[11px] text-accent-gold">{skill.proficiency}%</span>
              </div>

              {/* Progress bar background */}
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent-gold to-accent-gold-hover rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                  transition={{
                    delay: reduced ? 0 : 0.3 + i * 0.08,
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                />
              </div>

              <p className="font-mono text-[10px] text-text-muted mt-2 tracking-wider uppercase">
                {skill.category}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
