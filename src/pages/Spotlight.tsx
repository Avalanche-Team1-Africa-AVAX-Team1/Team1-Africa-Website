/**
 * 🎯 SPOTLIGHT PLATFORM - REVAMPED
 * 
 * Recognition Hub | Editorial Gallery | Living Archive
 * 
 * Features:
 * - Hero slideshow (Top Contributor, Project, Event of Year)
 * - Top 3 Contributors + 10 Honorary Mentions
 * - Top Contributors section with masonry layout + Team1 logo
 * - Projects with real Avalanche projects + Explore More CTA
 * - Events linking to gallery details
 * - Peak Moments section
 */

import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

// Import Team1 logo for center piece
import team1Logo from '../assets/team1logo.png'

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
    { id: 'p1', name: 'Kwame Mensah', role: 'Lead Developer', region: 'Ghana', contribution: 'Built 12 production subnets, mentored 50+ developers', badge: 'yearly', image: new URL('../assets/testimonial1.jpg', import.meta.url).href },
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

// Projects with real Avalanche ecosystem logos
const SPOTLIGHT_PROJECTS: SpotlightProject[] = [
    { id: 1, name: 'Canza Finance', tagline: 'African Forex on-chain', metric: '$2M+ TVL', category: 'DeFi', logo: new URL('../assets/refi.png', import.meta.url).href, location: 'Nigeria', achievement: '🏆 Avalanche Grant Winner', liveUrl: 'https://canza.io' },
    { id: 2, name: 'Kula Protocol', tagline: 'Impact investment DAO', metric: '$500K deployed', category: 'DAO', logo: new URL('../assets/gitcoin.png', import.meta.url).href, location: 'Kenya', achievement: '🏆 Summit Hackathon Winner', liveUrl: 'https://kula.finance' },
    { id: 3, name: 'AfriMint', tagline: 'NFT marketplace for African art', metric: '10K+ minted', category: 'NFT', logo: new URL('../assets/spherre.png', import.meta.url).href, location: 'Ghana', achievement: '🏆 Best NFT Project 2024', liveUrl: 'https://afrimint.xyz' },
    { id: 4, name: 'Baki Exchange', tagline: 'Tokenized African currencies', metric: '3 currencies live', category: 'DeFi', logo: new URL('../assets/dexalot.png', import.meta.url).href, location: 'South Africa', achievement: '🏆 Avalanche Summit Featured', liveUrl: 'https://baki.exchange' },
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
        title: 'Kwame Mensah',
        subtitle: 'Contributor of the Year',
        description: 'Built 12 production subnets and mentored 50+ developers across Africa',
        image: new URL('../assets/testimonial1.jpg', import.meta.url).href,
        badge: '👑 2024 CHAMPION'
    },
    {
        type: 'project',
        title: 'Canza Finance',
        subtitle: 'Project of the Year',
        description: 'Revolutionizing African forex with on-chain tokenized currencies',
        image: new URL('../assets/south7.jpg', import.meta.url).href,
        badge: '🚀 TOP PROJECT'
    },
    {
        type: 'event',
        title: 'Lagos Summit 2024',
        subtitle: 'Event of the Year',
        description: '1,200+ builders gathered for the largest Avalanche event in Africa',
        image: new URL('../assets/south1.jpg', import.meta.url).href,
        badge: '🎉 LEGENDARY'
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
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    useEffect(() => {
        if (!isAutoPlaying) return
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [isAutoPlaying])

    const slide = HERO_SLIDES[currentSlide]

    return (
        <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden rounded-3xl mb-16">
            {/* Background images with transition */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8 }}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-full mb-4">
                            {slide.badge}
                        </span>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-2">
                            {slide.title}
                        </h2>
                        <p className="text-xl md:text-2xl text-red-400 font-bold mb-4">
                            {slide.subtitle}
                        </p>
                        <p className="text-lg text-white/80 max-w-2xl">
                            {slide.description}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Slide indicators */}
            <div className="absolute bottom-8 right-8 flex gap-3">
                {HERO_SLIDES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => { setCurrentSlide(i); setIsAutoPlaying(false) }}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-red-600 w-8' : 'bg-white/50 hover:bg-white'
                            }`}
                    />
                ))}
            </div>

            {/* Navigation arrows */}
            <button
                onClick={() => { setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length); setIsAutoPlaying(false) }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={() => { setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length); setIsAutoPlaying(false) }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </section>
    )
}

// ==================== TOP 3 + HONORARY MENTIONS ====================

function TopContributorsPreview() {
    const top3 = SPOTLIGHT_PEOPLE.filter(p => p.badge === 'yearly' || p.badge === 'top3').slice(0, 3)
    const honorary = SPOTLIGHT_PEOPLE.filter(p => p.badge === 'honorary').slice(0, 10)

    return (
        <section className="mb-24">
            {/* Top 3 Contributors */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
            >
                <h3 className="text-3xl md:text-4xl font-black text-black mb-8 flex items-center gap-3">
                    <span className="text-4xl">🏆</span> Top 3 Contributors of 2024
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                    {top3.map((person, i) => (
                        <motion.div
                            key={person.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative overflow-hidden rounded-2xl cursor-pointer"
                        >
                            <div className="aspect-[3/4] overflow-hidden">
                                <img
                                    src={person.image}
                                    alt={person.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                            <div className="absolute top-4 left-4">
                                <span className={`px-3 py-1.5 text-xs font-bold rounded-full ${i === 0 ? 'bg-yellow-500 text-black' : 'bg-white text-black'
                                    }`}>
                                    #{i + 1} {i === 0 ? '👑' : ''}
                                </span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h4 className="text-2xl font-black text-white mb-1">{person.name}</h4>
                                <p className="text-white/70">{person.role} · {person.region}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Honorary Mentions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h3 className="text-2xl md:text-3xl font-black text-black mb-6 flex items-center gap-3">
                    <span className="text-3xl">⭐</span> Honorary Mentions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {honorary.map((person, i) => (
                        <motion.div
                            key={person.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer"
                        >
                            <img
                                src={person.image}
                                alt={person.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-sm font-bold text-white truncate">{person.name}</p>
                                <p className="text-xs text-white/70">{person.region}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}

// ==================== TOP CONTRIBUTORS ZONE ====================

function TopContributorsZone() {
    const [selectedPerson, setSelectedPerson] = useState<SpotlightPerson | null>(null)
    const allContributors = SPOTLIGHT_PEOPLE

    // Masonry layout with varying sizes
    const getGridClass = (index: number) => {
        const patterns = [
            'col-span-2 row-span-2', // Large
            'col-span-1 row-span-1', // Small
            'col-span-1 row-span-2', // Tall
            'col-span-2 row-span-1', // Wide
            'col-span-1 row-span-1', // Small
        ]
        return patterns[index % patterns.length]
    }

    return (
        <section className="py-24 px-6 md:px-12 lg:px-20">
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
                    <span className="text-red-500 font-semibold"> Are you down with the movement? 🧱</span>
                </motion.p>
            </div>

            {/* Masonry layout with Team1 logo in center */}
            <div className="max-w-7xl mx-auto">
                <div className="relative grid grid-cols-4 md:grid-cols-6 gap-4 auto-rows-[150px] md:auto-rows-[180px]">
                    {/* Team1 Logo in center */}
                    <motion.div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, type: 'spring' }}
                    >
                        <div className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-full shadow-2xl flex items-center justify-center p-4">
                            <img src={team1Logo} alt="Team1 Africa" className="w-full h-full object-contain" />
                        </div>
                    </motion.div>

                    {allContributors.slice(0, 12).map((person, i) => (
                        <motion.div
                            key={person.id}
                            className={`${getGridClass(i)} relative overflow-hidden rounded-2xl cursor-pointer group`}
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                            {person.badge === 'yearly' && (
                                <span className="absolute top-3 left-3 px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                                    👑 #1
                                </span>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h4 className="text-lg font-bold text-white truncate">{person.name}</h4>
                                <p className="text-sm text-white/70 truncate">{person.role}</p>
                            </div>
                        </motion.div>
                    ))}
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

            {/* Project cards */}
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {SPOTLIGHT_PROJECTS.map((project, i) => (
                        <motion.div
                            key={project.id}
                            className="relative group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            onClick={() => navigate(`/projects/${project.id}`)}
                        >
                            <div className="p-8 md:p-10">
                                {/* Achievement badge */}
                                {project.achievement && (
                                    <span className="inline-block px-3 py-1.5 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full mb-4">
                                        {project.achievement}
                                    </span>
                                )}

                                {/* Logo and name */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-gray-100 p-2 flex items-center justify-center">
                                        <img src={project.logo} alt={project.name} className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-black text-black">{project.name}</h3>
                                        <p className="text-gray-500">{project.tagline}</p>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-6">
                                    <div>
                                        <p className="text-3xl font-black text-red-600">{project.metric}</p>
                                        <p className="text-sm text-gray-400">Key Metric</p>
                                    </div>
                                    <div className="w-px h-12 bg-gray-200" />
                                    <div>
                                        <span className="px-3 py-1 bg-black text-white text-xs font-bold rounded-full">{project.category}</span>
                                        <p className="text-sm text-gray-400 mt-1">{project.location}</p>
                                    </div>
                                </div>

                                {/* Hover arrow */}
                                <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
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
                        className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-lg font-bold rounded-full hover:bg-red-600 transition-colors group"
                    >
                        Explore All Projects
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <section className="py-24 px-6 md:px-12 lg:px-20">
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
                                className="w-full md:w-64 cursor-pointer group"
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
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl pointer-events-none" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    {event.badge && (
                                        <span className="inline-block px-2 py-1 bg-black text-white text-xs font-bold rounded-full mb-2">
                                            {event.badge === 'event-of-month' ? '📅 Monthly Top' : '⭐ Top 5'}
                                        </span>
                                    )}
                                    <h4 className="text-lg font-bold text-white">{event.title}</h4>
                                    <p className="text-white/60 text-sm">{event.date}</p>
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
        <section className="py-24 px-6 md:px-12 lg:px-20 bg-black text-white overflow-hidden">
            {/* Zone header */}
            <div className="max-w-7xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-baseline gap-4 mb-4"
                >
                    <h2 className="text-6xl md:text-8xl font-black text-white tracking-tight">
                        Peak Moments
                    </h2>
                    <span className="text-red-500 text-2xl font-bold">●</span>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-white/50 max-w-xl"
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
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
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
                        Celebrating the builders, projects, and events driving Africa's blockchain ecosystem.
                    </motion.p>

                    {/* Zone quick links */}
                    <motion.div
                        className="flex flex-wrap gap-4 mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {['Top Contributors', 'Winning Builds', 'Top Events', 'Peak Moments'].map((zone, i) => (
                            <a
                                key={zone}
                                href={`#${['contributors', 'projects', 'events', 'moments'][i]}`}
                                className="px-6 py-3 bg-black text-white text-sm font-bold rounded-full hover:bg-red-600 transition-colors"
                            >
                                {zone}
                            </a>
                        ))}
                    </motion.div>
                </div>
            </header>

            {/* Hero Slideshow */}
            <div className="px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <HeroSlideshow />
                    <TopContributorsPreview />
                </div>
            </div>

            {/* Spotlight Zones */}
            <div id="contributors">
                <TopContributorsZone />
            </div>
            <div id="projects">
                <ProjectsZone />
            </div>
            <div id="events">
                <EventsZone />
            </div>
            <div id="moments">
                <PeakMomentsZone />
            </div>
        </div>
    )
}