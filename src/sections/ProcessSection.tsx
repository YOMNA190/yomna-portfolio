import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, Code2, FlaskConical, Rocket } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const steps = [
  {
    number: '01',
    title: 'Analyze',
    description: 'Audit current systems. Identify bottlenecks. Define measurable KPIs.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Build',
    description: 'Engineer scalable architecture. Write clean, documented code. Deploy with CI/CD.',
    icon: Code2,
  },
  {
    number: '03',
    title: 'Test',
    description: 'A/B test funnels. Optimize conversion paths. Validate with real user data.',
    icon: FlaskConical,
  },
  {
    number: '04',
    title: 'Scale',
    description: 'Deploy paid acquisition. Automate growth loops. Monitor and iterate.',
    icon: Rocket,
  },
]

export default function ProcessSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const reduced = useReducedMotion()
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: reduced ? 0 : i * 0.15,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  }

  return (
    <section ref={ref} id="process" className="bg-bg-core py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-accent-gold tracking-[0.3em] uppercase mb-4">
            06 — Methodology
          </p>
          <h2 className="font-inter text-4xl sm:text-5xl lg:text-6xl font-medium text-text-primary tracking-[-0.02em] mb-4">
            Analyze. Build. Test. Scale.
          </h2>
          <p className="text-base text-text-secondary max-w-[500px]">
            Data-driven decisions over assumptions. Every phase has clear deliverables and exit criteria.
          </p>
        </motion.div>

        {/* Desktop: Horizontal with connector */}
        <div className="hidden md:block relative">
          <div className="absolute top-[80px] left-[12.5%] right-[12.5%] h-px bg-border-dark">
            <motion.div
              className="h-full bg-accent-gold origin-left"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as const, delay: 0.5 }}
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  custom={idx}
                  variants={variants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="relative text-center group"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 flex items-center justify-center border border-border-dark bg-surface rounded-lg group-hover:border-accent-gold/50 transition-colors duration-300">
                      <Icon size={20} className="text-accent-gold" />
                    </div>
                  </div>

                  <span className="font-mono text-4xl sm:text-5xl font-medium text-border-dark block mb-2">
                    {step.number}
                  </span>
                  <h3 className="font-inter text-xl font-medium text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-[220px] mx-auto">
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile: Vertical stack */}
        <div className="md:hidden space-y-8">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                custom={idx}
                variants={variants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="relative pl-12"
              >
                <div className="absolute left-0 top-0 w-8 h-8 flex items-center justify-center border border-border-dark bg-surface rounded-lg">
                  <Icon size={16} className="text-accent-gold" />
                </div>
                <span className="font-mono text-2xl font-medium text-border-dark block mb-1">
                  {step.number}
                </span>
                <h3 className="font-inter text-lg font-medium text-text-primary mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
