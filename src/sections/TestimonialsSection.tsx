import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const reduced = useReducedMotion()
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((c) => (c + 1) % testimonials.length)
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)

  const t = testimonials[current]

  return (
    <section ref={ref} id="testimonials" className="bg-bg-core py-32 relative overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-[0.03]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs text-accent-gold tracking-[0.3em] uppercase mb-4">
            04 — Testimonials
          </p>
          <h2 className="font-inter text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Words from collaborators.
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: reduced ? 0.1 : 0.5, ease: [0.16, 1, 0.3, 1] as const }}
              className="glass-effect-premium rounded-2xl p-8 sm:p-12 border border-white/5 relative"
            >
              <Quote size={32} className="text-accent-gold/20 mb-6" />

              <blockquote className="text-xl sm:text-2xl text-white leading-relaxed mb-8 font-light">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center">
                  <span className="text-accent-gold font-bold text-sm">
                    {t.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium">{t.author}</p>
                  <p className="text-sm text-text-muted">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:border-accent-gold transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-accent-gold w-6' : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:border-accent-gold transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
