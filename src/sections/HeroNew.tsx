import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { ArrowRight, Phone, Code2, TrendingUp, Globe } from 'lucide-react'
import InteractivePortrait from '../components/InteractivePortrait'
import MagneticButton from '../components/MagneticButton'

export default function HeroNew() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const [counts, setCounts] = useState({ cpr: 0, ctr: 0, conv: 0 })
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate counters with bounce
      const counterTl = gsap.timeline({ delay: 0.5 })
      counterTl.to(
        {},
        {
          duration: 2,
          ease: 'back.out',
          onUpdate: function () {
            const progress = this.progress()
            setCounts({
              cpr: parseFloat((1.47 * progress).toFixed(2)),
              ctr: parseFloat((7.85 * progress).toFixed(2)),
              conv: Math.floor(1600 * progress),
            })
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8 },
    },
  }



  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-bg-core overflow-hidden pt-20"
    >
      {/* Enhanced Dynamic Background */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-bg-core via-[#0a0a0a] to-[#080808]" />

        {/* Organic gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(212,175,55,0.05),transparent_50%)]" />

        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")',
          }}
        />

        {/* Animated orbs */}
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            className="w-[800px] h-[800px] border border-accent-gold/10 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute w-[600px] h-[600px] border border-accent-gold/5 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Text Content */}
          <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
            {/* Badge */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-accent-gold" />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-gold/80">
                Full-Stack Architect & Growth Specialist
              </p>
            </motion.div>

            {/* Headline with staggered reveal */}
            <motion.h1
              ref={headlineRef}
              variants={itemVariants}
              className="font-inter text-5xl sm:text-6xl lg:text-7xl xl:text-[100px] font-bold text-white leading-[0.9] tracking-[-0.04em] mb-8"
            >
              Building{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-[#F7E7CE] to-accent-gold animate-gradient-x">
                Digital
              </span>
              <br />
              High-Performance
              <br />
              <span className="italic font-light text-accent-gold">Ecosystems.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-text-secondary mb-12 max-w-[600px] leading-relaxed"
            >
              I merge advanced software engineering with data-driven media buying to build systems
              that don't just work—they scale revenue.
            </motion.p>

            {/* Metrics Grid - Glass Effect */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 p-6 sm:p-8 glass-effect rounded-2xl"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-accent-gold/60">
                  <TrendingUp size={14} />
                  <span className="font-mono text-[10px] tracking-widest uppercase">CPR</span>
                </div>
                <div className="text-3xl font-medium text-white tabular-nums">
                  {counts.cpr.toFixed(2)}
                  <span className="text-sm ml-1 text-text-muted">EGP</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-accent-gold/60">
                  <Code2 size={14} />
                  <span className="font-mono text-[10px] tracking-widest uppercase">CTR</span>
                </div>
                <div className="text-3xl font-medium text-white tabular-nums">
                  {counts.ctr.toFixed(2)}%
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 space-y-2">
                <div className="flex items-center gap-2 text-accent-gold/60">
                  <Globe size={14} />
                  <span className="font-mono text-[10px] tracking-widest uppercase">Conversions</span>
                </div>
                <div className="text-3xl font-medium text-white tabular-nums">
                  {counts.conv.toLocaleString()}+
                </div>
              </div>
            </motion.div>

            {/* CTAs with Magnetic Effect */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 sm:gap-6">
              <MagneticButton href="#case-studies" variant="primary">
                <span>Explore Work</span>
                <ArrowRight size={18} />
              </MagneticButton>
              <MagneticButton href="#contact" variant="secondary">
                <Phone size={18} />
                <span>Get in Touch</span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Interactive Portrait */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2"
          >
            <InteractivePortrait src="/hero-portrait.jpg" alt="Yomna Ali Salama" />
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4"
      >
        <span className="font-mono text-[9px] tracking-[0.4em] text-text-muted uppercase">
          Discover
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-accent-gold to-transparent relative">
          <motion.div
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-[-1px] w-[3px] h-3 bg-accent-gold rounded-full shadow-[0_0_10px_#D4AF37]"
          />
        </div>
      </motion.div>
    </section>
  )
}
