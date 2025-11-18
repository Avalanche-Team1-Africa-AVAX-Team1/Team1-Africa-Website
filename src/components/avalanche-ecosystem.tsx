import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

// Import the exact images from chat - for left side falling images
import poiint from '../assets/poiint.png'
import arenaLogo from '../assets/Arena.png'
import avalancheBadge from '../assets/avva.png'
import arenaBadge from '../assets/arenna.png'
import dexalot from '../assets/dexalot.png'
import audius from '../assets/audius.png'
import ava from '../assets/ava.png'

// Assets for cards
import yellowKet from '../assets/ket 2.png'
import benqiToken from '../assets/Benqi_Token_Ticker_White 2.png'
import enclaveMarkets from '../assets/gee.png'
import offTheGridLogo from '../assets/off-the-grid.jpg'
import coqInu from '../assets/gunz.png'
import onlydust from '../assets/onlydust.png'
import sqauds from '../assets/sqauds.png'
import refi from '../assets/refi.png'

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
    name: 'yellow ket',
    description: 'Memecoin',
    icon: yellowKet,
  },
  {
    rank: 2,
    name: 'BENQI',
    description: 'DeFi, Lending',
    icon: benqiToken,
  },
  {
    rank: 3,
    name: 'Enclave Markets',
    description: 'FEX, Exchanges & On-Ramps',
    icon: enclaveMarkets,
  },
  {
    rank: 4,
    name: 'Off The Grid',
    description: 'Gaming',
    icon: offTheGridLogo,
  },
  {
    rank: 5,
    name: 'Coq Inu',
    description: '--------',
    icon: coqInu,
  },
] as const

const FEATURED_PROJECTS = [
  {
    rank: 1,
    name: 'Dexalot',
    description: 'Orderbook DEX for Avalanche',
    category: 'Trading',
    icon: dexalot,
  },
  {
    rank: 2,
    name: 'Audius',
    description: 'Decentralized music streaming',
    category: 'Creator Economy',
    icon: audius,
  },
  {
    rank: 3,
    name: 'OnlyDust',
    description: 'Open-source ecosystem grants',
    category: 'Builder Tools',
    icon: onlydust,
  },
  {
    rank: 4,
    name: 'Squauds',
    description: 'Squad coordination for DAOs',
    category: 'Collaboration',
    icon: sqauds,
  },
  {
    rank: 5,
    name: 'ReFi DAO',
    description: 'Climate & impact finance',
    category: 'Impact',
    icon: refi,
  },
] as const

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

  const renderFeaturedCard = () => {
    const isActive = activeCard === 'featured'

    return (
      <motion.div
        key="featured"
        initial={false}
        animate={{
          y: isActive ? 0 : 26,
          opacity: isActive ? 1 : 0.6,
          scale: isActive ? 1 : 0.95,
          zIndex: isActive ? 40 : 12,
          rotateX: isActive ? 0 : -4,
        }}
        transition={{
          duration: 0.9,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{ transformStyle: 'preserve-3d', pointerEvents: isActive ? 'auto' : 'none' }}
        className="absolute inset-0 w-full"
      >
        <div className="relative h-full w-full">
          <svg
            viewBox="0 0 663 633"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`absolute inset-0 h-full w-full select-none ${isActive ? 'drop-shadow-[0_32px_60px_rgba(15,23,42,0.22)]' : 'opacity-80'}`}
            preserveAspectRatio="none"
          >
            <path
              d="M20 633H643C654.046 633 663 624.046 663 613V65.472C663 54.4263 654.046 45.472 643 45.472H327.99C320.112 45.472 312.967 40.8467 309.743 33.6585L299.942 11.8135C296.718 4.62529 289.573 0 281.695 0H20C8.95428 0 0 8.95431 0 20V613C0 624.046 8.95428 633 20 633Z"
              fill="black"
            />
            <rect x="0.5" y="119.5" width="662" height="513" rx="14.5" fill="white" stroke="#D9D9D9" />
          </svg>

          <div className="absolute inset-0">
            {/* Header on the black tab */}
            <header className="absolute top-0 left-0 right-0 px-12 pt-8 pb-6">
              <h3 className="text-[28px] font-semibold text-white">Featured Projects</h3>
              <p className="text-sm text-white/80 mt-1">
                Gaming and DeFi projects on Avalanche
              </p>
            </header>

            {/* Content area */}
            <div className="absolute top-[119px] left-0 right-0 bottom-0 px-12 py-8">
              <ul className="h-full overflow-y-auto pr-2 scrollbar-hide">
                {FEATURED_PROJECTS.map((project) => (
                  <li key={project.rank} className="flex items-center gap-6 py-4 border-b border-dashed border-slate-200 last:border-none">
                    <span className="text-base font-medium text-slate-400 w-6">{project.rank}.</span>
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white ring-1 ring-slate-200 flex-shrink-0">
                      <img src={project.icon} alt={project.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-slate-900">{project.name}</p>
                      <p className="text-sm text-slate-500">{project.category}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  const renderTrendingCard = () => {
    const isActive = activeCard === 'trending'

    return (
      <motion.div
        key="trending"
        initial={false}
        animate={{
          y: isActive ? 0 : -24,
          opacity: isActive ? 1 : 0.6,
          scale: isActive ? 1 : 0.95,
          zIndex: isActive ? 50 : 18,
          rotateX: isActive ? 0 : -3,
        }}
        transition={{
          duration: 0.9,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{ transformStyle: 'preserve-3d', pointerEvents: isActive ? 'auto' : 'none' }}
        className="absolute inset-0 w-full"
      >
        <div className="relative h-full w-full">
          <svg
            viewBox="0 0 663 633"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`absolute inset-0 h-full w-full select-none ${isActive ? 'drop-shadow-[0_40px_70px_rgba(15,23,42,0.2)]' : 'opacity-80'}`}
            preserveAspectRatio="none"
          >
            <path
              d="M20 633H643C654.046 633 663 624.046 663 613V65.472C663 54.4263 654.046 45.472 643 45.472H327.99C320.112 45.472 312.967 40.8467 309.743 33.6585L299.942 11.8135C296.718 4.62529 289.573 0 281.695 0H20C8.95428 0 0 8.95431 0 20V613C0 624.046 8.95428 633 20 633Z"
              fill="#E53E3E"
            />
            <rect y="119" width="663" height="514" rx="15" fill="white" />
          </svg>

          <div className="absolute inset-0">
            {/* Header on the red tab */}
            <header className="absolute top-0 left-0 right-0 px-12 pt-8 pb-6">
              <h3 className="text-[28px] font-semibold text-white">Trending Tokens</h3>
              <p className="text-sm text-white/80 mt-1">What's hot right now in the world of Web3</p>
            </header>

            {/* Content area */}
            <div className="absolute top-[119px] left-0 right-0 bottom-0 px-12 py-8">
              <ul className="h-full overflow-y-auto pr-2 scrollbar-hide">
                {TRENDING_TOKENS.map((token) => (
                  <li
                    key={token.rank}
                    className="flex items-center gap-6 py-4 border-b border-dashed border-slate-200 last:border-none"
                  >
                    <span className="text-base font-medium text-slate-400 w-6">{token.rank}.</span>
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-sm ring-1 ring-slate-200 flex-shrink-0">
                      <img src={token.icon} alt={token.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-slate-900">{token.name}</p>
                      <p className="text-sm text-slate-500">{token.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    )
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
          <div className="relative w-full h-full" style={{ perspective: '1400px' }}>
            <AnimatePresence initial={false} mode="sync">
              {renderFeaturedCard()}
              {renderTrendingCard()}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

