import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
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
    const lastMousePos = useRef({ x: 0, y: 0 });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleUpdate = () => {
            const { x, y } = lastMousePos.current;

            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                mouseX.set(x - rect.left);
                mouseY.set(y - rect.top);

                const element = document.elementFromPoint(x, y);
                const memberRow = element?.closest('[data-member-index]');

                if (memberRow) {
                    const index = parseInt(memberRow.getAttribute('data-member-index') || '-1');
                    setActiveIndex(index);
                } else {
                    setActiveIndex(null);
                }
            }
        };

        const onMouseMove = (e: MouseEvent) => {
            lastMousePos.current = { x: e.clientX, y: e.clientY };
            handleUpdate();
        };

        const onScroll = () => {
            handleUpdate();
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('scroll', onScroll);
        };
    }, [mouseX, mouseY]);

    return (
        <section
            ref={containerRef}
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
                                className="w-full h-full object-cover object-top blur-sm"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Floating Center Image (Fixed Position, 2.5x Bigger) */}
            <motion.div
                className="fixed top-1/2 left-1/2 w-[30rem] h-[40rem] pointer-events-none z-50 hidden md:block rounded-xl overflow-hidden shadow-2xl"
                style={{
                    x: "-50%",
                    y: "-50%",
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
                                className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute inset-0 rounded-xl pointer-events-none" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <div className="relative z-10 max-w-[90vw] mx-auto">
                <div className="mb-16 border-b border-white/20 pb-8">
                    <h2 className="text-[5vw] font-black text-white leading-none tracking-tighter uppercase">
                        The <span className="text-red-500">Squad</span>
                    </h2>
                </div>

                <div className="flex flex-col">
                    {members.map((member, index) => (
                        <motion.div
                            key={member.id}
                            data-member-index={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative border-b border-white/10 py-8 md:py-12 transition-colors duration-300 hover:bg-white/5"
                            data-cursor="View Profile"
                        >
                            <div className="px-4 flex items-center justify-between gap-6">
                                {/* Left Content: Name, Role, and Socials (Mobile) */}
                                <div className="flex-1">
                                    <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2 group-hover:translate-x-4 transition-transform duration-300">
                                        {member.name}
                                    </h3>
                                    <p className="text-red-500 font-mono text-xs sm:text-sm md:text-base tracking-widest uppercase mb-4 md:mb-0">
                                        {member.role}
                                    </p>

                                    {/* Socials (Mobile only) */}
                                    <div className="flex md:hidden gap-3 mt-4">
                                        {member.socials.map((social, idx) => (
                                            <a
                                                key={idx}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white hover:text-red-500 transition-colors p-2 bg-white/10 rounded-full"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {social.platform === 'twitter' && <FaTwitter size={16} />}
                                                {social.platform === 'linkedin' && <FaLinkedin size={16} />}
                                                {social.platform === 'github' && <FaGithub size={16} />}
                                                {social.platform === 'telegram' && <FaTelegram size={16} />}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Content: Mobile Image or Desktop Info */}
                                <div className="flex items-center gap-12">
                                    {/* Mobile Image */}
                                    <div className="md:hidden w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden border border-white/20 shadow-2xl flex-shrink-0">
                                        <img
                                            src={member.headshotUrl}
                                            alt={member.name}
                                            className="w-full h-full object-cover object-top"
                                        />
                                    </div>

                                    {/* Location (Desktop only) */}
                                    <div className="hidden md:block text-right text-gray-400 font-light">
                                        <p className="text-lg">{member.location}</p>
                                        <p className="text-sm opacity-50">{member.region}</p>
                                    </div>

                                    {/* Socials (Desktop only - Shown on Hover) */}
                                    <div className="hidden md:flex gap-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
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
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamGrid;
