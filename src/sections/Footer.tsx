import { ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-bg-core border-t border-border-dark py-12">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-text-muted tracking-[0.02em]">
          &copy; 2024 Yomna Ali Salama. All rights reserved.
        </p>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 font-mono text-xs text-text-muted tracking-[0.02em] hover:text-accent-gold transition-colors duration-200 group"
        >
          BACK TO TOP
          <ArrowUp
            size={14}
            className="group-hover:-translate-y-0.5 transition-transform duration-200"
          />
        </button>
      </div>
    </footer>
  )
}
