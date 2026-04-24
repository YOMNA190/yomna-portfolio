import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Phone, Code2, TrendingUp, Globe } from 'lucide-react'
import InteractivePortrait from '../components/InteractivePortrait'
import MagneticButton from '../components/MagneticButton'

export default function HeroNew() {
  const sectionRef = useRef<HTMLElement>(null)
  const [counts, setCounts] = useState({ cpr: 0, ctr: 0, conv: 0 })
  // const { scrollY } = useScroll()
  // const y1 = useTransform(scrollY, [0, 500], [0, 200])
  // const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counterTl = gsap.timeline({ delay: 0.5 })
      counterTl.to(
        {},
        {
          duration: 2.5,
          ease: 'power4.out',
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
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-[#050505] overflow-hidden pt-24 pb-16"
    >
      {/* Liquid Cyber Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-gold/10 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-gold/5 blur-[150px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 cyber-grid opacity-20" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Text Content */}
          <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
            {/* Professional Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 mb-8 px-4 py-2 glass-effect-premium rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-gold"></span>
              </span>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-gold/90">
                Available for high-stakes projects
              </p>
            </motion.div>
            
            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-inter text-5xl sm:text-7xl lg:text-8xl xl:text-[110px] font-bold text-white leading-[0.85] tracking-[-0.05em] mb-8"
            >
              Building <br />
              <span className="text-luxury">Digital</span> <br />
              <span className="italic font-light">Ecosystems.</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={itemVariants}
              className="text-xl sm:text-2xl text-text-secondary mb-12 max-w-[650px] leading-relaxed font-light"
            >
              I merge <span className="text-white font-medium">advanced engineering</span> with <span className="text-white font-medium">growth strategy</span> to build systems that dominate markets.
            </motion.p>

            {/* High-Performance Metrics */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-12 max-w-[800px]"
            >
              {[
                { label: 'Avg. CPR', value: `${counts.cpr.toFixed(2)} EGP`, icon: TrendingUp },
                { label: 'Avg. CTR', value: `${counts.ctr.toFixed(2)}%`, icon: Code2 },
                { label: 'Conversions', value: `${counts.conv.toLocaleString()}+`, icon: Globe },
              ].map((metric, i) => (
                <div key={i} className="p-6 glass-effect-premium glass-effect-hover rounded-2xl group">
                  <div className="flex items-center gap-2 text-accent-gold/50 mb-3 group-hover:text-accent-gold transition-colors">
                    <metric.icon size={14} />
                    <span className="font-mono text-[10px] tracking-widest uppercase">{metric.label}</span>
                  </div>
                  <div className="text-3xl font-medium text-white tabular-nums">
                    {metric.value}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Premium Actions */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-6">
              <MagneticButton href="#case-studies" variant="primary">
                <span className="flex items-center gap-3">
                  View Case Studies <ArrowRight size={18} />
                </span>
              </MagneticButton>
              <MagneticButton href="#contact" variant="secondary">
                <span className="flex items-center gap-3">
                  <Phone size={18} /> Let's Talk
                </span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Portrait with Enhanced Visuals */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2 relative"
          >
            <div className="absolute inset-0 bg-accent-gold/20 blur-[100px] rounded-full animate-pulse-slow" />
            <div className="relative z-10">
              <InteractivePortrait src="/hero-portrait.jpg" alt="Yomna Ali Salama" />
            </div>
            
            {/* Floating element */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -right-6 p-4 glass-effect-premium rounded-xl z-20 hidden xl:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center">
                  <Code2 className="text-accent-gold" size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-accent-gold/60 uppercase">Tech Stack</p>
                  <p className="text-xs font-medium text-white">React 19 + GSAP</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Luxury Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4 pointer-events-none"
      >
        <span className="font-mono text-[9px] tracking-[0.5em] text-text-muted uppercase">Scroll to Explore</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-accent-gold/50 via-accent-gold to-transparent relative">
          <motion.div
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-[-1.5px] w-1 h-4 bg-accent-gold rounded-full shadow-[0_0_15px_#D4AF37]"
          />
        </div>
      </motion.div>
    </section>
  )
}
