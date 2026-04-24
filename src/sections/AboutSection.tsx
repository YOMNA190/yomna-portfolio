import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Globe, Clock, Award } from 'lucide-react'
import { timeline } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const reduced = useReducedMotion()

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: reduced ? 0 : i * 0.1,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  }

  return (
    <section ref={ref} id="about" className="bg-bg-core py-32 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-[0.03]" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent-gold/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Column — Bio */}
          <div className="lg:col-span-5">
            <motion.div
              custom={0}
              variants={variants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <p className="font-mono text-xs text-accent-gold tracking-[0.3em] uppercase mb-4">
                01 — About
              </p>
              <h2 className="font-inter text-4xl sm:text-5xl font-bold text-white tracking-tight mb-8 leading-[1.1]">
                I build systems.
                <br />
                <span className="text-text-muted font-light italic">Then I scale them.</span>
              </h2>
            </motion.div>

            <motion.div
              custom={1}
              variants={variants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="space-y-5 text-text-secondary leading-relaxed"
            >
              <p>
                I am a <span className="text-white font-medium">full-stack engineer</span> and{' '}
                <span className="text-white font-medium">growth strategist</span> based in Egypt,
                working with founders and teams across the Middle East, Europe, and North America.
              </p>
              <p>
                My edge is dual: I write production-grade React and Node.js systems, then I run
                the Meta and Google campaigns that make those systems profitable. I do not
                outsource growth thinking to a separate team — I own the entire stack from code to
                conversion.
              </p>
              <p>
                In the last 24 months, I have shipped SaaS platforms, scaled e-commerce marketplaces
                to 1.2M EGP GMV, and reduced ad CPR to 1.47 EGP — all while maintaining sub-second
                load times and 99.9% uptime.
              </p>
            </motion.div>

            {/* Quick Facts */}
            <motion.div
              custom={2}
              variants={variants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="mt-10 grid grid-cols-2 gap-4"
            >
              {[
                { icon: MapPin, label: 'Based in', value: 'Egypt' },
                { icon: Globe, label: 'Working', value: 'Globally' },
                { icon: Clock, label: 'Response', value: '< 4 Hours' },
                { icon: Award, label: 'Experience', value: '4+ Years' },
              ].map((fact) => (
                <div
                  key={fact.label}
                  className="p-4 glass-effect-premium rounded-xl border border-white/5"
                >
                  <fact.icon size={14} className="text-accent-gold mb-2" />
                  <p className="font-mono text-[10px] text-text-muted tracking-wider uppercase">
                    {fact.label}
                  </p>
                  <p className="text-sm text-white font-medium mt-0.5">{fact.value}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column — Timeline */}
          <div className="lg:col-span-7">
            <motion.div
              custom={3}
              variants={variants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="relative"
            >
              <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border-dark" />

              <div className="space-y-10">
                {timeline.map((event, i) => (
                  <motion.div
                    key={i}
                    custom={i + 4}
                    variants={variants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="relative pl-12 group"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1 w-10 h-10 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-accent-gold/30 border border-accent-gold/50 group-hover:bg-accent-gold group-hover:scale-125 transition-all duration-300" />
                    </div>

                    <div className="glass-effect-premium rounded-xl p-6 border border-white/5 group-hover:border-accent-gold/20 transition-colors duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-[10px] text-accent-gold tracking-wider uppercase">
                          {event.year}
                        </span>
                        <span className="text-[10px] text-text-muted">·</span>
                        <span className="font-mono text-[10px] text-text-muted tracking-wider uppercase">
                          {event.type}
                        </span>
                      </div>
                      <h3 className="font-inter text-lg font-medium text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
