import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

// Import the exact images from chat - for left side falling images
import poiint from '../assets/poiint.png'
import arenaLogo from '../assets/Arena.png'
import avalancheBadge from '../assets/avva.png'
import arenaBadge from '../assets/arenna.png'
import dexalot from '../assets/dexalot.png'
import audius  from '../assets/audius.png';
import ava from '../assets/ava.png'

// Import for trending tokens
import pepeToken from '../assets/pepe-token.png'
import svLogo from '../assets/SV-Logo-200x200.png'
import chainlink from '../assets/chainlink-new-logo.png'

// Images for the left container
const FLOATING_IMAGES = [
  {
    src: poiint,
    alt: 'Token Icon',
    width: 100,
    height: 100,
    delay: 0,
  },
  {
    src: arenaLogo,
    alt: 'The Arena',
    width: 110,
    height: 60,
    delay: 0.15,
  },
  {
    src: avalancheBadge,
    alt: 'Avalanche Badge',
    width: 95,
    height: 95,
    delay: 0.3,
  },
  {
    src: arenaBadge,
    alt: 'V Logo',
    width: 105,
    height: 105,
    delay: 0.45,
  },
  {
    src: dexalot,
    alt: 'Pink Mascot',
    width: 100,
    height: 100,
    delay: 0.6,
  },
  {
    src: audius,
    alt: 'Flag Holder',
    width: 110,
    height: 110,
    delay: 0.75,
  },
  {
    src: ava,
    alt: 'Union Badge',
    width: 90,
    height: 90,
    delay: 0.9,
  },
] as const

// Trending Tokens data (exact from screenshot)
const TRENDING_TOKENS = [
  {
    rank: 1,
    name: 'Sooner Than You Think',
    ticker: 'SOON',
    icon: 'S', // Will render as text
    bgColor: 'bg-black'
  },
  {
    rank: 2,
    name: 'SuperVerse',
    ticker: 'SUPER',
    icon: svLogo,
    bgColor: ''
  },
  {
    rank: 3,
    name: 'Chainlink',
    ticker: 'LINK',
    icon: chainlink,
    bgColor: ''
  },
  {
    rank: 4,
    name: 'Pepe',
    ticker: 'PEPE',
    icon: pepeToken,
    bgColor: ''
  },
  {
    rank: 5,
    name: 'WETH',
    ticker: 'WETH',
    icon: 'W', // Will render as text
    bgColor: 'bg-black'
  }
]

