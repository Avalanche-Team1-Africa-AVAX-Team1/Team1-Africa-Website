/**
 * 🎬 COMMUNITY WRAPPED — A Cinematic Scroll Experience
 * 
 * Award-worthy, scroll-driven narrative celebrating African builders on Avalanche
 * Technologies: GSAP (ScrollTrigger, timelines), Lenis, Three.js, Anime.js
 * 
 * Structure:
 * - Chapter 1: The Opening Statement (Bold typographic takeover)
 * - Chapter 2: The Year in Numbers (Animated metrics)
 * - Chapter 3: The Builders (Layered contributor reveals)
 * - Chapter 4: The Projects (African-founded Avalanche projects)
 * - Chapter 5: The Moments (Horizontal timeline)
 * - Chapter 6: The Collective Impact (Emotional crescendo)
 * - Chapter 7: The Outro (Call to action)
 */

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import ParticleBackground from '../components/ParticleBackground'
import '../styles/wrapped.css'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// ==================== DATA ====================

interface Builder {
    id: number
    name: string
    role: string
    region: string
    contribution: string
    image: string
}

interface Project {
    id: number
    name: string
    tagline: string
    metric: string
    category: string
    color: string
}

interface Moment {
    id: number
    date: string
    title: string
    location: string
    attendees: string
}

