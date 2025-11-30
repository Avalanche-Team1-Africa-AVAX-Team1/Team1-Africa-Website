import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import type { TeamMember } from '../data/team-members';
import { FaTwitter, FaLinkedin, FaGithub, FaTelegram } from 'react-icons/fa';

interface TeamGridProps {
    members: TeamMember[];
    title?: string;
    description?: string;
}

const TeamGrid = ({ members }: TeamGridProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Use motion values for smooth cursor tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Apply spring physics for smooth following
    const smoothMouseX = useSpring(mouseX, { stiffness: 200, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 200, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        }
    };



    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen bg-black py-20 overflow-hidden"
        >
            {/* Background Image Reveal */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <AnimatePresence mode="wait">
                    {activeIndex !== null && (
                        <motion.div
                            key={members[activeIndex].id}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 0.4, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        >
                            <img
                                src={members[activeIndex].headshotUrl}
                                alt={members[activeIndex].name}
                                className="w-full h-full object-cover blur-sm"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Floating Cursor Image (The "Sticker" Effect for Team) */}
            <motion.div
                className="absolute top-0 left-0 w-48 h-64 pointer-events-none z-50 hidden md:block rounded-xl overflow-hidden shadow-2xl"
                style={{
                    x: smoothMouseX,
                    y: smoothMouseY,
                    translateX: "20px",
                    translateY: "20px",
                }}
                animate={{
                    opacity: activeIndex !== null ? 1 : 0,
                    scale: activeIndex !== null ? 1 : 0.8,
                }}
                transition={{
                    opacity: { duration: 0.15 },
                    scale: { duration: 0.2, ease: "easeOut" }
                }}
            >
                <AnimatePresence mode="wait">
                    {activeIndex !== null && (
                        <motion.div
                            key={members[activeIndex].id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.15 }}
                            className="relative w-full h-full"
                        >
                            <img
                                src={members[activeIndex].headshotUrl}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 border-4 border-white/30 rounded-xl pointer-events-none" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <div className="relative z-10 max-w-[90vw] mx-auto">
                <div className="mb-16 border-b border-white/20 pb-8">
                    <h2 className="text-[5vw] font-black text-white leading-none tracking-tighter uppercase">
                        The <span className="text-transparent stroke-white stroke-1" style={{ WebkitTextStroke: '1px white' }}>Squad</span>
                    </h2>
                </div>

                <div className="flex flex-col">
                    {members.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                            className="group relative border-b border-white/10 py-8 md:py-12 transition-colors duration-300 hover:bg-white/5"
                            data-cursor="View Profile"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-12 px-4">
                                {/* Name & Role */}
                                <div className="flex-1">
                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 group-hover:translate-x-4 transition-transform duration-300">
                                        {member.name}
                                    </h3>
                                    <p className="text-red-500 font-mono text-sm md:text-base tracking-widest uppercase">
                                        {member.role}
                                    </p>
                                </div>

                                {/* Location & Region */}
                                <div className="hidden md:block text-right text-gray-400 font-light">
                                    <p className="text-lg">{member.location}</p>
                                    <p className="text-sm opacity-50">{member.region}</p>
                                </div>

                                {/* Socials (Visible on Hover/Mobile) */}
                                <div className="flex gap-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                                    {member.socials.map((social, idx) => (
                                        <a
                                            key={idx}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white hover:text-red-500 transition-colors p-2 bg-white/10 rounded-full"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {social.platform === 'twitter' && <FaTwitter size={20} />}
                                            {social.platform === 'linkedin' && <FaLinkedin size={20} />}
                                            {social.platform === 'github' && <FaGithub size={20} />}
                                            {social.platform === 'telegram' && <FaTelegram size={20} />}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamGrid;
