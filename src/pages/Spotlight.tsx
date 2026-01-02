/**
 * 🎯 SPOTLIGHT PLATFORM - REVAMPED
 * 
 * Recognition Hub | Editorial Gallery | Living Archive
 * 
 * Features:
 * - Hero slideshow (Top Contributor, Project, Event of Year)
 * - Top Contributors section with Bruut-style masonry layout + Team1 logo
 * - Projects with logo on left, details right, country flags
 * - Events linking to gallery details
 * - Peak Moments section (light background)
 */

import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

// ==================== TYPES ====================

interface SpotlightPerson {
    id: string
    name: string
    role: string
    region: string
    contribution: string
    image: string
    badge?: 'yearly' | 'top3' | 'honorary'
}

interface SpotlightProject {
    id: number
    name: string
    tagline: string
    metric: string
    category: string
    logo: string
    location: string
    countryCode: string
    liveUrl?: string
    achievement?: string
}

interface SpotlightEvent {
    id: string
    title: string
    date: string
    location: string
    attendees: number
    image: string
    badge?: 'event-of-year' | 'event-of-month' | 'top5'
    gallerySlug: string
}

interface HeroSlide {
    type: 'contributor' | 'project' | 'event'
    title: string
    subtitle: string
    description: string
    image: string
    badge: string
}

// ==================== DATA ====================

// Top Contributors
const SPOTLIGHT_PEOPLE: SpotlightPerson[] = [
    // Top 3 of the Year
    { id: 'p1', name: 'Feezy Techboy', role: 'AVAX Team1 Community Lead', region: 'Nigeria', contribution: 'Built 12 production subnets, mentored 50+ developers', badge: 'yearly', image: new URL('../assets/testimonial1.jpg', import.meta.url).href },
    { id: 'p2', name: 'Amara Okafor', role: 'Community Lead', region: 'Nigeria', contribution: 'Onboarded 500+ developers to Avalanche', badge: 'top3', image: new URL('../assets/testimonial2.jpg', import.meta.url).href },
    { id: 'p3', name: 'Wanjiku Kimani', role: 'Product Lead', region: 'Kenya', contribution: 'Launched 8 African-founded projects', badge: 'top3', image: new URL('../assets/testimonial3.jpg', import.meta.url).href },
    // Honorary Mentions (10)
    { id: 'p4', name: 'Thabo Nkosi', role: 'DeFi Architect', region: 'South Africa', contribution: 'Processed $24M in transactions', badge: 'honorary', image: new URL('../assets/south5.jpg', import.meta.url).href },
    { id: 'p5', name: 'Faraji Mwamburi', role: 'Mobile Pioneer', region: 'Tanzania', contribution: 'Mobile payments for 15K users', badge: 'honorary', image: new URL('../assets/testimonial5.jpg', import.meta.url).href },
    { id: 'p6', name: 'Chidinma Eze', role: 'Smart Contract Dev', region: 'Nigeria', contribution: 'Audited 20+ DeFi protocols', badge: 'honorary', image: new URL('../assets/testimonial6.jpg', import.meta.url).href },
    { id: 'p7', name: 'Kofi Asante', role: 'DevRel Lead', region: 'Ghana', contribution: 'Hosted 30+ workshops across Africa', badge: 'honorary', image: new URL('../assets/testimonial7.jpg', import.meta.url).href },
    { id: 'p8', name: 'Zara Mohamed', role: 'UI/UX Designer', region: 'Kenya', contribution: 'Designed 15 dApp interfaces', badge: 'honorary', image: new URL('../assets/testimonial8.jpg', import.meta.url).href },
    { id: 'p9', name: 'Oluwaseun Adeyemi', role: 'Protocol Engineer', region: 'Nigeria', contribution: 'Core contributor to subnet tooling', badge: 'honorary', image: new URL('../assets/testimonial9.jpg', import.meta.url).href },
    { id: 'p10', name: 'Naledi Dlamini', role: 'Growth Lead', region: 'South Africa', contribution: 'Grew community by 300%', badge: 'honorary', image: new URL('../assets/testimonial10.jpg', import.meta.url).href },
    { id: 'p11', name: 'Hassan Diallo', role: 'Backend Developer', region: 'Senegal', contribution: 'Built indexing infrastructure', badge: 'honorary', image: new URL('../assets/testimonial11.jpeg', import.meta.url).href },
    { id: 'p12', name: 'Fatima Bello', role: 'Content Lead', region: 'Nigeria', contribution: 'Created 100+ educational resources', badge: 'honorary', image: new URL('../assets/testimonial12.jpeg', import.meta.url).href },
    { id: 'p13', name: 'Tendai Moyo', role: 'Security Researcher', region: 'Zimbabwe', contribution: 'Identified 5 critical vulnerabilities', badge: 'honorary', image: new URL('../assets/testimonial16.jpg', import.meta.url).href },
]

