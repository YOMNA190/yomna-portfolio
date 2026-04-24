import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Search, Code2, FlaskConical, Rocket } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

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
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      stepsRef.current.forEach((step, i) => {
        if (!step) return
        gsap.fromTo(
          step,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
            },
            delay: i * 0.15,
          }
        )
      })

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="process" className="bg-bg-core py-24 sm:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <p className="font-mono text-xs text-text-muted tracking-[0.04em] mb-4">
          METHODOLOGY
        </p>
        <h2 className="font-inter text-4xl sm:text-5xl lg:text-6xl font-medium text-text-primary tracking-[-0.02em] mb-4">
          Analyze. Build. Test. Scale.
        </h2>
        <p className="text-base text-text-secondary max-w-[500px] mb-16">
          Data-driven decisions over assumptions.
        </p>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-[80px] left-[12.5%] right-[12.5%] h-px bg-border-dark">
            <div
              ref={lineRef}
              className="h-full bg-accent-gold origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  ref={(el) => { stepsRef.current[idx] = el }}
                  className="relative"
                >
                  {/* Mobile connector */}
                  {idx < steps.length - 1 && (
                    <div className="md:hidden absolute left-6 top-[100px] w-px h-8 bg-border-dark" />
                  )}

                  <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-6">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-border-dark bg-surface">
                      <Icon size={20} className="text-accent-gold" />
                    </div>

                    <div className="md:text-center">
                      <span className="font-mono text-4xl sm:text-5xl font-medium text-border-dark block mb-2">
                        {step.number}
                      </span>
                      <h3 className="font-inter text-xl font-medium text-text-primary mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
