import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

// Create columns of photos
const photos = [
    event1, event2, event3, event4,
    community, collage, ghana1, ghana2,
    south1, south2, south3, south5
]

// Determine columns (we'll split the photos into 4 arrays)
const columns = [
    [...photos, ...photos], // Col 1
    [...photos.reverse(), ...photos], // Col 2
    [...photos, ...photos], // Col 3
    [...photos.reverse(), ...photos]  // Col 4
]

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0)
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        const minLoadTime = 1200
        const maxLoadTime = 6000
        const startTime = Date.now()
        let animationFrameId: number
        let cancelled = false

        let loaded = 0
        const total = photos.length
        let assetsReady = total === 0

        const markLoaded = () => {
            loaded += 1
            if (loaded >= total) assetsReady = true
        }

        photos.forEach((src) => {
            const img = new Image()
            img.onload = markLoaded
            img.onerror = markLoaded
            img.src = src
        })

        const finish = () => {
            if (cancelled) return
            setProgress(100)
            setIsComplete(true)
            setTimeout(onComplete, 800)
        }

        const animateProgress = () => {
            const elapsed = Date.now() - startTime
            const loadRatio = total === 0 ? 1 : loaded / total
            const timeRatio = elapsed / minLoadTime

            setProgress(Math.min(loadRatio * 100, timeRatio * 100, 100))

            const done = (assetsReady && elapsed >= minLoadTime) || elapsed >= maxLoadTime
            if (done) {
                finish()
            } else {
                animationFrameId = requestAnimationFrame(animateProgress)
            }
        }

        animationFrameId = requestAnimationFrame(animateProgress)
        return () => {
            cancelled = true
            cancelAnimationFrame(animationFrameId)
        }
    }, [onComplete])

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ y: '-100%', opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[9999] overflow-hidden bg-gray-50 flex items-center justify-center"
                >
                    {/* Parallax Background Columns */}
                    <div className="absolute inset-0 flex gap-4 p-4">
                        {columns.map((colPhotos, colIndex) => (
                            <div key={colIndex} className="flex-1 overflow-hidden relative">
                                <motion.div
                                    className="flex flex-col gap-4"
                                    animate={{
                                        y: colIndex % 2 === 0 ? ['0%', '-50%'] : ['-50%', '0%']
                                    }}
                                    transition={{
                                        duration: 45 + colIndex * 8, // Slower speeds (was 25 + ...)
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                >
                                    {[...colPhotos, ...colPhotos].map((src, i) => (
                                        <div key={i} className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-gray-200 shadow-sm">
                                            <img
                                                src={src}
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    {/* Central Floating Card */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative z-10 bg-white/90 backdrop-blur-xl p-12 rounded-3xl shadow-2xl flex flex-col items-center gap-8 border border-white/50"
                        style={{
                            boxShadow: '0 20px 60px -10px rgba(0,0,0,0.15)'
                        }}
                    >
                        {/* Logo */}
                        <motion.img
                            src={logo}
                            alt="Team1"
                            className="w-24 h-24 object-contain"
                            animate={{
                                filter: ['drop-shadow(0 0 0px rgba(0,0,0,0))', 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))']
                            }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        />

                        {/* Typography */}
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">TEAM1 AFRICA</h2>
                            <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mt-2">Empowering Communities</p>
                        </div>
                    </motion.div>

                    {/* Full Width Progress Bar (Concept 2 Style) */}
                    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white py-4 border-t border-gray-100">
                        <div className="relative w-full h-2 bg-gray-200"
                            style={{
                                boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            {/* Segments */}
                            <div className="absolute inset-0 flex">
                                {[...Array(50)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 border-r border-gray-300/50"
                                    />
                                ))}
                            </div>

                            {/* Progress fill */}
                            <motion.div
                                className="h-full relative z-10 bg-red-600"
                                style={{
                                    width: `${progress}%`,
                                }}
                            >
                                {/* Animated shine */}
                                <motion.div
                                    className="absolute right-0 top-0 bottom-0 w-1 bg-white/50"
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                />
                            </motion.div>
                        </div>
                        {/* Percentage Label */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-sm font-bold text-red-600">
                            {Math.floor(progress)}%
                        </div>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    )
}