// Projects with country codes for flags
const SPOTLIGHT_PROJECTS: SpotlightProject[] = [
    { id: 1, name: 'Canza Finance', tagline: 'African Forex on-chain', metric: '$2M+ TVL', category: 'DeFi', logo: new URL('../assets/refi.png', import.meta.url).href, location: 'Nigeria', countryCode: 'NG', achievement: '🏆 Avalanche Grant Winner', liveUrl: 'https://canza.io' },
    { id: 2, name: 'Kula Protocol', tagline: 'Impact investment DAO', metric: '$500K deployed', category: 'DAO', logo: new URL('../assets/gitcoin.png', import.meta.url).href, location: 'Kenya', countryCode: 'KE', achievement: '🏆 Summit Hackathon Winner', liveUrl: 'https://kula.finance' },
    { id: 3, name: 'AfriMint', tagline: 'NFT marketplace for African art', metric: '10K+ minted', category: 'NFT', logo: new URL('../assets/spherre.png', import.meta.url).href, location: 'Ghana', countryCode: 'GH', achievement: '🏆 Best NFT Project 2024', liveUrl: 'https://afrimint.xyz' },
    { id: 4, name: 'Baki Exchange', tagline: 'Tokenized African currencies', metric: '3 currencies live', category: 'DeFi', logo: new URL('../assets/dexalot.png', import.meta.url).href, location: 'South Africa', countryCode: 'ZA', achievement: '🏆 Avalanche Summit Featured', liveUrl: 'https://baki.exchange' },
]

const SPOTLIGHT_EVENTS: SpotlightEvent[] = [
    { id: 'e1', title: 'Lagos Summit 2024', date: 'Feb 2024', location: 'Nigeria', attendees: 1200, badge: 'event-of-year', image: new URL('../assets/south1.jpg', import.meta.url).href, gallerySlug: 'lagos-blockchain-summit' },
    { id: 'e2', title: 'Nairobi Hackathon', date: 'Apr 2024', location: 'Kenya', attendees: 450, badge: 'event-of-month', image: new URL('../assets/south2.jpg', import.meta.url).href, gallerySlug: 'nairobi-defi-workshop' },
    { id: 'e3', title: 'Accra Dev Week', date: 'Jun 2024', location: 'Ghana', attendees: 680, badge: 'top5', image: new URL('../assets/ghana1.JPG', import.meta.url).href, gallerySlug: 'avalanche-africa-summit' },
    { id: 'e4', title: 'Cape Town Build', date: 'Aug 2024', location: 'South Africa', attendees: 520, badge: 'top5', image: new URL('../assets/south3.jpg', import.meta.url).href, gallerySlug: 'cape-town-subnet-workshop' },
]

