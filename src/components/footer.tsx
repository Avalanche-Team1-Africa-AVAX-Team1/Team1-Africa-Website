import { motion } from 'framer-motion';
import { useState } from 'react';
import logo from '../assets/avalanche_logo.png';
import telegram from '../assets/telegram.svg';
import youtube from '../assets/youtube.svg';
import x from '../assets/x.svg';
import discord from '../assets/Discord.svg';
import instagram from '../assets/Instagram.svg';
import reddit from '../assets/reddit.svg';
import github from '../assets/github.svg';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);

    const socialLinks = [
        { icon: telegram, alt: 'telegram', url: '#', color: '#0088cc' },
        { icon: youtube, alt: 'youtube', url: '#', color: '#FF0000' },
        { icon: x, alt: 'x', url: '#', color: '#1DA1F2' },
        { icon: discord, alt: 'discord', url: '#', color: '#5865F2' },
        { icon: instagram, alt: 'instagram', url: '#', color: '#E4405F' },
        { icon: reddit, alt: 'reddit', url: '#', color: '#FF4500' },
        { icon: github, alt: 'github', url: '#', color: '#ffffff' }
    ];

    const quickLinks = [
        { label: 'About Us', href: '/about' },
        { label: 'Events', href: '/events' },
        { label: 'Partners', href: '#partners' },
        { label: 'Contact', href: '#contact' }
    ];

    const resources = [
        { label: 'Blog', href: '#blog' },
        { label: 'Documentation', href: '#docs' },
        { label: 'FAQs', href: '#faqs' },
        { label: 'Support', href: '#support' }
    ];

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Subscribing:', email);
        setEmail('');
    };

    return (
        <footer className="relative bg-black text-white overflow-hidden">
            {/* Animated Background Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, 50, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.3, 1, 1.3],
                        opacity: [0.5, 0.3, 0.5],
                        x: [0, -50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
                {/* Top Section - Logo, Description, Newsletter */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 pb-12 border-b border-white/10">
                    {/* Left - Branding */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-6"
                        >
                            <img
                                src={logo}
                                alt="Team1 Africa"
                                className="w-32 h-auto mb-6 hover:scale-110 transition-transform duration-300 cursor-pointer"
                            />
                            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                                Empowering Africa's builders, creators, and educators in the{' '}
                                <span className="text-red-500 font-semibold">Avalanche ecosystem</span>.
                                Join us in shaping the future of Web3 across the continent.
                            </p>
                        </motion.div>

                        {/* Social Links with Hover Effects */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-wrap gap-3"
                        >
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative"
                                    onMouseEnter={() => setHoveredSocial(index)}
                                    onMouseLeave={() => setHoveredSocial(null)}
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div
                                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 relative overflow-hidden"
                                    >
                                        {/* Animated background on hover */}
                                        <motion.div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                            style={{ backgroundColor: social.color }}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: hoveredSocial === index ? 1 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        <img
                                            src={social.icon}
                                            alt={social.alt}
                                            className="w-5 h-5 relative z-10 group-hover:brightness-200 transition-all"
                                        />
                                    </div>
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right - Newsletter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="lg:pl-12"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Stay in the Loop
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Get the latest updates on events, opportunities, and insights from Africa's Web3 frontier.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all"
                                required
                            />
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 rounded-full font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all"
                            >
                                Subscribe
                            </motion.button>
                        </form>
                    </motion.div>
                </div>

                {/* Middle Section - Quick Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 pb-12 border-b border-white/10">
                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-500">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 group"
                                    >
                                        <span className="group-hover:text-red-500">→</span> {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Resources */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-500">Resources</h4>
                        <ul className="space-y-3">
                            {resources.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 group"
                                    >
                                        <span className="group-hover:text-blue-500">→</span> {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Community */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-500">Community</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#join" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all group">
                                    <span className="group-hover:text-green-500">→</span> Join Us
                                </a>
                            </li>
                            <li>
                                <a href="#contribute" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all group">
                                    <span className="group-hover:text-green-500">→</span> Contribute
                                </a>
                            </li>
                            <li>
                                <a href="#sponsor" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all group">
                                    <span className="group-hover:text-green-500">→</span> Sponsor Event
                                </a>
                            </li>
                            <li>
                                <a href="#partner" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all group">
                                    <span className="group-hover:text-green-500">→</span> Partner
                                </a>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Legal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-500">Legal</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#privacy" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all group">
                                    <span className="group-hover:text-purple-500">→</span> Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#terms" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all group">
                                    <span className="group-hover:text-purple-500">→</span> Terms of Use
                                </a>
                            </li>
                            <li>
                                <a href="#cookies" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all group">
                                    <span className="group-hover:text-purple-500">→</span> Cookie Policy
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Animated Brand Name */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-12 overflow-hidden"
                >
                    <motion.h2
                        className="text-6xl md:text-8xl lg:text-9xl font-black text-center tracking-tighter"
                        style={{ fontFamily: "'Press Start 2P', monospace" }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <span className="bg-gradient-to-r from-white via-red-500 to-white bg-clip-text text-transparent animate-gradient-x">
                            TEAM1 AFRICA
                        </span>
                    </motion.h2>
                </motion.div>

                {/* Bottom Section - Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500"
                >
                    <p>© {new Date().getFullYear()} Team1 Africa. All rights reserved.</p>
                    <p className="flex items-center gap-2">
                        Crafted with <span className="text-red-500 animate-pulse">❤</span> across Africa
                    </p>
                </motion.div>
            </div>

            {/* Add gradient animation styles */}
            <style>{`
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient-x {
                    background-size: 200% auto;
                    animation: gradient-x 3s linear infinite;
                }
            `}</style>
        </footer>
    );
};

export default Footer;