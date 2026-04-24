import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-surface border-t border-border-dark py-32 sm:py-40"
    >
      <div ref={contentRef} className="max-w-[800px] mx-auto px-6 text-center">
        <h2 className="font-inter text-4xl sm:text-5xl lg:text-6xl font-medium text-text-primary tracking-[-0.02em] mb-6 leading-tight">
          Let's build and scale
          <br />
          something <span className="text-accent-gold">profitable.</span>
        </h2>

        <p className="text-lg text-text-secondary mb-12 max-w-[500px] mx-auto">
          Available for full-stack development, media buying strategy, and product consulting.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <a
            href="https://wa.me/201069807254"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-accent-gold text-bg-core font-inter text-base font-medium hover:bg-accent-gold-hover transition-all duration-200 hover:-translate-y-0.5"
          >
            <Phone size={18} />
            WhatsApp +20 106 980 7254
          </a>
          <a
            href="mailto:contact@yomna.dev"
            className="inline-flex items-center gap-3 px-10 py-5 border border-border-light text-text-primary font-inter text-base font-normal hover:border-accent-gold hover:text-accent-gold transition-all duration-200 hover:-translate-y-0.5"
          >
            <Mail size={18} />
            Send an email
          </a>
        </div>

        {/* Bottom note */}
        <p className="font-mono text-xs text-text-muted tracking-[0.02em]">
          Based in Egypt · Working globally · Response time &lt; 4 hours
        </p>
      </div>
    </section>
  )
}
