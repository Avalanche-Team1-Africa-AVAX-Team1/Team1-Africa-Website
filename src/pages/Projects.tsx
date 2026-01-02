/**
 * Projects Page - Showcase of African-founded Avalanche projects
 * Redesigned with modern card layout
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

// Project Data
interface TeamMember {
    name: string
    role: string
    email?: string
    image: string
}

interface Project {
    id: number
    name: string
    tagline: string
    description: string
    metric: string
    userCount: string
    category: string
    tags: string[]
    logo: string
    location: string
    countryCode: string
    achievement?: string
    liveUrl?: string
    twitterUrl?: string
    launchDate?: string
    milestones?: string
    founders: TeamMember[]
    techStack: string[]
    status: 'live' | 'beta' | 'development'
}

const PROJECTS: Project[] = [
    {
        id: 1,
        name: 'Canza Finance',
        tagline: 'African Forex on-chain',
        description: 'Canza Finance is revolutionizing cross-border payments in Africa by bringing forex trading on-chain. Their Baki platform enables trading of tokenized African fiat currencies.',
        metric: '$2M+ TVL',
        userCount: '1-10K+',
        category: 'DeFi',
        tags: ['Stablecoins', 'Forex'],
        logo: new URL('../assets/refi.png', import.meta.url).href,
        location: 'Nigeria',
        countryCode: 'NG',
        achievement: '🏆 Avalanche Grant Winner',
        liveUrl: 'https://canza.io',
        twitterUrl: 'https://twitter.com/caborange',
        launchDate: 'March 2023',
        milestones: '1-10K active users',
        founders: [
            { name: 'Pascal Ntsama', role: 'CEO', email: 'pascal@canza.io', image: new URL('../assets/testimonial1.jpg', import.meta.url).href },
            { name: 'Femi Oye', role: 'CTO', email: 'femi@canza.io', image: new URL('../assets/testimonial2.jpg', import.meta.url).href },
        ],
        techStack: ['Avalanche C-Chain', 'Solidity', 'React', 'Node.js'],
        status: 'live'
    },
    {
        id: 2,
        name: 'Kula Protocol',
        tagline: 'Impact investment DAO',
        description: 'Kula is a decentralized impact investment firm leveraging blockchain governance with real-world assets. They have deployed capital into various African projects.',
        metric: '$500K deployed',
        userCount: '1-100+',
        category: 'DAO',
        tags: ['RWAs', 'Governance'],
        logo: new URL('../assets/gitcoin.png', import.meta.url).href,
        location: 'Kenya',
        countryCode: 'KE',
        achievement: '🏆 Summit Hackathon Winner',
        liveUrl: 'https://kula.finance',
        twitterUrl: 'https://twitter.com/kulaprotocol',
        launchDate: 'September 2023',
        milestones: '1-100 DAO members',
        founders: [
            { name: 'Wanjiku Kimani', role: 'Founder', email: 'wanjiku@kula.finance', image: new URL('../assets/testimonial3.jpg', import.meta.url).href },
        ],
        techStack: ['Avalanche Subnet', 'Governor', 'IPFS'],
        status: 'live'
    },
    {
        id: 3,
        name: 'AfriMint',
        tagline: 'NFT marketplace for African art',
        description: 'AfriMint is the premier NFT marketplace celebrating African digital art and cultural heritage. The platform enables African artists to mint, sell, and trade digital creations.',
        metric: '10K+ minted',
        userCount: '101-1K+',
        category: 'NFT',
        tags: ['Art', 'Collectibles'],
        logo: new URL('../assets/spherre.png', import.meta.url).href,
        location: 'Ghana',
        countryCode: 'GH',
        achievement: '🏆 Best NFT Project 2024',
        liveUrl: 'https://afrimint.xyz',
        twitterUrl: 'https://twitter.com/afrimint',
        launchDate: 'January 2024',
        milestones: '101-1K active creators',
        founders: [
            { name: 'Kofi Asante', role: 'Lead Developer', email: 'kofi@afrimint.xyz', image: new URL('../assets/testimonial7.jpg', import.meta.url).href },
            { name: 'Ama Boateng', role: 'Creative Director', email: 'ama@afrimint.xyz', image: new URL('../assets/testimonial8.jpg', import.meta.url).href },
        ],
        techStack: ['Avalanche C-Chain', 'ERC-721', 'Next.js', 'IPFS'],
        status: 'live'
    },
    {
        id: 4,
        name: 'Baki Exchange',
        tagline: 'Tokenized African currencies',
        description: 'Built natively on Avalanche, Baki facilitates on-chain trading of tokenized African fiat currencies, addressing FX scarcity challenges across the continent.',
        metric: '3 currencies live',
        userCount: '1-100+',
        category: 'DeFi',
        tags: ['Stablecoins', 'Exchange'],
        logo: new URL('../assets/dexalot.png', import.meta.url).href,
        location: 'South Africa',
        countryCode: 'ZA',
        achievement: '🏆 Avalanche Summit Featured',
        liveUrl: 'https://baki.exchange',
        twitterUrl: 'https://twitter.com/bakiexchange',
        launchDate: 'June 2024',
        milestones: 'Beta launch complete',
        founders: [
            { name: 'Thabo Nkosi', role: 'Protocol Lead', email: 'thabo@baki.exchange', image: new URL('../assets/south5.jpg', import.meta.url).href },
        ],
        techStack: ['Avalanche C-Chain', 'Chainlink Oracles', 'Solidity'],
        status: 'beta'
    },
    {
        id: 5,
        name: 'Harvest Protocol',
        tagline: 'Farm-to-market transparency',
        description: 'Harvest Protocol brings supply chain transparency to African agriculture. Farmers can track produce from farm to market, ensuring fair pricing.',
        metric: '45K products tracked',
        userCount: '1-10K+',
        category: 'Infrastructure',
        tags: ['Supply Chain', 'IoT'],
        logo: new URL('../assets/onlydust.png', import.meta.url).href,
        location: 'Kenya',
        countryCode: 'KE',
        liveUrl: 'https://harvest.africa',
        twitterUrl: 'https://twitter.com/harvestprotocol',
        launchDate: 'August 2023',
        milestones: '1-10K farmers onboarded',
        founders: [
            { name: 'Faraji Mwamburi', role: 'Founder', email: 'faraji@harvest.africa', image: new URL('../assets/testimonial5.jpg', import.meta.url).href },
        ],
        techStack: ['Avalanche Subnet', 'IoT Integration', 'Mobile'],
        status: 'live'
    },
    {
        id: 6,
        name: 'Jamii DAO',
        tagline: 'Community governance platform',
        description: 'Jamii DAO empowers African communities with decentralized governance tools. Communities can create proposals, vote on initiatives, and manage treasuries.',
        metric: '67 communities funded',
        userCount: '1-100+',
        category: 'DAO',
        tags: ['Governance', 'Community'],
        logo: new URL('../assets/sqauds.png', import.meta.url).href,
        location: 'Ethiopia',
        countryCode: 'ET',
        twitterUrl: 'https://twitter.com/jamiidao',
        launchDate: 'In Development',
        milestones: 'Alpha testing',
        founders: [
            { name: 'Hassan Diallo', role: 'Core Developer', email: 'hassan@jamii.org', image: new URL('../assets/testimonial11.jpeg', import.meta.url).href },
        ],
        techStack: ['Avalanche C-Chain', 'Snapshot', 'React'],
        status: 'development'
    },
]

const CATEGORIES = ['All', 'DeFi', 'NFT', 'DAO', 'Infrastructure']
const COUNTRIES = ['All', 'Nigeria', 'Kenya', 'Ghana', 'South Africa', 'Ethiopia']

// Animated avatar URLs - colorful cartoon style avatars
const ANIMATED_AVATARS = [
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix&backgroundColor=b6e3f4',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka&backgroundColor=c0aede',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Max&backgroundColor=d1f4a5',
]

// Country flag URL helper
const getCountryFlag = (code: string) => `https://flagcdn.com/w40/${code.toLowerCase()}.png`

export default function ProjectsPage() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedCountry, setSelectedCountry] = useState('All')

    const filteredProjects = PROJECTS.filter(p => {
        const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory
        const countryMatch = selectedCountry === 'All' || p.location === selectedCountry
        return categoryMatch && countryMatch
    })

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

            {/* Filters Section */}
            <div className="px-6 md:px-12 lg:px-20 mb-12">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Category</p>
                        <div className="flex flex-wrap gap-3">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-5 py-2.5 text-sm font-bold rounded-lg transition-all ${selectedCategory === cat
                                            ? 'bg-red-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Country Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Country</p>
                        <div className="flex flex-wrap gap-3">
                            {COUNTRIES.map((country) => (
                                <button
                                    key={country}
                                    onClick={() => setSelectedCountry(country)}
                                    className={`px-5 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${selectedCountry === country
                                            ? 'bg-red-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {country !== 'All' && (
                                        <img
                                            src={getCountryFlag(
                                                country === 'Nigeria' ? 'ng' :
                                                    country === 'Kenya' ? 'ke' :
                                                        country === 'Ghana' ? 'gh' :
                                                            country === 'South Africa' ? 'za' :
                                                                country === 'Ethiopia' ? 'et' : ''
                                            )}
                                            alt={country}
                                            className="w-5 h-4 object-cover rounded-sm"
                                        />
                                    )}
                                    {country}
                                </button>
                            ))}
                        </div>
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
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: i * 0.08 }}
                                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                    className="group"
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
                                            <div className="flex items-center gap-2">
                                                {project.twitterUrl && (
                                                    <a
                                                        href={project.twitterUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                                        </svg>
                                                    </a>
                                                )}
                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                                        </svg>
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                            {project.description}
                                        </p>

                                        {/* Bottom row: View More + User Count */}
                                        <div className="flex items-center justify-between mt-auto">
                                            <Link
                                                to={`/projects/${project.id}`}
                                                className="px-6 py-2.5 bg-black/80 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
                                            >
                                                View More
                                            </Link>

                                            {/* Animated user avatars with cyan rings + count */}
                                            <div className="flex items-center gap-3">
                                                <div className="flex -space-x-1">
                                                    {ANIMATED_AVATARS.map((avatarUrl, idx) => (
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
                                                                src={avatarUrl}
                                                                alt="User"
                                                                className="w-10 h-10 rounded-full object-cover bg-white"
                                                            />
                                                        </motion.div>
                                                    ))}
                                                </div>
                                                <span className="text-sm font-bold text-gray-600">
                                                    {project.userCount}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            {/* CTA Section */}
            {/* <section className="py-24 px-6 md:px-12 lg:px-20 bg-black text-white">
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
            </section> */}
        </div>
    )
}

// Export projects for use in other files
export { PROJECTS }
export type { Project, TeamMember }
