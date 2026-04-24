import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'

gsap.registerPlugin(ScrollTrigger)

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0D0D0D',
      titleColor: '#C9A84C',
      bodyColor: '#F5F5F5',
      borderColor: '#1A1A1A',
      borderWidth: 1,
      titleFont: { family: 'JetBrains Mono', size: 11 },
      bodyFont: { family: 'Inter', size: 12 },
      padding: 12,
      displayColors: false,
    },
  },
  scales: {
    x: {
      grid: { color: '#1A1A1A' },
      ticks: { color: '#555555', font: { family: 'JetBrains Mono', size: 10 } },
      border: { display: false },
    },
    y: {
      grid: { color: '#1A1A1A' },
      ticks: { color: '#555555', font: { family: 'JetBrains Mono', size: 10 } },
      border: { display: false },
    },
  },
}

const ctrData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [4.2, 5.1, 5.8, 6.4, 7.2, 7.85],
      borderColor: '#C9A84C',
      backgroundColor: 'rgba(201, 168, 76, 0.1)',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#C9A84C',
      pointBorderColor: '#080808',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
}

const platformData = {
  labels: ['Meta', 'Google', 'TikTok', 'YouTube'],
  datasets: [
    {
      data: [3200, 2100, 1800, 950],
      backgroundColor: ['#C9A84C', '#1A1A1A', '#1A1A1A', '#1A1A1A'],
      borderColor: '#1A1A1A',
      borderWidth: 1,
      borderRadius: 2,
      barThickness: 40,
    },
  ],
}

const funnelData = {
  labels: ['Impressions', 'Clicks', 'Leads', 'Conversions'],
  datasets: [
    {
      data: [125000, 8200, 3400, 1600],
      backgroundColor: ['#1A1A1A', '#2A2A2A', '#333333', '#C9A84C'],
      borderColor: '#1A1A1A',
      borderWidth: 1,
      borderRadius: 2,
      barThickness: 32,
    },
  ],
}

const cprData = {
  labels: ['Meta', 'Google', 'TikTok', 'YouTube'],
  datasets: [
    {
      data: [1.47, 2.85, 1.92, 3.41],
      backgroundColor: ['#C9A84C', '#1A1A1A', '#1A1A1A', '#1A1A1A'],
      borderColor: '#1A1A1A',
      borderWidth: 2,
      cutout: '75%',
    },
  ],
}

