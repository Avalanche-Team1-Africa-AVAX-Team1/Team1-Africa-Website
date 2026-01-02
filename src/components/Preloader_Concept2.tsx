import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import logo from '../assets/team1logo.png'

// Import community photos
import event1 from '../assets/event1-img.png'
import event2 from '../assets/event2-img.png'
import event3 from '../assets/event3.png'
import event4 from '../assets/event4.png'
import community from '../assets/community.png'
import collage from '../assets/collage.png'
import ghana1 from '../assets/ghana1.JPG'
import ghana2 from '../assets/ghana2.JPG'
import south1 from '../assets/south1.jpg'
import south2 from '../assets/south2.jpg'
import south3 from '../assets/south3.jpg'
import south5 from '../assets/south5.jpg'

const photos = [
    event1, event2, event3, event4,
    community, collage, ghana1, ghana2,
    south1, south2, south3, south5,
    // Duplicate for more volume
    event1, event3, community, ghana1,
    south2, event4, collage, south5,
    event2, ghana2, south1, south3
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

    // Generate semi-random positions based on a grid to ensure good spacing
    const [slidePositions] = useState(() => {
        // Create a 6x4 grid for the 24 images
        const gridSlots = []
        const cols = 6
        const rows = 4

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                gridSlots.push({
                    // Calculate center of each grid cell
                    x: (c / (cols - 1)) * 90 - 45, // -45vw to +45vw
                    y: (r / (rows - 1)) * 80 - 40  // -40vh to +40vh
                })
            }
        }

        // Shuffle grid slots so images don't appear in order
        const shuffledSlots = gridSlots.sort(() => Math.random() - 0.5)

        return photos.map((_, i) => {
            const slot = shuffledSlots[i] || { x: 0, y: 0 }

            return {
                rotation: (Math.random() - 0.5) * 40, // -20 to +20 degrees
                delay: i * 0.28, // Slower stagger (finishes around 7s)
                // Add randomness (jitter) to the grid position
                xPos: slot.x + (Math.random() * 10 - 5),
                yPos: slot.y + (Math.random() * 10 - 5),
                zIndex: Math.ceil(Math.random() * 10)
            }
        })
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
                {photos.map((src, i) => {
                    const pos = slidePositions[i]

                    return (
                        <motion.div
                            key={i}
                            className="absolute left-1/2 top-1/2 w-80 h-80 bg-white p-4 shadow-xl"
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
                            style={{
                                marginLeft: '-8rem',
                                marginTop: '-8rem',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
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
