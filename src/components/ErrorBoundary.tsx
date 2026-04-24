import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Portfolio ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-bg-core flex items-center justify-center px-6">
            <div className="text-center max-w-md">
              <p className="font-mono text-xs text-accent-gold tracking-[0.3em] uppercase mb-4">
                System Error
              </p>
              <h1 className="font-inter text-4xl font-bold text-white mb-4">
                Something went wrong.
              </h1>
              <p className="text-text-secondary mb-8">
                The portfolio encountered an unexpected issue. Please refresh the page or return home.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-accent-gold text-black font-mono text-xs uppercase tracking-widest font-bold rounded-lg hover:bg-white transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