export default function PerformanceDashboardNew() {
  const sectionRef = useRef<HTMLElement>(null)
  const chartsRef = useRef<(HTMLDivElement | null)[]>([])
  const [chartsVisible, setChartsVisible] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => setChartsVisible(true),
      })

      chartsRef.current.forEach((chart, i) => {
        if (!chart) return
        gsap.fromTo(
          chart,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: chart,
              start: 'top 85%',
            },
            delay: i * 0.12,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

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
    <section ref={sectionRef} id="analytics" className="bg-bg-core py-24 sm:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <motion.p
            variants={itemVariants}
            className="font-mono text-xs text-text-muted tracking-[0.04em] mb-4"
          >
            PERFORMANCE METRICS
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-inter text-4xl sm:text-5xl lg:text-6xl font-medium text-text-primary tracking-[-0.02em] mb-4"
          >
            Numbers that matter.
          </motion.h2>
          <motion.p variants={itemVariants} className="text-base text-text-secondary max-w-[600px]">
            Real campaign data. No vanity metrics.
          </motion.p>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CTR Trend */}
          <motion.div
            ref={(el) => {
              chartsRef.current[0] = el
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
            className="glass-effect p-6 sm:p-8 rounded-2xl group hover:glow-gold transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-mono text-[11px] text-text-muted tracking-[0.04em]">CTR TREND</p>
                <p className="font-inter text-2xl font-medium text-accent-gold mt-1">7.85%</p>
              </div>
              <span className="font-mono text-[11px] text-text-muted">6-MONTH AVG</span>
            </div>
            <div className="h-[220px]">
              {chartsVisible && (
                <Line
                  data={ctrData}
                  options={{
                    ...chartOptions,
                    scales: {
                      ...chartOptions.scales,
                      y: {
                        ...chartOptions.scales.y,
                        min: 3,
                        max: 9,
                      },
                    },
                  }}
                />
              )}
            </div>
          </motion.div>

          {/* Platform Distribution */}
          <motion.div
            ref={(el) => {
              chartsRef.current[1] = el
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-effect p-6 sm:p-8 rounded-2xl group hover:glow-gold transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-mono text-[11px] text-text-muted tracking-[0.04em]">
                  CLICKS BY PLATFORM
                </p>
                <p className="font-inter text-2xl font-medium text-accent-gold mt-1">8,050</p>
              </div>
              <span className="font-mono text-[11px] text-text-muted">TOTAL</span>
            </div>
            <div className="h-[220px]">
              {chartsVisible && <Bar data={platformData} options={chartOptions} />}
            </div>
          </motion.div>

          {/* Conversion Funnel */}
          <motion.div
            ref={(el) => {
              chartsRef.current[2] = el
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-effect p-6 sm:p-8 rounded-2xl group hover:glow-gold transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-mono text-[11px] text-text-muted tracking-[0.04em]">
                  CONVERSION FUNNEL
                </p>
                <p className="font-inter text-2xl font-medium text-accent-gold mt-1">1,600</p>
              </div>
              <span className="font-mono text-[11px] text-text-muted">CONVERSIONS</span>
            </div>
            <div className="h-[220px]">
              {chartsVisible && (
                <Bar
                  data={funnelData}
                  options={{
                    ...chartOptions,
                    indexAxis: 'y' as const,
                    scales: {
                      x: {
                        grid: { color: '#1A1A1A' },
                        ticks: {
                          color: '#555555',
                          font: { family: 'JetBrains Mono', size: 10 },
                          callback: function (tickValue: string | number) {
                            const value =
                              typeof tickValue === 'string' ? parseFloat(tickValue) : tickValue
                            return value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value.toString()
                          },
                        },
                        border: { display: false },
                      },
                      y: {
                        grid: { display: false },
                        ticks: {
                          color: '#8A8A8A',
                          font: { family: 'JetBrains Mono', size: 11 },
                        },
                        border: { display: false },
                      },
                    },
                  }}
                />
              )}
            </div>
          </motion.div>

          {/* Cost Efficiency */}
          <motion.div
            ref={(el) => {
              chartsRef.current[3] = el
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-effect p-6 sm:p-8 rounded-2xl group hover:glow-gold transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-mono text-[11px] text-text-muted tracking-[0.04em]">
                  COST EFFICIENCY
                </p>
                <p className="font-inter text-2xl font-medium text-accent-gold mt-1">1.47 EGP</p>
              </div>
              <span className="font-mono text-[11px] text-text-muted">AVG CPR</span>
            </div>
            <div className="h-[220px] flex items-center justify-center">
              {chartsVisible && (
                <Doughnut
                  data={cprData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        backgroundColor: '#0D0D0D',
                        titleColor: '#C9A84C',
                        bodyColor: '#F5F5F5',
                        borderColor: '#1A1A1A',
                        borderWidth: 1,
                        titleFont: { family: 'JetBrains Mono', size: 11 },
                        bodyFont: { family: 'Inter', size: 12 },
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                          label: (context: any) => ` ${context.parsed} EGP`,
                        },
                      },
                    },
                    cutout: '75%',
                  }}
                />
              )}
            </div>
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              {['Meta', 'Google', 'TikTok', 'YouTube'].map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: i === 0 ? '#C9A84C' : '#1A1A1A',
                    }}
                  />
                  <span className="font-mono text-[10px] text-text-muted">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
