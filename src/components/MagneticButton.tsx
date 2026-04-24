import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
  target?: string
  rel?: string
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  target,
  rel,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return

      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distance = 100
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)

      const x = Math.cos(angle) * distance * 0.1
      const y = Math.sin(angle) * distance * 0.1

      setPosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isHovering])

  const baseClasses =
    'relative inline-flex items-center gap-3 px-10 py-5 font-bold text-sm uppercase tracking-widest overflow-hidden transition-all duration-300 rounded-lg'

  const variantClasses = {
    primary:
      'bg-accent-gold text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] active:scale-95',
    secondary:
      'border border-white/10 text-white hover:border-accent-gold hover:text-accent-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-95',
  }

  const Component = href ? 'a' : 'button'

  return (
    <motion.div
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.5,
      }}
    >
      <Component
        ref={buttonRef as React.Ref<HTMLAnchorElement & HTMLButtonElement>}
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false)
          setPosition({ x: 0, y: 0 })
        }}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        <span className="relative z-10">{children}</span>
      </Component>
    </motion.div>
  )
}
