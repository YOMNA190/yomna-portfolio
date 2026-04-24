import { motion } from 'framer-motion'
import { Facebook, Search, Music, Youtube, Zap } from 'lucide-react'

const platforms = [
  { name: 'META', icon: Facebook, metric: '1.47 EGP', label: 'CPR' },
  { name: 'GOOGLE', icon: Search, metric: '7.85%', label: 'CTR' },
  { name: 'TIKTOK', icon: Music, metric: '3.2K', label: 'Clicks' },
  { name: 'YOUTUBE', icon: Youtube, metric: '950', label: 'Clicks' },
  { name: 'SNAPCHAT', icon: Zap, metric: '1.6K', label: 'Conv' },
]

export default function TrustStripNew() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="bg-bg-core border-y border-border-dark py-12 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12"
        >
          {platforms.map((platform) => (
            <motion.div
              key={platform.name}
              variants={itemVariants}
              className="group flex flex-col items-center gap-2 cursor-default"
            >
              {/* Icon */}
              <motion.div
                className="p-3 rounded-lg glass-effect group-hover:glow-gold transition-all duration-300"
                whileHover={{ scale: 1.1, y: -4 }}
              >
                <platform.icon size={20} className="text-accent-gold" />
              </motion.div>

              {/* Platform Name */}
              <span className="font-inter text-sm font-medium text-text-muted group-hover:text-text-secondary transition-colors duration-200 tracking-[0.05em]">
                {platform.name}
              </span>

              {/* Metric Badge */}
              <motion.div
                className="px-2 py-1 bg-accent-gold/10 border border-accent-gold/20 rounded-md text-center"
                whileHover={{ scale: 1.05 }}
              >
                <p className="font-mono text-[10px] font-bold text-accent-gold tracking-wider">
                  {platform.metric}
                </p>
                <p className="font-mono text-[8px] text-accent-gold/60 tracking-wider">
                  {platform.label}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center font-mono text-xs text-text-muted mt-8 tracking-[0.02em]"
        >
          Multi-platform growth across real businesses
        </motion.p>
      </div>
    </section>
  )
}
