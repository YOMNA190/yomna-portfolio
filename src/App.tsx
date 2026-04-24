import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import TrustStrip from './sections/TrustStrip'
import DualPositioning from './sections/DualPositioning'
import CaseStudies from './sections/CaseStudies'
import CodeToCash from './sections/CodeToCash'
import PerformanceDashboard from './sections/PerformanceDashboard'
import ProcessSection from './sections/ProcessSection'
import SecondaryProjects from './sections/SecondaryProjects'
import ContactSection from './sections/ContactSection'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh()
    
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <div className="min-h-screen bg-bg-core">
      <Navigation />
      <main>
        <Hero />
        <TrustStrip />
        <DualPositioning />
        <CaseStudies />
        <CodeToCash />
        <PerformanceDashboard />
        <ProcessSection />
        <SecondaryProjects />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}