export default function AvalancheEcosystem() {
  const [activeCard, setActiveCard] = useState<'trending' | 'featured'>('trending')
  const [isHovering, setIsHovering] = useState(false)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const logoContainerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const accumulatedScroll = useRef(0)

  // Falling images animation with GSAP
  useEffect(() => {
    const animateImages = () => {
      const container = logoContainerRef.current
      if (!container) return

      const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect()

      imageRefs.current.forEach((img, index) => {
        if (!img) return
        const config = FLOATING_IMAGES[index]
        if (!config) return

        const maxX = Math.max(containerWidth - config.width, 0)
        const targetX = gsap.utils.random(0, maxX)
        const startX = targetX + gsap.utils.random(-150, 150)
        const startY = -containerHeight - gsap.utils.random(80, 220)
        const baseY = containerHeight - config.height
        const landingOffset = Math.min(60, Math.max(0, baseY)) // avoid going below floor
        const landingY = Math.max(0, baseY - gsap.utils.random(0, landingOffset))
        const dropDuration = gsap.utils.random(1.05, 1.6)
        const startRotation = gsap.utils.random(-35, 35)
        const endRotation = gsap.utils.random(-10, 10)

        gsap.fromTo(
          img,
          {
            x: startX,
            y: startY,
            rotation: startRotation,
            opacity: 0,
            transformOrigin: '50% 50%'
          },
          {
            x: targetX,
            y: landingY,
            rotation: endRotation,
            opacity: 1,
            duration: dropDuration,
            delay: config.delay,
            ease: 'bounce.out'
          }
        )
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            animateImages()
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Handle scroll/wheel events on card container
  const handleWheel = (e: React.WheelEvent) => {
    if (!isHovering) return

    e.preventDefault()
    accumulatedScroll.current += e.deltaY

    // Threshold for switching cards (adjust for sensitivity)
    const threshold = 100

    if (Math.abs(accumulatedScroll.current) >= threshold) {
      if (accumulatedScroll.current > 0) {
        // Scrolling down - show featured projects
        setActiveCard('featured')
      } else {
        // Scrolling up - show trending tokens
        setActiveCard('trending')
      }
      accumulatedScroll.current = 0
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-20 px-6 lg:px-16 overflow-hidden"
    >
      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto mb-20">
        <div className="inline-block mb-6">
          <span className="bg-[#FF3B5C] text-white text-sm font-bold px-5 py-2 rounded-full">
            Token & Trends
          </span>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-black mb-6 max-w-3xl">
          Discover Avalanche's Ecosystem
        </h2>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl leading-relaxed">
          Discover a wide variety of apps, blockchains, wallets and explorers, 
          built on the Avalanche ecosystem by developers and contributors from across the globe
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Column - Falling Images Container */}
        <div
          ref={logoContainerRef}
          className="relative w-full h-[600px] bg-gray-100 rounded-[32px] hidden lg:block overflow-hidden"
        >
          {FLOATING_IMAGES.map((image, index) => {
            return (
              <div
                key={index}
                ref={(el) => {
                  imageRefs.current[index] = el
                }}
                className="absolute pointer-events-none"
                style={{
                  width: image.width,
                  height: image.height,
                  top: 0,
                  left: 0,
                  opacity: 0,
                }}
              >
                <img src={image.src} alt={image.alt} className="w-full h-full object-contain" />
              </div>
            )
          })}
        </div>

        {/* Right Column - Stacked Cards */}
        <div
          className="relative w-full h-[600px]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false)
            accumulatedScroll.current = 0
          }}
          onWheel={handleWheel}
        >
          <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
            <AnimatePresence mode="sync">
              {/* Featured Projects Card (Back) */}
              <motion.div
                key="featured"
                initial={false}
                animate={{
                  y: activeCard === 'featured' ? 0 : 30,
                  opacity: activeCard === 'featured' ? 1 : 0.7,
                  scale: activeCard === 'featured' ? 1 : 0.96,
                  zIndex: activeCard === 'featured' ? 20 : 10,
                  rotateX: activeCard === 'featured' ? 0 : 5,
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                style={{ transformStyle: 'preserve-3d' }}
                className="absolute inset-0 w-full"
              >
                <div className="w-full h-full bg-white rounded-[24px] shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
                  <div className="px-10 py-6 border-b border-gray-200">
                    <h3 className="text-3xl font-bold text-black">Featured Projects</h3>
                  </div>
                  <div className="flex-1 p-6 overflow-hidden">
                    <p className="text-gray-500 text-sm">Gaming and DeFi projects on Avalanche</p>
                  </div>
                </div>
              </motion.div>

              {/* Trending Tokens Card (Front) */}
              <motion.div
                key="trending"
                initial={false}
                animate={{
                  y: activeCard === 'trending' ? 0 : 30,
                  opacity: activeCard === 'trending' ? 1 : 0.7,
                  scale: activeCard === 'trending' ? 1 : 0.96,
                  zIndex: activeCard === 'trending' ? 20 : 10,
                  rotateX: activeCard === 'trending' ? 0 : 5,
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                style={{ transformStyle: 'preserve-3d' }}
                className="absolute inset-0 w-full"
              >
                <div className="w-full h-full bg-black rounded-[24px] shadow-2xl overflow-hidden flex flex-col">
                  {/* Card Header */}
                  <div className="px-10 py-6 border-b border-gray-800">
                    <h3 className="text-3xl font-bold text-white">Trending Tokens</h3>
                    <p className="text-gray-400 text-sm mt-1">What's hot right now in the world of Web3</p>
                  </div>
                  
                  {/* Card Content */}
                  <div className="flex-1 px-10 py-6 space-y-1 overflow-y-auto">
                    {TRENDING_TOKENS.map((token, idx) => (
                      <motion.div
                        key={token.rank}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-6 py-4 border-b border-gray-800 last:border-0 hover:bg-gray-900/30 transition-colors cursor-pointer"
                      >
                        <div className="text-lg font-normal text-gray-500 w-8">
                          {token.rank}.
                        </div>
                        <div className={`w-14 h-14 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center ${token.bgColor}`}>
                          {typeof token.icon === 'string' && token.icon.length <= 2 ? (
                            <span className="text-white text-2xl font-bold">{token.icon}</span>
                          ) : (
                            <img 
                              src={token.icon} 
                              alt={token.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold text-lg">
                            {token.name}
                          </h4>
                          <p className="text-gray-500 text-sm uppercase tracking-wide">{token.ticker}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

