import { useState, useEffect } from 'react'

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [direction, setDirection] = useState<'up' | 'down'>('up')
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const updatePosition = () => {
      const position = window.scrollY
      setScrollPosition(position)
      
      if (position > lastScrollY) {
        setDirection('down')
      } else {
        setDirection('up')
      }
      
      setLastScrollY(position)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updatePosition)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [lastScrollY])

  return { scrollPosition, direction }
}
