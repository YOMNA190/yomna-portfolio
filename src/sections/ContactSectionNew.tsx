import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Phone, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'
import MagneticButton from '../components/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSectionNew() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (formData.name && formData.email && formData.message) {
      setFormState('success')
      setFormData({ name: '', email: '', message: '' })
    } else {
      setFormState('error')
    }

    setTimeout(() => setFormState('idle'), 4000)
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-surface border-t border-border-dark py-32 sm:py-40 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div ref={contentRef} className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — CTA Text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-lg text-text-secondary mb-12 max-w-[500px]"
            >
              Available for full-stack development, media buying strategy, and product consulting.
              I respond to every serious inquiry within 4 hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-start gap-4"
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

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-mono text-xs text-text-muted tracking-[0.02em] mt-10"
            >
              Based in Egypt · Working globally · Response time &lt; 4 hours
            </motion.p>
          </div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="glass-effect-premium rounded-2xl p-8 border border-white/5">
              <p className="font-mono text-[10px] text-accent-gold tracking-widest uppercase mb-6">
                Or send a message directly
              </p>

              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block font-mono text-[10px] text-text-muted tracking-wider uppercase mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-gold/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-mono text-[10px] text-text-muted tracking-wider uppercase mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-gold/50 transition-colors"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-[10px] text-text-muted tracking-wider uppercase mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-gold/50 transition-colors resize-none"
                    placeholder="Tell me about your project, timeline, and budget..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className={`
                    w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300
                    ${formState === 'success'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : formState === 'error'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-accent-gold text-black hover:bg-white active:scale-[0.98]'
                    }
                    ${formState === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}
                  `}
                >
                  {formState === 'submitting' && (
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  )}
                  {formState === 'success' && <CheckCircle size={16} />}
                  {formState === 'error' && <AlertCircle size={16} />}
                  {formState === 'idle' && <Send size={14} />}
                  <span>
                    {formState === 'submitting' ? 'Sending...' :
                      formState === 'success' ? 'Message sent!' :
                        formState === 'error' ? 'Please fill all fields' :
                          'Send Message'}
                  </span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
