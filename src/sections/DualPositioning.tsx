import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code, Target } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const buildItems = ['SaaS systems', 'Marketplaces', 'Scalable backend systems']
const scaleItems = ['Paid ads strategy', 'Conversion optimization', 'ROI scaling', 'A/B testing']

export default function DualPositioning() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )

      gsap.fromTo(
        rightRef.current,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )

      gsap.fromTo(
        dividerRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-bg-core py-24 sm:py-32">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Left - BUILD */}
          <div
            ref={leftRef}
            className="flex-1 px-8 sm:px-12 lg:px-16 py-12 sm:py-16 border-b md:border-b-0 md:border-r border-border-dark hover:bg-surface transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-6">
              <Code size={18} className="text-accent-gold" />
              <span className="font-mono text-sm tracking-[0.04em] text-accent-gold">
                BUILD
              </span>
            </div>
            <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-medium text-text-primary leading-tight mb-8">
              Systems that
              <br />
              scale.
            </h2>
            <ul className="space-y-4">
              {buildItems.map((item) => (
                <li
                  key={item}
                  className="pl-4 border-l-2 border-accent-gold text-text-secondary text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider (desktop) */}
          <div
            ref={dividerRef}
            className="hidden md:block w-px bg-border-dark origin-top group-hover:bg-accent-gold transition-colors duration-300"
          />

          {/* Right - SCALE */}
          <div
            ref={rightRef}
            className="flex-1 px-8 sm:px-12 lg:px-16 py-12 sm:py-16 hover:bg-surface transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-6">
              <Target size={18} className="text-accent-gold" />
              <span className="font-mono text-sm tracking-[0.04em] text-accent-gold">
                SCALE
              </span>
            </div>
            <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-medium text-text-primary leading-tight mb-8">
              Revenue that
              <br />
              compounds.
            </h2>
            <ul className="space-y-4">
              {scaleItems.map((item) => (
                <li
                  key={item}
                  className="pl-4 border-l-2 border-accent-gold text-text-secondary text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
