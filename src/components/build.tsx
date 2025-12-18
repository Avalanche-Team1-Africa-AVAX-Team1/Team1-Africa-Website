import { useState, useRef, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import rocket from '../assets/rocket.svg'
import gamepad from '../assets/gamepad.svg'
import scroll from '../assets/scroll.svg'
import pixel from '../assets/pixel-avax.png'
import arrowup from '../assets/arrow-up.svg'
import MagneticButton from './MagneticButton'
import AnimatedSection, { AnimatedItem } from './AnimatedSection'

gsap.registerPlugin(ScrollTrigger)

const cards = [
    {
        id: 1,
        title: "infra BUIDL(AI)",
        description: "Up to $15M in funding for developers building AI-powered applications on Avalanche. Early recipients include Cookie.fun and Bitte, with fast-track access to Aethir's $100M Ecosystem Fund for scaling AI projects.",
        icon: rocket,
        color: "#fc3030bb",
        textColor: "text-white"
    },
    {
        id: 2,
        title: "Retro 9000",
        description: "$40M retroactive grant program rewarding builders who launch Avalanche L1 blockchains and developer tooling. Community-driven voting with quarterly snapshots—over 195 projects competing, 19 funded in first cohort.",
        icon: gamepad,
        color: "#0e6bd6ff",
        textColor: "text-white"
    },
    {
        id: 3,
        title: "Codebase Program",
        description: "Official Avalanche accelerator providing $50K non-dilutive funding, 10-week incubation, dedicated mentorship, and Demo Day with $400K+ prize pools. Includes hackathons with $50K prizes and Innovation House residencies for top builders.",
        icon: scroll,
        color: "#0d8033ff",
        textColor: "text-white"
    },
    {
        id: 4,
        title: "Hackathons & Workshops",
        description: "Summit London Hackathon features $50K+ prizes across multiple tracks including DeFi, Gaming, and AI. Team1 Chennai brings hands-on ICM workshops and EERC training. Technical sessions on L1 deployment, cross-chain apps, and custom VMs with expert mentors.",
        icon: gamepad,
        color: "#11B55A",
        textColor: "text-white"
    },
    {
        id: 5,
        title: "Gaming & Education",
        description: "Off the Grid (7M+ users on Xbox), Shrapnel, and WARP Chain lead Web3 gaming innovation. Avalanche Academy offers free courses from fundamentals to advanced VM customization. GDC showcases and gaming-first L1s with AI-powered NPCs and true asset ownership.",
        icon: scroll,
        color: "#2996F3",
        textColor: "text-white"
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
                    {/* Header - Top Left - Limited to 40% width to prevent card overlap */}
                    <div className="absolute left-8 lg:left-12 z-20 w-[38%] lg:w-[40%] max-w-md xl:max-w-xl">
                        <img src={pixel} className="w-full max-w-[300px] opacity-10 absolute -top-16 -left-16" alt="" />
                        <motion.div
                            initial={{ rotate: -12 }}
                            className="inline-block bg-red-600 px-6 py-3 rounded-xl text-base font-bold mb-6 shadow-lg"
                        >
                            What we do
                        </motion.div>
                        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black mb-4 tracking-tighter uppercase leading-none">
                            Educate. <span className="text-red-500">Build.</span> Collaborate.
                        </h2>
                        <h3 className="text-2xl lg:text-3xl font-bold text-red-500 mb-4 lg:mb-6">
                            On Avalanche. For Africa.
                        </h3>
                        <p className="text-base lg:text-lg text-gray-300 mb-6 lg:mb-8 max-w-sm lg:max-w-md leading-relaxed">
                            Africa has the talent. We provide the resources. Through, hackathons, workshops, and global partnerships, we're connecting African innovators with everything they need to lead the blockchain revolution with Avalanche.
                        </p>

                        <MagneticButton className="group bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-gray-100 transition-colors cursor-pointer shadow-xl">
                            <span>Start Building</span>
                            <motion.img
                                src={arrowup}
                                width={20}
                                height={20}
                                className="invert"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            />
                        </MagneticButton>
                    </div>

                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff000008_1px,transparent_1px),linear-gradient(to_bottom,#ff000008_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

                    {/* Right Side: Vertically Stacked Cards with Peek */}
                    <div className="absolute right-0 top-0 h-full w-[55%] lg:w-[55%] xl:w-1/2 flex items-center justify-center overflow-hidden">
                        <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl h-full flex items-center">
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
                                                y: `calc(-50% + ${offset * 70}vh)`, // Reduced spacing between cards
                                                scale: 1, // All cards same size
                                                opacity: isActive ? 1 : 0.5,
                                                zIndex: isActive ? 10 : 5 - Math.abs(offset),
                                            }}
                                            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                                        >
                                            <div
                                                className="h-[55vh] lg:h-[55vh] xl:h-[60vh] rounded-2xl lg:rounded-3xl p-6 lg:p-8 xl:p-10 flex flex-col justify-between shadow-2xl border-2 border-white/10"
                                                style={{ backgroundColor: card.color }}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <motion.div
                                                        className="p-5 bg-black/20 rounded-2xl backdrop-blur-sm border border-white/20"
                                                        whileHover={{ rotate: 15, scale: 1.1 }}
                                                        transition={{ type: "spring", stiffness: 300 }}
                                                    >
                                                        <img src={card.icon} alt={card.title} className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16" />
                                                    </motion.div>
                                                    <div className="text-6xl lg:text-7xl xl:text-8xl font-black opacity-10 text-black">
                                                        0{index + 1}
                                                    </div>
                                                </div>

                                                <div className={card.textColor}>
                                                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-semibold mb-4 uppercase">
                                                        {card.title}
                                                    </h2>
                                                    <p className="text-base lg:text-lg leading-relaxed opacity-90 mb-4 lg:mb-6">
                                                        {card.description}
                                                    </p>
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className={`inline-flex items-center gap-3 font-bold text-base group w-fit px-6 py-3 border-2 rounded-full transition-all ${card.textColor === 'text-black'
                                                            ? 'border-black hover:bg-black hover:text-white'
                                                            : 'border-white hover:bg-white hover:text-black'
                                                            }`}
                                                    >
                                                        Learn More
                                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </motion.button>
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
            <div className="lg:hidden py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="md:text-center mb-16">
                        <div className="inline-block bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold mb-6 -rotate-6">
                            What we do
                        </div>
                        <h2 className="text-5xl lt-768:text-4xl font-black mb-4 tracking-tighter uppercase leading-none">
                            Build. Create. Educate.
                        </h2>
                        <h3 className="text-2xl lt-768:text-xl font-bold text-red-500 mb-6">
                            On Avalanche. For Africa.
                        </h3>
                        <p className="text-lg lt-768:text-base text-gray-600 mb-8 max-w-2xl mx-auto">
                            Africa isn't adopting blockchain—we're building it. Team1 Africa connects the continent's boldest innovators with workshops, developer grants, and global partnerships to lead the Web3 revolution.
                        </p>

                        <MagneticButton className="group bg-black text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-gray-800 transition-colors cursor-pointer md:mx-auto w-fit">
                            <span>Start Building</span>
                            <img src={arrowup} width={20} height={20} />
                        </MagneticButton>
                    </div>

                    <AnimatedSection staggerChildren={0.2} className="space-y-8">
                        {cards.map((card, i) => (
                            <AnimatedItem key={i}>
                                <div
                                    className="rounded-2xl p-8 flex flex-col gap-6 border-2 border-gray-200"
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