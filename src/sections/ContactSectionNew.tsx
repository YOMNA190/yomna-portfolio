import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Phone, Mail } from 'lucide-react'
import MagneticButton from '../components/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSectionNew() {
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
      className="bg-surface border-t border-border-dark py-32 sm:py-40 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div ref={contentRef} className="max-w-[800px] mx-auto px-6 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-inter text-4xl sm:text-5xl lg:text-6xl font-medium text-text-primary tracking-[-0.02em] mb-6 leading-tight"
        >
          Let's build and scale
          <br />
          something <span className="text-accent-gold">profitable.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-lg text-text-secondary mb-12 max-w-[500px] mx-auto"
        >
          Available for full-stack development, media buying strategy, and product consulting.
        </motion.p>

        {/* CTAs with Magnetic Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <MagneticButton
            href="https://wa.me/201069807254"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            <Phone size={18} />
            <span>WhatsApp +20 106 980 7254</span>
          </MagneticButton>
          <MagneticButton
            href="mailto:contact@yomna.dev"
            variant="secondary"
          >
            <Mail size={18} />
            <span>Send an email</span>
          </MagneticButton>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-mono text-xs text-text-muted tracking-[0.02em]"
        >
          Based in Egypt · Working globally · Response time &lt; 4 hours
        </motion.p>
      </div>
    </section>
  )
}
