import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring } from 'framer-motion'
import { ReactLenis } from 'lenis/react'


// --- Types & Data ---

type SpotlightItem = {
    id: number
    badge: string
    title: string
    subtitle?: string
    role?: string
    description: string
    image: string
    color: 'red' | 'black'
}

const spotlights: SpotlightItem[] = [
    {
        id: 1,
        badge: '1st Place',
        title: 'Most Cracked Contributor of the Year – 2025',
        subtitle: 'Kwame Mensah',
        role: 'Lead Developer & Community Builder',
        description: 'Built 12 production subnets, trained 500+ developers across 8 African countries, and shipped the most-used Avalanche toolkit in the ecosystem.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200',
        color: 'red'
    },
    {
        id: 2,
        badge: 'Event of the Year',
        title: 'Top IRL Event of 2025',
        subtitle: 'Avalanche Africa Summit – Lagos',
        description: '1,200+ attendees, 45 projects launched, $8M in funding secured. The largest blockchain infrastructure event in African history.',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200',
        color: 'red'
    },
    {
        id: 3,
        badge: 'Product of the Year',
        title: 'Product of the Year – 2025',
        subtitle: 'AfriPay Cross-Border Network',
        description: 'Processed $24M across 12 African countries. 15,000+ merchants, sub-second settlements, zero failed transactions. Built entirely on Avalanche subnets.',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200',
        color: 'red'
    },
    {
        id: 4,
        badge: 'Top 5',
        title: 'Top Contributors of the Year',
        subtitle: 'The Builders Who Shaped 2025',
        description: 'Amara Okafor, Chidi Nwosu, Marcus Osei, Catherine De Verteuil, and Adam Cooney – the unstoppable force behind Africa\'s Avalanche growth.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200',
        color: 'black'
    },
    {
        id: 5,
        badge: 'December MVP',
        title: 'Top Contributors of December',
        subtitle: 'Closing the Year Strong',
        description: 'December\'s standout builders shipped 8 major updates, hosted 15 workshops, and onboarded 300+ new developers in the final month.',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200',
        color: 'black'
    }
]

// --- Components ---

function AnimatedCounter({ value, label }: { value: string, label: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    // Extract number from string (e.g. "500+" -> 500)
    const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0
    const suffix = value.replace(/[0-9]/g, '')

    const count = useSpring(0, { duration: 2000, bounce: 0 })
    const rounded = useTransform(count, (latest) => Math.round(latest))

    useEffect(() => {
        if (isInView) {
            count.set(numericValue)
        }
    }, [isInView, numericValue, count])

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300"
        >
            <div className="text-5xl md:text-6xl font-bold text-red-600 mb-2 flex items-baseline">
                <motion.span>{rounded}</motion.span>
                <span>{suffix}</span>
            </div>
            <div className="text-base text-gray-500 font-medium uppercase tracking-wide">{label}</div>
        </motion.div>
    )
}

function VideoSection() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    // Parallax effect for video image
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1])

    return (
        <div ref={ref} className="relative aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl group cursor-pointer">
            <motion.div style={{ y, scale }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <img
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200"
                    alt="2025 Wrapped Video"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                />
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center z-10">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-24 h-24 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg shadow-red-600/20"
                >
                    <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                </motion.button>
            </div>

            <div className="absolute bottom-8 left-8 text-white">
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-lg font-bold mb-1"
                >
                    2025 Year in Review
                </motion.p>
                <p className="text-sm text-gray-300">Watch the full story</p>
            </div>
        </div>
    )
}

// --- Main Page Component ---

