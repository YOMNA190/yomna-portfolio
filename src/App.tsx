import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './sections/Navigation'
import HeroNew from './sections/HeroNew'
import TrustStripNew from './sections/TrustStripNew'
import DualPositioning from './sections/DualPositioning'
import CaseStudiesNew from './sections/CaseStudiesNew'
import CodeToCash from './sections/CodeToCash'
import PerformanceDashboardNew from './sections/PerformanceDashboardNew'
import ProcessSection from './sections/ProcessSection'
import SecondaryProjectsNew from './sections/SecondaryProjectsNew'
import ContactSectionNew from './sections/ContactSectionNew'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh()
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  const cursorVariants = {
    default: {
      x: mousePos.x - 16,
      y: mousePos.y - 16,
      backgroundColor: 'rgba(212, 175, 55, 0.3)',
    },
    hover: {
      height: 64,
      width: 64,
      x: mousePos.x - 32,
      y: mousePos.y - 32,
      backgroundColor: 'rgba(212, 175, 55, 0.1)',
      border: '1px solid rgba(212, 175, 55, 0.5)',
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-accent-gold selection:text-black cursor-none">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] hidden md:block backdrop-blur-[2px]"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />

      <Navigation />
      <main 
        onMouseEnter={() => setCursorVariant('default')}
      >
        <div onMouseEnter={() => setCursorVariant('hover')} onMouseLeave={() => setCursorVariant('default')}>
          <HeroNew />
        </div>
        <TrustStripNew />
        <DualPositioning />
        <CaseStudiesNew />
        <CodeToCash />
        <PerformanceDashboardNew />
        <ProcessSection />
        <SecondaryProjectsNew />
        <ContactSectionNew />
      </main>
      <Footer />
      
      {/* Global CSS for Animations */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  )
}
