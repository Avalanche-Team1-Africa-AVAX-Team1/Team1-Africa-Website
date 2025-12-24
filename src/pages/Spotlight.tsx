/**
 * 🎯 SPOTLIGHT PLATFORM
 * 
 * Recognition Hub | Editorial Gallery | Living Archive
 * 
 * This is NOT a "Wrapped" microsite. This is a Spotlight Platform.
 * 
 * Design Principles:
 * - WHITE dominant, black/red as accents
 * - Image-first, image-heavy (images ARE the UI)
 * - Multiple interaction layers (hover, click, idle, pointer)
 * - Alive even when idle
 * - No scroll hijacking
 * - Discrete spotlight zones, not linear narrative
 * 
 * Zones:
 * - People Zone (Contributors)
 * - Projects Zone (African-founded projects)
 * - Events Zone
 * - Moments Zone
 */

import { useEffect, useRef, useState, useMemo } from 'react'
import { gsap } from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'

// ==================== TYPES ====================

interface SpotlightPerson {
    id: string
    name: string
    role: string
    region: string
    contribution: string
    image: string
    badge?: 'monthly' | 'yearly' | 'top5'
}

interface SpotlightProject {
    id: number
    name: string
    tagline: string
    metric: string
    category: string
    color: string
    location: string
}

interface SpotlightEvent {
    id: string
    title: string
    date: string
    location: string
    attendees: number
    image: string
    badge?: 'event-of-year' | 'event-of-month' | 'top5'
}

// ==================== DATA ====================

// Using actual images from assets
const SPOTLIGHT_PEOPLE: SpotlightPerson[] = [
    { id: 'p1', name: 'Kwame Mensah', role: 'Lead Developer', region: 'Ghana', contribution: 'Built 12 production subnets', badge: 'yearly', image: new URL('../assets/testimonial1.jpg', import.meta.url).href },
    { id: 'p2', name: 'Amara Okafor', role: 'Community Lead', region: 'Nigeria', contribution: 'Onboarded 500+ developers', badge: 'monthly', image: new URL('../assets/testimonial2.jpg', import.meta.url).href },
    { id: 'p3', name: 'Wanjiku Kimani', role: 'Product Lead', region: 'Kenya', contribution: 'Launched 8 African projects', badge: 'top5', image: new URL('../assets/testimonial3.jpg', import.meta.url).href },
    { id: 'p4', name: 'Thabo Nkosi', role: 'DeFi Architect', region: 'South Africa', contribution: 'Processed $24M in transactions', badge: 'top5', image: new URL('../assets/south5.jpg', import.meta.url).href },
    { id: 'p5', name: 'Faraji Mwamburi', role: 'Mobile Pioneer', region: 'Tanzania', contribution: 'Mobile payments for 15K users', badge: 'top5', image: new URL('../assets/testimonial5.jpg', import.meta.url).href },
]

const SPOTLIGHT_PROJECTS: SpotlightProject[] = [
    { id: 1, name: 'AfriPay', tagline: 'Cross-border payments', metric: '$24M processed', category: 'DeFi', color: '#E53935', location: 'Nigeria' },
    { id: 2, name: 'Harvest Protocol', tagline: 'Farm-to-market transparency', metric: '45K tracked', category: 'Infrastructure', color: '#43A047', location: 'Kenya' },
    { id: 3, name: 'Sankofa NFT', tagline: 'Cultural heritage on-chain', metric: '$680K sales', category: 'NFT', color: '#1E88E5', location: 'Ghana' },
    { id: 4, name: 'Jamii DAO', tagline: 'Community governance', metric: '67 funded', category: 'DAO', color: '#8E24AA', location: 'Ethiopia' },
]

