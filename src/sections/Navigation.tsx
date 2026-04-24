import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'Work', href: '#case-studies' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Process', href: '#process' },
  { name: 'Writing', href: '#writing' },
  { name: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] transition-all duration-500 py-6">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className={`
          relative flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-500
          ${isScrolled ? 'glass-effect-premium py-3' : 'bg-transparent'}
        `}>
          {/* Logo */}
          <a href="#" className="group flex items-center gap-2">
            <div className="w-8 h-8 bg-accent-gold rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <span className="text-black font-bold text-lg">Y</span>
            </div>
            <span className="font-inter font-bold text-xl tracking-tight text-white group-hover:text-accent-gold transition-colors">
              Yomna<span className="text-accent-gold group-hover:text-white">.dev</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary hover:text-accent-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://wa.me/201069807254"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-accent-gold text-black font-mono text-[11px] uppercase tracking-widest font-bold rounded-lg hover:bg-white transition-all duration-300"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="fixed inset-0 z-[90] bg-[#050505] flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="font-inter text-4xl font-bold text-white hover:text-accent-gold transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="https://wa.me/201069807254"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.05 }}
              className="mt-4 px-8 py-3 bg-accent-gold text-black font-mono text-sm uppercase tracking-widest font-bold rounded-lg"
            >
              Hire Me
            </motion.a>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-white p-2"
              aria-label="Close menu"
            >
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
