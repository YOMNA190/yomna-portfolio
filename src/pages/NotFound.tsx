import { useEffect } from 'react'
import { Link } from 'react-router'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  useEffect(() => {
    document.title = '404 — Page Not Found | Yomna Ali Salama'
  }, [])

  return (
    <div className="min-h-screen bg-bg-core flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg">
        <p className="font-mono text-xs text-accent-gold tracking-[0.3em] uppercase mb-6">
          404 — Not Found
        </p>
        <h1 className="font-inter text-7xl sm:text-9xl font-bold text-white mb-4 tracking-tighter">
          404
        </h1>
        <p className="text-lg text-text-secondary mb-10">
          This page does not exist. The route may have changed or the link is broken.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent-gold text-black font-mono text-xs uppercase tracking-widest font-bold rounded-lg hover:bg-white transition-colors"
          >
            <Home size={16} />
            Back Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/10 text-white font-mono text-xs uppercase tracking-widest font-bold rounded-lg hover:border-accent-gold hover:text-accent-gold transition-colors"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