const SPOTLIGHT_EVENTS: SpotlightEvent[] = [
    { id: 'e1', title: 'Lagos Summit', date: 'Feb 2025', location: 'Nigeria', attendees: 1200, badge: 'event-of-year', image: new URL('../assets/south1.jpg', import.meta.url).href },
    { id: 'e2', title: 'Nairobi Hackathon', date: 'Apr 2025', location: 'Kenya', attendees: 450, badge: 'event-of-month', image: new URL('../assets/south2.jpg', import.meta.url).href },
    { id: 'e3', title: 'Accra Dev Week', date: 'Jun 2025', location: 'Ghana', attendees: 680, badge: 'top5', image: new URL('../assets/ghana1.JPG', import.meta.url).href },
    { id: 'e4', title: 'Cape Town Build', date: 'Aug 2025', location: 'South Africa', attendees: 520, badge: 'top5', image: new URL('../assets/south3.jpg', import.meta.url).href },
]

// Community moment images
const MOMENT_IMAGES = [
    new URL('../assets/south4.jpg', import.meta.url).href,
    new URL('../assets/ghana2.JPG', import.meta.url).href,
    new URL('../assets/south6.jpg', import.meta.url).href,
    new URL('../assets/ghana3.JPG', import.meta.url).href,
]

// ==================== AMBIENT MOTION HOOK ====================

function useIdleMotion(ref: React.RefObject<HTMLElement | null>, intensity: number = 1) {
    useEffect(() => {
        if (!ref.current) return

        const element = ref.current
        let animationId: number

        // Subtle breathing / drift animation when idle
        const animate = () => {
            const time = Date.now() * 0.001
            const x = Math.sin(time * 0.5) * 2 * intensity
            const y = Math.cos(time * 0.3) * 2 * intensity
            const scale = 1 + Math.sin(time * 0.2) * 0.005 * intensity

            gsap.set(element, {
                x,
                y,
                scale,
            })

            animationId = requestAnimationFrame(animate)
        }

        animate()

        return () => cancelAnimationFrame(animationId)
    }, [ref, intensity])
}

// ==================== POINTER TRACKING HOOK ====================

function usePointerParallax(ref: React.RefObject<HTMLElement | null>, strength: number = 20) {
    useEffect(() => {
        if (!ref.current) return

        const element = ref.current

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2

            const deltaX = (e.clientX - centerX) / rect.width
            const deltaY = (e.clientY - centerY) / rect.height

            gsap.to(element, {
                x: deltaX * strength,
                y: deltaY * strength,
                rotateX: -deltaY * 5,
                rotateY: deltaX * 5,
                duration: 0.5,
                ease: 'power2.out',
            })
        }

        const handleMouseLeave = () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        element.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            element.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [ref, strength])
}

// ==================== SPOTLIGHT IMAGE COMPONENT ====================

interface SpotlightImageProps {
    src: string
    alt: string
    className?: string
    onClick?: () => void
    badge?: string
    overlayContent?: React.ReactNode
    idleMotion?: boolean
}

