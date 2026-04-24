import { ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const links = [
    { name: 'Work', href: '#case-studies' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Process', href: '#process' },
    { name: 'Writing', href: '#writing' },
    { name: 'Contact', href: '#contact' },
  ]

  const socials = [
    { icon: Github, href: 'https://github.com/YOMNA190', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yomna-ali-salama', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:contact@yomna.dev', label: 'Email' },
  ]

  return (
    <footer className="bg-bg-core border-t border-border-dark py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <a href="#" className="group flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent-gold rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <span className="text-black font-bold text-lg">Y</span>
              </div>
              <span className="font-inter font-bold text-xl tracking-tight text-white group-hover:text-accent-gold transition-colors">
                Yomna<span className="text-accent-gold group-hover:text-white">.dev</span>
              </span>
            </a>
            <p className="text-sm text-text-secondary max-w-[300px] leading-relaxed">
              Full-stack engineer and growth strategist building systems that dominate markets.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase mb-4">
              Navigation
            </p>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent-gold transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-4">
            <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase mb-4">
              Connect
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-text-muted hover:text-accent-gold hover:border-accent-gold/30 transition-all"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-dark flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-text-muted tracking-[0.02em]">
            &copy; {currentYear} Yomna Ali Salama. All rights reserved.
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
      </div>
    </footer>
  )
}
