import { useState } from 'react';
import logo from '../assets/avalanche_logo.png';
import telegram from '../assets/telegram.svg';
import youtube from '../assets/youtube.svg';
import x from '../assets/x.svg';
import discord from '../assets/Discord.svg';
import instagram from '../assets/Instagram.svg';
import reddit from '../assets/reddit.svg';
import github from '../assets/github.svg';
import AnimatedText from './AnimatedText';

const Footer = () => {
    const [email, setEmail] = useState('');

    const socialLinks = [
        { icon: telegram, alt: 'telegram', url: '#' },
        { icon: youtube, alt: 'youtube', url: '#' },
        { icon: x, alt: 'x', url: '#' },
        { icon: discord, alt: 'discord', url: '#' },
        { icon: instagram, alt: 'instagram', url: '#' },
        { icon: reddit, alt: 'reddit', url: '#' },
        { icon: github, alt: 'github', url: '#' }
    ];

    const navLinks = [
        { label: 'About', href: '/about' },
        { label: 'Events', href: '/events' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '#contact' }
    ];

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Subscribing:', email);
        setEmail('');
    };

    return (
        <footer className="relative bg-black text-white font-sans">
            {/* Main Footer Section */}
            <div className="max-w-[2000px] mx-auto px-6 md:px-12 pt-20 pb-12">

                {/* Top Row: Navigation & Socials */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-24 gap-8">
                    {/* Navigation Links */}
                    <AnimatedText variant="fadeIn" delay={0.1}>
                        <nav className="flex flex-wrap gap-6 md:gap-8">
                            {navLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="text-sm font-medium uppercase tracking-wider hover:text-gray-400 transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </AnimatedText>

                    {/* Social Icons */}
                    <AnimatedText variant="fadeIn" delay={0.2}>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                >
                                    <img src={social.icon} alt={social.alt} className="w-4 h-4 invert brightness-0 filter" />
                                </a>
                            ))}
                        </div>
                    </AnimatedText>
                </div>

                {/* Middle Row: Huge CTA */}
                <div className="mb-32">
                    <AnimatedText variant="slideUp" delay={0.3}>
                        <a href="#contact" className="group block w-full">
                            <h2 className="text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] font-black tracking-tighter uppercase transition-colors group-hover:text-gray-300">
                                Shall we <br />
                                <span className="italic font-serif font-normal group-hover:text-red-500 transition-colors duration-300">work together?</span>
                            </h2>
                        </a>
                    </AnimatedText>
                </div>

                {/* Bottom Row: Newsletter & Logo */}
                <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
                    {/* Newsletter */}
                    <AnimatedText variant="fadeIn" delay={0.4} className="w-full max-w-md">
                        <div>
                            <p className="text-sm font-medium mb-4">Subscribe to our newsletter</p>
                            <form onSubmit={handleSubscribe} className="flex gap-0 border-b border-white/30 focus-within:border-white transition-colors pb-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@email.com"
                                    className="bg-transparent w-full outline-none placeholder-gray-500 text-lg"
                                    required
                                />
                                <button type="submit" className="text-sm font-bold uppercase tracking-wider hover:text-red-500 transition-colors">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </AnimatedText>

                    {/* Logo Area */}
                    <AnimatedText variant="fadeIn" delay={0.5}>
                        <div className="flex flex-col items-end">
                            {/* Animated Logo Placeholder - Using existing logo for now but styled */}
                            <div className="w-32 h-32 md:w-48 md:h-48 relative group">
                                <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-[spin_10s_linear_infinite] group-hover:border-red-500/50 transition-colors"></div>
                                <div className="absolute inset-4 border-2 border-white/40 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                                <img
                                    src={logo}
                                    alt="Team1 Africa"
                                    className="absolute inset-0 w-full h-full object-contain p-8 opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </div>
                    </AnimatedText>
                </div>
            </div>

            {/* Sub-Footer Section */}
            <div className="bg-gray-100 text-black py-6 px-6 md:px-12">
                <AnimatedText variant="fadeIn" delay={0.6}>
                    <div className="max-w-[2000px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm font-medium uppercase tracking-wide">
                        <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-center md:text-left">
                            <span>{new Date().getFullYear()}</span>
                            <span>All rights reserved - © Team1 Africa</span>
                        </div>
                        <div className="flex gap-6">
                            <a href="#privacy" className="hover:text-red-600 transition-colors">Privacy</a>
                            <a href="#cookies" className="hover:text-red-600 transition-colors">Cookie Settings</a>
                        </div>
                    </div>
                </AnimatedText>
            </div>
        </footer>
    );
};

export default Footer;