function SpotlightImage({ src, alt, className = '', onClick, badge, overlayContent, idleMotion = true }: SpotlightImageProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    // Idle breathing animation
    useEffect(() => {
        if (!idleMotion || !imageRef.current || isHovered) return

        const image = imageRef.current
        let animationId: number
        const startTime = Date.now()

        const animate = () => {
            const elapsed = (Date.now() - startTime) * 0.001
            const scale = 1 + Math.sin(elapsed * 0.5) * 0.02

            gsap.set(image, { scale })
            animationId = requestAnimationFrame(animate)
        }

        animate()
        return () => cancelAnimationFrame(animationId)
    }, [idleMotion, isHovered])

    return (
        <motion.div
            ref={containerRef}
            className={`relative overflow-hidden cursor-pointer group ${className}`}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: '1000px' }}
        >
            {/* Image */}
            <motion.img
                ref={imageRef}
                src={src}
                alt={alt}
                onLoad={() => setImageLoaded(true)}
                className="w-full h-full object-cover transition-all duration-700"
                style={{
                    filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
                    opacity: imageLoaded ? 1 : 0,
                }}
                animate={{
                    scale: isHovered ? 1.08 : 1,
                }}
                transition={{ duration: 0.6 }}
            />

            {/* Gradient overlay */}
            <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"
            />

            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Badge */}
            {badge && (
                <motion.div
                    className="absolute top-4 left-4 z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <span className={`
                        px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full
                        ${badge === 'yearly' || badge === 'event-of-year' ? 'bg-red-600 text-white' : ''}
                        ${badge === 'monthly' || badge === 'event-of-month' ? 'bg-black text-white' : ''}
                        ${badge === 'top5' ? 'bg-white text-black' : ''}
                    `}>
                        {badge === 'yearly' && '★ Contributor of the Year'}
                        {badge === 'monthly' && 'Monthly MVP'}
                        {badge === 'top5' && 'Top 5'}
                        {badge === 'event-of-year' && '★ Event of the Year'}
                        {badge === 'event-of-month' && 'Event of the Month'}
                    </span>
                </motion.div>
            )}

            {/* Overlay content */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isHovered ? 1 : 0.8, y: isHovered ? 0 : 10 }}
                transition={{ duration: 0.4 }}
            >
                {overlayContent}
            </motion.div>

            {/* Hover reveal border */}
            <motion.div
                className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 transition-colors duration-500 pointer-events-none"
            />
        </motion.div>
    )
}

// ==================== EXPANDED SPOTLIGHT MODAL ====================

interface SpotlightModalProps {
    isOpen: boolean
    onClose: () => void
    content: {
        type: 'person' | 'project' | 'event'
        data: SpotlightPerson | SpotlightProject | SpotlightEvent
    } | null
}

function SpotlightModal({ isOpen, onClose, content }: SpotlightModalProps) {
    return (
        <AnimatePresence>
            {isOpen && content && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-white/95 backdrop-blur-sm"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal content */}
                    <motion.div
                        className="relative z-10 max-w-5xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden"
                        initial={{ scale: 0.9, y: 40 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 40 }}
                        transition={{ type: 'spring', damping: 25 }}
                    >
                        {content.type === 'person' && (
                            <div className="grid md:grid-cols-2">
                                <div className="aspect-[4/5] bg-gray-100">
                                    <img
                                        src={(content.data as SpotlightPerson).image}
                                        alt={(content.data as SpotlightPerson).name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-12 flex flex-col justify-center">
                                    <span className="text-red-600 text-sm font-bold uppercase tracking-wider mb-4">
                                        {(content.data as SpotlightPerson).region}
                                    </span>
                                    <h2 className="text-5xl font-black text-black mb-2">
                                        {(content.data as SpotlightPerson).name}
                                    </h2>
                                    <p className="text-xl text-gray-500 mb-6">
                                        {(content.data as SpotlightPerson).role}
                                    </p>
                                    <p className="text-lg text-gray-700 leading-relaxed">
                                        {(content.data as SpotlightPerson).contribution}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// ==================== ZONE: PEOPLE ====================

function PeopleZone() {
    const [selectedPerson, setSelectedPerson] = useState<SpotlightPerson | null>(null)
    const yearlyContributor = SPOTLIGHT_PEOPLE.find(p => p.badge === 'yearly')
    const monthlyContributor = SPOTLIGHT_PEOPLE.find(p => p.badge === 'monthly')
    const top5 = SPOTLIGHT_PEOPLE.filter(p => p.badge === 'top5')

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
                        People
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
                    The builders, leaders, and visionaries shaping Africa's blockchain future.
                </motion.p>
            </div>

            {/* Asymmetric image layout */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-12 gap-4 md:gap-6">
                    {/* Yearly contributor - large feature */}
                    {yearlyContributor && (
                        <motion.div
                            className="col-span-12 md:col-span-7 row-span-2"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <SpotlightImage
                                src={yearlyContributor.image}
                                alt={yearlyContributor.name}
                                className="h-[600px] md:h-[700px] rounded-2xl"
                                badge="yearly"
                                onClick={() => setSelectedPerson(yearlyContributor)}
                                overlayContent={
                                    <div>
                                        <h3 className="text-3xl md:text-4xl font-black text-white mb-1">
                                            {yearlyContributor.name}
                                        </h3>
                                        <p className="text-white/70 text-lg">
                                            {yearlyContributor.role} · {yearlyContributor.region}
                                        </p>
                                    </div>
                                }
                            />
                        </motion.div>
                    )}

                    {/* Monthly + Top 5 stack */}
                    <div className="col-span-12 md:col-span-5 flex flex-col gap-4 md:gap-6">
                        {/* Monthly MVP */}
                        {monthlyContributor && (
                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                <SpotlightImage
                                    src={monthlyContributor.image}
                                    alt={monthlyContributor.name}
                                    className="h-[280px] md:h-[340px] rounded-2xl"
                                    badge="monthly"
                                    onClick={() => setSelectedPerson(monthlyContributor)}
                                    overlayContent={
                                        <div>
                                            <h3 className="text-2xl font-black text-white mb-1">
                                                {monthlyContributor.name}
                                            </h3>
                                            <p className="text-white/70">
                                                {monthlyContributor.role}
                                            </p>
                                        </div>
                                    }
                                />
                            </motion.div>
                        )}

                        {/* Top 5 thumbnails */}
                        <div className="grid grid-cols-3 gap-4">
                            {top5.slice(0, 3).map((person, i) => (
                                <motion.div
                                    key={person.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                                >
                                    <SpotlightImage
                                        src={person.image}
                                        alt={person.name}
                                        className="aspect-square rounded-xl"
                                        onClick={() => setSelectedPerson(person)}
                                        idleMotion={false}
                                        overlayContent={
                                            <p className="text-sm font-bold text-white truncate">
                                                {person.name}
                                            </p>
                                        }
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <SpotlightModal
                isOpen={!!selectedPerson}
                onClose={() => setSelectedPerson(null)}
                content={selectedPerson ? { type: 'person', data: selectedPerson } : null}
            />
        </section>
    )
}

// ==================== ZONE: PROJECTS ====================

function ProjectsZone() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [hoveredProject, setHoveredProject] = useState<number | null>(null)

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
                        Projects
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
                    African-founded projects building on Avalanche.
                </motion.p>
            </div>

            {/* Project cards - hover reveals */}
            <div ref={containerRef} className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                    {SPOTLIGHT_PROJECTS.map((project, i) => (
                        <motion.div
                            key={project.id}
                            className="relative group cursor-pointer"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            onMouseEnter={() => setHoveredProject(project.id)}
                            onMouseLeave={() => setHoveredProject(null)}
                            style={{ perspective: '1000px' }}
                        >
                            <motion.div
                                className="relative p-8 md:p-12 rounded-2xl h-64 md:h-80 flex flex-col justify-between overflow-hidden"
                                style={{ backgroundColor: project.color }}
                                animate={{
                                    rotateX: hoveredProject === project.id ? -2 : 0,
                                    rotateY: hoveredProject === project.id ? 3 : 0,
                                    scale: hoveredProject === project.id ? 1.02 : 1,
                                }}
                                transition={{ duration: 0.4 }}
                            >
                                {/* Category pill */}
                                <div>
                                    <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full mb-4">
                                        {project.category}
                                    </span>
                                </div>

                                {/* Content */}
                                <div>
                                    <motion.h3
                                        className="text-4xl md:text-5xl font-black text-white mb-2"
                                        animate={{ y: hoveredProject === project.id ? -8 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {project.name}
                                    </motion.h3>
                                    <p className="text-white/80 text-lg mb-4">
                                        {project.tagline}
                                    </p>
                                    <motion.div
                                        className="flex items-center gap-4"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: hoveredProject === project.id ? 1 : 0.6, y: hoveredProject === project.id ? 0 : 10 }}
                                    >
                                        <span className="text-2xl font-black text-white">{project.metric}</span>
                                        <span className="text-white/60">·</span>
                                        <span className="text-white/60">{project.location}</span>
                                    </motion.div>
                                </div>

                                {/* Decorative circle */}
                                <motion.div
                                    className="absolute -right-20 -bottom-20 w-60 h-60 rounded-full bg-white/10"
                                    animate={{
                                        scale: hoveredProject === project.id ? 1.3 : 1,
                                        x: hoveredProject === project.id ? -20 : 0,
                                    }}
                                    transition={{ duration: 0.5 }}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ==================== ZONE: EVENTS ====================

function EventsZone() {
    const [selectedEvent, setSelectedEvent] = useState<SpotlightEvent | null>(null)
    const eventOfYear = SPOTLIGHT_EVENTS.find(e => e.badge === 'event-of-year')
    const eventOfMonth = SPOTLIGHT_EVENTS.find(e => e.badge === 'event-of-month')
    const top5Events = SPOTLIGHT_EVENTS.filter(e => e.badge === 'top5')

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
                        Events
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
                    Hackathons, summits, and community gatherings across Africa.
                </motion.p>
            </div>

            {/* Overlapping image layout */}
            <div className="max-w-7xl mx-auto">
                <div className="relative">
                    {/* Event of the Year - large background */}
                    {eventOfYear && (
                        <motion.div
                            className="relative z-10"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <SpotlightImage
                                src={eventOfYear.image}
                                alt={eventOfYear.title}
                                className="w-full h-[500px] md:h-[600px] rounded-3xl"
                                badge="event-of-year"
                                onClick={() => setSelectedEvent(eventOfYear)}
                                overlayContent={
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <h3 className="text-4xl md:text-5xl font-black text-white mb-2">
                                                {eventOfYear.title}
                                            </h3>
                                            <p className="text-white/70 text-lg">
                                                {eventOfYear.location} · {eventOfYear.attendees.toLocaleString()}+ attendees
                                            </p>
                                        </div>
                                        <span className="text-6xl font-black text-white/20">
                                            {eventOfYear.date}
                                        </span>
                                    </div>
                                }
                            />
                        </motion.div>
                    )}

                    {/* Floating sub-events - overlapping */}
                    <div className="flex flex-wrap gap-4 mt-6 md:-mt-24 md:ml-16 relative z-20">
                        {eventOfMonth && (
                            <motion.div
                                className="w-full md:w-72"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <SpotlightImage
                                    src={eventOfMonth.image}
                                    alt={eventOfMonth.title}
                                    className="h-48 md:h-56 rounded-2xl shadow-xl"
                                    badge="event-of-month"
                                    onClick={() => setSelectedEvent(eventOfMonth)}
                                    overlayContent={
                                        <div>
                                            <h4 className="text-xl font-black text-white">{eventOfMonth.title}</h4>
                                            <p className="text-white/60 text-sm">{eventOfMonth.date}</p>
                                        </div>
                                    }
                                />
                            </motion.div>
                        )}

                        {top5Events.map((event, i) => (
                            <motion.div
                                key={event.id}
                                className="w-40 md:w-48"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                            >
                                <SpotlightImage
                                    src={event.image}
                                    alt={event.title}
                                    className="h-32 md:h-40 rounded-xl shadow-lg"
                                    onClick={() => setSelectedEvent(event)}
                                    idleMotion={false}
                                    overlayContent={
                                        <p className="text-sm font-bold text-white truncate">{event.title}</p>
                                    }
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

// ==================== ZONE: MOMENTS ====================

function MomentsZone() {
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
                        Moments
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
                    Community snapshots that capture the energy.
                </motion.p>
            </div>

            {/* Image cluster with hover interaction */}
            <div className="max-w-7xl mx-auto">
                <div className="relative h-[500px] md:h-[600px]">
                    {MOMENT_IMAGES.map((src, i) => {
                        // Calculate layered positions
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
                                    alt={`Community moment ${i + 1}`}
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
            {/* Ambient floating dots - alive when idle */}
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
                        {['People', 'Projects', 'Events', 'Moments'].map((zone) => (
                            <a
                                key={zone}
                                href={`#${zone.toLowerCase()}`}
                                className="px-6 py-3 bg-black text-white text-sm font-bold rounded-full hover:bg-red-600 transition-colors"
                            >
                                {zone}
                            </a>
                        ))}
                    </motion.div>
                </div>
            </header>

            {/* Spotlight Zones */}
            <div id="people">
                <PeopleZone />
            </div>
            <div id="projects">
                <ProjectsZone />
            </div>
            <div id="events">
                <EventsZone />
            </div>
            <div id="moments">
                <MomentsZone />
            </div>
        </div>
    )
}