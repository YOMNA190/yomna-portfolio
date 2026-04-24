import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Clock, Tag } from 'lucide-react'
import { writings } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function WritingSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const reduced = useReducedMotion()

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: reduced ? 0 : i * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  }

  return (
    <section ref={ref} id="writing" className="bg-surface py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <p className="font-mono text-xs text-accent-gold tracking-[0.3em] uppercase mb-4">
              05 — Writing
            </p>
            <h2 className="font-inter text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Thoughts on building.
            </h2>
          </div>
          <p className="text-text-secondary max-w-[400px]">
            Long-form essays on engineering architecture, growth strategy, and the intersection of both.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {writings.map((post, i) => (
            <motion.a
              key={post.title}
              href={post.link}
              custom={i}
              variants={variants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="group glass-effect-premium rounded-xl p-6 border border-white/5 hover:border-accent-gold/20 transition-all duration-300 block"
            >
              <div className="flex items-center gap-3 mb-4 text-text-muted">
                <span className="font-mono text-[10px] tracking-wider uppercase">
                  {post.date}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 font-mono text-[10px]">
                  <Clock size={10} />
                  {post.readTime}
                </span>
              </div>

              <h3 className="text-lg font-medium text-white mb-3 group-hover:text-accent-gold transition-colors leading-snug">
                {post.title}
              </h3>

              <p className="text-sm text-text-secondary leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 font-mono text-[10px] text-text-muted bg-white/5 px-2 py-1 rounded"
                    >
                      <Tag size={8} />
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-text-muted group-hover:text-accent-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
