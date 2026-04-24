import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { ArrowRight, Phone, Code2, TrendingUp, Globe } from 'lucide-react'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const [counts, setCounts] = useState({ cpr: 0, ctr: 0, conv: 0 })
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate counters
      const counterTl = gsap.timeline({ delay: 0.5 })
      counterTl.to(
        {},
        {
          duration: 2,
          ease: 'power3.out',
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
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-[#050505] overflow-hidden pt-20"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.15]" 
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
        <motion.div 
          style={{ y: y1, opacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[800px] h-[800px] border border-accent-gold/10 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-[600px] h-[600px] border border-accent-gold/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-12 items-center"
        >
          {/* Text Content */}
          <div className="lg:col-span-7 xl:col-span-8">
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-accent-gold" />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-gold/80">
                Full-Stack Architect & Growth Specialist
              </p>
            </motion.div>

            <motion.h1
              ref={headlineRef}
              variants={itemVariants}
              className="font-inter text-6xl sm:text-7xl xl:text-[100px] font-bold text-white leading-[0.9] tracking-[-0.04em] mb-8"
            >
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-[#F7E7CE] to-accent-gold animate-gradient-x">Digital</span>
              <br />
              High-Performance
              <br />
              <span className="italic font-light text-accent-gold">Ecosystems.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-text-secondary mb-12 max-w-[600px] leading-relaxed"
            >
              I merge advanced software engineering with data-driven media buying to build systems that don't just work—they scale revenue.
            </motion.p>

            {/* Metrics Grid */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-12 p-8 bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm rounded-2xl"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-accent-gold/60">
                  <TrendingUp size={14} />
                  <span className="font-mono text-[10px] tracking-widest uppercase">CPR</span>
                </div>
                <div className="text-3xl font-medium text-white tabular-nums">
                  {counts.cpr.toFixed(2)}<span className="text-sm ml-1 text-text-muted">EGP</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-accent-gold/60">
                  <Code2 size={14} />
                  <span className="font-mono text-[10px] tracking-widest uppercase">CTR</span>
                </div>
                <div className="text-3xl font-medium text-white tabular-nums">
                  {counts.ctr.toFixed(2)}%
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 space-y-1">
                <div className="flex items-center gap-2 text-accent-gold/60">
                  <Globe size={14} />
                  <span className="font-mono text-[10px] tracking-widest uppercase">Conversions</span>
                </div>
                <div className="text-3xl font-medium text-white tabular-nums">
                  {counts.conv.toLocaleString()}+
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-6">
              <a
                href="#case-studies"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-accent-gold text-black font-bold text-sm uppercase tracking-widest overflow-hidden transition-all"
              >
                <span className="relative z-10">Explore Work</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-10 py-5 border border-white/10 text-white font-bold text-sm uppercase tracking-widest hover:border-accent-gold hover:text-accent-gold transition-all"
              >
                <Phone size={18} />
                Get in Touch
              </a>
            </motion.div>
          </div>

          {/* Portrait Section */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 xl:col-span-4 relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-[450px] mx-auto group">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-accent-gold/20 rounded-2xl group-hover:-inset-2 transition-all duration-500" />
              <div className="absolute -inset-px bg-gradient-to-b from-accent-gold/20 to-transparent rounded-2xl" />
              
              {/* Main Image Container */}
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#111] border border-white/10">
                <motion.img
                  src="/hero-portrait.jpg"
                  alt="Yomna Ali Salama"
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl">
                    <p className="font-mono text-[10px] text-accent-gold tracking-[0.2em] mb-1 uppercase">Availability</p>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <p className="text-xs text-white font-medium uppercase tracking-wider">Open for Global Projects</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Modern Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4"
      >
        <span className="font-mono text-[9px] tracking-[0.4em] text-text-muted uppercase">Discover</span>
        <div className="w-px h-16 bg-gradient-to-b from-accent-gold to-transparent relative">
          <motion.div 
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-[-1px] w-[3px] h-3 bg-accent-gold rounded-full shadow-[0_0_10px_#D4AF37]"
          />
        </div>
      </motion.div>
    </section>
  )
}
