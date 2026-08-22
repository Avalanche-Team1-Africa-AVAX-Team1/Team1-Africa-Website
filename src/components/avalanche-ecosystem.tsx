import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import AnimatedText from './AnimatedText'

// Import the exact images from chat - for left side falling images
import poiint from '../assets/poiint.png'
import arenaLogo from '../assets/Arena.webp'
import avalancheBadge from '../assets/avva.png'
import arenaBadge from '../assets/arenna.png'
import dexalot from '../assets/dexalot.webp'
import audius from '../assets/audius.png'
import ava from '../assets/ava.png'

// Assets for cards
import yellowKet from '../assets/ket 2.webp'
import benqiToken from '../assets/Benqi_Token_Ticker_White 2.png'
import enclaveMarkets from '../assets/gee.png'
import offTheGridLogo from '../assets/off-the-grid.webp'
import coqInu from '../assets/gunz.webp'
// import onlydust from '../assets/onlydust.webp'
// import sqauds from '../assets/sqauds.png'
// import refi from '../assets/refi.png'

// Images for the left container
const FLOATING_IMAGES = [
  {
    src: poiint,
    alt: 'Token Icon',
    width: 100,
    height: 100,
    delay: 0,
    shape: 'circle' as const,
  },
  {
    src: arenaLogo,
    alt: 'The Arena',
    width: 110,
    height: 60,
    delay: 0.15,
    shape: 'rounded' as const,
  },
  {
    src: avalancheBadge,
    alt: 'Avalanche Badge',
    width: 95,
    height: 95,
    delay: 0.3,
    shape: 'circle' as const,
  },
  {
    src: arenaBadge,
    alt: 'V Logo',
    width: 105,
    height: 105,
    delay: 0.45,
    shape: 'circle' as const,
  },
  {
    src: dexalot,
    alt: 'Pink Mascot',
    width: 100,
    height: 100,
    delay: 0.6,
    shape: 'rounded' as const,
  },
  {
    src: audius,
    alt: 'Flag Holder',
    width: 110,
    height: 110,
    delay: 0.75,
    shape: 'circle' as const,
  },
  {
    src: ava,
    alt: 'Union Badge',
    width: 90,
    height: 90,
    delay: 0.9,
    shape: 'rounded' as const,
  },
  {
    src: yellowKet,
    alt: 'Yellow Ket',
    width: 80,
    height: 80,
    delay: 1.5,
    shape: 'circle' as const,
  },
  {
    src: benqiToken,
    alt: 'BENQI',
    width: 100,
    height: 55,
    delay: 1.65,
    shape: 'rounded' as const,
  },
  {
    src: enclaveMarkets,
    alt: 'Enclave Markets',
    width: 90,
    height: 90,
    delay: 1.8,
    shape: 'circle' as const,
  },
  {
    src: coqInu,
    alt: 'Coq Inu',
    width: 105,
    height: 60,
    delay: 1.95,
    shape: 'rounded' as const,
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
] as const

export default function AvalancheEcosystem() {
  const [activeCard, setActiveCard] = useState<'trending' | 'featured'>('trending')
  const [isHovering, setIsHovering] = useState(false)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const logoContainerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const slideshowInterval = useRef<number | null>(null)

  // Auto-slideshow effect - switches every 3 seconds, pauses on hover
  useEffect(() => {
    const startSlideshow = () => {
      if (slideshowInterval.current) {
        clearInterval(slideshowInterval.current)
      }

      slideshowInterval.current = setInterval(() => {
        if (!isHovering) {
          setActiveCard(prev => prev === 'trending' ? 'featured' : 'trending')
        }
      }, 3000)
    }

    startSlideshow()

    return () => {
      if (slideshowInterval.current) {
        clearInterval(slideshowInterval.current)
      }
    }
  }, [isHovering])

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
        const landingY = containerHeight - config.height // Icons can now drop to the very bottom
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



  const renderFeaturedCard = () => {
    const isActive = activeCard === 'featured'

    return (
      <motion.div
        key="featured"
        initial={false}
        animate={{
          y: isActive ? 0 : -60,
          opacity: 1,
          scale: isActive ? 1 : 0.92,
          zIndex: isActive ? 40 : 12,
          rotateX: isActive ? 0 : -6,
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
          y: isActive ? 0 : -60,
          opacity: 1,
          scale: isActive ? 1 : 0.92,
          zIndex: isActive ? 50 : 18,
          rotateX: isActive ? 0 : -6,
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
        <AnimatedText variant="scale" delay={0.1}>
          <div className="inline-block">
            <motion.div
              initial={{ rotate: -12 }}
              className="inline-block bg-red-600 px-6 py-3 rounded-xl text-base text-white font-semibold mb-6 shadow-lg"
            >
              Ecosystem
            </motion.div>
          </div>
        </AnimatedText>
        <AnimatedText variant="slideUp" delay={0.2}>
          <h2 className="text-3xl lt-768:text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-6 max-w-3xl">
            Discover Avalanche's Ecosystem
          </h2>
        </AnimatedText>
        <AnimatedText variant="slideUp" delay={0.3}>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
            Discover a wide variety of apps, blockchains, wallets and explorers,
            built on the Avalanche ecosystem by developers and contributors from across the globe
          </p>
        </AnimatedText>
        <AnimatedText variant="fadeIn" delay={0.4}>
          <a
            href="https://core.app/discover"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Explore Ecosystem
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </AnimatedText>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left Column - Falling Images Container */}
        <AnimatedText variant="fadeIn" delay={0.4}>
          <div
            ref={logoContainerRef}
            className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-gray-100 rounded-[32px] overflow-hidden p-0 m-0"
          >
            {FLOATING_IMAGES.map((image, index) => {
              return (
                <div
                  key={index}
                  ref={(el) => {
                    imageRefs.current[index] = el
                  }}
                  className={`absolute pointer-events-none ${image.shape === 'circle' ? 'rounded-full' : 'rounded-md'
                    }`}
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
        </AnimatedText>

        {/* Right Column - Stacked Cards */}
        <AnimatedText variant="fadeIn" delay={0.5}>
          {/* Desktop: Animated stacked cards */}
          <div
            className="hidden lg:block relative w-full h-[600px]"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative w-full h-full" style={{ perspective: '1400px' }}>
              <AnimatePresence initial={false} mode="sync">
                {renderFeaturedCard()}
                {renderTrendingCard()}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile/Tablet: Simple block display - Full content, no scroll */}
          <div className="lg:hidden space-y-6">
            {/* Featured Projects Card */}
            <div className="relative w-full bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Folder Tab */}
              <div className="bg-black px-6 md:px-12 pt-4 md:pt-6 pb-3 md:pb-4 rounded-t-2xl relative">
                <div className="absolute top-0 left-0 w-32 md:w-40 h-8 md:h-10 bg-black -translate-y-full rounded-t-xl"></div>
                <h3 className="text-xl md:text-2xl font-semibold text-white">Featured Projects</h3>
                <p className="text-xs md:text-sm text-white/80 mt-1">
                  Gaming and DeFi projects on Avalanche
                </p>
              </div>

              {/* Content */}
              <div className="px-6 md:px-12 py-4 md:py-6 bg-white">
                <ul className="space-y-3 md:space-y-4">
                  {FEATURED_PROJECTS.map((project) => (
                    <li key={project.rank} className="flex items-center gap-3 md:gap-6 py-3 md:py-4 border-b border-dashed border-slate-200 last:border-none">
                      <span className="text-sm md:text-base font-medium text-slate-400 w-6">{project.rank}.</span>
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-white ring-1 ring-slate-200 flex-shrink-0">
                        <img src={project.icon} alt={project.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-base md:text-lg font-semibold text-slate-900">{project.name}</p>
                        <p className="text-xs md:text-sm text-slate-500">{project.category}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Trending Tokens Card */}
            <div className="relative w-full bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Folder Tab */}
              <div className="bg-red-500 px-6 md:px-12 pt-4 md:pt-6 pb-3 md:pb-4 rounded-t-2xl relative">
                <div className="absolute top-0 left-0 w-32 md:w-40 h-8 md:h-10 bg-red-500 -translate-y-full rounded-t-xl"></div>
                <h3 className="text-xl md:text-2xl font-semibold text-white">Trending Tokens</h3>
                <p className="text-xs md:text-sm text-white/80 mt-1">What's hot right now in the world of Web3</p>
              </div>

              {/* Content */}
              <div className="px-6 md:px-12 py-4 md:py-6 bg-white">
                <ul className="space-y-3 md:space-y-4">
                  {TRENDING_TOKENS.map((token) => (
                    <li
                      key={token.rank}
                      className="flex items-center gap-3 md:gap-6 py-3 md:py-4 border-b border-dashed border-slate-200 last:border-none"
                    >
                      <span className="text-sm md:text-base font-medium text-slate-400 w-6">{token.rank}.</span>
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-white shadow-sm ring-1 ring-slate-200 flex-shrink-0">
                        <img src={token.icon} alt={token.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-base md:text-lg font-semibold text-slate-900">{token.name}</p>
                        <p className="text-xs md:text-sm text-slate-500">{token.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </AnimatedText>
      </div>
    </section>
  )
}