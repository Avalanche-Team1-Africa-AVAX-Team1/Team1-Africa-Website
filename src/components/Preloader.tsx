import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import logo from '../assets/team1logo.png'

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState<'loading' | 'morphing' | 'exploding' | 'complete'>('loading')
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate loading progress
    const duration = 10000 // 4 seconds total loading time
    const interval = 50
    const increment = (interval / duration) * 100

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment
        if (next >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return next
      })
    }, interval)

    return () => clearInterval(progressInterval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      // Stage 1: Morphing animation
      setStage('morphing')
      
      const tl = gsap.timeline({
        onComplete: () => {
          setStage('exploding')
          
          // Stage 2: Explosion and exit
          setTimeout(() => {
            if (logoRef.current && particlesRef.current) {
              // Create particle explosion
              gsap.to(logoRef.current, {
                scale: 3,
                opacity: 0,
                duration: 0.8,
                ease: 'power4.in'
              })

              // Particles burst out
              const particles = particlesRef.current.children
              Array.from(particles).forEach((particle, i) => {
                const angle = (i / particles.length) * Math.PI * 2
                const distance = 800
                const x = Math.cos(angle) * distance
                const y = Math.sin(angle) * distance
                
                gsap.to(particle, {
                  x,
                  y,
                  opacity: 0,
                  scale: 0,
                  duration: 1.2,
                  ease: 'power3.out',
                  delay: i * 0.02
                })
              })

              // Complete animation
              setTimeout(() => {
                setStage('complete')
                onComplete()
              }, 1200)
            }
          }, 800)
        }
      })

      // Logo morphing animation
      if (logoRef.current) {
        tl.to(logoRef.current, {
          scale: 1.3,
          rotation: 360,
          duration: 0.6,
          ease: 'back.inOut'
        })
        .to(logoRef.current, {
          scale: 1,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)'
        })
      }
    }
  }, [progress, onComplete])

  // Generate particles
  const particleCount = 50
  const particles = Array.from({ length: particleCount }, (_, i) => i)

  return (
    <AnimatePresence>
      {stage !== 'complete' && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }} />
          </div>

          {/* Glitch Effect Overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: [0, 0.3, 0, 0.5, 0],
              x: [0, -5, 5, -5, 0],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatDelay: Math.random() * 3 + 2,
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-red-500/20 to-transparent" />
          </motion.div>

          {/* Pixel Text Background */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
            animate={{
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <h1
              className="text-[250px] lt-1920:text-[180px] lt-1440:text-[140px] font-bold text-white tracking-tight"
              style={{ fontFamily: "'Press Start 2P'" }}
            >
              TEAM1
            </h1>
          </motion.div>

          {/* Particles Container */}
          <div ref={particlesRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {particles.map((i) => {
              const size = Math.random() * 4 + 2
              const initialX = (Math.random() - 0.5) * 100
              const initialY = (Math.random() - 0.5) * 100
              
              return (
                <motion.div
                  key={i}
                  className="absolute bg-red-500"
                  style={{
                    width: size,
                    height: size,
                    x: initialX,
                    y: initialY,
                  }}
                  animate={{
                    scale: [0, 1, 0.5, 1],
                    opacity: [0, 1, 0.5, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.05,
                    ease: "easeInOut"
                  }}
                />
              )
            })}
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center gap-12">
            {/* Logo Container */}
            <motion.div
              className="relative"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Glowing Ring */}
              <motion.div
                className="absolute inset-0 -m-8"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-full h-full rounded-full border-4 border-red-500 blur-xl" />
              </motion.div>

              {/* Rotating Rings */}
              <motion.div
                className="absolute inset-0 -m-12"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="w-full h-full rounded-full border-2 border-red-500/30" />
              </motion.div>

              <motion.div
                className="absolute inset-0 -m-16"
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="w-full h-full rounded-full border border-red-500/20" />
              </motion.div>

              {/* Logo */}
              <motion.img
                ref={logoRef}
                src={logo}
                alt="Team1 Africa"
                className="w-40 h-40 relative z-10 drop-shadow-2xl"
                animate={{
                  filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Scanning Line */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  y: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
              </motion.div>
            </motion.div>

            {/* Loading Text */}
            <div className="flex flex-col items-center gap-6">
              <motion.div
                className="text-white text-2xl font-bold tracking-widest"
                animate={{
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {stage === 'loading' && (
                  <span className="flex items-center gap-2">
                    LOADING
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      .
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    >
                      .
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    >
                      .
                    </motion.span>
                  </span>
                )}
                {stage === 'morphing' && <span>INITIALIZING</span>}
                {stage === 'exploding' && <span>READY</span>}
              </motion.div>

              {/* Progress Bar */}
              <div className="w-80 h-2 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-500 via-red-600 to-red-500 relative"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.div>
              </div>

              {/* Progress Percentage */}
              <motion.div
                className="text-red-500 text-3xl font-bold tabular-nums"
                style={{ fontFamily: "'Press Start 2P'" }}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                }}
              >
                {Math.floor(progress)}%
              </motion.div>

              {/* Tagline */}
              <motion.p
                className="text-gray-400 text-sm tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Build. Create. Educate. On Avalanche. For Africa.
              </motion.p>
            </div>
          </div>

          {/* Corner Accents */}
          {[0, 1, 2, 3].map((corner) => (
            <motion.div
              key={corner}
              className="absolute w-20 h-20 border-red-500"
              style={{
                top: corner < 2 ? 20 : 'auto',
                bottom: corner >= 2 ? 20 : 'auto',
                left: corner % 2 === 0 ? 20 : 'auto',
                right: corner % 2 === 1 ? 20 : 'auto',
                borderTopWidth: corner < 2 ? 2 : 0,
                borderBottomWidth: corner >= 2 ? 2 : 0,
                borderLeftWidth: corner % 2 === 0 ? 2 : 0,
                borderRightWidth: corner % 2 === 1 ? 2 : 0,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: corner * 0.2,
              }}
            />
          ))}

          {/* CSS for grid animation */}
          <style>{`
            @keyframes gridMove {
              0% {
                transform: translate(0, 0);
              }
              100% {
                transform: translate(50px, 50px);
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

