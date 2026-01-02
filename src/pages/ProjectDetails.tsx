/**
 * Project Details Page - Redesigned
 */

import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PROJECTS } from './Projects'

// Country flag URL helper
const getCountryFlag = (code: string) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`

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

            {/* Hero Section with Banner */}
            <header className="pt-24 pb-8 px-6 md:px-12 lg:px-20">
                <div className="max-w-6xl mx-auto">
                    {/* Banner Image Area */}
                    <motion.div
                        className="relative w-full h-48 md:h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Decorative pattern */}
                        <div className="absolute inset-0 opacity-50">
                            <div className="w-full h-full" style={{
                                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0)',
                                backgroundSize: '24px 24px'
                            }} />
                        </div>
                    </motion.div>

                    {/* Logo & Title Section */}
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        {/* Logo - Overlapping the banner */}
                        <motion.div
                            className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white shadow-xl p-4 flex items-center justify-center -mt-16 md:-mt-20 ml-4 md:ml-8 border-4 border-white z-10"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <img src={project.logo} alt={project.name} className="w-full h-full object-contain" />
                        </motion.div>

                        {/* Project Info */}
                        <div className="flex-1 pt-2">
                            <div className="flex flex-wrap items-center gap-6">
                                <div>
                                    <motion.h1
                                        className="text-4xl md:text-5xl font-black text-black tracking-tight mb-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {project.name}
                                    </motion.h1>

                                    {/* Tags */}
                                    <motion.div
                                        className="flex flex-wrap gap-2"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${project.status === 'live' ? 'bg-green-100 text-green-700' :
                                            project.status === 'beta' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>
                                            {project.status.toUpperCase()}
                                        </span>
                                    </motion.div>
                                </div>

                                {/* Right side: User count & Contact */}
                                <motion.div
                                    className="flex items-center gap-4 ml-auto"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    {/* User avatars + count */}
                                    <div className="flex items-center gap-2">
                                        <div className="flex -space-x-2">
                                            {project.founders.slice(0, 3).map((founder, idx) => (
                                                <img
                                                    key={idx}
                                                    src={founder.image}
                                                    alt={founder.name}
                                                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm font-bold text-gray-600">
                                            {project.userCount}
                                        </span>
                                    </div>

                                    {/* Contact button */}
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-5 py-2 bg-black text-white text-sm font-bold rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            Visit Site
                                        </a>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Product Highlights Section */}
            <section className="px-6 md:px-12 lg:px-20 py-12 border-t border-gray-100">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-black text-black mb-2">Product Highlights</h2>
                        <p className="text-gray-600 leading-relaxed max-w-4xl">
                            {project.description}
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3 mt-6">
                            {project.twitterUrl && (
                                <a
                                    href={project.twitterUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                            )}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Milestones & Launch Date */}
            <section className="px-6 md:px-12 lg:px-20 py-12 border-t border-gray-100">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Milestones */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-xl font-black text-black mb-2">Milestones</h2>
                            <p className="text-gray-600">{project.milestones || project.metric}</p>
                        </motion.div>

                        {/* Launch Date */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <h2 className="text-xl font-black text-black mb-2">Launch Date</h2>
                            <p className="text-gray-600">
                                {project.name} launched {project.launchDate || 'TBD'}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="px-6 md:px-12 lg:px-20 py-12 border-t border-gray-100">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-black text-black mb-4">Tech Stack</h2>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                                <span key={tech} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Team Section */}
            <section className="px-6 md:px-12 lg:px-20 py-12 border-t border-gray-100">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        className="text-xl font-black text-black mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Team
                    </motion.h2>

                    <div className="space-y-4">
                        {project.founders.map((member, i) => (
                            <motion.div
                                key={member.name}
                                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-black">{member.email || member.name}</span>
                                        {member.email && (
                                            <a
                                                href={`mailto:${member.email}`}
                                                className="text-gray-400 hover:text-red-600 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500">{member.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location & Achievement */}
            <section className="px-6 md:px-12 lg:px-20 py-12 border-t border-gray-100">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Location */}
                        <motion.div
                            className="flex items-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src={getCountryFlag(project.countryCode)}
                                alt={project.location}
                                className="w-10 h-10 rounded-full object-cover shadow"
                            />
                            <div>
                                <p className="text-sm text-gray-500">Location</p>
                                <p className="font-bold text-black">{project.location}</p>
                            </div>
                        </motion.div>

                        {/* Achievement */}
                        {project.achievement && (
                            <motion.div
                                className="flex items-center gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-xl">
                                    🏆
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Achievement</p>
                                    <p className="font-bold text-black">{project.achievement}</p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer / Related Section */}
            <section className="px-6 md:px-12 lg:px-20 py-12 border-t border-gray-100 bg-gray-50">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <span className="text-gray-500 font-medium">team1africa</span>
                    <div className="flex items-center gap-3">
                        {project.twitterUrl && (
                            <a
                                href={project.twitterUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow"
                            >
                                <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow"
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                            </a>
                        )}
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
