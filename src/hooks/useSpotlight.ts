import { useEffect, useRef } from 'react'

export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      el.style.setProperty('--spotlight-x', `${x}px`)
      el.style.setProperty('--spotlight-y', `${y}px`)
    }

    const handleMouseLeave = () => {
      el.style.setProperty('--spotlight-x', `-9999px`)
      el.style.setProperty('--spotlight-y', `-9999px`)
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return ref
}
