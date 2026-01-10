import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import rocket from '../assets/rocket.svg'
import gamepad from '../assets/gamepad.svg'
// import pixel from '../assets/pixel-avax.png'
import arrowup from '../assets/arrow-up.svg'
import calendar from '../assets/calendar.svg'
import trophy from '../assets/trophy.svg'
import event1 from '../assets/event1-img.png'
import event2 from '../assets/event2-img.png'
import communityImg from '../assets/community.png'
import MagneticButton from './MagneticButton'
import AnimatedSection, { AnimatedItem } from './AnimatedSection'
import Silk from './ui/Silk'

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
    const [activeIndex, setActiveIndex] = useState(0)
    const pinnedRef = useRef<HTMLElement | null>(null)
    const mainRef = useRef<HTMLDivElement | null>(null)
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

    // Initialize ScrollTrigger with proper Lenis integration
    useLayoutEffect(() => {
        if (!pinnedRef.current) return

        // Wait for images to load before initializing ScrollTrigger
        const images = pinnedRef.current.querySelectorAll('img')
        const imagePromises = Array.from(images).map((img: HTMLImageElement) => {
            if (img.complete) return Promise.resolve()
            return new Promise((resolve) => {
                img.onload = () => resolve(true)
                img.onerror = () => resolve(true) // Resolve even on error to prevent hanging
            })
        })

        Promise.all(imagePromises).then(() => {
            // Wait for next frame to ensure DOM is ready
            requestAnimationFrame(() => {
                const ctx = gsap.context(() => {
                    // Kill any existing ScrollTriggers on this element
                    ScrollTrigger.getAll().forEach(st => {
                        if (st.trigger === pinnedRef.current) {
                            st.kill()
                        }
                    })

                    // Create ScrollTrigger with optimized settings
                    scrollTriggerRef.current = ScrollTrigger.create({
                        trigger: pinnedRef.current,
                        start: "top top",
                        end: () => `+=${(cards.length - 1) * window.innerHeight * 0.7}`, // 70vh per card
                        pin: '.build-viewport',
                        pinSpacing: true,
                        scrub: 0.3, // More responsive
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        markers: false,
                        snap: {
                            snapTo: (value: number) => {
                                // Custom snap function
                                const snapPoints = cards.length - 1
                                const snappedValue = Math.round(value * snapPoints) / snapPoints
                                return snappedValue
                            },
                            duration: { min: 0.2, max: 0.5 },
                            ease: "power2.inOut",
                            delay: 0.05
                        },
                        onUpdate: (self: ScrollTrigger) => {
                            // Better index calculation
                            const progress = self.progress
                            const rawIndex = progress * (cards.length - 1)
                            const newIndex = Math.round(rawIndex)

                            // Clamp to valid range
                            const clampedIndex = Math.max(0, Math.min(newIndex, cards.length - 1))

                            if (clampedIndex !== activeIndex) {
                                setActiveIndex(clampedIndex)
                            }
                        },
                        onEnter: () => {
                            // Ensure we start at first card when entering
                            setActiveIndex(0)
                            const viewport = document.querySelector('.build-viewport') as HTMLElement
                            if (viewport) {
                                viewport.style.zIndex = '1'
                            }
                            // Add flag to body to prevent navbar show on scroll
                            document.body.setAttribute('data-scroll-locked', 'true')
                        },
                        onLeave: () => {
                            const viewport = document.querySelector('.build-viewport') as HTMLElement
                            if (viewport) {
                                viewport.style.zIndex = ''
                            }
                            // Remove flag when leaving
                            document.body.removeAttribute('data-scroll-locked')
                        },
                        onEnterBack: () => {
                            // When scrolling back, start at last card
                            setActiveIndex(cards.length - 1)
                            const viewport = document.querySelector('.build-viewport') as HTMLElement
                            if (viewport) {
                                viewport.style.zIndex = '1'
                            }
                            // Add flag to body to prevent navbar show on scroll
                            document.body.setAttribute('data-scroll-locked', 'true')
                        },
                        onLeaveBack: () => {
                            // When leaving back, ensure we're at first card
                            setActiveIndex(0)
                            const viewport = document.querySelector('.build-viewport') as HTMLElement
                            if (viewport) {
                                viewport.style.zIndex = ''
                            }
                            // Remove flag when leaving
                            document.body.removeAttribute('data-scroll-locked')
                        }
                    })

                    // Refresh after creation
                    ScrollTrigger.refresh()
                }, mainRef)

                return () => {
                    ctx.revert()
                }
            })
        })
    }, []) // Only run once on mount

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            ScrollTrigger.refresh()
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div ref={mainRef} className="bg-black">
            {/* DESKTOP: Pinned Scroll-Lock Section */}
            <div className="hidden lg:block">
                <section ref={pinnedRef} className="relative bg-black text-white">
                    {/* Viewport that gets pinned */}
                    <div className="build-viewport h-screen overflow-hidden flex items-center justify-between px-12 relative">

                        {/* Silk Animated Background */}
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
                            <Silk color="#1c1212" speed={2} scale={1.2} />
                        </div>

                        {/* Background Grid with Fade Mask */}
                        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:200px_200px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />

                        {/* Left Content */}
                        <div className="relative z-20 max-w-xl">
                            {/* <img src={pixel} className="w-full max-w-[300px] opacity-10 absolute -top-16 -left-16" alt="" /> */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold mb-4 -rotate-6 shadow-lg">
                                    What we do
                                </div>
                                <h2 className="text-6xl font-black mb-6 tracking-tighter uppercase leading-[0.9]">
                                    Educate. <br />
                                    <span className="text-red-500">Build.</span> <br />
                                    Collaborate.
                                </h2>
                                <h3 className="text-2xl font-bold text-red-500 mb-6">
                                    On Avalanche. For Africa.
                                </h3>
                                <p className="text-lg text-gray-300 mb-12 max-w-md leading-relaxed">
                                    Africa has the talent. We provide the resources. Through hackathons, workshops, and global partnerships, we're connecting African innovators with everything they need to lead the blockchain revolution with Avalanche.
                                </p>
                            </motion.div>

                            <a href="https://build.avax.network/" target="_blank" rel="noopener noreferrer">
                                <MagneticButton className="group bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-colors cursor-pointer shadow-xl hover:bg-gray-100">
                                    <span className="relative z-10">Start Building</span>
                                    <motion.img
                                        src={arrowup}
                                        width={20}
                                        height={20}
                                        className="relative z-10"
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    />
                                </MagneticButton>
                            </a>
                        </div>

                        {/* Right Side: Vertically Stacked Cards */}
                        <div className="relative z-20 w-1/2 h-full flex items-center justify-center">
                            <div className="relative w-full max-w-xl h-full flex items-center">
                                {cards.map((card, index) => {
                                    const offset = index - activeIndex
                                    const isActive = activeIndex === index

                                    return (
                                        <motion.div
                                            key={card.id}
                                            className="absolute left-0 top-1/2 w-full"
                                            initial={false}
                                            animate={{
                                                y: `calc(-50% + ${offset * 110}vh)`, // Off-screen spacing
                                                scale: isActive ? 1 : 0.9,
                                                opacity: isActive ? 1 : 0,
                                                zIndex: isActive ? 10 : 5 - Math.abs(offset),
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                ease: [0.43, 0.13, 0.23, 0.96]
                                            }}
                                        >
                                            {/* Stack Container */}
                                            <div className="relative min-h-[55vh] flex items-center justify-center p-4">

                                                {/* Background Polaroids */}
                                                {card.images.map((img, i) => {
                                                    const isCenter = i === 1
                                                    const isLeft = i === 0
                                                    const isRight = i === 2

                                                    const inactiveRotate = isLeft ? -6 : isRight ? 4 : -2
                                                    const inactiveX = isLeft ? -10 : isRight ? 10 : 0
                                                    const inactiveY = isLeft ? 5 : isRight ? 5 : 0

                                                    const activeRotate = isLeft ? -15 : isRight ? 15 : 0
                                                    const activeX = isLeft ? -120 : isRight ? 120 : 0
                                                    const activeY = isCenter ? -40 : 10

                                                    return (
                                                        <motion.div
                                                            key={i}
                                                            className="absolute w-[300px] h-[380px] bg-white p-3 shadow-2xl rounded-sm"
                                                            initial={false}
                                                            animate={{
                                                                rotate: isActive ? activeRotate : inactiveRotate,
                                                                x: isActive ? activeX : inactiveX,
                                                                y: isActive ? activeY : inactiveY,
                                                                scale: isActive ? 1 : 0.9,
                                                                zIndex: isCenter ? 2 : 1
                                                            }}
                                                            transition={{
                                                                duration: 0.5,
                                                                ease: [0.25, 0.46, 0.45, 0.94]
                                                            }}
                                                            style={{
                                                                transformOrigin: 'bottom center'
                                                            }}
                                                        >
                                                            <div className="w-full h-[300px] bg-gray-100 overflow-hidden mb-3 filter contrast-110">
                                                                <img src={img} alt="" className="w-full h-full object-cover" />
                                                            </div>
                                                            <div className="h-6"></div>
                                                        </motion.div>
                                                    )
                                                })}

                                                {/* Content Overlay */}
                                                <div className="absolute bottom-0 left-0 w-full z-10 translate-y-6">
                                                    <div className="relative backdrop-blur-xl bg-black/80 border border-white/10 p-8 rounded-3xl overflow-hidden shadow-2xl">
                                                        <div
                                                            className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-60 pointer-events-none"
                                                            style={{ backgroundColor: card.color }}
                                                        />

                                                        <div className="relative z-10">
                                                            <div className="flex justify-between items-center mb-4">
                                                                <div
                                                                    className="p-3 rounded-xl backdrop-blur-sm border border-white/20"
                                                                    style={{ backgroundColor: `${card.color}40` }}
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
                            </div>
                        </div>

                        {/* Progress Indicators */}
                        <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-30">
                            {cards.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-white h-12' : 'bg-gray-600'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* MOBILE: Vertical Stack */}
            <div className="lg:hidden py-20 px-6 bg-black text-white relative overflow-hidden">
                {/* Silk Animated Background matching Desktop */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
                    <Silk color="#1c1212" speed={2} scale={1.2} />
                </div>

                {/* Background Grid matching Desktop */}
                <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />

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
                                <div className="relative w-full max-w-[340px] mx-auto pt-[240px] pb-8">
                                    {/* Images Layer */}
                                    <div className="absolute top-0 inset-x-0 h-[300px] flex items-center justify-center pointer-events-none">
                                        {card.images.map((img, imgIndex) => {
                                            const isCenter = imgIndex === 1
                                            const isLeft = imgIndex === 0
                                            const isRight = imgIndex === 2

                                            // Tighter visual spread for mobile vertical view
                                            const rotate = isLeft ? -8 : isRight ? 8 : 0
                                            const x = isLeft ? -30 : isRight ? 30 : 0
                                            const y = isCenter ? -10 : 0
                                            const zIndex = isCenter ? 10 : 0

                                            return (
                                                <div
                                                    key={imgIndex}
                                                    className="absolute w-[220px] h-[280px] bg-white p-2 shadow-xl rounded-sm transition-transform duration-500 ease-out"
                                                    style={{
                                                        transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
                                                        zIndex: zIndex
                                                    }}
                                                >
                                                    <div className="w-full h-[220px] bg-gray-100 overflow-hidden mb-2 filter contrast-110">
                                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {/* Content Card Overlay */}
                                    <div className="relative z-20 backdrop-blur-xl bg-black/80 border border-white/10 p-6 rounded-2xl overflow-hidden shadow-2xl -mt-4">
                                        <div
                                            className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[50px] opacity-50 pointer-events-none"
                                            style={{ backgroundColor: card.color }}
                                        />

                                        <div className="relative z-10">
                                            <div className="flex justify-between items-center mb-4">
                                                <div
                                                    className="p-2.5 rounded-lg backdrop-blur-sm border border-white/20"
                                                    style={{ backgroundColor: `${card.color}40` }}
                                                >
                                                    <img src={card.icon} alt={card.title} className="w-6 h-6" />
                                                </div>
                                                <div className="text-3xl font-black opacity-20 text-white">
                                                    0{i + 1}
                                                </div>
                                            </div>

                                            <h2 className="text-2xl font-black mb-3 uppercase text-white tracking-tight leading-none">
                                                {card.title}
                                            </h2>
                                            <p className="text-sm font-medium leading-relaxed text-gray-200 mb-6">
                                                {card.description}
                                            </p>

                                            <div className="flex items-center gap-2 text-sm font-bold text-white group w-fit cursor-pointer">
                                                Learn More
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-colors">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
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