// Hero slideshow data
const HERO_SLIDES: HeroSlide[] = [
    {
        type: 'contributor',
        title: 'Feezy Techboy',
        subtitle: 'Community Lead, Team1 Nigeria',
        description: 'Built and led Team1 Nigeria into one of the most active Avalanche communities, driving contributor onboarding, local events, and sustained ecosystem participation.',
        image: new URL('../assets/Feezy.jpg', import.meta.url).href,
        badge: '🏆 CONTRIBUTOR OF THE YEAR'
    },
    {
        type: 'contributor',
        title: 'DannyYak',
        subtitle: 'Avalanche Team1 Contributor',
        description: 'Produced high-impact educational and ecosystem content that amplified Avalanche visibility, simplified complex concepts, and consistently engaged the African builder community.',
        image: new URL('../assets/DannyYak.jpeg', import.meta.url).href,
        badge: '🎬 TOP YAPPER'
    },
    {
        type: 'contributor',
        title: 'Deon',
        subtitle: 'Ecosystem Streamer & Community Host',
        description: 'Delivered consistent live streams covering Avalanche development, ecosystem updates, and community discussions, bringing real-time education and visibility to African builders.',
        image: new URL('../assets/Deon.jpeg', import.meta.url).href,
        badge: '🎙️ TOP STREAMER'
    },
    {
        type: 'event',
        title: 'Team1 Africa Builder Summit',
        subtitle: 'Top Event of the Year',
        description: 'The most impactful Team1 Africa gathering of the year, bringing builders, contributors, and partners together to launch projects, share knowledge, and strengthen the Avalanche ecosystem.',
        image: new URL('../assets/south1.jpg', import.meta.url).href,
        badge: '🎉 LEGENDARY EVENT'
    },
    {
        type: 'project',
        title: 'Off The Grid',
        subtitle: 'Project of the Year',
        description: 'A 5v5 hero shooter integrating Avalanche Subnets for a seamless battle experience with true asset ownership.',
        image: new URL('../assets/otg_offthegrid.jpg', import.meta.url).href,
        badge: '🚀 TOP PROJECT'
    },
]

const MOMENT_IMAGES = [
    new URL('../assets/south4.jpg', import.meta.url).href,
    new URL('../assets/ghana2.JPG', import.meta.url).href,
    new URL('../assets/south6.jpg', import.meta.url).href,
    new URL('../assets/ghana3.JPG', import.meta.url).href,
]

