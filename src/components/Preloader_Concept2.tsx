import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import logo from '../assets/team1logo.png'

// Import community photos
import event1 from '../assets/event1-img.webp'
import event2 from '../assets/event2-img.webp'
import event3 from '../assets/event3.webp'
import event4 from '../assets/event4.webp'
import community from '../assets/community.webp'
import collage from '../assets/collage.webp'
import ghana1 from '../assets/ghana1.webp'
import ghana2 from '../assets/ghana2.webp'
import south1 from '../assets/south1.webp'
import south2 from '../assets/south2.webp'
import south3 from '../assets/south3.webp'
import south5 from '../assets/south5.webp'

// Only 12 unique images - no duplicates
const photos = [
    event1, event2, event3, event4,
    community, collage, ghana1, ghana2,
    south1, south2, south3, south5
]

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0)


    useEffect(() => {
        const minLoadTime = 10000 // 10 seconds
        const startTime = Date.now()
        let animationFrameId: number

        const animateProgress = () => {
            const elapsed = Date.now() - startTime
            const newProgress = Math.min((elapsed / minLoadTime) * 100, 100)
            setProgress(newProgress)

            if (newProgress < 100) {
                animationFrameId = requestAnimationFrame(animateProgress)
            } else {
                // Animation complete
                // Short buffer before triggering parent transition
                setTimeout(onComplete, 500)
            }
        }

        animationFrameId = requestAnimationFrame(animateProgress)
        return () => cancelAnimationFrame(animationFrameId)
    }, [onComplete])

    // Responsive configuration based on screen size
    const [imageCount] = useState(() => {
        const width = window.innerWidth
        if (width < 768) return 4          // Mobile
        if (width < 1024) return 6         // Tablet
        if (width < 1280) return 8         // Small Laptop
        if (width < 1440) return 10        // Desktop
        return 12                          // Large Desktop
    })

    const [imageSize] = useState(() => {
        const width = window.innerWidth
        if (width < 768) return 200        // Mobile: smaller images
        if (width < 1024) return 240       // Tablet
        if (width < 1280) return 280       // Small Laptop
        return 320                         // Desktop & up: full size
    })

    // Generate scattered positions with guaranteed spacing
    const [slidePositions] = useState(() => {
        const positions: { xPos: number; yPos: number; rotation: number; delay: number; zIndex: number }[] = []

        // Responsive canvas spread
        const width = window.innerWidth
        let canvasWidth = 85
        let canvasHeight = 75
        let minDistance = 25

        // Adjust canvas and spacing for smaller screens
        if (width < 768) {
            canvasWidth = 70
            canvasHeight = 65
            minDistance = 30  // More spacing on mobile
        } else if (width < 1024) {
            canvasWidth = 75
            canvasHeight = 70
            minDistance = 28
        } else if (width < 1280) {
            canvasWidth = 80
            canvasHeight = 72
            minDistance = 26
        }

        interface PlacedImage {
            x: number
            y: number
        }
        const placed: PlacedImage[] = []

        // Only place the number of images appropriate for this screen size
        const numImages = width < 768 ? 4 : width < 1024 ? 6 : width < 1280 ? 8 : width < 1440 ? 10 : 12

        for (let i = 0; i < numImages; i++) {
            let bestX = 0
            let bestY = 0
            let bestDistance = 0

            // Try many random positions and pick the one furthest from others
            for (let attempt = 0; attempt < 2000; attempt++) {
                // Random position across viewport
                const x = (Math.random() - 0.5) * canvasWidth
                const y = (Math.random() - 0.5) * canvasHeight

                // Find minimum distance to any existing image
                let minDist = Infinity
                for (const p of placed) {
                    const dist = Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2)
                    if (dist < minDist) minDist = dist
                }

                // If this is the first image or this position is better (further from others)
                if (placed.length === 0 || minDist > bestDistance) {
                    bestX = x
                    bestY = y
                    bestDistance = minDist
                }
            }

            // Only add position if it meets minimum distance OR if we have no choice
            if (placed.length === 0 || bestDistance >= minDistance * 0.6) {
                placed.push({ x: bestX, y: bestY })
            } else {
                // Force placement anyway but try to spread it out
                const angle = (i / numImages) * Math.PI * 2
                bestX = Math.cos(angle) * (canvasWidth * 0.4) + (Math.random() - 0.5) * 15
                bestY = Math.sin(angle) * (canvasHeight * 0.4) + (Math.random() - 0.5) * 15
                placed.push({ x: bestX, y: bestY })
            }

            positions[i] = {
                xPos: bestX,
                yPos: bestY,
                rotation: (Math.random() - 0.5) * 50, // -25 to +25 degrees
                delay: i * 0.4,
                zIndex: Math.floor(Math.random() * numImages) + 1
            }
        }

        return positions
    })

    return (
        // Layout handles the exit animation now
        <div className="absolute inset-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center font-mono"
            style={{
                background: 'radial-gradient(circle at center, #ffffff 0%, #e8e8e8 100%)',
                zIndex: 50
            }}
        >
            {/* Subtle Grid Texture */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Scattered Slides */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {photos.slice(0, imageCount).map((src, i) => {
                    const pos = slidePositions[i]
                    if (!pos) return null

                    return (
                        <motion.div
                            key={i}
                            className="absolute left-1/2 top-1/2 bg-white shadow-xl"
                            style={{
                                width: imageSize,
                                height: imageSize,
                                padding: imageSize * 0.0125, // 4px for 320px, scales proportionally
                                marginLeft: -(imageSize / 2),
                                marginTop: -(imageSize / 2),
                                boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
                            }}
                            initial={{ x: 1000, y: 1000, rotate: 90, opacity: 0 }}
                            animate={{
                                x: `${pos.xPos}vw`,
                                y: `${pos.yPos}vh`,
                                rotate: pos.rotation,
                                opacity: 1,
                                zIndex: pos.zIndex
                            }}
                            transition={{
                                type: 'spring',
                                damping: 20,
                                stiffness: 60,
                                delay: pos.delay
                            }}

                        >
                            {/* Slide Frame Content */}
                            <div className="w-full h-[85%] bg-black relative overflow-hidden">
                                <img src={src} className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" alt="slide" />
                                {/* Film Grain Overlay */}
                                <div className="absolute inset-0 bg-white/5 pointer-events-none mix-blend-overlay"></div>
                            </div>
                            {/* Slide Markings */}
                            <div className="h-[15%] flex items-end justify-between px-1 pt-1">
                                <span className="text-[10px] text-gray-400">KODAK PORTRA</span>
                                <span className="text-[10px] text-gray-400">#{i + 1}</span>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Full Width Glass Progress Footer */}
            <div className="absolute bottom-0 left-0 right-0 z-50">
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white/30 backdrop-blur-md border-t border-white/50 px-8 py-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex items-center gap-6"
                >
                    {/* Logo Icon */}
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                        <img src={logo} className="w-7 h-7 object-contain" alt="" />
                    </div>

                    {/* Progress Track */}
                    <div className="flex-1 h-3 bg-black/10 rounded-full overflow-hidden relative">
                        <motion.div
                            className="h-full bg-red-600 rounded-full relative"
                            style={{ width: `${progress}%` }}
                        >
                            {/* Shine effect */}
                            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/40 blur-[2px]" />
                        </motion.div>
                    </div>

                    {/* Percentage */}
                    <div className="font-mono text-lg font-bold text-gray-900 w-16 text-right flex-shrink-0">
                        {Math.floor(progress)}%
                    </div>
                </motion.div>
            </div>

        </div>
    )
}