const BUILDERS: Builder[] = [
    { id: 1, name: 'Kwame Mensah', role: 'Lead Developer', region: 'Ghana', contribution: 'Built 12 production subnets', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600' },
    { id: 2, name: 'Amara Okafor', role: 'Community Lead', region: 'Nigeria', contribution: 'Onboarded 500+ developers', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600' },
    { id: 3, name: 'Wanjiku Kimani', role: 'Product Lead', region: 'Kenya', contribution: 'Launched 8 African projects', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600' },
    { id: 4, name: 'Thabo Nkosi', role: 'DeFi Architect', region: 'South Africa', contribution: 'Processed $24M in transactions', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600' },
    { id: 5, name: 'Faraji Mwamburi', role: 'Mobile Pioneer', region: 'Tanzania', contribution: 'Mobile payments for 15K users', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600' },
]

const PROJECTS: Project[] = [
    { id: 1, name: 'AfriPay', tagline: 'Cross-border payments', metric: '$24M processed', category: 'DeFi', color: '#E53935' },
    { id: 2, name: 'Harvest Protocol', tagline: 'Farm-to-market transparency', metric: '45K products tracked', category: 'Infrastructure', color: '#43A047' },
    { id: 3, name: 'Sankofa NFT', tagline: 'Cultural heritage on-chain', metric: '$680K in sales', category: 'NFT', color: '#1E88E5' },
    { id: 4, name: 'Jamii DAO', tagline: 'Community governance', metric: '67 projects funded', category: 'DAO', color: '#8E24AA' },
    { id: 5, name: 'Adumu Games', tagline: 'African mythology GameFi', metric: '8.5K active players', category: 'Gaming', color: '#FF6F00' },
    { id: 6, name: 'Ubuntu Identity', tagline: 'Self-sovereign identity', metric: '92K identities', category: 'Identity', color: '#00ACC1' },
]

const MOMENTS: Moment[] = [
    { id: 1, date: 'Feb 2025', title: 'Lagos Summit', location: 'Nigeria', attendees: '1,200+' },
    { id: 2, date: 'Apr 2025', title: 'Nairobi Hackathon', location: 'Kenya', attendees: '450+' },
    { id: 3, date: 'Jun 2025', title: 'Accra Dev Week', location: 'Ghana', attendees: '680+' },
    { id: 4, date: 'Aug 2025', title: 'Cape Town Build', location: 'South Africa', attendees: '520+' },
    { id: 5, date: 'Oct 2025', title: 'Dar es Salaam Connect', location: 'Tanzania', attendees: '380+' },
    { id: 6, date: 'Dec 2025', title: 'African Builders Finale', location: 'Virtual', attendees: '3,000+' },
]

const METRICS = [
    { value: 500, suffix: '+', label: 'Contributors', description: 'Developers trained and onboarded' },
    { value: 45, suffix: '', label: 'Events', description: 'Hackathons, summits, workshops' },
    { value: 120, suffix: '+', label: 'Products', description: 'Shipped to production' },
    { value: 24, suffix: 'M', prefix: '$', label: 'Volume', description: 'Total transaction value' },
    { value: 12, suffix: '', label: 'Countries', description: 'Active African nations' },
    { value: 8, suffix: 'K+', label: 'Community', description: 'Members across Africa' },
]

// ==================== CHAPTER 1: OPENING STATEMENT ====================

function ChapterOpening() {
    const containerRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const yearRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const container = containerRef.current
        const title = titleRef.current
        const subtitle = subtitleRef.current
        const year = yearRef.current

        if (!container || !title || !subtitle || !year) return

        // Split title into characters for staggered animation
        const titleText = title.innerText
        title.innerHTML = titleText.split('').map(char =>
            char === ' ' ? ' ' : `<span class="char">${char}</span>`
        ).join('')

        const chars = title.querySelectorAll('.char')

        // Create entrance timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: 'bottom center',
                pin: true,
                scrub: 1,
            }
        })

        // Animate year counter from 2024 to 2025
        gsap.fromTo(year,
            { innerText: '2024' },
            {
                innerText: '2025',
                duration: 1,
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: container,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: true,
                }
            }
        )

        // Characters reveal with wave effect
        tl.from(chars, {
            opacity: 0,
            y: 100,
            rotateX: -90,
            stagger: 0.02,
            ease: 'back.out(1.7)',
        })
            .from(subtitle, {
                opacity: 0,
                y: 50,
                duration: 0.5,
            }, '-=0.3')

        // Parallax background shapes
        gsap.to('.bg-shape-1', {
            y: -200,
            rotation: 45,
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            }
        })

        gsap.to('.bg-shape-2', {
            y: -300,
            rotation: -30,
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill())
        }
    }, [])

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
            style={{ perspective: '1000px' }}
        >
            {/* Three.js Particle Background */}
            <ParticleBackground particleCount={150} color="#E53935" />

            {/* Animated background shapes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="bg-shape-1 absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-red-600/20 to-transparent blur-3xl" />
                <div className="bg-shape-2 absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-amber-500/15 to-transparent blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-6xl">
                {/* Year badge */}
                <div className="mb-8">
                    <span
                        ref={yearRef}
                        className="inline-block text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        2024
                    </span>
                </div>

                {/* Main title */}
                <h1
                    ref={titleRef}
                    className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-[0.9]"
                    style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        textShadow: '0 0 80px rgba(229, 57, 53, 0.3)'
                    }}
                >
                    AFRICA IS BUILDING
                </h1>

                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-light"
                >
                    A year of <span className="text-red-500 font-medium">unstoppable momentum</span>.
                    <br />
                    This is the story of builders who chose to build different.
                </p>

                {/* Scroll indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/40">Scroll to explore</span>
                    <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2">
                        <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
                    </div>
                </div>
            </div>
        </section>
    )
}

// ==================== CHAPTER 2: YEAR IN NUMBERS ====================

function ChapterNumbers() {
    const containerRef = useRef<HTMLDivElement>(null)
    const metricsRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // Pin the section
        ScrollTrigger.create({
            trigger: container,
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 1,
        })

        // Animate each metric with stagger
        metricsRef.current.forEach((metric, i) => {
            if (!metric) return

            const valueEl = metric.querySelector('.metric-value')
            const labelEl = metric.querySelector('.metric-label')
            const descEl = metric.querySelector('.metric-desc')
            const number = METRICS[i].value

            // Fade and scale in
            gsap.from(metric, {
                opacity: 0,
                scale: 0.8,
                y: 100,
                scrollTrigger: {
                    trigger: container,
                    start: `top+=${i * 10}% top`,
                    end: `top+=${i * 10 + 20}% top`,
                    scrub: 1,
                }
            })

            // Count up animation using GSAP
            ScrollTrigger.create({
                trigger: container,
                start: `top+=${i * 10}% top`,
                onEnter: () => {
                    const counter = { val: 0 }
                    gsap.to(counter, {
                        val: number,
                        duration: 2,
                        ease: 'expo.out',
                        onUpdate: () => {
                            if (valueEl) {
                                const current = Math.round(counter.val)
                                const prefix = METRICS[i].prefix || ''
                                const suffix = METRICS[i].suffix || ''
                                valueEl.textContent = `${prefix}${current}${suffix}`
                            }
                        }
                    })
                },
                once: true,
            })

            // Stagger label and description
            gsap.from([labelEl, descEl], {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: container,
                    start: `top+=${i * 10 + 5}% top`,
                    end: `top+=${i * 10 + 15}% top`,
                    scrub: 1,
                }
            })
        })

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill())
        }
    }, [])

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black flex items-center justify-center py-32"
        >
            {/* Section title */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center">
                <h2 className="text-sm uppercase tracking-[0.4em] text-red-500 mb-4">Chapter II</h2>
                <p className="text-4xl md:text-6xl font-black text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    THE YEAR IN NUMBERS
                </p>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 px-8 max-w-6xl mx-auto mt-20">
                {METRICS.map((metric, i) => (
                    <div
                        key={metric.label}
                        ref={el => { metricsRef.current[i] = el }}
                        className="text-center group"
                    >
                        <div
                            className="metric-value text-6xl md:text-8xl font-black bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent mb-2"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            0
                        </div>
                        <div className="metric-label text-lg md:text-xl font-bold text-red-500 mb-1">
                            {metric.label}
                        </div>
                        <div className="metric-desc text-sm text-white/40">
                            {metric.description}
                        </div>
                    </div>
                ))}
            </div>

            {/* Decorative lines */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
        </section>
    )
}

