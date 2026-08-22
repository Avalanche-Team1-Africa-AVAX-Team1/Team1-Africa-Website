/**
 * Projects Page - Showcase of African-founded Avalanche projects
 * Redesigned with modern card layout
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { api, getImageUrl } from '../lib/api'
import type { Project } from '../lib/api'

// Helper to map country codes to names
const countryMap: Record<string, string> = {
    'ng': 'Nigeria',
    'ke': 'Kenya',
    'gh': 'Ghana',
    'za': 'South Africa',
    'tz': 'Tanzania',
    'ug': 'Uganda',
    'et': 'Ethiopia', // Just in case
};

const getCountryName = (code: string) => countryMap[code?.toLowerCase()] || code;

const CATEGORIES = ['All', 'DeFi', 'NFT', 'DAO', 'Infrastructure']
const COUNTRIES = ['All', 'Nigeria', 'Kenya', 'Ghana', 'South Africa', 'Tanzania', 'Uganda']

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
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await api.getProjects();
                setProjects(data);
            } catch (err) {
                console.error("Failed to load projects:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(p => {
        const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory
        const countryMatch = selectedCountry === 'All' || getCountryName(p.country) === selectedCountry
        return categoryMatch && countryMatch
    })

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center pt-32">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        )
    }

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
                                                                country === 'Tanzania' ? 'tz' :
                                                                    country === 'Uganda' ? 'ug' : ''
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
                                                    <img src={getImageUrl(project.logo)} alt={project.name} className="w-full h-full object-contain" />
                                                </div>
                                                <h3 className="text-xl font-black text-black leading-tight line-clamp-1">
                                                    {project.name}
                                                </h3>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {project.twitter && (
                                                    <a
                                                        href={project.twitter}
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
                                                {project.website && (
                                                    <a
                                                        href={project.website}
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
                                            {project.description?.replace(/<[^>]*>?/gm, '')}
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
                                                    {project.userMetric}
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


