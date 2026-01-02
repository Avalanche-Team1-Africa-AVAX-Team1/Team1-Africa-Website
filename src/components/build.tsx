import { useState, useRef, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import rocket from '../assets/rocket.svg'
import gamepad from '../assets/gamepad.svg'
import pixel from '../assets/pixel-avax.png'
import arrowup from '../assets/arrow-up.svg'
import calendar from '../assets/calendar.svg'
import trophy from '../assets/trophy.svg'
import event1 from '../assets/event1-img.png'
import event2 from '../assets/event2-img.png'
import communityImg from '../assets/community.png'
import MagneticButton from './MagneticButton'
import AnimatedSection, { AnimatedItem } from './AnimatedSection'

gsap.registerPlugin(ScrollTrigger)

const cards = [
    {
        id: 1,
        title: "Campus Outreach",
        description: "Our on-campus events and student programs are designed to introduce Avalanche to the top talent across African universities, builders, creators, founders, and curious minds shaping the future of blockchain.",
        icon: rocket,
        color: "#fc3030bb",
        textColor: "text-white",
        images: [event1, event2, communityImg]
    },
    {
        id: 2,
        title: "Community Events",
        description: "A mix of IRL and virtual events designed to bring the African Avalanche community together through meetups, workshops, talks, and interactive sessions, connecting builders, creators, and ecosystem participants worldwide.",
        icon: gamepad,
        color: "#0e6bd6ff",
        textColor: "text-white",
        images: [communityImg, event1, event2]
    },
    {
        id: 3,
        title: "Hackathons & Workshops",
        description: "Hands-on hackathons and technical workshops focused on building on Avalanche, with guided sessions, expert-led training, and practical experience across core concepts, tooling, and advanced use cases.",
        icon: gamepad,
        color: "#11B55A",
        textColor: "text-white",
        images: [event2, communityImg, event1]
    },
    {
        id: 5,
        title: "Weekly Syncs",
        description: "Recurring community sync calls to align on upcoming events, initiatives, and priorities—providing updates, open discussions, and coordination across campus, events, and ecosystem efforts.",
        icon: calendar,
        color: "#6B4EFF",
        textColor: "text-white",
        images: [event1, event2, communityImg]
    },
    {
        id: 6,
        title: "Bounties",
        description: "Task-based opportunities to earn rewards by contributing to the Avalanche ecosystem—ranging from content creation and Twitter thread contests to research, community tasks, and event support.",
        icon: trophy,
        color: "#F59E0B",
        textColor: "text-white",
        images: [communityImg, event1, event2]
    }

]

const Build = () => {
    const [activeIndex, setActiveIndex] = useState(0) // Start with Card 1 (infra BUIDL)
    const pinnedRef = useRef<HTMLDivElement>(null)
    const mainRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: pinnedRef.current,
                start: "top top",
                end: "+=3000",
                pin: true,
                scrub: 0.5,
                onUpdate: (self) => {
                    const length = cards.length
                    const progress = self.progress
                    const index = Math.min(Math.floor(progress * length), length - 1)
                    setActiveIndex(index)
                }
            })
        }, mainRef)
        return () => ctx.revert()
    }, [])

    return (
        <div ref={mainRef}>
            {/* DESKTOP: Pinned Scroll-Lock Section */}
            <div className="hidden lg:block">
                <section ref={pinnedRef} className="h-screen bg-black text-white overflow-hidden flex items-center relative">
                    {/* Header - Top Left */}
                    <div className="absolute left-12 z-20 max-w-xl">
                        <img src={pixel} className="w-full max-w-[300px] opacity-10 absolute -top-16 -left-16" alt="" />
                        <motion.div
                            initial={{ rotate: -12 }}
                            className="inline-block bg-red-600 px-6 py-3 rounded-xl font-bold mb-6 shadow-lg"
                            style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)' }}
                        >
                            What we do
                        </motion.div>
                        <h2 className="font-black mb-4 tracking-tighter uppercase leading-none" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.75rem)' }}>
                            Educate. <span className="text-red-500">Build.</span> Collaborate.
                        </h2>
                        <h3 className="font-bold text-red-500 mb-6" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.875rem)' }}>
                            On Avalanche. For Africa.
                        </h3>
                        <p className="text-gray-300 mb-8 max-w-md leading-relaxed" style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)' }}>
                            Africa has the talent. We provide the resources. Through, hackathons, workshops, and global partnerships, we're connecting African innovators with everything they need to lead the blockchain revolution with Avalanche.
                        </p>

                        <a href="https://build.avax.network/" target="_blank" rel="noopener noreferrer">
                            <MagneticButton className="group btn-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-colors cursor-pointer shadow-xl lg:hover:text-white">
                                <span className="relative z-10">Start Building</span>
                                <motion.img
                                    src={arrowup}
                                    width={20}
                                    height={20}
                                    className="invert relative z-10"
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                />
                            </MagneticButton>
                        </a>
                    </div>

                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff000008_1px,transparent_1px),linear-gradient(to_bottom,#ff000008_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

                    {/* Right Side: Vertically Stacked Cards with Peek */}
                    <div className="absolute right-0 top-0 h-full w-1/2 flex items-center justify-center overflow-hidden">
                        <div className="relative w-full max-w-xl h-full flex items-center">
                            <AnimatePresence mode="sync">
                                {cards.map((card, index) => {
                                    const offset = index - activeIndex
                                    const isActive = activeIndex === index

                                    return (
                                        <motion.div
                                            key={card.id}
                                            className="absolute left-0 top-1/2 w-full"
                                            initial={false}
                                            animate={{
                                                y: `calc(-50% + ${offset * 80}vh)`, // Card spacing
                                                scale: 1, // All cards same size
                                                opacity: isActive ? 1 : 0.5,
                                                zIndex: isActive ? 10 : 5 - Math.abs(offset),
                                            }}
                                            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                                        >
                                            {/* Stack Container - No Box */}
                                            <div className="relative min-h-[55vh] flex items-center justify-center p-4">

                                                {/* Background Polaroids (Stack & Fan) */}
                                                {card.images.map((img, i) => {
                                                    // Determine fan properties
                                                    const rotation = isActive ? (i - 1) * 12 : (i - 1) * 2;
                                                    const xOffset = isActive ? (i - 1) * 80 : 0;
                                                    const yOffset = isActive ? (i === 1 ? -40 : 10) : 0;

                                                    // Top image acts as cover
                                                    // const isTop = i === 1;

                                                    return (
                                                        <motion.div
                                                            key={i}
                                                            className="absolute w-[320px] h-[400px] bg-white p-3 shadow-2xl rounded-sm transform origin-bottom-center"
                                                            animate={{
                                                                rotate: rotation,
                                                                x: xOffset,
                                                                y: yOffset,
                                                                scale: isActive ? 1 : 0.9,
                                                                zIndex: i === 1 ? 2 : 1
                                                            }}
                                                            transition={{ duration: 0.8, ease: "backOut" }}
                                                        >
                                                            <div className="w-full h-[320px] bg-gray-100 overflow-hidden mb-3">
                                                                <img src={img} alt="" className="w-full h-full object-cover" />
                                                            </div>
                                                            {/* Polaroid Footer */}
                                                            <div className="h-8"></div>
                                                        </motion.div>
                                                    )
                                                })}

                                                {/* Content Overlay (Glassmorphism) */}
                                                <div className="absolute bottom-0 left-0 w-full z-10 translate-y-6">
                                                    <div className="relative backdrop-blur-md bg-black/40 border border-white/10 p-8 rounded-3xl overflow-hidden">
                                                        {/* Color Accent Glow */}
                                                        <div
                                                            className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-60 pointer-events-none"
                                                            style={{ backgroundColor: card.color }}
                                                        />

                                                        <div className="relative z-10">
                                                            <div className="flex justify-between items-center mb-4">
                                                                <div
                                                                    className="p-3 rounded-xl backdrop-blur-sm border border-white/20"
                                                                    style={{ backgroundColor: `${card.color}40` }} // 25% opacity
                                                                >
                                                                    <img src={card.icon} alt={card.title} className="w-8 h-8" />
                                                                </div>
                                                                <div className="text-4xl font-black opacity-20 text-white">
                                                                    0{index + 1}
                                                                </div>
                                                            </div>

                                                            <h2 className="text-3xl font-black mb-3 uppercase text-white tracking-tight leading-none">
                                                                {card.title}
                                                            </h2>
                                                            <p className="text-sm font-medium leading-relaxed text-gray-200 mb-6 line-clamp-3">
                                                                {card.description}
                                                            </p>

                                                            <motion.button
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                className="flex items-center gap-2 text-sm font-bold text-white group w-fit"
                                                            >
                                                                Learn More
                                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                                    </svg>
                                                                </div>
                                                            </motion.button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Progress Indicators */}
                    <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-6">
                        {cards.map((_, i) => (
                            <div key={i} className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-white h-12' : 'bg-gray-600'}`} />
                        ))}
                    </div>
                </section>
            </div>

            {/* MOBILE: Vertical Stack */}
            <div className="lg:hidden py-20 px-6 bg-black text-white relative">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff000008_1px,transparent_1px),linear-gradient(to_bottom,#ff000008_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="md:text-center mb-16">
                        <div className="inline-block bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold mb-6 -rotate-6">
                            What we do
                        </div>
                        <h2 className="text-5xl lt-768:text-4xl font-black mb-4 tracking-tighter uppercase leading-none">
                            Educate. <span className="text-red-500">Build.</span> Collaborate.
                        </h2>
                        <h3 className="text-2xl lt-768:text-xl font-bold text-red-500 mb-6">
                            On Avalanche. For Africa.
                        </h3>
                        <p className="text-lg lt-768:text-base text-gray-300 mb-8 max-w-2xl mx-auto">
                            Africa has the talent. We provide the resources. Through, hackathons, workshops, and global partnerships, we're connecting African innovators with everything they need to lead the blockchain revolution with Avalanche.
                        </p>

                        <a href="https://build.avax.network/" target="_blank" rel="noopener noreferrer">
                            <MagneticButton className="group bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-colors cursor-pointer md:mx-auto w-fit">
                                <span>Start Building</span>
                                <img src={arrowup} width={20} height={20} className="invert" alt="" />
                            </MagneticButton>
                        </a>
                    </div>

                    <AnimatedSection staggerChildren={0.2} className="space-y-8">
                        {cards.map((card, i) => (
                            <AnimatedItem key={i}>
                                <div
                                    className="rounded-2xl p-8 flex flex-col gap-6"
                                    style={{ backgroundColor: card.color }}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="p-4 bg-black/20 rounded-xl backdrop-blur-sm border border-white/20">
                                            <img src={card.icon} alt={card.title} className="w-12 h-12" />
                                        </div>
                                        <div className="text-5xl font-black opacity-10 text-black">
                                            0{i + 1}
                                        </div>
                                    </div>

                                    <div className={card.textColor}>
                                        <h2 className="text-4xl lt-768:text-3xl font-black mb-4 uppercase tracking-tight">
                                            {card.title}
                                        </h2>
                                        <p className="text-base font-medium leading-relaxed opacity-90">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            </AnimatedItem>
                        ))}
                    </AnimatedSection>
                </div>
            </div>
        </div>
    )
}

export default Build