// ==================== CHAPTER 3: THE BUILDERS ====================

function ChapterBuilders() {
    const containerRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])
    const [activeBuilder, setActiveBuilder] = useState<number | null>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // Create a horizontal scroll effect
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]

        // Pin and horizontal scroll
        gsap.to(cards, {
            xPercent: -100 * (cards.length - 1),
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: () => `+=${container.offsetWidth * 2}`,
                pin: true,
                scrub: 1,
                snap: 1 / (cards.length - 1),
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill())
        }
    }, [])

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen bg-black overflow-hidden"
        >
            {/* Section header */}
            <div className="absolute top-12 left-8 z-20">
                <h2 className="text-sm uppercase tracking-[0.4em] text-red-500 mb-2">Chapter III</h2>
                <p className="text-3xl md:text-5xl font-black text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    THE BUILDERS
                </p>
            </div>

            {/* Horizontal scroll container */}
            <div className="flex items-center h-screen">
                <div className="flex pl-8 gap-0">
                    {BUILDERS.map((builder, i) => (
                        <div
                            key={builder.id}
                            ref={el => { cardsRef.current[i] = el }}
                            className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center"
                            onMouseEnter={() => setActiveBuilder(builder.id)}
                            onMouseLeave={() => setActiveBuilder(null)}
                        >
                            {/* Builder card */}
                            <div className="relative w-full max-w-4xl mx-auto px-8">
                                <div className="grid md:grid-cols-2 gap-12 items-center">
                                    {/* Image */}
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl group">
                                        <img
                                            src={builder.image}
                                            alt={builder.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                        {/* Region badge */}
                                        <div className="absolute bottom-6 left-6">
                                            <span className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-full">
                                                {builder.region}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Text content */}
                                    <div className={`transition-all duration-500 ${activeBuilder === builder.id ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-70'}`}>
                                        <div className="text-8xl font-black text-white/10 mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                            0{i + 1}
                                        </div>
                                        <h3 className="text-4xl md:text-5xl font-black text-white mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                            {builder.name}
                                        </h3>
                                        <p className="text-red-500 font-bold text-lg mb-6">
                                            {builder.role}
                                        </p>
                                        <p className="text-white/60 text-xl leading-relaxed">
                                            {builder.contribution}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Progress indicator */}
                            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
                                {BUILDERS.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-1 rounded-full transition-all duration-300 ${idx === i ? 'w-12 bg-red-500' : 'w-4 bg-white/20'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ==================== CHAPTER 4: THE PROJECTS ====================

function ChapterProjects() {
    const containerRef = useRef<HTMLDivElement>(null)
    const projectsRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // Staggered reveal with 3D transforms
        projectsRef.current.forEach((project, _i) => {
            if (!project) return

            gsap.from(project, {
                opacity: 0,
                y: 100,
                rotationX: -15,
                scale: 0.9,
                scrollTrigger: {
                    trigger: project,
                    start: 'top 80%',
                    end: 'top 40%',
                    scrub: 1,
                }
            })

            // Hover parallax effect
            project.addEventListener('mousemove', (e) => {
                const rect = project.getBoundingClientRect()
                const x = (e.clientX - rect.left) / rect.width - 0.5
                const y = (e.clientY - rect.top) / rect.height - 0.5

                gsap.to(project, {
                    rotationY: x * 10,
                    rotationX: -y * 10,
                    duration: 0.5,
                    ease: 'power2.out',
                })
            })

            project.addEventListener('mouseleave', () => {
                gsap.to(project, {
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.5,
                })
            })
        })

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill())
        }
    }, [])

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen bg-gradient-to-b from-black to-neutral-950 py-32"
            style={{ perspective: '2000px' }}
        >
            {/* Section header */}
            <div className="text-center mb-20 px-8">
                <h2 className="text-sm uppercase tracking-[0.4em] text-red-500 mb-4">Chapter IV</h2>
                <p className="text-4xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    AFRICAN-BUILT. GLOBALLY SCALED.
                </p>
                <p className="text-xl text-white/40 max-w-2xl mx-auto">
                    Projects that started with African problems and built solutions for the world.
                </p>
            </div>

            {/* Projects grid with 3D cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 max-w-7xl mx-auto">
                {PROJECTS.map((project, i) => (
                    <div
                        key={project.id}
                        ref={el => { projectsRef.current[i] = el }}
                        className="group cursor-pointer"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div
                            className="relative p-8 rounded-3xl overflow-hidden h-80 flex flex-col justify-between transition-all duration-300 group-hover:shadow-2xl"
                            style={{
                                backgroundColor: project.color,
                                boxShadow: `0 20px 60px ${project.color}30`,
                            }}
                        >
                            {/* Category badge */}
                            <div>
                                <span className="inline-block px-4 py-1 bg-black/20 text-white text-xs font-bold rounded-full mb-4">
                                    {project.category}
                                </span>
                                <h3 className="text-3xl font-black text-white mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                    {project.name}
                                </h3>
                                <p className="text-white/80 text-lg">
                                    {project.tagline}
                                </p>
                            </div>

                            {/* Metric */}
                            <div className="mt-auto">
                                <div className="text-4xl font-black text-white/90" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                    {project.metric}
                                </div>
                            </div>

                            {/* Decorative circle */}
                            <div
                                className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-150"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

// ==================== CHAPTER 5: THE MOMENTS ====================

function ChapterMoments() {
    const containerRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        const timeline = timelineRef.current
        if (!container || !timeline) return

        // Horizontal scroll while scrolling vertically
        const scrollWidth = timeline.scrollWidth - window.innerWidth

        gsap.to(timeline, {
            x: -scrollWidth,
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: () => `+=${scrollWidth}`,
                pin: true,
                scrub: 1,
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill())
        }
    }, [])

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen bg-black overflow-hidden"
        >
            {/* Section header - fixed */}
            <div className="absolute top-12 left-8 z-20">
                <h2 className="text-sm uppercase tracking-[0.4em] text-red-500 mb-2">Chapter V</h2>
                <p className="text-3xl md:text-5xl font-black text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    THE MOMENTS
                </p>
            </div>

            {/* Horizontal timeline */}
            <div className="h-screen flex items-center">
                <div
                    ref={timelineRef}
                    className="flex items-center gap-0 pl-8"
                >
                    {MOMENTS.map((moment, i) => (
                        <div
                            key={moment.id}
                            className="relative w-[80vw] md:w-[50vw] flex-shrink-0 flex items-center"
                        >
                            {/* Timeline line */}
                            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-red-500/50 via-white/10 to-transparent" />

                            {/* Event card */}
                            <div className="relative ml-8">
                                {/* Date marker */}
                                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                                    <div className="w-3 h-3 rounded-full bg-white" />
                                </div>

                                <div className="ml-12 p-8 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10 max-w-md">
                                    <span className="text-red-500 font-bold text-sm">{moment.date}</span>
                                    <h3 className="text-3xl font-black text-white mb-2 mt-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                        {moment.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-white/60">
                                        <span>{moment.location}</span>
                                        <span className="w-1 h-1 rounded-full bg-white/40" />
                                        <span>{moment.attendees} attendees</span>
                                    </div>
                                </div>
                            </div>

                            {/* Large background number */}
                            <div
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-[20rem] font-black text-white/[0.02] pointer-events-none"
                                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                            >
                                0{i + 1}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ==================== CHAPTER 6: COLLECTIVE IMPACT ====================

function ChapterImpact() {
    const containerRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        const text = textRef.current
        if (!container || !text) return

        // Split text for word-by-word animation
        const words = text.querySelectorAll('.word')

        gsap.from(words, {
            opacity: 0.1,
            stagger: 0.1,
            scrollTrigger: {
                trigger: container,
                start: 'top 60%',
                end: 'center center',
                scrub: 1,
            }
        })

        // Scale up the entire text block
        gsap.from(text, {
            scale: 0.9,
            scrollTrigger: {
                trigger: container,
                start: 'top bottom',
                end: 'center center',
                scrub: 1,
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill())
        }
    }, [])

    const impactStatement = "While others debated if Africa was ready, we built. We shipped. We scaled. From Lagos to Nairobi, Cape Town to Accra — a new generation chose to stop waiting for permission."

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen bg-black flex items-center justify-center py-32"
        >
            {/* Large gradient background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-tr from-red-900/30 via-amber-900/20 to-transparent blur-3xl" />
            </div>

            {/* Section header */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center">
                <h2 className="text-sm uppercase tracking-[0.4em] text-red-500 mb-2">Chapter VI</h2>
                <p className="text-3xl md:text-5xl font-black text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    THE COLLECTIVE IMPACT
                </p>
            </div>

            {/* Impact statement */}
            <div
                ref={textRef}
                className="relative z-10 text-center px-8 max-w-5xl mx-auto"
            >
                <p className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    {impactStatement.split(' ').map((word, i) => (
                        <span key={i} className="word inline-block mr-[0.3em]">
                            {word}
                        </span>
                    ))}
                </p>
            </div>

            {/* Quote attribution */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
                <p className="text-white/40 text-lg">
                    — The African Builders Collective, 2025
                </p>
            </div>
        </section>
    )
}

// ==================== CHAPTER 7: THE OUTRO ====================

function ChapterOutro() {
    const containerRef = useRef<HTMLDivElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        const cta = ctaRef.current
        if (!container || !cta) return

        // Reveal CTA with scale
        gsap.from(cta, {
            opacity: 0,
            y: 100,
            scale: 0.9,
            scrollTrigger: {
                trigger: container,
                start: 'top 60%',
                end: 'center center',
                scrub: 1,
            }
        })

        // Animate buttons
        const buttons = cta.querySelectorAll('a')
        gsap.from(buttons, {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            scrollTrigger: {
                trigger: container,
                start: 'center 60%',
                end: 'center center',
                scrub: 1,
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill())
        }
    }, [])

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen bg-gradient-to-b from-black to-neutral-900 flex items-center justify-center py-32"
        >
            {/* Section header */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center">
                <h2 className="text-sm uppercase tracking-[0.4em] text-red-500 mb-2">Chapter VII</h2>
                <p className="text-3xl md:text-5xl font-black text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    YOUR TURN
                </p>
            </div>

            {/* CTA content */}
            <div ref={ctaRef} className="text-center px-8 max-w-4xl mx-auto">
                <h3
                    className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                    2026 STARTS NOW
                </h3>
                <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto">
                    The next chapter of African innovation is being written.
                    Will you be part of it?
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="#join"
                        className="group relative px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold text-lg rounded-full transition-all duration-300 overflow-hidden"
                    >
                        <span className="relative z-10">Start Building</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </a>
                    <a
                        href="#community"
                        className="px-8 py-4 border-2 border-white/20 hover:border-white/40 text-white font-bold text-lg rounded-full transition-all duration-300"
                    >
                        Join the Community
                    </a>
                </div>
            </div>

            {/* Footer note */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                <p className="text-sm text-white/20">
                    Team1 Africa × Avalanche — Building the Future of Web3 in Africa
                </p>
            </div>
        </section>
    )
}

// ==================== PROGRESS INDICATOR ====================

function ProgressIndicator() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrollProgress = (scrollTop / docHeight) * 100
            setProgress(scrollProgress)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-white/5 z-50">
            <div
                className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
            />
        </div>
    )
}

// ==================== CHAPTER NAV (Side dots) ====================

function ChapterNav() {
    const chapters = ['Opening', 'Numbers', 'Builders', 'Projects', 'Moments', 'Impact', 'Outro']
    const [activeChapter, setActiveChapter] = useState(0)

    useEffect(() => {
        const sections = document.querySelectorAll('section')

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(sections).indexOf(entry.target as HTMLElement)
                    if (index !== -1) setActiveChapter(index)
                }
            })
        }, { threshold: 0.5 })

        sections.forEach(section => observer.observe(section))
        return () => observer.disconnect()
    }, [])

    return (
        <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-4">
            {chapters.map((chapter, i) => (
                <div
                    key={chapter}
                    className="group flex items-center gap-3 cursor-pointer"
                    onClick={() => {
                        document.querySelectorAll('section')[i]?.scrollIntoView({ behavior: 'smooth' })
                    }}
                >
                    <span className={`text-xs uppercase tracking-wider transition-opacity duration-300 ${activeChapter === i ? 'opacity-100 text-white' : 'opacity-0 group-hover:opacity-100 text-white/60'}`}>
                        {chapter}
                    </span>
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${activeChapter === i ? 'bg-red-500 scale-100' : 'bg-white/20 scale-75 group-hover:bg-white/40'}`} />
                </div>
            ))}
        </nav>
    )
}

// ==================== MAIN COMPONENT ====================

export default function CommunityWrapped() {
    const lenisRef = useRef<Lenis | null>(null)

    // Initialize Lenis smooth scrolling
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
        })

        lenisRef.current = lenis

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // Sync ScrollTrigger with Lenis
        lenis.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })

        gsap.ticker.lagSmoothing(0)

        return () => {
            lenis.destroy()
        }
    }, [])

    return (
        <main className="bg-black min-h-screen">
            {/* Cinematic noise overlay */}
            <div className="noise-overlay" />

            {/* Progress bar */}
            <ProgressIndicator />

            {/* Chapter navigation */}
            <ChapterNav />

            {/* Chapters */}
            <ChapterOpening />
            <ChapterNumbers />
            <ChapterBuilders />
            <ChapterProjects />
            <ChapterMoments />
            <ChapterImpact />
            <ChapterOutro />
        </main>
    )
}