// ==================== HERO SLIDESHOW ====================
function HeroSlideshow() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [direction, setDirection] = useState(1) // 1 = right, -1 = left
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    // Auto-advance every 7 seconds
    useEffect(() => {
        if (!isAutoPlaying) return
        const interval = setInterval(() => {
            setDirection(1) // Auto-advance goes right
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
        }, 7000)
        return () => clearInterval(interval)
    }, [isAutoPlaying])

    // Resume auto-play after 10 seconds of inactivity
    useEffect(() => {
        if (isAutoPlaying) return
        const resumeTimer = setTimeout(() => {
            setIsAutoPlaying(true)
        }, 10000)
        return () => clearTimeout(resumeTimer)
    }, [isAutoPlaying])

    const slide = HERO_SLIDES[currentSlide]

    const goToPrev = () => {
        setDirection(-1)
        setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
        setIsAutoPlaying(false)
    }

    const goToNext = () => {
        setDirection(1)
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
        setIsAutoPlaying(false)
    }

    const goToSlide = (index: number) => {
        setDirection(index > currentSlide ? 1 : -1)
        setCurrentSlide(index)
        setIsAutoPlaying(false)
    }

    // Slide variants for image horizontal slide
    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? '100%' : '-100%',
            opacity: 1,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? '-100%' : '100%',
            opacity: 1,
        }),
    }


    return (
        <div className="relative w-full mb-16 group">
            {/* Floating Project Icons - positioned outside the main container */}
            {/* <div className="hidden lg:block absolute -top-12 -left-12 w-20 h-20 rounded-2xl bg-green-400 shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 rotate-12">
                <img src={new URL('../assets/refi.png', import.meta.url).href} alt="ReFi" className="w-full h-full object-contain" />
            </div>

            <div className="hidden lg:block absolute -top-12 -right-12 w-20 h-20 rounded-full bg-blue-400 shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 -rotate-45">
                <img src={new URL('../assets/dexalot.png', import.meta.url).href} alt="Dexalot" className="w-full h-full object-contain" />
            </div>

            <div className="hidden lg:block absolute -bottom-10 -left-12 w-28 h-28 rounded-2xl bg-cyan-200 shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 rotate-45 border-2 border-green-600">
                <img src={new URL('../assets/onlydust.png', import.meta.url).href} alt="OnlyDust" className="w-full h-full object-contain" />
            </div> */}

            {/* Main slideshow section */}
            <section className="relative w-full overflow-hidden rounded-3xl bg-[#f5f5f5] min-h-[550px] md:h-[600px]">
                {/* Sliding Content Container */}
                <div className="absolute inset-0">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentSlide}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                            className="absolute inset-0 flex flex-col md:flex-row"
                        >
                            {/* Left Side - Image */}
                            <div className="relative w-full md:w-1/2 h-[300px] md:h-full p-2 md:p-4">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full rounded-2xl md:rounded-3xl shadow-lg object-cover"
                                />
                            </div>

                            {/* Right Side - Text Content */}
                            <div className="relative w-full md:w-1/2 p-6 md:p-10 lg:p-16 flex flex-col justify-center">
                                {/* Badge */}
                                <span className="inline-block w-fit px-4 py-2 bg-red-600 text-white text-xs md:text-sm font-bold rounded-full mb-4">
                                    {slide.badge}
                                </span>

                                {/* Title */}
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-black mb-3 leading-tight">
                                    {slide.title}
                                </h2>

                                {/* Subtitle */}
                                <p className="text-lg md:text-xl lg:text-2xl text-red-500 font-bold mb-4">
                                    {slide.subtitle}
                                </p>

                                {/* Description */}
                                <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-lg line-clamp-3">
                                    {slide.description}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div >

                {/* STATIC CONTROLS */}

                {/* Prev Button - Left (Over Image) */}
                <button
                    onClick={goToPrev}
                    className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm items-center justify-center hover:bg-black/50 transition-colors z-20 text-white"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Next Button - Right (Extreme Right) */}
                <button
                    onClick={goToNext}
                    className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/10 items-center justify-center hover:bg-red-600 hover:text-white transition-all z-20 text-black"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Slide indicators - Bottom Left of Right Section */}
                <div className="hidden md:flex absolute bottom-8 left-6 md:left-[53%] gap-2 z-20">
                    {HERO_SLIDES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goToSlide(i)}
                            className={`h-3 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-red-600 w-8' : 'bg-gray-300 hover:bg-gray-400 w-3'
                                }`}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}

// ==================== TOP CONTRIBUTORS ZONE (BRUUT STYLE) ====================