export default function Spotlight() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const currentSpotlight = spotlights[currentIndex]

    // Auto-transition
    useEffect(() => {
        if (isHovered) return
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % spotlights.length)
        }, 7000)
        return () => clearInterval(interval)
    }, [isHovered])

    const goToNext = () => setCurrentIndex((prev) => (prev + 1) % spotlights.length)
    const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + spotlights.length) % spotlights.length)

    // Animation Variants
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
        }),
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    }

    return (
        <ReactLenis root>
            <div className="min-h-screen bg-white font-sans selection:bg-red-100 selection:text-red-900">

                {/* Hero Spotlight Section */}
                <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gray-100 rounded-full blur-3xl opacity-50" />
                        <div className="absolute top-40 -left-20 w-[300px] h-[300px] bg-red-50 rounded-full blur-3xl opacity-50" />
                    </div>

                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        {/* Section Header */}
                        <div className="mb-16">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-6xl md:text-8xl font-extrabold text-black mb-6 tracking-tight"
                            >
                                2025 Spotlight
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-xl md:text-2xl text-gray-500 max-w-2xl leading-relaxed"
                            >
                                Celebrating the biggest wins, boldest builders, and breakthrough moments that defined our year.
                            </motion.p>
                        </div>

                        {/* Spotlight Box */}
                        <motion.div
                            className="relative group perspective-1000"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-gray-50 rounded-[2.5rem] p-8 md:p-12 shadow-2xl ring-1 ring-black/5 relative overflow-hidden"
                                >
                                    {/* Progress Bar for Auto-play */}
                                    {!isHovered && (
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ duration: 7, ease: "linear" }}
                                            className="absolute top-0 left-0 right-0 h-1.5 bg-red-600 origin-left z-20"
                                        />
                                    )}

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
                                        {/* Left: Text Content */}
                                        <div className="flex flex-col justify-center relative z-10">
                                            {/* Badge */}
                                            <motion.div variants={fadeUpVariants} custom={0} initial="hidden" animate="visible" exit="exit" className="mb-8">
                                                <span className={`inline-flex items-center gap-2 px-4 py-2 ${currentSpotlight.color === 'red' ? 'bg-red-600 shadow-red-200' : 'bg-gray-900 shadow-gray-200'} shadow-lg text-white text-xs font-bold rounded-full tracking-wide uppercase`}>
                                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    {currentSpotlight.badge}
                                                </span>
                                            </motion.div>

                                            {/* Title */}
                                            <motion.h2 variants={fadeUpVariants} custom={1} initial="hidden" animate="visible" exit="exit" className="text-3xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-6 leading-[1.1]">
                                                {currentSpotlight.title}
                                            </motion.h2>

                                            {/* Subtitle */}
                                            {currentSpotlight.subtitle && (
                                                <motion.p variants={fadeUpVariants} custom={2} initial="hidden" animate="visible" exit="exit" className="text-xl md:text-2xl text-gray-900 font-semibold mb-3">
                                                    {currentSpotlight.subtitle}
                                                </motion.p>
                                            )}

                                            {/* Role */}
                                            {currentSpotlight.role && (
                                                <motion.p variants={fadeUpVariants} custom={3} initial="hidden" animate="visible" exit="exit" className="text-sm md:text-base text-gray-500 mb-8 font-medium">
                                                    {currentSpotlight.role}
                                                </motion.p>
                                            )}

                                            {/* Description */}
                                            <motion.p variants={fadeUpVariants} custom={4} initial="hidden" animate="visible" exit="exit" className="text-base md:text-lg text-gray-600 leading-relaxed mb-10 max-w-lg">
                                                {currentSpotlight.description}
                                            </motion.p>

                                            {/* Navigation Dots */}
                                            <motion.div variants={fadeUpVariants} custom={5} initial="hidden" animate="visible" exit="exit" className="flex items-center gap-3">
                                                {spotlights.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => setCurrentIndex(index)}
                                                        className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                                            ? 'w-10 bg-red-600'
                                                            : 'w-2 bg-gray-300 hover:bg-gray-400'
                                                            }`}
                                                        aria-label={`Go to slide ${index + 1}`}
                                                    />
                                                ))}
                                            </motion.div>
                                        </div>

                                        {/* Right: Image */}
                                        <motion.div
                                            initial={{ opacity: 0, x: 20, rotate: 2 }}
                                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                            className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl"
                                        >
                                            <img
                                                src={currentSpotlight.image}
                                                alt={currentSpotlight.title}
                                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                            />
                                            {/* Subtle gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Arrows - Appear on Hover */}
                            <motion.button
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
                                onClick={goToPrev}
                                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-white text-gray-800 hover:text-red-600 transition-colors z-20"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                </svg>
                            </motion.button>
                            <motion.button
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                                onClick={goToNext}
                                className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-white text-gray-800 hover:text-red-600 transition-colors z-20"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </motion.button>
                        </motion.div>
                    </div>
                </section>

                {/* 2025 Wrapped Section */}
                <section className="py-24 bg-[#F8FAFC]">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        {/* Section Header */}
                        <div className="mb-16 md:flex md:items-end md:justify-between">
                            <div className="max-w-2xl">
                                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                                    2025 Wrapped: <span className="text-red-600">Impact</span>
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    From Lagos to Nairobi, from Cape Town to Cairo – 2025 was the year African builders proved that the future of blockchain is being built here.
                                </p>
                            </div>
                        </div>

                        {/* Stats Grid with Animated Counters */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                            <AnimatedCounter value="500+" label="Contributors Onboarded" />
                            <AnimatedCounter value="45" label="Events Hosted" />
                            <AnimatedCounter value="120+" label="Products Shipped" />
                            <AnimatedCounter value="$24M" label="Transaction Volume" />
                        </div>

                        {/* Interactive Video Section */}
                        <VideoSection />
                    </div>
                </section>
            </div>
        </ReactLenis>
    )
}