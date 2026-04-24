import { motion } from 'framer-motion'
import { TrendingUp, Users, Zap, DollarSign, BarChart3 } from 'lucide-react'

const metrics = [
  { icon: TrendingUp, value: '7.85%', label: 'Avg CTR', description: 'Across all campaigns' },
  { icon: DollarSign, value: '1.47', label: 'EGP CPR', description: 'Meta ads benchmark' },
  { icon: Users, value: '1,600+', label: 'Conversions', description: 'Last 12 months' },
  { icon: Zap, value: '< 1s', label: 'Load Time', description: 'Performance target' },
  { icon: BarChart3, value: '1.2M', label: 'EGP GMV', description: 'Qena Market peak' },
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
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8"
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={itemVariants}
              className="group text-center"
            >
              <div className="flex items-center justify-center mb-3">
                <div className="p-2.5 rounded-lg glass-effect group-hover:bg-accent-gold/10 transition-colors duration-300">
                  <metric.icon size={18} className="text-accent-gold" />
                </div>
              </div>
              <p className="font-inter text-xl sm:text-2xl font-bold text-white mb-1">
                {metric.value}
              </p>
              <p className="font-mono text-[10px] text-accent-gold tracking-wider uppercase mb-0.5">
                {metric.label}
              </p>
              <p className="text-[11px] text-text-muted">{metric.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