function TopContributorsZone() {
    const [selectedPerson, setSelectedPerson] = useState<SpotlightPerson | null>(null)
    const allContributors = SPOTLIGHT_PEOPLE

    // Bruut-style grid positions - 5 columns x 3 rows
    // Center cell (col 3, row 2) is for logo - SMALL
    // Surrounding images get MORE space with larger spans
    const gridPositions = [
        // Top row - images span into space around center
        { col: '1 / 2', row: '1 / 3', size: 'tall' },       // 0 - left tall
        { col: '2 / 3', row: '1 / 2', size: 'normal' },     // 1 - top left of center
        { col: '3 / 4', row: '1 / 2', size: 'normal' },     // 2 - top of center
        { col: '4 / 5', row: '1 / 2', size: 'normal' },     // 3 - top right of center
        { col: '5 / 6', row: '1 / 3', size: 'tall' },       // 4 - right tall
        // Middle row - center logo + sides
        { col: '2 / 3', row: '2 / 3', size: 'normal' },     // 5 - left of center
        // CENTER LOGO: col 3, row 2 (single cell)
        { col: '4 / 5', row: '2 / 3', size: 'normal' },     // 6 - right of center
        // Bottom row
        { col: '1 / 2', row: '3 / 4', size: 'normal' },     // 7 - bottom left corner
        { col: '2 / 3', row: '3 / 4', size: 'normal' },     // 8 - bottom left of center
        { col: '3 / 4', row: '3 / 4', size: 'normal' },     // 9 - bottom of center
        { col: '4 / 5', row: '3 / 4', size: 'normal' },     // 10 - bottom right of center
        { col: '5 / 6', row: '3 / 4', size: 'normal' },     // 11 - bottom right corner
    ]

    return (
        <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#f5f5f5]">
            {/* Zone header */}
            <div className="max-w-7xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-baseline gap-4 mb-4"
                >
                    <h2 className="text-6xl md:text-8xl font-black text-black tracking-tight">
                        Top Contributors
                    </h2>
                    <span className="text-red-600 text-2xl font-bold">●</span>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-500 max-w-2xl"
                >
                    These are the African geniuses reshaping the meta, building brick by brick.
                </motion.p>
            </div>

            {/* Mobile: 2-column grid like Bruut (no logo) */}
            <div className="md:hidden grid grid-cols-2 gap-3">
                {allContributors.slice(0, 12).map((person, i) => (
                    <motion.div
                        key={person.id}
                        className="relative aspect-[3/4] overflow-hidden cursor-pointer group rounded-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setSelectedPerson(person)}
                    >
                        <img
                            src={person.image}
                            alt={person.name}
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        {/* Badge for top contributor */}
                        {person.badge === 'yearly' && (
                            <span className="absolute top-2 left-2 px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded-full">
                                👑 #1
                            </span>
                        )}

                        {/* Name & Role - always visible on mobile */}
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                            <p className="text-sm font-bold text-white truncate">{person.name}</p>
                            <p className="text-xs text-white/70 truncate">{person.role}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Desktop: Bruut-style grid with perfect center box for logo */}
            <div className="hidden md:flex w-full justify-center overflow-x-auto">
                <div
                    className="grid gap-4"
                    style={{
                        gridTemplateColumns: 'repeat(5, 320px)',
                        gridTemplateRows: 'repeat(3, 320px)',
                    }}
                >
                    {/* Team1 Logo in center - single cell */}
                    <motion.div
                        className="flex items-center justify-center p-6 rounded-2xl"
                        style={{
                            gridColumn: '3 / 4',
                            gridRow: '2 / 3',
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, type: 'spring' }}
                    >
                        <img src={new URL('../assets/cut_avax_logo.png', import.meta.url).href} alt="Avalanche" className="w-auto h-auto max-w-[250px] max-h-[250px] object-contain" />
                    </motion.div>

                    {/* Contributors around the center */}
                    {allContributors.slice(0, 12).map((person, i) => {
                        const pos = gridPositions[i]
                        if (!pos) return null

                        return (
                            <motion.div
                                key={person.id}
                                className="relative overflow-hidden cursor-pointer group rounded-2xl"
                                style={{
                                    gridColumn: pos.col,
                                    gridRow: pos.row,
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => setSelectedPerson(person)}
                            >
                                <img
                                    src={person.image}
                                    alt={person.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Gradient overlay - stronger on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Badge for top contributor */}
                                {person.badge === 'yearly' && (
                                    <span className="absolute top-2 left-2 px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded-full">
                                        👑 #1
                                    </span>
                                )}

                                {/* Name & Role - ONLY visible on hover */}
                                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-sm font-bold text-white truncate">{person.name}</p>
                                    <p className="text-xs text-white/70 truncate">{person.role}</p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedPerson && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedPerson(null)} />
                        <motion.div
                            className="relative bg-white rounded-3xl overflow-hidden max-w-4xl w-full grid md:grid-cols-2"
                            initial={{ scale: 0.9, y: 40 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 40 }}
                        >
                            <div className="aspect-square md:aspect-auto">
                                <img src={selectedPerson.image} alt={selectedPerson.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <span className="text-red-600 text-sm font-bold uppercase tracking-wider mb-2">{selectedPerson.region}</span>
                                <h3 className="text-4xl font-black text-black mb-2">{selectedPerson.name}</h3>
                                <p className="text-xl text-gray-500 mb-6">{selectedPerson.role}</p>
                                <p className="text-gray-700">{selectedPerson.contribution}</p>
                            </div>
                            <button
                                onClick={() => setSelectedPerson(null)}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                                ✕
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

// ==================== PROJECTS ZONE ====================

function ProjectsZone() {
    const navigate = useNavigate()

    return (
        <section className="py-24 px-6 md:px-12 lg:px-20 bg-white">
            {/* Zone header */}
            <div className="max-w-7xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-baseline gap-4 mb-4"
                >
                    <h2 className="text-6xl md:text-8xl font-black text-black tracking-tight">
                        Winning Builds
                    </h2>
                    <span className="text-red-600 text-2xl font-bold">●</span>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-500 max-w-2xl mb-8"
                >
                    Hackathon champions. Grant winners. The projects putting Africa on the blockchain map.
                    These aren't just ideas—they're <span className="text-red-500 font-semibold">movements</span>.
                </motion.p>
            </div>

            {/* Project cards - Matching Projects page design */}
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {SPOTLIGHT_PROJECTS.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            className="group cursor-pointer"
                            onClick={() => navigate(`/projects/${project.id}`)}
                        >
                            <div className="bg-[#f5f5f5] rounded-2xl p-6 h-full flex flex-col relative hover:shadow-xl transition-shadow duration-300">
                                {/* Top row: Logo + Name + Social Icons */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        {/* Project Logo */}
                                        <div className="w-10 h-10 rounded-lg bg-white p-1.5 flex items-center justify-center flex-shrink-0 shadow-sm">
                                            <img src={project.logo} alt={project.name} className="w-full h-full object-contain" />
                                        </div>
                                        <h3 className="text-xl font-black text-black leading-tight">
                                            {project.name}
                                        </h3>
                                    </div>
                                    {/* Social Icons */}
                                    <div className="flex items-center gap-2">
                                        <a
                                            href="#"
                                            className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="#"
                                            className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                                        {project.category}
                                    </span>
                                    {project.achievement && (
                                        <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded-full">
                                            {project.achievement}
                                        </span>
                                    )}
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                    {project.tagline}
                                </p>

                                {/* Bottom row: View More + Animated Avatars */}
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="px-6 py-2.5 bg-black/80 text-white text-sm font-semibold rounded-lg group-hover:bg-red-700 transition-colors">
                                        View More
                                    </span>

                                    {/* Animated user avatars with cyan rings + count */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-1">
                                            {['Felix', 'Aneka', 'Max'].map((seed, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    className="relative rounded-full"
                                                    animate={{
                                                        boxShadow: [
                                                            '0 0 0 3px #22d3ee, 0 0 8px 2px rgba(34, 211, 238, 0.4)',
                                                            '0 0 0 3px #22d3ee, 0 0 12px 4px rgba(34, 211, 238, 0.6)',
                                                            '0 0 0 3px #22d3ee, 0 0 8px 2px rgba(34, 211, 238, 0.4)'
                                                        ]
                                                    }}
                                                    transition={{
                                                        duration: 1.5,
                                                        repeat: Infinity,
                                                        delay: idx * 0.2
                                                    }}
                                                >
                                                    <img
                                                        src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=b6e3f4`}
                                                        alt="User"
                                                        className="w-10 h-10 rounded-full object-cover bg-white"
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>
                                        <span className="text-sm font-bold text-gray-600">
                                            {project.metric.split(' ')[0]}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Explore More CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Link
                        to="/projects"
                        className="btn-black inline-flex items-center gap-3 px-8 py-4 text-lg font-bold rounded-full transition-colors group"
                    >
                        <span className="relative z-10">Explore All Projects</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

// ==================== EVENTS ZONE ====================

function EventsZone() {
    const navigate = useNavigate()
    const eventOfYear = SPOTLIGHT_EVENTS.find(e => e.badge === 'event-of-year')
    const otherEvents = SPOTLIGHT_EVENTS.filter(e => e.badge !== 'event-of-year')

    return (
        <section className="py-24 px-6 md:px-12 lg:px-20 bg-gray-50">
            {/* Zone header */}
            <div className="max-w-7xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-baseline gap-4 mb-4"
                >
                    <h2 className="text-6xl md:text-8xl font-black text-black tracking-tight">
                        Top Events
                    </h2>
                    <span className="text-red-600 text-2xl font-bold">●</span>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-500 max-w-xl"
                >
                    The gatherings that defined 2024. Hackathons, summits, and community vibes.
                </motion.p>
            </div>

            {/* Events layout */}
            <div className="max-w-7xl mx-auto">
                <div className="relative">
                    {/* Event of the Year */}
                    {eventOfYear && (
                        <motion.div
                            className="relative z-10 cursor-pointer group"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            onClick={() => navigate(`/gallery/${eventOfYear.gallerySlug}`)}
                        >
                            <div className="w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden">
                                <img
                                    src={eventOfYear.image}
                                    alt={eventOfYear.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent rounded-3xl" />
                            <div className="absolute top-6 left-6">
                                <span className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-full">
                                    🏆 Event of the Year
                                </span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex items-end justify-between">
                                <div>
                                    <h3 className="text-4xl md:text-5xl font-black text-white mb-2">{eventOfYear.title}</h3>
                                    <p className="text-white/70 text-lg">{eventOfYear.location} · {eventOfYear.attendees.toLocaleString()}+ attendees</p>
                                </div>
                                <span className="text-6xl font-black text-white/20">{eventOfYear.date}</span>
                            </div>
                        </motion.div>
                    )}

                    {/* Other events */}
                    <div className="flex flex-wrap gap-4 mt-6 md:-mt-20 md:ml-16 relative z-20">
                        {otherEvents.map((event, i) => (
                            <motion.div
                                key={event.id}
                                className="w-full md:w-64 cursor-pointer group relative"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                onClick={() => navigate(`/gallery/${event.gallerySlug}`)}
                            >
                                <div className="h-48 md:h-56 rounded-2xl overflow-hidden shadow-xl">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        {event.badge && (
                                            <span className="inline-block px-2 py-1 bg-black text-white text-xs font-bold rounded-full mb-2">
                                                {event.badge === 'event-of-month' ? '📅 Monthly Top' : '⭐ Top 5'}
                                            </span>
                                        )}
                                        <h4 className="text-lg font-bold text-white">{event.title}</h4>
                                        <p className="text-white/60 text-sm">{event.date}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

// ==================== PEAK MOMENTS ZONE ====================

function PeakMomentsZone() {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <section className="py-24 px-6 md:px-12 lg:px-20 bg-white low-hidden">
            {/* Zone header */}
            <div className="max-w-7xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-baseline gap-4 mb-4"
                >
                    <h2 className="text-6xl md:text-8xl font-black text-black tracking-tight">
                        Peak Moments
                    </h2>
                    <span className="text-red-500 text-2xl font-bold">●</span>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-600 max-w-xl"
                >
                    Those "you had to be there" moments. Pure vibes. No filter. 📸
                </motion.p>
            </div>

            {/* Image cluster */}
            <div className="max-w-7xl mx-auto">
                <div className="relative h-[500px] md:h-[600px]">
                    {MOMENT_IMAGES.map((src, i) => {
                        const positions = [
                            { left: '0%', top: '10%', width: '45%', height: '70%', zIndex: 1 },
                            { left: '35%', top: '0%', width: '40%', height: '50%', zIndex: 2 },
                            { left: '55%', top: '40%', width: '45%', height: '60%', zIndex: 3 },
                            { left: '20%', top: '55%', width: '35%', height: '45%', zIndex: 4 },
                        ]
                        const pos = positions[i]

                        return (
                            <motion.div
                                key={i}
                                className="absolute rounded-2xl overflow-hidden cursor-pointer shadow-2xl"
                                style={{
                                    left: pos.left,
                                    top: pos.top,
                                    width: pos.width,
                                    height: pos.height,
                                    zIndex: activeIndex === i ? 10 : pos.zIndex,
                                }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 1.05, zIndex: 10 }}
                                onHoverStart={() => setActiveIndex(i)}
                            >
                                <img
                                    src={src}
                                    alt={`Peak moment ${i + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

// ==================== MAIN COMPONENT ====================

export default function SpotlightPlatform() {
    const containerRef = useRef<HTMLDivElement>(null)
    // const [isSpotlightVisible, setIsSpotlightVisible] = useState(false)

    // Ambient floating dots
    const floatingDots = useMemo(() => {
        return Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 20 + 10,
        }))
    }, [])

    return (
        <div ref={containerRef} className="min-h-screen bg-white relative">
            {/* Ambient floating dots */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {floatingDots.map((dot) => (
                    <motion.div
                        key={dot.id}
                        className="absolute rounded-full bg-red-500/10"
                        style={{
                            left: `${dot.x}%`,
                            top: `${dot.y}%`,
                            width: dot.size,
                            height: dot.size,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, 15, 0],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: dot.duration,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                ))}
            </div>

            {/* 💡 RED CONE SPOTLIGHT (TONE-ON-TONE RED GRAIN) */}
            {/* 
            <div
                className={`hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1300px] h-[1100px] pointer-events-none z-30 transition-opacity duration-700 ease-in-out ${isSpotlightVisible ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                {/* Layer 1: The Red Light Beam (Background Glow) */}
            {/* 
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)',
                        // Soft Red Gradient
                        background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.5) 0%, rgba(239, 68, 68, 0.15) 50%, transparent 95%)',
                        filter: 'blur(50px)',
                        mixBlendMode: 'screen',
                    }}
                />
                */}

            {/* Layer 2: The "Tone-on-Tone Red Grain" Texture */}
            {/* 
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)',
                        // UPDATED SVG SETTINGS:
                        // 1. baseFrequency='0.20' -> Big, chunky grains.
                        // 2. Color Matrix (Rows 1-3): '0 0 0 0 1.0 ... 0.5 ... 0.5' 
                        //    -> Sets color to Soft Red (R=255, G=128, B=128). 
                        //    This matches the red hue but is slightly lighter so it doesn't disappear.
                        // 3. Alpha Matrix (Row 4): '80 0 0 0 -60' -> Keeps the sparse density (70% less).
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.20' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1.0  0 0 0 0 0.5  0 0 0 0 0.5  80 0 0 0 -65'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                        backgroundSize: '150px 150px',
                        backgroundRepeat: 'repeat',
                        mixBlendMode: 'normal',
                        opacity: 0.9,
                    }}
                />
            </div>
            */}

            {/* Page header */}
            <header className="pt-32 pb-16 px-6 md:px-12 lg:px-20 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.span
                        className="inline-block text-red-600 text-sm font-bold uppercase tracking-[0.3em] mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Recognition Hub
                    </motion.span>
                    <motion.h1
                        className="text-7xl md:text-9xl font-black text-black tracking-tight leading-[0.85] mb-8"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Spotlight
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl text-gray-500 max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        A living showcase of Africa’s most impactful builders, projects, contributors, and creators shaping Avalanche’s ecosystem.
                    </motion.p>
                </div>
            </header>

            {/* Hero Slideshow Wrapper - Triggers the Light */}
            <div
                className="px-6 md:px-12 lg:px-20 relative z-10"
            // onMouseEnter={() => setIsSpotlightVisible(true)}
            // onMouseLeave={() => setIsSpotlightVisible(false)}
            >
                <div className="max-w-7xl mx-auto">
                    <HeroSlideshow />
                </div>
            </div>

            {/* Spotlight Zones */}
            <div id="contributors" className="relative z-10">
                <TopContributorsZone />
            </div>
            <div id="projects" className="relative z-10">
                <ProjectsZone />
            </div>
            <div id="events" className="relative z-10">
                <EventsZone />
            </div>
            <div id="moments" className="relative z-10">
                <PeakMomentsZone />
            </div>
        </div>
    )
}