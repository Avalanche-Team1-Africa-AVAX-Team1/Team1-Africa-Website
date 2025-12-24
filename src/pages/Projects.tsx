/**
 * Projects Page - Showcase of African-founded Avalanche projects
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

// Project Data
interface Project {
    id: number
    name: string
    tagline: string
    description: string
    metric: string
    category: string
    logo: string
    location: string
    achievement?: string
    liveUrl?: string
    founders: { name: string; role: string; image: string }[]
    techStack: string[]
    status: 'live' | 'beta' | 'development'
}

const PROJECTS: Project[] = [
    {
        id: 1,
        name: 'Canza Finance',
        tagline: 'African Forex on-chain',
        description: 'Canza Finance is revolutionizing cross-border payments in Africa by bringing forex trading on-chain. Their Baki platform enables the trading of tokenized African fiat currencies including Nigerian Naira, South African Rand, and West African CFA.',
        metric: '$2M+ TVL',
        category: 'DeFi',
        logo: new URL('../assets/refi.png', import.meta.url).href,
        location: 'Nigeria',
        achievement: '🏆 Avalanche Grant Winner',
        liveUrl: 'https://canza.io',
        founders: [
            { name: 'Pascal Ntsama', role: 'CEO', image: new URL('../assets/testimonial1.jpg', import.meta.url).href },
            { name: 'Femi Oye', role: 'CTO', image: new URL('../assets/testimonial2.jpg', import.meta.url).href },
        ],
        techStack: ['Avalanche C-Chain', 'Solidity', 'React', 'Node.js'],
        status: 'live'
    },
    {
        id: 2,
        name: 'Kula Protocol',
        tagline: 'Impact investment DAO',
        description: 'Kula is a decentralized impact investment firm leveraging blockchain governance with real-world assets. They have deployed capital into various projects across Africa, including supporting electric mobility platforms.',
        metric: '$500K deployed',
        category: 'DAO',
        logo: new URL('../assets/gitcoin.png', import.meta.url).href,
        location: 'Kenya',
        achievement: '🏆 Summit Hackathon Winner',
        liveUrl: 'https://kula.finance',
        founders: [
            { name: 'Wanjiku Kimani', role: 'Founder', image: new URL('../assets/testimonial3.jpg', import.meta.url).href },
        ],
        techStack: ['Avalanche Subnet', 'Governor', 'IPFS'],
        status: 'live'
    },
    {
        id: 3,
        name: 'AfriMint',
        tagline: 'NFT marketplace for African art',
        description: 'AfriMint is the premier NFT marketplace celebrating African digital art and cultural heritage. The platform enables African artists to mint, sell, and trade their digital creations with low fees and fast transactions.',
        metric: '10K+ minted',
        category: 'NFT',
        logo: new URL('../assets/spherre.png', import.meta.url).href,
        location: 'Ghana',
        achievement: '🏆 Best NFT Project 2024',
        liveUrl: 'https://afrimint.xyz',
        founders: [
            { name: 'Kofi Asante', role: 'Lead Developer', image: new URL('../assets/testimonial7.jpg', import.meta.url).href },
            { name: 'Ama Boateng', role: 'Creative Director', image: new URL('../assets/testimonial8.jpg', import.meta.url).href },
        ],
        techStack: ['Avalanche C-Chain', 'ERC-721', 'Next.js', 'IPFS'],
        status: 'live'
    },
    {
        id: 4,
        name: 'Baki Exchange',
        tagline: 'Tokenized African currencies',
        description: 'Built natively on Avalanche, Baki facilitates on-chain trading of tokenized African fiat currencies, addressing FX scarcity challenges across the continent. Currently supporting Nigerian Naira, South African Rand, and West African CFA.',
        metric: '3 currencies live',
        category: 'DeFi',
        logo: new URL('../assets/dexalot.png', import.meta.url).href,
        location: 'South Africa',
        achievement: '🏆 Avalanche Summit Featured',
        liveUrl: 'https://baki.exchange',
        founders: [
            { name: 'Thabo Nkosi', role: 'Protocol Lead', image: new URL('../assets/south5.jpg', import.meta.url).href },
        ],
        techStack: ['Avalanche C-Chain', 'Chainlink Oracles', 'Solidity'],
        status: 'beta'
    },
    {
        id: 5,
        name: 'Harvest Protocol',
        tagline: 'Farm-to-market transparency',
        description: 'Harvest Protocol brings supply chain transparency to African agriculture. Farmers can track their produce from farm to market, ensuring fair pricing and reducing fraud in the agricultural supply chain.',
        metric: '45K products tracked',
        category: 'Infrastructure',
        logo: new URL('../assets/onlydust.png', import.meta.url).href,
        location: 'Kenya',
        liveUrl: 'https://harvest.africa',
        founders: [
            { name: 'Faraji Mwamburi', role: 'Founder', image: new URL('../assets/testimonial5.jpg', import.meta.url).href },
        ],
        techStack: ['Avalanche Subnet', 'IoT Integration', 'Mobile'],
        status: 'live'
    },
    {
        id: 6,
        name: 'Jamii DAO',
        tagline: 'Community governance platform',
        description: 'Jamii DAO empowers African communities with decentralized governance tools. Communities can create proposals, vote on initiatives, and manage shared treasuries transparently.',
        metric: '67 communities funded',
        category: 'DAO',
        logo: new URL('../assets/sqauds.png', import.meta.url).href,
        location: 'Ethiopia',
        founders: [
            { name: 'Hassan Diallo', role: 'Core Developer', image: new URL('../assets/testimonial11.jpeg', import.meta.url).href },
        ],
        techStack: ['Avalanche C-Chain', 'Snapshot', 'React'],
        status: 'development'
    },
]

const CATEGORIES = ['All', 'DeFi', 'NFT', 'DAO', 'Infrastructure']

export default function ProjectsPage() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [hoveredProject, setHoveredProject] = useState<number | null>(null)

    const filteredProjects = selectedCategory === 'All'
        ? PROJECTS
        : PROJECTS.filter(p => p.category === selectedCategory)

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <header className="pt-32 pb-16 px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <motion.span
                        className="inline-block text-red-600 text-sm font-bold uppercase tracking-[0.3em] mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Building Africa's Future
                    </motion.span>
                    <motion.h1
                        className="text-6xl md:text-8xl font-black text-black tracking-tight leading-[0.85] mb-8"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Projects
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl text-gray-500 max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        African-founded projects building the future on Avalanche.
                        Hackathon winners. Grant recipients. Trailblazers.
                    </motion.p>
                </div>
            </header>

            {/* Category Filter */}
            <div className="px-6 md:px-12 lg:px-20 mb-12">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="flex flex-wrap gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-3 text-sm font-bold rounded-full transition-all ${selectedCategory === cat
                                        ? 'bg-black text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="px-6 md:px-12 lg:px-20 pb-24">
                <div className="max-w-7xl mx-auto">
                    <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, i) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                >
                                    <Link
                                        to={`/projects/${project.id}`}
                                        className="block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100"
                                        onMouseEnter={() => setHoveredProject(project.id)}
                                        onMouseLeave={() => setHoveredProject(null)}
                                    >
                                        <div className="p-8">
                                            {/* Status & Achievement */}
                                            <div className="flex items-center gap-2 mb-6">
                                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${project.status === 'live' ? 'bg-green-100 text-green-700' :
                                                        project.status === 'beta' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {project.status.toUpperCase()}
                                                </span>
                                                {project.achievement && (
                                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
                                                        {project.achievement}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Logo & Name */}
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-14 h-14 rounded-2xl bg-gray-50 p-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <img src={project.logo} alt={project.name} className="w-full h-full object-contain" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-black text-black">{project.name}</h3>
                                                    <p className="text-gray-500 text-sm">{project.tagline}</p>
                                                </div>
                                            </div>

                                            {/* Metric */}
                                            <p className="text-3xl font-black text-red-600 mb-2">{project.metric}</p>

                                            {/* Meta */}
                                            <div className="flex items-center gap-3">
                                                <span className="px-3 py-1 bg-black text-white text-xs font-bold rounded-full">
                                                    {project.category}
                                                </span>
                                                <span className="text-gray-400 text-sm">{project.location}</span>
                                            </div>

                                            {/* Hover arrow */}
                                            <motion.div
                                                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: hoveredProject === project.id ? 1 : 0, x: hoveredProject === project.id ? 0 : -10 }}
                                            >
                                                →
                                            </motion.div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            {/* CTA Section */}
            <section className="py-24 px-6 md:px-12 lg:px-20 bg-black text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        className="text-4xl md:text-6xl font-black mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Building something amazing?
                    </motion.h2>
                    <motion.p
                        className="text-xl text-white/60 mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Submit your project to be featured in our spotlight.
                    </motion.p>
                    <motion.a
                        href="mailto:projects@team1africa.com"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white text-lg font-bold rounded-full hover:bg-red-500 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Submit Your Project →
                    </motion.a>
                </div>
            </section>
        </div>
    )
}
