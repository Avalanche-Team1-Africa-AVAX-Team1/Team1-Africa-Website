/**
 * Project Details Page
 */

import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// Project Data (same as Projects.tsx - in production, this would be in a shared data file)
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
        description: 'Canza Finance is revolutionizing cross-border payments in Africa by bringing forex trading on-chain. Their Baki platform enables the trading of tokenized African fiat currencies including Nigerian Naira, South African Rand, and West African CFA. By leveraging Avalanche\'s speed and low costs, Canza is solving real problems for millions of Africans who struggle with traditional forex systems.',
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
        description: 'Kula is a decentralized impact investment firm leveraging blockchain governance with real-world assets. They have deployed capital into various projects across Africa, including supporting electric mobility platforms. The $KULA token underpins governance, allowing token holders to vote on strategic decisions and investment allocations.',
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
        description: 'AfriMint is the premier NFT marketplace celebrating African digital art and cultural heritage. The platform enables African artists to mint, sell, and trade their digital creations with low fees and fast transactions. We\'re building a bridge between traditional African art and the digital world.',
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
        description: 'Built natively on Avalanche, Baki facilitates on-chain trading of tokenized African fiat currencies, addressing FX scarcity challenges across the continent. Currently supporting Nigerian Naira, South African Rand, and West African CFA. We\'re making forex accessible to everyone.',
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
        description: 'Harvest Protocol brings supply chain transparency to African agriculture. Farmers can track their produce from farm to market, ensuring fair pricing and reducing fraud in the agricultural supply chain. We\'re empowering farmers with blockchain technology.',
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
        description: 'Jamii DAO empowers African communities with decentralized governance tools. Communities can create proposals, vote on initiatives, and manage shared treasuries transparently. We\'re bringing Web3 governance to grassroots communities.',
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

export default function ProjectDetails() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const project = PROJECTS.find(p => p.id === Number(id))

    if (!project) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-black mb-4">Project Not Found</h1>
                    <Link to="/projects" className="text-red-600 hover:underline">← Back to Projects</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Back button */}
            <div className="fixed top-24 left-6 z-40">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-black hover:text-white transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
            </div>

            {/* Hero Section */}
            <header className="pt-32 pb-16 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        {/* Logo */}
                        <motion.div
                            className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white shadow-xl p-4 flex items-center justify-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <img src={project.logo} alt={project.name} className="w-full h-full object-contain" />
                        </motion.div>

                        {/* Info */}
                        <div className="flex-1">
                            <motion.div
                                className="flex flex-wrap items-center gap-3 mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <span className={`px-4 py-1.5 text-sm font-bold rounded-full ${project.status === 'live' ? 'bg-green-100 text-green-700' :
                                        project.status === 'beta' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-gray-100 text-gray-600'
                                    }`}>
                                    {project.status.toUpperCase()}
                                </span>
                                {project.achievement && (
                                    <span className="px-4 py-1.5 bg-yellow-100 text-yellow-800 text-sm font-bold rounded-full">
                                        {project.achievement}
                                    </span>
                                )}
                                <span className="px-4 py-1.5 bg-black text-white text-sm font-bold rounded-full">
                                    {project.category}
                                </span>
                            </motion.div>

                            <motion.h1
                                className="text-5xl md:text-7xl font-black text-black tracking-tight mb-4"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                {project.name}
                            </motion.h1>

                            <motion.p
                                className="text-2xl text-gray-500 mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {project.tagline}
                            </motion.p>

                            <motion.p
                                className="text-lg text-gray-400"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                📍 {project.location}
                            </motion.p>
                        </div>
                    </div>

                    {/* Key Metric */}
                    <motion.div
                        className="mt-12 p-8 bg-black rounded-3xl text-white inline-block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <p className="text-sm text-white/50 uppercase tracking-wider mb-2">Key Metric</p>
                        <p className="text-5xl md:text-6xl font-black text-red-500">{project.metric}</p>
                    </motion.div>
                </div>
            </header>

            {/* Main Content */}
            <div className="px-6 md:px-12 lg:px-20 py-16">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
                    {/* Description */}
                    <motion.div
                        className="md:col-span-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-black text-black mb-6">About</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">{project.description}</p>

                        {/* CTA */}
                        {project.liveUrl && (
                            <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 mt-8 px-8 py-4 bg-red-600 text-white text-lg font-bold rounded-full hover:bg-red-500 transition-colors group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                Visit Live Site
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </motion.a>
                        )}
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Tech Stack */}
                        <div className="bg-gray-50 rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-black mb-4">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                    <span key={tech} className="px-3 py-1.5 bg-white text-gray-700 text-sm rounded-full border border-gray-200">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Founders Section */}
            <section className="px-6 md:px-12 lg:px-20 py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        className="text-3xl font-black text-black mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        The Team
                    </motion.h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {project.founders.map((founder, i) => (
                            <motion.div
                                key={founder.name}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="aspect-square overflow-hidden">
                                    <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-black">{founder.name}</h3>
                                    <p className="text-gray-500">{founder.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* More Projects */}
            <section className="px-6 md:px-12 lg:px-20 py-16">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-black text-black mb-8">Explore More Projects</h2>
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-lg font-bold rounded-full hover:bg-red-600 transition-colors"
                    >
                        View All Projects →
                    </Link>
                </div>
            </section>
        </div>
    )
}
