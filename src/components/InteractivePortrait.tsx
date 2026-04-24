import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface PortraitProps {
  src: string
  alt: string
}

export default function InteractivePortrait({ src, alt }: PortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Calculate tilt based on mouse position
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * 5
      const rotateY = ((centerX - x) / centerX) * 5

      setTilt({ x: rotateX, y: rotateY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => {
      setIsHovering(false)
      setTilt({ x: 0, y: 0 })
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/5] w-full max-w-[450px] mx-auto group perspective"
      style={{
        perspective: '1000px',
      }}
    >
      {/* Decorative Frame - Animated */}
      <motion.div
        className="absolute -inset-4 border border-accent-gold/20 rounded-2xl"
        animate={{
          borderColor: isHovering ? 'rgba(201, 168, 76, 0.5)' : 'rgba(201, 168, 76, 0.2)',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Glow Background */}
      <motion.div
        className="absolute -inset-8 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Main Image Container with Tilt */}
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-2xl bg-[#111] border border-white/10"
        style={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Image */}
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          whileHover={{ scale: 1.05 }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

        {/* Light Sweep Effect on Hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(135deg, rgba(247, 231, 206, 0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Floating Badge */}
        <motion.div
          className="absolute bottom-6 left-6 right-6"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="glass-effect p-4 rounded-xl">
            <p className="font-mono text-[10px] text-accent-gold tracking-[0.2em] mb-1 uppercase">
              Availability
            </p>
            <div className="flex items-center gap-2">
              <motion.span
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <p className="text-xs text-white font-medium uppercase tracking-wider">
                Open for Global Projects
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent-gold/30 rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent-gold/30 rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent-gold/30 rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent-gold/30 rounded-br-lg" />
    </div>
  )
}
